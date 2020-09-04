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
//		NEW: var citiesText=langLib.getText("cities");

function PsgeoLang(language) {

    // VARIABLES BEGIN

    var mapTexts = [];
    mapTexts["en"] = "map";
    mapTexts["fi"] = "kartta";
 
    var caveMapTexts = [];
    caveMapTexts["en"] = "cave map";
    caveMapTexts["fi"] = "luolakartta";

    var cavesTexts = [];
    cavesTexts["en"] = "caves";
    cavesTexts["fi"] = "luolaa";
    
    var mediumCavesTexts = [];
    mediumCavesTexts["en"] = "caves ({{string1}}..{{string2}}m)";
    mediumCavesTexts["fi"] = "luolat ({{string1}}..{{string2}}m)";

    var mediumCavesTextsShort = [];
    mediumCavesTextsShort["en"] = "{{string1}}..{{string2}}m";
    mediumCavesTextsShort["fi"] = "{{string1}}..{{string2}}m";

    var caveletsTexts = [];
    caveletsTexts["en"] = "cavelets (under {{string1}} m)";
    caveletsTexts["fi"] = "luolaset (alle {{string1}} m)";

    var caveletsTextsShort = [];
    caveletsTextsShort["en"] = "<{{string1}}m";
    caveletsTextsShort["fi"] = "<{{string1}}m";

    var bigCavesTexts = [];
    bigCavesTexts["en"] = "big caves (over {{string1}} m)";
    bigCavesTexts["fi"] = "isot luolat (yli {{string1}} m)";

    var bigCavesTextsShort = [];
    bigCavesTextsShort["en"] = ">{{string1}}m";
    bigCavesTextsShort["fi"] = ">{{string1}}m";

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
        "rock-limestone": "limestone/dolomite",
	"rock-gypsum": "gypsum",
	"rock-salt": "salt",
        "rock-marble": "marble",
        "rock-granite": "non-volcanic, non-sedimentary",
        "rock-other": "other rock",
        "rock-unknown": "unknown"
    };
    rockTypeValueTexts["fi"] = {
        "rock-volcanic": "vulkaaninen",
        "rock-sandstone": "hiekkakivi",
        "rock-mudrock": "savikivi",
        "rock-limestone": "kalkkikivi/dolomiitti",
        "rock-gypsum": "kipsi",	
	"rock-salt": "suola",
        "rock-marble": "marmori",
        "rock-granite": "muu kivi kuin vulkaaninen tai sedimentti",
        "rock-other": "muu kivi",
        "rock-unknown": "ei tiedossa"
    };
   
    var groundTypeValueTexts = [];
    groundTypeValueTexts["en"] = {
	"ice": "ice",
	"snow": "snow",	
	"sand": "sand",
	"gravel": "gravel",
	"moraine": "moraine",
	"rock": "rock",			// see rockTypes for detailed classification
	"turf": "turf",
	"other-material": "other material"
    };
    groundTypeValueTexts["fi"] = {
	"ice": "jää",
	"snow": "lumi",
	"sand": "hiekka",
	"gravel": "sora",
	"moraine": "moreeni",
	"rock": "kallio",
	"turf": "turve",
	"other-material": "other material"
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
    caveMapsTexts["fi"] = "karttaa";
    
    var withCavemapTexts = [];
    withCavemapTexts["en"] = "with cave map";
    withCavemapTexts["fi"] = "luolakartalliset";
    
    var sourceTexts = [];
    sourceTexts["en"] = "source";
    sourceTexts["fi"] = "lähde";

    var sourcesTexts = [];
    sourcesTexts["en"] = "sources";
    sourcesTexts["fi"] = "lähteet";

    var filterHeaderTexts = [];	
    filterHeaderTexts["en"] = "filter";
    filterHeaderTexts["fi"] = "suodata";

    var filterLinkTexts = [];
    filterLinkTexts["en"] = "filter";
    filterLinkTexts["fi"] = "suodata";
    
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

    var finnishTerrainTexts = [];
    finnishTerrainTexts["en"] = "Finnish terrain";
    finnishTerrainTexts["fi"] = "Suomen maasto";

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
    dataExplanationCavingAssociationTexts["en"] = 'This service provides the cave data from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service. Map data is by Google and Karttapaikka.';
    dataExplanationCavingAssociationTexts["fi"] = 'Tällä palvelimella näytettävät tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa. Karttatieto on peräisin Googlen ja Karttapaikan palveluista.';

    var dataExplanationTexts = [];
    dataExplanationTexts["en"] = "This server employs a dataset by Jari Arkko at ";
    dataExplanationTexts["fi"] = "Tällä palvelimella näytetään Jari Arkon tietokannan tietoja palvelimelta ";
    
    var libraryExplanationTexts = [];
    libraryExplanationTexts["en"] = 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>, an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">format</a> about places, actions, and articles describing them.';
    libraryExplanationTexts["fi"] = 'Palvelin ajaa <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon suodatuksen pohjauten alla olevaan <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">semanttiseen tietoon</a> paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä.';
   
    var developersExplanationTexts = [];
    developersExplanationTexts["en"] = "Psgeo has been developed by Jari Arkko, with help from Ralf Strandell and Jarmo Ruuth.";
    developersExplanationTexts["fi"] = "Psgeo:ta on kehittänyt lähinnä Jari Arkko, mutta myös Ralf Strandell ja Jarmo Ruuth ovat auttaneet sen kehittämisessä.";
    
    var dataDistinctExplanationTexts = [];
    dataDistinctExplanationTexts["en"] = "Note that the software library is distinct from any data that is displayed with it. The authors of Psgeo shall not be held responsible for any data displayed with it.";
    dataDistinctExplanationTexts["fi"] = "Psgeo pelkkä ohjelmistokirjasto, eikä sinänsä liity mitenkään tietoihin joita sen avulla esitetään. Psgeo:n ohjelmiston kirjoittajat eivät ole mitenkään vastuussa tiedosta, jota kirjastolla esitetään.";
    
    var dangerousExplanationTexts = [];
    dangerousExplanationTexts["en"] = "Also, neither the software authors or data providers are responsible for possible accidents resulting in attempting to go there. MOST LOCATIONS SHOWN WITH THIS TOOL ARE DANGEROUS!";
    dangerousExplanationTexts["fi"] = "Ohjelmiston kirjoittajat tai sillä esitettävän tiedon kerääjät eivät myöskään ole vastuussa onnettomuksista joita saattaa sattua, mikäli esitetyissä kohteissa vieraillaan. NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA!";
    
    var retkipaikkaToolNameTexts = [];
    retkipaikkaToolNameTexts["en"] = "Retkipaikka & Matkailukartta";
    retkipaikkaToolNameTexts["fi"] = "Retkipaikka & Matkailukartta";

    var retkipaikkaToolDescriptionTexts = [];
     retkipaikkaToolDescriptionTexts["en"] = "Retkipaikka and Matkailukartta have a map that covers probably the largest set of Finnish natural sights, from beautiful sights on mountaintops to caves and boulders.";
    retkipaikkaToolDescriptionTexts["fi"] = "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan, vaeltajien itsensä kertomana ja raportoimana. Mukana ovat niin vuorenhuiput, näköalat kuin luolat ja lohkareetkin.";

    var ruuthToolNameTexts = [];
    ruuthToolNameTexts["en"] = "Jarmo Ruuth's map";
    ruuthToolNameTexts["fi"] = "Jarmo Ruuthin kartta";

    var ruuthToolDescriptionTexts = [];
    ruuthToolDescriptionTexts["en"] = "This tool shows everything, from historic artefact database to known caves, occupation-era aearial maps, etc. Best tool for trying to find new caves.";
    ruuthToolDescriptionTexts["fi"] = "Tämä työkalu näyttää kaiken! Muinaismuistojen löytöpaikat, tunnetut luolat, Porkkalan valloituksen aikaiset ilmakuvat, jne. Paras työkalu uusien luolien löytämiseen.";

    var hakkuToolNameTexts = [];
    hakkuToolNameTexts["en"] = "National Geology Institute's Hakku Server";
    hakkuToolNameTexts["fi"] = "GTK:n hakku-palvelu";

    var hakkuToolDescriptionTexts = [];
    hakkuToolDescriptionTexts["en"] = "This tool has a ton of open data, e.g., about known boulders, type of ground rock in different areas, etc.";
    hakkuToolDescriptionTexts["fi"] = "Tästä työkalusta löytyy valtavasti tietoa, esimerkiksi siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne.";

    var laserToolNameTexts = [];
    laserToolNameTexts["en"] = "MML laser scan";
    laserToolNameTexts["fi"] = "MML:n laser-mittaukset";

    var laserToolDescriptionTexts = [];
    laserToolDescriptionTexts["en"] = "The Finnish Surveying Institute's laser-scanned terrain forms. Very useful for finding sharp changes in terrain forms.";
    laserToolDescriptionTexts["fi"] = "Maanmittauslaitoksen laser-mitatut maanpinnan muodot. Erittäin hyödyllinen terävien pinnanmuodon muutosten löytämiseen.";

    var nimisampoToolNameTexts = [];
    nimisampoToolNameTexts["en"] = "Nimisampo - Placename research tool";
    nimisampoToolNameTexts["fi"] = "Nimisampo - Nimistötutkijan työpöytä";

    var nimisampoToolDescriptionTexts = [];
    nimisampoToolDescriptionTexts["en"] = "Nimisampo is a tool for place name research. It it meant both for academia and the general public. Interesting names: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. And in Swedish: grotta (and probably others).";
    nimisampoToolDescriptionTexts["fi"] = "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja suuren yleisön käytettäväksi. Nimistöä: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. Myös ruotsiksi: grotta (varmaan muitakin).";


// END OF TRANSLATION ARRAYS



// COULD BE COMBINED -- TEMPORARY ---> 
//    function rockTypeAndOtherMaterialValueText(value) {
//        if (value == "ice") return(genText(iceTexts));
//        else if (value == "other-material") return(genText(otherMaterialTexts));
//        else return(getTextCollectionItem("rockType",value));
//    	}
//    function morphologyValueText(value) {
//        return(genValueText(value,morphologyValueTexts));
//	}
// <--- TEMPORARY


//	INTERNAL FUNCTIONS BEGIN


	function genText(tab) {
	// return a string from translation array {tab} in current language,
	// 	or in english if the translation is missing.
	// 	Example: genText(andTexts) returns "and" by default, or "ja" if language=finnish
	//	Note: lang.getText("and") calls genText(andTexts) and returns either andTexts["fi"]="ja" or andTexts["en"]="and"

	psgeoDebug("Language: " + language + " and tab: " + tab );
	if (typeof tab[language] !== "string") {
		psgeoDebug("Error: textId " + tab + " (language " + language + ") text is not a string!");
		return(tab["en"]);
		}
	return(tab[language])
	}

    
	function genValueText(value,tab) {
	// Example:
	//	tab			rockTypeValueTexts
	//	tab[language]		rockTypeValueTexts["fi"]
	//	tab[language][value]	rockTypeValueTexts["fi"]["limestone/dolomite"] = "kalkkikivi tai dolomiitti"

	if (tab[language] === undefined) { language = "en"; }

	var prelValue = tab[language][value];
	if (prelValue === undefined) {
		return("unrecognized");
		}
	return(prelValue);
	}


// METHODS BEGIN

 
	function getText(textId,needShort) {
		// Checks
		if ( typeof(textId) != "string" || textId == "" ) {
			psgeoDebug("Error: a text string was requested from function getText, but textId is not a non-empty string!");
			}

		// Chooce which version to use, normal or short
		if (typeof(needShort) == "boolean" && needShort) {
			var translationArray = eval(textId + "TextsShort");
			}			
		else {
			var translationArray = eval(textId + "Texts");
			}

                return(genText(translationArray));
	}


	function getTextWithValues(textId,needShort,insertables) {
		// textId	is a string
		// insertables	is an array of strings
		// needShort	is boolean

		var translationArray = eval(textId + "Texts");
		var message = genText(translationArray,needShort);
		var one = "";
		var i = 0;

		if ( message === "undefined" ) psgeoDebug("Error: getTextWithValues: texId: " + textId +" returns no translation string!");

		// replace {{string1}} with the first member of the array, {{string2}} with the second, and so on.
		// do not start from zero but from one!
		for ( one of insertables ) {
			i++;
			message = message.replace( '{{string' + i.toString() + '}}',one);
			}
		return message;
	}


	function getTextCollectionItem(controlledVocabulary,tagText) {

		// Terminology: A collection (e.g. rockType) determines a controlled vocabulary (a fixed set of words)
		//		These words can be called tags, because they are, in effect, metadata. Hence their variable name: tagText

		// controlled vocabularies of psgeo include (but are not limited to):
		//	rockType		[of caves] such as volcanic, (sediment) sandstone, (sediment) limestone/dolomite, (metamorphic) marble...
		//	morphology		[of caves] such as karst, crevice, boulders, ... extended Finnish classification
		//	swimming		such as indoor, outdoor, underground, waterbody-lake
		//	swimmingMaterial	such as water, ice	// both swimming taxonomies needs work
		//	skiMaterial		...	
		//	urbanexTarget
		//	bikeTrack
		//	bikeType
		//	saunaType
		//	cavingActivity
		// NOTE: ideally this could be an extensible file based system


		// Checks
		if ( controlledVocabulary === "undefined" || controlledVocabulary == "" ) {
			psgeoDebug("Error: Cannot return tag text unless the relevant controlled vocabulary is non-empty!");
			}
		if ( tagText === "undefined" || tagText == "" ) {
			psgeoDebug("Error: an empty or undefined tag text in vocabulary " + controlledVocabulary + " was requested!");
			}

		// Special case: cave material
		// 	Caves exist both in rock, ice, moraine and turf, at least.
		//	Rock types however can be used in climbing too.
		//	A two level classification is thus in order.
		//	We will thus introduce a new higher level vocabulary: groundType (which includes rock, ice, snow, turf, ...)

		if (  controlledVocabulary == "rockTypeAndOtherMaterial" ) {	// SHOULD THIS NOT BE CALLED CaveMaterialTopLevelCategory ?
			switch (tagText) {
				case "other-material": 	return(genText("otherMaterial")); break; // return "other than ice or rock" [relevant for caves]
				case "ice": 		controlledVocabulary="groundType"; break;
				default: 		controlledVocabulary="rockType";
				}
			}
	
		var source = eval(controlledVocabulary + "ValueTexts");
		// Example:
		//	controlledVocabulary			= rockType		string
		//	controlledVocabulary + "ValueTexts"	= rockTypeValueTexts	string(!), but we need to reference an object!
		//	var source = eval(controlledVocabulary + "ValueTexts");
		//	var source = rockTypeValueTexts;				array(!)

		return(genValueText(tagText,source));
	}


	function listToText(list) {
		listSeparator=", ";
		lastSeparator=" " + getText("and") + " ";

			var result = list[0];                                                          	// FIRST item in list	(item 1)
		for ( var i = 1; i<list.length -1; i++ ) result = result + listSeparator + list[i];   	// COMMA MIDDLE item 	(items 2 to n-1)
		if (list.length>1) result = result + lastSeparator + list[list.length -1];		// AND LAST		(item n>1)
		return(result);
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


// RETURN AN OBJECT WITH METHODS

return({
	getLanguage: 			getLanguage,		// returns language
	getText:			getText,		// returns a string in current language
	getTextWithValues:		getTextWithValues,	// same as getText but with {{valueX}} replacement
	getTextCollectionItem:		getTextCollectionItem,	// returns a term (item) from a controlled vocabulary in current language
	listToText: 			listToText,
	capitalize: 			capitalize,
	numberAlign: 			numberAlign
});

}

