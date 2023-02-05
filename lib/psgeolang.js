// !REQUIRES JavaScript version ES16
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
//   var citiesText = langLib.getText("cities"); // "paikkakuntaa", sv: "orter"
//
//   // a more complex example, translating a value in the category of rock  types:
//   var rt = "rock-granite";
//   var rtText = langLib.getTextCollectionItem("rockType",rt); // "graniitti"
//

function PsgeoLang(language) {

    //
    // Internal variables ---------------------------------------------------------------------
    //
    
    var translations = {};
    var vocabularies = {};
    
    //
    // Translation strings --------------------------------------------------------------------
    //

    //
    // Basic text items -----------------------------------------------------------------------
    //

    addTranslation("Planetcaver",
        {
                en: "Planetcaver blog",
                fi: "Planetcaver -blogi",
                sv: "Planetcaver blogg"
        });
    addTranslation("PlanetcaverShort",
        {
                en: "Planetcaver",
                fi: "Planetcaver",
                sv: "Planetcaver"
        });
    addTranslation("Planetswimmer",
        {
                en: "Planetswimmer blog",
                fi: "Planetswimmer -blogi",
                sv: "Planetswimmer blogg"
        });
    addTranslation("PlanetswimmerShort",
        {
                en: "Planetswimmer",
                fi: "Planetswimmer",
                sv: "Planetswimmer"
        });
    addTranslation("Luolaseura",
        {
                en: "Finnish Caving Club",
                fi: "Suomen luolaseura",
                sv: "Finlands grottklubb"
        });
    addTranslation("LuolaseuraShort",
        {
                en: "caving.fi",
                fi: "Luolaseura",
                sv: "caving.fi"
        });

    addTranslation("show", { en: "show", fi: "näytä", sv: "visa" });
    addTranslation("map", { en: "map", fi: "kartta", sv: "karta" });
    addTranslation("model", { en: "model", fi: "malli", sv: "modell" });
    addTranslation("caveMap", { en: "cave map", fi: "luolakartta", sv: "grottkarta" });
    addTranslation("caveModel", { en: "3D cave model", fi: "3D-luolamalli", sv: "3D-grottmodell" });
    addTranslation("caves", { en: "caves", fi: "luolaa", sv: "grottor" });
    addTranslation("mediumCaves", { en: "caves ({{string1}}..{{string2}}m)", fi: "luolat ({{string1}}..{{string2}}m)", sv: "grottor ({{string1}}..{{string2}}m)" });
    addTranslation("mediumCavesShort", { en: "{{string1}}..{{string2}}m", sv: "{{string1}}..{{string2}}m", fi: "{{string1}}..{{string2}}m" });
    addTranslation("cavelets", { en: "cavelets (under {{string1}} m)", fi: "luolaset (alle {{string1}} m)", sv: "små grottor (under {{string1}} m)" });
    addTranslation("caveletsShort", { en: "<{{string1}}m", sv: "<{{string1}}m", fi: "<{{string1}}m" });
    addTranslation("bigCaves", { en: "big caves (over {{string1}} m)", fi: "isot luolat (yli {{string1}} m)", sv: "stora grottor (över {{string1}} m)" });
    addTranslation("bigCavesShort", { en: ">{{string1}}m", sv: ">{{string1}}m", fi: ">{{string1}}m" });
    addTranslation("dimensions", { en: "dimensions", fi: "mitat", sv: "mått" });
    addTranslation("literatureCaveId", { en: "The Finnish identification code for this cave is", fi: "Suomalainen luolakoodi luolalle on", sv: "Finskt grottindex för grottan är" });
    addTranslation("length", { en: "length", fi: "pituus", sv: "längd" });
    addTranslation("lengthCategory", { en: "length category", fi: "pituusluokka", sv: "längdklass" });
    addTranslation("manmade", { en: "man made", fi: "keinotekoinen", sv: "konstgjord" });
    addTranslation("ice", { en: "ice", fi: "jää", sv: "is" });
    addTranslation("balls", { en: "ballpit", fi: "pallomeri", sv: "bollhav" });
    addTranslation("otherMaterial", { en: "other than rock or ice", fi: "muu kuin kivi tai jää", sv: "annat än sten eller is" });
    addTranslation("name", { en: "name", fi: "nimi", sv: "namn" });
    addTranslation("rock", { en: "material", fi: "materiaali", sv: "material" });
    addTranslation("rockType", { en: "material", fi: "materiaali", sv: "material" });
    addTranslation("morphology", { en: "cave type", fi: "luolan tyyppi", sv: "typ av grotta" });
    addTranslation("morphologyShort", { en: "type", fi: "tyyppi", sv: "typ" });
    addTranslation("activity", { en: "activity", fi: "aktiviteetit", sv: "aktiviteter" });
    addTranslation("caveActivity", { en: "cave activities", fi: "luola-aktiviteetit", sv: "grott-aktiviteter" });
    addTranslation("swimming", { en: "swimming", fi: "uintia", sv: "simning" });
    addTranslation("waterbody", { en: "waterbody", fi: "vesialue", sv: "vattendrag" });
    addTranslation("ski", { en: "skiing", fi: "hiihtoa", sv: "skidning" });
    addTranslation("snowboard", { en: "snowboarding", fi: "lumilautailua", sv: "åka snowboard" });
    addTranslation("slide", { en: "sliding", fi: "liukua", sv: "glidning" });
    addTranslation("indoor", { en: "indoors", fi: "sisällä", sv: "innomhus" });
    addTranslation("outdoor", { en: "outdoors", fi: "ulkona", sv: "utomhus" });
    addTranslation("skiMaterial", { en: "material", fi: "materiaali", sv: "material" });
    addTranslation("target", { en: "target is", fi: "kohde on", sv: "målet är" });
    addTranslation("urbanexTarget", { en: "target", fi: "kohde", sv: "mål" });
    addTranslation("biking", { en: "biking", fi: "pyöräily", sv: "cykling" });
    addTranslation("bikeType", { en: "bike type", fi: "pyörätyyppi", sv: "cykeltyp" });
    addTranslation("bikeTrack", { en: "trail type", fi: "reittityyppi", sv: "rutetyp" });
    addTranslation("saunaType", { en: "sauna type", fi: "saunatyyppi", sv: "typ av bastu" });
    addTranslation("locationSecret", { en: "exact location secret", fi: "tarkka sijainti salainen", sv: "exakt position hemlig" });
    addTranslation("size", { en: "size", fi: "koko", sv: "storlek" });
    addTranslation("mainCave", { en: "main cave", fi: "pääluola", sv: "huvudgrotta" });
    addTranslation("sideCave", { en: "side cave", fi: "sivuluola", sv: "sidogrotta" });
    addTranslation("sideCaves", { en: "side caves", fi: "sivuluolaa", sv: "sidogrottor" });
    addTranslation("other", { en: "other", fi: "muuta", sv: "övrigt" });
    addTranslation("otherFormat", { en: "other format", fi: "muu muoto", sv: "övrigt format" });
    addTranslation("article", { en: "article", fi: "artikkeli", sv: "artikel" });
    addTranslation("articles", { en: "articles", fi: "artikkelia", sv: "artiklar" });
    addTranslation("noArticleYet", { en: "no articles yet", fi: "ei vielä artikkeleita", sv: "inga artiklar ännu" });
    addTranslation("publicationReference", { en: "literature reference", fi: "kirjallisuusviite", sv: "litteraturreferens" });
    addTranslation("publication", { en: "book", fi: "kirja", sv: "bok" });
    addTranslation("inPublication", { en: "in book", fi: "kirjassa", sv: "i boken" });
    addTranslation("places", { en: "places", fi: "paikkaa", sv: "ställen" });
    addTranslation("city", { en: "city", fi: "kaupunki", sv: "stad" });
    addTranslation("country", { en: "country", fi: "maa", sv: "land" });
    addTranslation("cities", { en: "cities", fi: "paikkakuntaa", sv: "orter" });
    addTranslation("countries", { en: "countries", fi: "maata", sv: "länder" });
    addTranslation("continents", { en: "continents", fi: "maanosaa", sv: "kontinenter" });
    addTranslation("states", { en: "US states", fi: "USA:n osavaltiota", sv: "stater i USA" });
    addTranslation("provinces", { en: "CA provinces", fi: "Kanadan provinssia", sv: "provinser i Kanada" });
    addTranslation("cave", { en: "cave", fi: "luola", sv: "grotta" });
    addTranslation("caveMaps", { en: "cave maps", fi: "karttaa", sv: "kartor" });
    addTranslation("withCavemap", { en: "with cave map", fi: "luolakartalliset", sv: "med grottkarta" });
    addTranslation("withCavemapShort", { en: "surveyed", fi: "kartoitetut", sv: "karterade" });
    addTranslation("source", { en: "source", fi: "lähde", sv: "källa" });
    addTranslation("sources", { en: "sources", fi: "lähteet", sv: "källor" });
    addTranslation("filterHeader", { en: "filter", fi: "suodata", sv: "filtrera" });
    addTranslation("filterLink", { en: "filter", fi: "suodata", sv: "filtrera" });
    addTranslation("moreFilters", { en: "more filters", fi: "lisää suodattimia", sv: "filtrera nogrannare" });
    addTranslation("filterByName", { en: "filter by name", fi: "suodata nimen perusteella", sv: "filtrera enligt namn" });
    addTranslation("filterByRockType", { en: "filter by material", fi: "suodata materiaalin perusteella", sv: "filtrera enligt material" });
    addTranslation("filterByMaterialType", { en: "filter by material type", fi: "suodata materiaalin perusteella", sv: "filtrera enligt material" });
    addTranslation("filterByMorphology", { en: "filter by cave type", fi: "suodata tyypin perusteella", sv: "filtrera på grund av typ" });
    addTranslation("filterBySource", { en: "filter by source", fi: "suodata lähteen perusteella", sv: "filtrera på grund av källa" });
    addTranslation("and", { en: "and", fi: "ja", sv: "och" });
    addTranslation("andShort", { en: "&", fi: "&", sv: "&" });
    addTranslation("onlyFinland", { en: "Finland", fi: "Suomi", sv: "Finland" });
    addTranslation("otherCountries", { en: "other countries", fi: "ulkomaat", sv: "övriga länder" });
    addTranslation("finnishTerrain", { en: "Finnish terrain", fi: "Suomen maasto", sv: "Finsk topografkarta" });
    addTranslation("finnishTerrainShort", { en: "Terrain", fi: "Maasto", sv: "Terräng" });
    addTranslation("caveClassification", { en: "cave classification", fi: "luolien luokittelu", sv: "Klassifiering av grottor" });
    addTranslation("coordinates", { en: "coordinates", fi: "koordinaatit", sv: "koordinater" });
    addTranslation("alternativeNames", { en: "other names", fi: "muita nimiä", sv: "övriga namn" });
    addTranslation("alternativeCoordinates", { en: "other reported coordinates", fi: "muita ilmoitettuja koordinaatteja", sv: "övriga koordinater" });
    addTranslation("off", { en: "off", fi: "etäisyydellä", sv: "avstånd" });
    addTranslation("add", { en: "add", fi: "lisää", sv: "lägg till" }); 
    addTranslation("addRecord", { en: "add a site", fi: "lisää kohde", sv: "lägg till ett ställe" });
    addTranslation("addRecordShort", { en: "add", fi: "lisää", sv: "lägg till" });
    addTranslation("modifyRecord", { en: "suggest a correction", fi: "kerro korjaustarpeesta", sv: "ge nya uppgifter" });
    addTranslation("modifyRecordShort", { en: "correct", fi: "päivitä", sv: "uppdatera" });
    addTranslation("about", { en: "about", fi: "tietoja", sv: "information" });
    addTranslation("moreMaps", { en: "more maps", fi: "lisää karttoja", sv: "fler kartor" });
    addTranslation("more", { en: "more", fi: "lisää", sv: "visa mera" });
    addTranslation("toolsAndAbout", { en: "tools & about", fi: "työkalut & tiedot", sv: "verktyg och information" });
    addTranslation("settings", { en: "more information and settings", fi: "lisäasetukset ja -tiedot", sv: "mera information och flere val" });
    addTranslation("moreInformation", { en: "more information and tools", fi: "lisätiedot ja -työkalut", sv: "mera information och verktyg" });
    addTranslation("moreToRead", { en: "reading list", fi: "luettavaa", sv: "att läsa" });
    addTranslation("video", { en: "video", fi: "video", sv: "video" });
    addTranslation("up", { en: "going up", fi: "ylös", sv: "upp" });
    addTranslation("climbingTypeText", { en: "climbing type", fi: "kiipeilytyyppi", sv: "typ av klättring" });
    addTranslation("climbingTypeIs", { en: "climbing type is", fi: "kiipeilytyyppi on", sv: "typ av klättring är" });
    addTranslation("place", { en: "place", fi: "paikka", sv: "ställe" });
    addTranslation("centerMap", { en: "Center", fi: "Keskitä", sv: "Centrera" });
    addTranslation("geolocationWaitForPosition", { en: "Waiting for position...", fi: "Paikantaa...", sv: "Söker position..." });
    addTranslation("geolocationYouAreHere", { en: "Your position", fi: "Paikannettu sijainti", sv: "Position" });
    addTranslation("geolocationFailed", { en: "Failed to get position.", fi: "Paikannus epäonnistui.", sv: "Kunde inte finna position." });
    addTranslation("geolocationNotSupported", { en: "Geolocation is not available in browser.", fi: "Sijaintipalvelua ei saatavilla.", sv: "Ingen position service." });
    
    //
    // Longer explanations --------------------------------------------------------------------
    //

    addTranslation("warningsAndDisclaimers",
        {
            en: "warnings and disclaimers",
            fi: "varoitukset ja vastuun rajoitukset",
            sv: "varningar och ansvarsfriskrivning"
        });
    addTranslation("toolsExplanation",
        {
            en: "these tools are useful for further research",
            fi: "nämä työkalut ovat hyödyllisiä uusien paikkojen tutkimisessa",
            sv: "dessa verktyg kan vara nyttiga i letning av nya ställen"
        });
    addTranslation("toolsExplanationShort",
        {
            en: "other useful tools",
            fi: "hyödyllisiä työkaluja",
            sv: "nyttiga verktyg"
        });
    addTranslation("openInNewWindow",
        {
            en: "the tools open in a new tab",
            fi: "työkalut avautuvat uudella välilehdellä",
            sv: "verktygen öppnas på en ny webläsarflik"
        });
    addTranslation("dataExplanationCavingAssociation",
        {
             en: 'The cave data comes from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service.',
            fi: 'Palvelimen tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa.',
            sv: 'Data hämtas från <a href="https://luolaseura.fi">Finlands grottklubbens</a> databas. Dessutom hämtas en del data från <a href="https://planetcaver.net">Planetcavers</a> mindre databas.'
        });
    addTranslation("dataExplanationCavingAssociationShort",
        {
            en: 'Cave info is from the <a href="http s://luolaseura.fi">Finnish Caving Association</a> (and some from <a href="https://planetcaver.net">Planetcaver</a>).',
            fi: 'Luolatieto on Suomen <a href="https://luolaseura.fi">Luolaseuralta</a>, osin myös <a href="https://planetcaver.net">Planetcaverilta</a>.',
            sv: 'Grottadata från <a href="https://luolaseura.fi">Finlands grottklubb</a>, delvis också från <a href="https://planetcaver.net">Planetcaver</a>.'
        });
    addTranslation("dataExplanation",
        {
            en: "This server employs a dataset by Jari Arkko at ",
            fi: "Palvelu käyttää Jari Arkon tietokantaa ",
            sv: "Servicen använder Jari Arkkos databas "
        });
    addTranslation("libraryExplanation",
        {
            en: 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a> ({{string1}}), an open source software that can draw and filter activities on a map, based a <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">data model</a>.',
            fi: 'Palvelin käyttää <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa ({{string1}}), jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia ja käyttää semanttista <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">tietomallia</a>.',
            sv: 'Servern kör <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-programmet ({{string1}}), som visar aktiviteter och hobbyställen på karta. Programmet är open source och använder semantisk <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">data modell</a>.'
        });
    addTranslation("libraryExplanationShort",
        {
            en: 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a> {{string1}}.',
            fi: 'Palvelin käyttää <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa {{string1}}.',
            sv: 'Servern kör <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-programmet {{string1}}.'
        });
    addTranslation("developersExplanation",
        {
            en: "Psgeo has been developers are Jari Arkko, Ralf Strandell, and Jarmo Ruuth.",
            fi: "Psgeo:n kehittäjät ovat Jari Arkko, Ralf Strandell ja Jarmo Ruuth.",
            sv: "Psgeo är utvecklat av Jari Arkko, Ralf Strandell och Jarmo Ruuth."
        });
    addTranslation("developersExplanationShort",
        {
            en: "(Arkko, Strandell & Ruuth)",
            fi: "(Arkko, Strandell & Ruuth)",
            sv: "(Arkko, Strandell & Ruuth)"
        });
    addTranslation("dataDistinctExplanation",
        {
            en: "The authors of Psgeo shall not be held responsible for any data displayed with it; the data is separate.",
            fi: "Psgeo:n ohjelmiston kehittäjät eivät vastaa ohjelmiston käytöstä eikä tiedoista, jota sen avulla esitetään.",
            sv: "Utvecklarna av Psgeo ansvarar inte för bruket av psgeo eller av data som presenteras med hjälp av den."
        });
    addTranslation("dangerousExplanation",
        {
            en: "Note: LOCATIONS SHOWN CAN BE DANGEROUS! The website or software developers are not responsible for any accidents.",
            fi: "Huom! NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA! Palvelun ylläpitäjät tai ohjelmiston kehittäjät eivät vastaa mahdollisista onnettomuuksista.",
            sv: "Observera! STÄLLEN SOM VISAS ÄR OFTAST FARLIGA! Utvecklarna av programvaran eller upprätthållaren av databasen ansvarar inte för olyckor."
        });
    addTranslation("dangerousExplanationShort",
        {
            en: "LOCATIONS SHOWN ARE DANGEROUS! The website is not responsible for accidents.",
            fi: "NÄYTETTÄVÄT PAIKAT OVAT VAARALLISIA! Palvelu ei vastaa onnettomuuksista.",
            sv: "PLATSERNA SOM VISAS ÄR FARLIGA! Denna webplats är inte ansvarig för olyckor."
        });
    addTranslation("retkipaikkaToolName",
        {
            en: "Retkipaikka",
            fi: "Retkipaikka",
            sv: "Retkipaikka"
        });
    addTranslation("retkipaikkaToolDescription",
        {
            en: "Retkipaikka and Matkailukartta covers a large set of Finnish natural sights.",
            fi: "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan.",
            sv: "Retkipaikka och Matkailukartta ger en relativt omfattande skildring av sevärda finska naturställen."
        });
    addTranslation("retkipaikkaToolDescriptionShort",
        {
            en: "Finnish natural sights.",
            fi: "Suomen luonnonnähtyvyydet.",
            sv: "Sevärda finska naturställen."
        });
    addTranslation("ruuthToolName",
        {
            en: "Ruuth map",
            fi: "Ruuthin kartta",
            sv: "Ruuths karta"
        });
    addTranslation("ruuthToolDescription",
        {
            en: "Historic artefacts to caves or to occupation-era aearial maps. Find new caves!",
            fi: "Muinaismuistot, luolat, vanhat ilmakuvat, jne. Uusien luolien löytämiseen!",
            sv: "Fornfynd, grottor, gamla flygfotografier med mera. För att finna nya grottor!"
        });
    addTranslation("ruuthToolDescriptionShort",
        {
            en: "Historic artefacts, old aearial maps, etc.",
            fi: "Muinaismuistot, vanhat ilmakuvat, jne.",
            sv: "Fornfynd, flygfoton mm."
        });
    addTranslation("hakkuToolName",
        {
            en: "Hakku Server",
            fi: "Hakku-palvelu",
            sv: "Hakku-servern"
        });
    addTranslation("hakkuToolDescription",
        {
            en: "Open data about boulders, type of ground rock in different areas, etc.",
            fi: "Siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne.",
            sv: "Positionerna av flyttblock, berggrund, olika slags mätningar i Finland, mm."
        });
    addTranslation("hakkuToolDescriptionShort",
        {
            en: "Open data about boulders, rock types, etc.",
            fi: "Siirtolohkareiden sijainnit, maaperä, jne.",
            sv: "Geologisk information."
        });
    addTranslation("laserToolName",
        {
            en: "MML laser",
            fi: "MML:n laser",
            sv: "Lantmäteriets laser"
        });
    addTranslation("laserToolDescription",
        {
            en: "The Finnish Surveying Institute's laser-scanned terrain forms.",
            fi: "Maanmittauslaitoksen laser-mitatut maanpinnan muodot.",
            sv: "Ytformer lasermätta av Lantmäteriet (MML)."
        });
    addTranslation("laserToolDescriptionShort",
        {
            en: "Laser-scanned terrain forms.",
            fi: "Laser-mitatut maanpinnan muodot.",
            sv: "Laser-mätta ytformer."
        });
    addTranslation("nimisampoToolName",
        {
            en: "Nimisampo",
            fi: "Nimisampo",
            sv: "Nimisampo"
        });
    addTranslation("nimisampoToolDescription",
        {
            en: "Nimisampo is a tool for place name research. It it meant both for academia and the general public.",
            fi: "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden käyttöön.",
            sv: "Nimisampo är en öppen web service för alla som är intresserade av finska ortsnamn."
        });
    addTranslation("nimisampoToolDescriptionShort",
        {
            en: "Place name research.",
            fi: "Paikannimistöhakukone.",
            sv: "Ortnamnsökning."
        });
    
    //
    // Translations for vocabularies ----------------------------------------------------------
    //

    //
    // Rocktype vocabulary --------------------------------------------------------------------
    //

    var v = addVocabulary("rockType");
    addVocabularyItem(v,"rock-granite", { en: "non-volcanic, non-sedimentary", fi: "muu kivi kuin vulkaaninen tai sedimentti", sv: "annan sten än vulkaniskt eller sediment" });
    addVocabularyItem(v,"rock-gypsum", { en: "gypsum", fi: "kipsi", sv: "gips" });
    addVocabularyItem(v,"rock-limestone", { en: "limestone/dolomite", fi: "kalkkikivi/dolomiitti", sv: "kalksten/dolomit" });
    addVocabularyItem(v,"rock-marble", { en: "marble", fi: "marmori", sv: "marmor" });
    addVocabularyItem(v,"rock-mudrock", { en: "mudrock", fi: "savikivi", sv: "lersten" });
    addVocabularyItem(v,"rock-other", { en: "other rock", fi: "muu kivi", sv: "annan sten" });
    addVocabularyItem(v,"rock-salt", { en: "salt", fi: "suola", sv: "salt" });
    addVocabularyItem(v,"rock-sandstone", { en: "sandstone", fi: "hiekkakivi", sv: "sandsten" });
    addVocabularyItem(v,"rock-unknown", { en: "unknown", fi: "ei tiedossa", sv: "okänt" });
    addVocabularyItem(v,"rock-volcanic", { en: "volcanic", fi: "vulkaaninen", sv: "vulkanisk" });
                  
    //
    // Rock type and other material vocabulary -------------------------------------------------
    //
    
    v = copyVocabulary("rockTypeAndOtherMaterial","rockType");
    addVocabularyItem(v,"glacier", { en: "glacier", fi: "jäätikkö", sv: "glaciär" });
    addVocabularyItem(v,"ice", { en: "ice", fi: "jää", sv: "is" });
    addVocabularyItem(v,"man-made", { en: "man-made", fi: "keinotekoinen", sv: "artificiell" });
    addVocabularyItem(v,"material-other", { en: "other material", fi: "muu materiaali", sv: "annat material än sten eller is" });
    
    //
    // Morphology vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("morphology");
    addVocabularyItem(v,"morphology-boulders", { en: "boulder", fi: "lohkare", sv: "blockgrotta" });
    addVocabularyItem(v,"morphology-crack", { en: "crevice", fi: "rako", sv: "sprickgrotta" });
    addVocabularyItem(v,"morphology-crystallization", { en: "blister", fi: "kideonkalo", sv: "kavitet med kristaller" });
    addVocabularyItem(v,"morphology-erosion", { en: "erosion", fi: "eroosio", sv: "erosionsgrotta" });
    addVocabularyItem(v,"morphology-karst", { en: "karst", fi: "karsti", sv: "karst" });
    addVocabularyItem(v,"morphology-organic", { en: "organic, reef or turf", fi: "koralli tai turve", sv: "korall eller torv" });
    addVocabularyItem(v,"morphology-other", { en: "other", fi: "muu", sv: "annat" });
    addVocabularyItem(v,"morphology-unknown", { en: "unknown", fi: "ei tiedossa", sv: "okänd" });
    addVocabularyItem(v,"morphology-volcanic", { en: "volcanic", fi: "vulkaaninen", sv: "vulkanisk" });
    addVocabularyItem(v,"morphology-weathering", { en: "weathering", fi: "rapautumis", sv: "förvittringsgrotta" });
    // To consider: lippaluola: morphology-shelter (usually "rock shelter" but what if it's in ice?)

    //
    // Caving activity vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("cavingActivity");
    addVocabularyItem(v,"basic", { en: "basic caving", fi: "luolailu", sv: "grottning" });
    addVocabularyItem(v,"biking", { en: "biking", fi: "pyöräily", sv: "cykling" });
    addVocabularyItem(v,"boating", { en: "boating", fi: "veneily", sv: "båtliv" });
    addVocabularyItem(v,"digging", { en: "digging", fi: "kaivuu", sv: "grävning" });
    addVocabularyItem(v,"diving", { en: "diving", fi: "sukellus", sv: "dykeri" });
    addVocabularyItem(v,"researching", { en: "researching", fi: "tutkimus", sv: "forskning" });
    addVocabularyItem(v,"skiing", { en: "skiing", fi: "hiihto", sv: "skidåkning" });
    addVocabularyItem(v,"srt", { en: "SRT", fi: "SRT", sv: "SRT" });
    addVocabularyItem(v,"media", { en: "media", fi: "media", sv: "media" });
    addVocabularyItem(v,"social", { en: "social", fi: "sosiaalinen", sv: "social" });
    addVocabularyItem(v,"studying", { en: "studying", fi: "oppiminen", sv: "studerande" });
    addVocabularyItem(v,"surveying", { en: "surveying", fi: "kartoitus", sv: "kartering" });
    addVocabularyItem(v,"swimming", { en: "swimming", fi: "uinti", sv: "simning" });
    addVocabularyItem(v,"training", { en: "training", fi: "opetus", sv: "undervisning" });
    
    //
    // Swimming place vocabulary --------------------------------------------------------------
    //

    v = addVocabulary("swimmingPlace");
    addVocabularyItem(v,"beach", { en: "on an official beach", fi: "virallisella uintipaikalla", sv: "vid offentlig badstrand" });
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", sv: "innomhus" });
    addVocabularyItem(v,"nature", { en: "in nature", fi: "luonnon rannalla", sv: "vid naturlig strand" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", sv: "utomhus" });
    addVocabularyItem(v,"thermal-bath", { en: "in a thermal bath", fi: "kuumassa lähteessä", sv: "i en varm källa" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", sv: "under jorden" });
    addVocabularyItem(v,"other", { en: "in some other place", fi: "jossain muussa uimapaikassa", sv: "i något annat simplats" });
    addVocabularyItem(v,"unknown", { en: "unknown place", fi: "ei tiedossa olevassa paikassa", sv: "okänt plats" });
    addVocabularyItem(v,"waterbody-cave", { en: "in a cave", fi: "luolassa", sv: "i en grotta" });
    addVocabularyItem(v,"waterbody-lake", { en: "on a lake", fi: "järvellä", sv: "i en sjö" });
    addVocabularyItem(v,"waterbody-other", { en: "in some other body of water", fi: "jossain muussa vesialtaassa", sv: "i något annat vattendrag" });
    addVocabularyItem(v,"waterbody-pool", { en: "in a swimming pool", fi: "uima-altaassa", sv: "i simbassäng" });
    addVocabularyItem(v,"waterbody-river", { en: "on a river", fi: "joessa", sv: "i en å, flod eller älv" });
    addVocabularyItem(v,"waterbody-sandpit", { en: "in a sandpit", fi: "hiekkakuopalla", sv: "i ett sandtag" });
    addVocabularyItem(v,"waterbody-sea", { en: "in the sea", fi: "meressä", sv: "i sjön" });
    addVocabularyItem(v,"waterbody-unknown", { en: "in an unknown waterbody", fi: "ei tiedossa olevassa vesialtaassa", sv: "i ett okänt vattendrag" });
    
    //
    // Climbing type vocabulary ---------------------------------------------------------------
    //

    v = addVocabulary("climbingType");
    addVocabularyItem(v,"mountain", { en: "mountain", fi: "vuoristo", sv: "bergskedja" });
    addVocabularyItem(v,"rock", { en: "rock", fi: "kalliokiipeily", sv: "bergsklättring" });
    addVocabularyItem(v,"wall", { en: "wall", fi: "seinäkiipeily", sv: "väggklättring" });
    addVocabularyItem(v,"ice", { en: "ice", fi: "jääkiipeily", sv: "isklättring" });
    addVocabularyItem(v,"volcanoes", { en: "volcanoes", fi: "tulivuorikiipeily", sv: "klättring på vulkaner" });
    addVocabularyItem(v,"other", { en: "in some other place", fi: "jossain muussa paikassa", sv: "i annat plats" });
    addVocabularyItem(v,"none", { en: "not climbing", fi: "ei kiipeilyä", sv: "inget klättring" });
    addVocabularyItem(v,"unknown", { en: "unknown climbing type", fi: "tuntematon kiipeilytyyppi", sv: "okänt klättring" });
    
    //
    // Swimming material vocabulary -----------------------------------------------------------
    //

    v = addVocabulary("swimmingMaterial");
    addVocabularyItem(v,"balls", { en: "in a ball pit", fi: "pallomeressä", sv: "i ett bollhav" });
    addVocabularyItem(v,"ice", { en: "in an ice hole", fi: "avannossa", sv: "i vak" });
    addVocabularyItem(v,"water", { en: "in water", fi: "vedessä", sv: "i vatten" });
    addVocabularyItem(v,"none", { en: "not swimming", fi: "ei uintia", sv: "inget simmandet" });
    addVocabularyItem(v,"material-other", { en: "in some other place", fi: "jossain muussa paikassa", sv: "i annat plats" });
    addVocabularyItem(v,"material-unknown", { en: "unknown place type", fi: "tuntemattomassa uimapaikkatyypissä", sv: "annat simplats" });
    
    //
    // Skiing material vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("skiMaterial");
    addVocabularyItem(v,"snow", { en: "on snow", fi: "lumella", sv: "på snö" });
    addVocabularyItem(v,"ash", { en: "on ash", fi: "tuhkalla", sv: "på aska" });
    addVocabularyItem(v,"asphalt", { en: "on asphalt", fi: "asfaltilla", sv: "på asfalt" });
    addVocabularyItem(v,"grass", { en: "on grass", fi: "nurmikolla", sv: "på gräsmatta" });
    addVocabularyItem(v,"imported-snow", { en: "on carried snow", fi: "kannetulla lumella", sv: "på hämtad snö" });
    addVocabularyItem(v,"mud", { en: "in mud", fi: "mudassa", sv: "i lera" });
    addVocabularyItem(v,"substance-other", { en: "on other substances", fi: "muilla materiaaleilla", sv: "på annat material" });
    addVocabularyItem(v,"plastic", { en: "on plastic", fi: "muovilla", sv: "på plast" });
    addVocabularyItem(v,"rock", { en: "on rocks", fi: "kivillä", sv: "på sten" });
    addVocabularyItem(v,"sand", { en: "on sand", fi: "hiekalla", sv: "på sand" });
    addVocabularyItem(v,"substance-unknown", { en: "on unknown substance", fi: "ei tiedossa olevalla materiaalilla", sv: "på okänt material" });

    //
    // Skiing place vocabulary ----------------------------------------------------------------
    //

    v = addVocabulary("skiPlace");
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", sv: "utomhus" });
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", sv: "innomhus" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", sv: "under jorden" });
    addVocabularyItem(v,"unknown", { en: "unknown place", fi: "tuntemattomassa paikassa", sv: "i okänt plats" });
    
    //
    // Skiing uphill vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("skiUphill");
    addVocabularyItem(v,"lifts", { en: "with a lift", fi: "hissillä", sv: "med hiss" });
    addVocabularyItem(v,"heli", { en: "with a helicopter", fi: "helikopterilla", sv: "med helikopter" });
    addVocabularyItem(v,"hiking", { en: "by hiking", fi: "kävelemällä", sv: "gåendes" });
    addVocabularyItem(v,"skinning", { en: "by skinning", fi: "nousukarvoilla", sv: "med stighudar" });
    addVocabularyItem(v,"snowshoeing", { en: "by snowshoeing", fi: "lumikengillä", sv: "med snöskoar" });
    addVocabularyItem(v,"car", { en: "with a car", fi: "autolla", sv: "med bil" });
    addVocabularyItem(v,"bus", { en: "with a bus", fi: "bussilla", sv: "med buss" });
    addVocabularyItem(v,"train", { en: "with a train", fi: "junalla", sv: "med tåg" });
    addVocabularyItem(v,"horse", { en: "with a horse", fi: "hevosella", sv: "på häst" });
    addVocabularyItem(v,"dogs", { en: "with dogs", fi: "koiravaljakolla", sv: "med hundspann" });
    addVocabularyItem(v,"uphill-other", { en: "with some other method", fi: "jollain toisella tavalla", sv: "på något annat sätt" });
    addVocabularyItem(v,"uphill-unknown", { en: "unknown method", fi: "ei tiedossa olevalla tavalla", sv: "okänt sätt" });

    //
    // Urban exploration target vocabulary ----------------------------------------------------
    //

    v = addVocabulary("urbanexTarget");
    addVocabularyItem(v,"airports", { en: "an airport", fi: "lentokenttä", sv: "flygplats" });
    addVocabularyItem(v,"amusement-parks", { en: "an amusement park", fi: "huvipuisto", sv: "nöjespark" });
    addVocabularyItem(v,"bridges", { en: "a bridge", fi: "silta", sv: "bro" });
    addVocabularyItem(v,"buildings", { en: "a building", fi: "rakennus", sv: "byggnad" });
    addVocabularyItem(v,"bunkers", { en: "a bunker", fi: "bunkkeri", sv: "bunker" });
    addVocabularyItem(v,"castles", { en: "a castle", fi: "linna", sv: "slott" });
    addVocabularyItem(v,"catacombs", { en: "a catacomb", fi: "katakombi", sv: "katakomber" });
    addVocabularyItem(v,"containers", { en: "a container", fi: "säiliö", sv: "tank" });
    addVocabularyItem(v,"harbours", { en: "a harbour", fi: "satama", sv: "hamn" });
    addVocabularyItem(v,"historic-sites", { en: "a historic site", fi: "historiallinen paikka", sv: "historiskt ställe" });
    addVocabularyItem(v,"industrial", { en: "an industrial site", fi: "teollisuus", sv: "industri" });
    addVocabularyItem(v,"landfills", { en: "a landfill", fi: "kaatopaikka", sv: "deponi" });
    addVocabularyItem(v,"memorial", { en: "a memorial", fi: "muistomerkki", sv: "minnesmärke" });
    addVocabularyItem(v,"military", { en: "a military site", fi: "sotilaallinen kohde", sv: "militärt" });
    addVocabularyItem(v,"mines", { en: "a mine", fi: "kaivos", sv: "gruva" });
    addVocabularyItem(v,"none", { en: "nothing", fi: "ei mikään", sv: "ingenting" });
    addVocabularyItem(v,"other", { en: "other", fi: "jokin muu", sv: "annat" });
    addVocabularyItem(v,"prisons", { en: "a prison", fi: "vankila", sv: "fängelse" });
    addVocabularyItem(v,"quarries", { en: "a quarry", fi: "louhos", sv: "stenbrott" });
    addVocabularyItem(v,"railways", { en: "a railway", fi: "rautatie", sv: "järnväg" });
    addVocabularyItem(v,"ruins", { en: "ruins", fi: "rauniot", sv: "ruiner" });
    addVocabularyItem(v,"silos", { en: "a silo", fi: "siilo", sv: "silo" });
    addVocabularyItem(v,"skating-rinks", { en: "a skating rink", fi: "luistelukenttä", sv: "skridskobana" });
    addVocabularyItem(v,"ski-lifts", { en: "a ski lift", fi: "hiihtohissi", sv: "skidlift" });
    addVocabularyItem(v,"smokestacks", { en: "a smokestack", fi: "piippu", sv: "skorsten" });
    addVocabularyItem(v,"towers", { en: "a tower", fi: "torni", sv: "torn" });
    addVocabularyItem(v,"trenches", { en: "a trench", fi: "juoksuhauta", sv: "dike" });
    addVocabularyItem(v,"tunnels", { en: "a tunnel", fi: "tunneli", sv: "tunnel" });
    addVocabularyItem(v,"unknown", { en: "unknown", fi: "ei tiedossa", sv: "okänt" });
    addVocabularyItem(v,"vehicles", { en: "a vehicle", fi: "kulkuväline", sv: "transportmedel" });
    
    //
    // Biking location vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("bikeTrack");
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", sv: "innomhus" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", sv: "utomhus" });
    addVocabularyItem(v,"track-city", { en: "in city", fi: "kaupungissa", sv: "i staden" });
    addVocabularyItem(v,"track-nature", { en: "in the nature", fi: "luonnossa", sv: "i naturen" });
    addVocabularyItem(v,"track-road", { en: "on roads", fi: "maanteillä", sv: "på landsväg" });
    addVocabularyItem(v,"track-trail", { en: "on a trail", fi: "poluilla", sv: "på stig" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", sv: "under jorden" });
    addVocabularyItem(v,"track-unknown", { en: "on an unknown track", fi: "ei tiedossa olevalla reitillä", sv: "på okänt rute" });
    
    //
    // Bike type vocabulary -------------------------------------------------------------------
    //

    v = addVocabulary("bikeType");
    addVocabularyItem(v,"bike-city", { en: "on a city bike", fi: "kaupunkipyörällä", sv: "på en stadscykel" });
    addVocabularyItem(v,"bike-mountain", { en: "on an MTB", fi: "maastopyörällä", sv: "på en terrängcykel" });
    addVocabularyItem(v,"bike-other", { en: "on special bike type", fi: "erikoispyörällä", sv: "på en specialcykel" });
    addVocabularyItem(v,"bike-road", { en: "on a road bike", fi: "maantiepyörällä", sv: "på en vägcykel" });
    addVocabularyItem(v,"bike-tandem", { en: "on a tandem bike", fi: "tandem-pyörällä", sv: "på en tandem-cykel" });
    addVocabularyItem(v,"bike-tricycle", { en: "on a tricycle", fi: "kolmipyöräisellä", sv: "på en trehjuling" });
    addVocabularyItem(v,"bike-unicycle", { en: "on an unicycle", fi: "yksipyöräisellä", sv: "på en enhjuling" });
    addVocabularyItem(v,"bike-unknown", { en: "on an unknown bike type", fi: "ei tiedossa olevalla pyörätyypillä", sv: "på okänt cykeltyp" });
    
    //
    // Sauna type vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("saunaType");
    addVocabularyItem(v,"infrared", { en: "infrared sauna", fi: "infrapunasauna", sv: "infraröd bastu" });
    addVocabularyItem(v,"normal", { en: "Finnish sauna", fi: "suomalainen sauna", sv: "finsk bastu" });
    addVocabularyItem(v,"smoke", { en: "smoke sauna", fi: "savusauna", sv: "rökbastu" });
    addVocabularyItem(v,"steam", { en: "Turkish sauna", fi: "höyrysauna", sv: "ångbastu" });
    addVocabularyItem(v,"other", { en: "other sauna", fi: "muu sauna", sv: "annan bastu" });
    addVocabularyItem(v,"none", { en: "no sauna", fi: "ei saunaa", sv: "ick bastu" });
    addVocabularyItem(v,"unknown", { en: "unknown sauna", fi: "saunatyyppi ei tiedossa", sv: "okänt bastu" });
    
    //
    // Internal functions ---------------------------------------------------------------------
    //

    function addTranslation(name,t) {
        // name          identifier for the translation (string)
        // t             the translations (a record)
        if (name === undefined) throw ("Not a text identifier");
        if (translations[name] !== undefined) throw ("Translation for " + name +  " already defined");
        translations[name] = t;
    }
    
    function addVocabulary(name) {
        // name          is a string
        // RETURN        the vocabulary object
        if (name === undefined) throw("Not an item for a vocabulary");
        if (vocabularies[name] !== undefined) throw ("Vocabulary already defined");
        vocabularies[name] = {};
        return(vocabularies[name]);
    }

    function copyVocabulary(name,other) {
        // name      identifier for the translation of a category/vocabulary
        // other     other identifier for the translation of a category/vocabulary, to copy from
        if (name === undefined) throw("Not an item for a vocabulary");
        if (other === undefined) throw("Not an item for a vocabulary");
        if (vocabularies[name] !== undefined) throw ("Vocabulary already defined");
        if (vocabularies[other] === undefined) throw ("Vocabulary not defined");
        vocabularies[name] = JSON.parse(JSON.stringify(vocabularies[other]));
        return(vocabularies[name]);
    }
    
    function addVocabularyItem(v,item,t) {
        // v         vocabulary object
        // item      item  identifier within the category
        // t         translations (a record)
        //debug("v = " + JSON.stringify(v));
        //debug("item = " + JSON.stringify(item));
        //debug("t = " + JSON.stringify(t));
        if (v === undefined) throw("Not a vocabulary item");
        if (item === undefined) throw("Not an item for a vocabulary");
        if (t === undefined || t.en === undefined) throw ("No translation given for vocabulary item " + item);
        v[item] = t;
    }
    
    function genText(textId) {
        // textId        is a string
        // RETURN        string

        //
        // Return a string in current language, or in english if the
        // translation is missing.
        //
        // Example: genText("and") returns "and" by default, or "ja", sv: "och"
        // if language=fi (finnish) and translation exists.
        //

        // debug("Language: " + language + " and textId: " + textId );

        if (translations[textId] === undefined) {
            throw ("Using an invalid text item " + textId + " to genText call");
        }
        
        if (translations[textId][language] === undefined) {
            return(translations[textId]["en"]); 
        } else {
            return(translations[textId][language]);
        }
    }

    //
    // Public methods -------------------------------------------------------------------------
    //
    
    function getText(textId,needShort = false) {
        // textId         is string
        // needShort      is boolean, optional
        // RETURN         string

        // Checks
        if ( typeof(textId) != "string" || textId == "" ) {
            throw ("PsgeoLang: Error: a text string was requested from function getText, but textId is not a non-empty string!");
        }

        // Chooce which version to use, normal or short
        if (needShort) {
            var newTextId = textId + "Short";
            if (translations[newTextId] !== undefined) {
                textId = newTextId;
            }
        }
        
        return(genText(textId));
    }


    function getTextWithValues(textId,needShort,insertables) {
        // textId        is a string
        // needShort     is boolean
        // insertables   is an array of strings (if inserting numeric values, use .stringify)
        // RETURN        string
        
        var message = getText(textId,needShort);        // Ex: message="text with {{string1}} or {{string2}} placeholders."

        if ( message === "undefined" ) {
            throw ("PsgeoLang: Error: getTextWithValues: texId: " + textId + " returns no translation string!");
        }

        //
        // Now replace {{string1}} with the first member of the array,
        // {{string2}} with the second, and so on. Maxint is the
        // limit.  WARNING string numbering starts form one (not
        // zero)!
        //

        var one = "";
        var i = 0;
        for ( one of insertables ) {
            i++;
            message = message.replace( '{{string' + i.toString() + '}}',one);
        }
        return(message);
    }


    function getTextCollectionItem(controlledVocabulary,tagText) {
        // contolledVocabulary           is a string
        // tagText                       is a string
        // RETURN                        string

        //
        // These will be used to read
        // vocabularies[controlledVocabulary][tagText][language],
        // which is a string.
        //
        // Terminology: A collection (e.g. rockType) determines a
        // controlled vocabulary (a fixed set of words). These words
        // can be called tags, because they are, in effect,
        // metadata. Hence their variable name: tagText.
        //
        // Controlled vocabularies of psgeo include for instance
        // morphology of caves (karst, crevice etc), type of material
        // skied on, etc.
        //

        //
        // Checks
        //
        
        if ( controlledVocabulary === "undefined" || controlledVocabulary == "" ) {
            throw ("PsgeoLang: Error: Cannot return tag text unless the relevant controlled vocabulary is non-empty!");
        }
        if ( tagText === "undefined" || tagText == "" ) {
            throw ("PsgeoLang: Error: an empty or undefined tag text in vocabulary " + controlledVocabulary + " was requested!");
        }
        if (vocabularies[controlledVocabulary] === undefined) {
            throw ("PsgeoLang: Error: No vocabulary " + controlledVocabulary);
        }
        if (vocabularies[controlledVocabulary][tagText] === undefined) {
            throw ("PsgeoLang: Error: Vocabulary " + controlledVocabulary + " has no tag " + tagText);
        }

        //
        // Check if translation exists for this language
        //
        
        if (vocabularies[controlledVocabulary][tagText][language] === undefined) {
            language = "en";
        }
        if (vocabularies[controlledVocabulary][tagText][language] === undefined) {
            throw ("PsgeoLang: Error: Vocabulary " + controlledVocabulary + " for tag " + tagText + " has no en translation");
        }

        //
        // Done. The return value is 
        //         Ex: return(vocabularies["rockType"]["volcanic"]["fi"]); gives "vulkaaninen".
        //
        
        return(vocabularies[controlledVocabulary][tagText][language]);        

    }


    function listToText(list,needShort = false, truncate = 0 ) {
        // list          is an object of type Array
        // needShort     boolean, optional: use normal or short text?
        // truncate      number of elements to include, optional (0=all)
        // RETURN        string
        
        // Configuration
        const listSeparator = needShort ? "," : ", ";
        const lastSeparator = needShort ? "&" : " " + getText("and") + " "; // "and" or "&"
        const truncatedMarker = needShort ? "..." : ", ...";

        // Process some special cases
        if ( list.length == 0 ) return ("");                             // ""
        if ( list.length == 1 ) return (list[0]);                        // "A"
        if ( truncate == 0 ) truncate = list.length;   // 0 = show all
        if ( truncate == 1 )    return (list[0]+truncatedMarker);        // "A, ..."
        var result = list[0];   // start appending items (more than one) // "A" and more

        // Include middle elements 1 .. n-2 (OR LESS: truncate - 2)
        for ( var i = 1; i < list.length - 1 && i < truncate - 1; i++) {
            result = result + listSeparator + list[i];                   // ", B"
        }

        // Last item
        if ( truncate < list.length ) // "A, B, ..."
           result = result + listSeparator + list[truncate -1] + truncatedMarker;
        else // A, B and C
           result = result + lastSeparator + list[list.length -1];
        return(result);
    }
    
    
    function capitalize(string) {
        // string        is a string
        // RETURN        string

        if (string.length > 0) {
            return(string[0].toUpperCase() + string.slice(1));
        } else {
            return(string);
        }
    }
    
    
    function numberAlign(n,nchars) {
        // n             is a string
        // ncahrs        is an integer
        // RETURN        string: an html element: preformatted text.

        var ns = "" + n;
        while (ns.length < nchars) {
            ns = " " + ns;
        }

        return(ns);
    }


    function getLanguage() {
        // RETURN        string
        return(language);
    } 

    function getSupportedLanguages() {
        // RETURN        array of strings
        var result = [];
        var exampleTranslation = translations["place"];
        for (var prop in exampleTranslation) {
            if (Object.prototype.hasOwnProperty.call(exampleTranslation, prop)) {
                result.push(prop);
            }
        }
        return(result);
    }
    
    //
    // Return the object ----------------------------------------------------------------------
    //
    
    return({
        getLanguage:               getLanguage,               // returns language
        getSupportedLanguages:     getSupportedLanguages,     // returns list of languages supported
        getText:                   getText,                   // returns a string in current language
        getTextWithValues:         getTextWithValues,         // same as getText but with {{valueX}}
                                                              // replacement
        getTextCollectionItem:     getTextCollectionItem,     // returns a term (item) from a
                                                              // controlled vocabulary in current
                                                              // language
        listToText:                listToText,                // returns list in natural language
        capitalize:                capitalize,                // capitalize a string
        numberAlign:               numberAlign                // align a number in given number of
                                                              // characters
    });

}
