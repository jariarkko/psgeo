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
//                NEW: var citiesText=langLib.getText("cities");

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
    
    vocabularies.rockType = {}
    vocabularies.rockType["rock-granite"] = {
        en: "non-volcanic, non-sedimentary",
        fi: "muu kivi kuin vulkaaninen tai sedimentti"
    };
    vocabularies.rockType["rock-gypsum"] = {
        en: "gypsum",
        fi: "kipsi"
    };
    vocabularies.rockType["rock-limestone"] = {
        en: "limestone/dolomite",
        fi: "kalkkikivi/dolomiitti"
    };
    vocabularies.rockType["rock-marble"] = {
        en: "marble",
        fi: "marmori"
    };
    vocabularies.rockType["rock-mudrock"] = {
        en: "mudrock",
        fi: "savikivi"
    };
    vocabularies.rockType["rock-other"] = {
        en: "other rock",
        fi: "muu kivi"
    };
    vocabularies.rockType["rock-salt"] = {
        en: "salt",
        fi: "suola"
    };
    vocabularies.rockType["rock-sandstone"] = {
        en: "sandstone",
        fi: "hiekkakivi"
    };
    vocabularies.rockType["rock-unknown"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };
    vocabularies.rockType["rock-volcanic"] = {
        en: "volcanic",
        fi: "vulkaaninen"
    };
    
    vocabularies.groundType = {};
    vocabularies.groundType["gravel"] = {
        en: "gravel",
        fi: "sora"
    };
    vocabularies.groundType["ice"] = {
        en: "ice",
        fi: "jää"
    };
    vocabularies.groundType["moraine"] = {
        en: "moraine",
        fi: "moreeni"
    };
    vocabularies.groundType["other-material"] = {
        en: "other material",
        fi: "other material"
    };
    vocabularies.groundType["rock"] = {
        en: "rock",        // see rockTypes for detailed classification
        fi: "kallio"
    };
    vocabularies.groundType["sand"] = {
        en: "sand",
        fi: "hiekka"
    };
    vocabularies.groundType["snow"] = {
        en: "snow",
        fi: "lumi"
    };
    vocabularies.groundType["turf"] = {
        en: "turf",
        fi: "turve"
    };
    
    vocabularies.morphology = {};
    vocabularies.morphology["morphology-boulders"] = {
        en: "boulder",
        fi: "lohkare"
    };
    vocabularies.morphology["morphology-crack"] = {
        en: "crevice",
        fi: "rako"
    };
    vocabularies.morphology["morphology-crystallization"] = {
        en: "blister",
        fi: "kideonkalo"
    };
    vocabularies.morphology["morphology-erosion"] = {
        en: "erosion",
        fi: "eroosio"
    };
    vocabularies.morphology["morphology-karst"] = {
        en: "karst",
        fi: "karsti"
    };
    vocabularies.morphology["morphology-organic"] = {
        en: "organic, reef or turf",
        fi: "koralli tai turve"
    };
    vocabularies.morphology["morphology-other"] = {
        en: "other",
        fi: "muu"
    };
    vocabularies.morphology["morphology-unknown"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };
    vocabularies.morphology["morphology-volcanic"] = {
        en: "volcanic",
        fi: "vulkaaninen"
    };
    vocabularies.morphology["morphology-weathering"] = {
        en: "weathering",
        fi: "rapautumis"
    };
    
    vocabularies.cavingActivity = {};
    vocabularies.cavingActivity["basic"] = {
        en: "basic caving",
        fi: "luolailu"
    };
    vocabularies.cavingActivity["biking"] = {
        en: "biking",
        fi: "pyöräily"
    };
    vocabularies.cavingActivity["boating"] = {
        en: "boating",
        fi: "veneily"
    };
    vocabularies.cavingActivity["digging"] = {
        en: "digging",
        fi: "kaivuu"
    };
    vocabularies.cavingActivity["diving"] = {
        en: "diving",
        fi: "sukellus"
    };
    vocabularies.cavingActivity["researching"] = {
        en: "researching",
        fi: "tutkimus"
    };
    vocabularies.cavingActivity["skiing"] = {
        en: "skiing",
        fi: "hiihto"
    };
    vocabularies.cavingActivity["srt"] = {
        en: "SRT",
        fi: "SRT"
    };
    vocabularies.cavingActivity["studying"] = {
        en: "studying",
        fi: "oppiminen"
    };
    vocabularies.cavingActivity["surveying"] = {
        en: "surveying",
        fi: "kartoitus"
    };
    vocabularies.cavingActivity["swimming"] = {
        en: "swimming",
        fi: "uinti"
    };
    vocabularies.cavingActivity["training"] = {
        en: "training",
        fi: "opetus"
    };
    
    vocabularies.swimmingPlace = {};
    vocabularies.swimmingPlace["beach"] = {
        en: "on an official beach",
        fi: "virallisella uintipaikalla"
    };
    vocabularies.swimmingPlace["indoor"] = {
        en: "indoors",
        fi: "sisällä"
    };
    vocabularies.swimmingPlace["nature"] = {
        en: "in nature",
        fi: "luonnon rannalla"
    };
    vocabularies.swimmingPlace["outdoor"] = {
        en: "outdoors",
        fi: "ulkona"
    };
    vocabularies.swimmingPlace["thermal-bath"] = {
        en: "in a thermal bath",
        fi: "kuumassa lähteessä"
    };
    vocabularies.swimmingPlace["underground"] = {
        en: "underground",
        fi: "maan alla"
    };
    vocabularies.swimmingPlace["waterbody-cave"] = {
        en: "in a cave",
        fi: "luolassa"
    };
    vocabularies.swimmingPlace["waterbody-lake"] = {
        en: "on a lake",
        fi: "järvellä"
    };
    vocabularies.swimmingPlace["waterbody-other"] = {
        en: "in some other body of water",
        fi: "jossain muussa vesialtaassa"
    };
    vocabularies.swimmingPlace["waterbody-pool"] = {
        en: "in a swimming pool",
        fi: "uimaaltaassa"
    };
    vocabularies.swimmingPlace["waterbody-river"] = {
        en: "on a river",
        fi: "joessa"
    };
    vocabularies.swimmingPlace["waterbody-sandpit"] = {
        en: "in a sandpit",
        fi: "hiekkakuopalla"
    };
    vocabularies.swimmingPlace["waterbody-sea"] = {
        en: "in the sea",
        fi: "meressä"
    };
    vocabularies.swimmingPlace["waterbody-unknown"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };
    
    vocabularies.swimmingMaterial = {};
    vocabularies.swimmingMaterial["balls"] = {
        en: "in a ball pit",
        fi: "pallomeressä"
    };
    vocabularies.swimmingMaterial["ice"] = {
        en: "in an ice hole",
        fi: "avannossa"
    };
    vocabularies.swimmingMaterial["water"] = {
        en: "in water",
        fi: "vedessä"
    };
    
    vocabularies.skiMaterial = {};
    vocabularies.skiMaterial["ash"] = {
        en: "on ash",
        fi: "tuhkalla"
    };
    vocabularies.skiMaterial["asphalt"] = {
        en: "on asphalt",
        fi: "asfaltilla"
    };
    vocabularies.skiMaterial["grass"] = {
        en: "on grass",
        fi: "nurmikolla"
    };
    vocabularies.skiMaterial["imported-snow"] = {
        en: "on carried snow",
        fi: "kannetulla lumella"
    };
    vocabularies.skiMaterial["mud"] = {
        en: "in mud",
        fi: "mudassa"
    };
    vocabularies.skiMaterial["other-substances"] = {
        en: "on other substances",
        fi: "muilla materiaaleilla"
    };
    vocabularies.skiMaterial["plastic"] = {
        en: "on plastic",
        fi: "muovilla"
    };
    vocabularies.skiMaterial["rock"] = {
        en: "on rocks",
        fi: "kivillä"
    };
    vocabularies.skiMaterial["sand"] = {
        en: "on sand",
        fi: "hiekalla"
    };
    vocabularies.skiMaterial["unknown-substance"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };

    vocabularies.urbanexTarget = {};
    vocabularies.urbanexTarget["airports"] = {
        en: "an airport",
        fi: "lentokenttä"
    };
    vocabularies.urbanexTarget["amusement-parks"] = {
        en: "an amusement park",
        fi: "huvipuisto"
    };
    vocabularies.urbanexTarget["bridges"] = {
        en: "a bridge",
        fi: "silta"
    };
    vocabularies.urbanexTarget["buildings"] = {
        en: "a building",
        fi: "rakennus"
    };
    vocabularies.urbanexTarget["bunkers"] = {
        en: "a bunker",
        fi: "bunkkeri"
    };
    vocabularies.urbanexTarget["castles"] = {
        en: "a castle",
        fi: "linna"
    };
    vocabularies.urbanexTarget["catacombs"] = {
        en: "a catacomb",
        fi: "katakombi"
    };
    vocabularies.urbanexTarget["harbours"] = {
        en: "a harbour",
        fi: "satama"
    };
    vocabularies.urbanexTarget["historic-sites"] = {
        en: "a historic site",
        fi: "historiallinen paikka"
    };
    vocabularies.urbanexTarget["industrial"] = {
        en: "an industrial site",
        fi: "teollisuus"
    };
    vocabularies.urbanexTarget["landfills"] = {
        en: "a landfill",
        fi: "kaatopaikka"
    };
    vocabularies.urbanexTarget["memorial"] = {
        en: "a memorial",
        fi: "muistomerkki"
    };
    vocabularies.urbanexTarget["military"] = {
        en: "a military site",
        fi: "sotilaallinen kohde"
    };
    vocabularies.urbanexTarget["mines"] = {
        en: "a mine",
        fi: "kaivos"
    };
    vocabularies.urbanexTarget["none"] = {
        en: "nothing",
        fi: "ei mikään"
    };
    vocabularies.urbanexTarget["other"] = {
        en: "other",
        fi: "jokin muu"
    };
    vocabularies.urbanexTarget["prisons"] = {
        en: "a prison",
        fi: "vankila"
    };
    vocabularies.urbanexTarget["quarries"] = {
        en: "a quarry",
        fi: "louhis"
    };
    vocabularies.urbanexTarget["railways"] = {
        en: "a railway",
        fi: "rautatie"
    };
    vocabularies.urbanexTarget["ruins"] = {
        en: "ruins",
        fi: "rauniot"
    };
    vocabularies.urbanexTarget["silos"] = {
        en: "a silo",
        fi: "siilo"
    };
    vocabularies.urbanexTarget["skating-rinks"] = {
        en: "a skating rink",
        fi: "luistelukenttä"
    };
    vocabularies.urbanexTarget["ski-lifts"] = {
        en: "a ski lift",
        fi: "hiihtohissi"
    };
    vocabularies.urbanexTarget["smokestacks"] = {
        en: "a smokestack",
        fi: "piippu"
    };
    vocabularies.urbanexTarget["towers"] = {
        en: "a tower",
        fi: "torni"
    };
    vocabularies.urbanexTarget["trenches"] = {
        en: "a trench",
        fi: "juoksuhauta"
    };
    vocabularies.urbanexTarget["tunnels"] = {
        en: "a tunnel",
        fi: "tunneli"
    };
    vocabularies.urbanexTarget["unknown"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };
    vocabularies.urbanexTarget["vehicles"] = {
        en: "a vehicle",
        fi: "kulkuväline"
    };
    
    vocabularies.bikeTrack = {};
    vocabularies.bikeTrack["indoor"] = {
        en: "indoors",
        fi: "sisällä"
    };
    vocabularies.bikeTrack["outdoor"] = {
        en: "outdoors",
        fi: "ulkona"
    };
    vocabularies.bikeTrack["track-city"] = {
        en: "in city",
        fi: "kaupungissa"
    };
    vocabularies.bikeTrack["track-nature"] = {
        en: "in the nature",
        fi: "luonnossa"
    };
    vocabularies.bikeTrack["track-road"] = {
        en: "on roads",
        fi: "maanteillä"
    };
    vocabularies.bikeTrack["track-trail"] = {
        en: "on a trail",
        fi: "poluilla"
    };
    vocabularies.bikeTrack["underground"] = {
        en: "underground",
        fi: "maan alla"
    };
    
    vocabularies.bikeType = {};
    vocabularies.bikeType["bike-city"] = {
        en: "on a city bike",
        fi: "kaupunkipyörällä"
    };
    vocabularies.bikeType["bike-mountain"] = {
        en: "on an MTB",
        fi: "maastopyörällä"
    };
    vocabularies.bikeType["bike-other"] = {
        en: "on special bike type",
        fi: "erikoispyörällä"
    };
    vocabularies.bikeType["bike-road"] = {
        en: "on a road bike",
        fi: "maantiepyörällä"
    };
    vocabularies.bikeType["bike-tandem"] = {
        en: "on a tandem bike",
        fi: "tandem-pyörällä"
    };
    vocabularies.bikeType["bike-tricycle"] = {
        en: "on a tricycle",
        fi: "kolmipyöräisellä"
    };
    vocabularies.bikeType["bike-unicycle"] = {
        en: "on an unicycle",
        fi: "yksipyöräisellä"
    };
    
    vocabularies.saunaType = {};
    vocabularies.saunaType["infrared"] = {
        en: "infrared sauna",
        fi: "infrapuna"
    };
    vocabularies.saunaType["normal"] = {
        en: "Finnish sauna",
        fi: "suomalainen"
    };
    vocabularies.saunaType["smoke"] = {
        en: "smoke sauna",
        fi: "savusauna"
    };
    vocabularies.saunaType["steam"] = {
        en: "Turkish sauna",
        fi: "höyrysauna"
    };
    vocabularies.saunaType["unknown"] = {
        en: "unknown",
        fi: "ei tiedossa"
    };
    
    //
    // Internal functions ---------------------------------------------------------------------
    //
    
    function genText(textId) {
        // textId        is a string
        // RETURN        string

        // Return a string in current language,
        //         or in english if the translation is missing.
        //         Example: genText("and") returns "and" by default,
        //        or "ja" if language=fi (finnish) and translation exists.

        // debug("Language: " + language + " and textId: " + textId );

        if (typeof translations[textId][language] !== "string") {
            throw ("PsgeoLang: Error: textId " + textId + " (language " + language + ") text is not a string! Defaulting to english.");
            return(translations[textId]["en"]); 
        } else {
            return(translations[textId][language]);
        }
    }

    //
    // Public methods -------------------------------------------------------------------------
    //
    
    function getText(textId,needShort) {
        // textId         is string
        // needShort         is boolean, optional
        // RETURN        string

        // Checks
        if ( typeof(textId) != "string" || textId == "" ) {
            throw ("PsgeoLang: Error: a text string was requested from function getText, but textId is not a non-empty string!");
        }

        // Chooce which version to use, normal or short
        if (typeof(needShort) == "boolean" && needShort) {
            return(genText(textId + "Short"));               // it had better exist! Check in genText.
        } else {
            return(genText(textId));
        }
    }


    function getTextWithValues(textId,needShort,insertables) {
        // textId        is a string
        // needShort        is boolean
        // insertables        is an array of strings (if inserting numeric values, use .stringify)
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
        return message;
    }


    function getTextCollectionItem(controlledVocabulary,tagText) {
        // contolledVocabulary           is a string
        // tagText                       is a string
        // RETURN                        string

        // these will be used to read
        // vocabularies[controlledVocabulary][tagText][language],
        // which is a string

        // Terminology: A collection (e.g. rockType) determines a
        // controlled vocabulary (a fixed set of words). These words
        // can be called tags, because they are, in effect,
        // metadata. Hence their variable name: tagText.
        //
        // Controlled vocabularies of psgeo include for instance
        // morphology of caves (karst, crevice etc), type of material
        // skied on, etc.
        //
        
        // Checks
        if ( controlledVocabulary === "undefined" || controlledVocabulary == "" ) {
            throw ("PsgeoLang: Error: Cannot return tag text unless the relevant controlled vocabulary is non-empty!");
        }
        if ( tagText === "undefined" || tagText == "" ) {
            throw ("PsgeoLang: Error: an empty or undefined tag text in vocabulary " + controlledVocabulary + " was requested!");
        }

        // Special case: cave material
        //        Caves exist both in rock, ice, moraine and turf, at least.
        //        Rock types however can be used in climbing too.
        //        A two level classification is thus in order.
        //        We will thus introduce a new higher level vocabulary: groundType (which includes rock, ice, snow, turf, ...)
        
        if (  controlledVocabulary == "rockTypeAndOtherMaterial" ) {        // SHOULD THIS NOT BE CALLED CaveMaterialTopLevelCategory ?
            switch (tagText) {
            case "other-material":   return(genText("otherMaterial")); break; // return "other than ice or rock" [relevant for caves]
            case "ice":              controlledVocabulary="groundType"; break;
            default:                 controlledVocabulary="rockType";
            }
        }
        
        // Return value
        //         Ex: return(vocabularies["rockType"]["volcanic"]["fi"]); gives "vulkaaninen".
        
        //debug("using controlledVocabulary " + controlledVocabulary);
        //debug("using tagText " + tagText);
        //debug("using language " + language);
        if (vocabularies[controlledVocabulary] === undefined) {
            throw ("PsgeoLang: Error: No vocabulary " + controlledVocabulary);
        }
        if (vocabularies[controlledVocabulary][tagText] === undefined) {
            throw ("PsgeoLang: Error: Vocabulary " + controlledVocabulary + " has no tag " + tagText);
        }
        if (vocabularies[controlledVocabulary][tagText][language] === undefined) {
            language = "en";
        }
        if (vocabularies[controlledVocabulary][tagText][language] === undefined) {
            throw ("PsgeoLang: Error: Vocabulary " + controlledVocabulary + " for tag " + tagText + " has no en translation");
        }
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

