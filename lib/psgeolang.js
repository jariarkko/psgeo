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
//   var citiesText = langLib.getText("cities"); // "paikkakuntaa"
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

    translations.map = {
        en: "map",
        fi: "kartta"
    };
    translations.caveMap = {
        en: "cave map",
        fi: "luolakartta"
    };
    translations.caves = {
        en: "caves",
        fi: "luolaa"
    };
    translations.mediumCaves = {
        en: "caves ({{string1}}..{{string2}}m)",
        fi: "luolat ({{string1}}..{{string2}}m)"
    };
    translations.mediumCavesShort = {
        en: "{{string1}}..{{string2}}m",
        fi: "{{string1}}..{{string2}}m"
    };
    translations.cavelets = {
        en: "cavelets (under {{string1}} m)",
        fi: "luolaset (alle {{string1}} m)"
    };
    translations.caveletsShort = {
        en: "<{{string1}}m",
        fi: "<{{string1}}m"
    };
    translations.bigCaves = {
        en: "big caves (over {{string1}} m)",
        fi: "isot luolat (yli {{string1}} m)"
    };
    translations.bigCavesShort = {
        en: ">{{string1}}m",
        fi: ">{{string1}}m"
    };
    translations.dimensions = {
        en: "dimensions",
        fi: "mitat"
    };
    translations.literatureCaveId = {
        en: "The Finnish identification code for this cave is",
        fi: "Suomalainen luolakoodi luolalle on"
    };
    translations.length = {
        en: "length",
        fi: "pituus"
    };
    translations.lengthCategory = {
        en: "length category",
        fi: "pituusluokka"
    };
    translations.manmade = {
        en: "man made",
        fi: "keinotekoinen"
    };
    translations.ice = {
        en: "ice",
        fi: "jää"
    };
    translations.balls = {
        en: "ballpit",
        fi: "pallomeri"
    };
    translations.otherMaterial = {
        en: "other than rock or ice",
        fi: "muu kuin kivi tai jää"
    };
    translations.name = {
        en: "name",
        fi: "nimi"
    };
    translations.rock = {
        en: "material",
        fi: "materiaali"
    };
    translations.rockType = {
        en: "material",
        fi: "materiaali"
    };
    translations.morphology = {
        en: "cave type",
        fi: "luolan tyyppi"
    };
    translations.activity = {
        en: "activity",
        fi: "aktiviteetit"
    };
    translations.swimming = {
        en: "swimming",
        fi: "uintia"
    };
    translations.waterbody = {
        en: "waterbody",
        fi: "vesialue"
    };
    translations.ski = {
        en: "skiing",
        fi: "hiihtoa"
    };
    translations.indoor = {
        en: "indoors",
        fi: "sisällä"
    };
    translations.outdoor = {
        en: "outdoors",
        fi: "ulkona"
    };
    translations.skiMaterial = {
        en: "material",
        fi: "materiaali"
    };
    translations.target = {
        en: "target is",
        fi: "kohde on"
    };
    translations.urbanexTarget = {
        en: "target",
        fi: "kohde"
    };
    translations.biking = {
        en: "biking",
        fi: "pyöräily"
    };
    translations.saunaType = {
        en: "sauna type",
        fi: "saunatyyppi"
    };
    translations.locationSecret = {
        en: "exact location secret",
        fi: "tarkka sijainti salainen"
    };
    translations.size = {
        en: "size",
        fi: "koko"
    };
    translations.mainCave = {
        en: "main cave",
        fi: "pääluola"
    };
    translations.sideCave = {
        en: "side cave",
        fi: "sivuluola"
    };
    translations.sideCaves = {
        en: "side caves",
        fi: "sivuluolaa"
    };
    translations.other = {
        en: "other",
        fi: "muuta"
    };
    translations.article = {
        en: "article",
        fi: "artikkeli"
    };
    translations.articles = {
        en: "articles",
        fi: "artikkelia"
    };
    translations.noArticleYet = {
        en: "no articles yet",
        fi: "ei vielä artikkeleita"
    };
    translations.publicationReference = {
        en: "literature reference",
        fi: "kirjallisuusviite"
    };
    translations.publication = {
        en: "book",
        fi: "kirja"
    };
    translations.inPublication = {
        en: "in book",
        fi: "kirjassa"
    };
    translations.places = {
        en: "places",
        fi: "paikkaa"
    };
    translations.city = {
        en: "city",
        fi: "kaupunki"
    };
    translations.country = {
        en: "country",
        fi: "maa"
    };
    translations.cities = {
        en: "cities",
        fi: "paikkakuntaa"
    };
    translations.countries = {
        en: "countries",
        fi: "maata"
    };
    translations.continents = {
        en: "continents",
        fi: "maanosaa"
    };
    translations.states = {
        en: "US states",
        fi: "USA:n osavaltiota"
    };
    translations.provinces = {
        en: "CA provinces",
        fi: "Kanadan provinssia"
    };
    translations.cave = {
        en: "cave",
        fi: "luola"
    };
    translations.caveMaps = {
        en: "cave maps",
        fi: "karttaa"
    };
    translations.withCavemap = {
        en: "with cave map",
        fi: "luolakartalliset"
    };
    translations.source = {
        en: "source",
        fi: "lähde"
    };
    translations.sources = {
        en: "sources",
        fi: "lähteet"
    };
    translations.filterHeader = {
        en: "filter",
        fi: "suodata"
    };
    translations.filterLink = {
        en: "filter",
        fi: "suodata"
    };
    translations.moreFilters = {
        en: "more filters",
        fi: "lisää suodattimia"
    };
    translations.filterByName = {
        en: "filter by name",
        fi: "suodata nimen perusteella"
    };
    translations.filterByRockType = {
        en: "filter by material",
        fi: "suodata materiaalin perusteella"
    };
    translations.filterByMaterialType = {
        en: "filter by material type",
        fi: "suodata materiaalin perusteella"
    };
    translations.filterByMorphology = {
        en: "filter by cave type",
        fi: "suodata tyypin perusteella"
    };
    translations.filterBySource = {
        en: "filter by source",
        fi: "suodata lähteen perusteella"
    };
    translations.other = {
        en: "other",
        fi: "muuta"
    };
    translations.and = {
        en: "and",
        fi: "ja"
    };
    translations.onlyFinland = {
        en: "only Finland",
        fi: "vain Suomi"
    };
    translations.finnishTerrain = {
        en: "Finnish terrain",
        fi: "Suomen maasto"
    };
    translations.finnishTerrainShort = {
        en: "Terrain",
        fi: "Maasto"
    };
    translations.caveClassification = {
        en: "cave classification",
        fi: "luolien luokittelu"
    };
    translations.coordinates = {
        en: "coordinates",
        fi: "koordinaatit"
    };
    translations.alternativeNames = {
        en: "other names",
        fi: "muita nimiä"
    };
    translations.alternativeCoordinates = {
        en: "other reported coordinates",
        fi: "muita ilmoitettuja koordinaatteja"
    };
    translations.off = {
        en: "off",
        fi: "etäisyydellä"
    };
    translations.add = {
        en: "add",
        fi: "lisää"
    };
    translations.orModify = {
        en: "or modify",
        fi: "tai korjaa"
    };
    translations.about = {
        en: "about",
        fi: "tietoja"
    };
    translations.moreMaps = {
        en: "more maps",
        fi: "lisää karttoja"
    };
    translations.more = {
        en: "more",
        fi: "lisää"
    };
    translations.toolsAndAbout = {
        en: "tools & about",
        fi: "työkalut & tiedot"
    };
    translations.settings = {
        en: "more information and settings",
        fi: "lisäasetukset ja -tiedot"
    };
    translations.moreInformation = {
        en: "more information and tools",
        fi: "lisätiedot ja -työkalut"
    };
    translations.moreToRead = {
        en: "reading list",
        fi: "luettavaa"
    };
    translations.video = {
        en: "video",
        fi: "video"
    };
    translations.warningsAndDisclaimers = {
        en: "warnings and disclaimers",
        fi: "varoitukset ja vastuun rajoitukset"
    };
    translations.toolsExplanation = {
        en: "these tools have been found to be very useful for further research",
        fi: "nämä työkalut on todettu erittäin hyödylliseksi uusien paikkojen tutkimisessa"
    };
    translations.openInNewWindow = {
        en: "the tools open in a new, separate window (centered at the same map location as you are browsing now, where technically possible)",
        fi: "nämä työkalut avautuvat uudessa, erillisessä ikkunassa (keskitettynä samaan kohtaan kartalla, jos se on mahdollista)"
    };
    translations.dataExplanationCavingAssociation = {
        en: 'This service provides the cave data from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service. Map data is by Google and Karttapaikka.',
        fi: 'Tällä palvelimella näytettävät tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa. Karttatieto on peräisin Googlen ja Karttapaikan palveluista.'
    };
    translations.dataExplanation = {
        en: "This server employs a dataset by Jari Arkko at ",
        fi: "Tällä palvelimella näytetään Jari Arkon tietokannan tietoja palvelimelta "
    };
    translations.libraryExplanation = {
        en: 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>, an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">format</a> about places, actions, and articles describing them.',
        fi: 'Palvelin ajaa <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon suodatuksen pohjauten alla olevaan <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">semanttiseen tietoon</a> paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä.'
    };
    translations.developersExplanation = {
        en: "Psgeo has been developed by Jari Arkko, with help from Ralf Strandell and Jarmo Ruuth.",
        fi: "Psgeo:ta on kehittänyt lähinnä Jari Arkko, mutta myös Ralf Strandell ja Jarmo Ruuth ovat auttaneet sen kehittämisessä."
    };
    translations.dataDistinctExplanation = {
        en: "Note that the software library is distinct from any data that is displayed with it. The authors of Psgeo shall not be held responsible for any data displayed with it.",
        fi: "Psgeo pelkkä ohjelmistokirjasto, eikä sinänsä liity mitenkään tietoihin joita sen avulla esitetään. Psgeo:n ohjelmiston kirjoittajat eivät ole mitenkään vastuussa tiedosta, jota kirjastolla esitetään."
    };
    translations.dangerousExplanation = {
        en: "Also, neither the software authors or data providers are responsible for possible accidents resulting in attempting to go there. MOST LOCATIONS SHOWN WITH THIS TOOL ARE DANGEROUS!",
        fi: "Ohjelmiston kirjoittajat tai sillä esitettävän tiedon kerääjät eivät myöskään ole vastuussa onnettomuksista joita saattaa sattua, mikäli esitetyissä kohteissa vieraillaan. NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA!"
    };
    translations.retkipaikkaToolName = {
        en: "Retkipaikka & Matkailukartta",
        fi: "Retkipaikka & Matkailukartta"
    };
    translations.retkipaikkaToolDescription = {
        en: "Retkipaikka and Matkailukartta have a map that covers probably the largest set of Finnish natural sights, from beautiful sights on mountaintops to caves and boulders.",
        fi: "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan, vaeltajien itsensä kertomana ja raportoimana. Mukana ovat niin vuorenhuiput, näköalat kuin luolat ja lohkareetkin."
    };
    translations.ruuthToolName = {
        en: "Jarmo Ruuth's map",
        fi: "Jarmo Ruuthin kartta"
    };
    translations.ruuthToolDescription = {
        en: "This tool shows everything, from historic artefact database to known caves, occupation-era aearial maps, etc. Best tool for trying to find new caves.",
        fi: "Tämä työkalu näyttää kaiken! Muinaismuistojen löytöpaikat, tunnetut luolat, Porkkalan valloituksen aikaiset ilmakuvat, jne. Paras työkalu uusien luolien löytämiseen."
    };
    translations.hakkuToolName = {
        en: "National Geology Institute's Hakku Server",
        fi: "GTK:n hakku-palvelu"
    };
    translations.hakkuToolDescription = {
        en: "This tool has a ton of open data, e.g., about known boulders, type of ground rock in different areas, etc.",
        fi: "Tästä työkalusta löytyy valtavasti tietoa, esimerkiksi siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne."
    };
    translations.laserToolName = {
        en: "MML laser scan",
        fi: "MML:n laser-mittaukset"
    };
    translations.laserToolDescription = {
        en: "The Finnish Surveying Institute's laser-scanned terrain forms. Very useful for finding sharp changes in terrain forms.",
        fi: "Maanmittauslaitoksen laser-mitatut maanpinnan muodot. Erittäin hyödyllinen terävien pinnanmuodon muutosten löytämiseen."
    };
    translations.nimisampoToolName = {
        en: "Nimisampo - Placename research tool",
        fi: "Nimisampo - Nimistötutkijan työpöytä"
    };
    translations.nimisampoToolDescription = {
        en: "Nimisampo is a tool for place name research. It it meant both for academia and the general public. Interesting names: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. And in Swedish: grotta (and probably others).",
        fi: "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja suuren yleisön käytettäväksi. Nimistöä: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. Myös ruotsiksi: grotta (varmaan muitakin)."
    };

    //
    // Translations for vocabularies ----------------------------------------------------------
    //

    //
    // Rocktype vocabulary --------------------------------------------------------------------
    //

    var v = addVocabulary("rockType");
    addVocabularyItem(v,"rock-granite", { en: "non-volcanic, non-sedimentary", fi: "muu kivi kuin vulkaaninen tai sedimentti" });
    addVocabularyItem(v,"rock-gypsum", { en: "gypsum", fi: "kipsi" });
    addVocabularyItem(v,"rock-limestone", { en: "limestone/dolomite", fi: "kalkkikivi/dolomiitti" });
    addVocabularyItem(v,"rock-marble", { en: "marble", fi: "marmori" });
    addVocabularyItem(v,"rock-mudrock", { en: "mudrock", fi: "savikivi" });
    addVocabularyItem(v,"rock-other", { en: "other rock", fi: "muu kivi" });
    addVocabularyItem(v,"rock-salt", { en: "salt", fi: "suola" });
    addVocabularyItem(v,"rock-sandstone", { en: "sandstone", fi: "hiekkakivi" });
    addVocabularyItem(v,"rock-unknown", { en: "unknown", fi: "ei tiedossa" });
    addVocabularyItem(v,"rock-volcanic", { en: "volcanic", fi: "vulkaaninen" });
                  
    //
    // Ground type vocabulary -----------------------------------------------------------------
    //

    v = addVocabulary("groundType");
    addVocabularyItem(v,"gravel", { en: "gravel", fi: "sora" });
    addVocabularyItem(v,"ice", { en: "ice", fi: "jää" });
    addVocabularyItem(v,"moraine", { en: "moraine", fi: "moreeni" });
    addVocabularyItem(v,"other-material", { en: "other material", fi: "other material" });
    addVocabularyItem(v,"rock", { en: "rock", fi: "kallio" }); // see rockTypes for detailed classification
    addVocabularyItem(v,"sand", { en: "sand", fi: "hiekka" });
    addVocabularyItem(v,"snow", { en: "snow", fi: "lumi" });
    addVocabularyItem(v,"turf", { en: "turf", fi: "turve" });

    //
    // Rock type and oher material vocabulary -------------------------------------------------
    //
    
    v = copyVocabulary("rockTypeAndOtherMaterial","rockType");
    addVocabularyItem(v,"ice", { en: "ice", fi: "jää" });
    addVocabularyItem(v,"other-material", { en: "other material", fi: "other material" });
    
    //
    // Morphology vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("morphology");
    addVocabularyItem(v,"morphology-boulders", { en: "boulder", fi: "lohkare" });
    addVocabularyItem(v,"morphology-crack", { en: "crevice", fi: "rako" });
    addVocabularyItem(v,"morphology-crystallization", { en: "blister", fi: "kideonkalo" });
    addVocabularyItem(v,"morphology-erosion", { en: "erosion", fi: "eroosio" });
    addVocabularyItem(v,"morphology-karst", { en: "karst", fi: "karsti" });
    addVocabularyItem(v,"morphology-organic", { en: "organic, reef or turf", fi: "koralli tai turve" });
    addVocabularyItem(v,"morphology-other", { en: "other", fi: "muu" });
    addVocabularyItem(v,"morphology-unknown", { en: "unknown", fi: "ei tiedossa" });
    addVocabularyItem(v,"morphology-volcanic", { en: "volcanic", fi: "vulkaaninen" });
    addVocabularyItem(v,"morphology-weathering", { en: "weathering", fi: "rapautumis" });
    
    //
    // Caving activity vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("cavingActivity");
    addVocabularyItem(v,"basic", { en: "basic caving", fi: "luolailu" });
    addVocabularyItem(v,"biking", { en: "biking", fi: "pyöräily" });
    addVocabularyItem(v,"boating", { en: "boating", fi: "veneily" });
    addVocabularyItem(v,"digging", { en: "digging", fi: "kaivuu" });
    addVocabularyItem(v,"diving", { en: "diving", fi: "sukellus" });
    addVocabularyItem(v,"researching", { en: "researching", fi: "tutkimus" });
    addVocabularyItem(v,"skiing", { en: "skiing", fi: "hiihto" });
    addVocabularyItem(v,"srt", { en: "SRT", fi: "SRT" });
    addVocabularyItem(v,"studying", { en: "studying", fi: "oppiminen" });
    addVocabularyItem(v,"surveying", { en: "surveying", fi: "kartoitus" });
    addVocabularyItem(v,"swimming", { en: "swimming", fi: "uinti" });
    addVocabularyItem(v,"training", { en: "training", fi: "opetus" });
    
    //
    // Swimming place vocabulary --------------------------------------------------------------
    //

    v = addVocabulary("swimmingPlace");
    addVocabularyItem(v,"beach", { en: "on an official beach", fi: "virallisella uintipaikalla" });
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä" });
    addVocabularyItem(v,"nature", { en: "in nature", fi: "luonnon rannalla" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona" });
    addVocabularyItem(v,"thermal-bath", { en: "in a thermal bath", fi: "kuumassa lähteessä" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla" });
    addVocabularyItem(v,"waterbody-cave", { en: "in a cave", fi: "luolassa" });
    addVocabularyItem(v,"waterbody-lake", { en: "on a lake", fi: "järvellä" });
    addVocabularyItem(v,"waterbody-other", { en: "in some other body of water", fi: "jossain muussa vesialtaassa" });
    addVocabularyItem(v,"waterbody-pool", { en: "in a swimming pool", fi: "uimaaltaassa" });
    addVocabularyItem(v,"waterbody-river", { en: "on a river", fi: "joessa" });
    addVocabularyItem(v,"waterbody-sandpit", { en: "in a sandpit", fi: "hiekkakuopalla" });
    addVocabularyItem(v,"waterbody-sea", { en: "in the sea", fi: "meressä" });
    addVocabularyItem(v,"waterbody-unknown", { en: "unknown", fi: "ei tiedossa" });
    
    //
    // Swimming material vocabulary -----------------------------------------------------------
    //

    v = addVocabulary("swimmingMaterial");
    addVocabularyItem(v,"balls", { en: "in a ball pit", fi: "pallomeressä" });
    addVocabularyItem(v,"ice", { en: "in an ice hole", fi: "avannossa" });
    addVocabularyItem(v,"water", { en: "in water", fi: "vedessä" });
    
    //
    // Skiing material vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("skiMaterial");
    addVocabularyItem(v,"ash", { en: "on ash", fi: "tuhkalla" });
    addVocabularyItem(v,"asphalt", { en: "on asphalt", fi: "asfaltilla" });
    addVocabularyItem(v,"grass", { en: "on grass", fi: "nurmikolla" });
    addVocabularyItem(v,"imported-snow", { en: "on carried snow", fi: "kannetulla lumella" });
    addVocabularyItem(v,"mud", { en: "in mud", fi: "mudassa" });
    addVocabularyItem(v,"other-substances", { en: "on other substances", fi: "muilla materiaaleilla" });
    addVocabularyItem(v,"plastic", { en: "on plastic", fi: "muovilla" });
    addVocabularyItem(v,"rock", { en: "on rocks", fi: "kivillä" });
    addVocabularyItem(v,"sand", { en: "on sand", fi: "hiekalla" });
    addVocabularyItem(v,"unknown-substance", { en: "unknown", fi: "ei tiedossa" });

    //
    // Urban exploration target vocabulary ----------------------------------------------------
    //

    v = addVocabulary("urbanexTarget");
    addVocabularyItem(v,"airports", { en: "an airport", fi: "lentokenttä" });
    addVocabularyItem(v,"amusement-parks", { en: "an amusement park", fi: "huvipuisto" });
    addVocabularyItem(v,"bridges", { en: "a bridge", fi: "silta" });
    addVocabularyItem(v,"buildings", { en: "a building", fi: "rakennus" });
    addVocabularyItem(v,"bunkers", { en: "a bunker", fi: "bunkkeri" });
    addVocabularyItem(v,"castles", { en: "a castle", fi: "linna" });
    addVocabularyItem(v,"catacombs", { en: "a catacomb", fi: "katakombi" });
    addVocabularyItem(v,"harbours", { en: "a harbour", fi: "satama" });
    addVocabularyItem(v,"historic-sites", { en: "a historic site", fi: "historiallinen paikka" });
    addVocabularyItem(v,"industrial", { en: "an industrial site", fi: "teollisuus" });
    addVocabularyItem(v,"landfills", { en: "a landfill", fi: "kaatopaikka" });
    addVocabularyItem(v,"memorial", { en: "a memorial", fi: "muistomerkki" });
    addVocabularyItem(v,"military", { en: "a military site", fi: "sotilaallinen kohde" });
    addVocabularyItem(v,"mines", { en: "a mine", fi: "kaivos" });
    addVocabularyItem(v,"none", { en: "nothing", fi: "ei mikään" });
    addVocabularyItem(v,"other", { en: "other", fi: "jokin muu" });
    addVocabularyItem(v,"prisons", { en: "a prison", fi: "vankila" });
    addVocabularyItem(v,"quarries", { en: "a quarry", fi: "louhis" });
    addVocabularyItem(v,"railways", { en: "a railway", fi: "rautatie" });
    addVocabularyItem(v,"ruins", { en: "ruins", fi: "rauniot" });
    addVocabularyItem(v,"silos", { en: "a silo", fi: "siilo" });
    addVocabularyItem(v,"skating-rinks", { en: "a skating rink", fi: "luistelukenttä" });
    addVocabularyItem(v,"ski-lifts", { en: "a ski lift", fi: "hiihtohissi" });
    addVocabularyItem(v,"smokestacks", { en: "a smokestack", fi: "piippu" });
    addVocabularyItem(v,"towers", { en: "a tower", fi: "torni" });
    addVocabularyItem(v,"trenches", { en: "a trench", fi: "juoksuhauta" });
    addVocabularyItem(v,"tunnels", { en: "a tunnel", fi: "tunneli" });
    addVocabularyItem(v,"unknown", { en: "unknown", fi: "ei tiedossa" });
    addVocabularyItem(v,"vehicles", { en: "a vehicle", fi: "kulkuväline" });
    
    //
    // Biking location vocabulary -------------------------------------------------------------
    //

    v = addVocabulary("bikeTrack");
    addVocabularyItem(v,"indoor", { en: "indoors", fi: "sisällä" });
    addVocabularyItem(v,"outdoor", { en: "outdoors", fi: "ulkona" });
    addVocabularyItem(v,"track-city", { en: "in city", fi: "kaupungissa" });
    addVocabularyItem(v,"track-nature", { en: "in the nature", fi: "luonnossa" });
    addVocabularyItem(v,"track-road", { en: "on roads", fi: "maanteillä" });
    addVocabularyItem(v,"track-trail", { en: "on a trail", fi: "poluilla" });
    addVocabularyItem(v,"underground", { en: "underground", fi: "maan alla" });
    
    //
    // Bike type vocabulary -------------------------------------------------------------------
    //

    v = addVocabulary("bikeType");
    addVocabularyItem(v,"bike-city", { en: "on a city bike", fi: "kaupunkipyörällä" });
    addVocabularyItem(v,"bike-mountain", { en: "on an MTB", fi: "maastopyörällä" });
    addVocabularyItem(v,"bike-other", { en: "on special bike type", fi: "erikoispyörällä" });
    addVocabularyItem(v,"bike-road", { en: "on a road bike", fi: "maantiepyörällä" });
    addVocabularyItem(v,"bike-tandem", { en: "on a tandem bike", fi: "tandem-pyörällä" });
    addVocabularyItem(v,"bike-tricycle", { en: "on a tricycle", fi: "kolmipyöräisellä" });
    addVocabularyItem(v,"bike-unicycle", { en: "on an unicycle", fi: "yksipyöräisellä" });
    
    //
    // Sauna type vocabulary ------------------------------------------------------------------
    //

    v = addVocabulary("saunaType");
    addVocabularyItem(v,"infrared", { en: "infrared sauna", fi: "infrapuna" });
    addVocabularyItem(v,"normal", { en: "Finnish sauna", fi: "suomalainen" });
    addVocabularyItem(v,"smoke", { en: "smoke sauna", fi: "savusauna" });
    addVocabularyItem(v,"steam", { en: "Turkish sauna", fi: "höyrysauna" });
    addVocabularyItem(v,"unknown", { en: "unknown", fi: "ei tiedossa" });
    
    //
    // Internal functions ---------------------------------------------------------------------
    //

    function addVocabulary(name) {
        // textId        is a string
        // RETURN        the vocabulary object
        if (name === undefined) throw("Not an item for a vocabulary");
        if (vocabularies[name] !== undefined) throw ("Vocabulary already defined");
        vocabularies[name] = {};
        return(vocabularies[name]);
    }

    function copyVocabulary(name,other) {
        if (name === undefined) throw("Not an item for a vocabulary");
        if (other === undefined) throw("Not an item for a vocabulary");
        if (vocabularies[name] !== undefined) throw ("Vocabulary already defined");
        if (vocabularies[other] === undefined) throw ("Vocabulary not defined");
        vocabularies[name] = JSON.parse(JSON.stringify(vocabularies[other]));
        return(vocabularies[name]);
    }
    
    function addVocabularyItem(v,item,translations) {
        //debug("adding item " + item);
        if (v === undefined) throw("Not a vocabulary item");
        if (item === undefined) throw("Not an item for a vocabulary");
        if (translations === undefined || translations.en === undefined) throw ("No translation given");
        v[item] = translations;
    }
    
    function genText(textId) {
        // textId        is a string
        // RETURN        string

        //
        // Return a string in current language, or in english if the
        // translation is missing.
        //
        // Example: genText("and") returns "and" by default, or "ja"
        // if language=fi (finnish) and translation exists.
        //

        // debug("Language: " + language + " and textId: " + textId );

        if (translations[textId] === undefined) {
            throw ("Using an invalid text item to genText call");
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
            textId = textId + "Short";
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


        ///////////////////////////////////////////////////////////////////////////////////////
        // WARNING swimming:waterbody-sea and similar constructs exist in activityJSON.
        // Because subactivities are used as variable names (and -,+,=, etc. get interpreted),
        // subactivity IDENTIFIERS must only contain A..Za..z0..9 and the minus sign that is 
        // treated separately here. NOTE: identi-fier and identi_fier are considered the SAME.
        // The descriptive TEXTS (translations) are less restricted.

    }


    function listToText(list) {
        // list          is an object of type Array
        // RETURN        string
        
        // Configuration
        listSeparator=", ";
        lastSeparator=" " + getText("and") + " ";

        // Loop and insert
        var result = list[0];                                         // FIRST item in list        (item 1)
        for ( var i = 1; i<list.length -1; i++ ) {
            result = result + listSeparator + list[i];                // COMMA MIDDLE item         (items 2 to n-1)
        }
        if (list.length>1) {
            result = result + lastSeparator + list[list.length -1];   // AND LAST                (item n>1)
        }

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

    //
    // Return the object ----------------------------------------------------------------------
    //
    
    return({
        getLanguage:               getLanguage,               // returns language
        getText:                   getText,                   // returns a string in current language
        getTextWithValues:         getTextWithValues,         // same as getText but with {{valueX}} replacement
        getTextCollectionItem:     getTextCollectionItem,     // returns a term (item) from a controlled vocabulary in current language
        listToText:                listToText,                // returns a list of items in language
        capitalize:                capitalize,                // capitalize a string
        numberAlign:               numberAlign                // align a number in given number of characters
    });

}

