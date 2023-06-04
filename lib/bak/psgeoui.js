
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)


function Psgeoui() {


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

    t = db.getItemName(item) + altstring;
    if (psgeoDomainDefault.cavemaps) {
        // 1. Include length+accuracy
        var lengthtext = db.getItemLength(item)
        if (lengthtext !== undefined) {
            lengthtext = lengthtext.toString() + "m"
            if (db.getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
            t += " (" + lengthtext + ")";
        }
        // 2. Mention map
        if (db.getItemMap(item) !== undefined) {
            t += ":\n";
            t += lang.capitalize(lang.getText("map"));
        }
        // 3. Mention sidecaves
        var sidecaves =  db.getItemSideCaves(item);
        if (sidecaves.length > 0) {
            t += "\n";
            t += sidecaves.length.toString() + " " + lang.getText("sideCaves");
        }
    }
    t += ":\n";
    t += psgeoArticlesText(db,lang,item);

    // There can be several activities in the same place, eg. swimming or skiing in a cave!
    // Only one marker image can be shown, though.
    // Because of this we need to determine the 'dominant' activity. Refer to db and lib:
    // Dominant activity is fixed to Caving if we have cavemaps=true. Else it is retrieved from db.
    //     Order of dominance: Skiing > Caving > UE > Sauna > Climbing > Snowboarding
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

function psgeoCreateRangeCheckbox(db,lang,document,subsubdiv1b,size,name,spacer) {
    var box = psgeoGetGenericCheckbox(size,lang.capitalize(name),subsubdiv1b,true,spacer);
    box.id = size; // Needed so that changing the range category limits in filter dialog can change box the label.
    psgeoRangeFilterCheckboxes.push(box);
 }

function psgeoCreateMapCheckbox(db,lang,document,subsubdiv1b,name,spacer,psgeoDomainDefault) {
    var box = psgeoGetGenericCheckbox("map",
                                      lang.capitalize(name),
                                      subsubdiv1b,
                                      psgeoDomainDefault.defaultFilter.showMapsByDefault,
                                      spacer);
    psgeoMapFilterCheckbox = box;
}

function psgeoCreateModelCheckbox(db,lang,document,subsubdiv1b,name,spacer,psgeoDomainDefault) {
    var box = psgeoGetGenericCheckbox("model",
                                      lang.capitalize(name),
                                      subsubdiv1b,
                                      psgeoDomainDefault.defaultFilter.showMapsByDefault,
                                      spacer);
    psgeoModelFilterCheckbox = box;
}

function psgeoCreateArticleCheckbox(db,lang,document,subsubdiv1b,name,spacer,psgeoDomainDefault) {
    var box = psgeoGetGenericCheckbox("article",
                                      lang.capitalize(name),
                                      subsubdiv1b,
                                      false,
                                      spacer);
    psgeoArticleFilterCheckbox = box;
}

function psgeoCreateModelCheckbox(db,lang,document,subsubdiv1b,name,spacer,psgeoDomainDefault) {
    var box = psgeoGetGenericCheckbox("model",
                                      lang.capitalize(name),
                                      subsubdiv1b,
                                      false,
                                      spacer);
    psgeoModelFilterCheckbox = box;
}

function psgeoCreateActivityCheckbox(db,lang,document,subsubdiv1b,activitylist,name,spacer) {
    var checked = false;
    var filt = db.getFilter();
    var acts = db.getFilterActivities(filt);
    // These filters set during init are import filters = permanent
    for (var i = 0; i < acts.length; i++) {
        // If an activity acts[i] included in the default filter
        // exists in activity list,then make the corresponding activity checked.
        // Note: activity list is ONE activity, or in the case of "Other activities", a list.
        // So, the activitylist corresponds to only ONE checkbox.
        if (activitylist.indexOf(acts[i]) >= 0) {
            checked = true;
        }
    }
 
    let checkboxDescription = lang.capitalize(name);
    var box = psgeoGetGenericCheckbox(activitylist,checkboxDescription,subsubdiv1b,checked,spacer);
    psgeoActivityFilterCheckboxes.push(box);
}

function psgeoInitFilterPaneTextActivities(
        db,lib,lang,map,geolocation,div,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

        // var items = psgeoDomainDefault.activityCheckboxes ?  lib.getActivityList() : [] ; 
        var items = lib.getActivityList(); 
        var otheritems = [];

        if (!psgeoSmallDisplayMode && items.length > 0) {
            psgeoFilterSectionPrefix(lang,lang.getText("activity",psgeoSmallDisplayMode),div);
            div.appendChild(document.createElement('br'))
        }

        // Make checkboxes for all activities - except for those that: isOtherActivity(item)
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item !== "Other" && !lib.isOtherActivity(item)) {
                var shortActivity = lib.getActivityShortName(item);
                var oneactivity = [];
                oneactivity.push(item);
                psgeoCreateActivityCheckbox(db,lang,document,div,oneactivity,shortActivity,"br");
            }
        }

        // Make a checkbox for "Other activities" (with a list of activities included)
        psgeoCreateActivityCheckbox(db,
                                    lang,
                                    document,
                                    div,
                                    lib.getOtherActivityList(),
                                    "Other",
                                    "br")
        div.appendChild(document.createElement('hr'));

        // IMPORTANT!
        // The activityCheckboxes are ALWAYS created, and in checked state.
        // Import filtering (see psgeoDomainDefault.defaultFilter.filter) limits what is available.
        // The checkboxes may be permanently disabled in the settings, though.
        // In this case hey are not included in the DOM,
        // but we still have them available for the filtering code in
        // psgeoRerunFilters(). Why? Because of dynamic hiding of UI elements is easy.
        // Remember to disable subtype groups, too, in the settings, if activities are disabled.
        if (!psgeoDomainDefault.activityCheckboxes) div.style.display='none'
}

function psgeoInitFilterPaneTextRangeCategories(
         db,lib,lang,map,geolocation,div,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

        // This is EITHER in FilterPane OR in FilterWindow (depending on psgeoSmallDisplayMode).
        //    The resize event listener (check psgeoFinishLoading) moves this.
        psgeoRangeFilterCheckboxes = [];

        // psgeoDomainDefault.rangeCategoryLimits has: measure, unit, limitLow, limitHigh.
        // lang has rangeHigh/Medium/Low texts with values.
        // measure: "length", "depth", "grade", ... TRANSLATED
        // unit: "", "meters", "kilometers", "minutes", ... TRANSLATED
        let measureName = lang.getText(psgeoDomainDefault.rangeCategoryLimits.measure,false);
        let unit = lang.getText(psgeoDomainDefault.rangeCategoryLimits.unit,false);
        let rangeMeasure = lang.capitalize(
            lang.getText(psgeoDomainDefault.rangeCategoryLimits.measure,psgeoSmallDisplayMode)
        );
        let rangeLimitHighTextNodeMeasure = document.createTextNode(rangeMeasure + " > ");
        let rangeLimitLowTextNodeMeasure = document.createTextNode(rangeMeasure + " < ");
        let rangeLimitMediumTextNodeMeasure = document.createTextNode(rangeMeasure + " ");

        let textNodeEllipsis = document.createTextNode("...");

        let rangeLimitHighTextNodeUnit = document.createTextNode(" " + unit);
        let rangeLimitMediumTextNodeUnit = document.createTextNode(" " + unit);
        let rangeLimitLowTextNodeUnit = document.createTextNode(" " + unit);
     
        // HIGH RANGE INCLUSION
        // 1. Create wrapper to keep checkbox and text aligned.
        let wrapperFlexboxHigh = document.createElement("div");
        wrapperFlexboxHigh.classList.add("flexboxRow");
        div.appendChild(wrapperFlexboxHigh);
        // 2. Create a checkbox 
        psgeoCreateRangeCheckbox(db, lang, document, wrapperFlexboxHigh, "rangeHigh", "", "none");
        // 3. Append measure text
        wrapperFlexboxHigh.appendChild(rangeLimitHighTextNodeMeasure);
        // 4. Append measure value in a div
        let divRangeLimitHigh = document.createElement("div");
        divRangeLimitHigh.style="float: right;";
        divRangeLimitHigh.classList.add("divRangeLimitHigh");
        divRangeLimitHigh.innerHTML=psgeoDomainDefault.rangeCategoryLimits.limitHigh.toString();
        wrapperFlexboxHigh.appendChild(divRangeLimitHigh);
        wrapperFlexboxHigh.appendChild(rangeLimitHighTextNodeUnit);

        // MEDIUM RANGE INCLUSION
        // 1. Create wrapper to keep checkbox and text aligned.
        let wrapperFlexboxMedium = document.createElement("div");
        wrapperFlexboxMedium.classList.add("flexboxRow");
        div.appendChild(wrapperFlexboxMedium);
        // 2. Create a checkbox 
        psgeoCreateRangeCheckbox(db,lang,document,wrapperFlexboxMedium,"rangeMedium","","none");
        // 3. Append measure text
        wrapperFlexboxMedium.appendChild(rangeLimitMediumTextNodeMeasure);
        // 4. Append measure low value in a div
        let divRangeLimitLowForMediumSelection = document.createElement("div");
        divRangeLimitLowForMediumSelection.style="float: right;";
        divRangeLimitLowForMediumSelection.classList.add("divRangeLimitLow");
        divRangeLimitLowForMediumSelection.innerHTML=psgeoDomainDefault.rangeCategoryLimits.limitLow.toString();
        wrapperFlexboxMedium.appendChild(divRangeLimitLowForMediumSelection);
        // 5. Append ellipsis
        wrapperFlexboxMedium.appendChild(textNodeEllipsis);
        // 6. Append measure high value in a div
        let divRangeLimitHighForMediumSelection = document.createElement("div");
        divRangeLimitHighForMediumSelection.style="float: right;";
        divRangeLimitHighForMediumSelection.classList.add("divRangeLimitHigh");
        divRangeLimitHighForMediumSelection.innerHTML=psgeoDomainDefault.rangeCategoryLimits.limitHigh.toString();
        wrapperFlexboxMedium.appendChild(divRangeLimitHighForMediumSelection);
        wrapperFlexboxMedium.appendChild(rangeLimitMediumTextNodeUnit);

        // LOW RANGE INCLUSION
        // 1. Create wrapper to keep checkbox and text aligned.
        let wrapperFlexboxLow = document.createElement("div");
        wrapperFlexboxLow.classList.add("flexboxRow");
        div.appendChild(wrapperFlexboxLow);
        // 2. Create a checkbox 
        psgeoCreateRangeCheckbox(db, lang, document, wrapperFlexboxLow, "rangeLow", "", "none")
        // 3. Append measure text
        wrapperFlexboxLow.appendChild(rangeLimitLowTextNodeMeasure);
        // 4. Append measure value in a div
        let divRangeLimitLow = document.createElement("div");
        divRangeLimitLow.style="float: right;";
        divRangeLimitLow.classList.add("divRangeLimitLow");
        divRangeLimitLow.innerHTML=psgeoDomainDefault.rangeCategoryLimits.limitLow.toString();
        wrapperFlexboxLow.appendChild(divRangeLimitLow);
        wrapperFlexboxLow.appendChild(rangeLimitLowTextNodeUnit);


}

function psgeoInitFilterPaneTextContent(
         db,lib,lang,map,geolocation,div,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault,spacer) {

    // Article checkbox
    // psgeoFilterSectionPrefix(lang,lang.getText("article",false),subsubdiv1b); // Superfluous
    // Make sure the new articleCheckbox setting exists, before using it.
    if (lib.isDeclared(psgeoDomainDefault.articleCheckbox) && psgeoDomainDefault.articleCheckbox) {
    psgeoCreateArticleCheckbox(db,
                               lang,
                               document,
                               div,
                               lang.getText("article",psgeoSmallDisplayMode),
                               spacer,
                               psgeoDomainDefault,spacer)
    }

    // Cave map checkbox
    if (psgeoDomainDefault.mapsCheckbox) {
        // psgeoFilterSectionPrefix(lang,lang.getText("map",psgeoSmallDisplayMode),subsubdiv1b); // Superfluous
        psgeoCreateMapCheckbox(db,
                                   lang,
                                   document,
                                   div,
                                   lang.getText("withMap",psgeoSmallDisplayMode),
                                   spacer,
                                   psgeoDomainDefault)
    }

    if (psgeoDomainDefault.model3dCheckbox) {
        psgeoCreateModelCheckbox(db,
                                   lang,
                                   document,
                                   div,
                                   lang.getText("withModel",psgeoSmallDisplayMode),
                                   spacer,
                                   psgeoDomainDefault)
    }
}

function psgeoInitFilterPaneText(db,lib,lang,map,geolocation,div,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    // activitiesFilterPaneDiv                     id:activitiesFilterPaneDiv       task:list top level activities
    // rangeCategoryFilterPaneDiv                  id:rangeCategoryFilterPaneDiv    task:range category filter
    //     wrapperFlexboxHigh                      class:flexboxRow                 task: checkbox and text/values
    //         (no div for checkbox)
    //         divRangeLimitHigh                   class:divRangeLimitHigh          task: value changed dynamically!
    //     wrapperFlexboxMedium                    class:flexboxRow                 task: checkbox and text/values
    //         (no div for checkbox)
    //         divRangeLimitHighForMediumSelection class:divRangeLimitHigh          task: value changed dynamically!
    //         divRangeLimitLowForMediumSelection  class:divRangeLimitLow           task: value changed dynamically!
    //     wrapperFlexboxLow                       class:flexboxRow                 task: checkbox and text/values
    //         divRangeLimitLow                    class:divRangeLimitLow           task: value changed dynamically!
    // contentFilterPaneDiv                        id:contentFilterPaneDiv         

    var filterPaneDiv = document.createElement('div');
    var activitiesFilterPaneDiv = document.createElement('div');
    var rangeCategoryFilterPaneDiv = document.createElement('div');
    var contentFilterPaneDiv = document.createElement('div');

    activitiesFilterPaneDiv.id='activitiesFilterPaneDiv';
    rangeCategoryFilterPaneDiv.id='rangeCategoryFilterPaneDiv';
    contentFilterPaneDiv.id='contentFilterPaneDiv';
   
    //
    // #1 if activity checkboxes are allowed and we are not forced to view cavemaps, then print a selection list
    //

    psgeoInitFilterPaneTextActivities(db,lib,lang,map,geolocation,activitiesFilterPaneDiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault)

    if (!psgeoDomainDefault.activityCheckboxes || psgeoDomainDefault.cavemaps) { 
        activitiesFilterPaneDiv.style.display='none';
    }    

    //
    // #2 Show a range category filter, if appropriate.
    //

    psgeoInitFilterPaneTextRangeCategories(
        db,lib,lang,map,geolocation,rangeCategoryFilterPaneDiv,
        myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault
    );
    rangeCategoryFilterPaneDiv.appendChild(document.createElement('hr'));

    if (!psgeoDomainDefault.rangeCategoryLimits.allowFiltering) {
        rangeCategoryFilterPaneDiv.style.display='none';
    }

    //
    // #3 Checkboxes to filter by article/map/3dmodel
    //

    psgeoInitFilterPaneTextContent(
    db,lib,lang,map,geolocation,contentFilterPaneDiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault,"br");


    // Append activities/range/content to the FilterPane div.
    div.appendChild(activitiesFilterPaneDiv);
    div.appendChild(rangeCategoryFilterPaneDiv); // may be empty
    div.appendChild(contentFilterPaneDiv);

    //
    // Whenever anything happens in any input, rerun filters
    //
    activitiesFilterPaneDiv.addEventListener('click', function() { 
        psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    });
    rangeCategoryFilterPaneDiv.addEventListener('click', function() { 
        psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
    });
    contentFilterPaneDiv.addEventListener('click', function() { 
        psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
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

function psgeoClearAllCheckboxes(list) {
    for (var i = 0; i < list.length; i++) list[i].checked=false;
    return(true);
}

function psgeoCreateSubactivityFilterFromCheckboxes(db,activities,list) {
    // activities is a list of activities related
    // list is a list of {group,checkboxes}
    var subactivities = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].checked) {
            subactivities.push(list[i].value); // list of subactivity names (gathered from checkbox values)
        }
    }
    return(db.filterMatchMultiSubActivities(activities,subactivities));
}

function psgeoCreateNameFilter(db,lib,lang,map) {
    if (psgeoNameFilterInput === undefined) return(undefined);
    if (psgeoNameFilterInput.value.length == 0) return(undefined);
    return(db.filterMatchName(psgeoNameFilterInput.value,false));
}

function psgeoMakeSubtypeSelectionVisible(group) {
    // Called from psgeoCreateActivityAndSubactivityFilters
    let displayBlock = document.getElementById(group.descriptionTextId) // null if filter is disabled in psgeoDomainDefault
    if (displayBlock !== null) displayBlock.style.display='block'       // display checkboxes for this group
}

function psgeoAddSubtypeGroupFilters(db,lib,lang,map,group,oneActivityFilter) {
    // Called from psgeoCreateActivityAndSubactivityFilters
    let result = oneActivityFilter // which exists, indeed
    const checkboxesForThisGroup
          = psgeoSubtypeGroupCheckboxLists.filter(
              entry => entry.group.getSubActivitiesFunction === group.getSubActivitiesFunction
              )
    for (const entry of checkboxesForThisGroup) { // entry = { group: OBJECT, checkboxes: ARRAY  }
        const subtypeFilters = psgeoCreateSubtypeGroupFilter(db,lib,lang,map,entry)
        if (subtypeFilters !== undefined) result = db.filterAnd([result,subtypeFilters])
    }
    return result
}

function psgeoCreateActivityAndSubactivityFilters(db,lib,lang,map,tbl) {

    //    The psgeoActivityFilterCheckboxes object always exists (even when not displayed).
    //    An "activity" is either a single activity, or a comma separated list of activities (checkbox "other").

    let result

    for (const theCheckbox of psgeoActivityFilterCheckboxes) {

        let oneActivityFilter
        let activityNameArray = theCheckbox.value.split(",")

        if (!theCheckbox.checked) continue
        oneActivityFilter = db.filterMatchActivities(activityNameArray)
        if (activityNameArray.length !== 1) continue // Skip subtypes of "Other" 

        const relatedSubtypeGroups
              = tbl.getSubtypeGroups().filter(
                  group => group.activities.includes(activityNameArray[0])
                  )
        for (const group of relatedSubtypeGroups) {
            psgeoMakeSubtypeSelectionVisible(group)
            oneActivityFilter = psgeoAddSubtypeGroupFilters(db,lib,lang,map,group,oneActivityFilter)
        }

        if (oneActivityFilter !== undefined && result !== undefined ) result = db.filterOr([result,oneActivityFilter])
        if (oneActivityFilter !== undefined && result === undefined ) result = oneActivityFilter
    }

    // psgeoDebug(lib.debugPrintObject(result))
    // Logical structure of default result: (((((((Biking OR Caving) OR Climbing) OR Sauna) OR Skiing) OR Snowboarding) OR Swimming) OR Diving) OR Urban-Exploration
    return result
}


function psgeoCreateSubtypeGroupFilters(db,lib,lang,map) {
    var result = [];
    for (var i = 0; i < psgeoSubtypeGroupCheckboxLists.length; i++) {
        var entry = psgeoSubtypeGroupCheckboxLists[i];
        // entry is of the form { group: OBJECT, checkboxes: ARRAY  }
        var one = psgeoCreateSubtypeGroupFilter(db,lib,lang,map,entry);
        if (one !== undefined ) {
            // ignore filterFalse: { op: "false" }
            // because we want a "false" only if ALL subactivities are unchecked,
            // not just one group.
            if ( JSON.stringify(one) !== JSON.stringify(db.filterFalse()) ) {
                result.push(one);
            }
        }
    }
    if (result.length === 0) result.push(db.filterFalse())
    return(result);
}

function psgeoCreateSubtypeGroupFilter(db,lib,lang,map,entry) {
    // entry is of the form { group: OBJECT, checkboxes: ARRAY  }
    // group contains information on related top level activities for which these subactivities are valid
    var group = entry.group;
    var checkboxes = entry.checkboxes;
    if (checkboxes.length == 0 || psgeoAllBoxesChecked(checkboxes)) return(undefined);
    return(psgeoCreateSubactivityFilterFromCheckboxes(db,group.activities,checkboxes));
}

function psgeoCreateOnlyHomelandFilter(db,lib,lang,map,psgeoDomainDefault) {

    function homelandPartFilter(checked,psgeoDomainDefault) { 
        if (checked) return(db.filterMatchCountry(psgeoDomainDefault.homeCountry));
        return(undefined);
    }
    
    function otherPartFilter(checked,psgeoDomainDefault) { 
        if (checked) return(db.filterNot(db.filterMatchCountry(psgeoDomainDefault.homeCountry)));
        return(undefined);
    }
   
    // No checkboxes for user. Rely on default value.
    if (psgeoOnlyHomelandFilterCheckbox === undefined && psgeoOtherCountriesFilterCheckbox === undefined) {
        if (psgeoDomainDefault.defaultFilter.onlyHomeCountry) return homelandPartFilter(true,psgeoDomainDefault)
        return(undefined);
    }

    // Homeland filter checkbox exists, use it.
    if (psgeoOnlyHomelandFilterCheckbox !== undefined && psgeoOtherCountriesFilterCheckbox === undefined) {
        return(homelandPartFilter(psgeoOnlyHomelandFilterCheckbox.checked,psgeoDomainDefault)); }

    
    // No homeland filter checkbox. Rely on default value.
    if (psgeoOnlyHomelandFilterCheckbox === undefined && psgeoOtherCountriesFilterCheckbox !== undefined) {

        let filters = []
        var one = homelandPartFilter(psgeoDomainDefault.defaultFilter.onlyHomeCountry,psgeoDomainDefault);
        if (one !== undefined) filters.push(one);
        var other = otherPartFilter(psgeoOtherCountriesFilterCheckbox.checked,psgeoDomainDefault);
        if (other !== undefined) filters.push(other);
        return(db.filterOr(filters));
    }

    var filters = [];
    var one = homelandPartFilter(psgeoOnlyHomelandFilterCheckbox.checked,psgeoDomainDefault);
    if (one !== undefined) filters.push(one);
    var other = otherPartFilter(psgeoOtherCountriesFilterCheckbox.checked,psgeoDomainDefault);
    if (other !== undefined) filters.push(other);
    return(db.filterOr(filters));
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

function psgeoMoreFilterWindowNeeded(psgeoDomainDefault) {
    return(psgeoDomainDefault.nameSearch ||
           psgeoDomainDefault.rockTypeSearch ||
           psgeoDomainDefault.morphologySearch ||
           psgeoDomainDefault.waterbodySearch ||
           psgeoDomainDefault.divingEnvironmentSearch ||
           psgeoDomainDefault.divingTaskSearch ||
           psgeoDomainDefault.waterbodySearch ||
           psgeoDomainDefault.saunaTypeSearch ||
           psgeoDomainDefault.bikingSearch ||
           psgeoDomainDefault.urbanexTargetSearch ||
           psgeoDomainDefault.skiingSubstanceSearch ||
           psgeoDomainDefault.skiingUphillSearch ||
           psgeoDomainDefault.climbingTypeSearch ||
           psgeoDomainDefault.homeCountrySelection);
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

function psgeoStatLineNumberOfMaps(lang,n) {
    return(n.toString() + " " + lang.getText("caveMaps"));
}

function psgeoStatLineNumberOf3Dmodels(lang,n) {
    return(n.toString() + " " + lang.getText("models3D"));
}

function psgeoUpdateStatsPaneText(db,
                                  lib,
                                  lang,
                                  map,
                                  geolocation,
                                  arrayitems,
                                  ncontinents,
                                  ncountries,
                                  ncities,
                                  nstatesus,
                                  nstatesca,
                                  ncavemaps,
                                  nmodels3d,
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

    let statLines = tbl.getStatLines(psgeoDomainDefault.statLines);
    arrayitems[0].innerHTML = (statLines.place[psgeoSmallDisplayMode])(lang,nplaces);
    arrayitems[1].innerHTML = (statLines.city[psgeoSmallDisplayMode])(lang,ncities);
    arrayitems[2].innerHTML = (statLines.country[psgeoSmallDisplayMode])(lang,ncountries);
    arrayitems[3].innerHTML = (statLines.continent[psgeoSmallDisplayMode])(lang,ncontinents);
    arrayitems[4].innerHTML = (statLines.state[psgeoSmallDisplayMode])(lang,nstatesus);
    arrayitems[5].innerHTML = (statLines.province[psgeoSmallDisplayMode])(lang,nstatesca);
    arrayitems[6].innerHTML = (statLines.cavemap[psgeoSmallDisplayMode])(lang,ncavemaps);
    arrayitems[7].innerHTML = (statLines.model3d[psgeoSmallDisplayMode])(lang,nmodels3d);
 
 
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

function psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    let ncontinents = db.nContinents();
    let ncountries = db.nCountries();
    let ncities = db.nCities();
    let nstatesus = db.nStates("USA");
    let nstatesca = db.nStates("Canada");
    let ncavemaps = db.nCavemaps();
    let nmodels3d = db.nModels3D();
    let nplaces = db.nPlaces();

    psgeoUpdateStatsPaneText(db,
                             lib,
                             lang,
                             map,
                             geolocation,
                             psgeoStatsPaneTexts,
                             ncontinents,
                             ncountries,
                             ncities,
                             nstatesus,
                             nstatesca,
                             ncavemaps,
                             nmodels3d,
                             nplaces,
                             myPosition,
                             psgeoPopup, 
                             tbl,
                             cfg,
                             psgeoDomainDefault);
}

function psgeoInitFilterPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    // Add filtering checkboxes
    psgeoInitFilterPaneText(db,lib,lang,map,geolocation,psgeoFilterPaneTexts[0],myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);

    // Create FilterMenuButtonInFilterPane
    if (psgeoMoreFilterWindowNeeded(psgeoDomainDefault)) {  // true jos tarvitaan nimihakua tai muita filttereitä!

        let psgeoFilterMenuButtonInFilterPane =
            psgeoGetFilterMenuButton(lang,
                                     psgeoFilterPaneTexts[0],
                                     function() {
                                         psgeoDebug("Filter button pressed!");
                                         psgeoFilterMenuBringUp(db,lib,lang,map,geolocation,true,psgeoSmallDisplayMode,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
                                     },   
                                     cfg, 
                                     psgeoDomainDefault);

        psgeoFilterMenuButtonInFilterPane.id='psgeoFilterMenuButtonInFilterPane';
        
    }    

    // Add geolocation button 1
    psgeoGeolocationButtonInFilterPane = geolocation.getGeolocationButton(lang,lib,cfg,psgeoDomainDefault,map,myPosition,psgeoGeolocationButtonInFilterPane,psgeoSmallDisplayMode,psgeoFilterPaneTexts[0],geolocation);

    psgeoGeolocationButtonInFilterPane.id='psgeoGeolocationButtonInFilterPane';

}

function psgeoInitStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
   
    // Add statistics
    psgeoUpdateStatsPane(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);

    // Create buttons to Filter pane and Stats pane
    //     The functions psgeoGet*Button accept button placement as second parameter
    //     Attention: psgeoSmallDisplayMode modulates placement (to upper/lower pane)
    //     Note that both Filter menu button and More menu button are in the stats window on small screens!


    // Add filter menu button 2
    if (psgeoMoreFilterWindowNeeded(psgeoDomainDefault)) { 
        psgeoFilterMenuButtonInStatsPane =
            psgeoGetFilterMenuButton(lang,
                                     psgeoStatsPaneTexts[8],
                                     function() {
                                         psgeoDebug("Filter button pressed!");
                                         psgeoFilterMenuBringUp(db,lib,lang,map,geolocation,true,psgeoSmallDisplayMode,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
                                     },
                                     cfg,
                                     psgeoDomainDefault);

        psgeoFilterMenuButtonInStatsPane.id='psgeoFilterMenuButtonInStatsPane';
        psgeoFilterMenuButtonInStatsPane.style.display='none';
        if (window.innerWidth < cfg.psgeoSmallDisplayModeLimit) psgeoFilterMenuButtonInStatsPane.style.display='float';
    }


    // Add geolocation button 2
    psgeoGeolocationButtonInStatsPane = geolocation.getGeolocationButton(lang,lib,cfg,psgeoDomainDefault,map,myPosition,psgeoGeolocationButtonInStatsPane,psgeoSmallDisplayMode,psgeoStatsPaneTexts[8],geolocation);

    psgeoGeolocationButtonInStatsPane.id='psgeoGeolocationButtonInStatsPane';
    psgeoGeolocationButtonInStatsPane.style.display='none'; // by default geolocation button is shown in filterpane
    if (window.innerWidth < cfg.psgeoSmallDisplayModeLimit) psgeoGeolocationButtonInStatsPane.style.display='block';
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

function adjustUserInterfaceForSmallScreen(psgeoFilterMenuButtonInStatsPane,psgeoGeolocationButtonInStatsPane) {
    // Only StatsPane displayed (much of this could be CSS3 media queries)
    document.getElementById('Filter').style.display='none';
    psgeoFilterMenuButtonInStatsPane.style.display='block';
    psgeoGeolocationButtonInStatsPane.style.display='block';
    // Make stuff visible in filter menu in filter menu
    let contentFilterInFilterMenu = document.getElementById('contentFilterInFilterMenu');
    if (contentFilterInFilterMenu !== null) contentFilterInFilterMenu.style.display='block'
}

function adjustUserInterfaceForLargeScreen(psgeoFilterMenuButtonInStatsPane,psgeoGeolocationButtonInStatsPane) {
    // Both FilterPane and StatsPane displayed (much of this could be CSS3 media queries)
    document.getElementById('Filter').style.display='block';
    psgeoFilterMenuButtonInStatsPane.style.display='none';
    psgeoGeolocationButtonInStatsPane.style.display='none';
    // Make stuff invisible in filter menu
    let contentFilterInFilterMenu = document.getElementById('contentFilterInFilterMenu');
    if (contentFilterInFilterMenu !== null) contentFilterInFilterMenu.style.display='none'
}

function putStuffInFilterPane() {
    // Display mode is changed to LARGE
    // rangeCategoryFilterPaneDiv and contentFilterPaneDiv need to get moved
    // from FilterWindow to FilterPane

    // Let's first get some pointers to the relevant objects
    let activitiesFilterPaneDiv = document.getElementById('activitiesFilterPaneDiv');       // First in FilterPane
    let rangeCategoryFilterPaneDiv = document.getElementById('rangeCategoryFilterPaneDiv'); // Second
    let contentFilterPaneDiv = document.getElementById('contentFilterPaneDiv');             // Third

    if (rangeCategoryFilterPaneDiv !== null && contentFilterPaneDiv !== null ) {
        activitiesFilterPaneDiv.after(rangeCategoryFilterPaneDiv);
        rangeCategoryFilterPaneDiv.after(contentFilterPaneDiv);
        return
    }
    if (rangeCategoryFilterPaneDiv !== null) {
        activitiesFilterPaneDiv.after(rangeCategoryFilterPaneDiv);
        return
    }
    if (contentFilterPaneDiv !== null) {
        activitiesFilterPaneDiv.after(contentFilterPaneDiv);
        return
    }
}

function putStuffInFilterMenu() {
    // Display mode is changed to SMALL
    // rangeCategoryFilterPaneDiv and contentFilterPaneDiv need to get moved
    // from FilterPane to FilterWindow

    // Let's first get some pointers to the relevant objects
    let rangeCategoryFilterPaneDiv = document.getElementById('rangeCategoryFilterPaneDiv'); // Second
    let contentFilterPaneDiv = document.getElementById('contentFilterPaneDiv');             // Third

    let rangeFilterSpot = document.getElementById('rangeCategoryFilterInFilterMenu')
    if (rangeFilterSpot !== null) rangeFilterSpot.appendChild(rangeCategoryFilterPaneDiv);
    let contentFilterSpot = document.getElementById('contentFilterInFilterMenu')
    if (contentFilterSpot !== null) contentFilterSpot.appendChild(contentFilterPaneDiv);
    return
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

async function psgeoOtherToolsMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup) {
    // This dialog shows links to other maps on the web
    if (!psgeoDomainDefault.classicUI || psgeoOtherToolsWindow === undefined) {

        //
        // Window header (and closebutton in new UI)
        //

        var div = document.createElement("div");
        if (!psgeoDomainDefault.classicUI) {
            div.setAttribute("id", "OtherTools"); // css/style.css
            // Create a close button to the upper righthand corner
            let button = psgeoGenericMenuButton(lang,'','&#10005;',div, function () {
                div.style.display='none';
                },'','closeButton',cfg,psgeoDomainDefault);
            button.classList.add('checkboxControlButtons');
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


        // Create a table to show image and description text side by side
        let table = document.createElement("div");
        let tableParams ='id="otherToolsTableOnLargeDisplay"'; // see css/style.css
        if (cfg.smallDisplayMode) tableParams='id="otherToolsTableOnSmallDisplay"';


        var rows = [];
        for (var i = 0; i < psgeoOtherTools.length; i++) {
            var tool = psgeoOtherTools[i];
            var picture = lib.htmlLink(lib.htmlImage(tool.icon,''), // css
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

        table.innerHTML = lib.htmlTable(rows,tableParams); // id for css
        div.appendChild(table);

        //
        // Window creation
        //
        if (psgeoDomainDefault.classicUI) {
            psgeoOtherToolsWindow = new google.maps.InfoWindow;
            psgeoOtherToolsWindow.setContent(div);
        }   // In the other case nothing needs to be done here. See below.

        //
        // Place in custom control
        //
        await map.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(3,div);
 
    }

    //
    // Clear the screen
    //

    if (psgeoPopup !== undefined) psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();

    //
    // Open dialog
    //

    if (!psgeoDomainDefault.classicUI) {
        if (document.getElementById('MoreFilter') !== null) document.getElementById('MoreFilter').style.display='none';
        if (document.getElementById('MoreInfo')   !== null) document.getElementById('MoreInfo').style.display='none';
        if (document.getElementById('AboutMenu') !== null)  document.getElementById('AboutMenu').style.display='none';
        document.getElementById('OtherTools').style.display='block';
    } else {
        psgeoOtherToolsWindow.setPosition(map.getCenter());
        psgeoOtherToolsWindow.open(map)
    }
}

function psgeoFilterSectionPrefix(lang,text,subdiv) {

    // Each filter section is in its own div.
    // We can now assign that div a class.
    // subdiv.classList.add('marginTopNarrow');

    var textNode = document.createTextNode(lang.capitalize(text) + ": ");
    var boldText = document.createElement('strong');
    boldText.appendChild(textNode);
    // Now we can append either textNode (plain) or boldText (strong)...

    if ( psgeoSmallDisplayMode) {
        //    Type:
        //[ ] Volcanic [ ] Unknown"
        // subdiv.appendChild(newline);
        subdiv.appendChild(boldText);
    } else {
        //
        //    Type:
        //    [ ] Volcanic [ ] Unknown"
        // subdiv.appendChild(newline);
        subdiv.appendChild(boldText);
    }
}


function toggleDisplayBlock(structure,lang,textId,psgeoSmallDisplayMode,cfg,psgeoDomainDefault,recenter) {

    function clearFilterWindow() {
        let filterWindowBlocks = document.getElementsByClassName('filterWindowBlock');
        for (block of filterWindowBlocks) { block.style.display='none'; }
    }

    let toggleDisplayButton = psgeoGenericMenuButton(lang,
                           '', // no icon
                           lang.getText(textId,psgeoSmallDisplayMode).toUpperCase(),
                           structure,
                           function() {
                               if (structure.style.display === 'none') {
                                   clearFilterWindow();
                                   structure.style.display = 'block';
                               } else {
                                   structure.style.display = 'none';
                               } 
                           } ,  
                           '',  
                           cfg, 
                           psgeoDomainDefault);
     toggleDisplayButton.classList.add("filterWindowTabbedMenuButton"); // css/style.css
     return toggleDisplayButton;
}

function clearFilterWindow() {
    let filterWindowBlocks = document.getElementsByClassName('filterWindowBlock');
    for (block of filterWindowBlocks) { block.style.display='none'; }
}

function psgeoFilterMenuContents(db,lib,lang,map,geolocation,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {

    // DOCUMENT STRUCTURE IN FILTER WINDOW
    //
    // subdiv                             class: 
    //     wrapperName                    class: filterWindowBlock               Task: search by name
    //     wrapperRange                   class: filterWindowBlock
    //         first                      class: -                               Task: redefinition of range category boundaries
    //             psgeoRangeHighInput    class: marginRightNone                       - upper boundary
    //             psgeoRangeLowInput     class: -                                     - lower boundary
    //         second                     class: marginTopNarrow                 Task: range range filtering
    //     wrapperSubtypeGroups           class: filterWindowBlock               Task: subactivity filtering
    //         wrapperThisGroup           class: -
    //         wrapperThisGroup           class: .
    //         ...
    //     wrapperMore                    class: filterWindowBlock               Task: all the rest, e.g:
    //         col1                       class: -                               Task: media filtering (article/map/3d)
    //         col2                       class: -                               Task: home country / world
    //         col3                       class: -                               Task: source selection
    //     wrapperTabbedMenu              class: flexboxRow, marginTopNarrow,    Task: filter selection
    //                                           marginBottomNone

    // wrapperName, wrapperRange, wrapperSubtypeGroups and wrapperMore use class .largeFont when psgeoSmallDisplayMode!

    //
    // Let's keep track of what filter selection buttons are needed!
    //
    let nameFilter=false;
    let rangeFilter=false;
    let subactivityFilter=false;
    let moreFilter=false;

    // Things that are alternatingly in FilterPane or here are: range filter checkboxes and content filter checkboxes!!!


    //
    // Name search
    //
    if (psgeoDomainDefault.nameSearch) {
        nameFilter=true;
        // Create a container
        var wrapperName = document.createElement('div'); // scope:function
        if (psgeoSmallDisplayMode) {
            wrapperName.classList.add('filterWindowBlock','largeFont');
        } else {
            wrapperName.classList.add('filterWindowBlock');
        }
        wrapperName.style.display='block';
        subdiv.appendChild(wrapperName);
        // Place header text and the input in the div
        psgeoFilterSectionPrefix(lang,lang.getText("name"),wrapperName); // Name search box has header "Name"
        psgeoNameFilterInput = psgeoGetNameInput(lib,lang,wrapperName);
        // React to input
        psgeoNameFilterInput.addEventListener('input', function() { 
            psgeoDebug("Name filter entered!");
            psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
        });
    }

    //
    // Create a wrapper for range redefinition
    //
    if (psgeoDomainDefault.rangeCategoryLimits.allowFiltering) {
        // in multi-activity mode we cannot present any filtering by length/time/grade/etc
        // because activities may not share the same measure/metric
        rangeFilter=true;
        var wrapperRange = document.createElement('div'); // scope:function
        let first = document.createElement('div')
        let second = document.createElement('div')
        wrapperRange.id='wrapperRange'
        second.id='rangeCategoryFilterInFilterMenu';
        second.classList.add('marginTopNarrow');
        if (psgeoSmallDisplayMode) {
            wrapperRange.classList.add('filterWindowBlock','largeFont');
        } else {
            wrapperRange.classList.add('filterWindowBlock');
        }
        wrapperRange.style.display='none';
        wrapperRange.appendChild(first);  // For range boundaries redefinition
        wrapperRange.appendChild(second); // For the actual range filter (if shown here)
        subdiv.appendChild(wrapperRange);
        
        //
        // Allow redefinition of the range category boundaries/limits
        //

        if (psgeoDomainDefault.rangeCategoryLimits.allowChanging) {

            // psgeoDomainDefault.rangeCategoryLimits has: allowChanging, measure, unit, limitLow, limitHigh.
            //    measure can be: "length", "depth", "grade", etc and gets translated by lang
            //    unit can be: "", "meters", "kilometers", "minutes" etc and gets translated by lang
            // lang has: rangeHigh/Medium/Low texts with values and the getText() method.
            let measureName = lang.getText(psgeoDomainDefault.rangeCategoryLimits.measure,false);
            let unit = lang.getText(psgeoDomainDefault.rangeCategoryLimits.unit,false);

            // Populate the container 
            psgeoFilterSectionPrefix(lang,lang.getText(psgeoDomainDefault.rangeCategoryLimits.measure,false) + lang.getText("rangeCategoryLimits",false),first);
            first.appendChild(document.createElement('br'));
            let psgeoRangeHighInput = psgeoGetRangeHighInput(lib,lang,first,psgeoDomainDefault);
            let psgeoRangeLowInput = psgeoGetRangeLowInput(lib,lang,first,psgeoDomainDefault);
            psgeoRangeHighInput.classList.add('marginRightNarrow');

            // Get rangeCategoryLimits input and act on user input
            //     note: psgeoRerunFilters is run for ANY event in subdiv. See at the end of this function.

            psgeoRangeHighInput.addEventListener('input', function() {

                // Impose limits
                let limitHigh = psgeoRangeHighInput.valueAsNumber;
                let limitLow = psgeoRangeLowInput.valueAsNumber;
                if (isNaN(limitHigh)) {
                    limitHigh = psgeoDomainDefault.rangeCategoryLimits.limitHigh
                }
                if (isNaN(limitLow)) {
                    limitLow = psgeoDomainDefault.rangeCategoryLimits.limitLow
                }
                if (limitHigh < limitLow) {
                    limitHigh = limitLow
                    psgeoRangeHighInput.classList.add('highlightError')    
                } else {
                    psgeoRangeHighInput.classList.remove('highlightError')    
                } 

                // Store number in settings
                psgeoDomainDefault.rangeCategoryLimits.limitHigh = limitHigh;

                // Update limits in filter pane.
                // The number is once in middle range, once in upper/lower range.
                let divlistRangeLimitHigh = document.getElementsByClassName("divRangeLimitHigh");
                for (div of divlistRangeLimitHigh) div.innerHTML=limitHigh.toString();

                psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
            });
            psgeoRangeLowInput.addEventListener('input', function() {

                // Impose limits
                let limitHigh = psgeoRangeHighInput.valueAsNumber;
                let limitLow = psgeoRangeLowInput.valueAsNumber;
                if (isNaN(limitHigh)) {
                    limitHigh = psgeoDomainDefault.rangeCategoryLimits.limitHigh
                }
                if (isNaN(limitLow)) {
                    limitLow = psgeoDomainDefault.rangeCategoryLimits.limitLow
                }
                if (limitHigh < limitLow) {
                    limitLow = limitHigh
                    psgeoRangeLowInput.classList.add('highlightError')    
                } else {
                    psgeoRangeLowInput.classList.remove('highlightError')    
                } 

                // Store number in settings
                psgeoDomainDefault.rangeCategoryLimits.limitLow = limitLow;

                // Update limits in filter pane.
                // The number is once in middle range, once in upper/lower range.
                let divlistRangeLimitLow = document.getElementsByClassName("divRangeLimitLow");
                for (div of divlistRangeLimitLow) div.innerHTML=limitLow.toString();

                psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
            });
        }
        // Range limits redefinition part ends here.
        // Note: Range category filtering checkboxes get appended >>here<< in smallDisplayMode,
        // but it is done psgeoFilterMenuBringUp for every menu invocation not just init.

    } // end-of-range-filter


    //
    // Any searches for subtypes (sauna types, waterbody, rock types, etc)
    //     Subtype groups are defined in psgeoTables.js
    //

    let subtypeGroups = tbl.getSubtypeGroups();
    if (subtypeGroups.length > 0) {
        subactivityFilter=true;
        // Create container
        var wrapperSubtypeGroups = document.createElement('div'); // scope:function
        wrapperSubtypeGroups.id='subtypeSelectionGroups'; 
        if (psgeoSmallDisplayMode) {
            wrapperSubtypeGroups.classList.add('filterWindowBlock','largeFont');
        } else {
            wrapperSubtypeGroups.classList.add('filterWindowBlock');
        }

        // Is this the tab to show initially?
        wrapperSubtypeGroups.style.display='none'; // = THIS IS NOT THE DEFAULT TAB TO VIEW
        subdiv.appendChild(wrapperSubtypeGroups);
        // By default we want to show the small and neat name search only. However,
        if (!psgeoDomainDefault.nameSearch) wrapperSubtypeGroups.style.display='block'; // UNLESS NAME FILTER WAS MISSING...
        //     and if this does not trigger, then the last option is wrapperMore below. 

        let displayedGroups=0; // in case we need different top margins for first and successive blocks

        for (var i = 0; i < subtypeGroups.length; i++) {
            const group = subtypeGroups[i];
            if (psgeoDomainDefault[group.selector] &&
               group.displaySizeSelector[psgeoSmallDisplayMode]) {
                    displayedGroups++;
                    // Keep the filter section prefix (header) and the flexbox in one div that can be hidden/shown
                    let displayBlock = document.createElement('div');
                    displayBlock.id  = group.descriptionTextId;
                    displayBlock.style.display = 'block'; 
                    if (psgeoDomainDefault.activityCheckboxes) {
                        displayBlock.style.display = 'none'; // dynamically changed in psgeoRerunFilters!
                                                             // set to none to avoid show-hide-show effect in RerunFilters!
                    }
                    // Header goes into displayBlock
                    if (displayedGroups > 1 && !psgeoSmallDisplayMode) displayBlock.appendChild(document.createElement('br'));
                    psgeoFilterSectionPrefix(lang,lang.getText(group.descriptionTextId,psgeoSmallDisplayMode),displayBlock); 
                    // and so goes flexbox with each checkbox + text in a span with whiteSpace:nowrap
                    let wrapperThisGroup = document.createElement('div');
                    wrapperThisGroup.classList.add('flexboxRow');
                    var checkboxList = psgeoGetSubtypeGroupCheckboxList(lib,lang,cfg,group,wrapperThisGroup);
                    displayBlock.appendChild(wrapperThisGroup);
                    // The displayBlock now contains (possibly a newline and) a header and suubtype checkboxes
                    // Next append all to the filter menu tab wrapperSubtypeGroups
                    wrapperSubtypeGroups.appendChild(displayBlock);
                    psgeoSubtypeGroupCheckboxLists.push(checkboxList);
                    // Keep a list of subtype groups that are enabled
                    // This makes it easier to hide/show them in filter menu (depending on activities filter
                    psgeoListOfEnabledSubtypeGroups.push(group.descriptionTextId)
            }
        }
    }

    //
    // More search options
    //

    let wrapperMore = document.createElement('div'); // scope:function, let is ok here
    let col1 = document.createElement('div')
    let col2 = document.createElement('div')
    let col3 = document.createElement('div')
    col1.id='contentFilterInFilterMenu'; 
    wrapperMore.appendChild(col1);
    wrapperMore.appendChild(col2);
    wrapperMore.appendChild(col3);
    subdiv.appendChild(wrapperMore);

    psgeoFilterSectionPrefix(lang,lang.getText("require"),col1);

    if (psgeoSmallDisplayMode) {
        wrapperMore.classList.add('filterWindowBlock','largeFont');
    } else {
        col1.style.display='none'
        wrapperMore.classList.add('filterWindowBlock');
    }
    wrapperMore.style.display='none';

    // Content filtering
    if (psgeoSmallDisplayMode) {
        moreFilter=true;
        // On small displays article/map/3d-model filtering is only available here as the Filter Pane is gone.
        col1.appendChild(document.createElement('br'));
        // Get the div from Filter Pane
        let contentFilterPaneDiv = document.getElementById('contentFilterPaneDiv');
        if (contentFilterPaneDiv !== null ) { // XXXXXXX should exist!!! Missing in psgeoSmallDisplayMode,classicUI!
            col1.appendChild(contentFilterPaneDiv);
        }
    }

    // Country filtering
    if (psgeoDomainDefault.homeCountrySelection) {
        moreFilter=true;
        psgeoFilterSectionPrefix(lang,lang.getText("country"),col2);
        col2.appendChild(document.createElement('br'));
        psgeoOnlyHomelandFilterCheckbox = psgeoGetOnlyHomelandCheckbox(lib,lang,col2,psgeoDomainDefault); 
        psgeoOtherCountriesFilterCheckbox = psgeoGetOtherCountriesCheckbox(lib,lang,col2,psgeoDomainDefault);
    }
    
    // Source filtering
    // NOTE: The infoWindow object (classicUI) retains its content, but the custom control does not
    //       because the custom control is CLEARED and regenerated depending on which menu it contains!
    //       Hence the !psgeoDomainDefault.classicUI to regenerate modern UI content on click!

    if (psgeoDomainDefault.sourcesCheckboxes) {
        moreFilter=true;
        if (!psgeoDomainDefault.classicUI || psgeoSourceFilterCheckboxes.length == 0) {
                psgeoFilterSectionPrefix(lang,lang.getText("source",psgeoSmallDisplayMode),col3);
                col3.appendChild(document.createElement('br'));
                psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(lib,lang,col3,psgeoDomainDefault.sources);
        }
    }


    //
    // Tabbed menu
    //

    let wrapperTabbedMenu = document.createElement('div');
    let nameOnOff = document.createElement('div')
    let rangeOnOff = document.createElement('div')
    let subtypeGroupsOnOff = document.createElement('div')
    let moreOnOff  = document.createElement('div')
    let measure = psgeoDomainDefault.rangeCategoryLimits.measure; // textId for length, depth, time, grade etc.

    if (nameFilter) {
        let thisFilterSwitch = toggleDisplayBlock(wrapperName,lang,'name',psgeoSmallDisplayMode,cfg,psgeoDomainDefault);
        nameOnOff.appendChild(thisFilterSwitch);
        wrapperTabbedMenu.appendChild(nameOnOff);
    }
    if (rangeFilter) {
        let thisFilterSwitch = toggleDisplayBlock(wrapperRange,lang,measure,psgeoSmallDisplayMode,cfg,psgeoDomainDefault);
        rangeOnOff.appendChild(thisFilterSwitch);
        wrapperTabbedMenu.appendChild(rangeOnOff);
    }
    if (subactivityFilter) {
        let thisFilterSwitch = toggleDisplayBlock(wrapperSubtypeGroups,lang,'showSubtypeGroups',psgeoSmallDisplayMode,cfg,psgeoDomainDefault);
        subtypeGroupsOnOff.appendChild(thisFilterSwitch);
        wrapperTabbedMenu.appendChild(subtypeGroupsOnOff);
    }
    if (moreFilter) {
        let thisFilterSwitch = toggleDisplayBlock(wrapperMore,lang,'showMoreTools',psgeoSmallDisplayMode,cfg,psgeoDomainDefault);
        moreOnOff.appendChild(thisFilterSwitch);
        wrapperTabbedMenu.appendChild(moreOnOff);
    }

    if (nameFilter || rangeFilter || subactivityFilter || moreFilter) {
        // Display the 'tabbed menu'
        subdiv.appendChild(wrapperTabbedMenu);
        wrapperTabbedMenu.classList.add('flexboxRow','marginTopNarrow','marginBottomNone');

        // Wait for click events on any of the checkboxes installed above
        subdiv.addEventListener('click', function() {
            psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
        });
    } else {
        let notice = document.createTextNode('All filtering has been turned off in the settings!');
        subdiv.appendChild(notice);
    }

}

function psgeoFilterMenuContentsClassic(db,lib,lang,map,geolocation,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    psgeoDebug("filter menu contents " +
               JSON.stringify(psgeoSmallDisplayMode) +
               " " +
               JSON.stringify(psgeoDomainDefault.nameSearch) +
               " " +
               JSON.stringify(psgeoDomainDefault.waterbodySearch) +
               " " +
               JSON.stringify(psgeoDomainDefault.rockTypeSearch));

    // Name searches
    if (psgeoDomainDefault.nameSearch) {
        psgeoFilterSectionPrefix(lang,lang.getText('name'),subdiv);
        psgeoNameFilterInput = psgeoGetNameInput(lib,lang,subdiv);
        psgeoNameFilterInput.addEventListener('input', function() {
            psgeoDebug("Name filter entered!");
            psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault)
        });
    }

    // Any searches for subtypes (sauna types, waterbody, eventually also rock types, etc)
    let subtypeGroups = tbl.getSubtypeGroups();
    for (var i = 0; i < subtypeGroups.length; i++) {
        const group = subtypeGroups[i];
        psgeoDebug("considering subtype group " + group.selector + " " + JSON.stringify(group.displaySizeSelector[psgeoSmallDisplayMode]));
        if (psgeoDomainDefault[group.selector] &&
            group.displaySizeSelector[psgeoSmallDisplayMode]) {
            subdiv.appendChild(document.createElement('br'));
            psgeoDebug("selected");
            psgeoDebug("going to use lang textId " + group.descriptionTextId);
            psgeoFilterSectionPrefix(lang,lang.getText(group.descriptionTextId,psgeoSmallDisplayMode),subdiv);
            let wrapperFlexboxGroup = document.createElement('div');
            wrapperFlexboxGroup.classList.add('flexboxRow'); // 
            var checkboxList = psgeoGetSubtypeGroupCheckboxList(lib,lang,cfg,group,wrapperFlexboxGroup);
            subdiv.appendChild(wrapperFlexboxGroup);
            psgeoSubtypeGroupCheckboxLists.push(checkboxList);
        }
    }

    // Country filtering
    if (psgeoDomainDefault.homeCountrySelection && !psgeoSmallDisplayMode) {
        subdiv.appendChild(document.createElement('br'));
        psgeoFilterSectionPrefix(lang,lang.getText('country',psgeoSmallDisplayMode),subdiv); 
        psgeoOnlyHomelandFilterCheckbox = psgeoGetOnlyHomelandCheckbox(lib,lang,subdiv);
    }

    // Source filtering
    if (psgeoDomainDefault.sourcesCheckboxes) {
        if (psgeoSourceFilterCheckboxes.length == 0) {
            subdiv.appendChild(document.createElement('br'));
            psgeoFilterSectionPrefix(lang,lang.getText('source',psgeoSmallDisplayMode),subdiv); 
            psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(lib,lang,subdiv);
        }
    }

    //
    // Wait for click events on any of the checkboxes installed above
    //
    subdiv.addEventListener('click', function() {
        psgeoDebug("Filter 2 pressed!");
        psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault)
    });
}

function psgeoMoreMenuContents(db,lib,lang,map,subdiv,cfg,psgeoDomainDefault,psgeoPopup) {
    // This creates the contents of the dialog that opens when (i) is clicked.
    // We only show this in the Single Activity Mode
    if (psgeoDomainDefault.showCustomLinks) {

        let numberOfLinks = psgeoDomainDefault.customLinks.length;
        for (let i=0; i<numberOfLinks; i++) {
            let customLink=psgeoDomainDefault.customLinks[i];
            if (customLink !== undefined && customLink.url !== "") {
            psgeoDebug("We have a custom link: "+customLink.textId+" with url "+customLink.url);
            if (customLink.popup) psgeoDebug("It is a popup "+customLink.popupWidth+" wide and "+customLink.popupHeight+" tall.");
            // We do not need a variable for this button. It gets buried in the "document".
            psgeoGetCustomLinkMenuButton(lang,
                                      subdiv,
                                      customLink,
                                      function() {
                                          psgeoDebug("Custom link button pressed!");
                                          psgeoCustomLinkBringUp(customLink.url,customLink.popup,customLink.popupWidth,customLink.popupHeight);
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

async function psgeoFilterMenuBringUp(db,lib,lang,map,geolocation,toOpen,psgeoSmallDisplayMode,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault) {
    // Classic UI uses the Google Maps infoWindow to present a detailed filter settings dialog.
    // The tip of the infoWindow gets centered on the screen.
    // If the infoWindow is too big and overruns window borders, autopanning moves the screen.
    // This can be distracting. The Modern UI solves this issue, but changes aesthetics.
    // Choose between classic and modern UI in DomainDefault.

    if (!psgeoDomainDefault.psgeoClassicUI && document.getElementById('MoreFilter') === null) {

        // 1. Create a container div for the filter menu/dialog
        var div = document.createElement("div");
        div.setAttribute("id", "MoreFilter"); // css/style.css
    
        // 2. Create a close button
        //     Use &#10005 (multiplication X) as symbol
        //     In small display mode two divs are in the soon to be closed window:
        //         rangeFilterPaneDiv and contentFilterPaneDiv
        //     These must be moved back to FilterPane (which is hidden!)
        //     or else they would be lost!
        let button = psgeoGenericMenuButton(lang,'','&#10005;' ,div, function () {
            div.style.display='none';
        },'','closeButton',cfg,psgeoDomainDefault)
        button.classList.add('checkboxControlButtons');
    
        // 3. append a div that contains the menu stuff itself
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoFilterMenuContents(db,lib,lang,map,geolocation,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);

        // 4. Put the filter menu in the MVC array
        await map.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(0,div);

    }

    // Range category filtering checkboxes dynamic placement
    if (psgeoSmallDisplayMode) {
        // Range category filter checkboxes are placed in FilterPane during init.
        // In smallDisplayMode=true, the FilterPane is hidden, though.
        // In that case we need to move the range category filter to the filter menu.
        let rangeCategoryFilterPaneDiv = document.getElementById('rangeCategoryFilterPaneDiv'); // checkboxes
        let wrapperRange = document.getElementById('wrapperRange'); // and a place for them in the menu
        if (rangeCategoryFilterPaneDiv.parentElement === wrapperRange ) {
            psgeoDebug("Filter menu already contains range filter. No need to fetch it from FilterPane.")
        } else {
            psgeoDebug("Adding range filter to filter menu.")
            wrapperRange.appendChild(rangeCategoryFilterPaneDiv);
            wrapperRange.addEventListener('click', function() { 
                psgeoDebug("Range category filter entered!");
                psgeoRerunFilters(db,lib,lang,map,geolocation,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
            });
        }
    }

    if (psgeoDomainDefault.classicUI && psgeoFilterWindow === undefined) {

        psgeoDebug("Creating a classic filter window.");

        // 1. Create a container div for the filter menu/dialog
        var div = document.createElement("div");
    
        // 2. append a div that contains the menu stuff itself
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        subdiv.classList.add('block');
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoFilterMenuContentsClassic(db,lib,lang,map,geolocation,subdiv,myPosition,psgeoPopup,tbl,cfg,psgeoDomainDefault);
 
        // 3. Create an infowindow for the menu       
        var params = {};
        params = { maxWidth: Math.ceil(window.innerWidth * 0.95) };
        psgeoFilterWindow = new google.maps.InfoWindow(params); // scope:global
        psgeoDebug("Created a filterwindow: "+psgeoFilterWindow);
        psgeoFilterWindow.setContent(div);
        psgeoDebug("Populated the filterwindow: "+psgeoFilterWindow);
    } 

    if (toOpen) {
        if (!psgeoDomainDefault.classicUI) {
            document.getElementById('MoreFilter').style.display='block';
            if (document.getElementById('MoreInfo')  !== null)  document.getElementById('MoreInfo').style.display='none';
            if (document.getElementById('AboutMenu') !== null)  document.getElementById('AboutMenu').style.display='none';
            if (document.getElementById('OtherTools') !== null) document.getElementById('OtherTools').style.display='none';
        } else {
            if (psgeoPopup !== undefined) psgeoPopup.close(); 
            if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close(); 
            if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
            if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
            psgeoFilterWindow.setPosition(map.getCenter());
            psgeoFilterWindow.open(map);
        }
    }
}

async function psgeoMoreMenuBringUp(db,lib,lang,map,toOpen,cfg,psgeoDomainDefault,psgeoPopup) { // Lisätiedot ja työkalut (i)
    // This menu is opened when the (i) button is toggled and it shows more tools, links, credits.
    // This menu does not get updated once it is created.It just gets opened/closed.

    // Create container (div) and add close button
    if (!psgeoDomainDefault.classicUI || psgeoMoreWindow === undefined) {
        // if the infowindow does not exist, then create it (irrespective of classic/modern UI)
        psgeoMoreWindow = new google.maps.InfoWindow;
        // create the div
        var div = document.createElement("div");
        if (!psgeoDomainDefault.classicUI) {
            div.setAttribute("id", "MoreInfo"); // referenced to in css/style.css
            // Create a close button to the upper righthand corner
            let button = psgeoGenericMenuButton(lang,'','&#10005;',div, function () { 
                div.style.display='none';
                },'','closeButton',cfg,psgeoDomainDefault);
            button.classList.add('checkboxControlButtons');
        }
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        div.appendChild(subdiv);
        // Newline
        div.appendChild(document.createElement("br"));
        // Populate the emty div
        psgeoMoreMenuContents(db,lib,lang,map,subdiv,cfg,psgeoDomainDefault,psgeoPopup);
        // Publish to infoWindow
        if (psgeoDomainDefault.classicUI) psgeoMoreWindow.setContent(div);
        // Place in custom control
        await map.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(1,div);
    }

    if (toOpen) {
        if (!psgeoDomainDefault.classicUI) {
            if (document.getElementById('MoreFilter') !== null) document.getElementById('MoreFilter').style.display='none';
            document.getElementById('MoreInfo').style.display='block';
            if (document.getElementById('AboutMenu') !== null)  document.getElementById('AboutMenu').style.display='none';
            if (document.getElementById('OtherTools') !== null) document.getElementById('OtherTools').style.display='none';
        } else {
            // Remove other windows before opening this one
            if (psgeoPopup !== undefined) psgeoPopup.close();
            if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
            if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close()
            if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
            // Open a Google Maps infoWindow
            psgeoMoreWindow.setPosition(map.getCenter());
            psgeoMoreWindow.open(map);
        }
    }
}

function psgeoCustomLinkBringUp(link,popup,width,height) {
    if (popup) {
        let params = "width="+width+",height="+height
        psgeoDebug("Opening a popup "+width+" wide and "+height+" tall.")
        window.open(link,"popup",params);
    } else {
        window.open(link, '_blank');
    }
}

async function psgeoAboutMenuBringUp(db,lib,lang,map,cfg,psgeoDomainDefault,psgeoPopup) { 

    if (!psgeoDomainDefault.classicUI || psgeoAboutWindow === undefined) {

        // Does it exist as an object already?
        psgeoAboutWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");

        if (!psgeoDomainDefault.classicUI) {
            // id for styling with css/style.css
            div.setAttribute("id", "AboutMenu");
            // Create a close button to the upper righthand corner
            let button = psgeoGenericMenuButton(lang,'','&#10005;',div, function () {
                div.style.display='none';
                },'','closeButton',cfg,psgeoDomainDefault);
            button.classList.add('checkboxControlButtons');
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

        // Place in custom control
        await map.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(2,div);
    }

    if (!psgeoDomainDefault.classicUI) {
        if (document.getElementById('MoreFilter') !== null) document.getElementById('MoreFilter').style.display='none';
        if (document.getElementById('MoreInfo')   !== null) document.getElementById('MoreInfo').style.display='none';
        document.getElementById('AboutMenu').style.display='block';
        if (document.getElementById('OtherTools') !== null) document.getElementById('OtherTools').style.display='none';
    } else {
        if (psgeoPopup !== undefined ) psgeoPopup.close();
        if (psgeoFilterWindow !== undefined) lib.psgeoFilterWindow.close();
        if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
        if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
        psgeoAboutWindow.setPosition(map.getCenter());
        psgeoAboutWindow.open(map); 
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

function psgeoGetFilterMenuButton(lang,structure,fn,cfg,psgeoDomainDefault) {
    var icon = cfg.getDefaultIcons.imgFilter; 
    if ( icon === undefined ) { icon=""; }
    if ( psgeoDomainDefault.hideButtontextFilter ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,"",'',cfg,psgeoDomainDefault));
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
    if (psgeoSmallDisplayMode) box.className = "largeInputFont"
    structure.appendChild(box);
    var br = document.createElement("br");
    structure.appendChild(br);
    return(box);
}

function psgeoGetRangeHighInput(lib,lang,structure,psgeoDomainDefault) {
    var box = document.createElement("input");
    box.type = "number";
    box.value = psgeoDomainDefault.rangeCategoryLimits.limitHigh;
    box.min = psgeoDomainDefault.rangeCategoryLimits.limitLow;
    box.required = true;
    box.id = "rangeHighInput";
    if (psgeoSmallDisplayMode) box.className = "largeInputFont"
    box.name = "rangeHighInput";
    structure.appendChild(box);
    return(box);
}

function psgeoGetRangeLowInput(lib,lang,structure,psgeoDomainDefault) {
    var box = document.createElement("input");
    box.type = "number";
    box.value = psgeoDomainDefault.rangeCategoryLimits.limitLow;
    box.min = 0;
    box.max = psgeoDomainDefault.rangeCategoryLimits.limitHigh;
    box.required = true;
    box.id = "rangeLowInput";
    if (psgeoSmallDisplayMode) box.className = "largeInputFont"
    box.name = "rangeLowInput";
    structure.appendChild(box);
    return(box);
}

function psgeoGetGenericCheckbox(id,text,structure,initiallyChecked,spacer) {
    // Appends a label + checkbox in 'structure' in the document for display

    // Create label
    var label = document.createElement("label");
    label.id = id;

    // Create checkbox
    var description = document.createTextNode(text);
    var box = document.createElement("input");
    box.type = "checkbox";
    box.value = id;
    box.checked = initiallyChecked;

    let keepTogether = document.createElement('span');
    keepTogether.style.whiteSpace="nowrap";

    label.appendChild(box);
    label.appendChild(description);
    keepTogether.appendChild(label);

    switch (spacer) {
        case "br":
            keepTogether.appendChild(document.createElement("br"));
            break;
        case "bar":
            keepTogether.appendChild(document.createTextNode(String.fromCharCode(160))); // if not <br>, then &nbsp;
            keepTogether.appendChild(document.createTextNode(String.fromCharCode(0x2223))); // Divides -sign
            break;
        case "none":
            break;
        default:
            break
    } 
    structure.appendChild(keepTogether);
    return(box);
}

function psgeoGetSubtypeGroupCheckboxList(lib,lang,cfg,group,structure) {
    // RETURNS { group: OBJECT, checkboxes: ARRAY  }
    // CHANGES APPENDS the object 'structure' (in document) to display a label+checkbox (psgeoGetGenericCheckbox does this)

    var types = lib[group.getSubActivitiesFunction](group.getSubActivitiesFunctionArgument);
    var result = [];
    var box;

    // Generate subactivity checkboxes from (possibly three sets of) subactivities.

    for (var k = 0; k < group.extraSubActivitiesBefore.length; k++) {
        var subact = group.extraSubActivitiesBefore[k];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,name,structure,true,"none");
        result.push(box);
        // row = Math.floor(k/2)
        // column = k%2
    }
    for (var i = 0; i < types.length; i++) {
        // row =
        // column =
        var subact = types[i];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,
                                      name,
                                      structure,
                                      true,
                                      // (i == types.length-1 &&
                                      // group.extraSubActivitiesAfter.length == 0));
                                      "none"); 
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
                                      "none");
        result.push(box);
    }

    //
    // Control buttons
    //

    // #1 Insert an 'invertSelection' button to 'structure'
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

 
    // #2 Insert a 'clearSelection' button to 'structure'
    var clearSelectionButton = psgeoGenericMenuButton(lang,
                           '',
                           lang.getText("clearSelection",psgeoSmallDisplayMode),
                           structure,
                           function() { psgeoClearAllCheckboxes(result) } ,
                           '',
                           'clearSelection',
                           cfg,
                           psgeoDomainDefault);
     clearSelectionButton.classList.add("checkboxControlButtons"); // css/style.css

    // An <br/> element must now be appended to 'structure' twice to make an empty line
    let br = document.createElement("br");
    structure.appendChild(br);
    structure.appendChild(br);

    var entry = { group: group, checkboxes: result };
    return(entry);
}

function psgeoGetOnlyHomelandCheckbox(lib,lang,structure,psgeoDomainDefault) {
    return(psgeoGetGenericCheckbox("only homeCountry",
                                   lang.getText(psgeoDomainDefault.homeCountry,psgeoSmallDisplayMode),
                                   structure,
                                   true,
                                   "none",
                                   psgeoDomainDefault));
}

function psgeoGetOtherCountriesCheckbox(lib,lang,structure,psgeoDomainDefault) {
    isChecked=true;
    if (psgeoDomainDefault.defaultFilter.onlyHomeCountry) isChecked=false;
    return(psgeoGetGenericCheckbox("other countries",
                                   lang.getText("otherCountries",psgeoSmallDisplayMode),
                                   structure,
                                   isChecked,
                                   "none",
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
            box.value = source.textId; // This MUST be untranslated (matches key value in db)
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

return {

     }

}