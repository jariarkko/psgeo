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
        "other": "other" 
    };
    morphologyValueTexts["fi"] = {
        "crack": "halkeama",
        "boulders": "lohkare",
        "karst": "karsti",
        "volcanic": "vulkaaninen",
        "erosion": "eroosio",
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
        "skiing": "hiihto",
        "surveying": "kartoitus",
        "researching": "tutkimus",
        "training": "opetus",
        "studying": "oppiminen"
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

    var publicationTexts = [];
    publicationTexts["en"] = "book";
    publicationTexts["fi"] = "kirja";

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

    dataExplanationTexts = [];
    dataExplanationTexts["en"] = "This server employs a dataset by the Planetskier/Planetcaver and Jari Arkko.";
    dataExplanationTexts["en"] = "Tällä palvelimella näytetään Jari Arkon Planetskier/Planetcaver tietokannan tietoja.";
    
    var libraryExplanationTexts = [];
    libraryExplanationTexts["en"] =
        'The server is powered by Planet Skier Geo (Psgeo), an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data representation about places, actions, and articles describing them. The tool is available at <a href="https://github.com/jariarkko/psgeo" target="_blank">GitHub</a>. There is also a specification for ActivityJSON, a specialisation of GeoJSON, to represent the needed data sets. The specification is <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">here</a>. The central component of Psgeo, PsgeoDB, is independently usable for searches, filtering and processing of activity-related data.';
    libraryExplanationTexts["fi"] =
        'Palvelin ajaa Psgeo-ohjelmistoa. Psgeo (Planet Skier Geo) on Javascript-kirjasto, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon filtteröinnin pohjauten alla olevaan semanttiseen tieton paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä. Kirjasto löytyy <a href="https://github.com/jariarkko/psgeo" target="_blank">GitHubista</a>. Tiedonesityksen formaatti on myös määritelty, käytämme ActivityJSON-muotoisia JSON-tiedostoja. Tämä on GeoJSON-muotoisen tiedon jatkokehitys. ActivityJSON:n määritelmä löytyy <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">täältä</a>. Psgeo:n keskeinen osa, PsgeoDB, on myös käytettävissä aktiviteettitiedon käsittelyyn ja hakuihin.';
   
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
    
    var developersNotResponsibleExplanationTexts = [];
    developersNotResponsibleExplanationTexts["en"] =
        "The authors of various datasets about places are neither responsible for individual choices to visit the locations, and also obviously not responsible for what other people's data sets may contain.";
    developersNotResponsibleExplanationTexts["fi"] =
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
        return(genValueText(dataExplanationTexts));
    }
    
    function dataExplanationCavingAssociationText() {
        return(genValueText(dataExplanationCavingAssociationText));
    }
    
    function libraryExplanationText() {
        return(genValueText(libraryExplanationText));
    }
    
    function developersExplanationText() {
        return(genValueText(developersExplanationText));
    }
    
    function dataDistinctExplanationText() {
        return(genValueText(dataDistinctExplanationText));
    }
    
    function dangerousExplanationText() {
        return(genValueText(dangerousExplanationText));
    }
    
    function developersNotResponsibleText() {
        return(genValueText(developersNotResponsibleText));
    }

    function retkipaikkaToolNameText() {
        return(genValueText(retkipaikkaToolNameTexts));
    }
    
    function retkipaikkaToolDescriptionText() {
        return(genValueText(retkipaikkaToolDescriptionTexts));
    }
    
    function ruuthToolNameText() {
        return(genValueText(ruuthToolNameTexts));
    }
    
    function ruuthToolDescriptionText() {
        return(genValueText(ruuthToolDescriptionTexts));
    }
    
    function hakkuToolNameText() {
        return(genValueText(hakkuToolNameTexts));
    }
    
    function hakkuToolDescriptionText() {
        return(genValueText(hakkuToolDescriptionTexts));
    }
    
    function laserToolNameText() {
        return(genValueText(laserToolNameTexts));
    }
    
    function laserToolDescriptionText() {
        return(genValueText(laserToolDescriptionTexts));
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
        aboutText: aboutText,
        capitalize: capitalize,
        numberAlign: numberAlign
    });
}

