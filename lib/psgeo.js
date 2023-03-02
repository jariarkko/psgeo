
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
var psgeoMap;
var psgeoList; // database
var psgeoMarkerList;
var psgeoMarkerItemList;
var psgeoMarkerImage;
var psgeoMarkerShape;
var psgeoFilterPaneTexts = [];
var psgeoStatsPaneTexts = [];
// Filtering
var psgeoRangeFilterCheckboxes = [];
var psgeoCaveMapFilterCheckbox = undefined;
var psgeoActivityFilterCheckboxes = [];
var psgeoNameFilterInput = undefined;
var psgeoOnlyFinlandFilterCheckbox = undefined;
var psgeoOtherCountriesFilterCheckbox = undefined;
var psgeoSubtypeGroupCheckboxLists = [];
var psgeoSourceFilterCheckboxes = [];
// Buttons
var psgeoFilterMenuButton = undefined;  // opens the advanced filter window
var psgeoMoreMenuButton = undefined;    // opens a window with custom links, info, about
var psgeoGeolocationButton = undefined;
var psgeoOtherToolsMenuButton = undefined;
var psgeoAboutMenuButton = undefined;
// Windows 
var psgeoFilterWindow = undefined;      // advanced filtering
var psgeoMoreWindow = undefined;        // more info and links
var psgeoAboutWindow = undefined;       // credits
var psgeoOtherToolsWindow = undefined;  // more external links, one window level deeper
var psgeoSmallDisplayMode = false;      // by default

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

function psgeoGetClickableUrl(db,item) {
    var u = db.getReadingListItemURL(item);
    if (u === undefined) {
        u = db.getReadingListItemPublicationURL(item);
    }
    return(u);
}

function psgeoMarkerPopup(map,marker,popup,db,lib,lang,myPosition,cfg,psgeoDomainDefault) {
    psgeoMarkerPopupItem(map,marker.item,popup,db,lib,lang,"popup",myPosition,cfg,psgeoDomainDefault);
}

function psgeoMarkerPopupItem(map,item,popup,db,lib,lang,style,myPosition,cfg,psgeoDomainDefault) {
    var html = "";
    switch (style) {
    case "popup":
        html = db.describeItem(lang,item,true,psgeoSmallDisplayMode === true,myPosition);
        break;
    case "image":
        var widthPercentage =
            psgeoSmallDisplayMode ? cfg.psgeoImagePercentageSmallDisplays : cfg.psgeoImagePercentageLargeDisplays;
        var width = Math.ceil((window.innerWidth * widthPercentage) / 100);
        var params = 'width="' + width.toString() + '"';
        var imageUrl = db.getItemRepresentativeImageURL(item);
        var itemUrl = "?p=" + encodeURI(db.getItemName(item));
        html = lib.htmlLink(lib.htmlImage(imageUrl,params),itemUrl,false);
        break;
    case "map":
        var mapUrl = db.getItemMap(item);
        if (mapUrl === undefined) {
            psgeoMarkerPopupItem(map,item,popup,db,lib,lang,"popup",myPosition,cfg,psgeoDomainDefault);
        } else {
            window.location.replace(mapUrl);
        }
        return;
    case "model":
        var modelUrl = db.getItemSpecificModel(item,cfg.psgeoViewableModel);
        if (modelUrl === undefined) {
            psgeoMarkerPopupItem(map,item,popup,db,lib,lang,"popup",myPosition,cfg,psgeoDomainDefault);
        } else {
            var viewerUrl = "viewer.html";
            viewerUrl += "?n=" + encodeURI(db.getItemName(item));
            viewerUrl += "&m=" + encodeURI(modelUrl);
            window.open(viewerUrl, '_blank');
        }
        return;
        var modelHtml = "";
        if (modelUrl === undefined) {
            modelHtml += lib.htmlParagraph("Cave " + db.getItemName(item) + " has no suitable 3D model to display");
        } else {
            var widthPercentage =
                (psgeoSmallDisplayMode ?
                 cfg.psgeoModelViewerWidthPercentageSmallDisplays :
                 cfg.psgeoModelViewerWidthPercentageLargeDisplays);
            var heightPercentage = 
                (psgeoSmallDisplayMode ?
                 cfg.psgeoModelViewerHeightPercentageSmallDisplays :
                 cfg.psgeoModelViewerHeightPercentageLargeDisplays);
            var width = Math.ceil((window.innerWidth * widthPercentage) / 100);
            var height = Math.ceil((window.innerHeight * heightPercentage) / 100);
            modelHtml += '<model-viewer style="width: ' + width + 'px; height: ' + height + 'px; top: 0px;  position: sticky; background-color: black;"\n';
            modelHtml += '  src="'
            modelHtml += modelUrl;
            modelHtml += '"\n';
            modelHtml += '  alt="Cave model" auto-rotate auto-rotate-delay="500"\n';
            modelHtml += '  camera-controls camera-orbit="0deg 75deg 300%" max-field-of-view="30deg" min-field-of-view="1deg">\n';
            modelHtml += '</model-viewer>\n';
        }
        var listHtml = psgeoDescribeModel(lib,lang,db.getItemModel(item));
        var alternativeModels = db.getItemAlternativeModels(item);
        for (var x = 0; x < alternativeModels.length; x++) {
            var altModel = alternativeModels[x];
            var modelType = psgeoGetModelType(lib,lang,altModel);
            if (modelType == "ICON") continue;
            listHtml += ", ";
            listHtml += psgeoDescribeModel(lib,lang,altModel);
        }
        var downloadHtml = "Or download models: " + listHtml + ".";
        var itemUrl = ("?p=" + encodeURI(db.getItemName(item)));
        var backHtml = lib.htmlLink("Back",itemUrl,false) + ".";
        psgeoDebug("modelHtml: " + modelHtml);
        psgeoDebug("downloadHtml: " + downloadHtml);
        psgeoDebug("backHtml: " + backHtml);
        html = modelHtml + lib.htmlParagraph(backHtml + " " + downloadHtml);
        break;
    default:
        psgeoDebug("ERROR: Invalid style " + style);
        break;
    }
    
    if (!psgeoDomainDefault.classicUI) map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    popup.setContent(html);
    popup.setPosition(new google.maps.LatLng(db.getItemLat(item),db.getItemLon(item)));
    popup.open(map);
    popup.setZIndex(1000);
}

function psgeoGetModelType(lib,lang,modelUrl) {
    var modelType = lang.getText("otherFormat");
    var lower = modelUrl.toLowerCase();
    if (lower.search(/icon[.]jpg/) != -1) modelType = "ICON";
    if (lower.search(/[.]jpg/) != -1) modelType = "JPG";
    if (lower.search(/[.]glb/) != -1) modelType = "GLB";
    if (lower.search(/[.]mp4/) != -1) modelType = "MP4";
    if (lower.search(/[.]blend/) != -1) modelType = "BLENDER";
    if (lower.search(/[.]dxf/) != -1) modelType = "DXF";
    if (lower.search(/[.]3d/) != -1) modelType = "Aven";
    if (lower.search(/[.]stl/) != -1 || lower.search(/stl[.]zip/) != -1) modelType = "STL";
    if (lower.search(/[.]obj/) != -1 || lower.search(/obj[.]zip/) != -1) modelType = "OBJ";
    return(modelType);
}

function psgeoDescribeModel(lib,lang,modelUrl) {
    var modelType = psgeoGetModelType(lib,lang,modelUrl);
    return(lib.htmlLink(modelType,modelUrl,true));
}

function psgeoMarkerClick(lang, db, lib, marker,myPosition,cfg,psgeoDomainDefault,psgeoPopup) {
    psgeoMarkerPopup(psgeoMap,marker,psgeoPopup,db,lib,lang,myPosition,cfg,psgeoDomainDefault);
}

function psgeoArticlesText(db,lang,item) {
    var rl = db.getItemReadingList(item);
    if (db.hasItemReadingListUrl(item)) {
        if (rl.length == 1) {
            return(lang.capitalize(lang.getText("article")) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]));
        } else {
            return(lang.capitalize(lang.getText("article")) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]) +
                   "\n" +
                   (rl.length-1).toString() +
                   " " +
                   lang.getText("other") +
                   " " +
                   lang.getText("articles"));
        }
    } else if (db.hasItemReadingListPublication(item)) {
        for (var i = 0; i < rl.length; i++) {
            if (db.getReadingListItemPublication(rl[i]) !== undefined) {
                return(lang.capitalize(lang.getText("publication")) +
                       ": " +
                       db.getReadingListItemPublication(rl[i]));
            }
        }
        return(lang.capitalize(lang.getText("noArticleYet")));
    } else {
        return(lang.capitalize(lang.getText("noArticleYet")));
    }
}

function psgeoInitMarker(db,lib,lang,item,filter,myPosition,psgeoPopup,cfg,psgeoDomainDefault) {
    var zoom = psgeoMap.getZoom();
    var visible = db.matchFilter(item,filter);
    var latlon = new google.maps.LatLng(db.getItemLat(item),
                                        db.getItemLon(item));
    var t;
    var altstring = "";
    
    if (visible && !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoom,psgeoDomainDefault)) {
        visible = false;
    }
    if (db.getItemFuzzy(item)) {
        altstring = altstring + " -- " + lang.getText("locationSecret");
    }
    if (db.getItemAlt(item) != undefined) {
        altstring = altstring + " " + db.getItemAlt(item).toString() + "m";
    }

    if (psgeoDomainDefault.cavemaps) {    // XXXXXXXXX cavemaps can have inexact length. What else can?
        var lengthtext = "";
        if (db.getItemLength(item) !== undefined) {
            lengthtext = db.getItemLength(item).toString() + "m"
            if (db.getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
        }
        t = db.getItemName(item) + altstring;
        if (lengthtext.length > 0) {
            t += " (" + lengthtext + ")";
        }
        t += ":\n";
        if (db.getItemMap(item) !== undefined) {
            t += lang.capitalize(lang.getText("map"));
            t += "\n";
        }
        var sidecaves =  db.getItemSideCaves(item);
        if (sidecaves.length > 0) {
            t += sidecaves.length.toString() + " " + lang.getText("sideCaves");
            t += "\n";
        }
        t += psgeoArticlesText(db,lang,item);
    } else {
        t = db.getItemName(item);
        t += altstring;
        t += ":\n";
        t += psgeoArticlesText(db,lang,item);
    }

    // XXXXXXXXXX Dominant activity fixed to Caving in settings OR retrieved from db!!!
    var dominantActivity = psgeoDomainDefault.cavemaps ? "Caving" : db.dominantActivity(item);
    var image = lib.getActivityMarkerImage(dominantActivity);
    var marker = new google.maps.Marker({
        position: latlon,
        map: visible ? psgeoMap : null,
        title: t,
        item: item,
        icon: image,
        shape: psgeoMarkerShape,
        zIndex: 1
    });
    google.maps.event.addListener(marker, 'click',
                                  function() {
                                      psgeoDebug("Clicked/tapped marker");
                                      psgeoMarkerClick(lang,db,lib,marker,myPosition,cfg,psgeoDomainDefault,psgeoPopup);
                                  });
    psgeoMarkerList.push(marker);
    psgeoMarkerItemList.push(item);
}

function psgeoCreateRangeCheckbox(db,lang,document,subsubdiv1b,size,name,br) {
    var box = psgeoGetGenericCheckbox(size,lang.capitalize(name),subsubdiv1b,true,br);
    psgeoRangeFilterCheckboxes.push(box);
}

function psgeoCreateCaveMapCheckbox(db,lang,document,subsubdiv1b,name,br,psgeoDomainDefault) {
    var box = psgeoGetGenericCheckbox("map",
                                      lang.capitalize(name),
                                      subsubdiv1b,
                                      psgeoDomainDefault.cavemapsFilterInitiallyOn,
                                      br);
    psgeoCaveMapFilterCheckbox = box;
}

function psgeoCreateActivityCheckbox(db,lang,document,subsubdiv1b,activitylist,name,br) {
    var checked = false;
    var filt = db.getFilter();
    var acts = db.getFilterActivities(filt);
    for (var i = 0; i < acts.length; i++) {
        if (activitylist.indexOf(acts[i]) >= 0) {
            checked = true;
        }
    }
    var box = psgeoGetGenericCheckbox(activitylist,lang.capitalize(name),subsubdiv1b,checked,br);
    psgeoActivityFilterCheckboxes.push(box);
}

function psgeoInitFilterPaneText(db,lib,lang,map,div,smallPane,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    var subsubdiv1b = document.createElement('div');
    var items = psgeoDomainDefault.cavemaps ? [] : lib.getActivityList();
    var otheritems = [];
    if (psgeoSmallDisplayMode && items.length > 0) {
        psgeoFilterSectionPrefix(lang,lang.getText("activity",psgeoSmallDisplayMode),subsubdiv1b);
    }
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item !== "Other" && !lib.isOtherActivity(item)) {
            var shortActivity = lib.getActivityShortName(item);
            var oneactivity = [];
            oneactivity.push(item);
            psgeoCreateActivityCheckbox(db,lang,document,subsubdiv1b,oneactivity,shortActivity,smallPane);
        }
    }

    //
    // jos cavemaps: true niin näytä rangeFilter
    //
    if (psgeoDomainDefault.cavemaps) {
        if (psgeoSmallDisplayMode) psgeoFilterSectionPrefix(lang,lang.getText("size",psgeoSmallDisplayMode),subsubdiv1b);

        // psgeoDomainDefault.rangeCategoryLimits has: measure, unit, limitLow, limitHigh. lang has rangeHigh/Medium/Low texts with values.
        let measureName = lang.getText(psgeoDomainDefault.rangeCategoryLimits.measure,false); // measure: "length", "depth", "grade", ... TRANSLATED
        let unit = lang.getText(psgeoDomainDefault.rangeCategoryLimits.unit,false); // unit: "", "meters", "kilometers", "minutes", ... TRANSLATED
        psgeoCreateRangeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "rangeHigh", // -> checkbox value -> Filtering
                                    lang.getTextWithValues("rangeHigh",
                                                           psgeoSmallDisplayMode,
                                                           [measureName,psgeoDomainDefault.rangeCategoryLimits.limitHigh,unit]),

                                    !psgeoSmallDisplayMode)
        psgeoCreateRangeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "rangeMedium", 
                                    lang.getTextWithValues("rangeMedium",
                                                           psgeoSmallDisplayMode,
                                                           [measureName,psgeoDomainDefault.rangeCategoryLimits.limitLow,psgeoDomainDefault.rangeCategoryLimits.limitHigh,unit]),
                                    !psgeoSmallDisplayMode)
        psgeoCreateRangeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "rangeLow",
                                    lang.getTextWithValues("rangeLow",
                                                           psgeoSmallDisplayMode,
                                                           [measureName,psgeoDomainDefault.rangeCategoryLimits.limitLow,unit]),
                                    !psgeoSmallDisplayMode)
        if (psgeoSmallDisplayMode) psgeoFilterSectionPrefix(lang,lang.getText("map",psgeoSmallDisplayMode),subsubdiv1b);
        psgeoCreateCaveMapCheckbox(db,
                                   lang,
                                   document,
                                   subsubdiv1b,
                                   lang.getText("withMap",psgeoSmallDisplayMode),
                                   true,
                                   psgeoDomainDefault)

    //
    // Mutta jos cavemaps: false, niin näytä activity valinta
    //

    } else {
        psgeoCreateActivityCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    lib.getOtherActivityList(),
                                    "Other",
                                    true)
    }
    div.appendChild(subsubdiv1b);

    div.addEventListener('click', function() {
        psgeoDebug("Filter 1 pressed!");
        psgeoRerunFilters(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    });
    
}

function psgeoAllBoxesChecked(list) {
    for (var i = 0; i < list.length; i++) {
        if (!list[i].checked) return(false);
    }
    return(true);
}

function psgeoInvertAllCheckboxes(list) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].checked) {
            list[i].checked=false;
        } else {
            list[i].checked=true;
        }
    }
    return(true);
}

function psgeoCreateSubactivityFilterFromCheckboxes(db,activities,list) {
    var subactivities = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].checked) {
            subactivities.push(list[i].value);
        }
    }
    return(db.filterMatchMultiSubActivities(activities,subactivities));
}

function psgeoCreateNameFilter(db,lib,lang,map) {
    if (psgeoNameFilterInput === undefined) return(undefined);
    if (psgeoNameFilterInput.value.length == 0) return(undefined);
    return(db.filterMatchName(psgeoNameFilterInput.value,false));
}

function psgeoCreateSubtypeGroupFilters(db,lib,lang,map) {
    var result = [];
    for (var i = 0; i < psgeoSubtypeGroupCheckboxLists.length; i++) {
        var entry = psgeoSubtypeGroupCheckboxLists[i];
        var one = psgeoCreateSubtypeGroupFilter(db,lib,lang,map,entry);
        if (one !== undefined) {
            result.push(one);
        }
    }
    return(result);
}

function psgeoCreateSubtypeGroupFilter(db,lib,lang,map,entry) {
    var group = entry.group;
    var checkboxes = entry.checkboxes;
    if (checkboxes.length == 0 || psgeoAllBoxesChecked(checkboxes)) return(undefined);
    return(psgeoCreateSubactivityFilterFromCheckboxes(db,group.activities,checkboxes));
}

function psgeoCreateOnlyFinlandFilter(db,lib,lang,map,psgeoDomainDefault) {

    function finlandPartFilter(checked,psgeoDomainDefault) { 
        if (checked) return(db.filterMatchCountry(psgeoDomainDefault.finlandcountryname));
        return(undefined);
    }
    
    function otherPartFilter(checked,psgeoDomainDefault) { 
        if (checked) return(db.filterNot(db.filterMatchCountry(psgeoDomainDefault.finlandcountryname)));
        return(undefined);
    }
    
    if (psgeoOnlyFinlandFilterCheckbox === undefined && psgeoOtherCountriesFilterCheckbox === undefined) return(undefined);
    if (psgeoOnlyFinlandFilterCheckbox !== undefined && psgeoOtherCountriesFilterCheckbox === undefined) {
        return(finlandPartFilter(psgeoOnlyFinlandFilterCheckbox.checked,psgeoDomainDefault)); }
    if (psgeoOnlyFinlandFilterCheckbox === undefined && psgeoOtherCountriesFilterCheckbox !== undefined) {
        return(otherPartFilter(psgeoOtherCountriesFilterCheckbox.checked,psgeoDomainDefault)); }

    var filters = [];
    var one = finlandPartFilter(psgeoOnlyFinlandFilterCheckbox.checked,psgeoDomainDefault);
    if (one !== undefined) filters.push(one);
    var other = otherPartFilter(psgeoOtherCountriesFilterCheckbox.checked,psgeoDomainDefault);
    if (other !== undefined) filters.push(other);
    return(db.filterOr(filters));
}

function psgeoRerunFilters(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    var newBasicFilters = [];
    var newSizeFilters = [];
    var newOnlyFinlandFilter = psgeoCreateOnlyFinlandFilter(db,lib,lang,map,psgeoDomainDefault);
    var newMapFilter = undefined;
    var newNameFilter = psgeoCreateNameFilter(db,lib,lang,map);
    var newSubtypeGroupFilters = psgeoCreateSubtypeGroupFilters(db,lib,lang,map);
    var rangeHighFlag = false;
    var rangeMediumFlag = false;
    var rangeLowFlag = false;

    psgeoDebug("We have " + psgeoActivityFilterCheckboxes.length.toString() + " activity checkboxes " +
               "and " + psgeoRangeFilterCheckboxes.length.toString() + " cave size checkboxes");

    // Filter by activity ("basic filter")
    for (const one of psgeoActivityFilterCheckboxes) {
        if (one.checked) {
            var newFilter = db.filterMatchActivities(one.value.split(","));
            newBasicFilters.push(newFilter);
        }
    }

    // Filter by existence of a sitemap
    if (psgeoCaveMapFilterCheckbox !== undefined &&
        psgeoCaveMapFilterCheckbox.checked) {
        newMapFilter = db.filterMatchMap(true);
    }

    // Filter by site measure (length, depth, height, grade, temp, etc.)
    for (const one of psgeoRangeFilterCheckboxes) {
        if (one.checked) {
            var newFilter;
            switch (one.value) {
            case "rangeHigh":
                newFilter = db.filterRange("min",psgeoDomainDefault.rangeCategoryLimits.limitHigh);
                newSizeFilters.push(newFilter);
                rangeHighFlag = true;
                break;
            case "rangeMedium":
                var newFilter1 = db.filterRange("min",psgeoDomainDefault.rangeCategoryLimits.limitLow);
                var newFilter2 = db.filterRange("max",psgeoDomainDefault.rangeCategoryLimits.limitHigh);
                newFilter = db.filterAnd([newFilter1,newFilter2]);
                newSizeFilters.push(newFilter);
                rangeMediumFlag = true;
                break;
            case "rangeLow":
                newFilter = db.filterRange("max",psgeoDomainDefault.rangeCategoryLimits.limitLow);
                newSizeFilters.push(newFilter);
                rangeLowFlag = true;
                break;
            default:
                psgeoDebug("ERROR: Invalid filter received");
                break;
            }
        }
    }

    //
    // Build the final filter
    //

    // 1 Apply the newBasic, newMap and newSize filters defined above
    var basicFilter = db.filterOr(newBasicFilters);
    if (psgeoDomainDefault.cavemaps) basicFilter = db.filterTrue(); // though
    var sizeFilter = db.filterTrue();
    if (psgeoDomainDefault.cavemaps &&	// XXXXXX cavemaps?
        (!rangeHighFlag || !rangeMediumFlag || !rangeLowFlag)) {
        sizeFilter = db.filterOr(newSizeFilters);
    }
    var finalFilter = db.filterAnd([basicFilter,sizeFilter]);

    // 2 Add country limitation
    if (newOnlyFinlandFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newOnlyFinlandFilter]);
    }

    // 3 Add possible requirement of a site map
    if (newMapFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newMapFilter]);
    }

    // 4 Add filtering by name
    if (newNameFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newNameFilter]);
    }

    // 5 all other filters (rock types, sauna types, snow types, etc) are defined
    // via what we call subtype groups
    for (const one of newSubtypeGroupFilters) {
        finalFilter = db.filterAnd([finalFilter,one]);
    }

    // 6 Don't forget to add filtering by data source
    if (psgeoSourceFilterCheckboxes.length > 0) {
        var sourceFilter = psgeoMakeSourceFilter(db,psgeoSourceFilterCheckboxes);
        finalFilter = db.filterAnd([finalFilter,sourceFilter]);
    }

    psgeoDebug("Rerun filters: before db.setFilter(finalFilter)");
        psgeoDebug("Final filter to be installed:\n" + db.filterToString(finalFilter));
        psgeoDebug("db.getFilter = " + db.filterToString(db.getFilter()));
    db.setFilter(finalFilter);
    psgeoDebug("Rerun filters: after db.setFilter(finalFilter)");
        psgeoDebug("Final filter installed:\n" + db.filterToString(finalFilter));
        psgeoDebug("db.getFilter = " + db.filterToString(db.getFilter()));
    psgeoRecheckVisibility(db,psgeoMap.getZoom(),psgeoDomainDefault);
    psgeoUpdateStatsPane(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
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
        var m = psgeoMarkerList[i];		// GLOBAL VAR
        var item = psgeoMarkerItemList[i];	// GLOBAL VAR
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

function psgeoMoreFilterWindowNeeded(psgeoDomainDefault) {
    return(psgeoDomainDefault.nameSearch ||
           psgeoDomainDefault.rockTypeSearch ||
           psgeoDomainDefault.morphologySearch ||
           psgeoDomainDefault.waterbodySearch ||
           psgeoDomainDefault.saunaTypeSearch ||
           psgeoDomainDefault.bikingSearch ||
           psgeoDomainDefault.urbanexTargetSearch ||
           psgeoDomainDefault.skiingSubstanceSearch ||
           psgeoDomainDefault.skiingUphillSearch ||
           psgeoDomainDefault.climbingTypeSearch ||
           psgeoDomainDefault.finlandselection);
}

function psgeoStatLineEmpty(lang,n) {
    return("");
}

function psgeoStatLineNumberOfCaves(lang,n) {
    return(n.toString() + " " + lang.getText("caves"));
}

function psgeoStatLineNumberOfPlaces(lang,n) {
    return(n.toString() + " " + lang.getText("places"));
}

function psgeoStatLineNumberOfCities(lang,n) {
    return(n.toString() + " " + lang.getText("cities"));
}

function psgeoStatLineNumberOfCountries(lang,n) {
    return(n.toString() + " " + lang.getText("countries"));
}

function psgeoStatLineNumberOfContinents(lang,n) {
    return(n.toString() + " " + lang.getText("continents"));
}

function psgeoStatLineNumberOfStates(lang,n) {
    return(n.toString() + " " + lang.getText("states"));
}

function psgeoStatLineNumberOfProvinces(lang,n) {
    return(n.toString() + " " + lang.getText("provinces"));
}

function psgeoStatLineNumberOfCaveMaps(lang,n) {
    return(n.toString() + " " + lang.getText("caveMaps"));
}

function psgeoUpdateStatsPaneText(db,
                                  lib,
                                  lang,
                                  map,
                                  arrayitems,
                                  ncontinents,
                                  ncountries,
                                  ncities,
                                  nstatesus,
                                  nstatesca,
                                  ncavemaps,
                                  nplaces,
                                  myPosition,
                                  psgeoPopup,
                                  tbl,
                                  cfg,
                                  psgeoDomainDefault) {
    let prefix = "<br>";
    let postfix = "";
    let headerLevel = "3";

    // Smaller font, smaller header on small displays
    if (psgeoSmallDisplayMode) {
        prefix = "<font size=\"-1\">";
        postfix = "</font>";
        headerLevel = "5";
    }

    //
    // Show the count of places (or caves), cities, countries, based
    // on the configuration table that tells what data is shown in
    // what situation. The size of the screen also affects this.
    //

    // let statLines = psgeoDomainDefault.statLines;
    let statLines = tbl.getStatLines(psgeoDomainDefault.statLines);
    arrayitems[0].innerHTML = (statLines.place[psgeoSmallDisplayMode])(lang,nplaces);
    arrayitems[1].innerHTML = (statLines.city[psgeoSmallDisplayMode])(lang,ncities);
    arrayitems[2].innerHTML = (statLines.country[psgeoSmallDisplayMode])(lang,ncountries);
    arrayitems[3].innerHTML = (statLines.continent[psgeoSmallDisplayMode])(lang,ncontinents);
    arrayitems[4].innerHTML = (statLines.state[psgeoSmallDisplayMode])(lang,nstatesus);
    arrayitems[5].innerHTML = (statLines.province[psgeoSmallDisplayMode])(lang,nstatesca);
    arrayitems[6].innerHTML = (statLines.cavemap[psgeoSmallDisplayMode])(lang,ncavemaps);
 
 
    // Create buttons to Filter pane and Stats pane
    //     The functions psgeoGet*Button accept button placement as second parameter
    //     Attention: psgeoSmallDisplayMode modulates placement (to upper/lower pane)
    //     Note that both Filter menu button and More menu button are in the stats window on small screens!

    if (psgeoFilterMenuButton === undefined &&
        psgeoMoreFilterWindowNeeded(psgeoDomainDefault)) {  // true jos tarvitaan nimihakua tai muita filttereitä!
        let filterButtonLocation = 
            psgeoSmallDisplayMode ?
            arrayitems[8] :            // Button to lower pane. Position: after 8th div.
            psgeoFilterPaneTexts[0];   // Button to upper pane. Position: after 1st div (with many labels).
        psgeoFilterMenuButton =
            psgeoGetFilterMenuButton(lang,
                                     filterButtonLocation,
                                     function() {
                                         psgeoDebug("Filter button pressed!");
                                         psgeoFilterMenuBringUp(db,lib,lang,map,true,psgeoSmallDisplayMode,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
                                     },
                                     cfg,
                                     psgeoDomainDefault);
    }

    // GEOLOCATION CODE BEGIN

    // If a Geolocation button is undefined, then make it here
    if (psgeoGeolocationButton === undefined) {

        // INIT VARIABLES
        const geolocationOptions =     {maximumAge:0, timeout:60000, enableHighAccuracy: true};
        let geolocatorId = 0;          // Worker id needed to stop it. Actual real ids start from 1.
        let geolocationClicks = 0;     // Geolocation button is on/off toggle depending on %2
        let geolocationButtonLocation = 
            psgeoSmallDisplayMode ?
            arrayitems[8] :            // Button to lower pane. Position: after 8th div.
            psgeoFilterPaneTexts[0];   // Button to upper pane. Position: after 1st div (with many labels).

        // DEFINE AN INFOWINDOW WHICH, WHEN CLOSED, STOPS BACKGROUND WORKER (IF ONE EXISTS)

        //     1. Do not pan map to make this visible when position changes. Let user decide where they look.
        const markerMyPosition = new google.maps.InfoWindow({disableAutoPan: true});

        //     2. closeclick -> stop geolocation
        if (psgeoDomainDefault.geolocationContinuousUpdate) {
            google.maps.event.addListener(markerMyPosition, 'closeclick', function() {
                // Keep the on/off toggle updated.
                geolocationClicks++;
                // User closes infoWindow, so stop updating it.
                // but ONLY if watchPosition worker exists.
                // It allways exists, except for when geolocatorId === 0 (and geolocation support is missing)
                if (geolocatorId > 0) navigator.geolocation.clearWatch(geolocatorId); // ok, could be a null test too...
                psgeoDebug("User closed the position marker. Geolocation worker "+geolocatorId+" stopped.");
                // Do not store myLocation as it would eventually become unreliable
                myPosition.lat = null;
                myPosition.lng = null;
                myPosition.alt = null;
                myPosition.heading = null;
                myPosition.speed = null;
             });
         }

        // GEOLOCATION HELPER FUNCTIONS
        function geolocationPending() {
            markerMyPosition.setPosition(psgeoMap.getCenter());
            markerMyPosition.setContent(lang.getText("geolocationWaitForPosition"));
            markerMyPosition.open(psgeoMap);
        }
        function geolocationStopWatchPosition() {
            // The web worker in the background will be removed
            navigator.geolocation.clearWatch(geolocatorId);
            markerMyPosition.close();
            psgeoDebug("Toggle "+geolocationClicks+". Geolocation worker " + geolocatorId + " stopped. Marker removed.");
            // Do not store myLocation as it would eventually become unreliable
            myPosition.lat = null;
            myPosition.lng = null;
            myPosition.alt = null;
            myPosition.heading = null;
            myPosition.speed = null;
            return;
        }
        function geolocationAchieved(position) {
            // markerMyPosition has been made visible on map in geolocationPending already.
            // Now update it with position and also update myPosition.
            // NOTE: myPosition is declared in initGeoMap and passed as parameter to make it available where needed.
            myPosition.lat = position.coords.latitude;
            myPosition.lng = position.coords.longitude;
            myPosition.alt = position.coords.altitude;
            myPosition.heading = position.coords.heading;
            myPosition.speed = position.coords.speed;

            let LatLng = { lat: myPosition.lat, lng: myPosition.lng };
            markerMyPosition.setPosition(LatLng);

            // Center map when the position is first marked
            //    - but do not constantly recenter the map. That would be annoying.
            //    - autopanning was also set to false in markerMyPosition definition.
            if (markerMyPosition.getContent() === lang.getText("geolocationWaitForPosition")) {
               // First position fix. Center map.
               psgeoMap.setCenter(LatLng);
               // And do NOT do any map centering on successive updates.
               // We can detect that this is the first position fix because the message text has not yet been changed!
            }

            // Display rich position info or just a positional marker?
            if (!psgeoDomainDefault.richPositionInfo) {
                markerMyPosition.setContent(lang.getText("geolocationYouAreHere"));
                return;
            }

            // Display position information
            let positionText = "Lat: " + myPosition.lat + lib.htmlBreak() + "Lon: " + myPosition.lng;
            if (myPosition.alt !== null) {
                positionText += lib.htmlBreak() + lang.getTextWithValues("altitudeInfo", false, [lib.round(myPosition.alt,0)]);
            }
            if (myPosition.speed !== null && myPosition.speed > 0 && myPosition.heading !== null && myPosition.alt !== null) { 
                // speed > 0 guarantees that headding is not NaN, and we check it is not null either.
                // The altitude check exists to tell apart mobile devices with GPS from desktop computers (no altitude info).
                positionText += lib.htmlBreak() + "&rarr; " + lib.round(myPosition.heading,0) + "&deg; " + lang.getText("Speed") + ": " + lib.round(3.6 * myPosition.speed,1) + " km/h";
            }

            if (positionText == "" ) positionText = "Help, I'm lost!";
            markerMyPosition.setContent(positionText);

            // markerMyPosition.setContent(lang.getText("geolocationYouAreHere")+" Worker: "+geolocatorId); // DEBUG
    }
    function geolocationFailed(error) {
            // Undo state change so that the next attempt will be an ON toggle too.
            if (geolocationClicks > 0) geolocationClicks = 0;
            // Show the appropriate error message, translated.
            let errorMessage;
            switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = lang.getText("geolocationPermissionDenied");
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = lang.textText("geolocationUnavailable");
                break;
            case error.TIMEOUT:
                errorMessage = lang.getText("geolocationRequestTimeout");
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = lang.getText("geolocationUnknownError");
            break;
            }
            markerMyPosition.setPosition(map.getCenter());
            markerMyPosition.setContent(errorMessage);
            // The web worker in the background will be removed
            navigator.geolocation.clearWatch(geolocatorId);
        }

        // CREATE GEOLOCATION ON/OFF TOGGLE BUTTON
        psgeoGeolocationButton =
            psgeoGetGeolocationButton(
                lang, 
                geolocationButtonLocation,   // in upper (filter) or lower (info) pane datastructure?
                function() {
                    // GEOLOCATION SUPPORT?
                    if (!navigator.geolocation) {
                        markerMyPosition.setPosition(map.getCenter());
                        markerMyPosition.setContent(lang.getText("geolocationNotSupported"));
                        psgeoDebug("Geolocation not supported.");
                        return;
                    }
                    // COUNT POINTERDOWNS (click/tap/pen/...)
                    geolocationClicks++;
                    // SINGLE POSITION?
                    if (!psgeoDomainDefault.geolocationContinuousUpdate ) {
                        geolocationPending();
                        navigator.geolocation.getCurrentPosition(geolocationAchieved,geolocationFailed,geolocationOptions);
                        psgeoDebug("Single geolocation queried.");
                        return;
                    }
                    // STOP UPDATING POSITION? (every second click: 2,4,6,...)
                    if ( geolocationClicks %2 === 0 ) { 
                        geolocationStopWatchPosition(); 
                        return;
                    }
                    // START WATCHING POSITION? (every second click: 1,3,5,...)
                    geolocationPending();
                    geolocatorId = navigator.geolocation.watchPosition(geolocationAchieved,geolocationFailed,geolocationOptions);
                    psgeoDebug("Click "+geolocationClicks+". Geolocation worker "+geolocatorId+" started.");
                    return; 
                 }, // end click event function
                 cfg,
                 psgeoDomainDefault
             ); // end psgeoGetGeolocationButton
    } // end of button creation

    // GEOLOCATION CODE END

    // If a MoreMenu button (i) is needed, then make a button for it
    if (psgeoMoreMenuButton === undefined) {
        psgeoMoreMenuButton =
            psgeoGetMoreMenuButton(lang,
                                   arrayitems[8],
                                   function() {
                                       psgeoDebug("More button pressed!");
                                       psgeoMoreMenuBringUp(db,lib,lang,map,true,cfg,psgeoDomainDefault,psgeoPopup);
                                   },
                                   cfg,
                                   psgeoDomainDefault);
    } 

}

function psgeoUpdateStatsPane(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    let ncontinents = db.nContinents();
    let ncountries = db.nCountries();
    let ncities = db.nCities();
    let nstatesus = db.nStates("USA");
    let nstatesca = db.nStates("Canada");
    let ncavemaps = db.nCavemaps();
    let nplaces = db.nPlaces();

    psgeoUpdateStatsPaneText(db,
                             lib,
                             lang,
                             map,
                             psgeoStatsPaneTexts,
                             ncontinents,
                             ncountries,
                             ncities,
                             nstatesus,
                             nstatesca,
                             ncavemaps,
                             nplaces,
                             myPosition,
                             psgeoPopup, 
                             tbl,
                             cfg,
                             psgeoDomainDefault);
}

function psgeoInitStatsPane(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    if (!psgeoSmallDisplayMode) {
        // create the 'small pane' filter window (upper window: length selector)
        psgeoInitFilterPaneText(db,lib,lang,map,psgeoFilterPaneTexts[0],true,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    }
    psgeoUpdateStatsPane(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
}

function psgeoInitList(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];

    var filterToBeUsedLater = undefined;
    var filterForMarkers = undefined;
    var jsonImportsToDo = psgeoDomainDefault.sources.length;

    psgeoDebug("cavemaps setting = "+psgeoDomainDefault.cavemaps);

    if (psgeoDomainDefault.cavemaps) {
        db.setFilter(lib.getDefaultFilterCaving(db));
        filterForMarkers = db.getFilter();
    } else {
        db.setFilter(db.filterTrue());
        filterForMarkers = lib.getDefaultFilterSkiing(db);
    }

    psgeoDebug("filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));


    psgeoDomainDefault.sources.forEach(function (source) { 
        // For each source, launch an import function (these run in parallel):
        $.getJSON(source.datafile,function(data) {
            // This import is run for each datafile WHEN it has been retrieved:
            db.addPlacesWithFilter(data,db.getFilter(),lang.getText(source.textId));
            psgeoDebug("Imported "+source.datafile);
            if (--jsonImportsToDo == 0) psgeoFinishLoading(db,lib,lang,map,filterForMarkers,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
        });
    });
}


function psgeoFinishLoading(db,lib,lang,map,filterForMarkers,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    psgeoDebug("Loading of data has finished. There are "+db.nPlaces()+" sites now in database.");
    psgeoDebug("before extra filterForMarkers = " +
          (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    if (psgeoDomainDefault.cavemaps) {
        if (psgeoDomainDefault.cavemapsFilterInitiallyOn) {
            filterForMarkers =
                db.filterAnd([filterForMarkers,
                              db.filterMatchMap(true)]);
        }
    }
    db.setFilter(filterForMarkers);
    psgeoDebug("before apply filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    db.applyAllNoFilter(function(item) {
        psgeoInitMarker(db,lib,lang,item,filterForMarkers,myPosition,psgeoPopup,cfg,psgeoDomainDefault);
    });
    psgeoInitStatsPane(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    psgeoDebug("Loaded");
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

var psgeoOtherTools = [
    {
        icon: "./icons/caving/retkipaikka_vaaka.png",
        url: "https://matkailukartta.fi/kartta/",
        nameId: "retkipaikkaToolName",
        descriptionTextId: "retkipaikkaToolDescription"
    },
    {
        icon: "./icons/caving/ruuthxyz.jpg",
        url: "https://ruuth.xyz/map.html",
        nameId: "ruuthToolName",
        descriptionTextId: "ruuthToolDescription"
    },
    {
        icon: "./icons/caving/gtk.png",
        url: "https://hakku.gtk.fi/fi/locations/search",
        nameId: "hakkuToolName",
        descriptionTextId: "hakkuToolDescription"
    },
    {
        icon: "./icons/caving/mml_suomi_logo_rgb.svg",
        url: "https://asiointi.maanmittauslaitos.fi/karttapaikka/?share=customMarker&n=6677289.7776391655&e=373729.7167378501&desc=&zoom=10&layers=%5B%7B%22id%22%3A186%2C%22opacity%22%3A50%7D%5D",
        nameId: "laserToolName",
        descriptionTextId: "laserToolDescription"
    },
    {
        //icon: "https://nimisampo.fi/cac921ada2335cc3dc9c81a334da615c.png",
        icon: "./icons/caving/nimisampo.png",
        url: "https://nimisampo.fi/fi/app",     // Nimistötutkijan työpöytä
        nameId: "nimisampoToolName",
        descriptionTextId: "nimisampoToolDescription"
    }
];

function psgeoOtherToolsMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup) {
    // This dialog shows links to other maps on the web
    if (!psgeoDomainDefault.classicUI || psgeoOtherToolsWindow === undefined) {

        //
        // Configurable parameters

        const widthSmall = 'width="60"' 
        const widthLarge = 'width="80"';
        const spacingSmall = 'cellspacing="7"';
        const spacingLarge = 'cellspacing="20"';
        
        //
        // Window header
        //

        var div = document.createElement("div");
        if (!psgeoDomainDefault.classicUI) {
            div.setAttribute("id", "OtherTools"); // referenced to in css/style.css
            // Create a close button to the upper righthand corner
            psgeoGenericMenuButton(lang,'',lang.getText("close"),div, function () {
                map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
                },'','closeButton',cfg,psgeoDomainDefault);
        }
        var titleelement = document.createElement("h3");
        var titletext = document.createTextNode(lang.capitalize(lang.getText("moreMaps")));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);

        //
        // Window contents
        //
        
        var explanation = lang.capitalize(lang.getText("toolsExplanation") + ".");
        if  (!psgeoSmallDisplayMode) {
            explanation += " ";
            explanation += lang.capitalize(lang.getText("openInNewWindow") + ".");
        }
        div.appendChild(document.createTextNode(explanation));
        div.appendChild(document.createElement("br"));
        if (!psgeoSmallDisplayMode) div.appendChild(document.createElement("br"));
        var widthSpec = psgeoSmallDisplayMode ? widthSmall : widthLarge;
        var table = document.createElement("div");
        var rows = [];
        for (var i = 0; i < psgeoOtherTools.length; i++) {
            var tool = psgeoOtherTools[i];
            var picture = lib.htmlLink(lib.htmlImage(tool.icon,widthSpec),
                                       tool.url,
                                       true);
            var nameLink = "";
            if (!psgeoSmallDisplayMode) {
                var nameLink = lib.htmlLink(lang.getText(tool.nameId,psgeoSmallDisplayMode),
                                            tool.url,
                                            true);
                nameLink += ": ";
            }
            var explanation = lib.htmlFontSize(nameLink +
                                               lang.getText(tool.descriptionTextId,psgeoSmallDisplayMode),
                                               "-1");
            var columns = [ picture, explanation ];
            rows.push(columns);
        }

        table.innerHTML = lib.htmlTable(rows,psgeoSmallDisplayMode ? spacingSmall : spacingLarge);
        div.appendChild(table);

        //
        // Window creation
        //
        if (psgeoDomainDefault.classicUI) {
            psgeoOtherToolsWindow = new google.maps.InfoWindow;
            psgeoOtherToolsWindow.setContent(div);
        }   // In the other case nothing needs to be done here. See below.
    }

    //
    // Clear the screen
    //

    if (!psgeoDomainDefault.classicUI) map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
    if (psgeoPopup !== undefined) psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();

    //
    // Open dialog
    //

    if (psgeoDomainDefault.classicUI) {
        psgeoOtherToolsWindow.setPosition(map.getCenter());
        psgeoOtherToolsWindow.open(map);
    } else {
        // Open Google Maps custom controls window
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(div);
    }
}

function psgeoFilterSectionPrefix(lang,text,subdiv) {

    var textNode = document.createTextNode(lang.capitalize(text) + ": ");
    var boldText = document.createElement('strong');
    boldText.appendChild(textNode);
    // Now we can append either textNode (plain) or boldText (strong)...

    if ( psgeoSmallDisplayMode) {
        //
        //    Type: [ ] Volcanic [ ] Unknown"
        subdiv.appendChild(document.createElement("br"));
        subdiv.appendChild(boldText);
    } else {
        //
        //    Type:
        //    [ ] Volcanic [ ] Unknown"
        subdiv.appendChild(document.createElement("br"));
        subdiv.appendChild(boldText);
        subdiv.appendChild(document.createElement("br"));
    }
}

function psgeoFilterMenuContents(db,lib,lang,map,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    if (psgeoDomainDefault.nameSearch) {
        psgeoFilterSectionPrefix(lang,lang.getText("name"),subdiv); // Name search box has header "Name"
        psgeoNameFilterInput = psgeoGetNameInput(lib,lang,subdiv); 
        psgeoNameFilterInput.addEventListener('input', function() {
            psgeoDebug("Name filter entered!");
            psgeoRerunFilters(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
        });
    }
    if (psgeoSmallDisplayMode) { // On small displays we only have the range filter on this popup window
        psgeoInitFilterPaneText(db,lib,lang,map,subdiv,false,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault); 
    }

    // Any searches for subtypes (sauna types, waterbody, rock types, etc)
    //     Subtype groups are defined in psgeoTables.js

    let subtypeGroups = tbl.getSubtypeGroups();
    for (var i = 0; i < subtypeGroups.length; i++) {

        const group = subtypeGroups[i];
        if (psgeoDomainDefault[group.selector] &&
            group.displaySizeSelector[psgeoSmallDisplayMode]) {
            // Place filter section header in subdiv
            psgeoFilterSectionPrefix(lang,lang.getText(group.descriptionTextId,psgeoSmallDisplayMode),subdiv); 
            var checkboxList = psgeoGetSubtypeGroupCheckboxList(lib,lang,cfg,group,subdiv);
            psgeoSubtypeGroupCheckboxLists.push(checkboxList);
        }

    }
    
    // Country filtering
    if (psgeoDomainDefault.finlandselection && !psgeoSmallDisplayMode) {
        psgeoFilterSectionPrefix(lang,lang.getText("country"),subdiv);
        psgeoOnlyFinlandFilterCheckbox = psgeoGetOnlyFinlandCheckbox(lib,lang,subdiv,psgeoDomainDefault); 
        psgeoOtherCountriesFilterCheckbox = psgeoGetOtherCountriesCheckbox(lib,lang,subdiv,psgeoDomainDefault);
    }
    
    // Source filtering
    // NOTE: The infoWindow object (classicUI) retains its content, but the custom control does not
    //       because the custom control is CLEARED and regenerated depending on which menu it contains!
    //       Hence the !psgeoDomainDefault.classicUI to regenerate modern UI content on click!
    if (psgeoDomainDefault.sourcesCheckboxes) {
        if (!psgeoDomainDefault.classicUI || psgeoSourceFilterCheckboxes.length == 0) {
                psgeoFilterSectionPrefix(lang,lang.getText("source",psgeoSmallDisplayMode),subdiv);
                psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(lib,lang,subdiv,psgeoDomainDefault.sources);
        }
    }

    //
    // Wait for click events on any of the checkboxes installed above
    //
    
    subdiv.addEventListener('click', function() {
        psgeoDebug("Filter 2 pressed!");
        psgeoRerunFilters(db,lib,lang,map,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    });

}

function psgeoMoreMenuContents(db,lib,lang,map,subdiv,cfg,psgeoDomainDefault,psgeoPopup) {
    // This creates the contents of the dialog that opens when (i) is clicked.
    // We only show this in the Single Activity Mode (previously known as "luolaseura=true")
    if (psgeoDomainDefault.showCustomLinks) {

        let numberOfLinks = psgeoDomainDefault.customLinks.length;
        for (let i=0; i<numberOfLinks; i++) {
            let customLink=psgeoDomainDefault.customLinks[i];
            if (customLink !== undefined && customLink.url !== "") {
            psgeoDebug("We have a custom link: "+customLink.textId+" with url "+customLink.url);
            // We do not need a variable for this button. It gets buried in the "document".
            psgeoGetCustomLinkMenuButton(lang,
                                      subdiv,
                                      customLink,
                                      function() {
                                          psgeoDebug("Custom link button pressed!");
                                          psgeoCustomLinkBringUp(customLink.url,customLink.popup, customLink.popupSize);
                                      },
                                      cfg,
                                      psgeoDomainDefault);
            }
	}
    }

    // This is the "Lisää karttoja" dialog.
    if (!psgeoDomainDefault.classicUI || psgeoOtherToolsMenuButton === undefined) {
        psgeoOtherToolsMenuButton =
            psgeoGetOtherToolsMenuButton(lang,
                                         subdiv,
                                         function() {
                                             psgeoDebug("Other tools button pressed!");
                                             psgeoOtherToolsMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup);
                                         },
                                         cfg,
                                         psgeoDomainDefault);
    }
 
    if (!psgeoDomainDefault.classicUI || psgeoAboutMenuButton === undefined) {
        // The About menu goes to a custom control that is cleared and must be regenerated!
        psgeoAboutMenuButton =
            psgeoGetAboutMenuButton(lang,
                                    subdiv,
                                    function() {
                                        psgeoDebug("About button pressed!");
                                        psgeoAboutMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup);
                                    },
                                    cfg,                                    
                                    psgeoDomainDefault);
    }
}

function psgeoFilterMenuBringUp(db,lib,lang,map,toOpen,psgeoSmallDisplayMode,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    // Classic UI uses the Google Maps infoWindow to present a detailed filter settings dialog.
    // The tip of the infoWindow gets centered on the screen.
    // If the infoWindow is too big and overruns window borders, autopanning moves the screen.
    // This can be distracting. The Modern UI solves this issue, but changes aesthetics.
    // Choose between classic and modern UI in DomainDefault.

if (!psgeoDomainDefault.classicUI && psgeoFilterWindow === undefined) {
        var params = {};
        if (psgeoSmallDisplayMode) {
            params = { maxWidth: Math.ceil(window.innerWidth * 0.95) };
        }
         
    var div = document.createElement("div");
    if (!psgeoDomainDefault.classicUI) div.setAttribute("id", "MoreFilter"); // referenced to in css/style.css

    // Create a close button to the upper righthand corner
    if (!psgeoDomainDefault.classicUI) {
        psgeoGenericMenuButton(lang,'',lang.getText("close"),div, function () {
                              map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
                              },'','closeButton',cfg,psgeoDomainDefault)
    }


    // append a div that contains the menu stuff itself
    subdiv = document.createElement("div");
    subdiv.innerHTML = "";
    subdiv.classList.add='flex';
    subdiv.classList.add='right';
    div.appendChild(subdiv);
    div.appendChild(document.createElement("br"));
    psgeoFilterMenuContents(db,lib,lang,map,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    
    // publish the div in a preferred way: infoWindow (classic) or custom map control (modern)
    if (psgeoDomainDefault.classicUI) { 
        psgeoFilterWindow = new google.maps.InfoWindow(params);
        psgeoFilterWindow.setContent(div);
    }
    // else there is nothing to do. See below.

    }
    if (toOpen) {

        if (psgeoPopup !== undefined) psgeoPopup.close();        // close location info window
        if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();    // close advanced filter window
        if (!psgeoDomainDefault.classicUI) map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
        if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
        if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();

        if (psgeoDomainDefault.classicUI) {
            // Open a Google Maps infoWindow
            psgeoFilterWindow.setPosition(map.getCenter());
            psgeoFilterWindow.open(map);
        } else {
            // Open Google Maps custom controls window
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(div);
        }
    }
}

function psgeoMoreMenuBringUp(db,lib,lang,map,toOpen,cfg,psgeoDomainDefault,psgeoPopup) { // Lisätiedot ja työkalut (i)
    // This menu is opened when the (i) button is toggled and it shows more tools, links, credits.
    // This menu does not get updated once it is created.It just gets opened/closed.

    // Create container (div) and add close button
    if (!psgeoDomainDefault.classicUI || psgeoMoreWindow === undefined) {
        psgeoMoreWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        if (!psgeoDomainDefault.classicUI) {
            div.setAttribute("id", "MoreInfo"); // referenced to in css/style.css
            // Create a close button to the upper righthand corner
            psgeoGenericMenuButton(lang,'',lang.getText("close"),div, function () {
                map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
                },'','closeButton',cfg,psgeoDomainDefault);
        }
        // Title
        //    var titleelement = document.createElement("h3");
        //    var titletext = document.createTextNode(lang.capitalize(lang.getText("moreInformation")));
        //    titleelement.appendChild(titletext);
        //    div.appendChild(titleelement);
        // Empty div
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        div.appendChild(subdiv);
        // Newline
        div.appendChild(document.createElement("br"));
        // Populate the emty div
        psgeoMoreMenuContents(db,lib,lang,map,subdiv,cfg,psgeoDomainDefault,psgeoPopup);
        // Publish to infoWindow
        if (psgeoDomainDefault.classicUI) psgeoMoreWindow.setContent(div);
    }

    if (toOpen) {
        // Clear any old stuff from the bottom center control.
        psgeoDebug("Clearing custom control");
        if (!psgeoDomainDefault.classicUI) map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
        psgeoDebug("Clearing done");
        // Remove other windows before opening this one
        if (psgeoPopup !== undefined) psgeoPopup.close();
        if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
        if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close()
        if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();

        if (psgeoDomainDefault.classicUI) {
            // Open a Google Maps infoWindow
            psgeoMoreWindow.setPosition(map.getCenter());
            psgeoMoreWindow.open(map);
        } else {
            // Open Google Maps custom controls window
            map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(div);
            // map.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(0,div);
        }
    }
}

function psgeoCustomLinkBringUp(link,popup,size) {
    if (popup) {
        window.open(link,"popup",size);
    } else {
        window.open(link, '_blank');
    }
}

function psgeoAboutMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup) { 
    if (!psgeoDomainDefault.classicUI || psgeoAboutWindow === undefined) {
        // Does it exist as an object already?
        psgeoAboutWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        if (!psgeoDomainDefault.classicUI) {
            // id for styling with css/style.css
            div.setAttribute("id", "AboutMenu");
            // Create a close button to the upper righthand corner
            psgeoGenericMenuButton(lang,'',lang.getText("close"),div, function () {
                map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
                },'','closeButton',cfg,psgeoDomainDefault);
        }
        // Title and a container for data
        var titleelement = document.createElement("h3");
        var titletext = document.createTextNode(lang.capitalize(lang.getText("about")));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        // Custom description/credits/copyright/etc for each datasource
        let dataExplanation = "";
        for (let i=0; i<psgeoDomainDefault.sources.length; i++) {
            if (psgeoDomainDefault.sources[i].descriptionTextId !== "" ) dataExplanation += lang.getText(psgeoDomainDefault.sources[i].descriptionTextId,psgeoSmallDisplayMode);
        }
        // Include a link, too.
        dataExplanation += " ";
        dataExplanation += lib.htmlLink(psgeoDomainDefault.name,
                                        ("https://" + psgeoDomainDefault.domains[0]),
                                        true);
        dataExplanation += ".";
        // texts translated to the selected language
        var version = lib.getVersion();
        var texts = [
            dataExplanation,
            lang.getTextWithValues("libraryExplanation",psgeoSmallDisplayMode,[version]) + " " +
            lang.getText("developersExplanation",psgeoSmallDisplayMode),
            lib.htmlBold(lang.getText("warningsAndDisclaimers").toUpperCase()),
            lang.getText("dataDistinctExplanation",psgeoSmallDisplayMode),
            lang.getText("dangerousExplanation",psgeoSmallDisplayMode),
        ];
        for (var i = 0; i < texts.length; i++) {
            subdiv.innerHTML += lib.htmlParagraph(texts[i]);
        }
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoAboutWindow.setContent(div);
    }
    if (!psgeoDomainDefault.classicUI) map.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();
    if (psgeoPopup !== undefined ) psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) lib.psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    if (psgeoDomainDefault.classicUI) {
        psgeoAboutWindow.setPosition(map.getCenter());
        psgeoAboutWindow.open(map); 
    } else {
        // Open Google Maps custom controls window
        map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(div);
    }
}

function psgeoGenericMenuButton(lang,imgurl,text,structure,fn,spacer,buttonId,cfg,psgeoDomainDefault) {

    // buttonId can be used in css/style.css to tweak button style
    var br = document.createElement("br");          // column of links, not row -> newline required
    var label = document.createElement("button");
    var text = lang.capitalize(text);

    if ( imgurl === undefined || imgurl == "" ) {
        // TEXT ONLY BUTTON
        if ( text == "" ) {
            text = "link text missing";
            psgeoDebug("Warning: There is a button without icon and text. Inserting text: " + text );
        }
        label.innerHTML = text;
    }
    else {  // HAVE ICON
        var buttonImageTag =
            '<img src="' +
            imgurl +
            '" width=' +
            cfg.getDefaultIcons.imgDefaultSize +
            '>'; 
        if ( text === undefined || text == "" ) {
            // ICON ONLY BUTTON
            label.innerHTML = buttonImageTag;
        } else {
            // ICON + TEXT BUTTON
            // A two column table must be used to get the text vertically aligned in the middle
            //      - vertical alignment only works for tables and inline
            label.innerHTML =
                '<table><tr><td valign=middle>' +
                buttonImageTag + '</td><td valign=middle>'+ text + '</td></tr></table>';
        }
    }

    label.classList.add('genericMenuButton'); // see: css/style.css
    if (buttonId && buttonId !== '') label.setAttribute('id', buttonId);

    if ( spacer == "br" ) { structure.appendChild(br); }
    structure.appendChild(label);
    label.addEventListener('pointerdown', fn);
    return(label);
}

function psgeoGetOtherToolsMenuButton(lang,structure,fn,cfg,psgeoDomainDefault) {
    var icon = cfg.getDefaultIcons.imgOtherTools;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,icon,lang.getText("moreMaps"),structure,fn,"br",'',cfg,psgeoDomainDefault));
}       

function psgeoGetFilterMenuButton(lang,structure,fn,cfg,psgeoDomainDefault) { // XXXXXXXXX DEFAULT ICONS?
    var icon = cfg.getDefaultIcons.imgFilter; 
    if ( icon === undefined ) { icon=""; }
    if ( psgeoDomainDefault.hideButtontextFilter ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,"br",'',cfg,psgeoDomainDefault));
    } else {
        return(psgeoGenericMenuButton(lang,
                                      icon,
                                      (psgeoSmallDisplayMode ?
                                       lang.filterLinkText() :
                                       lang.getText("moreFilters")),
                                      structure,
                                      fn,"br",'',cfg,psgeoDomainDefault));
    }
}

function psgeoGetGeolocationButton(lang,structure,fn,cfg,psgeoDomainDefault) {
    var icon = cfg.getDefaultIcons.imgGeolocation; 
    if ( icon === undefined ) { icon=""; psgeoDebug("icon was undefined"); } else { psgeoDebug("icon was real: " + icon); }
    if ( psgeoDomainDefault.hideButtontextGeolocation ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,'','',cfg,psgeoDomainDefault));
    } else {
        return(psgeoGenericMenuButton(lang,
                                      icon,
                                      (psgeoSmallDisplayMode ?
                                       lang.geolocationLinkText() :
                                       lang.getText("centerMap")),
                                      structure,
                                      fn,'','',cfg,psgeoDomainDefault));
    }
}
    
function psgeoGetMoreMenuButton(lang,structure,fn,cfg,psgeoDomainDefault) {
    var icon = cfg.getDefaultIcons.imgMore;
    if ( icon === undefined ) { icon=""; }
    if ( psgeoDomainDefault.hideButtontextMore ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,"br",'',cfg,psgeoDomainDefault));
    }
    else {
        return(psgeoGenericMenuButton(lang,icon,lang.getText("toolsAndAbout"),structure,fn,"br",'',cfg,psgeoDomainDefault));
    }
}
    
function psgeoGetAboutMenuButton(lang,structure,fn,cfg,psgeoDomainDefault) {
    var icon = cfg.getDefaultIcons.imgAbout;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,icon,lang.getText("about"),structure,fn,"br",'',cfg,psgeoDomainDefault));
}       

function psgeoGetCustomLinkMenuButton(lang,structure,customLink,fn,cfg,psgeoDomainDefault) {
    let icon;
    if ( customLink.iconSet === undefined || customLink.icon === undefined ) { icon=""; }
    if ( customLink.iconSet === "" || customLink.icon === "" ) { icon=""; }
    if ( customLink.textId === undefined ) throw ("psgeoGetCustomLinkMenuButton: customLink.textId in undefined!");
    if ( icon === ""  && customLink.textId === "" ) throw ("psgeoGetCustomLinkMenuButton: no textId and no icon. Cannot create a link.");
    icon = customLink.iconSet + customLink.icon;
    psgeoDebug("Custom link text: "+customLink.textId+" and icon: "+icon);
    return(psgeoGenericMenuButton(lang,
                                  icon,
                                  lang.getText(customLink.textId),
                                  structure,
                                  fn,"br",'',cfg,psgeoDomainDefault));    
}

function psgeoGetNameInput(lib,lang,structure) {
    var box = document.createElement("input");
    box.type = "text";
    box.value = "";
    structure.appendChild(box);
    var br = document.createElement("br");
    structure.appendChild(br);
    return(box);
}

function psgeoGetGenericCheckbox(id,text,structure,initiallyChecked,br) {
    // Appends a label + checkbox in 'structure' in the document for display
    // 
    var label = document.createElement("label");
    var description = document.createTextNode(text);
    var box = document.createElement("input");
    box.type = "checkbox";
    box.value = id;
    box.checked = initiallyChecked;
    label.appendChild(box);
    label.appendChild(description);
    if (br) {
        label.appendChild(document.createElement("br"));
    } else {
        label.appendChild(document.createTextNode(String.fromCharCode(160))); // if not <br>, then &nbsp;
        label.appendChild(document.createTextNode(String.fromCharCode(0x2223))); // Divides -sign
        // label.appendChild(document.createTextNode(String.fromCharCode(124))); // vertical bar -sign
        // label.appendChild(document.createTextNode(String.fromCharCode(160))); // if not <br>, then &nbsp;
    }
    structure.appendChild(label);
    return(box);
}

function psgeoGetSubtypeGroupCheckboxList(lib,lang,cfg,group,structure) {
    // RETURNS { group: OBJECT, checkboxes: ARRAY  }
    // CHANGES APPENDS the object 'structure' (in document) to display a label+checkbox (psgeoGetGenericCheckbox does this)

    var types = lib[group.getSubActivitiesFunction](group.getSubActivitiesFunctionArgument);
    var result = [];
    var box;

    // Generate subactivity checkboxes from (possibly three sets of) subactivities.
    //     The last checkbox was followed by a <br/>,
    //     but now a <br/> is appended to the invert button instead.
    for (var k = 0; k < group.extraSubActivitiesBefore.length; k++) {
        var subact = group.extraSubActivitiesBefore[k];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,name,structure,true,false);
        result.push(box);
    }
    for (var i = 0; i < types.length; i++) {
        var subact = types[i];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,
                                      name,
                                      structure,
                                      true,
                                      // (i == types.length-1 &&
                                      // group.extraSubActivitiesAfter.length == 0));
                                      false); 
        result.push(box);
    }
    for (var j = 0; j < group.extraSubActivitiesAfter.length; j++) {
        var subact = group.extraSubActivitiesAfter[j];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,
                                      name,
                                      structure,
                                      true,
                                      // (j == group.extraSubActivitiesAfter.length-1));
                                      false);
        result.push(box);
    }

    // Insert an 'invertSelection' button to 'structure'
    //     (the filter window contents div)
    //     to facilitate inverting all checkbox states.
    //     It is appended to the row of labels+checkboxes.
    var invertButton = psgeoGenericMenuButton(lang,
                           '',
                           lang.getText("invertSelection",psgeoSmallDisplayMode),
                           structure,
                           function() { psgeoInvertAllCheckboxes(result) } ,
                           '',
                           'invertSelection',
                           cfg,
                           psgeoDomainDefault);
    // Make the invert button (text only) stand out
    //     by giving it a similar appearance to the checkboxes
     invertButton.classList.add("checkboxControlButtons"); // css/style.css
  
    // An <br/> element must now be appended to 'structure'
    let br = document.createElement("br");
    result.push(br);

    // ZZZZ
  
    var entry = { group: group, checkboxes: result };
    return(entry);
}

function psgeoGetOnlyFinlandCheckbox(lib,lang,structure,psgeoDomainDefault) {
    return(psgeoGetGenericCheckbox("only finland",
                                   lang.getText("onlyFinland",psgeoSmallDisplayMode),
                                   structure,
                                   true,
                                   false,
                                   psgeoDomainDefault));
}

function psgeoGetOtherCountriesCheckbox(lib,lang,structure,psgeoDomainDefault) {
    return(psgeoGetGenericCheckbox("other countries",
                                   lang.getText("otherCountries",psgeoSmallDisplayMode),
                                   structure,
                                   true,
                                   true,
                                   psgeoDomainDefault));
}

function psgeoGetSourcesCheckboxes(lib,lang,structure,psgeoSources) {
    const br = document.createElement("br");
    var result = [];
    var sourcesLeft = psgeoSources.length;
    for (const source of psgeoSources ) {
        var name = lang.getText(source.textId,psgeoSmallDisplayMode);
        var description = document.createTextNode(name);
        var box = document.createElement("input");
            box.type = "checkbox";
            box.value = lang.getText(source.textId);    // XXXX ENGLISH???? NOTE!
            box.checked = true;
        var label = document.createElement("label");
            label.appendChild(box);
            label.appendChild(description);
            if (--sourcesLeft == 0) label.appendChild(br);
        structure.appendChild(label);
        result.push(box);
    }
    return(result);
}

function PsgeoFilterPaneWin(div1, map) {
    psgeoFilterPaneTexts = [];
    var subdiv1 = document.createElement('div');
    div1.appendChild(subdiv1);
    psgeoFilterPaneTexts.push(subdiv1);
}

function PsgeoStatsPaneWin(div, map) {

    psgeoStatsPaneTexts = [];
    var i;
 
    // Our choice: there can be 9 lines of statistics. 
    for (i = 0; i < 9; i++) {
        var subdiv = document.createElement('div');
        div.appendChild(subdiv); // statsPaneDiv of calling function gets appended
        subdiv.innerHTML = "";
        psgeoStatsPaneTexts.push(subdiv);
    }
    
}

function psgeoInitStatsPaneControl(map) {

    //
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    //
   
    // statsPane (bottom left pane): <div id="Info>...</div>
    var statsPaneDiv = document.createElement("div");
    statsPaneDiv.setAttribute("id", "Fullstats");

    // Create 9 sub-divs to make place for statistics lines
    var statsPaneWin = new PsgeoStatsPaneWin(statsPaneDiv, map);
    statsPaneDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(statsPaneDiv);
    
    //
    // Whether we have a filter pane depends on screen size
    //
    
    if (!psgeoSmallDisplayMode) {
        var filterPaneDiv = document.createElement("div");
        filterPaneDiv.setAttribute("id","Filter");
        var filterPaneWin = new PsgeoFilterPaneWin(filterPaneDiv, map);
        filterPaneDiv.index = 2;
        map.controls[google.maps.ControlPosition.LEFT_TOP].push(filterPaneDiv);
    }
    
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

function psgeoInitCavemaps(pathname,urlParams,psgeoDomainDefault) {

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
    // at the end of your URL to make this happen.
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

    let setMapCenter = {lat: psgeoDomainDefault.lat, lng: psgeoDomainDefault.lng};
    let setMapZoom = psgeoDomainDefault.zoom;

    // Do not put much code in the getTile function. It is used FREQUENTLY.
    switch (country) {
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
        default:
            throw new Error("psgeoInitMapTerrain: Unsupported WMTS source. Supported: Finland, Sweden, Norway.");
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
    // requires: db, lib, lang, map
    // returns: boolean
    // changes: 
    // called by: psgeoInitPlace
    // calls: psgeoInitPlaceAux

    $(document).on("onpoiterdown", "a", function() {
        //this == the link that was clicked

        var href = $(this).attr("href");
        psgeoDebug("Caught link click to " + href);
        var begin = href.substring(0,3);
        var rest = href.substring(3);

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
    });
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
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;

    // Create main objects
    const lib = psgeoInitLib();    // a general use function library
    const cfg = PsgeoSettings();   // methods to retrieve psgeo settings
    const db = PsgeoDB(lib,[],""); // database and filtering methods
    const tbl = PsgeoTables();     // structure of statistics display

    // Read settings from JSON
    var fetchDomainDefaultsTiming = lib.timingInitialize("fetch settings");
    const psgeoDomainDefault = await cfg.getDomainDefault(hostname,pathname);
    const psgeoSources = psgeoDomainDefault.sources; // where the JSON is retrieved from
    lib.timingReport(fetchDomainDefaultsTiming);

    // React to small screens
    psgeoSmallDisplayMode = psgeoInitDisplaySize(cfg); // true or false

    // Update Domain Defaults based on URL parameters
    psgeoInitLanguage(urlParams,psgeoDomainDefault);          // ?lang=... 
    psgeoInitCavemaps(pathname,urlParams,psgeoDomainDefault); // ?cavemaps=true
    psgeoForceDisplayOfCustomLinks(hostname,urlParams,psgeoDomainDefault); // ?luolaseura=true

    // Translation library
    const lang = PsgeoLang(psgeoDomainDefault.lang); psgeoDebug("lang: "+lang);

    // A position object to store users position, heading and speed and a marker object on the map.
    var myPosition = { lat:null, lng:null, alt:null, heading:null, speed:null }    // position ?
    const markerMyPosition = new google.maps.InfoWindow({ disableAutoPan:true }); // position.marker ?

    // Initialize the map
    psgeoInitMap(lib,db,cfg,tbl,lang,psgeoDomainDefault,psgeoSmallDisplayMode,myPosition,markerMyPosition,queryString,urlParams,pathname,hostname);
}


function psgeoInitMap(lib,db,cfg,tbl,lang,psgeoDomainDefault,psgeoSmallDisplayMode,myPosition,markerMyPosition,queryString,urlParams,pathname,hostname) {

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

// psgeoDomainDefault.mapTypeControlStyle,
    //
    // Select style of map selector
    //     DROPDOWN_MENU, HORIZONTAL_BAR, DEFAULT
    //
    // psgeoMap.setOptions(mapTypeControlOptions.style) = "google.maps.MapTypeControlStyle." + psgeoDomainDefault.mapTypeControlStyle;


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
    // Initialize activity markers
    //
    var imagesTiming = lib.timingInitialize("psgeoInitMarkerImages");
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    lib.timingReport(imagesTiming);

    //
    // Initialize custom controls
    //
    psgeoDebug("initStatsPaneControl...");
    psgeoInitStatsPaneControl(psgeoMap);
    let psgeoPopup = psgeoInitPopup(psgeoMap);

    //
    // Initialize the JSON database + filters
    //
    psgeoDebug("initList...");
    psgeoInitList(db, lib,lang,psgeoMap,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);

    //
    // Initialize link handlers
    //
    psgeoDebug("initLinkClicks");
    psgeoInitLinkHandlers(db,lib,lang,psgeoMap,myPosition,cfg,psgeoDomainDefault);
    psgeoDebug("all initialisations done.");
 }

