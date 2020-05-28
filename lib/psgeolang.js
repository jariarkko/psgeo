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
//   var citiesText = langLib.citiesText(); // "kaupunkia"
//  

function PsgeoLang(language) {

    var mapTexts = [];
    mapTexts["en"] = "map";
    mapTexts["fi"] = "kartta";

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

    var locationSecretTexts = [];
    locationSecretTexts["en"] = "exact location secret";
    locationSecretTexts["fi"] = "tarkka sijainti salainen";

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

    var placesTexts = [];
    placesTexts["en"] = "places";
    placesTexts["fi"] = "paikkaa";

    var citiesTexts = [];
    citiesTexts["en"] = "cities";
    citiesTexts["fi"] = "kaupunkia";

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

    var cavemapsTexts = [];
    cavemapsTexts["en"] = "cave maps";
    cavemapsTexts["fi"] = "luolakarttaa";
    
    var withCavemapTexts = [];
    withCavemapTexts["en"] = "with cave map";
    withCavemapTexts["fi"] = "luolakartalliset";
    
    var sourcesTexts = [];
    sourcesTexts["en"] = "sources";
    sourcesTexts["fi"] = "lähteet";

    var otherTexts = [];
    otherTexts["en"] = "other";
    otherTexts["fi"] = "muuta";

    var onlyFinlandTexts = [];
    onlyFinlandTexts["en"] = "only Finland";
    onlyFinlandTexts["fi"] = "vain Suomi";
    
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
    
    function mapText() {
        return(genText(mapTexts));
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
    
    function cavemapsText() {
        return(genText(cavemapsTexts));
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
    
    function sourcesText(size) {
        return(genText(sourcesTexts));
    }
    
    function withCavemapText(size) {
        return(genText(withCavemapTexts));
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
    
    return({
        mapText: mapText,
        caveletsText: caveletsText,
        cavesText: cavesText,
        bigCavesText: bigCavesText,
        locationSecretText: locationSecretText,
        noArticleYetText: noArticleYetText,
        articleText: articleText,
        articlesText: articlesText,
        otherText: otherText,
        placesText: placesText,
        citiesText: citiesText,
        countriesText: countriesText,
        continentsText: continentsText,
        statesText: statesText,
        provincesText: provincesText,
        cavemapsText: cavemapsText,
        sideCavesText: sideCavesText,
        sourcesText: sourcesText,
        withCavemapText: withCavemapText,
        otherText: otherText,
        onlyFinlandText: onlyFinlandText,
        capitalize: capitalize,
        numberAlign: numberAlign
    });
}

