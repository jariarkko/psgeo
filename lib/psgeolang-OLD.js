//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//
// This is the PsgeoLang module, which can provide some key messages
// in several languages
//
// Usage:
//
//   // create the object
//   var lang = "fi";
//   var langLib = PsgeoLang(lang);
//
//   // get the string "cities" in the given language
//   var lang = "fi";
//   var citiesText = langLib.citiesText(); // "paikkakuntaa"
//  

function PsgeoLang(language) {

    var mapTexts = [];
    mapTexts["en"] = "map";
    mapTexts["fi"] = "kartta";
 
    var caveMapTexts = [];
    caveMapTexts["en"] = "cave map";
    caveMapTexts["fi"] = "luolakartta";

    var cavesTexts = [];
    cavesTexts["en"] = "caves";
    cavesTexts["fi"] = "luolaa";
    
    var mediumCavesTexts1 = [];
    mediumCavesTexts1["en"] = "caves (";
    mediumCavesTexts1["fi"] = "luolat (";
    var mediumCavesTexts2 = [];
    mediumCavesTexts2["en"] = "..";
    mediumCavesTexts2["fi"] = "..";
    var mediumCavesTexts3 = [];
    mediumCavesTexts3["en"] = "m)";
    mediumCavesTexts3["fi"] = "m)";

    var mediumCavesTexts1Short = [];
    mediumCavesTexts1Short["en"] = "";
    mediumCavesTexts1Short["fi"] = "";
    var mediumCavesTexts2Short = [];
    mediumCavesTexts2Short["en"] = "..";
    mediumCavesTexts2Short["fi"] = "..";
    var mediumCavesTexts3Short = [];
    mediumCavesTexts3Short["en"] = "m";
    mediumCavesTexts3Short["fi"] = "m";

    var caveletsTexts1 = [];
    caveletsTexts1["en"] = "cavelets (under ";
    caveletsTexts1["fi"] = "luolaset (alle ";
    var caveletsTexts2 = [];
    caveletsTexts2["en"] = "m)";
    caveletsTexts2["fi"] = "m)";

    var caveletsTexts1Short = [];
    caveletsTexts1Short["en"] = "<";
    caveletsTexts1Short["fi"] = "<";
    var caveletsTexts2Short = [];
    caveletsTexts2Short["en"] = "m";
    caveletsTexts2Short["fi"] = "m";

    var bigCavesTexts1 = [];
    bigCavesTexts1["en"] = "big caves (over ";
    bigCavesTexts1["fi"] = "isot luolat (yli ";
    var bigCavesTexts2 = [];
    bigCavesTexts2["en"] = "m)";
    bigCavesTexts2["fi"] = "m)";

    var bigCavesTexts1Short = [];
    bigCavesTexts1Short["en"] = ">";
    bigCavesTexts1Short["fi"] = ">";
    var bigCavesTexts2Short = [];
    bigCavesTexts2Short["en"] = "m";
    bigCavesTexts2Short["fi"] = "m";

    var dimensionsTexts = [];
    dimensionsTexts["en"] = "dimensions";
    dimensionsTexts["fi"] = "mitat";

    var literatureCaveIdTexts = [];
    literatureCaveIdTexts["en"] = "The Finnish identification code for this cave is";
    literatureCaveIdTexts["fi"] = "Suomalainen luolakoodi luolalle on";
    
    var lengthTexts = [];
    lengthTexts["en"] = "length";
    lengthTexts["fi"] = "pituus";
    
    var lengthCategoryTexts = [];
    lengthCategoryTexts["en"] = "length category";
    lengthCategoryTexts["fi"] = "pituusluokka";

    var manmadeTexts = [];
    manmadeTexts["en"] = "man made";
    manmadeTexts["fi"] = "keinotekoinen";
    
    var iceTexts = [];
    iceTexts["en"] = "ice";
    iceTexts["fi"] = "jää";
    
    var ballsTexts = [];
    ballsTexts["en"] = "ballpit";
    ballsTexts["fi"] = "pallomeri";
    
    var otherMaterialTexts = [];
    otherMaterialTexts["en"] = "other than rock or ice";
    otherMaterialTexts["fi"] = "muu kuin kivi tai jää";

    var nameTexts = [];
    nameTexts["en"] = "name";
    nameTexts["fi"] = "nimi";
    
    var rockTexts = [];
    rockTexts["en"] = "material";
    rockTexts["fi"] = "materiaali";

    var rockTypeTexts = [];
    rockTypeTexts["en"] = "material";
    rockTypeTexts["fi"] = "materiaali";
    
    var rockTypeValueTexts = [];
    rockTypeValueTexts["en"] = {
        "rock-volcanic": "volcanic",
        "rock-sandstone": "sandstone",
	"rock-mudrock": "mudrock",
        "rock-limestone": "limestone/dolomite",	// added dolomite
	"rock-gypsum": "gypsum",			// added gypsum
	"rock-salt": "salt",				// added salt
        "rock-marble": "marble",
        "rock-granite": "non-volcanic, non-sedimentary", // text changed
        "rock-other": "other rock",			// was other rock
        "rock-unknown": "unknown"
    };
    rockTypeValueTexts["fi"] = {
        "rock-volcanic": "vulkaaninen",
        "rock-sandstone": "hiekkakivi",
        "rock-mudrock": "savikivi",			// monenlaiset savikivet
        "rock-limestone": "kalkkikivi/dolomiitti",	// added dolomite
        "rock-gypsum": "kipsi",			// added gypsum
	"rock-salt": "suola",			// added salt
        "rock-marble": "marmori",
        "rock-granite": "muu kivi kuin vulkaaninen tai sedimentti", // text changed
        "rock-other": "muu kivi",
        "rock-unknown": "ei tiedossa"
    };
    
    var morphologyTexts = [];
    morphologyTexts["en"] = "cave type";
    morphologyTexts["fi"] = "luolan tyyppi";

    var morphologyValueTexts = [];
    morphologyValueTexts["en"] = {
        "morphology-crack": "crevice",
        "morphology-boulders": "boulder",
        "morphology-karst": "karst",
        "morphology-volcanic": "volcanic",
        "morphology-erosion": "erosion",
        "morphology-weathering": "weathering",
        "morphology-crystallization": "blister",
        "morphology-organic": "organic, reef or turf",
        "morphology-other": "other",
        "morphology-unknown": "unknown"
    };
    morphologyValueTexts["fi"] = {
        "morphology-crack": "rako",
        "morphology-boulders": "lohkare",
        "morphology-karst": "karsti",
        "morphology-volcanic": "vulkaaninen",
        "morphology-erosion": "eroosio",
        "morphology-weathering": "rapautumis",
        "morphology-crystallization": "kideonkalo",
        "morphology-organic": "koralli tai turve",
        "morphology-other": "muu",
        "morphology-unknown": "ei tiedossa"
    };

    var activityTexts = [];
    activityTexts["en"] = "activity";
    activityTexts["fi"] = "aktiviteetit";
    
    var cavingActivityValueTexts = [];
    cavingActivityValueTexts["en"] = {
        "basic": "basic caving",
        "srt": "SRT",
        "swimming": "swimming",
        "boating": "boating",
        "diving": "diving",
        "digging": "digging",
        "biking": "biking",
        "skiing": "skiing",
        "surveying": "surveying",
        "researching": "researching",
        "training": "training",
        "studying": "studying"
    };
    cavingActivityValueTexts["fi"] = {
        "basic": "luolailu",
        "srt": "SRT",
        "swimming": "uinti",
        "boating": "veneily",
        "diving": "sukellus",
        "digging": "kaivuu",
        "biking": "pyöräily",
        "skiing": "hiihto",
        "surveying": "kartoitus",
        "researching": "tutkimus",
        "training": "opetus",
        "studying": "oppiminen"
    };

    var swimmingTexts = [];
    swimmingTexts["en"] = "swimming";
    swimmingTexts["fi"] = "uintia";

    var waterbodyTexts = [];
    waterbodyTexts["en"] = "waterbody";
    waterbodyTexts["fi"] = "vesialue";
    
    var swimmingPlaceValueTexts = [];
    swimmingPlaceValueTexts["en"] =
        {
            "indoor": "indoors",
            "outdoor": "outdoors",
            "underground": "underground",
            "waterbody-river": "on a river",
            "waterbody-lake": "on a lake",
            "waterbody-sandpit": "in a sandpit",
            "waterbody-sea": "in the sea",
            "waterbody-pool": "in a swimming pool",
            "waterbody-cave": "in a cave",
            "waterbody-other": "in some other body of water",
            "waterbody-unknown": "unknown",
            "beach": "on an official beach",
            "nature": "in nature",
            "thermal-bath": "in a thermal bath"
        };
    swimmingPlaceValueTexts["fi"] =
        {
            "indoor": "sisällä",
            "outdoor": "ulkona",
            "underground": "maan alla",
            "waterbody-river": "joessa",
            "waterbody-lake": "järvellä",
            "waterbody-sandpit": "hiekkakuopalla",
            "waterbody-sea": "meressä",
            "waterbody-pool": "uimaaltaassa",
            "waterbody-cave": "luolassa",
            "waterbody-other": "jossain muussa vesialtaassa",
            "waterbody-unknown": "ei tiedossa",
            "beach": "virallisella uintipaikalla",
            "nature": "luonnon rannalla",
            "thermal-bath": "kuumassa lähteessä"
        };
    
    var swimmingMaterialValueTexts = [];
    swimmingMaterialValueTexts["en"] =
        {
            "water": "in water",
            "ice": "in an ice hole",
            "balls": "in a ball pit"
        };
    swimmingMaterialValueTexts["fi"] =
        {
            "water": "vedessä",
            "ice": "avannossa",
            "balls": "pallomeressä"
        };
    
    var skiTexts = [];
    skiTexts["en"] = "skiing";
    skiTexts["fi"] = "hiihtoa";

    var indoorTexts = [];
    indoorTexts["en"] = "indoors";
    indoorTexts["fi"] = "sisällä";
       
    var outdoorTexts = [];
    outdoorTexts["en"] = "outdoors";
    outdoorTexts["fi"] = "ulkona";

    var skiMaterialTexts = [];
    skiMaterialTexts["en"] = "material";
    skiMaterialTexts["fi"] = "materiaali";
    
    var skiMaterialValueTexts = [];
    skiMaterialValueTexts["en"] =
        { "snow": "on natural snow",
          "imported-snow": "on carried snow",
          "sand": "on sand",
          "rock": "on rocks",
          "ash": "on ash",
          "asphalt": "on asphalt",
          "grass": "on grass",
          "mud": "in mud",
          "plastic": "on plastic",
          "other-substances": "on other substances",
          "unknown-substance": "unknown"
        };
    skiMaterialValueTexts["fi"] =
        { "snow": "lumella",
          "imported-snow": "kannetulla lumella",
          "sand": "hiekalla",
          "rock": "kivillä",
          "ash": "tuhkalla",
          "asphalt": "asfaltilla",
          "grass": "nurmikolla",
          "mud": "mudassa",
          "plastic": "muovilla",
          "other-substances": "muilla materiaaleilla",
          "unknown-substance": "ei tiedossa"
        };

    var targetTexts = [];
    targetTexts["en"] = "target is";
    targetTexts["fi"] = "kohde on";

    var urbanexTargetTexts = [];
    urbanexTargetTexts["en"] = "target";
    urbanexTargetTexts["fi"] = "kohde";
    
    var urbanexTargetValueTexts = [];
    urbanexTargetValueTexts["en"] =
        {
            "none": "nothing",
            "tunnels": "a tunnel",
            "buildings": "a building",
            "ruins": "ruins",
            "bunkers": "a bunker",
            "quarries": "a quarry",
            "mines": "a mine",
            "industrial": "an industrial site",
            "silos": "a silo",
            "ski-lifts": "a ski lift",
            "landfills": "a landfill",
            "castles": "a castle",
            "vehicles": "a vehicle",
            "trenches": "a trench",
            "memorial": "a memorial",
            "historic-sites": "a historic site",
            "bridges": "a bridge",
            "skating-rinks": "a skating rink",
            "amusement-parks": "an amusement park",
            "airports": "an airport",
            "catacombs": "a catacomb",
            "railways": "a railway",
            "smokestacks": "a smokestack",
            "towers": "a tower",
            "prisons": "a prison",
            "harbours": "a harbour",
            "military": "a military site",
            "other": "other",
            "unknown": "unknown"
        };
    urbanexTargetValueTexts["fi"] =
        {
            "none": "ei mikään",
            "tunnels": "tunneli",
            "buildings": "rakennus",
            "ruins": "rauniot",
            "bunkers": "bunkkeri",
            "quarries": "louhis",
            "mines": "kaivos",
            "industrial": "teollisuus",
            "silos": "siilo",
            "ski-lifts": "hiihtohissi",
            "landfills": "kaatopaikka",
            "castles": "linna",
            "vehicles": "kulkuväline",
            "trenches": "juoksuhauta",
            "memorial": "muistomerkki",
            "historic-sites": "historiallinen paikka",
            "bridges": "silta",
            "skating-rinks": "luistelukenttä",
            "amusement-parks": "huvipuisto",
            "airports": "lentokenttä",
            "catacombs": "katakombi",
            "railways": "rautatie",
            "smokestacks": "piippu",
            "towers": "torni",
            "prisons": "vankila",
            "harbours": "satama",
            "military": "sotilaallinen kohde",
            "other": "jokin muu",
            "unknown": "ei tiedossa"
        };
    
    var bikingTexts = [];
    bikingTexts["en"] = "biking";
    bikingTexts["fi"] = "pyöräily";
    
    var bikeTrackValueTexts = [];
    bikeTrackValueTexts["en"] =
        {
            "track-city": "in city",
            "track-road": "on roads",
            "track-trail": "on a trail",
            "track-nature": "in the nature",
            "indoor": "indoors",
            "outdoor": "outdoors",
            "underground": "underground"
        };
    bikeTrackValueTexts["fi"] =
        {
            "track-city": "kaupungissa",
            "track-road": "maanteillä",
            "track-trail": "poluilla",
            "track-nature": "luonnossa",
            "indoor": "sisällä",
            "outdoor": "ulkona",
            "underground": "maan alla"
        };
    
    var bikeTypeValueTexts = [];
    bikeTypeValueTexts["en"] =
        {
            "bike-city": "on a city bike",
            "bike-road": "on a road bike",
            "bike-mountain": "on an MTB",
            "bike-unicycle": "on an unicycle",
            "bike-tandem": "on a tandem bike",
            "bike-tricycle": "on a tricycle",
            "bike-other": "on special bike type"
        };
    bikeTypeValueTexts["fi"] =
        {
            "bike-city": "kaupunkipyörällä",
            "bike-road": "maantiepyörällä",
            "bike-mountain": "maastopyörällä",
            "bike-unicycle": "yksipyöräisellä",
            "bike-tandem": "tandem-pyörällä",
            "bike-tricycle": "kolmipyöräisellä",
            "bike-other": "erikoispyörällä"
        };

    var saunaTypeTexts = [];
    saunaTypeTexts["en"] = "sauna type";
    saunaTypeTexts["fi"] = "saunatyyppi";
    
    var saunaTypeValueTexts = [];
    saunaTypeValueTexts["en"] =
        {
            "normal": "Finnish sauna",
            "smoke": "smoke sauna",
            "steam": "Turkish sauna",
            "infrared": "infrared sauna",
            "unknown": "unknown"
        };
    saunaTypeValueTexts["fi"] =
        {
            "normal": "suomalainen",
            "smoke": "savusauna",
            "steam": "höyrysauna",
            "infrared": "infrapuna",
            "unknown": "ei tiedossa"
        };

    var locationSecretTexts = [];
    locationSecretTexts["en"] = "exact location secret";
    locationSecretTexts["fi"] = "tarkka sijainti salainen";

    var sizeTexts = [];
    sizeTexts["en"] = "size";
    sizeTexts["fi"] = "koko";
    
    var mainCaveTexts = [];
    mainCaveTexts["en"] = "main cave";
    mainCaveTexts["fi"] = "pääluola";

    var sideCaveTexts = [];
    sideCaveTexts["en"] = "side cave";
    sideCaveTexts["fi"] = "sivuluola";

    var sideCavesTexts = [];
    sideCavesTexts["en"] = "side caves";
    sideCavesTexts["fi"] = "sivuluolaa";

    var otherTexts = [];
    otherTexts["en"] = "other";
    otherTexts["fi"] = "muuta";

    var articleTexts = [];
    articleTexts["en"] = "article";
    articleTexts["fi"] = "artikkeli";

    var articlesTexts = [];
    articlesTexts["en"] = "articles";
    articlesTexts["fi"] = "artikkelia";

    var noArticleYetTexts = [];
    noArticleYetTexts["en"] = "no articles yet";
    noArticleYetTexts["fi"] = "ei vielä artikkeleita";

    var publicationReferenceTexts = [];
    publicationReferenceTexts["en"] = "literature reference";
    publicationReferenceTexts["fi"] = "kirjallisuusviite";

    var publicationTexts = [];
    publicationTexts["en"] = "book";
    publicationTexts["fi"] = "kirja";

    var inPublicationTexts = [];
    inPublicationTexts["en"] = "in book";
    inPublicationTexts["fi"] = "kirjassa";
    
    var placesTexts = [];
    placesTexts["en"] = "places";
    placesTexts["fi"] = "paikkaa";

    var cityTexts = [];
    cityTexts["en"] = "city";
    cityTexts["fi"] = "kaupunki";

    var countryTexts = [];
    countryTexts["en"] = "country";
    countryTexts["fi"] = "maa";
    
    var citiesTexts = [];
    citiesTexts["en"] = "cities";
    citiesTexts["fi"] = "paikkakuntaa";

    var countriesTexts = [];
    countriesTexts["en"] = "countries";
    countriesTexts["fi"] = "maata";

    var continentsTexts = [];
    continentsTexts["en"] = "continents";
    continentsTexts["fi"] = "maanosaa";
    
    var statesTexts = [];
    statesTexts["en"] = "US states";
    statesTexts["fi"] = "USA:n osavaltiota";

    var provincesTexts = [];
    provincesTexts["en"] = "CA provinces";
    provincesTexts["fi"] = "Kanadan provinssia";

    var caveTexts = [];
    caveTexts["en"] = "cave";
    caveTexts["fi"] = "luola";
    
    var caveMapsTexts = [];
    caveMapsTexts["en"] = "cave maps";
    caveMapsTexts["fi"] = "karttaa"; // < luolakarttaa
    
    var withCavemapTexts = [];
    withCavemapTexts["en"] = "with cave map";
    withCavemapTexts["fi"] = "luolakartalliset";
    
    var sourceTexts = [];
    sourceTexts["en"] = "source";
    sourceTexts["fi"] = "lähde";

    var sourcesTexts = [];
    sourcesTexts["en"] = "sources";
    sourcesTexts["fi"] = "lähteet";

    var filterTextsHeader = [];		// used as header in filter window
    filterTextsHeader["en"] = "filter";
    filterTextsHeader["fi"] = "suodata";

    var filterTextsLink = [];		// used as button text to open filter window
    filterTextsLink["en"] = "filter";
    filterTextsLink["fi"] = "suodata";
    
    var moreFiltersTexts = [];
    moreFiltersTexts["en"] = "more filters";
    moreFiltersTexts["fi"] = "lisää suodattimia";
    
    var filterByNameTexts = [];
    filterByNameTexts["en"] = "filter by name";
    filterByNameTexts["fi"] = "suodata nimen perusteella";
    
    var filterByRockTypeTexts = [];
    filterByRockTypeTexts["en"] = "filter by material";
    filterByRockTypeTexts["fi"] = "suodata materiaalin perusteella";
    
    var filterByMaterialTypeTexts = [];
    filterByMaterialTypeTexts["en"] = "filter by material type";
    filterByMaterialTypeTexts["fi"] = "suodata materiaalin perusteella";
    
    var filterByMorphologyTexts = [];
    filterByMorphologyTexts["en"] = "filter by cave type";
    filterByMorphologyTexts["fi"] = "suodata tyypin perusteella";
    
    var filterBySourceTexts = [];
    filterBySourceTexts["en"] = "filter by source";
    filterBySourceTexts["fi"] = "suodata lähteen perusteella";
    
    var otherTexts = [];
    otherTexts["en"] = "other";
    otherTexts["fi"] = "muuta";

    var andTexts = [];
    andTexts["en"] = "and";
    andTexts["fi"] = "ja";
    
    var onlyFinlandTexts = [];
    onlyFinlandTexts["en"] = "only Finland";
    onlyFinlandTexts["fi"] = "vain Suomi";

    var finnishTerrainTextsLong = [];
    finnishTerrainTextsLong["en"] = "Finnish terrain";
    finnishTerrainTextsLong["fi"] = "Suomen maasto";

    var finnishTerrainTextsShort = [];
    finnishTerrainTextsShort["en"] = "Terrain";
    finnishTerrainTextsShort["fi"] = "Maasto";

    var caveClassificationTexts = [];
    caveClassificationTexts["en"] = "cave classification";
    caveClassificationTexts["fi"] = "luolien luokittelu";
    
    var coordinatesTexts = [];
    coordinatesTexts["en"] = "coordinates";
    coordinatesTexts["fi"] = "koordinaatit";

    var alternativeNamesTexts = [];
    alternativeNamesTexts["en"] = "other names";
    alternativeNamesTexts["fi"] = "muita nimiä";

    var alternativeCoordinatesTexts = [];
    alternativeCoordinatesTexts["en"] = "other reported coordinates";
    alternativeCoordinatesTexts["fi"] = "muita ilmoitettuja koordinaatteja";

    var offTexts = [];
    offTexts["en"] = "off";
    offTexts["fi"] = "etäisyydellä";

    var addTexts = [];
    addTexts["en"] = "add";
    addTexts["fi"] = "lisää";

    var orModifyTexts = [];
    orModifyTexts["en"] = "or modify";
    orModifyTexts["fi"] = "tai korjaa";
    
    var aboutTexts = [];
    aboutTexts["en"] = "about";
    aboutTexts["fi"] = "tietoja";

    var moreMapsTexts = [];
    moreMapsTexts["en"] = "more maps";
    moreMapsTexts["fi"] = "lisää karttoja";

    var moreTexts = [];
    moreTexts["en"] = "more";
    moreTexts["fi"] = "lisää";

    var toolsAndAboutTexts = [];
    toolsAndAboutTexts["en"] = "tools & about";
    toolsAndAboutTexts["fi"] = "työkalut & tiedot";
    
    var settingsTexts = [];
    settingsTexts["en"] = "more information and settings";
    settingsTexts["fi"] = "lisäasetukset ja -tiedot";
    
    var moreInformationTexts = [];
    moreInformationTexts["en"] = "more information and tools";
    moreInformationTexts["fi"] = "lisätiedot ja -työkalut";
    
    var moreToReadTexts = [];
    moreToReadTexts["en"] = "reading list";
    moreToReadTexts["fi"] = "luettavaa";

    var videoTexts = [];
    videoTexts["en"] = "video";
    videoTexts["fi"] = "video";
    
    var warningsAndDisclaimersTexts = [];
    warningsAndDisclaimersTexts["en"] = "warnings and disclaimers";
    warningsAndDisclaimersTexts["fi"] = "varoitukset ja vastuun rajoitukset";

    var toolsExplanationTexts = [];
    toolsExplanationTexts["en"] = "these tools have been found to be very useful for further research";
    toolsExplanationTexts["fi"] = "nämä työkalut on todettu erittäin hyödylliseksi uusien paikkojen tutkimisessa";

    var openInNewWindowTexts = [];
    openInNewWindowTexts["en"] = "the tools open in a new, separate window (centered at the same map location as you are browsing now, where technically possible)";
    openInNewWindowTexts["fi"] = "nämä työkalut avautuvat uudessa, erillisessä ikkunassa (keskitettynä samaan kohtaan kartalla, jos se on mahdollista)";

    var dataExplanationCavingAssociationTexts = [];
    dataExplanationCavingAssociationTexts["en"] =
        'This service provides the cave data from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service. Map data is by Google and Karttapaikka.';
    dataExplanationCavingAssociationTexts["fi"] =
        'Tällä palvelimella näytettävät tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa. Karttatieto on peräisin Googlen ja Karttapaikan palveluista.';

    var dataExplanationTexts = [];
    dataExplanationTexts["en"] = "This server employs a dataset by Jari Arkko at ";
    dataExplanationTexts["fi"] = "Tällä palvelimella näytetään Jari Arkon tietokannan tietoja palvelimelta ";
    
    var libraryExplanationTexts = [];
    libraryExplanationTexts["en"] =
        'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>, an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">format</a> about places, actions, and articles describing them.';
    libraryExplanationTexts["fi"] =
        'Palvelin ajaa <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon suodatuksen pohjauten alla olevaan <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">semanttiseen tietoon</a> paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä.';
   
    var developersExplanationTexts = [];
    developersExplanationTexts["en"] =
        "Psgeo has been developed by Jari Arkko, with help from Ralf Strandell and Jarmo Ruuth.";
    developersExplanationTexts["fi"] =
        "Psgeo:ta on kehittänyt lähinnä Jari Arkko, mutta myös Ralf Strandell ja Jarmo Ruuth ovat auttaneet sen kehittämisessä.";
    
    var dataDistinctExplanationTexts = [];
    dataDistinctExplanationTexts["en"] =
        "Note that the software library is distinct from any data that is displayed with it. The authors of Psgeo shall not be held responsible for any data displayed with it.";
    dataDistinctExplanationTexts["fi"] =
        "Psgeo pelkkä ohjelmistokirjasto, eikä sinänsä liity mitenkään tietoihin joita sen avulla esitetään. Psgeo:n ohjelmiston kirjoittajat eivät ole mitenkään vastuussa tiedosta, jota kirjastolla esitetään.";
    
    var dangerousExplanationTexts = [];
    dangerousExplanationTexts["en"] =
        "Also, neither the software authors or data providers are responsible for possible accidents resulting in attempting to go there. MOST LOCATIONS SHOWN WITH THIS TOOL ARE DANGEROUS!";
    dangerousExplanationTexts["fi"] =
        "Ohjelmiston kirjoittajat tai sillä esitettävän tiedon kerääjät eivät myöskään ole vastuussa onnettomuksista joita saattaa sattua, mikäli esitetyissä kohteissa vieraillaan. NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA!";
    
    var retkipaikkaToolNameTexts = [];
    retkipaikkaToolNameTexts["en"] = "Retkipaikka & Matkailukartta";
    retkipaikkaToolNameTexts["fi"] = "Retkipaikka & Matkailukartta";

    var retkipaikkaToolDescriptionTexts = [];
    retkipaikkaToolDescriptionTexts["en"] =
        "Retkipaikka and Matkailukartta have a map that covers probably the largest set of Finnish natural sights, from beautiful sights on mountaintops to caves and boulders.";
    retkipaikkaToolDescriptionTexts["fi"] =
        "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan, vaeltajien itsensä kertomana ja raportoimana. Mukana ovat niin vuorenhuiput, näköalat kuin luolat ja lohkareetkin.";

    var ruuthToolNameTexts = [];
    ruuthToolNameTexts["en"] = "Jarmo Ruuth's map";
    ruuthToolNameTexts["fi"] = "Jarmo Ruuthin kartta";

    var ruuthToolDescriptionTexts = [];
    ruuthToolDescriptionTexts["en"] =
        "This tool shows everything, from historic artefact database to known caves, occupation-era aearial maps, etc. Best tool for trying to find new caves.";
    ruuthToolDescriptionTexts["fi"] =
        "Tämä työkalu näyttää kaiken! Muinaismuistojen löytöpaikat, tunnetut luolat, Porkkalan valloituksen aikaiset ilmakuvat, jne. Paras työkalu uusien luolien löytämiseen.";

    var hakkuToolNameTexts = [];
    hakkuToolNameTexts["en"] = "National Geology Institute's Hakku Server";
    hakkuToolNameTexts["fi"] = "GTK:n hakku-palvelu";

    var hakkuToolDescriptionTexts = [];
    hakkuToolDescriptionTexts["en"] =
        "This tool has a ton of open data, e.g., about known boulders, type of ground rock in different areas, etc.";
    hakkuToolDescriptionTexts["fi"] =
        "Tästä työkalusta löytyy valtavasti tietoa, esimerkiksi siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne.";

    var laserToolNameTexts = [];
    laserToolNameTexts["en"] = "MML laser scan";
    laserToolNameTexts["fi"] = "MML:n laser-mittaukset";

    var laserToolDescriptionTexts = [];
    laserToolDescriptionTexts["en"] =
        "The Finnish Surveying Institute's laser-scanned terrain forms. Very useful for finding sharp changes in terrain forms.";
    laserToolDescriptionTexts["fi"] =
        "Maanmittauslaitoksen laser-mitatut maanpinnan muodot. Erittäin hyödyllinen terävien pinnanmuodon muutosten löytämiseen.";

    var nimisampoToolNameTexts = [];
    nimisampoToolNameTexts["en"] = "Nimisampo - Placename research tool";
    nimisampoToolNameTexts["fi"] = "Nimisampo - Nimistötutkijan työpöytä";

    var nimisampoToolDescriptionTexts = [];
    nimisampoNameTexts["en"] =
        "Nimisampo is a tool for place name research. It it meant both for academia and the general public. Interesting names: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. And in Swedish: grotta (and probably others).";
    nimisampoToolDescriptionTexts["fi"] =
        "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja suuren yleisön käytettäväksi. Nimistöä: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. Myös ruotsiksi: grotta (varmaan muitakin).";
    
    function genText(tab) {
        if (typeof tab[language] !== "string") {
            language = "en";
        }
        return(tab[language])
    }
    
    function gen2Text(tab1,value,tab2) {
        if (typeof tab1[language] !== "string" ||
            typeof tab2[language] !== "string") {
            language = "en";
        }
        return(tab1[language] + value + tab2[language]);
    }
    
    function gen3Text(tab1,value1,tab2,value2,tab3) {
        if (typeof tab1[language] !== "string" ||
            typeof tab2[language] !== "string" ||
            typeof tab3[language] !== "string") {
            language = "en";
        }
        return(tab1[language] + value1 + tab2[language] + value2 + tab3[language]);
    }
    
    function genValueText(value,tab) {
        if (tab[language] === undefined) {
            language = "en";
        }
        var prelValue = tab[language][value];
        if (prelValue === undefined) {
            return("unrecognized");
        }
        return(prelValue);
    }
    
     function mapText() {
        return(genText(mapTexts));
    }
    
    function caveMapText() {
        return(genText(caveMapTexts));
    }
    
    function locationSecretText() {
        return(genText(locationSecretTexts));
    }
    
    function otherText() {
        return(genText(otherTexts));
    }
    
    function noArticleYetText() {
        return(genText(noArticleYetTexts));
    }
    
    function articleText() {
        return(genText(articleTexts));
    }
    
    function articlesText() {
        return(genText(articlesTexts));
    }
    
    function publicationText() {
        return(genText(publicationTexts));
    }
    
    function publicationReferenceText() {
        return(genText(publicationReferenceTexts));
    }
    
    function inPublicationText() {
        return(genText(inPublicationTexts));
    }
    
    function placesText() {
        return(genText(placesTexts));
    }

    function cityText() {
        return(genText(cityTexts));
    }
    
    function countryText() {
        return(genText(countryTexts));
    }
    
    function citiesText() {
        return(genText(citiesTexts));
    }
    
    function countriesText() {
        return(genText(countriesTexts));
    }
    
    function continentsText() {
        return(genText(continentsTexts));
    }
    
    function statesText() {
        return(genText(statesTexts));
    }
    
    function provincesText() {
        return(genText(provincesTexts));
    }
    
    function caveMapsText() {
        return(genText(caveMapsTexts));
    }

    function sizeText() {
        return(genText(sizeTexts));
    }
    
    function caveText() {
        return(genText(caveTexts));
    }

    function cavesText() {
        return(genText(cavesTexts));
    }
    
    function mediumCavesText(size1,size2,needShort) {
        if (needShort) {
            return(gen3Text(mediumCavesTexts1Short,
                            size1.toString(),
                            mediumCavesTexts2Short,
                            size2.toString(),
                            mediumCavesTexts3Short));
        } else {
            return(gen3Text(mediumCavesTexts1,
                            size1.toString(),
                            mediumCavesTexts2,
                            size2.toString(),
                            mediumCavesTexts3));
        }
    }
    
    function bigCavesText(size,needShort) {
        if (needShort) {
            return(gen2Text(bigCavesTexts1Short,size.toString(),bigCavesTexts2Short));
        } else {
            return(gen2Text(bigCavesTexts1,size.toString(),bigCavesTexts2));
        }
    }
    
    function caveletsText(size,needShort) {
        if (needShort) {
            return(gen2Text(caveletsTexts1Short,size.toString(),caveletsTexts2Short));
        } else {
            return(gen2Text(caveletsTexts1,size.toString(),caveletsTexts2));
        }
    }
    
    function sourceText() {
        return(genText(sourceTexts));
    }
    
    function sourcesText() {
        return(genText(sourcesTexts));
    }

    function filterTextHeader() {
        return(genText(filterTextsHeader));
    }
    
    function filterTextLink() {
        return(genText(filterTextsLink));
    }
    
    function moreFiltersText() {
        return(genText(moreFiltersTexts));
    }
    
    function filterByNameText() {
        return(genText(filterByNameTexts));
    }
    
    function filterByRockTypeText() {
        return(genText(filterByRockTypeTexts));
    }
    
    function filterByMaterialTypeText() {
        return(genText(filterByMaterialTypeTexts));
    }
    
    function filterByMorphologyText() {
        return(genText(filterByMorphologyTexts));
    }
    
    function filterBySourceText() {
        return(genText(filterBySourceTexts));
    }
    
    function withCavemapText(size) {
        return(genText(withCavemapTexts));
    }
    
    function mainCaveText(size) {
        return(genText(mainCaveTexts));
    }
    
    function sideCaveText(size) {
        return(genText(sideCaveTexts));
    }
    
    function sideCavesText(size) {
        return(genText(sideCavesTexts));
    }
    
    function otherText(size) {
        return(genText(otherTexts));
    }
    
    function onlyFinlandText(size) {
        return(genText(onlyFinlandTexts));
    }

    function andText() {
        return(genText(andTexts));
    }
    
    function finnishTerrainText(needShort) {
        if (needShort) {
            return(genText(finnishTerrainTextsShort));
        } else {
            return(genText(finnishTerrainTextsLong));
        }
    }

	// IDEA
	function Text(text-id) {

		if ( text-id === undefined || text-id == "" ) {
			psgeoDebug("Error: a text string was requested from function Text, but there is no text-id!");
			// FAIL. HOW?	
		}

		switch (text-in) {
			case "coordinates": return(genText(caveClassificationTexts));
			default:
		}
	}
	// IDEA

// TEXTS BEGIN
    function  caveClassificationText() {
        return(genText(caveClassificationTexts));
    }
    
    function coordinatesText() {
        return(genText(coordinatesTexts));
    }

    function alternativeNamesText() {
        return(genText(alternativeNamesTexts));
    }
    
    function alternativeCoordinatesText() {
        return(genText(alternativeCoordinatesTexts));
    }
    
    function offText() {
        return(genText(offTexts));
    }

    function addText() {
        return(genText(addTexts));
    }
    
    function orModifyText() {
        return(genText(orModifyTexts));
    }
    
    function moreMapsText() {
        return(genText(moreMapsTexts));
    }

    function settingsText() {
        return(genText(settingsTexts));
    }
    
    function moreInformationText() {
        return(genText(moreInformationTexts));
    }
    
    function moreText() {
        return(genText(moreTexts));
    }

    function toolsAndAboutText() {
        return(genText(toolsAndAboutTexts));
    }
    
    function moreToReadText() {
        return(genText(moreToReadTexts));
    }

    function videoText() {
        return(genText(videoTexts));
    }
    
    function warningsAndDisclaimersText() {
        return(genText(warningsAndDisclaimersTexts));
    }
    
    function openInNewWindowText() {
        return(genText(openInNewWindowTexts));
    }

    function toolsExplanationText() {
        return(genText(toolsExplanationTexts));
    }

    function dimensionsText() {
        return(genText(dimensionsTexts));
    }

    function literatureCaveIdText() {
        return(genText(literatureCaveIdTexts));
    }
    
    function lengthText() {
        return(genText(lengthTexts));
    }
    
    function lengthCategoryText() {
        return(genText(lengthCategoryTexts));
    }

    function manmadeText() {
        return(genText(manmadeTexts));
    }
    
    function iceText() {
        return(genText(iceTexts));
    }
    
    function ballsText() {
        return(genText(ballsTexts));
    }
    
    function otherMaterialText() {
        return(genText(otherMaterialTexts));
    }
    
    function nameText() {
        return(genText(nameTexts));
    }
    
    function rockText() {
        return(genText(rockTexts));
    }
    
    function rockTypeText() {
        return(genText(rockTypeTexts));
    }

    function rockTypeAndOtherMaterialValueText(value) {
        if (value == "ice") return(iceText());
        else if (value == "other-material") return(otherMaterialText());
        else return(rockTypeValueText(value));
    }
    
    function rockTypeValueText(value) {
        return(genValueText(value,rockTypeValueTexts));
    }
    
    function morphologyText() {
        return(genText(morphologyTexts));
    }
    
    function morphologyValueText(value) {
        return(genValueText(value,morphologyValueTexts));
    }

    function swimmingText() {
        return(genText(swimmingTexts));
    }

    function waterbodyText() {
        return(genText(waterbodyTexts));
    }
    
    function swimmingPlaceValueText(value) {
        return(genValueText(value,swimmingPlaceValueTexts));
    }
    
    function swimmingMaterialValueText(value) {
        return(genValueText(value,swimmingMaterialValueTexts));
    }
    
    function skiText() {
        return(genText(skiTexts));
    }
    
    function indoorText() {
        return(genText(indoorTexts));
    }
    
    function outdoorText() {
        return(genText(outdoorTexts));
    }

    function skiMaterialText() {
        return(genText(skiMaterialTexts));
    }
    
    function skiMaterialValueText(value) {
        return(genValueText(value,skiMaterialValueTexts));
    }

    function targetText() {
        return(genText(targetTexts));
    }

    function urbanexTargetText() {
        return(genText(urbanexTargetTexts));
    }
    
    function urbanexTargetValueText(value) {
        return(genValueText(value,urbanexTargetValueTexts));
    }
    
    function bikingText() {
        return(genText(bikingTexts));
    }
    
    function bikeTrackValueText(value) {
        return(genValueText(value,bikeTrackValueTexts));
    }
    
    function bikeTypeValueText(value) {
        return(genValueText(value,bikeTypeValueTexts));
    }

    function saunaTypeText() {
        return(genText(saunaTypeTexts));
    }
    
    function saunaTypeValueText(value) {
        return(genValueText(value,saunaTypeValueTexts));
    }
    
    function activityText() {
        return(genText(activityTexts));
    }
    
    function cavingActivityValueText(value) {
        return(genValueText(value,cavingActivityValueTexts));
    }
    
    function aboutText() {
        return(genText(aboutTexts));
    }

    function dataExplanationText()  {
        return(genText(dataExplanationTexts));
    }
    
    function dataExplanationCavingAssociationText() {
        return(genText(dataExplanationCavingAssociationTexts));
    }
    
    function libraryExplanationText() {
        return(genText(libraryExplanationTexts));
    }
    
    function developersExplanationText() {
        return(genText(developersExplanationTexts));
    }
    
    function dataDistinctExplanationText() {
        return(genText(dataDistinctExplanationTexts));
    }
    
    function dangerousExplanationText() {
        return(genText(dangerousExplanationTexts));
    }
    
    function retkipaikkaToolNameText() {
        return(genText(retkipaikkaToolNameTexts));
    }
    
    function retkipaikkaToolDescriptionText() {
        return(genText(retkipaikkaToolDescriptionTexts));
    }
    
    function ruuthToolNameText() {
        return(genText(ruuthToolNameTexts));
    }
    
    function ruuthToolDescriptionText() {
        return(genText(ruuthToolDescriptionTexts));
    }
    
    function hakkuToolNameText() {
        return(genText(hakkuToolNameTexts));
    }
    
    function hakkuToolDescriptionText() {
        return(genText(hakkuToolDescriptionTexts));
    }
    
    function laserToolNameText() {
        return(genText(laserToolNameTexts));
    }
    
    function laserToolDescriptionText() {
        return(genText(laserToolDescriptionTexts));
    }

    function nimisampoToolNameText() {
        return(genText(nimisampoToolNameTexts));
    }
    
    function nimisampoToolDescriptionText() {
        return(genText(nimisampoToolDescriptionTexts));
    }

    function listToText(list) {
        if (list.length == 0) {
            return("");
        } else if (list.length == 1) {
            return(list[0]);
        } else if (list.length == 2) {
            return(list[0] + " " + andText() + " " + list[1]);
        } else {
            var result = "";
            for (var i = 0; i < list.length - 1; i++) {
                if (i > 0) {
                    result += ", ";
                }
                result += list[i];
            }
            result += ", ";
            result += andText();
            result += " ";
            result += list[list.length-1];
            return(result);
        }
    }
    
    function capitalize(string) {
        if (string.length > 0) {
            return(string[0].toUpperCase() + string.slice(1));
        } else {
            return(string);
        }
    }
    
    function numberAlign(n,nchars) {
        var ns = "" + n;
        while (ns.length < nchars) {
	    ns = " " + ns;
        }
        return(ns);
    }

    function getLanguage() {
        return(language);
    }
    
    return({
        getLanguage: getLanguage,
        mapText: mapText,
        caveMapText: caveMapText,
        cavesText: cavesText,
        caveletsText: caveletsText,
        mediumCavesText: mediumCavesText,
        bigCavesText: bigCavesText,
        lengthText: lengthText,
        lengthCategoryText: lengthCategoryText,
        manmadeText: manmadeText,
        iceText: iceText,
        ballsText: ballsText,
        otherMaterialText: otherMaterialText,
        nameText: nameText,
        rockText: rockText,
        rockTypeText: rockTypeText,
        rockTypeValueText: rockTypeValueText,
        rockTypeAndOtherMaterialValueText: rockTypeAndOtherMaterialValueText,
        morphologyText: morphologyText,
        morphologyValueText: morphologyValueText,
        activityText: activityText,
        cavingActivityValueText: cavingActivityValueText,
        locationSecretText: locationSecretText,
        noArticleYetText: noArticleYetText,
        articleText: articleText,
        articlesText: articlesText,
        publicationText: publicationText,
        publicationReferenceText: publicationReferenceText,
        inPublicationText: inPublicationText,
        otherText: otherText,
        placesText: placesText,
        cityText: cityText,
        countryText: countryText,
        citiesText: citiesText,
        countriesText: countriesText,
        continentsText: continentsText,
        statesText: statesText,
        provincesText: provincesText,
        caveMapsText: caveMapsText,
        sizeText: sizeText,
        caveText: caveText,
        mainCaveText: mainCaveText,
        sideCaveText: sideCaveText,
        sideCavesText: sideCavesText,
        sourceText: sourceText,
        sourcesText: sourcesText,
        filterTextHeader: filterTextHeader,
        filterTextLink: filterTextLink,
        moreFiltersText: moreFiltersText,
        filterByNameText: filterByNameText,
        filterByRockTypeText: filterByRockTypeText,
        filterByMaterialTypeText: filterByMaterialTypeText,
        filterByMorphologyText: filterByMorphologyText,
        filterBySourceText: filterBySourceText,
        withCavemapText: withCavemapText,
        andText: andText,
        otherText: otherText,
        onlyFinlandText: onlyFinlandText,
        finnishTerrainText: finnishTerrainText,
        caveClassificationText: caveClassificationText,
        moreMapsText: moreMapsText,
        settingsText: settingsText,
        moreInformationText: moreInformationText,
        moreText: moreText,
        toolsAndAboutText: toolsAndAboutText,
        moreToReadText: moreToReadText,
        videoText: videoText,
        dataExplanationText: dataExplanationText,
        dataExplanationCavingAssociationText: dataExplanationCavingAssociationText,
        libraryExplanationText: libraryExplanationText,
        developersExplanationText: developersExplanationText,
        warningsAndDisclaimersText: warningsAndDisclaimersText,
        dataDistinctExplanationText: dataDistinctExplanationText,
        dangerousExplanationText: dangerousExplanationText,
        openInNewWindowText: openInNewWindowText,
        toolsExplanationText: toolsExplanationText,
        retkipaikkaToolNameText: retkipaikkaToolNameText,
        retkipaikkaToolDescriptionText: retkipaikkaToolDescriptionText,
        ruuthToolNameText: ruuthToolNameText,
        ruuthToolDescriptionText: ruuthToolDescriptionText,
        hakkuToolNameText: hakkuToolNameText,
        hakkuToolDescriptionText: hakkuToolDescriptionText,
        laserToolNameText: laserToolNameText,
        laserToolDescriptionText: laserToolDescriptionText,
        nimisampoToolNameText: nimisampoToolNameText,
        nimisampoToolDescriptionText: nimisampoToolDescriptionText,
        coordinatesText: coordinatesText,
        alternativeNamesText: alternativeNamesText,
        alternativeCoordinatesText: alternativeCoordinatesText,
        dimensionsText: dimensionsText,
        literatureCaveIdText: literatureCaveIdText,
        swimmingText: swimmingText,
        waterbodyText: waterbodyText,
        swimmingPlaceValueText: swimmingPlaceValueText,
        swimmingMaterialValueText: swimmingMaterialValueText,
        skiText: skiText,
        indoorText: indoorText,
        outdoorText: outdoorText,
        skiMaterialText: skiMaterialText,
        skiMaterialValueText: skiMaterialValueText,
        targetText: targetText,
        urbanexTargetValueText: urbanexTargetValueText,
        urbanexTargetText: urbanexTargetText,
        bikingText: bikingText,
        bikeTypeValueText: bikeTypeValueText,
        bikeTrackValueText: bikeTrackValueText,
        saunaTypeText: saunaTypeText,
        saunaTypeValueText: saunaTypeValueText,
        addText: addText,
        orModifyText: orModifyText,
        offText: offText,
        aboutText: aboutText,
        listToText: listToText,
        capitalize: capitalize,
        numberAlign: numberAlign
    });
}

