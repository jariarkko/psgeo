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

    var toolsExplanationTexts = [];
    toolsExplanationTexts["en"] = "these tools have been found to be very useful for further research";
    toolsExplanationTexts["fi"] = "nämä työkalut on todettu erittäin hyödylliseksi uusien paikkojen tutkimisessa";

    var openInNewWindowTexts = [];
    openInNewWindowTexts["en"] = "these tools open in a new, separate window (centered at the same location as you are browsing now, where technically possible)";
    openInNewWindowTexts["fi"] = "nämä työkalut avautuvat uudessa, erillisessä ikkunassa (keskitettynä samaan kohtaan kartalla, jos se on mahdollista)";

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
        openInNewWindowText: openInNewWindowText,
        toolsExplanationText: toolsExplanationText,
        coordinatesText: coordinatesText,
        aboutText: aboutText,
        capitalize: capitalize,
        numberAlign: numberAlign
    });
}

