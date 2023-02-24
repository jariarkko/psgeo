//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//
//
// This is the PsgeoDomainDefaults module.
// It returns a psgeoDomainDefault object with domain & path specific settings.


function PsgeoSettings () {

    //
    // Usage:
    //
    //   // create an object
    //   const foo = PsgeoSettings();
    //
    //   // get default settings for the installation at URL
    //   let psgeoDomainDefault = foo.getDomainDefault(URL);
    //
    //   // get global default settings (for all domains)
    //   let psgeoGlobalDefault = foo.getGlobalDefault()     
    
    
    // PART I - GLOBAL SETTINGS

    // Icon settings
    //
    
    // Once the software is more mature and icons have been decided,
    // they can get renamed with generic names and then configurable icon sets become a possibility.
    // At present, we use icons from two sets.
    
    const iconSet = "./icons/neu_interface/";
    const iconSetAdditional = "./icons/coreui_free/";
    
    const psgeoIconFilter = iconSet + "neu_interface_find_magnifying_glass_icon_149474.svg";      // in filter pane - top left pane
    const psgeoIconMore = iconSet + "neu_interface_info_icon_149458.svg";                         // in stats pane - bottom left pane
    
    const psgeoIconAbout = iconSet + "neu_interface_info_icon_149458.svg";                        // About 
    const psgeoIconRecordAdd = iconSet + "neu_interface_add_circle_insert_plus_icon_149548.svg";    // Action link = AddRecord
    const psgeoIconRecordModify = iconSet + "neu_interface_pen_edit_modify_icon_149414.svg";        // Action link = ModifyCave
    const psgeoIconCaveClassification = iconSet + "neu_interface_faq_question_icon_149479.svg";   // Help/Reference = Classification of caves
    // const psgeoIconGeolocation = "./icons/crosshair/crosshair_102648.svg";                     // Geolocation
    // const psgeoIconGeolocation = "./icons/crosshair/crosshair_icon_173217.svg";                // Geolocation
    // const psgeoIconGeolocation = "./icons/crosshair/crosshair_102648.svg";                     // Geolocation
    const psgeoIconGeolocation = "./icons/crosshair/crosshairs_gps_icon_136721.svg";              // Geolocation
    
    const psgeoIconOtherTools = iconSetAdditional + "map_icon_144228.svg";                        // External resources = Other maps
    
    const psgeoDefaultIcons = {
        imgDefaultSize: 30,
        imgFilter: psgeoIconFilter,
        imgMore: psgeoIconMore,
        imgAbout: psgeoIconAbout,
        imgCaveClassification: psgeoIconCaveClassification,
        imgOtherTools: psgeoIconOtherTools,
        imgRecordAdd: psgeoIconRecordAdd,
        imgRecordModify: psgeoIconRecordModify,
        imgGeolocation: psgeoIconGeolocation,
    }

    const psgeoFinnishTerrainMapBaseurl =
        "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/";
    
    const psgeoDefaultZoomForPlace = 14;
    const psgeoDefaultZoomForPlaceLatitudeShift = 0.010;
    const psgeoSmallDisplayModeLimit = 800; 
    const psgeoImagePercentageSmallDisplays = 40;
    const psgeoImagePercentageLargeDisplays = 30;
    
    const psgeoModelViewerWidthPercentageSmallDisplays = 40;
    const psgeoModelViewerWidthPercentageLargeDisplays = 60;
    const psgeoModelViewerHeightPercentageSmallDisplays = 45;
    const psgeoModelViewerHeightPercentageLargeDisplays = 65;
    const psgeoViewableModel = /[.][gG][lL][bB]/;

    // PART II - DOMAIN DEFAULTS
    //
    // Default settings for different sites/URLs
    // Note: some definitions from above are referenced to. Order is important!
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
    // FinlandCountryName: Of course, the software also works for other
    // countries.  By setting this parameter, you can control whether you
    // restrict your country to Finland or some other country.
    //
    // Luolaseura: This software normally runs from the planetskier,
    // planetcaver, etc pages. All links point back to the these pages,
    // and the labeling is done to represent those pages. If this page is
    // run from the Finnish caving association page, set the following
    // variable to true to disable the planetskier/caver look and feel,
    // and to add links back to the association's page.
    
    const psgeoDomainDefaults = [
        {
            domains: ["planetskier.net","www.planetskier.net"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://www.planetskier.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Skiing",
            name: "Planetskier",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: false,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: false,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: false,
            classicUI:true
        },
        {
            domains: ["kartta.luolaseura.fi"],
            paths: [],
            sources: [
                {textId: "Luolaseura", link: "https://luolaseura.fi", datafile: "https://kartta.luolaseura.fi/db/caves.luolaseura.json", descriptionTextId: "dataExplanationCavingAssociation"},
                {textId: "Planetcaver", link: "https://www.planetcaver.net", datafile: "https://www.planetcaver.net/locations.caving.json", descriptionTextId: ""}
            ],
            lat: 65.4,
            lng: 24.6,
            zoom: 5,
            mapId: "",
            filter: "Caving",
            name: "Luolakartat Suomessa",
            lang: "fi",
            finland: false,
            cavemaps: true,
            cavemapsFilterInitiallyOn: false,
            statLines: "caving",
            showCustomLinks: false,
            customLinks: [
                {textId: "addRecord", iconSet: "./icons/neu_interface/", icon: "neu_interface_add_circle_insert_plus_icon_149548.svg", url: "https://luolaseura.fi/luolaretkelle/kerro-meille/", popup:false, popupSize: ""},
                {textId: "modifyRecord", iconSet: "./icons/neu_interface/", icon: "neu_interface_pen_edit_modify_icon_149414.svg", url: "https://luolaseura.fi/luolaretkelle/kerro-meille/luolan-tietojen-paivitys/",popup:false,popupSize: ""},
                {textId: "caveClassification", iconSet: "./icons/neu_interface/", icon: "neu_interface_faq_question_icon_149479.svg", url: "https://kartta.luolaseura.fi/luokittelu-fi.html",popup:true, popupSize: "width=300,height=600"}
            ],
            finlandselection: true,
            finlandcountryname: "Finland",
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: true,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
            classicUI:false
        },
        {
            domains: ["dev.luolaseura.fi"],
            paths: [""],
            sources: [
                {textId: "Luolaseura", link: "https://luolaseura.fi", datafile: "https://dev.luolaseura.fi/db/caves.luolaseura.json", descriptionTextId: "dataExplanationCavingAssociation"},
                {textId: "Planetcaver", link: "https://www.planetcaver.net", datafile: "https://www.planetcaver.net/locations.caving.json", descriptionTextId: ""}
            ],
            lat: 65.4,
            lng: 24.6,
            zoom: 5,
            mapId: "",
            filter: "Caving",
            name: "Luolakartat Suomessa",
            lang: "fi",
            finland: false,
            cavemaps: true,
            cavemapsFilterInitiallyOn: false,
            statLines: "caving",
            showCustomLinks: true,
            customLinks: [
                {textId: "addRecord", iconSet: "./icons/neu_interface/", icon: "neu_interface_add_circle_insert_plus_icon_149548.svg", url: "https://luolaseura.fi/luolaretkelle/kerro-meille/",popup:false,popupSize: ""},
                {textId: "modifyRecord", iconSet: "./icons/neu_interface/", icon: "neu_interface_pen_edit_modify_icon_149414.svg", url: "https://luolaseura.fi/luolaretkelle/kerro-meille/luolan-tietojen-paivitys/",popup:false,popupSize: ""},
                {textId: "caveClassification", iconSet: "./icons/neu_interface/", icon: "neu_interface_faq_question_icon_149479.svg", url: "https://kartta.luolaseura.fi/luokittelu-fi.html",popup:true,popupSize: "width=300,height=600"}
            ],
            finlandselection: true,
            finlandcountryname: "Finland",
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: true,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            finlandselection: true,
            finlandcountryname: "Finland",
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: true,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI:false
        },
        {
            domains: ["luolaseura.planetcaver.net"],
            paths: [],
            sources: [
                {textId: "Luolaseura", link: "https://luolaseura.fi", datafile: "https://kartta.luolaseura.fi/db/caves.luolaseura.json", descriptionTextId: "dataExplanationCavingAssociation"},
                {textId: "Planetcaver", link: "https://planetcaver.net", datafile: "https://www.planetcaver.net/locations.caving.json", descriptionTextId: ""}
            ],
            lat: 65.4,
            lng: 24.6,
            zoom: 5,
            mapId: "",
            filter: "Caving",
            name: "Luolakartat Suomessa",
            lang: "fi",
            finland: false,
            cavemaps: true,
            cavemapsFilterInitiallyOn: false,
            statLines: "caving",
            showCustomLinks: true,
            customLinks: [],
            finlandselection: true,
            finlandcountryname: "Finland",
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: true,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI:false
        },
        {
            domains: ["planetcaver.net","www.planetcaver.net"],
            paths: ["mapmap.html","kartta.html"],
            sources: [
                {textId: "Planetcaver", link: "https://www.planetcaver.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 65.4,
            lng: 24.6,
            zoom: 5,
            mapId: "",
            filter: "CavingFinland",
            name: "Planetcaver Cave Maps",
            lang: "en",
            finland: false,
            cavemaps: true,
            cavemapsFilterInitiallyOn: true,
            statLines: "caving",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: true,
            finlandcountryname: "Finland",
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: false,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI: false
        },
        {
            domains: ["planetcaver.net","www.planetcaver.net"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://www.planetcaver.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "CavingFinland",
            name: "Planetcaver",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: false,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI: false
        },
        {
            domains: ["theurbanexplorer.net","www.theurbanexplorer.net"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://theurbanexplorer.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Urbanex",
            name: "The Urban Explorer",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            zoomlevelfordetails: 14,
            sourcesCheckboxes: false,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: false,
            classicUI: false
        },
        {
            domains: ["planetclimber.net","www.planetclimber.net"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://planetclimber.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Climbing",
            name: "Planetclimber",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: false,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: false,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI: false
        },
        {
            domains: ["planetbiker.net","www.planetbiker.net"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://planetbiker.net", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Biking",
            name: "Planetbiker",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: false,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: false,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
            nameSearch: true,
            rockTypeSearch: false,
            morphologySearch: false,
            waterbodySearch: false,
            saunaTypeSearch: false,
            skiingSubstanceSearch: false,
            skiingUphillSearch: false,
            skiingPlaceSearch: false,
            climbingTypeSearch: false,
            bikingSearch: true,
            urbanexTargetSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: false,
            classicUI: false
        },
        {
            domains: ["planetswimmer.com","www.planetswimmer.com"],
            paths: [],
            sources: [
                {textId: "Planetswimmer", link: "https://www.planetswimmer.com", datafile: "https://www.planetswimmer.com/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Swimming",
            name: "Planetswimmer",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: true,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: true,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: false,
            classicUI: false
        },
        {
            domains: ["planetflier.com","www.planetflier.com"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://www.planetflier.com", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Flying",
            name: "Planetflyer",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: false,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",
            otherToolsMenu: false,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: true,
            classicUI: false
        },
        {
            domains: ["saunablogger.cool","www.saunablogger.cool"],
            paths: [],
            sources: [
                {textId: "Planetcaver", link: "https://saunablogger.cool", datafile: "https://www.planetcaver.net/locations.json", descriptionTextId: "dataExplanation"}
            ],
            lat: 0,
            lng: 0,
            zoom: 2,
            mapId: "",
            filter: "Sauna",
            name: "Saunablogger",
            lang: "en",
            finland: false,
            cavemaps: false,
            cavemapsFilterInitiallyOn: false,
            statLines: "general",
            showCustomLinks: false,
            customLinks: [],
            finlandselection: false,
            finlandcountryname: undefined,
            zoomouthidesdetails: true,
            sourcesCheckboxes: false,
            finnishTerrain: false,
            finnishTerrainApiKey: "b3623347-9fcf-4ded-b01e-3b52188e14e4",            
            otherToolsMenu: false,
            rangeCategoryLimits: {measure: "length", unit: "meters", limitLow: 5, limitHigh: 50},
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
            bikingSearch: false,
            hideButtontextFilter: true,
            hideButtontextMore: true,
            hideButtontextGeolocation: true,
            icons: psgeoDefaultIcons,
            geolocationContinuousUpdate: true,
            richPositionInfo: false,
            classicUI: false
        }
    ];
   


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
    
    function getDomainDefault(hostname,pathname) {
        let i;
        for (i = 0; i < psgeoDomainDefaults.length; i++) {
            let candidateDomainDefault = psgeoDomainDefaults[i];
            if (psgeoInitDomainMatch(candidateDomainDefault,hostname,pathname)) {
                psgeoDebug("Choosing the domain default " + candidateDomainDefault.name + " with cm = " +
                           (candidateDomainDefault.cavemaps ? "true" : "false"));
                return candidateDomainDefault;
            }
        }
        psgeoDebug("Choosing the domain default " + psgeoDomainDefaults[0].name + " because nothing matched");
        return psgeoDomainDefaults[0];
    }


    return ({
        // topographic map sources to variable
        psgeoFinnishTerrainMapBaseurl: psgeoFinnishTerrainMapBaseurl,
        // basic display options to variables
        psgeoDefaultZoomForPlace: psgeoDefaultZoomForPlace,
        psgeoDefaultZoomForPlaceLatitudeShift: psgeoDefaultZoomForPlaceLatitudeShift,
        psgeoSmallDisplayModeLimit: psgeoSmallDisplayModeLimit,
        psgeoImagePercentageSmallDisplays: psgeoImagePercentageSmallDisplays,
        psgeoImagePercentageLargeDisplays: psgeoImagePercentageLargeDisplays,
        // model viewer display options to variables
        psgeoModelViewerWidthPercentageSmallDisplays: psgeoModelViewerWidthPercentageSmallDisplays,
        psgeoModelViewerWidthPercentageLargeDisplays: psgeoModelViewerWidthPercentageLargeDisplays,
        psgeoModelViewerHeightPercentageSmallDisplays: psgeoModelViewerHeightPercentageSmallDisplays,
        psgeoModelViewerHeightPercentageLargeDisplays: psgeoModelViewerHeightPercentageLargeDisplays,
        psgeoViewableModel: psgeoViewableModel,
        // two settings objects
        getDefaultIcons: psgeoDefaultIcons,
        getDomainDefault: getDomainDefault
    });

}

