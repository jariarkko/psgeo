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
//   var citiesText = langLib.getText("cities"); // "paikkakuntaa", se: "orter"
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
                se: "Planetcaver blogg"
        });
    addTranslation("PlanetcaverShort",
        {
                en: "Planetcaver",
                fi: "Planetcaver",
                se: "Planetcaver"
        });
    addTranslation("Planetswimmer",
        {
                en: "Planetswimmer blog",
                fi: "Planetswimmer -blogi",
                se: "Planetswimmer blogg"
        });
    addTranslation("PlanetswimmerShort",
        {
                en: "Planetswimmer",
                fi: "Planetswimmer",
                se: "Planetswimmer"
        });
    addTranslation("Luolaseura",
        {
                en: "Finnish Caving Club",
                fi: "Suomen luolaseura",
                se: "Finlands grottklubb"
        });
    addTranslation("LuolaseuraShort",
        {
                en: "caving.fi",
                fi: "Luolaseura",
                se: "caving.fi"
        });

    addTranslation("map", { en: "map", fi: "kartta", se: "karta", se: "karta" });
    addTranslation("caveMap", { en: "cave map", fi: "luolakartta", se: "grottkarta", se: "grottkarta" });
    addTranslation("caves", { en: "caves", fi: "luolaa", se: "grottor" });
    addTranslation("mediumCaves", { en: "caves ({{string1}}..{{string2}}m)", fi: "luolat ({{string1}}..{{string2}}m)", se: "grottor ({{string1}}..{{string2}}m)" });
    addTranslation("mediumCavesShort", { en: "{{string1}}..{{string2}}m", se: "{{string1}}..{{string2}}m", fi: "{{string1}}..{{string2}}m" });
    addTranslation("cavelets", { en: "cavelets (under {{string1}} m)", fi: "luolaset (alle {{string1}} m)", se: "små grottor (under {{string1}} m)" });
    addTranslation("caveletsShort", { en: "<{{string1}}m", se: "<{{string1}}m", fi: "<{{string1}}m" });
    addTranslation("bigCaves", { en: "big caves (over {{string1}} m)", fi: "isot luolat (yli {{string1}} m)", se: "stora grottor (över {{string1}} m)" });
    addTranslation("bigCavesShort", { en: ">{{string1}}m", se: ">{{string1}}m", fi: ">{{string1}}m" });
    addTranslation("dimensions", { en: "dimensions", fi: "mitat", se: "mått" });
    addTranslation("literatureCaveId", { en: "The Finnish identification code for this cave is", fi: "Suomalainen luolakoodi luolalle on", se: "Finskt grottindex för grottan är" });
    addTranslation("length", { en: "length", fi: "pituus", se: "längd" });
    addTranslation("lengthCategory", { en: "length category", fi: "pituusluokka", se: "längdklass" });
    addTranslation("manmade", { en: "man made", fi: "keinotekoinen", se: "konstgjord" });
    addTranslation("ice", { en: "ice", fi: "jää", se: "is" });
    addTranslation("balls", { en: "ballpit", fi: "pallomeri", se: "bollhav" });
    addTranslation("otherMaterial", { en: "other than rock or ice", fi: "muu kuin kivi tai jää", se: "annat än sten eller is" });
    addTranslation("name", { en: "name", fi: "nimi", se: "namn" });
    addTranslation("rock", { en: "material", fi: "materiaali", se: "material", se: "material", se: "material" });
    addTranslation("rockType", { en: "material", fi: "materiaali", se: "material", se: "material", se: "material" });
    addTranslation("morphology", { en: "cave type", fi: "luolan tyyppi", se: "typ av grotta" });
    addTranslation("activity", { en: "activity", fi: "aktiviteetit", se: "aktiviteter" });
    addTranslation("swimming", { en: "swimming", fi: "uintia", se: "simning" });
    addTranslation("waterbody", { en: "waterbody", fi: "vesialue", se: "vattendrag" });
    addTranslation("ski", { en: "skiing", fi: "hiihtoa", se: "skidning" });
    addTranslation("indoor", { en: "indoors", fi: "sisällä", se: "innomhus" });
    addTranslation("outdoor", { en: "outdoors", fi: "ulkona", se: "utomhus" });
    addTranslation("skiMaterial", { en: "material", fi: "materiaali", se: "material", se: "material", se: "material" });
    addTranslation("target", { en: "target is", fi: "kohde on", se: "målet är" });
    addTranslation("urbanexTarget", { en: "target", fi: "kohde", se: "mål" });
    addTranslation("biking", { en: "biking", fi: "pyöräily", se: "cykling" });
    addTranslation("saunaType", { en: "sauna type", fi: "saunatyyppi", se: "typ av bastu" });
    addTranslation("locationSecret", { en: "exact location secret", fi: "tarkka sijainti salainen", se: "exakt position hemlig" });
    addTranslation("size", { en: "size", fi: "koko", se: "storlek" });
    addTranslation("mainCave", { en: "main cave", fi: "pääluola", se: "huvudgrotta" });
    addTranslation("sideCave", { en: "side cave", fi: "sivuluola", se: "sidogrotta" });
    addTranslation("sideCaves", { en: "side caves", fi: "sivuluolaa", se: "sidogrottor" });
    addTranslation("other", { en: "other", fi: "muuta", se: "övrigt" });
    addTranslation("article", { en: "article", fi: "artikkeli", se: "artikel" });
    addTranslation("articles", { en: "articles", fi: "artikkelia", se: "artiklar" });
    addTranslation("noArticleYet", { en: "no articles yet", fi: "ei vielä artikkeleita", se: "inga artiklar ännu" });
    addTranslation("publicationReference", { en: "literature reference", fi: "kirjallisuusviite", se: "litteraturreferens" });
    addTranslation("publication", { en: "book", fi: "kirja", se: "bok" });
    addTranslation("inPublication", { en: "in book", fi: "kirjassa", se: "i boken" });
    addTranslation("places", { en: "places", fi: "paikkaa", se: "ställen" });
    addTranslation("city", { en: "city", fi: "kaupunki", se: "stad" });
    addTranslation("country", { en: "country", fi: "maa", se: "land" });
    addTranslation("cities", { en: "cities", fi: "paikkakuntaa", se: "orter" });
    addTranslation("countries", { en: "countries", fi: "maata", se: "länder" });
    addTranslation("continents", { en: "continents", fi: "maanosaa", se: "kontinenter" });
    addTranslation("states", { en: "US states", fi: "USA:n osavaltiota", se: "stater i USA" });
    addTranslation("provinces", { en: "CA provinces", fi: "Kanadan provinssia", se: "provinser i Kanada" });
    addTranslation("cave", { en: "cave", fi: "luola", se: "grotta" });
    addTranslation("caveMaps", { en: "cave maps", fi: "karttaa", se: "kartor" });
    addTranslation("withCavemap", { en: "with cave map", fi: "luolakartalliset", se: "med grottkarta" });
    addTranslation("source", { en: "source", fi: "lähde", se: "källa" });
    addTranslation("sources", { en: "sources", fi: "lähteet", se: "källor" });
    addTranslation("filterHeader", { en: "filter", fi: "suodata", se: "filtrera" });
    addTranslation("filterLink", { en: "filter", fi: "suodata", se: "filtrera" });
    addTranslation("moreFilters", { en: "more filters", fi: "lisää suodattimia", se: "filtrera nogrannare" });
    addTranslation("filterByName", { en: "filter by name", fi: "suodata nimen perusteella", se: "filtrera enligt namn" });
    addTranslation("filterByRockType", { en: "filter by material", fi: "suodata materiaalin perusteella", se: "filtrera enligt material" });
    addTranslation("filterByMaterialType", { en: "filter by material type", fi: "suodata materiaalin perusteella", se: "filtrera enligt material" });
    addTranslation("filterByMorphology", { en: "filter by cave type", fi: "suodata tyypin perusteella", se: "filtrera på grund av typ" });
    addTranslation("filterBySource", { en: "filter by source", fi: "suodata lähteen perusteella", se: "filtrera på grund av källa" });
    addTranslation("and", { en: "and", fi: "ja", se: "och" });
    addTranslation("andShort", { en: "&", fi: "&", se: "&" });
    addTranslation("onlyFinland", { en: "only Finland", fi: "vain Suomi", se: "endast Finland" });
    addTranslation("finnishTerrain", { en: "Finnish terrain", fi: "Suomen maasto", se: "Finsk topografkarta" });
    addTranslation("finnishTerrainShort", { en: "Terrain", fi: "Maasto", se: "Terräng" });
    addTranslation("caveClassification", { en: "cave classification", fi: "luolien luokittelu", se: "Klassifiering av grottor" });
    addTranslation("coordinates", { en: "coordinates", fi: "koordinaatit", se: "koordinater" });
    addTranslation("alternativeNames", { en: "other names", fi: "muita nimiä", se: "övriga namn" });
    addTranslation("alternativeCoordinates", { en: "other reported coordinates", fi: "muita ilmoitettuja koordinaatteja", se: "övriga koordinater" });
    addTranslation("off", { en: "off", fi: "etäisyydellä", se: "avstånd" });
    addTranslation("add", { en: "add", fi: "lisää", se: "lägg till" }); 
    addTranslation("addCave", { en: "add a cave", fi: "lisää luola", se: "lägg till en grotta" });
    addTranslation("addCaveShort", { en: "add", fi: "lisää", se: "lägg till" });
    addTranslation("modifyCave", { en: "suggest a correction", fi: "kerro korjaustarpeesta", se: "ge nya uppgifter" });
    addTranslation("modifyCaveShort", { en: "correct", fi: "päivitä", se: "uppdatera" });
    addTranslation("about", { en: "about", fi: "tietoja", se: "information" });
    addTranslation("moreMaps", { en: "more maps", fi: "lisää karttoja", se: "fler kartor" });
    addTranslation("more", { en: "more", fi: "lisää", se: "visa mera", se: "lägg till" });
    addTranslation("toolsAndAbout", { en: "tools & about", fi: "työkalut & tiedot", se: "verktyg och information" });
    addTranslation("settings", { en: "more information and settings", fi: "lisäasetukset ja -tiedot", se: "mera information och flere val" });
    addTranslation("moreInformation", { en: "more information and tools", fi: "lisätiedot ja -työkalut", se: "mera information och verktyg" });
    addTranslation("moreToRead", { en: "reading list", fi: "luettavaa", se: "att läsa" });
    addTranslation("video", { en: "video", fi: "video", se: "video" });
    addTranslation("up", { en: "going up", fi: "ylös", se: "upp" });
    addTranslation("climbingTypeText", { en: "climbing type", fi: "kiipeilytyyppi", se: "typ av klättring" });
    addTranslation("climbingTypeIs", { en: "climbing type is", fi: "kiipeilytyyppi on", se: "typ av klättring är" });
    addTranslation("place", { en: "place", fi: "paikka", se: "ställe" });
    
    //
    // Longer explanations --------------------------------------------------------------------
    //

    addTranslation("warningsAndDisclaimers",
        {
            en: "warnings and disclaimers",
            fi: "varoitukset ja vastuun rajoitukset",
            se: "varningar och ansvarsfriskrivning"
        });
    addTranslation("toolsExplanation",
        {
            en: "these tools are useful for further research",
            fi: "nämä työkalut ovat hyödyllisiä uusien paikkojen tutkimisessa",
            se: "dessa verktyg kan vara nyttiga i letning av nya ställen"
        });
    addTranslation("toolsExplanationShort",
        {
            en: "other useful tools",
            fi: "hyödyllisiä työkaluja",
            se: "nyttiga verktyg"
        });
    addTranslation("openInNewWindow",
        {
            en: "the tools open in a new tab",
            fi: "työkalut avautuvat uudella välilehdellä",
            se: "verktygen öppnas på en ny webläsarflik"
        });
    addTranslation("dataExplanationCavingAssociation",
        {
            en: 'The cave data comes from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service.',
            fi: 'Palvelimen tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa.',
            se: 'Data hämtas från <a href="https://luolaseura.fi">Finlands grottklubbens</a> databas. Dessutom hämtas en del data från <a href="https://planetcaver.net">Planetcavers</a> mindre databas.'
        });
    addTranslation("dataExplanationCavingAssociationShort",
        {
            en: 'Cave info is from the <a href="http s://luolaseura.fi">Finnish Caving Association</a> (and some from <a href="https://planetcaver.net">Planetcaver</a>).',
            fi: 'Luolatieto on Suomen <a href="https://luolaseura.fi">Luolaseuralta</a>, osin myös <a href="https://planetcaver.net">Planetcaverilta</a>.',
            se: 'Grottadata från <a href="https://luolaseura.fi">Finlands grottklubb</a>, delvis också från <a href="https://planetcaver.net">Planetcaver</a>.'
        });
    addTranslation("dataExplanation",
        {
            en: "This server employs a dataset by Jari Arkko at ",
            fi: "Palvelu käyttää Jari Arkon tietokantaa ",
            se: "Servicen använder Jari Arkkos databas "
        });
    addTranslation("libraryExplanation",
        {
            en: 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a> ({{string1}}), an open source software that can draw and filter activities on a map, based a <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">data model</a>.',
            fi: 'Palvelin käyttää <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa ({{string1}}), jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia ja käyttää semanttista <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">tietomallia</a>.',
            se: 'Servern kör <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-programmet ({{string1}}), som visar aktiviteter och hobbyställen på karta. Programmet är open source och använder semantisk <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">data modell</a>.'
        });
    addTranslation("libraryExplanationShort",
        {
            en: 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a> {{string1}}.',
            fi: 'Palvelin käyttää <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa {{string1}}.',
            se: 'Servern kör <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-programmet {{string1}}.'
        });
    addTranslation("developersExplanation",
        {
            en: "Psgeo has been developers are Jari Arkko, Ralf Strandell, and Jarmo Ruuth.",
            fi: "Psgeo:n kehittäjät ovat Jari Arkko, Ralf Strandell ja Jarmo Ruuth.",
            se: "Psgeo är utvecklat av Jari Arkko, Ralf Strandell och Jarmo Ruuth."
        });
    addTranslation("developersExplanationShort",
        {
            en: "(Arkko, Strandell & Ruuth)",
            fi: "(Arkko, Strandell & Ruuth)",
            se: "(Arkko, Strandell & Ruuth)"
        });
    addTranslation("dataDistinctExplanation",
        {
            en: "The authors of Psgeo shall not be held responsible for any data displayed with it; the data is separate.",
            fi: "Psgeo:n ohjelmiston kehittäjät eivät vastaa ohjelmiston käytöstä eikä tiedoista, jota sen avulla esitetään.",
            se: "Utvecklarna av Psgeo ansvarar inte för bruket av psgeo eller av data som presenteras med hjälp av den."
        });
    addTranslation("dangerousExplanation",
        {
            en: "Note: LOCATIONS SHOWN CAN BE DANGEROUS! The website or software developers are not responsible for any accidents.",
            fi: "Huom! NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA! Palvelun ylläpitäjät tai ohjelmiston kehittäjät eivät vastaa mahdollisista onnettomuuksista.",
            se: "Observera! STÄLLEN SOM VISAS ÄR OFTAST FARLIGA! Utvecklarna av programvaran eller upprätthållaren av databasen ansvarar inte för olyckor."
        });
    addTranslation("dangerousExplanationShort",
        {
            en: "LOCATIONS SHOWN ARE DANGEROUS! The website is not responsible for accidents.",
            fi: "NÄYTETTÄVÄT PAIKAT OVAT VAARALLISIA! Palvelu ei vastaa onnettomuuksista.",
            se: "PLATSERNA SOM VISAS ÄR FARLIGA! Denna webplats är inte ansvarig för olyckor."
        });
    addTranslation("retkipaikkaToolName",
        {
            en: "Retkipaikka",
            fi: "Retkipaikka",
            se: "Retkipaikka"
        });
    addTranslation("retkipaikkaToolDescription",
        {
            en: "Retkipaikka and Matkailukartta covers a large set of Finnish natural sights.",
            fi: "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan.",
            se: "Retkipaikka och Matkailukartta ger en relativt omfattande skildring av sevärda finska naturställen."
        });
    addTranslation("retkipaikkaToolDescriptionShort",
        {
            en: "Finnish natural sights.",
            fi: "Suomen luonnonnähtyvyydet.",
            se: "Sevärda finska naturställen."
        });
    addTranslation("ruuthToolName",
        {
            en: "Ruuth map",
            fi: "Ruuthin kartta",
            se: "Ruuths karta"
        });
    addTranslation("ruuthToolDescription",
        {
            en: "Historic artefacts to caves or to occupation-era aearial maps. Find new caves!",
            fi: "Muinaismuistot, luolat, vanhat ilmakuvat, jne. Uusien luolien löytämiseen!",
            se: "Fornfynd, grottor, gamla flygfotografier med mera. För att finna nya grottor!"
        });
    addTranslation("ruuthToolDescriptionShort",
        {
            en: "Historic artefacts, old aearial maps, etc.",
            fi: "Muinaismuistot, vanhat ilmakuvat, jne.",
            se: "Fornfynd, flygfoton mm."
        });
    addTranslation("hakkuToolName",
        {
            en: "Hakku Server",
            fi: "Hakku-palvelu",
            se: "Hakku-servern"
        });
    addTranslation("hakkuToolDescription",
        {
            en: "Open data about boulders, type of ground rock in different areas, etc.",
            fi: "Siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne.",
            se: "Positionerna av flyttblock, berggrund, olika slags mätningar i Finland, mm."
        });
    addTranslation("hakkuToolDescriptionShort",
        {
            en: "Open data about boulders, rock types, etc.",
            fi: "Siirtolohkareiden sijainnit, maaperä, jne.",
            se: "Geologisk information."
        });
    addTranslation("laserToolName",
        {
            en: "MML laser",
            fi: "MML:n laser",
            se: "Lantmäteriets laser"
        });
    addTranslation("laserToolDescription",
        {
            en: "The Finnish Surveying Institute's laser-scanned terrain forms.",
            fi: "Maanmittauslaitoksen laser-mitatut maanpinnan muodot.",
            se: "Ytformer lasermätta av Lantmäteriet (MML)."
        });
    addTranslation("laserToolDescriptionShort",
        {
            en: "Laser-scanned terrain forms.",
            fi: "Laser-mitatut maanpinnan muodot.",
            se: "Laser-mätta ytformer."
        });
    addTranslation("nimisampoToolName",
        {
            en: "Nimisampo",
            fi: "Nimisampo",
            se: "Nimisampo"
        });
    addTranslation("nimisampoToolDescription",
        {
            en: "Nimisampo is a tool for place name research. It it meant both for academia and the general public.",
            fi: "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden käyttöön.",
            se: "Nimisampo är en öppen web service för alla som är intresserade av finska ortsnamn."
        });
    addTranslation("nimisampoToolDescriptionShort",
        {
            en: "Place name research.",
            fi: "Paikannimistöhakukone.",
            fi: "Ortnamnsökning."
        });
    
    //
    // Translations for vocabularies ----------------------------------------------------------
    //

    //
    // Rocktype vocabulary --------------------------------------------------------------------
    //

    var v = addVocabulary("rockType");
    addVocabularyItem(v,"rock-granite", { en: "non-volcanic, non-sedimentary", fi: "muu kivi kuin vulkaaninen tai sedimentti", se: "annan sten än vulkaniskt eller sediment" });
    addVocabularyItem(v,"rock-gypsum", { en: "gypsum", fi: "kipsi", se: "gips" });
    addVocabularyItem(v,"rock-limestone", { en: "limestone/dolomite", fi: "kalkkikivi/dolomiitti", se: "kalksten/dolomit" });
    addVocabularyItem(v,"rock-marble", { en: "marble", fi: "marmori", se: "marmor" });
    addVocabularyItem(v,"rock-mudrock", { en: "mudrock", fi: "savikivi", se: "lersten" });
    addVocabularyItem(v,"rock-other", { en: "other rock", fi: "muu kivi", se: "annan sten" });
    addVocabularyItem(v,"rock-salt", { en: "salt", fi: "suola", se: "salt" });
    addVocabularyItem(v,"rock-sandstone", { en: "sandstone", fi: "hiekkakivi", se: "sandsten" });
    addVocabularyItem(v,"rock-unknown", { en: "unknown", fi: "ei tiedossa", se: "okänt" });
    addVocabularyItem(v,"rock-volcanic", { en: "volcanic", fi: "vulkaaninen", se: "vulkanisk" });
                  
    //
    // Ground type vocabulary -----------------------------------------------------------------
    //

    v = addVocabulary("groundType");
    addVocabularyItem(v,"gravel", { en: "gravel", fi: "sora" });
    addVocabularyItem(v,"ice", { en: "ice", fi: "jää", se: "is" });
    addVocabularyItem(v,"moraine", { en: "moraine", fi: "moreeni", se: "moren" });
    addVocabularyItem(v,"other-material", { en: "other material", fi: "other material", se: "annat material" });
    addVocabularyItem(v,"rock", { en: "rock", fi: "kallio", se: "berggrund" }); // see rockTypes for detailed classification
    addVocabularyItem(v,"sand", { en: "sand", fi: "hiekka", se: "sand" });
    addVocabularyItem(v,"snow", { en: "snow", fi: "lumi", se: "snö" });
    addVocabularyItem(v,"turf", { en: "turf", fi: "turve", se: "torv" });

    //
    // Rock type and oher material vocabulary -------------------------------------------------
    //
    
    v = copyVocabulary("rockTypeAndOtherMaterial","rockType");
    addVocabularyItem(v,"ice", { en: "ice", fi: "jää", se: "is" });
    addVocabularyItem(v,"other-material", { en: "other material", fi: "other material", se: "annat material än sten eller is" });
    
    //
    // Morphology vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("morphology");
    addVocabularyItem(v,"morphology-boulders", { en: "boulder", fi: "lohkare", se: "blockgrotta" });
    addVocabularyItem(v,"morphology-crack", { en: "crevice", fi: "rako", se: "sprickgrotta" });
    addVocabularyItem(v,"morphology-crystallization", { en: "blister", fi: "kideonkalo", se: "kavitet med kristaller" });
    addVocabularyItem(v,"morphology-erosion", { en: "erosion", fi: "eroosio", se: "erosionsgrotta" });
    addVocabularyItem(v,"morphology-karst", { en: "karst", fi: "karsti", se: "karst" });
    addVocabularyItem(v,"morphology-organic", { en: "organic, reef or turf", fi: "koralli tai turve", se: "korall eller torv" });
    addVocabularyItem(v,"morphology-other", { en: "other", fi: "muu", se: "annat" });
    addVocabularyItem(v,"morphology-unknown", { en: "unknown", fi: "ei tiedossa", se: "okänd" });
    addVocabularyItem(v,"morphology-volcanic", { en: "volcanic", fi: "vulkaaninen", se: "vulkanisk" });
    addVocabularyItem(v,"morphology-weathering", { en: "weathering", fi: "rapautumis", se: "förvittringsgrotta" });
    
    //
    // Caving activity vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("cavingActivity");
    addVocabularyItem(v,"basic", { en: "basic caving", fi: "luolailu", se: "grottning" });
    addVocabularyItem(v,"biking", { en: "biking", fi: "pyöräily", se: "cykling" });
    addVocabularyItem(v,"boating", { en: "boating", fi: "veneily", se: "båtliv" });
    addVocabularyItem(v,"digging", { en: "digging", fi: "kaivuu", se: "grävning" });
    addVocabularyItem(v,"diving", { en: "diving", fi: "sukellus", se: "dykeri" });
    addVocabularyItem(v,"researching", { en: "researching", fi: "tutkimus", se: "forskning" });
    addVocabularyItem(v,"skiing", { en: "skiing", fi: "hiihto", se: "skidåkning" });
    addVocabularyItem(v,"srt", { en: "SRT", fi: "SRT", se: "SRT" });
    addVocabularyItem(v,"studying", { en: "studying", fi: "oppiminen", se: "studerande" });
    addVocabularyItem(v,"surveying", { en: "surveying", fi: "kartoitus", se: "kartering" });
    addVocabularyItem(v,"swimming", { en: "swimming", fi: "uinti", se: "simning" });
    addVocabularyItem(v,"training", { en: "training", fi: "opetus", se: "undervisning" });
    
    //
    // Swimming place vocabulary --------------------------------------------------------------
    //

    v = addVocabulary("swimmingPlace");
    addVocabularyItem(v,"beach", { en: "on an official beach", fi: "virallisella uintipaikalla", se: "vid offentlig badstrand" });
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", se: "innomhus" });
    addVocabularyItem(v,"nature", { en: "in nature", fi: "luonnon rannalla", se: "vid naturlig strand" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", se: "utomhus" });
    addVocabularyItem(v,"thermal-bath", { en: "in a thermal bath", fi: "kuumassa lähteessä", se: "i en varm källa" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", se: "under jorden" });
    addVocabularyItem(v,"waterbody-cave", { en: "in a cave", fi: "luolassa", se: "i en grotta" });
    addVocabularyItem(v,"waterbody-lake", { en: "on a lake", fi: "järvellä", se: "i en sjö" });
    addVocabularyItem(v,"waterbody-other", { en: "in some other body of water", fi: "jossain muussa vesialtaassa", se: "i något annat vattendrag" });
    addVocabularyItem(v,"waterbody-pool", { en: "in a swimming pool", fi: "uima-altaassa", se: "i simbassäng" });
    addVocabularyItem(v,"waterbody-river", { en: "on a river", fi: "joessa", se: "i en å, flod eller älv" });
    addVocabularyItem(v,"waterbody-sandpit", { en: "in a sandpit", fi: "hiekkakuopalla", se: "i ett sandtag" });
    addVocabularyItem(v,"waterbody-sea", { en: "in the sea", fi: "meressä", se: "i sjön" });
    addVocabularyItem(v,"waterbody-unknown", { en: "unknown", fi: "ei tiedossa", se: "okänt" });
    
    //
    // Climbing type vocabulary ---------------------------------------------------------------
    //

    v = addVocabulary("climbingType");
    addVocabularyItem(v,"mountain", { en: "mountain", fi: "vuoristo", se: "bergskedja" });
    addVocabularyItem(v,"rock", { en: "rock", fi: "kalliokiipeily", se: "bergsklättring" });
    addVocabularyItem(v,"wall", { en: "wall", fi: "seinäkiipeily", se: "väggklättring" });
    addVocabularyItem(v,"ice", { en: "ice", fi: "jääkiipeily", se: "isklättring" });
    addVocabularyItem(v,"volcanoes", { en: "volcanoes", fi: "tulivuorikiipeily", se: "klättring på vulkaner" });
    
    //
    // Swimming material vocabulary -----------------------------------------------------------
    //

    v = addVocabulary("swimmingMaterial");
    addVocabularyItem(v,"balls", { en: "in a ball pit", fi: "pallomeressä", se: "i ett bollhav" });
    addVocabularyItem(v,"ice", { en: "in an ice hole", fi: "avannossa", se: "i vak" });
    addVocabularyItem(v,"water", { en: "in water", fi: "vedessä", se: "i vatten" });
    
    //
    // Skiing material vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("skiMaterial");
    addVocabularyItem(v,"snow", { en: "on snow", fi: "lumella", se: "på snö" });
    addVocabularyItem(v,"ash", { en: "on ash", fi: "tuhkalla", se: "på aska" });
    addVocabularyItem(v,"asphalt", { en: "on asphalt", fi: "asfaltilla", se: "på asfalt" });
    addVocabularyItem(v,"grass", { en: "on grass", fi: "nurmikolla", se: "på gräsmatta" });
    addVocabularyItem(v,"imported-snow", { en: "on carried snow", fi: "kannetulla lumella", se: "på hämtad snö" });
    addVocabularyItem(v,"mud", { en: "in mud", fi: "mudassa", se: "i lera" });
    addVocabularyItem(v,"other-substances", { en: "on other substances", fi: "muilla materiaaleilla", se: "på annat material" });
    addVocabularyItem(v,"plastic", { en: "on plastic", fi: "muovilla", se: "på plast" });
    addVocabularyItem(v,"rock", { en: "on rocks", fi: "kivillä", se: "på sten" });
    addVocabularyItem(v,"sand", { en: "on sand", fi: "hiekalla", se: "på sand" });
    addVocabularyItem(v,"unknown-substance", { en: "unknown", fi: "ei tiedossa", se: "okänt" });

    //
    // Skiing place vocabulary ----------------------------------------------------------------
    //

    v = addVocabulary("skiPlace");
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", se: "utomhus" });
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", se: "innomhus" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", se: "under jorden" });
    
    //
    // Skiing uphill vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("skiUphill");
    addVocabularyItem(v,"lifts", { en: "with a lift", fi: "hissillä", se: "med hiss" });
    addVocabularyItem(v,"heli", { en: "with a helicopter", fi: "helikopterilla", se: "med helikopter" });
    addVocabularyItem(v,"hiking", { en: "by hiking", fi: "kävelemällä", se: "gåendes" });
    addVocabularyItem(v,"skinning", { en: "by skinning", fi: "nousukarvoilla", se: "med stighudar" });
    addVocabularyItem(v,"car", { en: "with a car", fi: "autolla", se: "med bil" });
    addVocabularyItem(v,"bus", { en: "with a bus", fi: "bussilla", se: "med buss" });
    addVocabularyItem(v,"train", { en: "with a train", fi: "junalla", se: "med tåg" });
    addVocabularyItem(v,"horse", { en: "with a horse", fi: "hevosella", se: "på häst" });
    addVocabularyItem(v,"dogs", { en: "with dogs", fi: "koiravaljakolla", se: "med hundspann" });
    addVocabularyItem(v,"other-uphill", { en: "with some other method", fi: "jollain toisella tavalla", se: "på något annat sätt" });
    addVocabularyItem(v,"unknown-uphill", { en: "unknown", fi: "ei tiedossa", se: "okänt" });

    //
    // Urban exploration target vocabulary ----------------------------------------------------
    //

    v = addVocabulary("urbanexTarget");
    addVocabularyItem(v,"airports", { en: "an airport", fi: "lentokenttä", se: "flygplats" });
    addVocabularyItem(v,"amusement-parks", { en: "an amusement park", fi: "huvipuisto", se: "nöjespark" });
    addVocabularyItem(v,"bridges", { en: "a bridge", fi: "silta", se: "bro" });
    addVocabularyItem(v,"buildings", { en: "a building", fi: "rakennus", se: "byggnad" });
    addVocabularyItem(v,"bunkers", { en: "a bunker", fi: "bunkkeri", se: "bunker" });
    addVocabularyItem(v,"castles", { en: "a castle", fi: "linna", se: "slott" });
    addVocabularyItem(v,"catacombs", { en: "a catacomb", fi: "katakombi", se: "katakomber" });
    addVocabularyItem(v,"harbours", { en: "a harbour", fi: "satama", se: "hamn" });
    addVocabularyItem(v,"historic-sites", { en: "a historic site", fi: "historiallinen paikka", se: "historiskt ställe" });
    addVocabularyItem(v,"industrial", { en: "an industrial site", fi: "teollisuus", se: "industri" });
    addVocabularyItem(v,"landfills", { en: "a landfill", fi: "kaatopaikka", se: "deponi" });
    addVocabularyItem(v,"memorial", { en: "a memorial", fi: "muistomerkki", se: "minnesmärke" });
    addVocabularyItem(v,"military", { en: "a military site", fi: "sotilaallinen kohde", se: "militärt" });
    addVocabularyItem(v,"mines", { en: "a mine", fi: "kaivos", se: "gruva" });
    addVocabularyItem(v,"none", { en: "nothing", fi: "ei mikään", se: "ingenting" });
    addVocabularyItem(v,"other", { en: "other", fi: "jokin muu", se: "annat" });
    addVocabularyItem(v,"prisons", { en: "a prison", fi: "vankila", se: "fängelse" });
    addVocabularyItem(v,"quarries", { en: "a quarry", fi: "louhos", se: "stenbrott" });
    addVocabularyItem(v,"railways", { en: "a railway", fi: "rautatie", se: "järnväg" });
    addVocabularyItem(v,"ruins", { en: "ruins", fi: "rauniot", se: "ruiner" });
    addVocabularyItem(v,"silos", { en: "a silo", fi: "siilo", se: "silo" });
    addVocabularyItem(v,"skating-rinks", { en: "a skating rink", fi: "luistelukenttä", se: "skridskobana" });
    addVocabularyItem(v,"ski-lifts", { en: "a ski lift", fi: "hiihtohissi", se: "skidlift" });
    addVocabularyItem(v,"smokestacks", { en: "a smokestack", fi: "piippu", se: "skorsten" });
    addVocabularyItem(v,"towers", { en: "a tower", fi: "torni", se: "torn" });
    addVocabularyItem(v,"trenches", { en: "a trench", fi: "juoksuhauta", se: "dike" });
    addVocabularyItem(v,"tunnels", { en: "a tunnel", fi: "tunneli", se: "tunnel" });
    addVocabularyItem(v,"unknown", { en: "unknown", fi: "ei tiedossa", se: "okänt" });
    addVocabularyItem(v,"vehicles", { en: "a vehicle", fi: "kulkuväline", se: "transportmedel" });
    
    //
    // Biking location vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("bikeTrack");
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä", se: "innomhus" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona", se: "utomhus" });
    addVocabularyItem(v,"track-city", { en: "in city", fi: "kaupungissa", se: "i staden" });
    addVocabularyItem(v,"track-nature", { en: "in the nature", fi: "luonnossa", se: "i naturen" });
    addVocabularyItem(v,"track-road", { en: "on roads", fi: "maanteillä", se: "på landsväg" });
    addVocabularyItem(v,"track-trail", { en: "on a trail", fi: "poluilla", se: "på stig" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla", se: "under jorden" });
    
    //
    // Bike type vocabulary -------------------------------------------------------------------
    //

    v = addVocabulary("bikeType");
    addVocabularyItem(v,"bike-city", { en: "on a city bike", fi: "kaupunkipyörällä", se: "på en stadscykel" });
    addVocabularyItem(v,"bike-mountain", { en: "on an MTB", fi: "maastopyörällä", se: "på en terrängcykel" });
    addVocabularyItem(v,"bike-other", { en: "on special bike type", fi: "erikoispyörällä", se: "på en specialcykel" });
    addVocabularyItem(v,"bike-road", { en: "on a road bike", fi: "maantiepyörällä", se: "på en vägcykel" });
    addVocabularyItem(v,"bike-tandem", { en: "on a tandem bike", fi: "tandem-pyörällä", se: "på en tandem-cykel" });
    addVocabularyItem(v,"bike-tricycle", { en: "on a tricycle", fi: "kolmipyöräisellä", se: "på en trehjuling" });
    addVocabularyItem(v,"bike-unicycle", { en: "on an unicycle", fi: "yksipyöräisellä", se: "på en enhjuling" });
    
    //
    // Sauna type vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("saunaType");
    addVocabularyItem(v,"infrared", { en: "infrared sauna", fi: "infrapunasauna", se: "infraröd bastu" });
    addVocabularyItem(v,"normal", { en: "Finnish sauna", fi: "suomalainen sauna", se: "finsk bastu" });
    addVocabularyItem(v,"smoke", { en: "smoke sauna", fi: "savusauna", se: "rökbastu" });
    addVocabularyItem(v,"steam", { en: "Turkish sauna", fi: "höyrysauna", se: "ångbastu" });
    addVocabularyItem(v,"unknown", { en: "unknown sauna", fi: "saunatyyppi ei tiedossa", se: "okänt bastu" });
    
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
        // Example: genText("and") returns "and" by default, or "ja", se: "och"
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
        
        // replace {{string1}} with the first member of the array, {{string2}} with the second, and so on. Maxint is the limit.
        // WARNING string numbering starts form one (not zero)!

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
