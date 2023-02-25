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

    const psgeoSwedishTerrainMapBaseurl =
    
    //    Operation GetTile
    //    ResourceURL:
    //      format="image/png", resourceType="tile",
    //      template="https://api.lantmateriet.se/open/topowebb-ccby/v1/wmts/1.0.0/topowebb/default/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png"
    //    "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/";
    
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
    
    async function fetchDomainDefaults(hostname,pathname) {

        const psgeoDomainDefaultsFile = "https://" + hostname + "/cfg/psgeoDomainDefaults.json";

        // if (pathname !== "") {
        //    const psgeoDomainDefaultsFile = "https://" + hostname + pathname + "/cfg/psgeoDomainDefaults.json";
        // } else {
        //    const psgeoDomainDefaultsFile = "https://" + hostname + "/cfg/psgeoDomainDefaults.json";
        // }
        psgeoDebug("Fetching Domain Defaults from " + psgeoDomainDefaultsFile);

        const response = await fetch(psgeoDomainDefaultsFile); // returns the promise 'response'

        psgeoDebug("Got response from server.");
        const data = await response.json(); // parses response to json and returns, when done and returns, when done
        psgeoDebug("JSON parsed. Length is " + data.length + "array elements.");
        return data
    }
 
    async function selectDomainDefault(hostname,pathname) {

        // const data = await fetchDomainDefaults(hostname,pathname);


        const psgeoDomainDefaults = await fetchDomainDefaults(hostname,pathname);

        psgeoDebug("Back from fetch. Data length is " + psgeoDomainDefaults.length + " array elements.");
    
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


    //
    // PART III - GENERAL FUNCTIONS
    //

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
   

    //
    // RETURN OBJECT
    //

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
        getDomainDefault: selectDomainDefault
    });

}


