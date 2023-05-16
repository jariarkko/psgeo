
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)


// Security remarks ------------------------------------------------------------
//
// 1. Limit the use of your API key
//
// If this code is run at https://example.net, one needs to
// authorise the using web page(s), urls, (example.net in this case) at
// https://console.developers.google.com/apis/credentials
// You are STRONGLY advised to go there and apply domain restrictions and a cost limit.
// If your site starts to trend on the net (or your API key is used elsewere),
// and usage grows exponentially, you could get invoiced for use of your API key.
//
// 2. Set your content security policy to your liking
//
// If the JSON database is retrieved from a remote server, or another subdomain,
// CORS may prevent you from accessing it. In that case the
// http header: Access-Control-Allow-Origin may help.
// If you run testing and production versions of psgeo in different subdomains,
// make sure that the sources (in Domain Default) match your subdomains,
// or else there might be content security policy induced cross-origin resource sharing error.
//
// 3. A free web application firewall is available e.g. from Perishable press.
//
// While it is meant to protect WordPress, it protects against a lot of nasty query strings,
// bad bots etc. You will find distributed with psGeo a sample .htaccess file to test.
// Credits for this great security feature go to https://perishablepress.com/


// About program structure ------------------------------------------------------
//
// This file contains four 'blocks' of code:
// A) The init sequence detailed below
// B) The user interface:
//    psgeoInitFilterPane, psgeoInitStatsPane, *MenuButton, *BringUp, and their children
// C) Database queries:
//    psgeoUpdateStatsPane, psgeoRerunFilters, and their children
// D) event listeners for map type change, zoom, window resize, inputs and buttons
//
// Init sequence:
// 1. The html file has an async defer script, which loads Google Maps in the background,
// 2. and Google Maps, when ready, calls back to psgeoInit.
// 3. psgeoInit uses an async fetch script to read settings from psgeoDomainDefaults.json
// 4. Once this is complete (await) psgeoInit calls on psgeoInitMap
// 5. psgeoInitMap sets up Google Maps and also topographic WMTS maps
// 6. psgeoInitMap calls on psgeoInitList, which uses an async function to read data files
//    This happens IN PARALLEL, and there is a shared completion counter, which when ready,
//    shows to the last process to continue to psgeoFinishLoading.
// 7. psgeoFinishLoading sets up FilterPane (upper left) and StatsPane (lower left)
//    Functions using document.getElementById('Filter') CANNOT be used. That control is still loading.
// 8. psgeoFinishLoading also sets an eventListener to react on window size changes.
//    This listener displays/hides the FilterPane and the filter and geolocation buttons in StatsPane
//    This listener also moves rangeFilterPaneDiv and contentFilterPaneDiv when needed.
//    - in smallDisplayMode these divs are in the tabbed filter window (FilterPane is not displayed)
//    - else they are in the FilterPane
//    - there is no copying, the actual div tags get moved around the document and
//      when they are appended as a child in tabbed menu, they are removed from original position
//    - we do not want two copies of these checkboxlists to avoid the 'hidden selection problem'
//    - relevant functions: psgeoFilterMenuContents captures divs,
//                          psgeoFinishLoading has the resize eventListener to adjust UI
//                          putStuffInFilterPane and putStuffInFilterWindow

// About settable parameters ----------------------------------------------------
//
// Most settable parameters can be found in lib/psgeosettings.js or in cfg/psgeoDomainDefaults.json
// Some tables, that affect the operation of this software, are in lib/psgeotables.js
// End user settable parameters are always in cfg/psgeoDomainDefaults.json
//


//
// Internal variables -- do not change -----------------------------------------
//

var psgeoDomainDefault = undefined; // default settings per site
var psgeoMap;                       // Google Maps map object
var psgeoList;                      // database
var psgeoMarkerList;
var psgeoMarkerItemList;
var psgeoMarkerImage;
var psgeoMarkerShape;
var psgeoFilterPaneTexts = [];      // Will contain both checkboxes and text and headers
var psgeoStatsPaneTexts = [];
// All filtering is done with these:
var psgeoActivityFilterCheckboxes = [];
var psgeoRangeFilterCheckboxes = [];        // Low, medium or high range (in chosen metric: length, depth, grade, etc.)
var psgeoMapFilterCheckbox = undefined;     // BOOLEAN Show sites with a site map
var psgeoArticleFilterCheckbox = undefined; // BOOLEAN Show sites with an article
var psgeoModelFilterCheckbox = undefined;   // BOOLEAN Show sites with a 3d-model
var psgeoNameFilterInput = undefined;       // BOOLEAN Show sites with a matching name
var psgeoOnlyHomelandFilterCheckbox = undefined;       // BOOLEAN Show or not?
var psgeoOtherCountriesFilterCheckbox = undefined;     // BOOLEAN Show or not?
var psgeoSourceFilterCheckboxes = [];
var psgeoSubtypeGroupCheckboxLists = [];    // ARRAY of objects: [{ group: OBJECT, checkboxes: ARRAY  },... ]
var psgeoListOfEnabledSubtypeGroups = [];   // Used when adjusting filter menu subtype filter to correspond to selected activities
// Buttons
var psgeoFilterMenuButtonInFilterPane  = undefined;    // FilterPane    Opens the MoreFilter window
var psgeoFilterMenuButtonInStatsPane   = undefined;    // StatsPane     Opens the MoreFilter window
var psgeoGeolocationButtonInFilterPane = undefined;    // FilterPane    Starts geolocation
var psgeoGeolocationButtonInStatsPane  = undefined;    // StatsPane     Starts geolocation
var psgeoMoreMenuButton = undefined;        // StatsPane     Opens MoreMenu with custom links, info, about
var psgeoOtherToolsMenuButton = undefined;  //   MoreMenu      Opens a window with cave related website links
var psgeoAboutMenuButton = undefined;       //   MoreMenu      Opens an About window
// Info Windows for classic UI
var psgeoFilterWindow = undefined;          // MoreFiltering A filter window
var psgeoMoreWindow = undefined;            // MoreMenu      Info and links
var psgeoAboutWindow = undefined;           //   About       Credits
var psgeoOtherToolsWindow = undefined;      //   OtherTools  External links, one window level deeper.
// Screen size.
var psgeoSmallDisplayMode = false;          // By default.   Affects the visibility of FilterPane.

//
// Function definitions --------------------------------------------------------------
//

function psgeoDebug(message)  {
    console.log("Debug: " + message);
}

function psgeoExtraDebug(message)  {
    //console.log("Debug: " + message);
}

function psgeoInitMarkerImages() {

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  psgeoMarkerShape = {
      coords: [2,1, 5,33, 15,33, 19,1],
      type: 'poly'
  };
}

function psgeoZoomChanged(db,level,psgeoDomainDefault) {
    //psgeoExtraDebug("zoom now " + level.toString());
    psgeoRecheckVisibility(db,level,psgeoDomainDefault);
}

function psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    var newBasicFilters = [];
    var newSizeFilters = [];
    var newOnlyHomelandFilter = psgeoCreateOnlyHomelandFilter(db,lib,lang,map,psgeoDomainDefault);
    var newMapFilter = undefined;
    var newModelFilter = undefined;
    var newArticleFilter = undefined;
    var newNameFilter = psgeoCreateNameFilter(db,lib,lang,map);
    var newSubtypeGroupFilters = psgeoCreateSubtypeGroupFilters(db,lib,lang,map);
    var rangeHighFlag = false;
    var rangeMediumFlag = false;
    var rangeLowFlag = false;

    psgeoDebug("We have " + psgeoActivityFilterCheckboxes.length.toString() + " activity checkboxes ");
    if (psgeoDomainDefault.rangeCategoryLimits.allowFiltering) { 
        psgeoDebug(" and " + psgeoRangeFilterCheckboxes.length.toString() + " range filter checkboxes");
    }

    // Only show those subtype groups in filter menu tab, which correspond to activity filter
    if (psgeoDomainDefault.activityCheckboxes) {
        // User is allowed to select/deselect activities to display.
        // Note though, that this operates on already filtered data.
        // psgeoDomainDefault.defaultFilter.filter was used as import filter in psgeoInitList!
        // Steps to dynamic subactivity filter display:
        // First we hide all displayBlocks created in psgeoFilterMenuContents()
        // Then we enable them dynamically while processing the activity checkboxes
        // This happens conveniently in psgeoCreateActivityAndSubactivityFilters.
        for (const subtypeGroupDescriptionTextId of psgeoListOfEnabledSubtypeGroups) {
            // Note: Enabled refers to a permanent baseline setting is psgeoDomainDefault
            document.getElementById(subtypeGroupDescriptionTextId).style.display='none'
        }
    }

    // Filter by activity and subactivities
    newBasicFilters = psgeoCreateActivityAndSubactivityFilters(db,lib,lang,map,tbl)

    // Filter by existence of a sitemap
    if (lib.isDeclared(psgeoMapFilterCheckbox) &&
        psgeoMapFilterCheckbox.checked) {
        newMapFilter = db.filterMatchMap(true);
    }
    
    // Filter by existence of a site 3D-model
    if (lib.isDeclared(psgeoModelFilterCheckbox) &&
        psgeoModelFilterCheckbox.checked) {
        newModelFilter = db.filterMatchModel(true);
    }

    // Filter by existence of an article
    if (lib.isDeclared(psgeoArticleFilterCheckbox) &&
        psgeoArticleFilterCheckbox.checked) {
        newArticleFilter = db.filterMatchArticle(true);
    }

    // Filter by site measure (length, depth, height, grade, temp, etc.)
    if (psgeoDomainDefault.rangeCategoryLimits.allowFiltering) { 
        for (const one of psgeoRangeFilterCheckboxes) {
            if (one.checked) {
                var newFilter;
                switch (one.value) {
                case "rangeHigh":
                    newFilter = db.filterRange("min",psgeoDomainDefault.rangeCategoryLimits.limitHigh);
                    newSizeFilters.push(newFilter);
                    rangeHighFlag = true;
                    psgeoDebug("High range is included");
                    break;
                case "rangeMedium":
                    var newFilter1 = db.filterRange("min",psgeoDomainDefault.rangeCategoryLimits.limitLow);
                    var newFilter2 = db.filterRange("max",psgeoDomainDefault.rangeCategoryLimits.limitHigh);
                    newFilter = db.filterAnd([newFilter1,newFilter2]);
                    newSizeFilters.push(newFilter);
                    rangeMediumFlag = true;
                    psgeoDebug("Medium range is included");
                    break;
                case "rangeLow":
                    newFilter = db.filterRange("max",psgeoDomainDefault.rangeCategoryLimits.limitLow);
                    newSizeFilters.push(newFilter);
                    rangeLowFlag = true;
                    psgeoDebug("Low range is included");
                    break;
                default:
                    psgeoDebug("ERROR: Invalid filter received");
                    break;
                }
            }
        }
    } else {
        psgeoDebug("No filtering by any metric");
    } 

    //
    // Build the final filter
    //

    var finalFilter
    var sizeFilter

    // 1 Apply activity and subactivity filters
    finalFilter = newBasicFilters 

    // 2 Apply size/range filters defined above
    if (psgeoDomainDefault.rangeCategoryLimits.allowFiltering) { 
        if (!rangeHighFlag || !rangeMediumFlag || !rangeLowFlag) {
            // If we have a single activity, range filtering turned on, caves, and some range(s) are deselected,
            // the we need to filter by range. In other case sizeFilter remains db.filterTrue()
            sizeFilter = db.filterOr(newSizeFilters); // XXXX newAltitudeFilters, newVerticalityFilters
            finalFilter = db.filterAnd([finalFilter,sizeFilter]);
        }
    } 

    // 3 Add country limitation
    if (newOnlyHomelandFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newOnlyHomelandFilter]);
    }
 
    // 4 Add possible requirement of a site map
    if (newMapFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newMapFilter]);
    }
  
    // 5 Add possible requirement of a site 3D-model
    if (newModelFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newModelFilter]);
    }
  
    // 6 Add possible requirement of an article
    if (newArticleFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newArticleFilter]);
    }
  
    // 7 Add filtering by name
    if (newNameFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newNameFilter]);
    }
 
 
    // 8 Add filtering by data source
    if (psgeoSourceFilterCheckboxes.length > 0) {
        var sourceFilter = psgeoMakeSourceFilter(db,psgeoSourceFilterCheckboxes);
        finalFilter = db.filterAnd([finalFilter,sourceFilter]);
    }

    // 9 Set the filter
    psgeoDebug("Rerun filters: before db.setFilter(finalFilter)");
    db.setFilter(finalFilter);
    psgeoDebug("Rerun filters: after db.setFilter(finalFilter)");

    // 10 Update view
    psgeoRecheckVisibility(db,psgeoMap.getZoom(),psgeoDomainDefault);
    psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
}

function psgeoMakeSourceFilter(db,sourceCheckboxes) {
    var subFilters = [];
    var i;
    for (i = 0; i < sourceCheckboxes.length; i++) {
        var box = sourceCheckboxes[i];
        if (box.checked) {
            subFilters.push(db.filterMatchSource(box.value));
        }
    }
    return(db.filterOr(subFilters));
}

function psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel,psgeoDomainDefault) {
    if (!psgeoDomainDefault.zoomouthidesdetails) return(true);
    if (zoomLevel >= psgeoDomainDefault.zoomlevelfordetails) return(true);
    if (!db.isItemSideCave(item)) return(true);
    return(false);
}

function psgeoRecheckVisibility(db,zoomLevel,psgeoDomainDefault) {
    var i;
    for (i = 0; i < psgeoMarkerList.length; i++) {
        var m = psgeoMarkerList[i];             // GLOBAL VAR
        var item = psgeoMarkerItemList[i];      // GLOBAL VAR
        var visible = db.matchFilter(item,db.getFilter());
        if (visible &&
            !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel,psgeoDomainDefault)) {
            visible = false;
        }
        if (visible === false && m.getMap() !== null) {
            m.setMap(null);
        } else if (visible === true && m.getMap() === null) {
            m.setMap(psgeoMap);
        }
    }
}

function psgeoInitList(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];

    var filterToBeUsedLater = undefined;
    var filterForMarkers = undefined;
    var jsonImportsToDo = psgeoDomainDefault.sources.length;

    async function fetchData(source) {

        //
        // Because of the used forEach() method, we are now in one of several parallel import threads.
        //

        let response, json;

        // 1. Fetch data
        try {
            response = await fetch(source.datafile);
        } catch (error) {
            // No connection
            if (response === undefined) { 
                psgeoDebug("Unable to fetch data from " + source.datafile + " Proceeding without. Possible connection issue.")
            }
        }
        // 2. Server responds. Check for deeper problems.
        if (response !== undefined && !response.ok) {
            console.log(response); // psgeoDebug doesn't work here.
            psgeoDebug("Connection to server ok, but unable to fetch data from " + source.datafile + " Proceeding without. See above.")
        }
        // 3. Parse the promise into JSON
        try {
            if (response !== undefined && response.ok) {
                json = await response.json();
            } else {
                json = '{}' // either one of the previous error cases is true
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                psgeoDebug("Unable to parse JSON from " + source.datafile + " Proceeding without. Error: " + error);
            } else {
                psgeoDebug("Error parsing " + source.datafile + "Proceeding without." + error);
            }
            json = '{}'
        }
        // 4. Import JSON into database filtered
        //    Important note: source.textId MUST NOT be translated.
        //    It is a db key value and must be identical irrespective of smallDisplayMode.
        //    It is used in psgeoGetSourcesCheckboxes for box.value
        //    and in psgeoMakeSourceFilter > filterMatchSource as box.value
        db.addPlacesWithFilter(json,db.getFilter(),source.textId)
        psgeoDebug("There are " + db.nPlaces() + " records in database after attempting/retrieving " + source.datafile)
        // 5. Each parallel import decrements the same counter, jsonImportsToDo, when it finishes.
        // Hence, all imports are done once the counter reaches zero
        if (--jsonImportsToDo == 0) psgeoFinishLoading(db,lib,lang,map,geolocation,filterForMarkers,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault)
    }
      
    //
    // Choose the import filter for data.
    //

    db.setFilter(db.filterTrue());
    filterForMarkers = db.filterTrue();

    if (psgeoDomainDefault.defaultFilter.enabled) {
        // Only load the relevant part of the JSON database.
        //     Transient filtering is begun in psgeoFinishLoading. Check there for more.
        //     Check psgeolib.js for more initial load filter options.
	psgeoDebug("using import filter " + JSON.stringify(psgeoDomainDefault.defaultFilter.filter));
        let initialFilterName = psgeoDomainDefault.defaultFilter.filter
        if (initialFilterName !== '') {
            initialFilter = lib.getDefaultFilter(db,initialFilterName)
            db.setFilter(initialFilter);
            filterForMarkers = initialFilter;
        }    
        psgeoDebug("filterForMarkers = " +
                   (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    }

    //
    // Import with filter
    //
    psgeoDomainDefault.sources.forEach(function (source) { 
        // For each source, launch an import function. These run in parallel.
        psgeoDebug("Fetching data from " + source.datafile);
        fetchData(source);
    });
}

async function psgeoFinishLoading(db,lib,lang,map,geolocation,filterForMarkers,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    //
    // SET DEFAULT COUNTRY AND MAP FILTER
    //

    // Database has been PERMANENTLY filtered at import already. Result:
    psgeoDebug("Loading of data has finished. There are "+db.nPlaces()+" sites now in database.");

    db.setFilter(db.filterTrue())
    filterForMarkers = db.filterTrue() 

    //
    // POPULATE USER INTERFACE (FILTER AND STATS PANES)
    //
    psgeoInitFilterPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    psgeoInitStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);


    //
    // SET UI COMPONENT VISIBILITY BASED ON SCREEN SIZE
    //

    if (document.defaultView.innerWidth < cfg.psgeoSmallDisplayModeLimit) {
            // Do not attempt: document.getElementById('Filter').style.display='none';
            // That element has not been loaded yet.
            // This is done in the async function after await instead!
            psgeoSmallDisplayMode=true;
            cfg.smallDisplayMode=true;    // NOT YET USED
            psgeoFilterMenuButtonInStatsPane.style.display='block';
            psgeoGeolocationButtonInStatsPane.style.display='block';
            psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    } else {
            psgeoSmallDisplayMode=false;
            cfg.smallDisplayMode=false;   // NOT YET USED
            psgeoFilterMenuButtonInStatsPane.style.display='none';
            psgeoGeolocationButtonInStatsPane.style.display='none';
            psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    }

    if (psgeoDomainDefault.defaultFilter.enabled) {
        // Filter next what actually is shown. These filters are USER CHANGEABLE.
        //     psgeoDomainDefault.defaultFilter.onlyHomeCountry ?
        //     psgeoDomainDefault.defaultFilter.showMapsByDefault ?

        // 1. Cave maps on or off?
        if (psgeoDomainDefault.defaultFilter.showMapsByDefault) {
            filterForMarkers =
            db.filterAnd([filterForMarkers,
                          db.filterMatchMap(true)]);
        }

        // 2. Show only home country?
        if (psgeoDomainDefault.defaultFilter.onlyHomeCountry) {
            filterForMarkers =
            db.filterAnd([filterForMarkers,
                          db.filterMatchCountry(psgeoDomainDefault.homeCountry)]);
        }

        // 3. Set filter
        if (filterForMarkers !== undefined) db.setFilter(filterForMarkers);
        psgeoDebug("Applying filterForMarkers = " +
                   (filterForMarkers === undefined ? "undef" : (db.filterToString(filterForMarkers))));

        // 4. Allow a situation with no initial filter (show all)
        if (filterForMarkers === undefined) filterForMarkers = { "op": "true" }
    }

    // 5. Apply
    db.applyAllNoFilter(function(item) {
    psgeoInitMarker(db,lib,lang,item,filterForMarkers,myPosition,psgeoPopup,cfg,psgeoDomainDefault);
    });


    // #7 Add an event listener to detect screen resizing
    document.defaultView.addEventListener("resize", (event) => { 

        if (document.defaultView.innerWidth < cfg.psgeoSmallDisplayModeLimit) {
            if (!psgeoSmallDisplayMode) { // Change TO SMALLER SCREEN
                adjustUserInterfaceForSmallScreen(psgeoFilterMenuButtonInStatsPane,psgeoGeolocationButtonInStatsPane);
                putStuffInFilterMenu(); // No FilterPane. Checkboxes must be in Filter Menu.
                psgeoSmallDisplayMode=true;
                cfg.smallDisplayMode=true;   // NEW WAY. NOT YET USED ANYWHERE.
                psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
            }
        } else {
            if (psgeoSmallDisplayMode) { // Change TO BIGGER SCREEN
                adjustUserInterfaceForLargeScreen(psgeoFilterMenuButtonInStatsPane,psgeoGeolocationButtonInStatsPane);
                putStuffInFilterPane(); // FilterPane is visible. Hence, place some controls there.
                psgeoSmallDisplayMode=false;
                cfg.smallDisplayMode=false;   // NEW WAY. NOT YET USED ANYWHERE.
                psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
            }  
        }    
    }); // document.defaultView returns the window object

    // #8 Init place link handling (query string -> open site/photo/map/model)
    psgeoInitPlace(db,lib,lang,map,new URLSearchParams(window.location.search),myPosition,cfg,psgeoPopup,psgeoDomainDefault);

}

function psgeoGetSources() {
    var result = "";
    for ( const source of psgeoSources ) {
        if (result !== "") result = result + '<br/>';
        result = result + lang.getText(source.textId,psgeoSmallDisplayMode);
    }
    return(result);
}

function psgeoInitFilterPaneControl(map,cfg) {

    // FilterPane div creation
    var filterPaneDiv = document.createElement("div");
    filterPaneDiv.setAttribute("id","Filter");

    // Create a div inside FiltePane div and place psgeoFilterPaneTexts array in it. 
    var filterPaneWin = new PsgeoFilterPaneWin(filterPaneDiv, map);
    filterPaneDiv.index = 2;

    // Create a custom control with the FilterPane div in it.
    //     Note that this returns a promise, which takes time to resolve.
    //     filterPaneDiv is thus NOT immediately in the 'document'
    //     and cannot be found by id until a bot later.
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(filterPaneDiv);
    if (document.defaultView.innerWidth < cfg.psgeoSmallDisplayModeLimit) {
        filterPaneDiv.style.display='none';
    }
}

function psgeoInitStatsPaneControl(map) {

    //
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    //
   
    var statsPaneDiv = document.createElement("div");
    statsPaneDiv.setAttribute("id", "Fullstats");

    // Create 9 sub-divs to make place for statistics lines
    var statsPaneWin = new PsgeoStatsPaneWin(statsPaneDiv, map);
    statsPaneDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(statsPaneDiv);
    
}

function psgeoInitDisplaySize(cfg) {

    //
    // Observe the kind of device we run on, the screen size in
    // particular.  Set the small screen mode on if necessary.  The
    // parameters to trigger this mode have been defined at the top of
    // this file.
    //
    // If set, the small screen mode will affect how much filters, etc
    // one gets on the screen, to retain enough space to see the
    // actual map.
    //
    
    psgeoDebug("window inner width " +  window.innerWidth.toString() +
               " and limit " + cfg.psgeoSmallDisplayModeLimit.toString());
    if (window.innerWidth < cfg.psgeoSmallDisplayModeLimit) return true;
    return false;
}

function psgeoInitLanguage(urlParams,psgeoDomainDefault) {

    psgeoDebug("taking language from domain default: " + psgeoDomainDefault.lang);
    
    //
    // The default may be overridden by the 'lang' search parameter. Use, e.g.,
    //
    //    ?lang=fi
    //
    // at the end of your URL to make this happen.
    //
    
    psgeoDomainDefault.lang = "fi";
    const lang = urlParams.get('lang');
    if (lang !== null) {
        switch (lang) {
        case "fi": psgeoDomainDefault.lang = "fi"; break;
        case "sv": psgeoDomainDefault.lang = "sv"; break;
            case "en": psgeoDomainDefault.lang = "en"; break;
        }        
    }
}

function psgeoInitPlaceAux(db,lib,lang,map,param,style,changeCenter,changeZoom,myPosition,cfg,psgeoPopup,psgeoDomainDefault) {
    // db           The database object
    // lib          The lib object
    // map          The Google Maps object
    // param        Name of the place
    // style        A string, either "center", "popup", or "image" depending on desired action
    // RETURNS      n.a.
    
    var place = decodeURI(param);
    var items = db.getNamedItemsPartialMatch(place);
    psgeoDebug("p = " + place + " (" + items.length.toString() + " places match)");
    if (items.length > 0) {
        var item = psgeoPickBest(db,items);
        var coords = {lat: item.lat + cfg.psgeoDefaultZoomForPlaceLatitudeShift, lng: item.lon};
        if (changeCenter) map.setCenter(coords);
        if (changeZoom) map.setZoom(cfg.psgeoDefaultZoomForPlace);
        switch (style) {
        case "center":
            break;
        case "popup":
            psgeoMarkerPopupItem(map,item,psgeoPopup,db,lib,lang,"popup",myPosition,cfg,psgeoDomainDefault);
            break;
        case "image":
            psgeoMarkerPopupItem(map,item,psgeoPopup,db,lib,lang,"image",myPosition,cfg,psgeoDomainDefault);
            break;
        case "map":
            psgeoMarkerPopupItem(map,item,psgeoPopup,db,lib,lang,"map",myPosition,cfg,psgeoDomainDefault);
            break;
        case "model":
            psgeoMarkerPopupItem(map,item,psgeoPopup,db,lib,lang,"model",myPosition,cfg,psgeoDomainDefault);
            break;
        default:
            psgeoDebug("ERROR: invalid style " + style);
        }
    }
}

function psgeoInitPlace(db,lib,lang,map,urlParams,myPosition,cfg,psgeoPopup,psgeoDomainDefault) {

    // Links generated by psGeo can contain one target type parameter.
    //    For example, the default location can be overridden
    //    by the 'p' search parameter at the end of the URL:
    //    ?p=Hyypi%c3%a4nm%c3%a4en%20lippaluola,%20Nurmij%c3%a4rvi
    
    const place = urlParams.get('c');
    const popup = urlParams.get('p');
    const image = urlParams.get('i');
    const model = urlParams.get('o');
    const maprequest = urlParams.get('m');

    let type="";
    let param=""; 
    if (place !== null)      { type = "center"; param=place; };
    if (popup !== null)      { type = "popup";  param=popup; };
    if (image !== null)      { type = "image";  param=image; }
    if (model !== null)      { type = "model";  param=model; };
    if (maprequest !== null) { type = "maprequest"; param=maprequest; }

    if (type !== "") {
        psgeoInitPlaceAux(db,lib,lang,map,param,type,true,true,myPosition,cfg,psgeoPopup,psgeoDomainDefault);
    }

}

function psgeoPickBest(db,entries) {
    if (entries.length == 1) return(entries[0]);
    var longest = -1;
    var bestIndex = 0;
    for (var i = 0; i < entries.length; i++) {
        var entry = entries[i];
        var len = db.getItemLength(entry);
        if (len !== undefined && len > longest) {
            longest = len;
            bestIndex = i;
        }
    }
    return(entries[bestIndex]);
}

function psgeoInitCavemaps(urlParams,psgeoDomainDefault) {

    // The value in Domain Defaults may be overridden by 'cavemaps' search parameter: ?cavemaps=true
    const cavemapssetting = urlParams.get('cavemaps'); // XXXXXX
    if ((cavemapssetting !== null) && (cavemapssetting == true || cavemapssetting == false)) psgeoDomainDefault.cavemaps = cavemapssetting;
}

function psgeoForceDisplayOfCustomLinks(hostname,urlParams,psgeoDomainDefault) {

    //
    // The default may be overridden by the 'luolaseura' search parameter. Use, e.g.,
    //
    //    ?luolaseura=true
    //
    // at the end of your URL to make this happen. This is for testing.
    //
    const luolaseura = urlParams.get('luolaseura');
    if (luolaseura !== null) {
        switch (luolaseura) {
        case "true": psgeoDomainDefault.showCustomLinks = true; break;
        case "false": psgeoDomainDefault.showCustomLinks = false; break;
        default: break;
        }
    }
}


function psgeoInitMapTerrain(psgeoMap,lang,mapLegend,psgeoSmallDisplayMode,baseUrl,layers,apiKey,country,psgeoDomainDefault) {

    // Countries use slightly different URL formats. Adjust getTile() function accordingly.
    //
    // Finland
    // https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/{zoom}/{coord.y}/{coord.x}.png?api-key={apiKey}
    //
    // Sweden
    // https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/token/{apikey}/1.0.0/topowebb/default/3857/{zoom}/{y}/{x}.png
    // Create a token with 360000000 sec validity period, or with N/A
    // https://apimanager.lantmateriet.se/devportal/apis
    //
    // Norway
    // http://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=[Tjenestenavn i cache]&zoom={Z}&x={X}&y={Y}
    // Tjenestenavn i cache: topo4
    // Tjenestenavn i cache: norges_grunnkart
    // https://kartkatalog.geonorge.no/metadata/prosjekt-og-spesielle-cache-tjenester/8ccbd805-7b12-4606-8cfc-11d9cd457399
    //
    // United Kingdom
    // https://osdatahub.os.uk/docs/wmts/technicalSpecification
    //
    // Finnish marine charts
    // https://julkinen.traficom.fi/rasteripalvelu/wmts?request=GetTile&version=1.0.0&service=wmts&layer=Traficom:Merikarttasarja%20C%20public&TILEMATRIXSET=WGS84_Pseudo-Mercator&TileMatrix=WGS84_Pseudo-Mercator:15&tilerow=9523&tilecol=18334&format=image/png&style=default
    
    let setMapCenter = {lat: psgeoDomainDefault.lat, lng: psgeoDomainDefault.lng};
    let setMapZoom = psgeoDomainDefault.zoom;

    // Do not put much code in the getTile function. It is used FREQUENTLY.
    switch (country) {
        case 'FinlandSea':
            var getTile = function(coord,zoom) {
                return(baseUrl + zoom + "&tilerow=" + coord.y + "&tilecol=" + coord.x + "&format=image/png&style=default");
                };
            break;
        case 'Finland':
            var getTile = function(coord,zoom) {
                return(baseUrl + zoom + "/" + coord.y + "/" + coord.x + ".png?api-key=" + apiKey);
                };
            break;
        case 'Sweden':
            var getTile = function(coord,zoom) {
                return(baseUrl + apiKey + "/1.0.0/" + layers + "/default/3857/" + zoom + "/" + coord.y + "/" + coord.x + ".png");
                };
            break;
        case 'Norway':
            var getTile = function(coord,zoom) {
                return(baseUrl + "?layers=" + layers + "&zoom=" + zoom + "&x=" + coord.x + "&y=" + coord.y);
                };
            break;
        case 'UnitedKingdom':
            var getTile = function(coord,zoom) {
                return(baseUrl + layers + "/" + zoom + "/" + coord.x + "/" + coord.y + ".png?key=" + apiKey);
                };
            break;
        case 'World':
            // opentopomap.org
            var getTile = function(coord,zoom) {
                return(baseUrl + zoom + "/" + coord.x + "/" + coord.y + ".png");
                };
            break;
        default:
            throw new Error("psgeoInitMapTerrain: Unsupported WMTS source. Supported: Finland, Sweden, Norway, UnitedKingdom, World.");
    }

    return(new google.maps.ImageMapType({
        getTileUrl: getTile,
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 20,
        minZoom: 0,
        zoom: setMapZoom,
        center: setMapCenter,
        name: lang.getText(mapLegend,psgeoSmallDisplayMode)
    }));
}

function psgeoInitPopup(map) {
    let psgeoPopup = new google.maps.InfoWindow({
        content: ""
    });
    psgeoMap.addListener('click', function() {
        psgeoMapClick(psgeoMap,psgeoPopup);
    });
    return psgeoPopup
}

function psgeoMapClick(map,psgeoPopup) {
    // requires: map
    // returns:
    // changes: psgeoPopup, psgeoFilterWindow, psgeoMoreWindow, psgeoAboutWindow, psgeoOtherToolsWindow
    // called by: psgeoInitPopup
    // calls: 

    // Clear any windows if the map is clicked.
    //     One exception: Modern filter window. Let the user keep it open while panning/zooming the map.
    psgeoDebug("map clicked/tapped!");
    if (psgeoPopup !== undefined) psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close(); 
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
}

function psgeoInitLinkHandlers(db,lib,lang,map,myPosition,cfg,psgeoDomainDefault) {
    // called by: psgeoInitPlace
    // calls: psgeoInitPlaceAux

    function processLinksWithQueryStrings(href) {
        psgeoDebug("Caught link click to " + href);
        const begin = href.substring(0,3);
        const rest = href.substring(3);

        let type;
        switch (begin) {
            case "?=p": type = "popup"; break;
            case "?=i": type = "image"; break;
            case "?=m": type = "map"; break;
            case "?=o": type = "model"; break;
            default: return true;
        }
        psgeoInitPlaceAux(db,lib,lang,map,rest,type,false,false,myPosition,cfg,psgeoPopup,psgeoDomainDefault);
        return(false);
    }

    let anchors = document.getElementsByTagName("a"); // type of anchors is HTMLCollection
    for (const anchor of anchors ) { // Very heavy.
        anchor.addEventListener("onpointerdown", processLinksWithQueryStrings(anchor.href))
    }
}

function psgeoInitLib() {
    var lib = PsgeoLib();
    return(lib);
}

function parseQueryString() {

    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    // let value = params.some_key; // "some_value"

    let lang = params.lang;
    let luolaseura = params.luolaseura;

}

async function psgeoInit() {

    // Analyze the query string for possible parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const directory = pathname.substring(0,pathname.lastIndexOf("/"));

    // Create main objects
    const lib = PsgeoLib();         // a general use function library
    const cfg = PsgeoSettings();    // methods to retrieve psgeo settings
    const db  = PsgeoDB(lib,[],""); // database and filtering methods
    const tbl = PsgeoTables();      // structure of statistics display
    const geolocation = PsgeoLocation(); // geolocation button

    // Read settings from JSON
    var fetchDomainDefaultsTiming = lib.timingInitialize("fetch settings");
    const psgeoDomainDefault = await cfg.getDomainDefault(hostname,pathname,directory);
    const psgeoSources = psgeoDomainDefault.sources; // where the JSON is retrieved from
    lib.timingReport(fetchDomainDefaultsTiming);

    // Update Domain Defaults based on URL parameters
    psgeoInitLanguage(urlParams,psgeoDomainDefault);          // ?lang=... 
    psgeoInitCavemaps(urlParams,psgeoDomainDefault); // ?cavemaps=true
    psgeoForceDisplayOfCustomLinks(hostname,urlParams,psgeoDomainDefault); // ?luolaseura=true

    // Translation library
    const lang = PsgeoLang(psgeoDomainDefault.lang); psgeoDebug("lang: "+lang);

    // React to small screens
    psgeoSmallDisplayMode = psgeoInitDisplaySize(cfg); // true or false
    cfg.smallDisplayMode=psgeoSmallDisplayMode

    // A position object to store users position, heading and speed and a marker object on the map.
    var myPosition = { lat:null, lng:null, alt:null, heading:null, speed:null }    // position ?
    // const markerMyPosition = new google.maps.InfoWindow({ disableAutoPan:true }); // DEFINED IN psgeolocation.js

    // Initialize the map
    psgeoInitMap(lib,db,cfg,tbl,lang,geolocation,psgeoDomainDefault,psgeoSmallDisplayMode,myPosition,queryString,urlParams);
}


function psgeoInitMap(lib,db,cfg,tbl,lang,geolocation,psgeoDomainDefault,psgeoSmallDisplayMode,myPosition,queryString,urlParams) {

    //
    // Create map
    //
    let mapTiming = lib.timingInitialize("new google.maps.Map");

    // Set the map type selectors style
    let mapTypeControlStyle = google.maps.MapTypeControlStyle.HORIZONTAL_BAR;
    if ((psgeoDomainDefault.mapTypeControlStyle === "DROPDOWN_MENU") ||
        (psgeoDomainDefault.mapTypeControlStyle === "DEFAULT" && psgeoSmallDisplayMode)) {
        mapTypeControlStyle = google.maps.MapTypeControlStyle.DROPDOWN_MENU;
    }

    // Initialize the map and center it around default position
    psgeoMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: psgeoDomainDefault.lat, lng: psgeoDomainDefault.lng},
        zoom: psgeoDomainDefault.zoom,
        //gestureHandling: "greedy",
        styles: [
            {
                "featureType": "administrative.country",
                "stylers": [
                    { "visibility": "on" },
                    { "weight": 1.2 }
                ]
            }
        ],
        mapTypeControlOptions: {
            style: mapTypeControlStyle,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
            ]
        },
        streetViewControl: false
    });
    lib.timingReport(mapTiming);


    //
    // Topographic maps 
    //
    var topoMapTiming = lib.timingInitialize("initializeTopoMaps");
    // Position in menu: base map = 0, satellite = 1, topomaps = 2,3...
    // This counter gets incremented for each topomap
    let positionInMapSelectorOnScreen = 1;
    for (const country in psgeoDomainDefault.topographicMaps) {
        psgeoDebug('Checking topographic map selection for '+country);
        let topoMapSettings = psgeoDomainDefault.topographicMaps[country];
        if (topoMapSettings.show) {
            psgeoDebug("   ... "+country+" included.");
            let baseUrl =   topoMapSettings.baseUrl;
            let layers =    topoMapSettings.layers;   // Norway uses
            let apiKey =    topoMapSettings.apiKey;   // Norway does not use
            let mapLegend = topoMapSettings.textId;

            let topoMap;
            positionInMapSelectorOnScreen++; // 2,3,...

            topoMap = psgeoInitMapTerrain(psgeoMap,lang,mapLegend,psgeoSmallDisplayMode,baseUrl,layers,apiKey,country,psgeoDomainDefault);
            psgeoMap.mapTypes.set(lang.getText(mapLegend,psgeoSmallDisplayMode),topoMap);
            psgeoMap.mapTypeControlOptions.mapTypeIds[positionInMapSelectorOnScreen] = lang.getText(mapLegend,psgeoSmallDisplayMode);
        }
    }
    lib.timingReport(topoMapTiming);

   
    //
    // Enable map zoom related updates
    //
    psgeoMap.addListener('zoom_changed', function() {
        psgeoZoomChanged(db,psgeoMap.getZoom(),psgeoDomainDefault)
    },psgeoDomainDefault);


    //
    // Detect map type change to UK and recenter and zoom map visible
    // 
    psgeoMap.addListener('maptypeid_changed', function() {

        let mapType = psgeoMap.getMapTypeId();
        mapType = mapType.replace(/ .*/,''); // First word
        let mapCenter = psgeoMap.getCenter();
        let mapCenterLng = mapCenter.lng();
        let mapCenterLat = mapCenter.lat();
        let UK = ((-8 < mapCenterLng && mapCenterLng < 2) && ( 49 < mapCenterLat && mapCenterLat < 61 ));

        switch (mapType) {
            case "UK": {
                // Ordnance Survey UK topographic map is only visible at zoom levels 7 and up
                if (psgeoMap.getZoom()<7) psgeoMap.setZoom(7);
                // Do not recenter the map if we are already looking at UK
                if (!UK) psgeoMap.setCenter({lat:53,lng:-2});
                break;
                }
            default: break; 
        }
    });

    //
    // Restore this days tracks onto the map
    //
    const posixTime = new Date()                                        // seconds since 1.1.1970
    const isoDate = posixTime.toISOString().substring(0,10)             // YYYY-MM-DD for filtering
    // const currentHour = posixTime.toISOString().substring(11,13)     // HH
    geolocation.restoreTraceFromDb(lib,isoDate,psgeoMap)

    //
    // Initialize activity markers
    //
    var imagesTiming = lib.timingInitialize("psgeoInitMarkerImages");
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    lib.timingReport(imagesTiming);

    //
    // Initialize custom controls
    //
    psgeoDebug("initFilterPaneControl...");
    psgeoInitFilterPaneControl(psgeoMap,cfg);
    psgeoDebug("initStatsPaneControl...");
    psgeoInitStatsPaneControl(psgeoMap);
    let psgeoPopup = psgeoInitPopup(psgeoMap);

    //
    // Initialize the JSON database + filters
    //
    psgeoDebug("initList...");
    psgeoInitList(db, lib,lang,psgeoMap,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);

    //
    // Initialize link handlers
    //
    psgeoDebug("initLinkClicks");
    psgeoInitLinkHandlers(db,lib,lang,psgeoMap,myPosition,cfg,psgeoDomainDefault);
    psgeoDebug("all initialisations done.");
 }

