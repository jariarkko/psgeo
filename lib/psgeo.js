//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

//
// Settable parameters ----------------------------------------------------------
//
// The following are parameters that can be adjusted for different
// languages, database location, etc.
//
// Also, if this code is run at https://example.net, one needs to
// authorise the using web page (example.net in this case) at
// https://console.developers.google.com/apis/credentials?project=iconic-rope-139916
//

//
// The database is set below. If the database is from a remote server,
// CORS may prevent you from accessing it. In that case the ttp
// header: Access-Control-Allow-Origin may help.
//

var psgeoSourcesPlain = [
    {
        name: { en: "Planetcaver", fi: "Planetcaver" },
        longName: { en: "Planetcaver Blog", fi: "Planetcaver Blogi" },
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetcaver.net/locations.json"
    }
];

var psgeoSourcesSwimming = [
    {
        name: { en: "Planetswimmer", fi: "Planetswimmer" },
        longName: { en: "Planetswimmer Blog", fi: "Planetswimmer Blogi" },
        link: "https://www.planetswimmer.com",
        datafile: "https://www.planetswimmer.com/locations.json"
    }
];

var psgeoSourcesCaving = [
    {
        name: { en: "Planetcaver", fi: "Planetcaver" },
        longName: { en: "Planetcaver Blog", fi: "Planetcaver Blogi" },
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetcaver.net/locations.caving.json"
    }
];

var psgeoSourcesLuolaseura = [
    {
        name: { en: "Luolaseura", fi: "Luolaseura" },
        longName: { en: "Finnish Caving Association", fi: "Suomen Luolaseura" },
        link: "https://www.luolaseura.fi",
        datafile: "https://luolaseura.fi/luolakanta/db/caves.luolaseura.json"
    }
];

var psgeoFinnishTerrainMapBaseurl =
    "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/";

var psgeoUsePopups = true;

const psgeoDefaultZoomForPlace = 14;
const psgeoDefaultZoomForPlaceLatitudeShift = 0.010;

//
// Default settings for different pages
//
// These include:
//
// Domains and paths: These trigger the specific settings in this
// entry. If the paths array is empty, any path will match.
//
// Filter: The default activity filter.
//
// Lang: The default language is set below. If the URL ends with
// ...?lang=fi then another language may be set. Currently only "en"
// and "fi" are supported.
//
// Cavemaps: Whether to present cavemaps or not.
//
// Finland: Whether to restrict dataset to only Finland.
//
// Cityselection: Whether to bring up a menu of cities for filtering.
//
// Finlandselection: Whether to bring up a menu of selecting Finland
// or other countries. This will only have effect if the "finland"
// parameter is false.
//
// Luolaseura: This software normally runs from the planetskier,
// planetcaver, etc pages. All links point back to the these pages,
// and the labeling is done to represent those pages. If this page is
// run from the Finnish caving association page, set the following
// variable to true to disable the planetskier/caver look and feel,
// and to add links back to the association's page.
//

var psgeoDomainDefaults = [
    {
        domains: ["planetskier.net","www.planetskier.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Skiing",
        name: "Planetskier",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false
    },
    {
        domains: ["caving.fi","luolaseura.fi","luolaseura.planetcaver.net"],
        paths: [],
        lat: 65.4,
        lng: 24.6,
        zoom: 5,
        filter: "Caving",
        name: "Luolakartat Suomessa",
        lang: "fi",
        finland: false,
        cavemaps: true,
        cavemapsFilterInitiallyOn: false,
        luolaseura: true,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: true,
        finnishTerrain: true,
        otherToolsMenu: true
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: ["mapmap.html","kartta.html"],
        lat: 65.4,
        lng: 24.6,
        zoom: 5,
        filter: "CavingFinland",
        name: "Planetcaver Cave Maps",
        lang: "en",
        finland: false,
        cavemaps: true,
        cavemapsFilterInitiallyOn: true,
        luolaseura: false,
        cityselection: true,
        finlandselection: true,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "CavingFinland",
        name: "Planetcaver",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true
    },
    {
        domains: ["theurbanexplorer.net","www.theurbanexplorer.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Urbanex",
        name: "The Urban Explorer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true
    },
    {
        domains: ["planetclimber.net","www.planetclimber.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Climbing",
        name: "Planetclimber",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false
    },
    {
        domains: ["planetbiker.net","www.planetbiker.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Biking",
        name: "Planetbiker",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false
    },
    {
        domains: ["planetswimmer.com","www.planetswimmer.com"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Swimming",
        name: "Planetswimmer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true
    },
    {
        domains: ["planetflier.com","www.planetflier.com"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Flying",
        name: "Planetflyer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false
    },
    {
        domains: ["saunablogger.cool","www.saunablogger.cool"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Sauna",
        name: "Saunablogger",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false
    }
];

var psgeoDomainDefault = undefined;

//
// Whether we run in small displays or not
//

var psgeoSmallDisplayMode = false;
var psgeoSmallDisplayModeLimit = 800;

//
// Cave size categories
//

var psgeoCaveSizeBig = 50;
var psgeoCaveSizeSmall = 5;

//
// How many places must a city have before it is explictly displayed in a filter,
// and when to start pruning the list of cities.
//

var psgeoCityPlacesFilterLimit = 4;
var psgeoNumberOfCitiesFilterLimit = 10;

//
// Internal variables -- do not change -----------------------------------------
//

var dographs = false;
var psgeoMap;
var psgeoList;
var psgeoMarkerList;
var psgeoMarkerItemList;
var psgeoMarkerImage;
var psgeoMarkerShape;

//
// Actual code -----------------------------------------------------------------------
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

function psgeoZoomChanged(level) {
    //psgeoExtraDebug("zoom now " + level.toString());
    psgeoRecheckVisibility($.psgeoDB,level);
}

function psgeoGetClickableUrl(db,item) {
    var u = db.getReadingListItemURL(item);
    if (u === undefined) {
        u = db.getReadingListItemPublicationURL(item);
    }
    return(u);
}

function psgeoMarkerPopup(map,marker,popup,db,lib,lang) {
    psgeoMarkerPopupItem(map,marker.item,popup,db,lib,lang);
}

function psgeoMarkerPopupItem(map,item,popup,db,lib,lang) {
    var html = db.describeItem(lang,item,true,psgeoSmallDisplayMode === true);
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    //psgeoDebug("content = " + html);
    popup.setContent(html);
    popup.setPosition(new google.maps.LatLng(db.getItemLat(item),db.getItemLon(item)));
    popup.open(map);
}

function psgeoMarkerClick(marker) {
    var db = $.psgeoDB;
    var lib = $.psgeoLib;
    var lang = $.psgeoLang;
    if (psgeoUsePopups) {
        psgeoMarkerPopup(psgeoMap,marker,$.psgeoPopup,db,lib,lang);
    } else {
        var item = marker.item;
        var rl = db.getItemReadingList(item);
        var map = db.getItemMap(item);
        var chosenUrl = undefined;
        if (psgeoDomainDefault.cavemaps && map !== undefined) {
            psgeoDebug("psgeoMarkerClick cavemaps & map case");
            chosenUrl = map;
        } else {
            psgeoDebug("psgeoMarkerClick no maps or no map case");
            if (rl.length == 1 &&
                window.location.href != undefined) {
                psgeoDebug("psgeoMarkerClick single article case");
                psgeoDebug("rl = " + JSON.stringify(rl));
                var u = psgeoGetClickableUrl(db,rl[0]);
                if (u !== undefined) {
	            chosenUrl = u;
                }
            } else {
                var n = rl.length;
                var choice = Math.floor(Math.random() * n);
                psgeoDebug("psgeoMarkerClick random article case " + choice.toString() + "/" + n.toString());
	        chosenUrl = psgeoGetClickableUrl(db,rl[choice]);
            }
        }
        if (chosenUrl !== undefined) {
            psgeoDebug("psgeoMarkerClick URL case " + chosenUrl);
            window.open(chosenUrl, '_blank');
            //window.location.href = chosenUrl;
        } else {
            psgeoDebug("psgeoMarkerClick no URL case");
        }
    }
}

function psgeoArticlesText(db,lang,item) {
    var rl = db.getItemReadingList(item);
    if (db.hasItemReadingListUrl(item)) {
        if (rl.length == 1) {
            return(lang.capitalize(lang.articleText()) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]));
        } else {
            return(lang.capitalize(lang.articleText()) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]) +
                   "\n" +
                   (rl.length-1).toString() +
                   " " +
                   lang.otherText() +
                   " " +
                   lang.articlesText());
        }
    } else if (db.hasItemReadingListPublication(item)) {
        for (var i = 0; i < rl.length; i++) {
            if (db.getReadingListItemPublication(rl[i]) !== undefined) {
                return(lang.capitalize(lang.publicationText()) +
                       ": " +
                       db.getReadingListItemPublication(rl[i]));
            }
        }
        return(lang.capitalize(lang.noArticleYetText()));
    } else {
        return(lang.capitalize(lang.noArticleYetText()));
    }
}

function psgeoInitMarker(db,lib,lang,item,filter) {
    var zoom = psgeoMap.getZoom();
    var visible = db.matchFilter(item,filter);
    var latlon = new google.maps.LatLng(db.getItemLat(item),
                                        db.getItemLon(item));
    var t;
    var altstring = "";
    
    if (visible && !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoom)) {
        visible = false;
    }
    if (db.getItemFuzzy(item)) {
        altstring = altstring + " -- " + lang.locationSecretText();
    }
    if (db.getItemAlt(item) != undefined) {
        altstring = altstring + " " + db.getItemAlt(item).toString() + "m";
    }

    if (psgeoDomainDefault.cavemaps) {
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
            t += lang.capitalize(lang.mapText());
            t += "\n";
        }
        var sidecaves =  db.getItemSideCaves(item);
        if (sidecaves.length > 0) {
            t += sidecaves.length.toString() + " " + lang.sideCavesText();
            t += "\n";
        }
        t += psgeoArticlesText(db,lang,item);
    } else {
        t = db.getItemName(item);
        t += altstring;
        t += ":\n";
        t += psgeoArticlesText(db,lang,item);
    }
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
				      psgeoDebug("Clicked marker");
				      psgeoMarkerClick(marker);
				  });
    psgeoMarkerList.push(marker);
    psgeoMarkerItemList.push(item);
}

var psgeoFilterCheckboxes = [];
var psgeoSourceFilterCheckboxes = [];
var psgeoAboutMenuButton = undefined;
var psgeoOtherToolsMenuButton = undefined;
var psgeoAboutWindow = undefined;
var psgeoOtherToolsWindow = undefined;

function psgeoCreateCityCheckbox(db,document,subsubdiv1b,city,name) {
    psgeoDebug("psgeoCreateCityCheckbox for city " + city);
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = city;
    checkbox.checked = true;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCityOtherCheckbox(db,document,subsubdiv1b,otherCities,name) {
    psgeoDebug("psgeoCreateCityOtherCheckbox for other cities " + otherCities.toString());
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "other cities";
    checkbox.cityList = otherCities;
    checkbox.checked = true;
    psgeoDebug("psgeoCreateCityOtherCheckbox value " +
               checkbox.value +
               " checked " +
               checkbox.checked.toString());
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCaveSizeCheckbox(db,lang,document,subsubdiv1b,size,name) {
    psgeoDebug("psgeoCreateCaveSizeCheckbox for size " + size + " (name = " + name + ")");
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = size;
    checkbox.checked = true;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCaveMapCheckbox(db,lang,document,subsubdiv1b,name) {
    psgeoDebug("psgeoCreateCaveMapCheckbox initially on = " +
               JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
               " for " +
               psgeoDomainDefault.name);
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "map";
    checkbox.checked = psgeoDomainDefault.cavemapsFilterInitiallyOn;
    psgeoDebug("map checkbox.checked = " + JSON.stringify(checkbox.checked));
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateOnlyFinlandCheckbox(db,lang,document,subsubdiv1b,name) {
    psgeoDebug("psgeoCreateOnlyFinlandCheckbox");
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "only finland";
    checkbox.checked = !psgeoDomainDefault.luolaseura;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateActivityCheckbox(db,document,subsubdiv1b,activitylist,name) {
    psgeoDebug("psgeoCreateActivityCheckbox for activities (" + typeof activitylist + ") = " + activitylist.toString());
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = activitylist;
    checkbox.checked = false;
    var filt = db.getFilter();
    psgeoDebug("filt in activity checkbox = " + db.filterToString(filt));
    var acts = db.getFilterActivities(filt);
    psgeoDebug("acts = " + acts.toString());
    for (var i = 0; i < acts.length; i++) {
        if (activitylist.indexOf(acts[i]) >= 0) {
            checkbox.checked = true;
        }
    }
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoInitStats2Text(db,lib,lang,map,arrayitems) {
    var subdiv1 = arrayitems[0];
    var subdiv2 = dographs ? arrayitems[1] : null;
    
    var subsubdiv1b = document.createElement('div');
    var fif = psgeoDomainDefault.finland ? db.filterMatchCountry("Finland") : db.filterTrue();
    var notfif = db.filterNot(fif);
    var items = psgeoDomainDefault.cavemaps ? db.citiesNoFilter(fif).sort() : lib.getActivityList();
    if (psgeoDomainDefault.cavemaps && (psgeoSmallDisplayMode || !psgeoDomainDefault.cityselection)) items = [];
    var otheritems = psgeoDomainDefault.cavemaps ? db.cities(notfif).sort() : [];
    psgeoDebug("psgeoInitStats2Text items " + items.length.toString() +
               " otheritems " + otheritems.length.toString());
    var i;
    for (i = 0; i < items.length; i++) {
	var item = items[i];
        if (psgeoDomainDefault.cavemaps) {
            if (items.length <= psgeoNumberOfCitiesFilterLimit ||
                db.cityPlaceCount(item) >= psgeoCityPlacesFilterLimit) {
                psgeoCreateCityCheckbox(db,document,subsubdiv1b,item,item);
            } else {
                otheritems.push(item);
            }
        } else {
	    if (item !== "Other" && !lib.isOtherActivity(item)) {
	        var shortActivity = lib.getActivityShortName(item);
	        var oneactivity = [];
	        oneactivity.push(item);
	        psgeoCreateActivityCheckbox(db,document,subsubdiv1b,oneactivity,shortActivity);
            }
	}
    }
    if (psgeoDomainDefault.cavemaps) {
        if (psgeoDomainDefault.cityselection) {
            if (otheritems.length > 0) {
                psgeoCreateCityOtherCheckbox(db,
                                             document,
                                             subsubdiv1b,
                                             otheritems,
                                             lang.capitalize(lang.otherText()));
            }
            if (!psgeoSmallDisplayMode) subsubdiv1b.appendChild(document.createElement("br"));
        }
        if (psgeoDomainDefault.finlandselection) {
            psgeoCreateOnlyFinlandCheckbox(db,
                                           lang,
                                           document,
                                           subsubdiv1b,
                                           lang.onlyFinlandText())
            if (!psgeoSmallDisplayMode) subsubdiv1b.appendChild(document.createElement("br"));
        }
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "big caves",
                                    lang.bigCavesText(psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "caves",
                                    lang.cavesText(psgeoCaveSizeSmall,psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "cavelets",
                                    lang.caveletsText(psgeoCaveSizeSmall))
        psgeoCreateCaveMapCheckbox(db,
                                   lang,
                                   document,
                                   subsubdiv1b,
                                   lang.withCavemapText())
    } else {
        psgeoCreateActivityCheckbox(db,
                                    document,
                                    subsubdiv1b,
                                    lib.getOtherActivityList(),
                                    "Other");
    }
    subdiv1.appendChild(subsubdiv1b);

    if (dographs) {
        subdiv2.innerHTML = "Graphs";
        subdiv2.style.cursor = 'pointer';
    }
    
    subdiv1.addEventListener('click', function() {
	psgeoDebug("Filter 1 pressed!");
        psgeoRerunFilters(db,lib,lang,map);
    });
    
    if (dographs) {
        subdiv2.addEventListener('click', function() {
            psgeoDebug("More statistics pressed!");
        });
    }
}

function psgeoRerunFilters(db,lib,lang,map) {
    var newBasicFilters = [];
    var newSizeFilters = [];
    var newOnlyFinlandFilter = undefined;
    var newMapFilter = undefined;
    var bigCaveFlag = false;
    var caveFlag = false;
    var caveletFlag = false;
    var i;
    psgeoDebug("We have " + psgeoFilterCheckboxes.length.toString() + " checkboxes");
    for (i = 0; i < psgeoFilterCheckboxes.length; i++) {
        var theCheckbox = psgeoFilterCheckboxes[i];
        var checkValue = theCheckbox.value;
	if (psgeoFilterCheckboxes[i].checked) {
            var newFilter;
            if (psgeoDomainDefault.cavemaps) {
                switch (checkValue) {
                case "big caves":
                    newFilter = db.filterCaveSize("min",psgeoCaveSizeBig);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with big caves");
                    bigCaveFlag = true;
                    break;
                case "caves":
                    var newFilter1 = db.filterCaveSize("min",psgeoCaveSizeSmall);
                    var newFilter2 = db.filterCaveSize("max",psgeoCaveSizeBig);
                    newFilter = db.filterAnd([newFilter1,newFilter2]);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with regular caves");
                    caveFlag = true;
                    break;
                case "cavelets":
                    newFilter = db.filterCaveSize("max",psgeoCaveSizeSmall);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with small caves");
                    caveletFlag = true;
                    break;
                case "only finland":
                    newOnlyFinlandFilter = db.filterMatchCountry("Finland");
                    psgeoDebug("Adding a new filter for only Finland");
                    break;
                case "map":
                    newMapFilter = db.filterMatchMap(true);
                    psgeoDebug("Adding a new filter for maps");
                    break;
                case "other cities":
                    newFilter = db.filterMatchCities(theCheckbox.cityList);
		    newBasicFilters.push(newFilter);
                    psgeoDebug("Adding a new filter for other cities " + theCheckbox.cityList.toString());
                    break;
                default:
                    newFilter = db.filterMatchCity(checkValue);
		    newBasicFilters.push(newFilter);
		    psgeoDebug("Adding a new filter with city " + psgeoFilterCheckboxes[i].value.toString());
                    break;
                }
            } else {
                newFilter = db.filterMatchActivities(psgeoFilterCheckboxes[i].value.split(","));
		newBasicFilters.push(newFilter);
		psgeoDebug("Adding a new filter with activities " + psgeoFilterCheckboxes[i].value.toString());
            }
	} else {
	    psgeoDebug("Filter on " + psgeoFilterCheckboxes[i].value.toString() + " not selected");
	}
    }
    var basicFilter = psgeoSmallDisplayMode ? db.filterTrue() : db.filterOr(newBasicFilters);
    if (psgeoDomainDefault.cavemaps && !psgeoDomainDefault.cityselection) basicFilter = db.filterTrue();
    var sizeFilter = db.filterTrue();
    if (psgeoDomainDefault.cavemaps &&
        (!bigCaveFlag || !caveFlag || !caveletFlag)) {
        sizeFilter = db.filterOr(newSizeFilters);
    }
    var finalFilter = db.filterAnd([basicFilter,sizeFilter]);
    if (newOnlyFinlandFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newOnlyFinlandFilter]);
    }
    if (newMapFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newMapFilter]);
    }
    if (psgeoSourceFilterCheckboxes.length > 0) {
        var sourceFilter = psgeoMakeSourceFilter(db,psgeoSourceFilterCheckboxes);
        finalFilter = db.filterAnd([finalFilter,sourceFilter]);
    }
    db.setFilter(finalFilter);
    psgeoDebug("Filter installed:\n" + db.filterToString(finalFilter));
    psgeoRecheckVisibility(db,psgeoMap.getZoom());
    psgeoUpdateStats(db,lib,lang,map);
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

function psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel) {
    if (!psgeoDomainDefault.zoomouthidesdetails) return(true);
    if (zoomLevel >= psgeoDomainDefault.zoomlevelfordetails) return(true);
    if (!db.isItemSideCave(item)) return(true);
    return(false);
}

function psgeoRecheckVisibility(db,zoomLevel) {
    psgeoDebug("psgeoRecheckVisibility at level " + zoomLevel.toString());
    var i;
    for (i = 0; i < psgeoMarkerList.length; i++) {
	var m = psgeoMarkerList[i];
	var item = psgeoMarkerItemList[i];
	var visible = db.matchFilter(item,db.getFilter());
        if (visible &&
            !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel)) {
            visible = false;
        }
	if (visible === false && m.getMap() !== null) {
	    m.setMap(null);
	} else if (visible === true && m.getMap() === null) {
	    m.setMap(psgeoMap);
	}
    }
    psgeoDebug("Filter taken into use");
}

function psgeoUpdateCheckboxes(db) {
    if (psgeoDomainDefault.cavemaps) {
        psgeoUpdateCheckboxesCitiesAndSizes(db);
    } else {
        psgeoUpdateCheckboxesActivities(db);
    }
}

function psgeoFilterSizeIsRange(size,min,max) {
    if (size.min === undefined ||
        min === undefined)
        throw ("Filter cave size range min should not be undefined");
    return(size.min <= min &&
           (size.max === undefined ||
            max === undefined ||
            size.max >= max));
}

function psgeoFilterSizesHasRange(sizes,min,max) {
    var i;
    for (i = 0; i < sizes.length; i++) {
        var size = sizes[i];
        if (psgeoFilterSizeIsRange(size,min,max)) return(true);
    }
    return(false);
}

function psgeoUpdateCheckboxesCitiesAndSizes(db) {
    var filterCities = db.getFilterCities(db.getFilter());
    var filterSizes = db.getFilterCaveSizes(db.getFilter());
    var i;
    psgeoExtraDebug("cities = " + filterCities.toString());
    for (i = 0; i < psgeoFilterCheckboxes.length && i < filterCities.length; i++) {
        var checkbox = psgeoFilterCheckboxes[i];
	var checkString = checkbox.value;
        switch (checkString) {
        case "big caves":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,psgeoCaveSizeBig,undefined);
            break;
        case "caves":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,psgeoCaveSizeSmall,psgeoCaveSizeBig);
            break;
        case "cavelets":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,0,psgeoCaveSizeSmall);
            break;
        case "map":
	    var shouldbechecked = psgeoDomainDefault.cavemapsFilterInitiallyOn;
	    checkbox.checked = shouldbechecked;
            break;
        case "only finland":
            var filterCountries = db.getFilterCountries(db.getFilter());
            checkbox.checked = (filterCountries.length == 1 && filterCountries[0] === "Finland");
            break;
        case "other cities":
            var cityList = checkbox.cityList;
            psgeoDebug("other cities city list = " + JSON.stringify(cityList));
            psgeoDebug("other cities filter city list = " + JSON.stringify(filterCities));
	    var shouldbechecked = false;
            var i;
            for (i = 0; i < cityList.length; i++) {
                var cityString = cityList[i];
	        if (filterCities.includes(cityString)) {
	            shouldbechecked = true;
	        }
            }
	    checkbox.checked = shouldbechecked;
            break;
        default:
            var cityString = checkString;
	    var shouldbechecked = false;
	    if (filterCities.includes(cityString)) {
	        shouldbechecked = true;
	    }
	    checkbox.checked = shouldbechecked;
            break;
        }
    }
}

function psgeoUpdateCheckboxesActivities(db) {
    var filterActivities = db.getFilterActivities(db.getFilter());
    var i;
    psgeoDebug("filterActivities = " + filterActivities.toString());
    for (i = 0; i < psgeoFilterCheckboxes.length; i++) {
	var activitiesString = psgeoFilterCheckboxes[i].value;
	var activities = activitiesString.split(",");
	var shouldbechecked = false;
	var j;
	for (j = 0; j < activities.length; j++) {
	    var oneact = activities[j];
	    //psgeoDebug("  looking at " + oneact + " at " + j.toString());
	    if (filterActivities.includes(oneact)) {
		shouldbechecked = true;
	    }
	}
	psgeoFilterCheckboxes[i].checked = shouldbechecked;
    }
}


function psgeoUpdateStatsText(db,
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
                              nplaces) {
    var prefix = "<br>";
    var postfix = "";
    var headerLevel = "3";
    if (psgeoSmallDisplayMode) {
        prefix = "<font size=\"-1\">";
        postfix = "</font>";
        headerLevel = "5";
    }
    if (psgeoDomainDefault.cavemaps && psgeoSmallDisplayMode) {
        arrayitems[0].innerHTML = "";
    } else {
        arrayitems[0].innerHTML = (lang.numberAlign(nplaces,3) + " " + lang.placesText());
    }
    arrayitems[1].innerHTML = (lang.numberAlign(ncities,3) + " " + lang.citiesText());
    if (!psgeoSmallDisplayMode) arrayitems[2].innerHTML = (lang.numberAlign(ncountries,3) + " " + lang.countriesText());
    if (!psgeoDomainDefault.cavemaps) {
        arrayitems[3].innerHTML = (lang.numberAlign(ncontinents,3) + " " + lang.continentsText());
        arrayitems[4].innerHTML = (lang.numberAlign(nstatesus,3) + " " + lang.statesText());
        arrayitems[5].innerHTML = (lang.numberAlign(nstatesca,3) + " " + lang.provincesText());
    }
    if (psgeoDomainDefault.cavemaps) {
        arrayitems[6].innerHTML = (lang.numberAlign(ncavemaps,3) + " " + lang.caveMapsText());
        if (psgeoDomainDefault.sourcesCheckboxes) {
            if (psgeoSourceFilterCheckboxes.length == 0) {
                if (psgeoDomainDefault.luolaseura) {
                    arrayitems[7].appendChild(document.createElement("br"));
                    arrayitems[7].appendChild(document.createTextNode(lang.capitalize(lang.sourcesText()) + ":"));
                    arrayitems[7].appendChild(document.createElement("br"));
                    psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(arrayitems[7]);
                } else {
                    arrayitems[7].appendChild(document.createElement("br"));
                    psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(arrayitems[7]);
                }
                arrayitems[7].addEventListener('click', function() {
	            psgeoDebug("Filter 2 pressed!");
                    psgeoRerunFilters(db,lib,lang,map);
                });
            }
        } else {
            if (psgeoDomainDefault.luolaseura) {
                arrayitems[7].innerHTML =
                    prefix +
                    (psgeoSmallDisplayMode ? "<p>" : ("<p>" + lang.capitalize(lang.sourcesText()) + ":<br/>")) +
                    psgeoGetSources() +
                    "</p>" +
                    postfix;
                psgeoDebug("trailer/ls = " + arrayitems[7].innerHTML);
            } else {
                arrayitems[7].innerHTML =
                    prefix +
                    "<h" +
                    headerLevel +
                    ">" + psgeoGetSources() + "</h" +
                    headerLevel +
                    ">" +
                    postfix;
                psgeoDebug("trailer/fi = " + arrayitems[7].innerHTML);
            }
        }
    }
    if (psgeoAboutMenuButton === undefined) {
        psgeoAboutMenuButton = psgeoGetAboutMenuButton(lang,arrayitems[8]);
        psgeoAboutMenuButton.addEventListener('click', function() {
	    psgeoDebug("About button pressed!");
            psgeoAboutMenuBringUp(db,lib,lang,map);
        });
    }
    if (psgeoDomainDefault.otherToolsMenu) {
	psgeoDebug("other tools set up 1");
        if (psgeoOtherToolsMenuButton === undefined) {
	    psgeoDebug("other tools set up 2");
            psgeoOtherToolsMenuButton = psgeoGetOtherToolsMenuButton(lang,arrayitems[8]);
	    psgeoDebug("other tools set up 3");
            psgeoOtherToolsMenuButton.addEventListener('click', function() {
	        psgeoDebug("Other tools button pressed!");
                psgeoOtherToolsMenuBringUp(db,lib,lang,map);
            });
        }
    }
}

function psgeoUpdateStats(db,lib,lang,map) {
    var ncontinents = db.nContinents();
    var ncountries = db.nCountries();
    var ncities = db.nCities();
    var nstatesus = db.nStates("USA");
    var nstatesca = db.nStates("Canada");
    var ncavemaps = db.nCavemaps();
    var nplaces = db.nPlaces();

    psgeoUpdateStatsText(db,
                         lib,
                         lang,
                         map,
                         psgeoStatsTexts,
                         ncontinents,
                         ncountries,
                         ncities,
                         nstatesus,
                         nstatesca,
                         ncavemaps,
                         nplaces);
}

function psgeoInitStats(db,lib,lang,map) {
    psgeoInitStats2Text(db,lib,lang,map,psgeoStats2Texts);
    psgeoUpdateStats(db,lib,lang,map);
}

function psgeoInitList(lang,map) {
    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];
    var lib = PsgeoLib();
    $.psgeoLib = lib;
    var db = PsgeoDB(lib,[],"");
    $.psgeoDB = db;
    psgeoDebug("psgeoDB set");
    var filterToBeUsedLater = undefined;
    var filterForMarkers = undefined;
    if (psgeoDomainDefault.cavemaps) {
        db.setFilter(lib.getDefaultFilterCaving(db));
        filterForMarkers = db.getFilter();
    } else {
        db.setFilter(db.filterTrue());
        filterForMarkers = lib.getDefaultFilterSkiing(db);
    }
    psgeoDebug("psgeoDBfilter set");
    psgeoDebug("filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    psgeoInitListOne(db,lib,lang,map,filterForMarkers,0);
}

function psgeoInitListOne(db,lib,lang,map,filterForMarkers,count) {
    if (count == psgeoSources.length) {
        psgeoDebug("added places");
        psgeoFinishLoading(db,lib,lang,map,filterForMarkers);
    } else {
        var source = psgeoSources[count];
        var path = source.datafile;
        psgeoDebug("Loading " + source.name.en +
                   " from " + path +
                   "...");
        psgeoDebug("before getJSON filterForMarkers = " +
                   (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
        $.getJSON(path, function(data) {
	    psgeoDebug("got data for " + source.name.en);
            psgeoDebug("before addPlaces filterForMarkers = " +
                       (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
            psgeoDebug("adding places from " + source.name.en +
                       " when hard filter = " + db.filterToString(db.getFilter()));
	    db.addPlacesWithFilter(data,db.getFilter(),source.name.en);
            psgeoInitListOne(db,lib,lang,map,filterForMarkers,count+1);
        });
    }
}

function psgeoFinishLoading(db,lib,lang,map,filterForMarkers) {
    psgeoDebug("psgeoFinishLoading " +
               JSON.stringify(psgeoDomainDefault.cavemaps) +
               " " +
               JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
               " " +
               JSON.stringify(psgeoDomainDefault.finlandselection) +
               " " +
               db.filterToString(filterForMarkers));
    psgeoDebug("before extra filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    if (psgeoDomainDefault.cavemaps) {
        psgeoDebug("cavemaps init " +
                   JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
                   " " +
                   JSON.stringify(psgeoDomainDefault.finlandselection));
        if (psgeoDomainDefault.cavemapsFilterInitiallyOn) {
            filterForMarkers =
                db.filterAnd([filterForMarkers,
                              db.filterMatchMap(true)]);
        }
        if (psgeoDomainDefault.finlandselection) {
            filterForMarkers =
                db.filterAnd([filterForMarkers,
                              db.filterMatchCountry("Finland")]);
        }
    } else {
        psgeoDebug("!cavemaps init");
    }
    db.setFilter(filterForMarkers);
    psgeoDebug("before apply filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    db.applyAllNoFilter(function(item) {
        psgeoInitMarker(db,lib,lang,item,filterForMarkers);
    });
    psgeoDebug("initStats...");
    psgeoInitStats(db,lib,lang,map);
    psgeoDebug("updateCheckboxes...");
    psgeoUpdateCheckboxes(db);
    psgeoDebug("Loaded");
    psgeoInitPlace(db,lib,lang,map,new URLSearchParams(window.location.search));
}

function psgeoGetSources() {
    var result = "";
    var i;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var prefix = "<a href=\"";
        var midfix = "\">";
        var postfix = "</a>";
        var name;
        if (psgeoSmallDisplayMode) {
            name = source.name[psgeoDomainDefault.lang];
        } else {
            name = source.longName[psgeoDomainDefault.lang];
        }
        if (result !== "") {
            result = result + "<br/>";
        }
        result = result + prefix + source.link + midfix + name + postfix;
    }
    return(result);
}

var psgeoOtherTools = [
    {
        icon: "https://i1.wp.com/retkipaikka.fi/vapaa/wp-content/uploads/2015/04/retkipaikka_vaaka.png",
        url: "https://matkailukartta.fi/kartta/",
        nameFunction: "retkipaikkaToolNameText",
        descriptionTextFunction: "retkipaikkaToolDescriptionText"
    },
    {
        icon: "https://www.arkko.com/temp/ruuthxyz.jpg",
        url: "https://ruuth.xyz/map.html",
        nameFunction: "ruuthToolNameText",
        descriptionTextFunction: "ruuthToolDescriptionText"
    },
    {
        icon: "https://hakku.gtk.fi/assets/logo-fb1c3c8322b6c67e1f56067b245e809b.png",
        url: "https://hakku.gtk.fi/fi/locations/search",
        nameFunction: "hakkuToolNameText",
        descriptionTextFunction: "hakkuToolDescriptionText"
    },
    {
        icon: "https://www.maanmittauslaitos.fi/themes/custom/mml/images/suomi_logo_rgb.svg",
        url: "https://asiointi.maanmittauslaitos.fi/karttapaikka/?share=customMarker&n=6677289.7776391655&e=373729.7167378501&desc=&zoom=10&layers=%5B%7B%22id%22%3A186%2C%22opacity%22%3A50%7D%5D",
        nameFunction: "laserToolNameText",
        descriptionTextFunction: "laserToolDescriptionText"
    }
];

function psgeoOtherToolsMenuBringUp(db,lib,lang,map) {
    psgeoDebug("psgeoOtherToolsMenuBringUp point a");
    if (psgeoOtherToolsWindow === undefined) {
        psgeoDebug("psgeoOtherToolsMenuBringUp point b");
        psgeoOtherToolsWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        var titleelement = document.createElement("h1");
        var titletext = document.createTextNode(lang.capitalize(lang.moreMapsText()));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        var explanation = lang.capitalize(lang.toolsExplanationText() + ".");
        explanation += " ";
        explanation += lang.capitalize(lang.openInNewWindowText() + ".");
        psgeoDebug("psgeoOtherToolsMenuBringUp point c, explanation = " + explanation);
        div.appendChild(document.createTextNode(explanation));
        div.appendChild(document.createElement("br"));
        div.appendChild(document.createElement("br"));
        var table = document.createElement("div");
        var rows = [];
        for (var i = 0; i < psgeoOtherTools.length; i++) {
            var tool = psgeoOtherTools[i];
            var columns = [
                lib.htmlLink(lib.htmlImage(tool.icon,'width="80"'),
                             tool.url,
                             true),
                lib.htmlFontSize(lib.htmlLink(lang[tool.nameFunction](),
                                              tool.url,
                                              true) +
                                 ": " +
                                 lang[tool.descriptionTextFunction](),
                                 "-1")
            ];
            rows.push(columns);
            psgeoDebug("psgeoOtherToolsMenuBringUp point d");
        }
        table.innerHTML = lib.htmlTable(rows,'cellspacing="30"');
        div.appendChild(table);
        psgeoOtherToolsWindow.setContent(div);
    }
    if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    psgeoDebug("psgeoOtherToolsMenuBringUp point e ");
    psgeoOtherToolsWindow.setPosition(map.getCenter());
    psgeoOtherToolsWindow.open(map);
    psgeoDebug("psgeoOtherToolsMenuBringUp point f");
}


function psgeoAboutMenuBringUp(db,lib,lang,map) {
    psgeoDebug("psgeoAboutMenuBringUp point a");
    if (psgeoAboutWindow === undefined) {
        psgeoDebug("psgeoAboutMenuBringUp point b");
        psgeoAboutWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        var titleelement = document.createElement("h1");
        var titletext = document.createTextNode(lang.capitalize(lang.aboutText()));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        var texts = [
            (psgeoDomainDefault.luolaseura ?
             lang.dataExplanationCavingAssociationText() :
             lang.dataExplanationText()),
            lang.libraryExplanationText(),
            lang.developersExplanationText(),
            lib.htmlBold(lang.warningsAndDisclaimersText().toUpperCase()),
            lang.dataDistinctExplanationText(),
            lang.dangerousExplanationText()
        ];
        for (var i = 0; i < texts.length; i++) {
            subdiv.innerHTML += lib.htmlParagraph(texts[i]);
        }
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoAboutWindow.setContent(div);
    }
    if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    psgeoAboutWindow.setPosition(map.getCenter());
    psgeoAboutWindow.open(map); 
    psgeoDebug("psgeoAboutMenuBringUp point f");
}

function psgeoGetOtherToolsMenuButton(lang,structure) {
    psgeoDebug("other tools set up a");
    var br = document.createElement("br");
    var label = document.createElement("button");
    var text = lang.capitalize(lang.moreMapsText());
    psgeoDebug("other tools set up b, text = " + text);
    label.innerHTML = text;
    label.style.background = "none";
    label.style.padding = 0;
    label.style.borderWith = 0;
    label.style.border = "none";
    label.style.textDecoration = "underline";
    label.style.fontFamily = "arial,sans-serif";
    label.style.fontSize = "90%";
    structure.appendChild(br);
    structure.appendChild(label);
    psgeoDebug("other tools set up c");
    return(label);
}
    
function psgeoGetAboutMenuButton(lang,structure) {
    psgeoDebug("about set up a");
    var br = document.createElement("br");
    var label = document.createElement("button");
    var text = lang.capitalize(lang.aboutText());
    label.innerHTML = text;
    label.style.background = "none";
    label.style.padding = 0;
    label.style.borderWith = 0;
    label.style.border = "none";
    label.style.textDecoration = "underline";
    label.style.fontFamily = "arial,sans-serif";
    label.style.fontSize = "90%";
    structure.appendChild(br);
    structure.appendChild(label);
    psgeoDebug("about set up c");
    return(label);
}
    
function psgeoGetSourcesCheckboxes(structure) {
    var result = [];
    var i;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var name;
        if (psgeoSmallDisplayMode) {
            name = source.name[psgeoDomainDefault.lang];
        } else {
            name = source.longName[psgeoDomainDefault.lang];
        }
        var label = document.createElement("label");
        var description = document.createTextNode(name);
        var link = document.createElement("a");
        link.appendChild(description);
        link.title = name;
        link.target= '_blank';
        link.href = source.link;
        var box = document.createElement("input");
        var br = document.createElement("br");
        box.type = "checkbox";
        box.value = source.name.en;
        box.checked = true;
        label.appendChild(box);
        label.appendChild(link);
        label.appendChild(br);
        structure.appendChild(label);
        result.push(box);
    }
    return(result);
}

var psgeoStats2Texts;
var psgeoStatsTexts;

function PsgeoStats2Win(div1, map) {
    psgeoStats2Texts = [];
    var subdiv1 = document.createElement('div');
    div1.appendChild(subdiv1);
    psgeoStats2Texts.push(subdiv1);
}

function PsgeoStatsWin(div, map) {

    psgeoStatsTexts = [];
    var i;
    
    for (i = 0; i < 9; i++) {
	var subdiv = document.createElement('div');
	div.appendChild(subdiv);
	subdiv.innerHTML = "";
	psgeoStatsTexts.push(subdiv);
    }
    
}

function psgeoInitStatsControl(map) {

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var statsDiv = document.getElementById('Info');
    if (statsDiv === undefined || statsDiv === null)
        statsDiv = document.getElementById('Planetcaver');
    var statsWin = new PsgeoStatsWin(statsDiv, map);
    var stats2Div = document.getElementById('Filter');
    var stats2Win = new PsgeoStats2Win(stats2Div, map);
    
    stats2Div.index = 2;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(stats2Div);
    statsDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(statsDiv);
}

function psgeoInitDisplaySize() {

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
    
    psgeoDebug("window inner width " +  window.innerWidth.toString() + " and limit " + psgeoSmallDisplayModeLimit.toString());
    if (window.innerWidth < psgeoSmallDisplayModeLimit) {
        psgeoSmallDisplayMode = true;
    }
}

function psgeoInitLanguage(hostname,urlParams) {

    psgeoDebug("taking language from domain default: " + psgeoDomainDefault.lang);
    
    //
    // The default may be overridden by the 'lang' search parameter. Use, e.g.,
    //
    //    ?lang=fi
    //
    // at the end of your URL to make this happen.
    //
    
    const lang = urlParams.get('lang');
    if (lang !== null) {
        switch (lang) {
        case "fi": psgeoDomainDefault.lang = "fi"; break;
        case "en": psgeoDomainDefault.lang = "en"; break;
        default: break;
        }
    }
}

function psgeoInitPlace(db,lib,lang,map,urlParams) {

    //
    // The default location be overridden by the 'p' search parameter. Use, e.g.,
    //
    //    ?p=Hyypi%c3%a4nm%c3%a4en%20lippaluola,%20Nurmij%c3%a4rvi
    //
    // at the end of your URL to make this happen.
    //
    
    var place = urlParams.get('c');
    var popup = urlParams.get('p');
    if (popup === null) popup = urlParams.get('pu'); // support the previous style (to be removed soon)
    if (popup !== null) place = popup;
    if (place !== null) {
        place = decodeURI(place);
        var items = db.getNamedItemsPartialMatch(place);
        psgeoDebug("p = " + place + " (" + items.length.toString() + " places match)");
        if (items.length > 0) {
            var item = psgeoPickBest(db,items);
            var coords = {lat: item.lat + psgeoDefaultZoomForPlaceLatitudeShift, lng: item.lon};
            psgeoDebug("using coordinates for place " + item.n + ": " + JSON.stringify(coords));
            map.setCenter(coords);
            map.setZoom(psgeoDefaultZoomForPlace);
            if (popup !== null &&
                psgeoUsePopups) {
                psgeoMarkerPopupItem(map,item,$.psgeoPopup,db,lib,lang);
            }
        }
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

function psgeoInitCavemaps(pathname,urlParams) {

    psgeoDebug("psgeoDomainDefault.cavemaps is " +
               (psgeoDomainDefault.cavemaps ? "true" : "false"));
    
    //
    // The default may be overridden by the 'cavemaps' search parameter. Use, e.g.,
    //
    //    ?cavemaps=true
    //
    // at the end of your URL to make this happen.
    //
    
    const cavemapssetting = urlParams.get('cavemaps');
    if (cavemapssetting !== null) {
        switch  (cavemapssetting) {
        case "true": psgeoDomainDefault.cavemaps = true; break;
        case "false": psgeoDomainDefault.cavemaps = false; break;
        default: break;
        }
    }
}

function psgeoInitLuolaseura(hostname,urlParams) {

    psgeoDebug("psgeoDomainDefault.luolaseura is " +
               (psgeoDomainDefault.luolaseura ? "true" : "false"));
     
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
        case "true": psgeoDomainDefault.luolaseura = true; break;
        case "false": psgeoDomainDefault.luolaseura = false; break;
        default: break;
        }
    }
    
    if (psgeoDomainDefault.luolaseura) {
        psgeoSources = psgeoSourcesLuolaseura.concat(psgeoSourcesCaving);
    } else if (psgeoDomainDefault.name == "Planetswimmer") {
        psgeoSources = psgeoSourcesSwimming;
    } else {
        psgeoSources = psgeoSourcesPlain;
    }
}

function psgeoInitDomainMatchPath(entry,pathname) {
    psgeoDebug("matching paths for entry " + entry.name +
               " (" + entry.paths.length.toString() +
               ") and pathname " +  pathname);
    if (entry.paths.length == 0) {
        return(true);
    } else {
        var k;
        for (k = 0; k < entry.paths.length; k++) {
            var path = entry.paths[k];
            psgeoDebug("matching " + path + " against " + pathname);
            if (pathname.includes(path)) {
                psgeoDebug("match!");
                return(true);
            }
        }
        psgeoDebug("no match");
        return(false);
    }
}

function psgeoInitDomainMatch(entry,hostname,pathname) {
    var j;
    for (j = 0; j < entry.domains.length; j++) {
        var domain = entry.domains[j];
        if (hostname.includes(domain) &&
            psgeoInitDomainMatchPath(entry,pathname)) {
            return(true);
        }
    }
    return(false);
}

function psgeoInitDomain(hostname,pathname) {
    var i;
    for (i = 0; i < psgeoDomainDefaults.length; i++) {
        var candidateDomainDefault = psgeoDomainDefaults[i];
        if (psgeoInitDomainMatch(candidateDomainDefault,hostname,pathname)) {
            psgeoDomainDefault = candidateDomainDefault;
            psgeoDebug("Choosing the domain default " + psgeoDomainDefault.name);
            return;
        }
    }
    psgeoDomainDefault = psgeoDomainDefaults[0];
    psgeoDebug("Choosing the domain default " + psgeoDomainDefault.name + " because nothing matched");
}

function psgeoInitParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    psgeoInitDomain(hostname,pathname);
    psgeoInitDisplaySize();
    psgeoInitLanguage(hostname,urlParams);
    psgeoInitCavemaps(pathname,urlParams);
    psgeoInitLuolaseura(hostname,urlParams);
}

function psgeoInitMapFinnishTerrain(lang) {
    return(new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return(psgeoFinnishTerrainMapBaseurl +
                   zoom +
                   "/" + 
                   coord.y +
                   "/" +
                   coord.x +
                   ".png");
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: lang.finnishTerrainText(psgeoSmallDisplayMode)
    }));
}

function psgeoInitPopup(map) {
    $.psgeoPopup = new google.maps.InfoWindow({
        content: ""
    });
    psgeoMap.addListener('click', function() {
        psgeoMapClick(psgeoMap);
    });
}

function psgeoMapClick(map) {
    psgeoDebug("map clicked!");
    if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
}

function psgeoInitMap() {
    psgeoInitParameters();
    var lang = PsgeoLang(psgeoDomainDefault.lang);
    $.psgeoLang = lang;
    psgeoMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: psgeoDomainDefault.lat, lng: psgeoDomainDefault.lng},
        zoom: psgeoDomainDefault.zoom,
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
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
            ]
        },
        streetViewControl: false
    });

    if (psgeoDomainDefault.finnishTerrain) {
        $.psgeoMapFinnish = psgeoInitMapFinnishTerrain(lang);
        psgeoMap.mapTypes.set(lang.finnishTerrainText(psgeoSmallDisplayMode), $.psgeoMapFinnish);
        psgeoMap.mapTypeControlOptions.mapTypeIds[2] = lang.finnishTerrainText(psgeoSmallDisplayMode);
    }
    
    psgeoMap.addListener('zoom_changed', function() {
        psgeoZoomChanged(psgeoMap.getZoom());
    });
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    psgeoDebug("initStatsControl...");
    psgeoInitStatsControl(psgeoMap);
    psgeoInitPopup(psgeoMap);
    psgeoDebug("initList...");
    psgeoInitList(lang,psgeoMap);
    psgeoDebug("all initialisations done.");
}
