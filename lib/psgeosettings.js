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
    //
    
    const psgeoDomainDefaults = [
        {
            domains: ["planetskier.net","www.planetskier.net"],
            paths: [],
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            domains: ["caving.fi","luolaseura.fi"],
            paths: [],
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
            statLines: psgeoStatLinesCaving,
            luolaseura: true,
            finlandselection: true,
            finlandcountryname: "Finland",
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
            statLines: psgeoStatLinesCaving,
            luolaseura: true,
            finlandselection: true,
            finlandcountryname: "Finland",
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
            statLines: psgeoStatLinesCaving,
            luolaseura: false,
            finlandselection: true,
            finlandcountryname: "Finland",
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
            statLines: psgeoStatLinesGeneral,
            luolaseura: false,
            finlandselection: false,
            finlandcountryname: undefined,
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
    
    function initDomain(hostname,pathname) {
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


    // function getGlobalDefault() {
    //    return OBJ // XXXX
    // }

    return {
        initDomain: initDomain
    }
}


