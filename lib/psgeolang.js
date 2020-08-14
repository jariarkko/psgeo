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
 
    var cavesTexts1 = [];
    cavesTexts1["en"] = "caves (";
    cavesTexts1["fi"] = "luolat (";
    var cavesTexts2 = [];
    cavesTexts2["en"] = "..";
    cavesTexts2["fi"] = "..";
    var cavesTexts3 = [];
    cavesTexts3["en"] = "m)";
    cavesTexts3["fi"] = "m)";

    var caveletsTexts1 = [];
    caveletsTexts1["en"] = "cavelets (under ";
    caveletsTexts1["fi"] = "luolaset (alle ";
    var caveletsTexts2 = [];
    caveletsTexts2["en"] = "m)";
    caveletsTexts2["fi"] = "m)";

    var bigCavesTexts1 = [];
    bigCavesTexts1["en"] = "big caves (over ";
    bigCavesTexts1["fi"] = "isot luolat (yli ";
    var bigCavesTexts2 = [];
    bigCavesTexts2["en"] = "m)";
    bigCavesTexts2["fi"] = "m)";

    var dimensionsTexts = [];
    dimensionsTexts["en"] = "dimensions";
    dimensionsTexts["fi"] = "mitat";

    var literatureCaveIdTexts = [];
    literatureCaveIdTexts["en"] = "A cave the literature. The Finnish identification code for this cave is";
    literatureCaveIdTexts["fi"] = "Luolakirjallisuudessa kuvattu luola. Suomalainen luolakoodi luolalle on";
    
    var lengthTexts = [];
    lengthTexts["en"] = "length";
    lengthTexts["fi"] = "pituus";
    
    var lengthCategoryTexts = [];
    lengthCategoryTexts["en"] = "length category";
    lengthCategoryTexts["fi"] = "pituusluokka";
    
    var rockTypeTexts = [];
    rockTypeTexts["en"] = "rock";
    rockTypeTexts["fi"] = "kivi";

    var rockTypeValueTexts = [];
    rockTypeValueTexts["en"] = {
        "granite": "granite",
        "limestone": "limestone",
        "sandstone": "sandstone",
        "marble": "marble",
        "volcanic": "volcanic",
        "other": "other"
    };
    rockTypeValueTexts["fi"] = {
        "granite": "graniitti",
        "limestone": "kalkkikivi",
        "sandstone": "hiekkakivi",
        "marble": "marmori",
        "volcanic": "vulkaaninen",
        "other": "muu"
    };
    
    var morphologyTexts = [];
    morphologyTexts["en"] = "morphology";
    morphologyTexts["fi"] = "syntytapa";

    var morphologyValueTexts = [];
    morphologyValueTexts["en"] = {
        "crack": "crack",
        "boulders": "boulders",
        "karst": "karst",
        "volcanic": "volcanic",
        "erosion": "erosion",
        "weathering": "weathering",
        "crystallization": "crystallization",
        "other": "other" 
    };
    morphologyValueTexts["fi"] = {
        "crack": "halkeama",
        "boulders": "lohkare",
        "karst": "karsti",
        "volcanic": "vulkaaninen",
        "erosion": "eroosio",
        "weathering": "rapautuminen",
        "crystallization": "kiteytyminen",
        "other": "muu"
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
          "other-substances": "on other substances"
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
          "other-substances": "muilla materiaaleilla"
        };

    var targetTexts = [];
    targetTexts["en"] = "target is";
    targetTexts["fi"] = "kohde on";

    var urbanexTargetValueTexts = [];
    urbanexTargetValueTexts["en"] =
        {
            "none": "nothing",
            "tunnels": "tunnel",
            "buildings": "building",
            "ruins": "ruins",
            "bunkers": "bunker",
            "quarries": "quarry",
            "mines": "mine",
            "industrial": "industrial",
            "silos": "silo",
            "ski-lifts": "ski lift",
            "landfills": "landfill",
            "castles": "castle",
            "vehicles": "vehicle",
            "trenches": "trench",
            "memorial": "memorial",
            "historic-sites": "historic site",
            "bridges": "bridge",
            "skating-rinks": "skating rink",
            "amusement-parks": "amusement park",
            "airports": "airport",
            "catacombs": "catacomb",
            "railways": "railway",
            "smokestacks": "smokestack",
            "towers": "tower",
            "prisons": "prison",
            "harbours": "harbour",
            "military": "military site"
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
            "military": "sotilaallinen kohde"
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
    
    var saunaTypeValueTexts = [];
    saunaTypeValueTexts["en"] =
        {
            "normal": "Finnish sauna",
            "smoke": "smoke sauna",
            "steam": "Turkish sauna",
            "infrared": "infrared sauna"
        };
    saunaTypeValueTexts["fi"] =
        {
            "normal": "suomalainen",
            "smoke": "savusauna",
            "steam": "höyrysauna",
            "infrared": "infrapuna"
        };

    var locationSecretTexts = [];
    locationSecretTexts["en"] = "exact location secret";
    locationSecretTexts["fi"] = "tarkka sijainti salainen";

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

    var caveMapsTexts = [];
    caveMapsTexts["en"] = "cave maps";
    caveMapsTexts["fi"] = "luolakarttaa";
    
    var withCavemapTexts = [];
    withCavemapTexts["en"] = "with cave map";
    withCavemapTexts["fi"] = "luolakartalliset";
    
    var sourceTexts = [];
    sourceTexts["en"] = "source";
    sourceTexts["fi"] = "lähde";

    var sourcesTexts = [];
    sourcesTexts["en"] = "sources";
    sourcesTexts["fi"] = "lähteet";

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
    
    var aboutTexts = [];
    aboutTexts["en"] = "about";
    aboutTexts["fi"] = "tietoja";

    var moreMapsTexts = [];
    moreMapsTexts["en"] = "more maps";
    moreMapsTexts["fi"] = "lisää karttoja";

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
        "This service provides the cave data from the Finnish Caving Association. It will also draw in a smaller data set from the Planetcaver service. Map data is by Google and Karttapaikka.";
    dataExplanationCavingAssociationTexts["fi"] =
        "Tällä palvelimella näytettävät tiedot tulevat Suomen Luolaseuran tietokannasta. Lisäksi palvelin käyttää myös Planetcaverin pienempää tietokantaa. Karttatieto on peräisin Googlen ja Karttapaikan palveluista.";

    var dataExplanationTexts = [];
    dataExplanationTexts["en"] = "This server employs a dataset by the Planetskier/Planetcaver and Jari Arkko.";
    dataExplanationTexts["fi"] = "Tällä palvelimella näytetään Jari Arkon Planetskier/Planetcaver tietokannan tietoja.";
    
    var libraryExplanationTexts = [];
    libraryExplanationTexts["en"] =
        'The server is powered by Planet Skier Geo (Psgeo), an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">format</a> about places, actions, and articles describing them. The tool is available at <a href="https://github.com/jariarkko/psgeo" target="_blank">GitHub</a>.';
    libraryExplanationTexts["fi"] =
        'Palvelin ajaa Psgeo-ohjelmistoa. Psgeo (Planet Skier Geo) on Javascript-kirjasto, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon filtteröinnin pohjauten alla olevaan <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">semanttiseen tietoon</a> paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä. Kirjasto löytyy <a href="https://github.com/jariarkko/psgeo" target="_blank">GitHubista</a>.';
   
    var developersExplanationTexts = [];
    developersExplanationTexts["en"] =
        "Psgeo has been developed by Jari Arkko, with help from Ralf Strandell and Jarmo Ruuth.";
    developersExplanationTexts["fi"] =
        "Psgeo:ta on kehittänyt lähinnä Jari Arkko, mutta myös Ralf Strandell ja Jarmo Ruuth ovat auttaneet sen kehittämisessä.";
    
    var dataDistinctExplanationTexts = [];
    dataDistinctExplanationTexts["en"] =
        "Note that the software library is distinct from any data that is displayed with it.";
    dataDistinctExplanationTexts["fi"] =
        "Psgeo pelkkä ohjelmistokirjasto, eikä sinänsä liity mitenkään tietoihin joita sen avulla esitetään.";
    
    var dangerousExplanationTexts = [];
    dangerousExplanationTexts["en"] =
        "The authors of Psgeo shall not be held responsible for any data displayed with it, or possible accidents resulting in attempting to go there. YOU HAVE BEEN WARNED! MOST LOCATIONS SHOWN WITH THIS TOOL ARE DANGEROUS!";
    dangerousExplanationTexts["fi"] =
        "Psgeo:n ohjelmiston kirjoittajat eivät ole mitenkään vastuussa tiedosta, jota kirjastolla esitetään, tai onnettomuksista joita saattaa sattua, mikäli esitetyissä kohteissa vieraillaan. SINUA ON VAROITETTU, NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA!";
    
    var developersNotResponsibleTexts = [];
    developersNotResponsibleTexts["en"] =
        "The authors of various datasets about places are neither responsible for individual choices to visit the locations, and also obviously not responsible for what other people's data sets may contain.";
    developersNotResponsibleTexts["fi"] =
        "Eri tietolähteiden tekijät eivät ole vastuussa tietoa katselevien käyttäjien toimista, eivätkä tietenkään muiden tietolähden ratkaisuista esittää jotain tietoa Psgeo:n kautta.";

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
            return("unknown");
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
    
    function cavesText(size1,size2) {
        return(gen3Text(cavesTexts1,
                        size1.toString(),
                        cavesTexts2,
                        size2.toString(),
                        cavesTexts3));
    }
    
    function bigCavesText(size) {
        return(gen2Text(bigCavesTexts1,size.toString(),bigCavesTexts2));
    }
    
    function caveletsText(size) {
        return(gen2Text(caveletsTexts1,size.toString(),caveletsTexts2));
    }
    
    function sourceText(size) {
        return(genText(sourceTexts));
    }
    
    function sourcesText(size) {
        return(genText(sourcesTexts));
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
    
    function moreMapsText() {
        return(genText(moreMapsTexts));
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
    
    function rockTypeText() {
        return(genText(rockTypeTexts));
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
    
    function skiMaterialValueText(value) {
        return(genValueText(value,skiMaterialValueTexts));
    }

    function targetText() {
        return(genText(targetTexts));
    }

    function urbanexTargetValueText(value) {
        debug("urbanex value " + value);
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
    
    function developersNotResponsibleText() {
        return(genText(developersNotResponsibleTexts));
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
        caveletsText: caveletsText,
        cavesText: cavesText,
        bigCavesText: bigCavesText,
        lengthText: lengthText,
        lengthCategoryText: lengthCategoryText,
        rockTypeText: rockTypeText,
        rockTypeValueText: rockTypeValueText,
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
        citiesText: citiesText,
        countriesText: countriesText,
        continentsText: continentsText,
        statesText: statesText,
        provincesText: provincesText,
        caveMapsText: caveMapsText,
        mainCaveText: mainCaveText,
        sideCaveText: sideCaveText,
        sideCavesText: sideCavesText,
        sourceText: sourceText,
        sourcesText: sourcesText,
        withCavemapText: withCavemapText,
        andText: andText,
        otherText: otherText,
        onlyFinlandText: onlyFinlandText,
        finnishTerrainText: finnishTerrainText,
        moreMapsText: moreMapsText,
        dataExplanationText: dataExplanationText,
        dataExplanationCavingAssociationText: dataExplanationCavingAssociationText,
        libraryExplanationText: libraryExplanationText,
        developersExplanationText: developersExplanationText,
        warningsAndDisclaimersText: warningsAndDisclaimersText,
        dataDistinctExplanationText: dataDistinctExplanationText,
        dangerousExplanationText: dangerousExplanationText,
        developersNotResponsibleText: developersNotResponsibleText,
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
        coordinatesText: coordinatesText,
        alternativeNamesText: alternativeNamesText,
        alternativeCoordinatesText: alternativeCoordinatesText,
        dimensionsText: dimensionsText,
        literatureCaveIdText: literatureCaveIdText,
        swimmingText: swimmingText,
        swimmingPlaceValueText: swimmingPlaceValueText,
        swimmingMaterialValueText: swimmingMaterialValueText,
        skiText: skiText,
        indoorText: indoorText,
        outdoorText: outdoorText,
        skiMaterialValueText: skiMaterialValueText,
        targetText: targetText,
        urbanexTargetValueText: urbanexTargetValueText,
        bikingText: bikingText,
        bikeTypeValueText: bikeTypeValueText,
        bikeTrackValueText: bikeTrackValueText,
        saunaTypeValueText: saunaTypeValueText,
        offText: offText,
        aboutText: aboutText,
        listToText: listToText,
        capitalize: capitalize,
        numberAlign: numberAlign
    });
}

