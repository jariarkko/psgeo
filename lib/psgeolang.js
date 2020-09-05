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

    // VOCABULARIES BEGIN
    //        Declare variables first
    var vocabularies = {};
    vocabularies.rockType = {};
    vocabularies.rockType.rock_volcanic = {};
    vocabularies.rockType.rock_sandstone = {};
    vocabularies.rockType.rock_mudrock = {};
    vocabularies.rockType.rock_limestone = {};
    vocabularies.rockType.rock_gypsum = {};
    vocabularies.rockType.rock_salt = {};
    vocabularies.rockType.rock_marble = {};
    vocabularies.rockType.rock_granite = {};
    vocabularies.rockType.rock_other = {};
    vocabularies.rockType.rock_unknown = {};
    vocabularies.groundType = {};
    vocabularies.groundType.ice = {};
    vocabularies.groundType.snow = {};
    vocabularies.groundType.sand = {};
    vocabularies.groundType.gravel = {};
    vocabularies.groundType.moraine = {};
    vocabularies.groundType.rock = {};
    vocabularies.groundType.turf = {};
    vocabularies.groundType.other_material = {};
    vocabularies.morphology = {};
    vocabularies.morphology.morphology_crack = {};
    vocabularies.morphology.morphology_boulders = {};
    vocabularies.morphology.morphology_karst = {};
    vocabularies.morphology.morphology_volcanic = {};
    vocabularies.morphology.morphology_erosion = {};
    vocabularies.morphology.morphology_weathering = {};
    vocabularies.morphology.morphology_crystallization = {};
    vocabularies.morphology.morphology_organic = {};
    vocabularies.morphology.morphology_other = {};
    vocabularies.morphology.morphology_unknown = {};
    vocabularies.cavingActivity = {};
    vocabularies.cavingActivity.basic = {};
    vocabularies.cavingActivity.srt = {};
    vocabularies.cavingActivity.swimming = {};
    vocabularies.cavingActivity.boating = {};
    vocabularies.cavingActivity.diving = {};
    vocabularies.cavingActivity.digging = {};
    vocabularies.cavingActivity.biking = {};
    vocabularies.cavingActivity.skiing = {};
    vocabularies.cavingActivity.surveying = {};
    vocabularies.cavingActivity.researching = {};
    vocabularies.cavingActivity.training = {};
    vocabularies.cavingActivity.studying = {};
    vocabularies.swimmingPlace = {};
    vocabularies.swimmingPlace.indoor = {};
    vocabularies.swimmingPlace.outdoor = {};
    vocabularies.swimmingPlace.underground = {};
    vocabularies.swimmingPlace.waterbody_river = {};
    vocabularies.swimmingPlace.waterbody_lake = {};
    vocabularies.swimmingPlace.waterbody_sandpit = {};
    vocabularies.swimmingPlace.waterbody_sea = {};
    vocabularies.swimmingPlace.waterbody_pool = {};
    vocabularies.swimmingPlace.waterbody_cave = {};
    vocabularies.swimmingPlace.waterbody_other = {};
    vocabularies.swimmingPlace.waterbody_unknown = {};
    vocabularies.swimmingPlace.beach = {};
    vocabularies.swimmingPlace.nature = {};
    vocabularies.swimmingPlace.thermal_bath = {};
    vocabularies.swimmingMaterial = {};
    vocabularies.swimmingMaterial.water = {};
    vocabularies.swimmingMaterial.ice = {};
    vocabularies.swimmingMaterial.balls = {};
    vocabularies.skiMaterial = {};
    vocabularies.skiMaterial.imported_snow = {};
    vocabularies.skiMaterial.sand = {};
    vocabularies.skiMaterial.rock = {};
    vocabularies.skiMaterial.ash = {};
    vocabularies.skiMaterial.asphalt = {};
    vocabularies.skiMaterial.grass = {};
    vocabularies.skiMaterial.mud = {};
    vocabularies.skiMaterial.plastic = {};
    vocabularies.skiMaterial.other_substances = {};
    vocabularies.skiMaterial.unknown_substance = {};
    vocabularies.urbanexTarget = {};
    vocabularies.urbanexTarget.none = {};
    vocabularies.urbanexTarget.tunnels = {};
    vocabularies.urbanexTarget.buildings = {};
    vocabularies.urbanexTarget.ruins = {};
    vocabularies.urbanexTarget.bunkers = {};
    vocabularies.urbanexTarget.quarries = {};
    vocabularies.urbanexTarget.mines = {};
    vocabularies.urbanexTarget.industrial = {};
    vocabularies.urbanexTarget.silos = {};
    vocabularies.urbanexTarget.ski_lifts = {};
    vocabularies.urbanexTarget.landfills = {};
    vocabularies.urbanexTarget.castles = {};
    vocabularies.urbanexTarget.vehicles = {};
    vocabularies.urbanexTarget.trenches = {};
    vocabularies.urbanexTarget.memorial = {};
    vocabularies.urbanexTarget.historic_sites = {};
    vocabularies.urbanexTarget.bridges = {};
    vocabularies.urbanexTarget.skating_rinks = {};
    vocabularies.urbanexTarget.amusement_parks = {};
    vocabularies.urbanexTarget.airports = {};
    vocabularies.urbanexTarget.catacombs = {};
    vocabularies.urbanexTarget.railways = {};
    vocabularies.urbanexTarget.smokestacks = {};
    vocabularies.urbanexTarget.towers = {};
    vocabularies.urbanexTarget.prisons = {};
    vocabularies.urbanexTarget.harbours = {};
    vocabularies.urbanexTarget.military = {};
    vocabularies.urbanexTarget.other = {};
    vocabularies.urbanexTarget.unknown = {};
    vocabularies.bikeTrack = {};
    vocabularies.bikeTrack.track_city = {};
    vocabularies.bikeTrack.track_road = {};
    vocabularies.bikeTrack.track_trail = {};
    vocabularies.bikeTrack.track_nature = {};
    vocabularies.bikeTrack.indoor = {};
    vocabularies.bikeTrack.outdoor = {};
    vocabularies.bikeTrack.underground = {};
    vocabularies.bikeType = {};
    vocabularies.bikeType.bike_city = {};
    vocabularies.bikeType.bike_road = {};
    vocabularies.bikeType.bike_mountain = {};
    vocabularies.bikeType.bike_unicycle = {};
    vocabularies.bikeType.bike_tandem = {};
    vocabularies.bikeType.bike_tricycle = {};
    vocabularies.bikeType.bike_other = {};
    vocabularies.saunaType = {};
    vocabularies.saunaType.normal = {};
    vocabularies.saunaType.smoke = {};
    vocabularies.saunaType.steam = {};
    vocabularies.saunaType.infrared = {};
    vocabularies.saunaType.unknown = {};
    // psgeo fixed vocabulary (en)
    //        populate with english text
    vocabularies.rockType.rock_volcanic.en = "volcanic";
    vocabularies.rockType.rock_sandstone.en = "sandstone";
    vocabularies.rockType.rock_mudrock.en = "mudrock";
    vocabularies.rockType.rock_limestone.en = "limestone/dolomite";
    vocabularies.rockType.rock_gypsum.en = "gypsum";
    vocabularies.rockType.rock_salt.en = "salt";
    vocabularies.rockType.rock_marble.en = "marble";
    vocabularies.rockType.rock_granite.en = "non-volcanic, non-sedimentary";
    vocabularies.rockType.rock_other.en = "other rock";
    vocabularies.rockType.rock_unknown.en = "unknown";
    vocabularies.groundType.ice.en = "ice";
    vocabularies.groundType.snow.en = "snow";
    vocabularies.groundType.sand.en = "sand";
    vocabularies.groundType.gravel.en = "gravel";
    vocabularies.groundType.moraine.en = "moraine";
    vocabularies.groundType.rock.en = "rock";        // see rockTypes for detailed classification
    vocabularies.groundType.turf.en = "turf";
    vocabularies.groundType.other_material.en = "other material";
    vocabularies.morphology.morphology_crack.en = "crevice";
    vocabularies.morphology.morphology_boulders.en = "boulder";
    vocabularies.morphology.morphology_karst.en = "karst";
    vocabularies.morphology.morphology_volcanic.en = "volcanic";
    vocabularies.morphology.morphology_erosion.en = "erosion";
    vocabularies.morphology.morphology_weathering.en = "weathering";
    vocabularies.morphology.morphology_crystallization.en = "blister";
    vocabularies.morphology.morphology_organic.en = "organic, reef or turf";
    vocabularies.morphology.morphology_other.en = "other";
    vocabularies.morphology.morphology_unknown.en = "unknown";
    vocabularies.cavingActivity.basic.en = "basic caving";
    vocabularies.cavingActivity.srt.en = "SRT";
    vocabularies.cavingActivity.swimming.en = "swimming";
    vocabularies.cavingActivity.boating.en = "boating";
    vocabularies.cavingActivity.diving.en = "diving";
    vocabularies.cavingActivity.digging.en = "digging";
    vocabularies.cavingActivity.biking.en = "biking";
    vocabularies.cavingActivity.skiing.en = "skiing";
    vocabularies.cavingActivity.surveying.en = "surveying";
    vocabularies.cavingActivity.researching.en = "researching";
    vocabularies.cavingActivity.training.en = "training";
    vocabularies.cavingActivity.studying.en = "studying";
    vocabularies.swimmingPlace.indoor.en = "indoors";
    vocabularies.swimmingPlace.outdoor.en = "outdoors";
    vocabularies.swimmingPlace.underground.en = "underground";
    vocabularies.swimmingPlace.waterbody_river.en = "on a river";
    vocabularies.swimmingPlace.waterbody_lake.en = "on a lake";
    vocabularies.swimmingPlace.waterbody_sandpit.en = "in a sandpit";
    vocabularies.swimmingPlace.waterbody_sea.en = "in the sea";
    vocabularies.swimmingPlace.waterbody_pool.en = "in a swimming pool";
    vocabularies.swimmingPlace.waterbody_cave.en = "in a cave";
    vocabularies.swimmingPlace.waterbody_other.en = "in some other body of water";
    vocabularies.swimmingPlace.waterbody_unknown.en = "unknown";
    vocabularies.swimmingPlace.beach.en = "on an official beach";
    vocabularies.swimmingPlace.nature.en = "in nature";
    vocabularies.swimmingPlace.thermal_bath.en = "in a thermal bath";
    vocabularies.swimmingMaterial.water.en = "in water";
    vocabularies.swimmingMaterial.ice.en = "in an ice hole";
    vocabularies.swimmingMaterial.balls.en = "in a ball pit";
    vocabularies.skiMaterial.imported_snow.en = "on carried snow";
    vocabularies.skiMaterial.sand.en = "on sand";
    vocabularies.skiMaterial.rock.en = "on rocks";
    vocabularies.skiMaterial.ash.en = "on ash";
    vocabularies.skiMaterial.asphalt.en = "on asphalt";
    vocabularies.skiMaterial.grass.en = "on grass";
    vocabularies.skiMaterial.mud.en = "in mud";
    vocabularies.skiMaterial.plastic.en = "on plastic";
    vocabularies.skiMaterial.other_substances.en = "on other substances";
    vocabularies.skiMaterial.unknown_substance.en = "unknown";
    vocabularies.urbanexTarget.none.en = "nothing";
    vocabularies.urbanexTarget.tunnels.en = "a tunnel";
    vocabularies.urbanexTarget.buildings.en = "a building";
    vocabularies.urbanexTarget.ruins.en = "ruins";
    vocabularies.urbanexTarget.bunkers.en = "a bunker";
    vocabularies.urbanexTarget.quarries.en = "a quarry";
    vocabularies.urbanexTarget.mines.en = "a mine";
    vocabularies.urbanexTarget.industrial.en = "an industrial site";
    vocabularies.urbanexTarget.silos.en = "a silo";
    vocabularies.urbanexTarget.ski_lifts.en = "a ski lift";
    vocabularies.urbanexTarget.landfills.en = "a landfill";
    vocabularies.urbanexTarget.castles.en = "a castle";
    vocabularies.urbanexTarget.vehicles.en = "a vehicle";
    vocabularies.urbanexTarget.trenches.en = "a trench";
    vocabularies.urbanexTarget.memorial.en = "a memorial";
    vocabularies.urbanexTarget.historic_sites.en = "a historic site";
    vocabularies.urbanexTarget.bridges.en = "a bridge";
    vocabularies.urbanexTarget.skating_rinks.en = "a skating rink";
    vocabularies.urbanexTarget.amusement_parks.en = "an amusement park";
    vocabularies.urbanexTarget.airports.en = "an airport";
    vocabularies.urbanexTarget.catacombs.en = "a catacomb";
    vocabularies.urbanexTarget.railways.en = "a railway";
    vocabularies.urbanexTarget.smokestacks.en = "a smokestack";
    vocabularies.urbanexTarget.towers.en = "a tower";
    vocabularies.urbanexTarget.prisons.en = "a prison";
    vocabularies.urbanexTarget.harbours.en = "a harbour";
    vocabularies.urbanexTarget.military.en = "a military site";
    vocabularies.urbanexTarget.other.en = "other";
    vocabularies.urbanexTarget.unknown.en = "unknown";
    vocabularies.bikeTrack.track_city.en = "in city";
    vocabularies.bikeTrack.track_road.en = "on roads";
    vocabularies.bikeTrack.track_trail.en = "on a trail";
    vocabularies.bikeTrack.track_nature.en = "in the nature";
    vocabularies.bikeTrack.indoor.en = "indoors";
    vocabularies.bikeTrack.outdoor.en = "outdoors";
    vocabularies.bikeTrack.underground.en = "underground";
    vocabularies.bikeType.bike_city.en = "on a city bike";
    vocabularies.bikeType.bike_road.en = "on a road bike";
    vocabularies.bikeType.bike_mountain.en = "on an MTB";
    vocabularies.bikeType.bike_unicycle.en = "on an unicycle";
    vocabularies.bikeType.bike_tandem.en = "on a tandem bike";
    vocabularies.bikeType.bike_tricycle.en = "on a tricycle";
    vocabularies.bikeType.bike_other.en = "on special bike type";
    vocabularies.saunaType.normal.en = "Finnish sauna";
    vocabularies.saunaType.smoke.en = "smoke sauna";
    vocabularies.saunaType.steam.en = "Turkish sauna";
    vocabularies.saunaType.infrared.en = "infrared sauna";
    vocabularies.saunaType.unknown.en = "unknown";
    // psgeo fixed vocabulary (fi)
    //        populate with finnish text
    vocabularies.rockType.rock_volcanic.fi = "vulkaaninen";
    vocabularies.rockType.rock_sandstone.fi = "hiekkakivi";
    vocabularies.rockType.rock_mudrock.fi = "savikivi";
    vocabularies.rockType.rock_limestone.fi = "kalkkikivi/dolomiitti";
    vocabularies.rockType.rock_gypsum.fi = "kipsi";
    vocabularies.rockType.rock_salt.fi = "suola";
    vocabularies.rockType.rock_marble.fi = "marmori";
    vocabularies.rockType.rock_granite.fi = "muu kivi kuin vulkaaninen tai sedimentti";
    vocabularies.rockType.rock_other.fi = "muu kivi";
    vocabularies.rockType.rock_unknown.fi = "ei tiedossa";
    vocabularies.groundType.ice.fi = "jää";
    vocabularies.groundType.snow.fi = "lumi";
    vocabularies.groundType.sand.fi = "hiekka";
    vocabularies.groundType.gravel.fi = "sora";
    vocabularies.groundType.moraine.fi = "moreeni";
    vocabularies.groundType.rock.fi = "kallio";
    vocabularies.groundType.turf.fi = "turve";
    vocabularies.groundType.other_material.fi = "other material";
    vocabularies.morphology.morphology_crack.fi = "rako";
    vocabularies.morphology.morphology_boulders.fi = "lohkare";
    vocabularies.morphology.morphology_karst.fi = "karsti";
    vocabularies.morphology.morphology_volcanic.fi = "vulkaaninen";
    vocabularies.morphology.morphology_erosion.fi = "eroosio";
    vocabularies.morphology.morphology_weathering.fi = "rapautumis";
    vocabularies.morphology.morphology_crystallization.fi = "kideonkalo";
    vocabularies.morphology.morphology_organic.fi = "koralli tai turve";
    vocabularies.morphology.morphology_other.fi = "muu";
    vocabularies.morphology.morphology_unknown.fi = "ei tiedossa";
    vocabularies.cavingActivity.basic.fi = "luolailu";
    vocabularies.cavingActivity.srt.fi = "SRT";
    vocabularies.cavingActivity.swimming.fi = "uinti";
    vocabularies.cavingActivity.boating.fi = "veneily";
    vocabularies.cavingActivity.diving.fi = "sukellus";
    vocabularies.cavingActivity.digging.fi = "kaivuu";
    vocabularies.cavingActivity.biking.fi = "pyöräily";
    vocabularies.cavingActivity.skiing.fi = "hiihto";
    vocabularies.cavingActivity.surveying.fi = "kartoitus";
    vocabularies.cavingActivity.researching.fi = "tutkimus";
    vocabularies.cavingActivity.training.fi = "opetus";
    vocabularies.cavingActivity.studying.fi = "oppiminen";
    vocabularies.swimmingPlace.indoor.fi = "sisällä";
    vocabularies.swimmingPlace.outdoor.fi = "ulkona";
    vocabularies.swimmingPlace.underground.fi = "maan alla";
    vocabularies.swimmingPlace.waterbody_river.fi = "joessa";
    vocabularies.swimmingPlace.waterbody_lake.fi = "järvellä";
    vocabularies.swimmingPlace.waterbody_sandpit.fi = "hiekkakuopalla";
    vocabularies.swimmingPlace.waterbody_sea.fi = "meressä";
    vocabularies.swimmingPlace.waterbody_pool.fi = "uimaaltaassa";
    vocabularies.swimmingPlace.waterbody_cave.fi = "luolassa";
    vocabularies.swimmingPlace.waterbody_other.fi = "jossain muussa vesialtaassa";
    vocabularies.swimmingPlace.waterbody_unknown.fi = "ei tiedossa";
    vocabularies.swimmingPlace.beach.fi = "virallisella uintipaikalla";
    vocabularies.swimmingPlace.nature.fi = "luonnon rannalla";
    vocabularies.swimmingPlace.thermal_bath.fi = "kuumassa lähteessä";
    vocabularies.swimmingMaterial.water.fi = "vedessä";
    vocabularies.swimmingMaterial.ice.fi = "avannossa";
    vocabularies.swimmingMaterial.balls.fi = "pallomeressä";
    vocabularies.skiMaterial.imported_snow.fi = "kannetulla lumella";
    vocabularies.skiMaterial.sand.fi = "hiekalla";
    vocabularies.skiMaterial.rock.fi = "kivillä";
    vocabularies.skiMaterial.ash.fi = "tuhkalla";
    vocabularies.skiMaterial.asphalt.fi = "asfaltilla";
    vocabularies.skiMaterial.grass.fi = "nurmikolla";
    vocabularies.skiMaterial.mud.fi = "mudassa";
    vocabularies.skiMaterial.plastic.fi = "muovilla";
    vocabularies.skiMaterial.other_substances.fi = "muilla materiaaleilla";
    vocabularies.skiMaterial.unknown_substance.fi = "ei tiedossa";
    vocabularies.urbanexTarget.none.fi = "ei mikään";
    vocabularies.urbanexTarget.tunnels.fi = "tunneli";
    vocabularies.urbanexTarget.buildings.fi = "rakennus";
    vocabularies.urbanexTarget.ruins.fi = "rauniot";
    vocabularies.urbanexTarget.bunkers.fi = "bunkkeri";
    vocabularies.urbanexTarget.quarries.fi = "louhis";
    vocabularies.urbanexTarget.mines.fi = "kaivos";
    vocabularies.urbanexTarget.industrial.fi = "teollisuus";
    vocabularies.urbanexTarget.silos.fi = "siilo";
    vocabularies.urbanexTarget.ski_lifts.fi = "hiihtohissi";
    vocabularies.urbanexTarget.landfills.fi = "kaatopaikka";
    vocabularies.urbanexTarget.castles.fi = "linna";
    vocabularies.urbanexTarget.vehicles.fi = "kulkuväline";
    vocabularies.urbanexTarget.trenches.fi = "juoksuhauta";
    vocabularies.urbanexTarget.memorial.fi = "muistomerkki";
    vocabularies.urbanexTarget.historic_sites.fi = "historiallinen paikka";
    vocabularies.urbanexTarget.bridges.fi = "silta";
    vocabularies.urbanexTarget.skating_rinks.fi = "luistelukenttä";
    vocabularies.urbanexTarget.amusement_parks.fi = "huvipuisto";
    vocabularies.urbanexTarget.airports.fi = "lentokenttä";
    vocabularies.urbanexTarget.catacombs.fi = "katakombi";
    vocabularies.urbanexTarget.railways.fi = "rautatie";
    vocabularies.urbanexTarget.smokestacks.fi = "piippu";
    vocabularies.urbanexTarget.towers.fi = "torni";
    vocabularies.urbanexTarget.prisons.fi = "vankila";
    vocabularies.urbanexTarget.harbours.fi = "satama";
    vocabularies.urbanexTarget.military.fi = "sotilaallinen kohde";
    vocabularies.urbanexTarget.other.fi = "jokin muu";
    vocabularies.urbanexTarget.unknown.fi = "ei tiedossa";
    vocabularies.bikeTrack.track_city.fi = "kaupungissa";
    vocabularies.bikeTrack.track_road.fi = "maanteillä";
    vocabularies.bikeTrack.track_trail.fi = "poluilla";
    vocabularies.bikeTrack.track_nature.fi = "luonnossa";
    vocabularies.bikeTrack.indoor.fi = "sisällä";
    vocabularies.bikeTrack.outdoor.fi = "ulkona";
    vocabularies.bikeTrack.underground.fi = "maan alla";
    vocabularies.bikeType.bike_city.fi = "kaupunkipyörällä";
    vocabularies.bikeType.bike_road.fi = "maantiepyörällä";
    vocabularies.bikeType.bike_mountain.fi = "maastopyörällä";
    vocabularies.bikeType.bike_unicycle.fi = "yksipyöräisellä";
    vocabularies.bikeType.bike_tandem.fi = "tandem-pyörällä";
    vocabularies.bikeType.bike_tricycle.fi = "kolmipyöräisellä";
    vocabularies.bikeType.bike_other.fi = "erikoispyörällä";
    vocabularies.saunaType.normal.fi = "suomalainen";
    vocabularies.saunaType.smoke.fi = "savusauna";
    vocabularies.saunaType.steam.fi = "höyrysauna";
    vocabularies.saunaType.infrared.fi = "infrapuna";
    vocabularies.saunaType.unknown.fi = "ei tiedossa";

    // SCRIPTS BEGIN


    //        INTERNAL FUNCTIONS BEGIN


    function genText(textId) {
        // textId        is a string
        // RETURN        string

        // Return a string in current language,
        //         or in english if the translation is missing.
        //         Example: genText("and") returns "and" by default,
        //        or "ja" if language=fi (finnish) and translation exists.

        // psgeoDebug("Language: " + language + " and textId: " + textId );

        if (typeof translations[textId][language] !== "string") {
            psgeoDebug("Error: textId " + textId + " (language " + language + ") text is not a string! Defaulting to english.");
            return(translations[textId]["en"]); 
        }
        else {
            return(translations[textId][language]);
        }
    }

    // METHODS BEGIN

    
    function getText(textId,needShort) {
        // textId         is string
        // needShort         is boolean, optional
        // RETURN        string

        // Checks
        if ( typeof(textId) != "string" || textId == "" ) {
            psgeoDebug("Error: a text string was requested from function getText, but textId is not a non-empty string!");
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

        if ( message === "undefined" ) psgeoDebug("Error: getTextWithValues: texId: " + textId + " returns no translation string!");

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

        // these will be used to read vocabularies[controlledVocabulary][tagText][language], which is a string

        // Terminology: A collection (e.g. rockType) determines a controlled vocabulary (a fixed set of words)
        //                These words can be called tags, because they are, in effect, metadata. Hence their variable name: tagText

        // controlled vocabularies of psgeo include (but are not limited to):
        //        rockType                [of caves] such as volcanic, (sediment) sandstone, (sediment) limestone/dolomite, (metamorphic) marble...
        //        morphology                [of caves] such as karst, crevice, boulders, ... extended Finnish classification
        //        swimming                such as indoor, outdoor, underground, waterbody-lake, waterbody-sea, ... NOTE environment-*? environment-ice...
        //        swimmingMaterial        such as water, ice, ball pit        NOTE fresh/brekish/salt? icy? pool water? watertype-*? 
        //        skiMaterial                ...        
        //        urbanexTarget
        //        bikeTrack
        //        bikeType
        //        saunaType
        //        cavingActivity


        // Checks
        if ( controlledVocabulary === "undefined" || controlledVocabulary == "" ) {
            psgeoDebug("Error: Cannot return tag text unless the relevant controlled vocabulary is non-empty!");
        }
        if ( tagText === "undefined" || tagText == "" ) {
            psgeoDebug("Error: an empty or undefined tag text in vocabulary " + controlledVocabulary + " was requested!");
        }

        // Special case: cave material
        //        Caves exist both in rock, ice, moraine and turf, at least.
        //        Rock types however can be used in climbing too.
        //        A two level classification is thus in order.
        //        We will thus introduce a new higher level vocabulary: groundType (which includes rock, ice, snow, turf, ...)

        if (  controlledVocabulary == "rockTypeAndOtherMaterial" ) {        // SHOULD THIS NOT BE CALLED CaveMaterialTopLevelCategory ?
            switch (tagText) {
            case "other-material":         return(genText("otherMaterial")); break; // return "other than ice or rock" [relevant for caves]
            case "ice":                 controlledVocabulary="groundType"; break;
            default:                 controlledVocabulary="rockType";
            }
        }

        // Return value
        //         Ex: return(vocabularies["rockType"]["volcanic"]["fi"]); gives "vulkaaninen".
        
        tagText = tagText.replace(/-/g, "_");        // tagText abc-def --> abc_def (good for variable name)

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


    // RETURN AN OBJECT WITH METHODS

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

