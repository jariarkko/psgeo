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

var psgeoSourcesLuolaseura = [
    {
        name: { en: "Luolaseura", fi: "Luolaseura" },
        longName: { en: "Finnish Caving Association", fi: "Suomen Luolaseura" },
        link: "https://www.luolaseura.fi",
        datafile: "https://luolaseura.fi/luolakanta/db/caves.luolaseura.json"
    }
];

//
// The default language is set below. If the URL ends with ...?lang=fi
// then another language may be set. Currently only "en" and "fi" are
// supported.
//

var psgeoLanguage = "en";

//
// This software normally runs from the planetskier, planetcaver, etc
// pages. All links point back to the these pages, and the labeling is
// done to represent those pages. If this page is run from the Finnish
// caving association page, set the following variable to true to
// disable the planetskier/caver look and feel, and to add links back
// to the association's page.
//

var psgeoLuolaseura = false;

//
// Whether we display cave maps or all caves
//

var psgeoCavemaps = false;

//
// Default filters for different pages
//

var psgeoDomainDefaults = [
    {
        domains: ["planetskier.net","www.planetskier.net"],
        paths: [],
        filter: "Skiing",
        name: "Planetskier",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["caving.fi","luolaseura.fi","luolaseura.planetcaver.net"],
        paths: [],
        filter: "Caving",
        name: "Luolakartat Suomessa",
        lang: "fi",
        finland: false,
        cavemaps: true,
        luolaseura: true
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: ["mapmap.html","kartta.html"],
        filter: "CavingFinland",
        name: "Planetcaver Cave Maps",
        lang: "en",
        finland: false,
        cavemaps: true,
        luolaseura: false
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: [],
        filter: "CavingFinland",
        name: "Planetcaver",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["theurbanexplorer.net","www.theurbanexplorer.net"],
        paths: [],
        filter: "Urbanex",
        name: "The Urban Explorer",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["planetclimber.net","www.planetclimber.net"],
        paths: [],
        filter: "Climbing",
        name: "Planetclimber",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["planetbiker.net","www.planetbiker.net"],
        paths: [],
        filter: "Biking",
        name: "Planetbiker",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["planetswimmer.com","www.planetswimmer.com"],
        paths: [],
        filter: "Swimming",
        name: "Planetswimmer",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["planetflier.com","www.planetflier.com"],
        paths: [],
        filter: "Flying",
        name: "Planetflyer",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
    },
    {
        domains: ["saunablogger.cool","www.saunablogger.cool"],
        paths: [],
        filter: "Sauna",
        name: "Saunablogger",
        lang: "en",
        finland: false,
        cavemaps: false,
        luolaseura: false
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

function psgeoMarkerClick(marker) {
    var item = marker.item;
    var rl = $.psgeoDB.getItemReadingList(item);
    var map = $.psgeoDB.getItemMap(item);
    var chosenUrl = undefined;
    if (psgeoCavemaps && map !== undefined) {
        psgeoDebug("psgeoMarkerClick cavemaps & map case");
        chosenUrl = map;
    } else {
        psgeoDebug("psgeoMarkerClick no maps or no map case");
        if (rl.length == 1 && window.location.href != undefined) {
            psgeoDebug("psgeoMarkerClick single article case");
            psgeoDebug("rl = " + JSON.stringify(rl));
            psgeoDebug("rl[0] = " + JSON.stringify(rl[0]));
            psgeoDebug("rl[0].u = " + JSON.stringify($.psgeoDB.getReadingListItemURL(rl[0])));
	    chosenUrl = $.psgeoDB.getReadingListItemURL(rl[0]);
        } else {
            var n = rl.length;
            var choice = Math.floor(Math.random() * n);
            psgeoDebug("psgeoMarkerClick random article case " + choice.toString() + "/" + n.toString());
	    chosenUrl = $.psgeoDB.getReadingListItemURL(rl[choice]);
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

function hasUrl(lis) {
    for (var i = 0; i < lis.length; i++) {
	if ($.psgeoDB.getReadingListItemURL(lis[i]) !== undefined) {
	    //psgeoDebug("url at index " + i.toString());
	    return(true);
	}
	//psgeoDebug("no url at index " + i.toString() + "/" + lis.length.toString());
    }
    //psgeoDebug("no url");
    return(false);
}

function psgeoArticlesText(rl) {
    if (!hasUrl(rl)) {
        return($.psgeoLang.noArticleYetText());
    } else if (rl.length == 1) {
        return($.psgeoDB.getReadingListItemTitle(rl[0]));
    } else {
        return(rl.length.toString() + " " + $.psgeoLang.articlesText());
    }
}

function psgeoInitMarker(item,filter) {
    var rl = $.psgeoDB.getItemReadingList(item);
    var visible = $.psgeoDB.matchFilter(item,filter);
    var latlon = new google.maps.LatLng($.psgeoDB.getItemLat(item),
                                        $.psgeoDB.getItemLon(item));
    var t;
    var altstring = "";
    
    if ($.psgeoDB.getItemFuzzy(item) != undefined && $.psgeoDB.getItemFuzzy(item) === true) {
        altstring = altstring + " -- " + $.psgeoLang.locationSecretText();
    }
    if ($.psgeoDB.getItemAlt(item) != undefined) {
        altstring = altstring + " " + $.psgeoDB.getItemAlt(item).toString() + "m";
    }

    if (psgeoCavemaps) {
        var lengthtext = "";
        psgeoExtraDebug("for item " + $.psgeoDB.getItemName(item) +
                        " the l field is set to " + (($.psgeoDB.getItemLength(item) === undefined) ?
                                                     "ud" :
                                                     $.psgeoDB.getItemLength(item).toString()));
        psgeoExtraDebug("the full item is:\n" + item.toString());
        if ($.psgeoDB.getItemLength(item) !== undefined) {
            lengthtext = $.psgeoDB.getItemLength(item).toString() + "m"
            if ($.psgeoDB.getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
        }
        var maptext = "";
        if ($.psgeoDB.getItemMap(item) !== undefined) {
            if (lengthtext.length > 0) maptext += ", ";
            maptext += $.psgeoLang.mapText();
        }
        t = $.psgeoDB.getItemName(item) + altstring;
        if (lengthtext.length > 0 || maptext.length > 0) {
            t += " (" + lengthtext + maptext + ")";
        }
        var articletext = psgeoArticlesText(rl);
        t += "\n" + articletext;
    } else {
        t = $.psgeoDB.getItemName(item);
        t += altstring;
        t += ":\n" + psgeoArticlesText(rl);
    }
    var dominantActivity = psgeoCavemaps ? "Caving" : $.psgeoDB.dominantActivity(item);
    var image = $.psgeoLib.getActivityMarkerImage(dominantActivity);
    var marker = new google.maps.Marker({
	position: latlon,
	map: visible ? psgeoMap : null,
	title: t,
	item: item,
        //psgeoCavemaps ? $.psgeoDB.getItemMap(item) : rl,
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

function numberalign(n,chs) {
    var ns = "" + n;
    while (ns.length < chs) {
	ns = " " + ns;
    }
    return(ns);
}

var psgeoFilterCheckboxes = [];

function psgeoCreateCityCheckbox(document,subsubdiv1b,city,name) {
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

function psgeoCreateCityOtherCheckbox(document,subsubdiv1b,otherCities,name) {
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

function psgeoCapitalize(string) {
    psgeoDebug("capitalize " + string);
    if (string.length > 0) {
        return(string[0].toUpperCase() + string.slice(1));
    } else {
        return(string);
    }
}

function psgeoCreateCaveSizeCheckbox(document,subsubdiv1b,size,name) {
    psgeoDebug("psgeoCreateCaveSizeCheckbox for size " + size + " (name = " + name + ")");
    var label= document.createElement("label");
    var description = document.createTextNode(psgeoCapitalize(name));
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

function psgeoCreateCaveMapCheckbox(document,subsubdiv1b,name) {
    psgeoDebug("psgeoCreateCaveMapCheckbox");
    var label= document.createElement("label");
    var description = document.createTextNode(psgeoCapitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "map";
    checkbox.checked = true;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateActivityCheckbox(document,subsubdiv1b,activitylist,name) {
    psgeoDebug("psgeoCreateActivityCheckbox for activities (" + typeof activitylist + ") = " + activitylist.toString());
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = activitylist;
    checkbox.checked = false;
    var acts = $.psgeoDB.getFilterActivities($.psgeoDB.getFilter());
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

function psgeoInitStats2Text(arrayitems) {
    var subdiv1 = arrayitems[0];
    var subdiv2 = dographs ? arrayitems[1] : null;
    
    var subsubdiv1b = document.createElement('div');
    var items = psgeoCavemaps ? $.psgeoDB.cities().sort() : $.psgeoLib.getActivityList();
    psgeoDebug("initial list of items is " + items.toString());
    if (psgeoCavemaps && psgeoSmallDisplayMode) items = [];
    var otheritems = [];
    var i;
    for (i = 0; i < items.length; i++) {
	var item = items[i];
        if (psgeoCavemaps) {
            psgeoDebug("does city " + item + " fit in with  "  +
                       items.length.toString() + " and " +
                       $.psgeoDB.cityPlaceCount(item).toString());
            if (items.length <= psgeoNumberOfCitiesFilterLimit ||
                $.psgeoDB.cityPlaceCount(item) >= psgeoCityPlacesFilterLimit) {
                psgeoCreateCityCheckbox(document,subsubdiv1b,item,item);
            } else {
                psgeoDebug("did not fit in, pushing to list of otheritems at length = " + otheritems.length.toString());
                otheritems.push(item);
            }
        } else {
	    if (item !== "Other" && !$.psgeoLib.isOtherActivity(item)) {
	        var shortActivity = $.psgeoLib.getActivityShortName(item);
	        var oneactivity = [];
	        oneactivity.push(item);
	        psgeoCreateActivityCheckbox(document,subsubdiv1b,oneactivity,shortActivity);
            }
	}
    }
    if (psgeoCavemaps) {
        if (otheritems.length > 0) {
            psgeoCreateCityOtherCheckbox(document,subsubdiv1b,otheritems,psgeoCapitalize($.psgeoLang.otherText()));
        }
        if (!psgeoSmallDisplayMode) subsubdiv1b.appendChild(document.createElement("br"));
        psgeoCreateCaveSizeCheckbox(document,
                                    subsubdiv1b,
                                    "big caves",
                                    $.psgeoLang.bigCavesText(psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(document,
                                    subsubdiv1b,
                                    "caves",
                                    $.psgeoLang.cavesText(psgeoCaveSizeSmall,psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(document,
                                    subsubdiv1b,
                                    "cavelets",
                                    $.psgeoLang.caveletsText(psgeoCaveSizeSmall))
        psgeoCreateCaveMapCheckbox(document,
                                   subsubdiv1b,
                                   $.psgeoLang.withCavemapText())
    } else {
        psgeoCreateActivityCheckbox(document,
                                    subsubdiv1b,
                                    $.psgeoLib.getOtherActivityList(),
                                    "Other");
    }
    subdiv1.appendChild(subsubdiv1b);

    if (dographs) {
        subdiv2.innerHTML = "Graphs";
        subdiv2.style.cursor = 'pointer';
    }
    
    subdiv1.addEventListener('click', function() {
	psgeoDebug("Filter pressed!");
	var newBasicFilters = [];
	var newSizeFilters = [];
	var newMapFilter = undefined;
	var i;
	psgeoDebug("We have " + psgeoFilterCheckboxes.length.toString() + " checkboxes");
	for (i = 0; i < psgeoFilterCheckboxes.length; i++) {
            var theCheckbox = psgeoFilterCheckboxes[i];
            var checkValue = theCheckbox.value;
	    if (psgeoFilterCheckboxes[i].checked) {
                var newFilter;
                if (psgeoCavemaps) {
                    switch (checkValue) {
                    case "big caves":
                        newFilter = $.psgeoDB.filterCaveSize("min",psgeoCaveSizeBig);
		        newSizeFilters.push(newFilter);
                        psgeoDebug("Adding a new filter with big caves");
                        break;
                    case "caves":
                        var newFilter1 = $.psgeoDB.filterCaveSize("min",psgeoCaveSizeSmall);
                        var newFilter2 = $.psgeoDB.filterCaveSize("max",psgeoCaveSizeBig);
                        newFilter = $.psgeoDB.filterAnd([newFilter1,newFilter2]);
		        newSizeFilters.push(newFilter);
                        psgeoDebug("Adding a new filter with regular caves");
                        break;
                    case "cavelets":
                        newFilter = $.psgeoDB.filterCaveSize("max",psgeoCaveSizeSmall);
		        newSizeFilters.push(newFilter);
                        psgeoDebug("Adding a new filter with small caves");
                        break;
                    case "map":
                        newMapFilter = $.psgeoDB.filterMatchMap(true);
                        psgeoDebug("Adding a new filter for maps");
                        break;
                    case "other cities":
                        newFilter = $.psgeoDB.filterMatchCities(theCheckbox.cityList);
		        newBasicFilters.push(newFilter);
                        psgeoDebug("Adding a new filter for other cities " + theCheckbox.cityList.toString());
                        break;
                    default:
                        newFilter = $.psgeoDB.filterMatchCity(checkValue);
		        newBasicFilters.push(newFilter);
		        psgeoDebug("Adding a new filter with city " + psgeoFilterCheckboxes[i].value.toString());
                        break;
                    }
                } else {
                    newFilter = $.psgeoDB.filterMatchActivities(psgeoFilterCheckboxes[i].value.split(","));
		    newBasicFilters.push(newFilter);
		    psgeoDebug("Adding a new filter with activities " + psgeoFilterCheckboxes[i].value.toString());
                }
	    } else {
		psgeoDebug("Filter on " + psgeoFilterCheckboxes[i].value.toString() + " not selected");
	    }
	}
        var basicFilter = psgeoSmallDisplayMode ? $.psgeoDB.filterTrue() : $.psgeoDB.filterOr(newBasicFilters);
        var sizeFilter = psgeoCavemaps ? $.psgeoDB.filterOr(newSizeFilters) : $.psgeoDB.filterTrue();
        var finalFilter =
            newMapFilter !== undefined ?
            $.psgeoDB.filterAnd([basicFilter,sizeFilter,newMapFilter]) :
            $.psgeoDB.filterAnd([basicFilter,sizeFilter]);
	$.psgeoDB.setFilter(finalFilter);
	psgeoDebug("Filter installed:\n" + $.psgeoDB.filterToString(finalFilter));
	for (i = 0; i < psgeoMarkerList.length; i++) {
	    var m = psgeoMarkerList[i];
	    var item = psgeoMarkerItemList[i];
	    var visible = $.psgeoDB.matchFilter(item,$.psgeoDB.getFilter());
	    if (visible === false && m.getMap() !== null) {
		//psgeoDebug("not showing item " + $.psgeoDB.getItemName(item));
		m.setMap(null);
	    } else if (visible === true && m.getMap() === null) {
		//psgeoDebug("showing item " + $.psgeoDB.getItemName(item));
		m.setMap(psgeoMap);
	    }
	}
	psgeoDebug("Filter taken into use");
	
	psgeoUpdateStats();
    });
    
    if (dographs) {
        subdiv2.addEventListener('click', function() {
            psgeoDebug("More statistics pressed!");
        });
    }
}

function psgeoUpdateCheckboxes() {
    if (psgeoCavemaps) {
        psgeoUpdateCheckboxesCitiesAndSizes();
    } else {
        psgeoUpdateCheckboxesActivities();
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

function psgeoUpdateCheckboxesCitiesAndSizes() {
    var filterCities = $.psgeoDB.getFilterCities($.psgeoDB.getFilter());
    var filterSizes = $.psgeoDB.getFilterCaveSizes($.psgeoDB.getFilter());
    var i;
    psgeoDebug("cities = " + filterCities.toString());
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
	    var shouldbechecked = true;
	    checkbox.checked = shouldbechecked;
            break;
        case "other cities":
            var cityList = checkbox.cityList;
	    var shouldbechecked = true;
            var i;
            for (i = 0; i < cityList.length; i++) {
                var cityString = cityList[i];
	        if (!filterCities.includes(cityString)) {
	            shouldbechecked = false;
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

function psgeoUpdateCheckboxesActivities() {
    var filterActivities = $.psgeoDB.getFilterActivities($.psgeoDB.getFilter());
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


function psgeoUpdateStatsText(arrayitems,ncontinents,ncountries,ncities,nstatesus,nstatesca,ncavemaps,nplaces) {
    var prefix = "<br>";
    var postfix = "";
    var headerLevel = "3";
    if (psgeoSmallDisplayMode) {
        prefix = "<font size=\"-1\">";
        postfix = "</font>";
        headerLevel = "5";
    }
    if (psgeoCavemaps && psgeoSmallDisplayMode) {
        arrayitems[0].innerHTML = "";
    } else {
        arrayitems[0].innerHTML = (numberalign(nplaces,3) + " " + $.psgeoLang.placesText());
    }
    arrayitems[1].innerHTML = (numberalign(ncities,3) + " " + $.psgeoLang.citiesText());
    arrayitems[2].innerHTML = (numberalign(ncountries,3) + " " + $.psgeoLang.countriesText());
    if (!psgeoCavemaps) {
        arrayitems[3].innerHTML = (numberalign(ncontinents,3) + " " + $.psgeoLang.continentsText());
        arrayitems[4].innerHTML = (numberalign(nstatesus,3) + " " + $.psgeoLang.statesText());
        arrayitems[5].innerHTML = (numberalign(nstatesca,3) + " " + $.psgeoLang.provincesText());
    }
    if (psgeoCavemaps) {
        arrayitems[6].innerHTML = (numberalign(ncavemaps,3) + " " + $.psgeoLang.cavemapsText());
        if (psgeoLuolaseura) {
            var headPart;
            if (psgeoSmallDisplayMode) {
                headPart = "";
            } else {
                headPart =
                    "<h" +
                    headerLevel +
                    "><a href=\"https://caving.fi\">Luolaseura</a></h" +
                    headerLevel +
                    ">";
            }
            arrayitems[7].innerHTML =
                prefix +
                headPart +
                "<p>" + psgeoCapitalize($.psgeoLang.sourcesText()) + ":<br/>" +
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

function psgeoUpdateStats() {
    var dlr = $;
    var db = dlr.psgeoDB;
    var ncontinents = db.nContinents();
    var ncountries = db.nCountries();
    var ncities = db.nCities();
    var nstatesus = db.nStates("USA");
    var nstatesca = db.nStates("Canada");
    var ncavemaps = db.nCavemaps();
    var nplaces = db.nPlaces();

    psgeoDebug("ncontinents = " + ncontinents);
    psgeoDebug("ncountries = " + ncountries);
    psgeoDebug("ncities = " + ncities);
    psgeoDebug("nstatesus = " + nstatesus);
    psgeoDebug("nstatesca = " + nstatesca);
    psgeoDebug("nplaces = " + nplaces);
    
    psgeoDebug("updating stats texts");
    psgeoUpdateStatsText(psgeoStatsTexts,ncontinents,ncountries,ncities,nstatesus,nstatesca,ncavemaps,nplaces);
    psgeoDebug("updated stats texts");
}

function psgeoInitStats() {
    var dlr = $;
    
    if (dlr === undefined) {
	psgeoDebug("$ not set");
    } else if (dlr.psgeoDB === undefined) {
	psgeoDebug("psgeoDB not set");
    } else {

	psgeoInitStats2Text(psgeoStats2Texts);
	psgeoUpdateStats();
	
    }
}

function psgeoInitList() {
    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];
    $.psgeoLib = PsgeoLib();
    $.psgeoDB = PsgeoDB($.psgeoLib,[],"");
    psgeoDebug("psgeoDB set");
    var filterToBeUsedLater = undefined;
    var filterForMarkers = undefined;
    if (psgeoCavemaps) {
        if (psgeoLuolaseura) {
            $.psgeoDB.setFilter($.psgeoLib.getDefaultFilterCaving($.psgeoDB));
        } else {
            $.psgeoDB.setFilter($.psgeoLib.getDefaultFilterCavingFinland($.psgeoDB));
        }
        filterForMarkers = $.psgeoDB.getFilter();
    } else {
        $.psgeoDB.setFilter($.psgeoDB.filterTrue());
        filterForMarkers = $.psgeoLib.getDefaultFilterSkiing($.psgeoDB);
    }
    psgeoDebug("psgeoDBfilter set");
    psgeoDebug("filterForMarkers = " + (filterForMarkers === undefined ? "ud" : ($.psgeoDB.filterToString(filterForMarkers))));
    var i;
    var count = 0;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var path = source.datafile;
        psgeoDebug("Loading from " + path + "...");
        psgeoDebug("before getJSON filterForMarkers = " +
                   (filterForMarkers === undefined ? "ud" : ($.psgeoDB.filterToString(filterForMarkers))));
        $.getJSON(path, function(data) {
	    psgeoDebug("got data..., length = " + data.length.toString());
            psgeoDebug("before addPlaces filterForMarkers = " +
                       (filterForMarkers === undefined ? "ud" : ($.psgeoDB.filterToString(filterForMarkers))));
	    $.psgeoDB.addPlacesWithFilter(data,$.psgeoDB.getFilter(),source.name[psgeoLanguage]);
            count++;
            if (count == psgeoSources.length) {
                psgeoDebug("added places");
                if (psgeoCavemaps) {
                    filterForMarkers =
                        $.psgeoDB.filterAnd([filterForMarkers,
                                             $.psgeoDB.filterMatchMap(true)]);
                }
                psgeoDebug("before apply filterForMarkers = " +
                           (filterForMarkers === undefined ? "ud" : ($.psgeoDB.filterToString(filterForMarkers))));
                $.psgeoDB.applyAllNoFilter(function(item) {
                    psgeoInitMarker(item,filterForMarkers);
                });
                psgeoDebug("initStats...");
                psgeoInitStats();
                psgeoDebug("CA states: " + $.psgeoDB.states("Canada").toString());
                psgeoDebug("udpateCheckboxes...");
                psgeoUpdateCheckboxes();
                psgeoDebug("Loaded");
            }
        });
    }
}

function psgeoGetSources() {
    var result = "";
    var i;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var prefix = "<a href=\"";
        var midfix = "\">";
        var postfix = "</a>";
        if (psgeoSmallDisplayMode) {
            name = source.name[psgeoLanguage];
        } else {
            name = source.longName[psgeoLanguage];
        }
        if (result !== "") {
            result = result + "<br/>";
        }
        result = result + prefix + source.link + midfix + name + postfix;
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
    
    for (i = 0; i < 8; i++) {
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
    
    if (window.innerWidth < psgeoSmallDisplayModeLimit) {
        psgeoSmallDisplayMode = true;
    }
}

function psgeoInitLanguage(hostname,urlParams) {

    psgeoLanguage = psgeoDomainDefault.lang;
    psgeoDebug("taking language from domain default: " + psgeoLanguage);
    
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
        case "fi": psgeoLanguage = "fi"; break;
        case "en": psgeoLanguage = "en"; break;
        default: break;
        }
    }
}

function psgeoInitCavemaps(pathname,urlParams) {

    psgeoCavemaps = psgeoDomainDefault.cavemaps;
    psgeoDebug("setting psgeoCavemaps to " +
               (psgeoCavemaps ? "true" : "false") +
               " based on domainDefault " + psgeoDomainDefault.name);
    
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
        case "true": psgeoCavemaps = true; break;
        case "false": psgeoCavemaps = false; break;
        default: break;
        }
    }
}

function psgeoInitLuolaseura(hostname,urlParams) {

    psgeoLuolaseura = psgeoDomainDefault.luolaseura;
    psgeoDebug("setting psgeoLuolaseura to " +
               (psgeoLuolaseura ? "true" : "false") +
               " based on domainDefault " + psgeoDomainDefault.name);
     
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
        case "true": psgeoLuolaseura = true; break;
        case "false": psgeoLuolaseura = false; break;
        default: break;
        }
    }
    
    if (psgeoLuolaseura) {
        psgeoSources = psgeoSourcesLuolaseura.concat(psgeoSourcesPlain);
    } else {
        psgeoSources = psgeoSourcesPlain;
    }
}

function psgeoInitDomainMatchPath(entry,pathname) {
    psgeoDebug("matching paths for entry " + entry.name + " (" + entry.paths.length.toString() + ") and pathname " +  pathname);
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

function psgeoInitMap() {
    psgeoInitParameters();
    $.psgeoLang = PsgeoLang(psgeoLanguage);
    psgeoMap = new google.maps.Map(document.getElementById('map'), {
        center: psgeoCavemaps ? {lat: 60.2, lng: 24.6} : {lat: 0, lng: 0},
        zoom: psgeoCavemaps ? 9.3 : 2,
        styles:  [
            {
		"featureType": "administrative.country",
		"stylers": [
                    { "visibility": "on" },
                    { "weight": 1.2 }
                ]
            }
        ]
    });
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    psgeoDebug("initStatsControl...");
    psgeoInitStatsControl(psgeoMap);
    psgeoDebug("initList...");
    psgeoInitList();
    psgeoDebug("all initialisations done.");
}
