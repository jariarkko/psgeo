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

// NOTE: this code now includes comments marked with words NOTE

const psgeoSourcesPlain = [
    {
        textId: "Planetcaver",
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetcaver.net/locations.json"
    }
];

const psgeoSourcesSwimming = [
    {
        textId: "Planetswimmer",
        link: "https://www.planetswimmer.com",
        datafile: "https://www.planetswimmer.com/locations.json"
    }
];

const psgeoSourcesCaving = [
    {
        textId: "Planetcaver",
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetcaver.net/locations.caving.json"
    }
];

const psgeoSourcesCavingTest = [
    {
        textId: "Planetcaver",
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetswimmer.com/locations.caving.json"
    }
];

const psgeoSourcesLuolaseura = [
    {
        textId: "Luolaseura",
        link: "https://www.luolaseura.fi",
        datafile: "https://luolaseura.fi/luolakanta/db/caves.luolaseura.json"
    }
];

const psgeoFinnishTerrainMapBaseurl =
    "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/";

const psgeoFinnishCaveClassification = {
    en: "https://luolaseura.fi/luolakanta/luokittelu-en.html",
    fi: "https://luolaseura.fi/luolakanta/luokittelu-fi.html"
};

const psgeoAddCaveLink =
    "https://luolaseura.fi/luolaretkelle/kerro-meille/";

const psgeoModifyCaveLink =
    "https://luolaseura.fi/luolaretkelle/kerro-meille/luolan-tietojen-paivitys/";

const psgeoDefaultZoomForPlace = 14;
const psgeoDefaultZoomForPlaceLatitudeShift = 0.010;

//
// Displayable statistics settings. These are tunable statistics that can be shown.
//

const psgeoStatLinesGeneral = {

    //            function for small displays               function for large displays

    place:    { true:   psgeoStatLineNumberOfPlaces,    false: psgeoStatLineNumberOfPlaces    },
    city:     { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCities    },
    country:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCountries },
    continent:{ true:   psgeoStatLineNumberOfContinents,false: psgeoStatLineNumberOfContinents},
    state:    { true:   psgeoStatLineNumberOfStates,    false: psgeoStatLineNumberOfStates    },
    province: { true:   psgeoStatLineNumberOfProvinces, false: psgeoStatLineNumberOfProvinces },
    cavemap:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             }
};

const psgeoStatLinesCaving = {
    
    //             function for small displays             function for large displays
    place:    { true:   psgeoStatLineNumberOfCaves,     false: psgeoStatLineNumberOfCaves     },
    city:     { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCities    },
    country:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCountries },
    continent:{ true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfContinents},
    state:    { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             },
    province: { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             },
    cavemap:  { true:   psgeoStatLineNumberOfCaveMaps,  false: psgeoStatLineNumberOfCaveMaps  }
};

//
// Search settings for subtype groups (e.g., rock type, sauna type,
// waterbody type, etc)
//
// Each record in this array describes a set of subactivities (e.g.,
// Waterbody-Lake, Waterbody-Sea, etc) of an activity (e.g.,
// Swimming). This array is what links the schema (as defined in the
// psgeolib.js functions) to what can be represented in the user
// interface (by psgeo.js) to texts associated with specific choices
// (as defined in psgeolang.js).
//
// NOTE that the table is represented as an indirection. I.e., it
// doesn't really list subtypes and other things as such, but refers
// to them via function pointers to psgeolib.js. Note also that all
// function pointers here are represented as strings, which enables us
// to have this table as a constant structure before psgeolib,
// psgeolang, and other objects have been created.
//
// The fields in the table are as follows:
//
//   selector: refers to a field name in psgeoDomainDefault that
//   should be either true or false. True indicates that in this
//   particular website, this group should be active and should be
//   displayed in the filter window.
//
//   displaySizeSelector: This is a two-element array, with a one
//   element in index "true" representing small displays (e.g.,
//   mobile) and another element "false" representing larger displays
//   (e.g., desktop). This allows a filter to be only set up in large
//   displays, for instance, if space is at premium. A value of {
//   true: true, false: true } indicates that the filter is always
//   used.
//
//   descriptionTextId: This should be the name (as a string) of
//   a function in psgeolang that returns the name of this category,
//   e.g., "waterbody" (in a given language) for the group of
//   waterbody sub-activities.
//
//   getSubActivitiesFunction and getSubActivitiesFunctionArgument:
//   These are a function name (again, as a string) in psgeolib, that
//   returns the set of subactivities in this group.
//
//   extraSubActivitiesBefore, exteaSubActivitiesAfter: Often there's
//   the usual sub-activities, followed by some special cases. The
//   special cases can be listed here, as an array of strings. They
//   come in two lists, one to insert before any other sub-activities,
//   and another to insert after.
//
//   subActivityCollection: This string refers to a data structure in psgeolang.js,
//   that maps sub-activities to natural language text in a given language.
//

const psgeoSubtypeGroups = [

    {
        selector: "waterbodySearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "waterbody",
        activity: "Swimming",
        getSubActivitiesFunction: "getSwimmingWaterbodySubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: ["Waterbody-Unknown"],
        subActivityCollection: "swimmingPlace"
    },

    // Sauna types in activity Sauna, e.g., Normal, Smoke, etc.
    {
        selector: "saunaTypeSearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "saunaType",
        activity: "Sauna",
        getSubActivitiesFunction: "getSaunaTypeSubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: ["Unknown"],
        subActivityCollection: "saunaType"
    },

    // The material that you ski on in activity Skiing, e.g., Snow, Grass, Sand, etc.
    {
        selector: "skiingSubstanceSearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "skiMaterial",
        activity: "Skiing",
        getSubActivitiesFunction: "getSkiingSubstanceSubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: ["Substance-Unknown"],
        subActivityCollection: "skiMaterial"
    },

    // The skiing place, e.g., Indoor, Outdoor, etc.
    {
        selector: "skiingPlaceSearch",
        displaySizeSelector: { true: false, false: true },
        descriptionTextId: "place",
        activity: "Skiing",
        getSubActivitiesFunction: "getSkiingPlaceSubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: [],
        subActivityCollection: "skiPlace"
    },
    
    // The uphill method for skiing, e.g., Lifts, Hiking, etc.
    {
        selector: "skiingUphillSearch",
        displaySizeSelector: { true: false, false: true },
        descriptionTextId: "up",
        activity: "Skiing",
        getSubActivitiesFunction: "getSkiingUphillSubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: ["Uphill-Unknown"],
        subActivityCollection: "skiUphill"
    },

    // The climbing type for climbing, e.g., Mountain, Wall, etc.
    {
        selector: "climbingTypeSearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "climbingTypeText",
        activity: "Climbing",
        getSubActivitiesFunction: "getClimbingTypeSubActivities",
        getSubActivitiesFunctionArgument: false,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: [],
        subActivityCollection: "climbingType"
    },

    // Rock and other material types in activity Caving, e.g., Rock-Sandstone, Ice, etc.
    {
        selector: "rockTypeSearch",
        displaySizeSelector: { true: false, false: true },
        descriptionTextId: "rockType",
        activity: "Caving",
        getSubActivitiesFunction: "getCavingRockTypeSubActivities",
        getSubActivitiesFunctionArgument: true,
        extraSubActivitiesBefore: ["Material-Other","Glacier","Ice"],
        extraSubActivitiesAfter: [],
        subActivityCollection: "rockTypeAndOtherMaterial"
    },
    
    // Cave morphology in activity Caving, e.g., Morphology-Crack, Morphology-Karst, etc.
    {
        selector: "morphologySearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "morphology",
        activity: "Caving",
        getSubActivitiesFunction: "getCavingMorphologySubActivities",
        getSubActivitiesFunctionArgument: true,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: [],
        subActivityCollection: "morphology"
    },
    
    // Urban exploration target tpes in activity Urban-Exploration, e.g., Bunkers, Ruins, etc.
    {
        selector: "urbanexTargetSearch",
        displaySizeSelector: { true: true, false: true },
        descriptionTextId: "urbanexTarget",
        activity: "Urban-Exploration",
        getSubActivitiesFunction: "getUrbanexTargetSubActivities",
        getSubActivitiesFunctionArgument: true,
        extraSubActivitiesBefore: [],
        extraSubActivitiesAfter: [],
        subActivityCollection: "urbanexTarget"
    }
];

//
// Icon settings
//

// Once the software is more mature and icons have been decided,
// they can get renamed with generic names and then configurable icon sets become a possibility.
// At present, we use icons from two sets.

const iconSet = "./icons/neu_interface/";
const iconSetAdditional = "./icons/coreui_free/";

const psgeoIconFilter = iconSet + "neu_interface_find_magnifying_glass_icon_149474.svg";      // Filtermenu
const psgeoIconMore = iconSet + "neu_interface_info_icon_149458.svg";                         // MoreMenu
const psgeoIconAbout = iconSet + "neu_interface_info_icon_149458.svg";                        // About
const psgeoIconCaveAdd = iconSet + "neu_interface_add_circle_insert_plus_icon_149548.svg";    // Action link = AddCave
const psgeoIconCaveModify = iconSet + "neu_interface_pen_edit_modify_icon_149414.svg";        // Action link = ModifyCave
const psgeoIconCaveClassification = iconSet + "neu_interface_faq_question_icon_149479.svg";   // Help/Reference = Classification of caves

const psgeoIconOtherTools = iconSetAdditional + "map_icon_144228.svg";                        // External resources = Other maps

const psgeoDefaultIcons = {
    imgDefaultSize: 30,
    imgFilter: psgeoIconFilter,
    imgMore: psgeoIconMore,
    imgAbout: psgeoIconAbout,
    imgCaveClassification: psgeoIconCaveClassification,
    imgOtherTools: psgeoIconOtherTools,
    imgCaveAdd: psgeoIconCaveAdd,
    imgCaveModify: psgeoIconCaveModify
};

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
// Lang: The default language is set below.
//     If the URL ends in ?lang=XX then another language XX may be set.
//     Supported languages: Finnish (fi), Swedish (se), English (en)
//
// Cavemaps: Whether to present cavemaps or not.
//
// Finland: Whether to restrict dataset to only Finland.
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: true,
        skiingUphillSearch: true,
        skiingPlaceSearch: true,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesCaving,
        luolaseura: true,
        finlandselection: true,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: true,
        finnishTerrain: true,
        otherToolsMenu: true,
        nameSearch: true,
        rockTypeSearch: true,
        morphologySearch: true,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesCaving,
        luolaseura: false,
        finlandselection: true,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true,
        nameSearch: true,
        rockTypeSearch: true,
        morphologySearch: true,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true,
        nameSearch: true,
        rockTypeSearch: true,
        morphologySearch: true,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: true,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: true,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: true,
        otherToolsMenu: true,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: true,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: false,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
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
        statLines: psgeoStatLinesGeneral,
        luolaseura: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false,
        otherToolsMenu: false,
        nameSearch: true,
        rockTypeSearch: false,
        morphologySearch: false,
        waterbodySearch: false,
        saunaTypeSearch: true,
        skiingSubstanceSearch: false,
        skiingUphillSearch: false,
        skiingPlaceSearch: false,
        climbingTypeSearch: false,
        urbanexTargetSearch: false,
        hideButtontextFilter: true,
        hideButtontextMore: true,
        icons: psgeoDefaultIcons
    }
];

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
// Internal variables -- do not change -----------------------------------------
//

var psgeoDomainDefault = undefined;
var psgeoMap;
var psgeoList;
var psgeoMarkerList;
var psgeoMarkerItemList;
var psgeoMarkerImage;
var psgeoMarkerShape;
var psgeoFilterPaneTexts = [];
var psgeoStatsPaneTexts = [];
var psgeoCaveSizeFilterCheckboxes = [];
var psgeoCaveMapFilterCheckbox = undefined;
var psgeoActivityFilterCheckboxes = [];
var psgeoNameFilterInput = undefined;
var psgeoOnlyFinlandFilterCheckbox = undefined;
var psgeoSubtypeGroupCheckboxLists = [];
var psgeoSourceFilterCheckboxes = [];
var psgeoFilterMenuButton = undefined;
var psgeoMoreMenuButton = undefined;
var psgeoCaveAddMenuButton = undefined;
var psgeoCaveModifyMenuButton = undefined;
var psgeoCaveClassificationMenuButton = undefined;
var psgeoAboutMenuButton = undefined;
var psgeoOtherToolsMenuButton = undefined;
var psgeoAboutWindow = undefined;
var psgeoOtherToolsWindow = undefined;
var psgeoFilterWindow = undefined;
var psgeoMoreWindow = undefined;

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
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    popup.setContent(html);
    popup.setPosition(new google.maps.LatLng(db.getItemLat(item),db.getItemLon(item)));
    popup.open(map);
    popup.setZIndex(1000);
}

function psgeoMarkerClick(marker) {
    var db = $.psgeoDB;
    var lib = $.psgeoLib;
    var lang = $.psgeoLang;
    psgeoMarkerPopup(psgeoMap,marker,$.psgeoPopup,db,lib,lang);
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
        altstring = altstring + " -- " + lang.getText("locationSecret");
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

function psgeoCreateCaveSizeCheckbox(db,lang,document,subsubdiv1b,size,name,br) {
    var box = psgeoGetGenericCheckbox(size,lang.capitalize(name),subsubdiv1b,true,br);
    psgeoCaveSizeFilterCheckboxes.push(box);
}

function psgeoCreateCaveMapCheckbox(db,lang,document,subsubdiv1b,name,br) {
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

function psgeoInitFilterPaneText(db,lib,lang,map,div,smallPane) {
    var subsubdiv1b = document.createElement('div');
    var items = psgeoDomainDefault.cavemaps ? [] : lib.getActivityList();
    var otheritems = [];
    if (psgeoSmallDisplayMode && items.length > 0) {
        psgeoFilterSectionPrefix(lang,lang.getText("activity"),subsubdiv1b);
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
    if (psgeoDomainDefault.cavemaps) {
        if (psgeoSmallDisplayMode) psgeoFilterSectionPrefix(lang,lang.getText("size"),subsubdiv1b);
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "big caves",
                                    lang.getTextWithValues("bigCaves",
                                                           psgeoSmallDisplayMode,
                                                           [psgeoCaveSizeBig]),
                                    !psgeoSmallDisplayMode)
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "caves",
                                    lang.getTextWithValues("mediumCaves",
                                                           psgeoSmallDisplayMode,
                                                           [psgeoCaveSizeSmall,psgeoCaveSizeBig]),
                                    !psgeoSmallDisplayMode)
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "cavelets",
                                    lang.getTextWithValues("cavelets",
                                                           psgeoSmallDisplayMode,
                                                           [psgeoCaveSizeSmall]),
                                    true)
        if (psgeoSmallDisplayMode) psgeoFilterSectionPrefix(lang,lang.getText("map"),subsubdiv1b);
        psgeoCreateCaveMapCheckbox(db,
                                   lang,
                                   document,
                                   subsubdiv1b,
                                   lang.getText("withCavemap"),
                                   true)
    } else {
        psgeoCreateActivityCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    lib.getOtherActivityList(),
                                    "Other",
                                    true);
    }
    div.appendChild(subsubdiv1b);

    div.addEventListener('click', function() {
        psgeoDebug("Filter 1 pressed!");
        psgeoRerunFilters(db,lib,lang,map);
    });
    
}

function psgeoAllBoxesChecked(list) {
    for (var i = 0; i < list.length; i++) {
        if (!list[i].checked) return(false);
    }
    return(true);
}

function psgeoCreateSubactivityFilterFromCheckboxes(db,activity,list) {
    var subactivities = [];
    for (var i = 0; i < list.length; i++) {
        if (list[i].checked) {
            subactivities.push(list[i].value);
        }
    }
    return(db.filterMatchSubActivities(activity,subactivities));
}

function psgeoCreateNameFilter(db,lib,lang,map) {
    if (psgeoNameFilterInput === undefined) {
        return(undefined);
    } else if (psgeoNameFilterInput.value.length == 0) {
        return(undefined);
    } else {
        return(db.filterMatchName(psgeoNameFilterInput.value,false));
    }
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
    if (checkboxes.length == 0) {
        return(undefined);
    } else if (psgeoAllBoxesChecked(checkboxes)) {
        return(undefined);
    } else {
        return(psgeoCreateSubactivityFilterFromCheckboxes(db,group.activity,checkboxes));
    }
}

function psgeoCreateOnlyFinlandFilter(db,lib,lang,map) {
    if (psgeoOnlyFinlandFilterCheckbox === undefined) {
        return(undefined);
    } else if (!psgeoOnlyFinlandFilterCheckbox.checked) {
        return(undefined);
    } else {
        return(db.filterMatchCountry("Finland"));
    }
}

function psgeoRerunFilters(db,lib,lang,map) {
    var newBasicFilters = [];
    var newSizeFilters = [];
    var newOnlyFinlandFilter = psgeoCreateOnlyFinlandFilter(db,lib,lang,map);
    var newMapFilter = undefined;
    var newNameFilter = psgeoCreateNameFilter(db,lib,lang,map);
    var newSubtypeGroupFilters = psgeoCreateSubtypeGroupFilters(db,lib,lang,map);
    var bigCaveFlag = false;
    var caveFlag = false;
    var caveletFlag = false;
    var i;
    psgeoDebug("We have " + psgeoActivityFilterCheckboxes.length.toString() + " activity checkboxes " +
               "and " + psgeoCaveSizeFilterCheckboxes.length.toString() + " cave size checkboxes");
    if (psgeoCaveMapFilterCheckbox !== undefined &&
        psgeoCaveMapFilterCheckbox.checked) {
        newMapFilter = db.filterMatchMap(true);
        psgeoDebug("Adding a new filter for maps");
    }
    for (i = 0; i < psgeoActivityFilterCheckboxes.length; i++) {
        var theCheckbox = psgeoActivityFilterCheckboxes[i];
        var checkValue = theCheckbox.value;
        var checked = theCheckbox.checked;
        psgeoDebug("filter " + checkValue + " is " + (checked?"checked":"unchecked"));
        if (checked) {
            var newFilter = db.filterMatchActivities(checkValue.split(","));
            newBasicFilters.push(newFilter);
            psgeoDebug("Adding a new filter with activities " + checkValue.toString());
        }
    }
    for (i = 0; i < psgeoCaveSizeFilterCheckboxes.length; i++) {
        var theCheckbox = psgeoCaveSizeFilterCheckboxes[i];
        var checkValue = theCheckbox.value;
        var checked = theCheckbox.checked;
        psgeoDebug("filter " + checkValue + " is " + (checked?"checked":"unchecked"));
        if (checked) {
            var newFilter;
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
            default:
                psgeoDebug("ERROR: Invalid filter received");
                break;
            }
        }
    }
    var basicFilter = db.filterOr(newBasicFilters);
    if (psgeoDomainDefault.cavemaps) basicFilter = db.filterTrue();
    psgeoDebug("basic filter = " + db.filterToString(basicFilter));
    var sizeFilter = db.filterTrue();
    if (psgeoDomainDefault.cavemaps &&
        (!bigCaveFlag || !caveFlag || !caveletFlag)) {
        sizeFilter = db.filterOr(newSizeFilters);
    }
    psgeoDebug("size filter = " + db.filterToString(sizeFilter));
    var finalFilter = db.filterAnd([basicFilter,sizeFilter]);
    psgeoDebug("final filter = " + db.filterToString(finalFilter));
    if (newOnlyFinlandFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newOnlyFinlandFilter]);
        psgeoDebug("after finland filter = " + db.filterToString(finalFilter));
    }
    if (newMapFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newMapFilter]);
        psgeoDebug("after map filter = " + db.filterToString(finalFilter));
    }
    if (newNameFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newNameFilter]);
        psgeoDebug("after name filter = " + db.filterToString(finalFilter));
    }
    // all other filters (rock types, sauna types, snow types, etc) are defined
    // via what we call subtype groups
    for (i = 0; i < newSubtypeGroupFilters.length; i++) {
        var one = newSubtypeGroupFilters[i];
        finalFilter = db.filterAnd([finalFilter,one]);
        psgeoDebug("after one subtype group filter = " + db.filterToString(finalFilter));
    }
    if (psgeoSourceFilterCheckboxes.length > 0) {
        var sourceFilter = psgeoMakeSourceFilter(db,psgeoSourceFilterCheckboxes);
        finalFilter = db.filterAnd([finalFilter,sourceFilter]);
        psgeoDebug("after source filter = " + db.filterToString(finalFilter));
    }
    db.setFilter(finalFilter);
    psgeoDebug("Filter installed:\n" + db.filterToString(finalFilter));
    psgeoRecheckVisibility(db,psgeoMap.getZoom());
    psgeoUpdateStatsPane(db,lib,lang,map);
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
}

function psgeoMoreFilterWindowNeeded() {
    return(psgeoDomainDefault.nameSearch ||
           psgeoDomainDefault.rockTypeSearch ||
           psgeoDomainDefault.morphologySearch ||
           psgeoDomainDefault.waterbodySearch ||
           psgeoDomainDefault.saunaTypeSearch ||
           psgeoDomainDefault.finlandselection);
}

function psgeoStatLineEmpty(lang,n) {
    return("");
}

// This function could be written in various ways, the one just below
// is a good one. But there should not be two ways of doing
// this. And the psgeoStatLineNumberOf variant isn't integrated to
// the tables that drive everything. It can be, but requires a change
// of the tables. Or maybe it is better to call the original functions,
// but have the original functions use psgeoStatLineNumberOf internally.
// Please remove the code that isn't used, once you have
// completed the work that the new function is used.
function psgeoStatLineNumberOf(lang,n,textId) { // EXPERIMENTAL IDEA
    // lang     is string (language)   // NOTE TABLE DRIVENNESS THOUGH!
    // n        is number
    // type     is a string, textId
    // RETURN   string

    return(n.toString() + " " + lang.getText(textId));
    // could even be getTextWithValues if we had "{{string1}} caves" and so on
}

// THESE FUNCTIONS ARE INCLUDED IN THE ABOVE ONE
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
// END OF THINGS TO COMBINE

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
                                  nplaces) {
    var prefix = "<br>";
    var postfix = "";
    var headerLevel = "3";

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

    var statLines = psgeoDomainDefault.statLines;
    arrayitems[0].innerHTML = (statLines.place[psgeoSmallDisplayMode])(lang,nplaces);
    arrayitems[1].innerHTML = (statLines.city[psgeoSmallDisplayMode])(lang,ncities);
    arrayitems[2].innerHTML = (statLines.country[psgeoSmallDisplayMode])(lang,ncountries);
    arrayitems[3].innerHTML = (statLines.continent[psgeoSmallDisplayMode])(lang,ncontinents);
    arrayitems[4].innerHTML = (statLines.state[psgeoSmallDisplayMode])(lang,nstatesus);
    arrayitems[5].innerHTML = (statLines.province[psgeoSmallDisplayMode])(lang,nstatesca);
    arrayitems[6].innerHTML = (statLines.cavemap[psgeoSmallDisplayMode])(lang,ncavemaps);
    
    // If a Filter Menu is needed, then make a button for it
    // NOTE that both Filter menu button and More menu button are in the stats window on small screens!
    if (psgeoFilterMenuButton === undefined &&
        psgeoMoreFilterWindowNeeded()) {
        var filterButtonLocation = 
            psgeoSmallDisplayMode ?
            arrayitems[8] :
            psgeoFilterPaneTexts[0];
        psgeoFilterMenuButton =
            psgeoGetFilterMenuButton(lang,
                                     filterButtonLocation,
                                     function() {
                                         psgeoDebug("Filter button pressed!");
                                         psgeoFilterMenuBringUp(db,lib,lang,map,true);
                                     });
    }

    // If a More Menu is needed, then make a button for it
    if (psgeoMoreMenuButton === undefined) {
        psgeoMoreMenuButton =
            psgeoGetMoreMenuButton(lang,
                                   arrayitems[8],
                                   function() {
                                       psgeoDebug("More button pressed!");
                                       psgeoMoreMenuBringUp(db,lib,lang,map,true);
                                   });
    }
}

function psgeoUpdateStatsPane(db,lib,lang,map) {
    var ncontinents = db.nContinents();
    var ncountries = db.nCountries();
    var ncities = db.nCities();
    var nstatesus = db.nStates("USA");
    var nstatesca = db.nStates("Canada");
    var ncavemaps = db.nCavemaps();
    var nplaces = db.nPlaces();

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
                             nplaces);
}

function psgeoInitStatsPane(db,lib,lang,map) {
    if (!psgeoSmallDisplayMode) {
        psgeoInitFilterPaneText(db,lib,lang,map,psgeoFilterPaneTexts[0],true);
    }
    psgeoUpdateStatsPane(db,lib,lang,map);
}

function psgeoInitList(lang,map) {
    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];
    var lib = PsgeoLib();
    $.psgeoLib = lib;
    var db = PsgeoDB(lib,[],"");
    $.psgeoDB = db;
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
        psgeoDebug("Loading " + lang.getText(source.textId) +   // Should be English, but not critical
                   " from " + path +
                   "...");
        psgeoDebug("before getJSON filterForMarkers = " +
                   (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
        $.getJSON(path, function(data) {
            psgeoDebug("got data for " + lang.getText(source.textId)); // Should be English, but not critical
            psgeoDebug("before addPlaces filterForMarkers = " +
                       (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
            psgeoDebug("adding places from " + lang.getText(source.textId) +    // Again, English...
                       " when hard filter = " + db.filterToString(db.getFilter()));
            db.addPlacesWithFilter(data,db.getFilter(),lang.getText(source.textId)); // Ideally, English getText
            psgeoInitListOne(db,lib,lang,map,filterForMarkers,count+1);
        });
    }
}

function psgeoFinishLoading(db,lib,lang,map,filterForMarkers) {
    psgeoDebug("psgeoFinishLoading");
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
        psgeoInitMarker(db,lib,lang,item,filterForMarkers);
    });
    psgeoDebug("initStatsPane...");
    psgeoInitStatsPane(db,lib,lang,map);
    psgeoDebug("Loaded");
    psgeoInitPlace(db,lib,lang,map,new URLSearchParams(window.location.search));
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

function psgeoOtherToolsMenuBringUp(db,lib,lang,map) {
    if (psgeoOtherToolsWindow === undefined) {

        //
        // Configurable parameters

        const widthSmall = 'width="60"'
        const widthLarge = 'width="80"';
        const spacingSmall = 'cellspacing="7"';
        const spacingLarge = 'cellspacing="20"';
        
        //
        // Window creation
        //
        
        psgeoOtherToolsWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
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
        psgeoOtherToolsWindow.setContent(div);
    }
    if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    psgeoOtherToolsWindow.setPosition(map.getCenter());
    psgeoOtherToolsWindow.open(map);
}

function psgeoFilterSectionPrefix(lang,text,subdiv) {
    if ( !psgeoSmallDisplayMode) subdiv.appendChild(document.createElement("br"));
    var textNode = document.createTextNode(lang.capitalize(text) + ":");
    //textNode.style.textDecoration = "bold";
    //var textNode = document.createElement("b");
    //textNode.innerHTML = lang.capitalize(subdiv) + ":"
    subdiv.appendChild(textNode);
    subdiv.appendChild(document.createElement("br"));
}

function psgeoFilterMenuContents(db,lib,lang,map,subdiv) {
    psgeoDebug("filter menu contents " +
               JSON.stringify(psgeoSmallDisplayMode) +
               " " +
               JSON.stringify(psgeoDomainDefault.nameSearch) +
               " " +
               JSON.stringify(psgeoDomainDefault.waterbodySearch) +
               " " +
               JSON.stringify(psgeoDomainDefault.rockTypeSearch));

    if (psgeoDomainDefault.nameSearch) {
        psgeoFilterSectionPrefix(lang,lang.getText("name"),subdiv); // Name search box has header "Name"
        psgeoNameFilterInput = psgeoGetNameInput(lib,lang,subdiv);
        psgeoNameFilterInput.addEventListener('input', function() {
            psgeoDebug("Name filter entered!");
            psgeoRerunFilters(db,lib,lang,map);
        });
    }
    if (psgeoSmallDisplayMode) {
        psgeoInitFilterPaneText(db,lib,lang,map,subdiv,false);
    }

    // Any searches for subtypes (sauna types, waterbody, eventually also rock types, etc)
    for (var i = 0; i < psgeoSubtypeGroups.length; i++) {
        const group = psgeoSubtypeGroups[i];
        psgeoDebug("considering subtype group " + group.selector + " " + JSON.stringify(group.displaySizeSelector[psgeoSmallDisplayMode]));
        if (psgeoDomainDefault[group.selector] &&
            group.displaySizeSelector[psgeoSmallDisplayMode]) {
            psgeoDebug("selected");
            psgeoDebug("going to use lang string " + group.descriptionTextId);
            // psgeoFilterSectionPrefix(lang,lang[group.descriptionTextId](),subdiv);
            //          commented becase: group.descriptionTextId IS ACTUALLY a string now
            //          - it is the actual text to be translated
            //          - translate and pass on
            psgeoFilterSectionPrefix(lang,lang.getText(group.descriptionTextId),subdiv);
            //          - translate and pass on
            var checkboxList = psgeoGetSubtypeGroupCheckboxList(lib,lang,group,subdiv);
            psgeoSubtypeGroupCheckboxLists.push(checkboxList);
        }
    }
    
    // Country filtering
    if (psgeoDomainDefault.finlandselection && !psgeoSmallDisplayMode) {
        psgeoFilterSectionPrefix(lang,lang.getText("country"),subdiv);
        psgeoOnlyFinlandFilterCheckbox = psgeoGetOnlyFinlandCheckbox(lib,lang,subdiv);
    }
    
    // Source filtering
    if (psgeoDomainDefault.sourcesCheckboxes) {
        if (psgeoSourceFilterCheckboxes.length == 0) {
            if (psgeoDomainDefault.luolaseura) {
                psgeoFilterSectionPrefix(lang,lang.getText("source"),subdiv);
                psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(lib,lang,subdiv);
            }
        }
    }

    //
    // Wait for click events on any of the checkboxes installed above
    //
    
    subdiv.addEventListener('click', function() {
        psgeoDebug("Filter 2 pressed!");
        psgeoRerunFilters(db,lib,lang,map);
    });

}

function psgeoMoreMenuContents(db,lib,lang,map,subdiv) {
    if (psgeoDomainDefault.luolaseura) {
        psgeoCaveAddMenuButton =
            psgeoGetCaveAddMenuButton(lang,
                                      subdiv,
                                      function() {
                                          psgeoDebug("Cave add button pressed!");
                                          psgeoCaveAddBringUp(db,lib,lang,map);
                                      });
        psgeoCaveModifyMenuButton =
            psgeoGetCaveModifyMenuButton(lang,
                                      subdiv,
                                      function() {
                                          psgeoDebug("Cave modify button pressed!");
                                          psgeoCaveModifyBringUp(db,lib,lang,map);
                                      });
        psgeoCaveClassificationMenuButton =
            psgeoGetCaveClassificationMenuButton(lang,
                                                 subdiv,
                                                 function() {
                                                     psgeoDebug("Cave classification button pressed!");
                                                     psgeoCaveClassificationBringUp(db,lib,lang,map);
                                                 });
    }
    if (psgeoDomainDefault.otherToolsMenu) {
        if (psgeoOtherToolsMenuButton === undefined) {
            psgeoOtherToolsMenuButton =
                psgeoGetOtherToolsMenuButton(lang,
                                             subdiv,
                                             function() {
                                                 psgeoDebug("Other tools button pressed!");
                                                 psgeoOtherToolsMenuBringUp(db,lib,lang,map);
                                             });
        }
    }
    if (psgeoAboutMenuButton === undefined) {
        psgeoAboutMenuButton =
            psgeoGetAboutMenuButton(lang,
                                    subdiv,
                                    function() {
                                        psgeoDebug("About button pressed!");
                                        psgeoAboutMenuBringUp(db,lib,lang,map);
                                    });
    }
}

function psgeoFilterMenuBringUp(db,lib,lang,map,toOpen) {
    if (psgeoFilterWindow === undefined) {
        var params = {};
        if (psgeoSmallDisplayMode) {
            params = { maxWidth: Math.ceil(window.innerWidth * 0.95) };
        }
        psgeoFilterWindow = new google.maps.InfoWindow(params);
        var div = document.createElement("div");
        var titleelement = document.createElement("h3");
        var titletext = document.createTextNode(lang.capitalize(lang.getText("filterHeader")));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoFilterMenuContents(db,lib,lang,map,subdiv);
        psgeoFilterWindow.setContent(div);
    }
    if (toOpen) {
        if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
        if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
        if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
        if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
        psgeoFilterWindow.setPosition(map.getCenter());
        psgeoFilterWindow.open(map);
    }
}

function psgeoMoreMenuBringUp(db,lib,lang,map,toOpen) {
    if (psgeoMoreWindow === undefined) {
        psgeoMoreWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        var titleelement = document.createElement("h3");
        var titletext = document.createTextNode(lang.capitalize(lang.getText("moreInformation")));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoMoreMenuContents(db,lib,lang,map,subdiv);
        psgeoMoreWindow.setContent(div);
    }
    if (toOpen) {
        if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
        if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
        if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
        if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
        psgeoMoreWindow.setPosition(map.getCenter());
        psgeoMoreWindow.open(map);
    }
}

function psgeoCaveAddBringUp(db,lib,lang,map) {
    window.open(psgeoAddCaveLink, '_blank');
}

function psgeoCaveModifyBringUp(db,lib,lang,map) {
    window.open(psgeoModifyCaveLink, '_blank');
}

function psgeoCaveClassificationBringUp(db,lib,lang,map) {
    var chosenUrl = psgeoFinnishCaveClassification[lang.getLanguage()];
    if (chosenUrl === undefined) chosenUrl = psgeoFinnishCaveClassification["en"];
    // if (chosenUrl !== undefined) window.open(chosenUrl, '_blank');
    if (chosenUrl !== undefined) window.open(chosenUrl,"popup","width=300,height=600"); // RALF: Make Reference sheet open in popup
}

function psgeoAboutMenuBringUp(db,lib,lang,map) {
    if (psgeoAboutWindow === undefined) {
        psgeoAboutWindow = new google.maps.InfoWindow;
        var div = document.createElement("div");
        var titleelement = document.createElement("h3");
        var titletext = document.createTextNode(lang.capitalize(lang.getText("about")));
        titleelement.appendChild(titletext);
        div.appendChild(titleelement);
        subdiv = document.createElement("div");
        subdiv.innerHTML = "";
        var dataExplanation = "";
        if (psgeoDomainDefault.luolaseura) {
            dataExplanation += lang.getText("dataExplanationCavingAssociation",psgeoSmallDisplayMode);
        } else {
            dataExplanation += lang.getText("dataExplanation",psgeoSmallDisplayMode);
            dataExplanation += " ";
            dataExplanation += lib.htmlLink(psgeoDomainDefault.name,
                                            ("https://" + psgeoDomainDefault.domains[0]),
                                            true);
            dataExplanation += ".";
        }
        var version = lib.getVersion();
        var texts = [
            dataExplanation,
            lang.getTextWithValues("libraryExplanation",psgeoSmallDisplayMode,[version]) + " " +
            lang.getText("developersExplanation",psgeoSmallDisplayMode),
            lib.htmlBold(lang.getText("warningsAndDisclaimers").toUpperCase()),
            lang.getText("dataDistinctExplanation",psgeoSmallDisplayMode),
            lang.getText("dangerousExplanation",psgeoSmallDisplayMode)
        ];
        for (var i = 0; i < texts.length; i++) {
            subdiv.innerHTML += lib.htmlParagraph(texts[i]);
        }
        div.appendChild(subdiv);
        div.appendChild(document.createElement("br"));
        psgeoAboutWindow.setContent(div);
    }
    if ($.psgeoPopup !== undefined) $.psgeoPopup.close();
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
    psgeoAboutWindow.setPosition(map.getCenter());
    psgeoAboutWindow.open(map); 
}

function psgeoGenericMenuButton(lang,imgurl,text,structure,fn,spacer) {

    var br = document.createElement("br");          // column of links, not row -> newline required
    var label = document.createElement("button");
    var text = lang.capitalize(text);

    if ( imgurl === undefined || imgurl == "" ) {
        // TEXT ONLY BUTTON
        if ( text == "" ) { text = "link text missing"; psgeoDebug("Warning: There is a button without icon and text. Inserting text: " + text ); }
        label.innerHTML = text;
    }
    else {  // HAVE ICON
        var buttonImageTag = '<img src="' + imgurl + '" width=' + psgeoDomainDefault.icons.imgDefaultSize + '>'; // COULD BE IN CSS!
        if ( text === undefined || text == "" ) {
            // ICON ONLY BUTTON
            label.innerHTML = buttonImageTag;
        }
        else {
            // ICON + TEXT BUTTON
            // A two column table must be used to get the text vertically aligned in the middle
            //      - vertical alignment only works for tables and inline
            label.innerHTML = '<table><tr><td valign=middle>' + buttonImageTag + '</td><td valign=middle>'+ text + '</td></tr></table>';
        }
    }
    label.style.background = "none";
    label.style.padding = 0;
    label.style.borderWith = 0;
    label.style.border = "none";
    label.style.textDecoration = "underline";
    label.style.fontFamily = "arial,sans-serif";
    label.style.fontSize = "90%";                               // Smaller? Typographical reasons?
    if ( spacer == "br" ) { structure.appendChild(br); }        // A switch is possible here if more styles are needed
    structure.appendChild(label);
    label.addEventListener('click', fn);
    return(label);
}

function psgeoGetOtherToolsMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgOtherTools;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,icon,lang.getText("moreMaps"),structure,fn,"br"));
}       

function psgeoGetFilterMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgFilter; 
    if ( icon === undefined ) { icon=""; }
    if ( psgeoDomainDefault.hideButtontextFilter ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,"br"));
    } else {
        return(psgeoGenericMenuButton(lang,
                                      icon,
                                      (psgeoSmallDisplayMode ? lang.filterLinkText() : lang.getText("moreFilters")),
                                      structure,
                                      fn,"br"));
    }
}
    
function psgeoGetMoreMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgMore;
    if ( icon === undefined ) { icon=""; }
    if ( psgeoDomainDefault.hideButtontextMore ) {
        return(psgeoGenericMenuButton(lang,icon,"",structure,fn,"br"));
    }
    else {
        return(psgeoGenericMenuButton(lang,icon,lang.getText("toolsAndAbout"),structure,fn,"br"));
    }
}
    
function psgeoGetAboutMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgAbout;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,icon,lang.getText("about"),structure,fn,"br"));
}       

function psgeoGetCaveAddMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgCaveAdd;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,
                                  icon,
                                  lang.getText("addCave"),
                                  structure,
                                  fn,"br"));    
}

function psgeoGetCaveModifyMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgCaveModify;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,
                                  icon,
                                  lang.getText("modifyCave"),
                                  structure,
                                  fn,"br"));    
}

function psgeoGetCaveClassificationMenuButton(lang,structure,fn) {
    var icon = psgeoDomainDefault.icons.imgCaveClassification;
    if ( icon === undefined ) { icon=""; }
    return(psgeoGenericMenuButton(lang,icon,lang.getText("caveClassification"),structure,fn,"br"));
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

function psgeoGetSubtypeGroupCheckboxList(lib,lang,group,structure) {
    var types = lib[group.getSubActivitiesFunction](group.getSubActivitiesFunctionArgument);
    psgeoDebug("subtype group " + group.descriptionTextId + " arg was " + JSON.stringify(group.getSubActivitiesFunctionArgument));
    var result = [];
    var box;
    psgeoDebug("extraSubActivitiesBefore = " + JSON.stringify(group.extraSubActivitiesBefore));
    for (var k = 0; k < group.extraSubActivitiesBefore.length; k++) {
        var subact = group.extraSubActivitiesBefore[k];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,name,structure,true,false);
        result.push(box);
    }
    psgeoDebug("types = " + JSON.stringify(types));
    for (var i = 0; i < types.length; i++) {
        var subact = types[i];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,
                                      name,
                                      structure,
                                      true,
                                      (i == types.length-1 &&
                                       group.extraSubActivitiesAfter.length == 0));
        result.push(box);
    }
    psgeoDebug("extraSubActivitiesAfter = " + JSON.stringify(group.extraSubActivitiesAfter));
    for (var j = 0; j < group.extraSubActivitiesAfter.length; j++) {
        var subact = group.extraSubActivitiesAfter[j];
        var name = lang.getTextCollectionItem(group.subActivityCollection,subact.toLowerCase());
        box = psgeoGetGenericCheckbox(subact,name,structure,true,(j == group.extraSubActivitiesAfter.length-1));
        result.push(box);
    }
    var entry = { group: group, checkboxes: result };
    return(entry);
}

function psgeoGetOnlyFinlandCheckbox(lib,lang,structure) {
    return(psgeoGetGenericCheckbox("only finland",lang.getText("onlyFinland"),structure,false,true));
}

function psgeoGetSourcesCheckboxes(lib,lang,structure) {
    const br = document.createElement("br");
    var result = [];
    var sourcesLeft = psgeoSources.length;
    for (const source of psgeoSources ) {
        var name = lang.getText(source.textId,psgeoSmallDisplayMode);
        var description = document.createTextNode(name);
        var box = document.createElement("input");
            box.type = "checkbox";
            box.value = lang.getText(source.textId);    // ENGLISH???? NOTE!
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
    
    for (i = 0; i < 9; i++) {
        var subdiv = document.createElement('div');
        div.appendChild(subdiv);
        subdiv.innerHTML = "";
        psgeoStatsPaneTexts.push(subdiv);
    }
    
}

function psgeoInitStatsPaneControl(map) {

    //
    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    //
    
    var statsPaneDiv = document.createElement("div");
    statsPaneDiv.setAttribute("id","Info");
     
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
        case "se": psgeoDomainDefault.lang = "se"; break;
        case "en": psgeoDomainDefault.lang = "en"; break;
        default: break;
        }
    }
}

function psgeoInitPlaceAux(db,lib,lang,map,param,openpopup) {
    var place = decodeURI(param);
    var items = db.getNamedItemsPartialMatch(place);
    psgeoDebug("p = " + place + " (" + items.length.toString() + " places match)");
    if (items.length > 0) {
        var item = psgeoPickBest(db,items);
        var coords = {lat: item.lat + psgeoDefaultZoomForPlaceLatitudeShift, lng: item.lon};
        map.setCenter(coords);
        map.setZoom(psgeoDefaultZoomForPlace);
        if (openpopup) {
            psgeoMarkerPopupItem(map,item,$.psgeoPopup,db,lib,lang);
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
        psgeoInitPlaceAux(db,lib,lang,map,place,popup !== null);
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

    if (hostname == "luolaseura.planetcaver.net") {
        psgeoSources = psgeoSourcesLuolaseura.concat(psgeoSourcesCavingTest);
    } else if (psgeoDomainDefault.luolaseura) {
        psgeoSources = psgeoSourcesLuolaseura.concat(psgeoSourcesCaving);
    } else if (psgeoDomainDefault.name == "Planetswimmer") {
        psgeoSources = psgeoSourcesSwimming;
    } else {
        psgeoSources = psgeoSourcesPlain;
    }
}

function psgeoInitDomainMatchPath(entry,pathname) {
    if (entry.paths.length == 0) {
        return(true);
    } else {
        var k;
        for (k = 0; k < entry.paths.length; k++) {
            var path = entry.paths[k];
            if (pathname.includes(path)) {
                return(true);
            }
        }
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
        name: lang.getText("finnishTerrain",psgeoSmallDisplayMode)
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
    if (psgeoFilterWindow !== undefined) psgeoFilterWindow.close();
    if (psgeoMoreWindow !== undefined) psgeoMoreWindow.close();
    if (psgeoAboutWindow !== undefined) psgeoAboutWindow.close();
    if (psgeoOtherToolsWindow !== undefined) psgeoOtherToolsWindow.close();
}

function psgeoInitLinkHandlers(db,lib,lang,map) {
    $(document).on("click", "a", function() {
        //this == the link that was clicked
        var href = $(this).attr("href");
        psgeoDebug("Caught link click to " + href);
        var begin = href.substring(0,3);
        if (begin ===  "?p=") {
            var rest = href.substring(3);
            psgeoInitPlaceAux(db,lib,lang,map,rest,true);
            return(false);
        } else {
            return(true);
        }
    });
}

function psgeoInitMap() {
    psgeoInitParameters();
    var lang = PsgeoLang(psgeoDomainDefault.lang);
    $.psgeoLang = lang;
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
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
            ]
        },
        streetViewControl: false
    });

    if (psgeoDomainDefault.finnishTerrain) {
        $.psgeoMapFinnish = psgeoInitMapFinnishTerrain(lang);
        psgeoMap.mapTypes.set(lang.getText("finnishTerrain",psgeoSmallDisplayMode), $.psgeoMapFinnish);
        psgeoMap.mapTypeControlOptions.mapTypeIds[2] = lang.getText("finnishTerrain",psgeoSmallDisplayMode);
    }
    
    psgeoMap.addListener('zoom_changed', function() {
        psgeoZoomChanged(psgeoMap.getZoom());
    });
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    psgeoDebug("initStatsPaneControl...");
    psgeoInitStatsPaneControl(psgeoMap);
    psgeoInitPopup(psgeoMap);
    psgeoDebug("initList...");
    psgeoInitList(lang,psgeoMap);
    psgeoDebug("initLinkClicks");
    psgeoInitLinkHandlers($.psgeoDB,$.psgeoLib,lang,psgeoMap);
    psgeoDebug("all initialisations done.");
}
