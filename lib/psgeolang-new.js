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

// TRANSLATIONS BEGIN
var translations = {};
translations.map = {};
translations.map.en = "map";
translations.map.fi = "kartta";
translations.caveMap = {};
translations.caveMap.en = "cave map";
translations.caveMap.fi = "luolakartta";
translations.caves = {};
translations.caves.en = "caves";
translations.caves.fi = "luolaa";
translations.mediumCaves = {};
translations.mediumCaves.en = "caves ({{string1}}..{{string2}}m)";
translations.mediumCaves.fi = "luolat ({{string1}}..{{string2}}m)";
translations.mediumCavesTextsShort = []; = {};
translations.mediumCavesTextsShort["en"] = "{{string1}}..{{string2}}m";.en = "{{string1}}..{{string2}}m";
translations.mediumCavesTextsShort["fi"] = "{{string1}}..{{string2}}m";.fi = "{{string1}}..{{string2}}m";
translations.cavelets = {};
translations.cavelets.en = "cavelets (under {{string1}} m)";
translations.cavelets.fi = "luolaset (alle {{string1}} m)";
translations.caveletsTextsShort = []; = {};
translations.caveletsTextsShort["en"] = "<{{string1}}m";.en = "<{{string1}}m";
translations.caveletsTextsShort["fi"] = "<{{string1}}m";.fi = "<{{string1}}m";
translations.bigCaves = {};
translations.bigCaves.en = "big caves (over {{string1}} m)";
translations.bigCaves.fi = "isot luolat (yli {{string1}} m)";
translations.bigCavesTextsShort = []; = {};
translations.bigCavesTextsShort["en"] = ">{{string1}}m";.en = ">{{string1}}m";
translations.bigCavesTextsShort["fi"] = ">{{string1}}m";.fi = ">{{string1}}m";
translations.dimensions = {};
translations.dimensions.en = "dimensions";
translations.dimensions.fi = "mitat";
translations.literatureCaveId = {};
translations.literatureCaveId.en = "The Finnish identification code for this cave is";
translations.literatureCaveId.fi = "Suomalainen luolakoodi luolalle on";
translations.length = {};
translations.length.en = "length";
translations.length.fi = "pituus";
translations.lengthCategory = {};
translations.lengthCategory.en = "length category";
translations.lengthCategory.fi = "pituusluokka";
translations.manmade = {};
translations.manmade.en = "man made";
translations.manmade.fi = "keinotekoinen";
translations.ice = {};
translations.ice.en = "ice";
translations.ice.fi = "jää";
translations.balls = {};
translations.balls.en = "ballpit";
translations.balls.fi = "pallomeri";
translations.otherMaterial = {};
translations.otherMaterial.en = "other than rock or ice";
translations.otherMaterial.fi = "muu kuin kivi tai jää";
translations.name = {};
translations.name.en = "name";
translations.name.fi = "nimi";
translations.rock = {};
translations.rock.en = "material";
translations.rock.fi = "materiaali";
translations.rockType = {};
translations.rockType.en = "material";
translations.rockType.fi = "materiaali";
translations.morphology = {};
translations.morphology.en = "cave type";
translations.morphology.fi = "luolan tyyppi";
translations.activity = {};
translations.activity.en = "activity";
translations.activity.fi = "aktiviteetit";
translations.swimming = {};
translations.swimming.en = "swimming";
translations.swimming.fi = "uintia";
translations.waterbody = {};
translations.waterbody.en = "waterbody";
translations.waterbody.fi = "vesialue";
translations.ski = {};
translations.ski.en = "skiing";
translations.ski.fi = "hiihtoa";
translations.indoor = {};
translations.indoor.en = "indoors";
translations.indoor.fi = "sisällä";
translations.outdoor = {};
translations.outdoor.en = "outdoors";
translations.outdoor.fi = "ulkona";
translations.skiMaterial = {};
translations.skiMaterial.en = "material";
translations.skiMaterial.fi = "materiaali";
translations.target = {};
translations.target.en = "target is";
translations.target.fi = "kohde on";
translations.urbanexTarget = {};
translations.urbanexTarget.en = "target";
translations.urbanexTarget.fi = "kohde";
translations.biking = {};
translations.biking.en = "biking";
translations.biking.fi = "pyöräily";
translations.saunaType = {};
translations.saunaType.en = "sauna type";
translations.saunaType.fi = "saunatyyppi";
translations.locationSecret = {};
translations.locationSecret.en = "exact location secret";
translations.locationSecret.fi = "tarkka sijainti salainen";
translations.size = {};
translations.size.en = "size";
translations.size.fi = "koko";
translations.mainCave = {};
translations.mainCave.en = "main cave";
translations.mainCave.fi = "pääluola";
translations.sideCave = {};
translations.sideCave.en = "side cave";
translations.sideCave.fi = "sivuluola";
translations.sideCaves = {};
translations.sideCaves.en = "side caves";
translations.sideCaves.fi = "sivuluolaa";
translations.other = {};
translations.other.en = "other";
translations.other.fi = "muuta";
translations.article = {};
translations.article.en = "article";
translations.article.fi = "artikkeli";
translations.articles = {};
translations.articles.en = "articles";
translations.articles.fi = "artikkelia";
translations.noArticleYet = {};
translations.noArticleYet.en = "no articles yet";
translations.noArticleYet.fi = "ei vielä artikkeleita";
translations.publicationReference = {};
translations.publicationReference.en = "literature reference";
translations.publicationReference.fi = "kirjallisuusviite";
translations.publication = {};
translations.publication.en = "book";
translations.publication.fi = "kirja";
translations.inPublication = {};
translations.inPublication.en = "in book";
translations.inPublication.fi = "kirjassa";
translations.places = {};
translations.places.en = "places";
translations.places.fi = "paikkaa";
translations.city = {};
translations.city.en = "city";
translations.city.fi = "kaupunki";
translations.country = {};
translations.country.en = "country";
translations.country.fi = "maa";
translations.cities = {};
translations.cities.en = "cities";
translations.cities.fi = "paikkakuntaa";
translations.countries = {};
translations.countries.en = "countries";
translations.countries.fi = "maata";
translations.continents = {};
translations.continents.en = "continents";
translations.continents.fi = "maanosaa";
translations.states = {};
translations.states.en = "US states";
translations.states.fi = "USA:n osavaltiota";
translations.provinces = {};
translations.provinces.en = "CA provinces";
translations.provinces.fi = "Kanadan provinssia";
translations.cave = {};
translations.cave.en = "cave";
translations.cave.fi = "luola";
translations.caveMaps = {};
translations.caveMaps.en = "cave maps";
translations.caveMaps.fi = "karttaa"; // < luolakarttaa
translations.withCavemap = {};
translations.withCavemap.en = "with cave map";
translations.withCavemap.fi = "luolakartalliset";
translations.source = {};
translations.source.en = "source";
translations.source.fi = "lähde";
translations.sources = {};
translations.sources.en = "sources";
translations.sources.fi = "lähteet";
translations.filterHeader = {};
translations.filterHeader.en = "filter";
translations.filterHeader.fi = "suodata";
translations.filterLink = {};
translations.filterLink.en = "filter";
translations.filterLink.fi = "suodata";
translations.moreFilters = {};
translations.moreFilters.en = "more filters";
translations.moreFilters.fi = "lisää suodattimia";
translations.filterByName = {};
translations.filterByName.en = "filter by name";
translations.filterByName.fi = "suodata nimen perusteella";
translations.filterByRockType = {};
translations.filterByRockType.en = "filter by material";
translations.filterByRockType.fi = "suodata materiaalin perusteella";
translations.filterByMaterialType = {};
translations.filterByMaterialType.en = "filter by material type";
translations.filterByMaterialType.fi = "suodata materiaalin perusteella";
translations.filterByMorphology = {};
translations.filterByMorphology.en = "filter by cave type";
translations.filterByMorphology.fi = "suodata tyypin perusteella";
translations.filterBySource = {};
translations.filterBySource.en = "filter by source";
translations.filterBySource.fi = "suodata lähteen perusteella";
translations.other = {};
translations.other.en = "other";
translations.other.fi = "muuta";
translations.and = {};
translations.and.en = "and";
translations.and.fi = "ja";
translations.onlyFinland = {};
translations.onlyFinland.en = "only Finland";
translations.onlyFinland.fi = "vain Suomi";
translations.finnishTerrain = {};
translations.finnishTerrain.en = "Finnish terrain";
translations.finnishTerrain.fi = "Suomen maasto";
translations.finnishTerrainTextsShort = []; = {};
translations.finnishTerrainTextsShort["en"] = "Terrain";.en = "Terrain";
translations.finnishTerrainTextsShort["fi"] = "Maasto";.fi = "Maasto";
translations.caveClassification = {};
translations.caveClassification.en = "cave classification";
translations.caveClassification.fi = "luolien luokittelu";
translations.coordinates = {};
translations.coordinates.en = "coordinates";
translations.coordinates.fi = "koordinaatit";
translations.alternativeNames = {};
translations.alternativeNames.en = "other names";
translations.alternativeNames.fi = "muita nimiä";
translations.alternativeCoordinates = {};
translations.alternativeCoordinates.en = "other reported coordinates";
translations.alternativeCoordinates.fi = "muita ilmoitettuja koordinaatteja";
translations.off = {};
translations.off.en = "off";
translations.off.fi = "etäisyydellä";
translations.add = {};
translations.add.en = "add";
translations.add.fi = "lisää";
translations.orModify = {};
translations.orModify.en = "or modify";
translations.orModify.fi = "tai korjaa";
translations.about = {};
translations.about.en = "about";
translations.about.fi = "tietoja";
translations.moreMaps = {};
translations.moreMaps.en = "more maps";
translations.moreMaps.fi = "lisää karttoja";
translations.more = {};
translations.more.en = "more";
translations.more.fi = "lisää";
translations.toolsAndAbout = {};
translations.toolsAndAbout.en = "tools & about";
translations.toolsAndAbout.fi = "työkalut & tiedot";
translations.settings = {};
translations.settings.en = "more information and settings";
translations.settings.fi = "lisäasetukset ja -tiedot";
translations.moreInformation = {};
translations.moreInformation.en = "more information and tools";
translations.moreInformation.fi = "lisätiedot ja -työkalut";
translations.moreToRead = {};
translations.moreToRead.en = "reading list";
translations.moreToRead.fi = "luettavaa";
translations.video = {};
translations.video.en = "video";
translations.video.fi = "video";
translations.warningsAndDisclaimers = {};
translations.warningsAndDisclaimers.en = "warnings and disclaimers";
translations.warningsAndDisclaimers.fi = "varoitukset ja vastuun rajoitukset";
translations.toolsExplanation = {};
translations.toolsExplanation.en = "these tools have been found to be very useful for further research";
translations.toolsExplanation.fi = "nämä työkalut on todettu erittäin hyödylliseksi uusien paikkojen tutkimisessa";
translations.openInNewWindow = {};
translations.openInNewWindow.en = "the tools open in a new, separate window (centered at the same map location as you are browsing now, where technically possible)";
translations.openInNewWindow.fi = "nämä työkalut avautuvat uudessa, erillisessä ikkunassa (keskitettynä samaan kohtaan kartalla, jos se on mahdollista)";
translations.dataExplanationCavingAssociation = {};
translations.dataExplanationCavingAssociation.en = 'This service provides the cave data from the <a href="https://luolaseura.fi">Finnish Caving Association</a>. It will also draw in a smaller data set from the <a href="https://planetcaver.net">Planetcaver</a> service. Map data is by Google and Karttapaikka.';
translations.dataExplanationCavingAssociation.fi = 'Tällä palvelimella näytettävät tiedot tulevat Suomen <a href="https://luolaseura.fi">Luolaseuran</a> tietokannasta. Lisäksi palvelin käyttää myös <a href="https://planetcaver.net">Planetcaverin</a> pienempää tietokantaa. Karttatieto on peräisin Googlen ja Karttapaikan palveluista.';
translations.dataExplanation = {};
translations.dataExplanation.en = "This server employs a dataset by Jari Arkko at ";
translations.dataExplanation.fi = "Tällä palvelimella näytetään Jari Arkon tietokannan tietoja palvelimelta ";
translations.libraryExplanation = {};
translations.libraryExplanation.en = 'The server is powered by <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>, an open source software that can draw activities on a map. It has filtering capabilities and is driven by a rich data <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">format</a> about places, actions, and articles describing them.';
translations.libraryExplanation.fi = 'Palvelin ajaa <a href="https://github.com/jariarkko/psgeo" target="_blank">Psgeo</a>-ohjelmistoa, jolla voidaan esittää aktiviteetteja ja harrastuspaikkoja kartalla. Ohjelmisto on avointa lähdekoodia, ja mahdollistaa tiedon suodatuksen pohjauten alla olevaan <a href="https://github.com/jariarkko/psgeo/blob/master/doc/activity-json.txt" target="_blank">semanttiseen tietoon</a> paikoista, aktiviteeteista, ja artikkeleista jotka kuvaavat niitä.';
translations.developersExplanation = {};
translations.developersExplanation.en = "Psgeo has been developed by Jari Arkko, with help from Ralf Strandell and Jarmo Ruuth.";
translations.developersExplanation.fi = "Psgeo:ta on kehittänyt lähinnä Jari Arkko, mutta myös Ralf Strandell ja Jarmo Ruuth ovat auttaneet sen kehittämisessä.";
translations.dataDistinctExplanation = {};
translations.dataDistinctExplanation.en = "Note that the software library is distinct from any data that is displayed with it. The authors of Psgeo shall not be held responsible for any data displayed with it.";
translations.dataDistinctExplanation.fi = "Psgeo pelkkä ohjelmistokirjasto, eikä sinänsä liity mitenkään tietoihin joita sen avulla esitetään. Psgeo:n ohjelmiston kirjoittajat eivät ole mitenkään vastuussa tiedosta, jota kirjastolla esitetään.";
translations.dangerousExplanation = {};
translations.dangerousExplanation.en = "Also, neither the software authors or data providers are responsible for possible accidents resulting in attempting to go there. MOST LOCATIONS SHOWN WITH THIS TOOL ARE DANGEROUS!";
translations.dangerousExplanation.fi = "Ohjelmiston kirjoittajat tai sillä esitettävän tiedon kerääjät eivät myöskään ole vastuussa onnettomuksista joita saattaa sattua, mikäli esitetyissä kohteissa vieraillaan. NÄYTETTÄVÄT PAIKAT OVAT YLEENSÄ VAARALLISIA!";
translations.retkipaikkaToolName = {};
translations.retkipaikkaToolName.en = "Retkipaikka & Matkailukartta";
translations.retkipaikkaToolName.fi = "Retkipaikka & Matkailukartta";
translations.retkipaikkaToolDescription = {};
translations.retkipaikkaToolDescription.en = "Retkipaikka and Matkailukartta have a map that covers probably the largest set of Finnish natural sights, from beautiful sights on mountaintops to caves and boulders.";
translations.retkipaikkaToolDescription.fi = "Retkipaikka ja Matkailukartta tarjoavat Suomen luonnonnähtyvyyksistä varsin kattavan kartan, vaeltajien itsensä kertomana ja raportoimana. Mukana ovat niin vuorenhuiput, näköalat kuin luolat ja lohkareetkin.";
translations.ruuthToolName = {};
translations.ruuthToolName.en = "Jarmo Ruuth's map";
translations.ruuthToolName.fi = "Jarmo Ruuthin kartta";
translations.ruuthToolDescription = {};
translations.ruuthToolDescription.en = "This tool shows everything, from historic artefact database to known caves, occupation-era aearial maps, etc. Best tool for trying to find new caves.";
translations.ruuthToolDescription.fi = "Tämä työkalu näyttää kaiken! Muinaismuistojen löytöpaikat, tunnetut luolat, Porkkalan valloituksen aikaiset ilmakuvat, jne. Paras työkalu uusien luolien löytämiseen.";
translations.hakkuToolName = {};
translations.hakkuToolName.en = "National Geology Institute's Hakku Server";
translations.hakkuToolName.fi = "GTK:n hakku-palvelu";
translations.hakkuToolDescription = {};
translations.hakkuToolDescription.en = "This tool has a ton of open data, e.g., about known boulders, type of ground rock in different areas, etc.";
translations.hakkuToolDescription.fi = "Tästä työkalusta löytyy valtavasti tietoa, esimerkiksi siirtolohkareiden sijainnit, maaperätyypit, kaikentyyppisiä mittaustuloksia Suomen alueelta, jne.";
translations.laserToolName = {};
translations.laserToolName.en = "MML laser scan";
translations.laserToolName.fi = "MML:n laser-mittaukset";
translations.laserToolDescription = {};
translations.laserToolDescription.en = "The Finnish Surveying Institute's laser-scanned terrain forms. Very useful for finding sharp changes in terrain forms.";
translations.laserToolDescription.fi = "Maanmittauslaitoksen laser-mitatut maanpinnan muodot. Erittäin hyödyllinen terävien pinnanmuodon muutosten löytämiseen.";
translations.nimisampoToolName = {};
translations.nimisampoToolName.en = "Nimisampo - Placename research tool";
translations.nimisampoToolName.fi = "Nimisampo - Nimistötutkijan työpöytä";
translations.nimisampoToolDescription = {};
translations.nimisampoToolDescription.en = "Nimisampo is a tool for place name research. It it meant both for academia and the general public. Interesting names: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. And in Swedish: grotta (and probably others).";
translations.nimisampoToolDescription.fi = "Nimisampo on kaikille avoin verkkopalvelu suomalaisesta paikannimistöstä kiinnostuneiden tutkijoiden ja suuren yleisön käytettäväksi. Nimistöä: *luola*, *kellari, *uuni, *kirkko, *pesä, *tupa*, hiiden*, hiitten*. Myös ruotsiksi: grotta (varmaan muitakin).";
// VOCABULARIES BEGIN
var vocabularies = {};
vocabularies.rockType = {};
vocabularies.rockType.rock-volcanic.en = "volcanic",
vocabularies.rockType.rock-sandstone.en = "sandstone",
vocabularies.rockType.rock-mudrock.en = "mudrock",
vocabularies.rockType.rock-limestone.en = "limestone/dolomite",		// added dolomite
vocabularies.rockType.rock-gypsum.en = "gypsum",			// added gypsum
vocabularies.rockType.rock-salt.en = "salt",				// added salt
vocabularies.rockType.rock-marble.en = "marble",
vocabularies.rockType.rock-granite.en = "non-volcanic, non-sedimentary", // text changed
vocabularies.rockType.rock-other.en = "other rock",			// was other rock
vocabularies.rockType.rock-unknown.en = "unknown"
vocabularies.rockType.rock-volcanic.fi = "vulkaaninen",
vocabularies.rockType.rock-sandstone.fi = "hiekkakivi",
vocabularies.rockType.rock-mudrock.fi = "savikivi",			// monenlaiset savikivet
vocabularies.rockType.rock-limestone.fi = "kalkkikivi/dolomiitti",	// added dolomite
vocabularies.rockType.rock-gypsum.fi = "kipsi",				// added gypsum
vocabularies.rockType.rock-salt.fi = "suola",				// added salt
vocabularies.rockType.rock-marble.fi = "marmori",
vocabularies.rockType.rock-granite.fi = "muu kivi kuin vulkaaninen tai sedimentti", // text changed
vocabularies.rockType.rock-other.fi = "muu kivi",
vocabularies.rockType.rock-unknown.fi = "ei tiedossa"
vocabularies.groundType = {};
vocabularies.groundType.ice.en = "ice",
vocabularies.groundType.snow.en = https://en.wikipedia.org/wiki/Classifications_of_snow
vocabularies.groundType.sand.en = "sand",
vocabularies.groundType.gravel.en = "gravel",
vocabularies.groundType.moraine.en = "moraine",
vocabularies.groundType.rock.en = "rock",					// see rockTypeValueTexts for detailed classification
vocabularies.groundType.turf.en = "turf",
vocabularies.groundType.other-material.en = "other material"
vocabularies.groundType.ice.fi = "jää",
vocabularies.groundType.snow.fi = "lumi",
vocabularies.groundType.sand.fi = "hiekka",
vocabularies.groundType.gravel.fi = "sora",
vocabularies.groundType.moraine.fi = "moreeni",
vocabularies.groundType.rock.fi = "kallio",
vocabularies.groundType.turf.fi = "turve",
vocabularies.groundType.other-material.fi = "other material"
vocabularies.morphology = {};
vocabularies.morphology.morphology-crack.en = "crevice",
vocabularies.morphology.morphology-boulders.en = "boulder",
vocabularies.morphology.morphology-karst.en = "karst",
vocabularies.morphology.morphology-volcanic.en = "volcanic",
vocabularies.morphology.morphology-erosion.en = "erosion",
vocabularies.morphology.morphology-weathering.en = "weathering",
vocabularies.morphology.morphology-crystallization.en = "blister",
vocabularies.morphology.morphology-organic.en = "organic, reef or turf",
vocabularies.morphology.morphology-other.en = "other",
vocabularies.morphology.morphology-unknown.en = "unknown"
vocabularies.morphology.morphology-crack.fi = "rako",
vocabularies.morphology.morphology-boulders.fi = "lohkare",
vocabularies.morphology.morphology-karst.fi = "karsti",
vocabularies.morphology.morphology-volcanic.fi = "vulkaaninen",
vocabularies.morphology.morphology-erosion.fi = "eroosio",
vocabularies.morphology.morphology-weathering.fi = "rapautumis",
vocabularies.morphology.morphology-crystallization.fi = "kideonkalo",
vocabularies.morphology.morphology-organic.fi = "koralli tai turve",
vocabularies.morphology.morphology-other.fi = "muu",
vocabularies.morphology.morphology-unknown.fi = "ei tiedossa"
vocabularies.cavingActivity = {};
vocabularies.cavingActivity.basic.en = "basic caving",
vocabularies.cavingActivity.srt.en = "SRT",
vocabularies.cavingActivity.swimming.en = "swimming",
vocabularies.cavingActivity.boating.en = "boating",
vocabularies.cavingActivity.diving.en = "diving",
vocabularies.cavingActivity.digging.en = "digging",
vocabularies.cavingActivity.biking.en = "biking",
vocabularies.cavingActivity.skiing.en = "skiing",
vocabularies.cavingActivity.surveying.en = "surveying",
vocabularies.cavingActivity.researching.en = "researching",
vocabularies.cavingActivity.training.en = "training",
vocabularies.cavingActivity.studying.en = "studying"
vocabularies.cavingActivity.basic.fi = "luolailu",
vocabularies.cavingActivity.srt.fi = "SRT",
vocabularies.cavingActivity.swimming.fi = "uinti",
vocabularies.cavingActivity.boating.fi = "veneily",
vocabularies.cavingActivity.diving.fi = "sukellus",
vocabularies.cavingActivity.digging.fi = "kaivuu",
vocabularies.cavingActivity.biking.fi = "pyöräily",
vocabularies.cavingActivity.skiing.fi = "hiihto",
vocabularies.cavingActivity.surveying.fi = "kartoitus",
vocabularies.cavingActivity.researching.fi = "tutkimus",
vocabularies.cavingActivity.training.fi = "opetus",
vocabularies.cavingActivity.studying.fi = "oppiminen"
vocabularies.swimmingPlace = {};
vocabularies.swimmingPlace.indoor.en = "indoors",
vocabularies.swimmingPlace.outdoor.en = "outdoors",
vocabularies.swimmingPlace.underground.en = "underground",
vocabularies.swimmingPlace.waterbody-river.en = "on a river",
vocabularies.swimmingPlace.waterbody-lake.en = "on a lake",
vocabularies.swimmingPlace.waterbody-sandpit.en = "in a sandpit",
vocabularies.swimmingPlace.waterbody-sea.en = "in the sea",
vocabularies.swimmingPlace.waterbody-pool.en = "in a swimming pool",
vocabularies.swimmingPlace.waterbody-cave.en = "in a cave",
vocabularies.swimmingPlace.waterbody-other.en = "in some other body of water",
vocabularies.swimmingPlace.waterbody-unknown.en = "unknown",
vocabularies.swimmingPlace.beach.en = "on an official beach",
vocabularies.swimmingPlace.nature.en = "in nature",
vocabularies.swimmingPlace.thermal-bath.en = "in a thermal bath"
vocabularies.swimmingPlace.indoor.fi = "sisällä",
vocabularies.swimmingPlace.outdoor.fi = "ulkona",
vocabularies.swimmingPlace.underground.fi = "maan alla",
vocabularies.swimmingPlace.waterbody-river.fi = "joessa",
vocabularies.swimmingPlace.waterbody-lake.fi = "järvellä",
vocabularies.swimmingPlace.waterbody-sandpit.fi = "hiekkakuopalla",
vocabularies.swimmingPlace.waterbody-sea.fi = "meressä",
vocabularies.swimmingPlace.waterbody-pool.fi = "uimaaltaassa",
vocabularies.swimmingPlace.waterbody-cave.fi = "luolassa",
vocabularies.swimmingPlace.waterbody-other.fi = "jossain muussa vesialtaassa",
vocabularies.swimmingPlace.waterbody-unknown.fi = "ei tiedossa",
vocabularies.swimmingPlace.beach.fi = "virallisella uintipaikalla",
vocabularies.swimmingPlace.nature.fi = "luonnon rannalla",
vocabularies.swimmingPlace.thermal-bath.fi = "kuumassa lähteessä"
vocabularies.swimmingMaterial = {};
vocabularies.swimmingMaterial.water.en = "in water",
vocabularies.swimmingMaterial.ice.en = "in an ice hole",
vocabularies.swimmingMaterial.balls.en = "in a ball pit"
vocabularies.swimmingMaterial.water.fi = "vedessä",
vocabularies.swimmingMaterial.ice.fi = "avannossa",
vocabularies.swimmingMaterial.balls.fi = "pallomeressä"
vocabularies.skiMaterial = {};
vocabularies.skiMaterial.imported-snow.en = "on carried snow",
vocabularies.skiMaterial.sand.en = "on sand",
vocabularies.skiMaterial.rock.en = "on rocks",
vocabularies.skiMaterial.ash.en = "on ash",
vocabularies.skiMaterial.asphalt.en = "on asphalt",
vocabularies.skiMaterial.grass.en = "on grass",
vocabularies.skiMaterial.mud.en = "in mud",
vocabularies.skiMaterial.plastic.en = "on plastic",
vocabularies.skiMaterial.other-substances.en = "on other substances",
vocabularies.skiMaterial.unknown-substance.en = "unknown"
vocabularies.skiMaterial.imported-snow.fi = "kannetulla lumella",
vocabularies.skiMaterial.sand.fi = "hiekalla",
vocabularies.skiMaterial.rock.fi = "kivillä",
vocabularies.skiMaterial.ash.fi = "tuhkalla",
vocabularies.skiMaterial.asphalt.fi = "asfaltilla",
vocabularies.skiMaterial.grass.fi = "nurmikolla",
vocabularies.skiMaterial.mud.fi = "mudassa",
vocabularies.skiMaterial.plastic.fi = "muovilla",
vocabularies.skiMaterial.other-substances.fi = "muilla materiaaleilla",
vocabularies.skiMaterial.unknown-substance.fi = "ei tiedossa"
vocabularies.urbanexTarget = {};
vocabularies.urbanexTarget.none.en = "nothing",
vocabularies.urbanexTarget.tunnels.en = "a tunnel",
vocabularies.urbanexTarget.buildings.en = "a building",
vocabularies.urbanexTarget.ruins.en = "ruins",
vocabularies.urbanexTarget.bunkers.en = "a bunker",
vocabularies.urbanexTarget.quarries.en = "a quarry",
vocabularies.urbanexTarget.mines.en = "a mine",
vocabularies.urbanexTarget.industrial.en = "an industrial site",
vocabularies.urbanexTarget.silos.en = "a silo",
vocabularies.urbanexTarget.ski-lifts.en = "a ski lift",
vocabularies.urbanexTarget.landfills.en = "a landfill",
vocabularies.urbanexTarget.castles.en = "a castle",
vocabularies.urbanexTarget.vehicles.en = "a vehicle",
vocabularies.urbanexTarget.trenches.en = "a trench",
vocabularies.urbanexTarget.memorial.en = "a memorial",
vocabularies.urbanexTarget.historic-sites.en = "a historic site",
vocabularies.urbanexTarget.bridges.en = "a bridge",
vocabularies.urbanexTarget.skating-rinks.en = "a skating rink",
vocabularies.urbanexTarget.amusement-parks.en = "an amusement park",
vocabularies.urbanexTarget.airports.en = "an airport",
vocabularies.urbanexTarget.catacombs.en = "a catacomb",
vocabularies.urbanexTarget.railways.en = "a railway",
vocabularies.urbanexTarget.smokestacks.en = "a smokestack",
vocabularies.urbanexTarget.towers.en = "a tower",
vocabularies.urbanexTarget.prisons.en = "a prison",
vocabularies.urbanexTarget.harbours.en = "a harbour",
vocabularies.urbanexTarget.military.en = "a military site",
vocabularies.urbanexTarget.other.en = "other",
vocabularies.urbanexTarget.unknown.en = "unknown"
vocabularies.urbanexTarget.none.fi = "ei mikään",
vocabularies.urbanexTarget.tunnels.fi = "tunneli",
vocabularies.urbanexTarget.buildings.fi = "rakennus",
vocabularies.urbanexTarget.ruins.fi = "rauniot",
vocabularies.urbanexTarget.bunkers.fi = "bunkkeri",
vocabularies.urbanexTarget.quarries.fi = "louhis",
vocabularies.urbanexTarget.mines.fi = "kaivos",
vocabularies.urbanexTarget.industrial.fi = "teollisuus",
vocabularies.urbanexTarget.silos.fi = "siilo",
vocabularies.urbanexTarget.ski-lifts.fi = "hiihtohissi",
vocabularies.urbanexTarget.landfills.fi = "kaatopaikka",
vocabularies.urbanexTarget.castles.fi = "linna",
vocabularies.urbanexTarget.vehicles.fi = "kulkuväline",
vocabularies.urbanexTarget.trenches.fi = "juoksuhauta",
vocabularies.urbanexTarget.memorial.fi = "muistomerkki",
vocabularies.urbanexTarget.historic-sites.fi = "historiallinen paikka",
vocabularies.urbanexTarget.bridges.fi = "silta",
vocabularies.urbanexTarget.skating-rinks.fi = "luistelukenttä",
vocabularies.urbanexTarget.amusement-parks.fi = "huvipuisto",
vocabularies.urbanexTarget.airports.fi = "lentokenttä",
vocabularies.urbanexTarget.catacombs.fi = "katakombi",
vocabularies.urbanexTarget.railways.fi = "rautatie",
vocabularies.urbanexTarget.smokestacks.fi = "piippu",
vocabularies.urbanexTarget.towers.fi = "torni",
vocabularies.urbanexTarget.prisons.fi = "vankila",
vocabularies.urbanexTarget.harbours.fi = "satama",
vocabularies.urbanexTarget.military.fi = "sotilaallinen kohde",
vocabularies.urbanexTarget.other.fi = "jokin muu",
vocabularies.urbanexTarget.unknown.fi = "ei tiedossa"
vocabularies.bikeTrack = {};
vocabularies.bikeTrack.track-city.en = "in city",
vocabularies.bikeTrack.track-road.en = "on roads",
vocabularies.bikeTrack.track-trail.en = "on a trail",
vocabularies.bikeTrack.track-nature.en = "in the nature",
vocabularies.bikeTrack.indoor.en = "indoors",
vocabularies.bikeTrack.outdoor.en = "outdoors",
vocabularies.bikeTrack.underground.en = "underground"
vocabularies.bikeTrack.track-city.fi = "kaupungissa",
vocabularies.bikeTrack.track-road.fi = "maanteillä",
vocabularies.bikeTrack.track-trail.fi = "poluilla",
vocabularies.bikeTrack.track-nature.fi = "luonnossa",
vocabularies.bikeTrack.indoor.fi = "sisällä",
vocabularies.bikeTrack.outdoor.fi = "ulkona",
vocabularies.bikeTrack.underground.fi = "maan alla"
vocabularies.bikeType = {};
vocabularies.bikeType.bike-city.en = "on a city bike",
vocabularies.bikeType.bike-road.en = "on a road bike",
vocabularies.bikeType.bike-mountain.en = "on an MTB",
vocabularies.bikeType.bike-unicycle.en = "on an unicycle",
vocabularies.bikeType.bike-tandem.en = "on a tandem bike",
vocabularies.bikeType.bike-tricycle.en = "on a tricycle",
vocabularies.bikeType.bike-other.en = "on special bike type"
vocabularies.bikeType.bike-city.fi = "kaupunkipyörällä",
vocabularies.bikeType.bike-road.fi = "maantiepyörällä",
vocabularies.bikeType.bike-mountain.fi = "maastopyörällä",
vocabularies.bikeType.bike-unicycle.fi = "yksipyöräisellä",
vocabularies.bikeType.bike-tandem.fi = "tandem-pyörällä",
vocabularies.bikeType.bike-tricycle.fi = "kolmipyöräisellä",
vocabularies.bikeType.bike-other.fi = "erikoispyörällä"
vocabularies.saunaType = {};
vocabularies.saunaType.normal.en = "Finnish sauna",
vocabularies.saunaType.smoke.en = "smoke sauna",
vocabularies.saunaType.steam.en = "Turkish sauna",
vocabularies.saunaType.infrared.en = "infrared sauna",
vocabularies.saunaType.unknown.en = "unknown"
vocabularies.saunaType.normal.fi = "suomalainen",
vocabularies.saunaType.smoke.fi = "savusauna",
vocabularies.saunaType.steam.fi = "höyrysauna",
vocabularies.saunaType.infrared.fi = "infrapuna",
vocabularies.saunaType.unknown.fi = "ei tiedossa"
// SCRIPTS BEGIN


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

