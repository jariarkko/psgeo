
function psgeoAssert(name,cond) {
    if (cond !== true) {
	debug("Assertion " + name + " failed -- abort");
	quit();
    }
}

var lib = PsgeoLib();
var db1 = PsgeoDB(lib,[],"barf");
function nevercall(x) { psgeoAssert("nevercall",false); }
psgeoAssert("db1.nPlaces",db1.nPlaces() === 0);
db1.applyAll(nevercall);

var vuokatti = {"n": "Vuokatti",
		"lat": 64.130694,
		"lon": 28.2718593,
		"c": "Finland",
		"o": "Europe",
		"rl": [{ "t": "Vuokatti",
			 "w": ["Jari","Janne","Zach"],
			 "a": ["Skiing"],
			 "sa": [["Outdoor","Snow"]],
			 "u": "https://planetskier.blogspot.fi/2013/02/vuokatti.html" }]};
var db2 = PsgeoDB(lib,[vuokatti],"snarf");
psgeoAssert("db2.nPlaces",db2.nPlaces() === 1);
function checkvuokatti(x) { psgeoAssert("checkvuokatti",x.n == "Vuokatti"); }
db2.applyAll(checkvuokatti);

var db2a = db2.activities(vuokatti).toString();
psgeoAssert("db2.activities",db2a === "Skiing");
psgeoAssert("db2.dominantActivity",db2.dominantActivity(vuokatti) === "Skiing");

var stubai = {"n": "Patschkofel",
	      "lat": 47.208120,
	      "lon": 11.461445,
	      "c": "Austria",
	      "o": "Europe",
	      "rl": [{ "t": "Sauna im Stubai",
		       "w": ["Jari","Janne"],
		       "a": ["Skiing","Caving"],
		       "sa": [["Outdoor","Snow"],"Rock"],
		       "u": "https://planetskier.blogspot.fi/2015/01/sauna-im-stubai.html" }]};
var db3 = PsgeoDB(lib,[stubai,vuokatti],"fryyp");
psgeoAssert("db3.nPlaces",db3.nPlaces() === 2);
var db3a = db3.activities(stubai).toString();
//debug("db3a = " + db3a);
psgeoAssert("db3.activities",db3a === "Skiing,Caving");
psgeoAssert("db3.dominantActivity",db3.dominantActivity(stubai) === "Skiing");

psgeoAssert("db3.nCountries",db3.nCountries() == 2);
psgeoAssert("db3.nContinents",db3.nContinents() == 1);
psgeoAssert("db3.countries",db3.countries().toString() == "Austria,Finland");
psgeoAssert("db3.continents",db3.continents().toString() == "Europe");

var copper = {"n": "Copper Mountain, Colorado",
	      "lat": 39.495085,
	      "lon": -106.158,
	      "c": "USA",
	      "o": "North America",
	      "rl": [{ "t": "Copper Mountain, Colorado Visit", "w": ["Jari"], "a": ["Skiing"], "sa": [["Outdoor","Snow"]] }]}
var db4 = PsgeoDB(lib,[stubai,vuokatti,copper],"no");
var db4p = db4.places().toString();
var db4a = db4.articles().toString();

psgeoAssert("db4.nPlaces",db4.nPlaces() == 3);
debug("db4.nArticles == " + db4.nArticles());
psgeoAssert("db4.nArticles",db4.nArticles() == 2);
debug("db4p = " + db4p);
psgeoAssert("db4.places",db4.places() == "Patschkofel,Vuokatti,Copper Mountain, Colorado");
debug("db4a = " + db4a);
psgeoAssert("db4.articles",db4.articles() == "Sauna im Stubai,Vuokatti");

debug("state tests");
psgeoAssert("db4.state(stubai)",db4.state(stubai,"USA") === undefined);
psgeoAssert("db4.state(copper)",db4.state(copper,"USA") === "Colorado");
debug("db4.states = " + db4.states("USA").toString());
psgeoAssert("db4.states",db4.states("USA").toString() === "Colorado");
psgeoAssert("db4.nStates",db4.nStates("USA") === 1);
psgeoAssert("db4.nStates",db4.nStates("Canada") === 0);

debug("filter tests");
db4.setFilter(db4.filterTrue());
psgeoAssert("true, db4.nPlaces",db4.nPlaces() == 3);
var f = db4.getFilter();
var fs = db4.filterToString(f);
debug("fs = " + fs);
psgeoAssert("db4.filter",fs == "true");
db4.setFilter(db4.filterFalse());
psgeoAssert("false, db4.nPlaces",db4.nPlaces() == 0);
db4.setFilter(db4.filterAnd([db4.filterTrue(),
			     db4.filterFalse()]));
psgeoAssert("true & false, db4.nPlaces",db4.nPlaces() == 0);
db4.setFilter(db4.filterOr([db4.filterTrue(),
			    db4.filterFalse()]));
psgeoAssert("false or false, db4.nPlaces",db4.nPlaces() == 3);
db4.setFilter(db4.filterMatchActivity("Caving"));
psgeoAssert("caving, db4.nPlaces",db4.nPlaces() == 1);
db4.setFilter(db4.filterMatchActivity("Skiing"));
psgeoAssert("caving, db4.nPlaces",db4.nPlaces() == 3);
db4.setFilter(db4.filterAnd([db4.filterMatchActivity("Skiing"),
			     db4.filterMatchActivity("Caving")]));
psgeoAssert("skiing & caving, db4.nPlaces",db4.nPlaces() == 1);

debug("cave size filter tests");
var min0filter = db4.filterCaveSize("min",0);
var min5filter = db4.filterCaveSize("min",5);
var max5filter = db4.filterCaveSize("max",5);
var max100filter = db4.filterCaveSize("max",100);
var min100filter = db4.filterCaveSize("min",100);
db4.setFilter(min0filter);
f = db4.getFilter();
fs = db4.filterToString(f);
psgeoAssert("db4.filter",fs == "cavesize>=0");
db4.setFilter(max5filter);
f = db4.getFilter();
fs = db4.filterToString(f);
psgeoAssert("db4.filter",fs == "cavesize<5");
db4.setFilter(db4.filterAnd([min0filter,max5filter]));
f = db4.getFilter();
psgeoAssert("db4.filter",db4.filterToString(f) == "(cavesize>=0 and cavesize<5)");
var cs = db4.getFilterCaveSizes(f);
debug("cs len " + cs.length.toString());
debug("cs min1 " + cs[0].min.toString() + " max1 " + cs[0].max.toString());
psgeoAssert("cs.length",cs.length == 1);
psgeoAssert("cs[0].min",cs[0].min == 0);
psgeoAssert("cs[0].max",cs[0].max == 5);
db4.setFilter(db4.filterAnd([min0filter,min5filter,max100filter]));
f = db4.getFilter();
psgeoAssert("db4.filter",db4.filterToString(f) == "(cavesize>=0 and cavesize>=5 and cavesize<100)");
var cs = db4.getFilterCaveSizes(f);
debug("cs len " + cs.length.toString());
debug("cs min1 " + cs[0].min.toString() + " max1 " + cs[0].max.toString());
psgeoAssert("cs.length",cs.length == 1);
psgeoAssert("cs[0].min",cs[0].min == 5);
psgeoAssert("cs[0].max",cs[0].max == 100);

debug("cave size or filter tests");
var af = db4.filterAnd([min0filter,max5filter]);
var of = db4.filterOr([af,min100filter]);
db4.setFilter(of);
f = db4.getFilter();
var fs = db4.filterToString(f);
debug("filter object = " + JSON.stringify(f));
debug("filter condition list length = " + f.conds.length);
debug("filter string = " + fs);
psgeoAssert("db4.filter",fs == "((cavesize>=0 and cavesize<5) or cavesize>=100)");
var cs = db4.getFilterCaveSizes(f);
debug("cs len " + cs.length.toString());
debug("cs min1 " + cs[0].min.toString() + " max1 " + cs[0].max.toString());
debug("cs min2 " + cs[1].min.toString() + " max2 " + ((cs[1].max === undefined) ? "ud" : cs[1].max.toString()));
psgeoAssert("cs.length",cs.length == 2);
psgeoAssert("cs[0].min",cs[0].min == 0);
psgeoAssert("cs[0].max",cs[0].max == 5);
psgeoAssert("cs[1].min",cs[1].min == 100);
psgeoAssert("cs[1].max",cs[1].max === undefined);

debug("generation 0 format test");
var inputgen0 =
    [
        {"n": "Kattilajärven iso lippaluola, Nuuksio, Espoo",
         "lat": 60.30145486,
         "lon": 24.62792567,
         "m": "https://example.com/cavemap-kattilajarvi.pdf",
         "l": 9.3,
         "la": "exact",
         "c": "Finland",
         "o": "Europe",
         "rl": [{ "t": "Kattilajärvi roof caves",
                  "i": "https://example.com/a-picture.jpg",
                  "w": ["Jari"],
                  "a": ["Caving"],
                  "sa": ["Rock"],
                  "u": "https://example.com/an-article.html" }
               ]
        }
    ];
debug("  dbgen0.PsgeoDB");
var dbgen0 = PsgeoDB(lib,inputgen0,"yes");
debug("  dbgen0.itemgen0");
var itemgen0 = undefined;
debug("  dbgen0.applyAll");
dbgen0.applyAll(function (x) {
    psgeoAssert("dbgen0.assert.x",x !== undefined);
    psgeoAssert("dbgen0.assert itemgen0",itemgen0 === undefined);
    itemgen0 = x;
});
psgeoAssert("itemgen0",itemgen0 !== undefined);
psgeoAssert("itemgen0.lat",itemgen0.lat === 60.30145486);

debug("generation 1 format test");
var inputgen1 =
    [
        {"n": "Kattilajärven iso lippaluola, Nuuksio, Espoo",
         "lat": 60.30145486,
         "lon": 24.62792567,
         "m": "https://example.com/cavemap-kattilajarvi.pdf",
         "l": 9.3,
         "la": "exact",
         "k": "Espoo",
         "c": "Finland",
         "o": "Europe",
         "rl": [{ "t": "Kattilajärvi roof caves",
                  "i": "https://example.com/a-picture.jpg",
                  "w": ["Jari"],
                  "y": 2020,
                  "m": 5,
                  "a": ["Caving"],
                  "sa": ["Rock"],
                  "u": "https://example.com/an-article.html" }
               ]
        }
    ];
var dbgen1 = PsgeoDB(lib,inputgen1,"tbd");
var itemgen1 = undefined;
dbgen1.applyAll(function (x) {
    psgeoAssert("x",x !== undefined);
    psgeoAssert("itemgen1",itemgen1 === undefined);
    itemgen1 = x;
});
psgeoAssert("itemgen1",itemgen1 !== undefined);
psgeoAssert("itemgen1.lat",itemgen1.lat === 60.30145486);

debug("generation 2 format test");
var inputgen2 =
  {
    "type": "FeatureCollection",
    "features": [
        {
          "type":
             "Feature",
          "geometry":
             { "type": "Point",
               "coordinates": [60.30145486, 24.62792567] },
          "properties": {
            "n": "Kattilajärven iso lippaluola, Nuuksio, Espoo",
            "m": "https://example.com/cavemap-kattilajarvi.pdf",
            "lc": "5<<50",
            "la": "exact",
            "k": "Espoo",
            "c": "Finland",
            "o": "Europe",
            "rl": [{ "t": "Kattilajärvi roof caves",
                     "i": "https://example.com/a-picture.jpg",
                     "w": ["Jari"],
                     "y": 2020,
                     "m": 5,
                     "a": ["Caving"],
                     "sa": ["Rock"],
                     "u": "https://example.com/an-article.html" }
                  ]
           }
        }
    ]
  };

var dbgen2 = PsgeoDB(lib,inputgen2,"hah");
var itemgen2 = undefined;
dbgen2.applyAll(function (x) {
    psgeoAssert("x",x !== undefined);
    psgeoAssert("itemgen2",itemgen2 === undefined);
    itemgen2 = x;
});
psgeoAssert("itemgen2",itemgen2 !== undefined);
psgeoAssert("itemgen2.lat",itemgen2.lat === 60.30145486);
psgeoAssert("itemgen2.getItemLat()",dbgen2.getItemLat(itemgen2) === 60.30145486);
debug("source = " + itemgen2.s);
debug("itemgen2 = " + JSON.stringify(itemgen2));
psgeoAssert("itemgen2.s",dbgen2.getItemSource(itemgen2) === "hah");
debug("itemgen2.lc = " + dbgen2.getItemLengthCategory(itemgen2));
debug("itemgen2.lc.min = " + JSON.stringify(dbgen2.getItemLengthCategoryMin(itemgen2)));
debug("itemgen2.lc.max = " + JSON.stringify(dbgen2.getItemLengthCategoryMax(itemgen2)));
psgeoAssert("itemgen2.lc.min",dbgen2.getItemLengthCategoryMin(itemgen2) === 5);
psgeoAssert("itemgen2.lc.max",dbgen2.getItemLengthCategoryMax(itemgen2) === 50);

var csfilttest1entry1 =
    {"n": "Lintukiiman Silmäsuon luola, Nummi-Pusula",
     "lat": 60.449230, "lon": 23.889590,
     "lc": "5<<50", "la": "approx",
     "k": "Nummi-Pusula",
     "c": "Finland",
     "o": "Europe",
     "rl": [{ "t": "Bird Horniness Eye Swamp Cave",
              "i": "roof.jpg",
              "y": 2017,
              "m": 1
              , "w": ["Jari Arkko","Janne Arkko"],
              "a": ["Caving"], "sa": ["Rock"],
              "u": "swamp.html" }]};
var csfilttest1entry2 =
    {"n": "Peuramaan iso vaakahalkeama, Kirkkonummi",
     "lat": 60.10512231, "lon": 24.47254300,
     "lc": "<5", "la": "approx",
     "k": "Kirkkonummi",
     "c": "Finland",
     "o": "Europe",
     "rl": [{ "t": "Skevabackgrotta Search for the Lost Cave",
              "i": "blaa.jpg",
              "y": 2018,
              "m": 1,
              "w": ["Jari Arkko","Jarmo Ruuth"],
              "a": ["Caving","Hiking"], "sa": ["Rock",""],
              "u": "blaa.html" }]};
var csfilttest1list = [csfilttest1entry1,csfilttest1entry2];
var csfilttest1db = PsgeoDB(lib,csfilttest1list,"cs");
var psgeoCaveSizeBig = 50;
var psgeoCaveSizeSmall = 5;
debug("-- all cave sizes");
var csfilttest1filt =
    csfilttest1db.filterOr([csfilttest1db.filterCaveSize("min",psgeoCaveSizeBig),
                            csfilttest1db.filterAnd([csfilttest1db.filterCaveSize("min",psgeoCaveSizeSmall),
                                                     csfilttest1db.filterCaveSize("max",psgeoCaveSizeBig)]),
                            csfilttest1db.filterCaveSize("max",psgeoCaveSizeSmall)]);
csfilttest1db.applyAllExtraFilter(csfilttest1filt,
                                  function (x) {
                                      debug("entry " + csfilttest1db.getItemName(x) + " passed the filter (all cave sizes)");
                                  });
debug("-- all cave sizes except big");
csfilttest1filt =
    csfilttest1db.filterOr([csfilttest1db.filterAnd([csfilttest1db.filterCaveSize("min",psgeoCaveSizeSmall),
                                                     csfilttest1db.filterCaveSize("max",psgeoCaveSizeBig)]),
                            csfilttest1db.filterCaveSize("max",psgeoCaveSizeSmall)]);
csfilttest1db.applyAllExtraFilter(csfilttest1filt,
                                  function (x) {
                                      debug("entry " + csfilttest1db.getItemName(x) + " passed the filter (except big)");
                                  });

debug("-- all cave sizes except small");
csfilttest1filt =
    csfilttest1db.filterOr([csfilttest1db.filterCaveSize("min",psgeoCaveSizeBig),
                            csfilttest1db.filterAnd([csfilttest1db.filterCaveSize("min",psgeoCaveSizeSmall),
                                                     csfilttest1db.filterCaveSize("max",psgeoCaveSizeBig)])]);
csfilttest1db.applyAllExtraFilter(csfilttest1filt,
                                  function (x) {
                                      debug("entry " + csfilttest1db.getItemName(x) + " passed the filter (except small)");
                                  });

debug("-- all cave sizes except medium");
csfilttest1filt =
    csfilttest1db.filterOr([csfilttest1db.filterCaveSize("min",psgeoCaveSizeBig),
                            csfilttest1db.filterCaveSize("max",psgeoCaveSizeSmall)]);
csfilttest1db.applyAllExtraFilter(csfilttest1filt,
                                  function (x) {
                                      debug("entry " + csfilttest1db.getItemName(x) + " passed the filter (except medium)");
                                  });

debug("-- no cave sizes");
csfilttest1filt =
    csfilttest1db.filterOr([]);
csfilttest1db.applyAllExtraFilter(csfilttest1filt,
                                  function (x) {
                                      debug("entry " + csfilttest1db.getItemName(x) + " passed the filter (no)");
                                  });

debug("-- side caves and relationships");
var solentry1 =
    {"n": "Solamäen luola, Siuntio",
     "lat": 60.282607, "lon": 24.295972,
     "m": "https://www.arkko.com/solamaen-luolat/Solamaki.pdf",
     "l": 15.0, "la": "approx",
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "rl": [{ "t": "Solamäki Caves", "i": "https://2.bp.blogspot.com/-Cin2vjtqK8g/WSoJ0QyrUdI/AAAAAAAAdz8/M-GMEwRdQU4SQ3KMAJeHUfXg0jjrlslnACLcB/s640/blog288_main_skull.jpg", "y": 2017, "m": 5, "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"], "a": ["Caving"], "sa": ["Rock"], "u": "https://planetskier.blogspot.fi/2017/05/solamaki-caves.html" }]};
var solentry2 =
    {"n": "Solamäen kivenalusluola, Siuntio",
     "lat": 60.281639, "lon": 24.298301,
     "rt": ["sidecaveof"], "rn": ["Solamäen luola, Siuntio"],
     "m": "https://www.arkko.com/solamaen-luolat/Solamaki.pdf",
     "l": 4.0, "la": "approx",
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "rl": [{ "t": "Solamäki Caves", "i": "https://2.bp.blogspot.com/-Cin2vjtqK8g/WSoJ0QyrUdI/AAAAAAAAdz8/M-GMEwRdQU4SQ3KMAJeHUfXg0jjrlslnACLcB/s640/blog288_main_skull.jpg", "y": 2017, "m": 5, "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"], "a": ["Caving"], "sa": ["Rock"], "u": "https://planetskier.blogspot.fi/2017/05/solamaki-caves.html" }]};
var solentry3 =
    {"n": "Solamäen lippaluolanen, Siuntio",
     "lat": 60.283525, "lon": 24.288273,
     "rt": ["sidecaveof"], "rn": ["Solamäen luola, Siuntio"],
     "m": "https://www.arkko.com/solamaen-luolat/Solamaki.pdf",
     "l": 4.0, "la": "approx",
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "rl": [{ "t": "Solamäki Caves", "i": "https://2.bp.blogspot.com/-Cin2vjtqK8g/WSoJ0QyrUdI/AAAAAAAAdz8/M-GMEwRdQU4SQ3KMAJeHUfXg0jjrlslnACLcB/s640/blog288_main_skull.jpg", "y": 2017, "m": 5, "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"], "a": ["Caving"], "sa": ["Rock"], "u": "https://planetskier.blogspot.fi/2017/05/solamaki-caves.html" }]};
var solentry4 =
    {"n": "Extraluola 1",
     "lat": 60.28311525, "lon": 24.2882341273,
     "l": 4.0, "la": "approx",
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "rl": [{ "t": "Solamäki Caves", "i": "https://2.bp.blogspot.com/-Cin2vjtqK8g/WSoJ0QyrUdI/AAAAAAAAdz8/M-GMEwRdQU4SQ3KMAJeHUfXg0jjrlslnACLcB/s640/blog288_main_skull.jpg", "y": 2017, "m": 5, "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"], "a": ["Caving"], "sa": ["Rock"], "u": "https://planetskier.blogspot.fi/2017/05/solamaki-caves.html" }]};
var solentry5 =
    {"n": "Extraluola 2",
     "lat": 60.28311525, "lon": 24.2882341273,
     "m": "https://www.arkko.com/solamaen-luolat/Solamaki.pdf",
     "l": 4.0, "la": "approx",
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "rl": [{ "t": "Solamäki Caves", "i": "https://2.bp.blogspot.com/-Cin2vjtqK8g/WSoJ0QyrUdI/AAAAAAAAdz8/M-GMEwRdQU4SQ3KMAJeHUfXg0jjrlslnACLcB/s640/blog288_main_skull.jpg", "y": 2017, "m": 5, "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"], "a": ["Caving"], "sa": ["Rock"] }]};
var soltestlist =
    [solentry1,
     solentry2,
     solentry3,
     solentry4,
     solentry5];
var soltestdb = PsgeoDB(lib,soltestlist,"sol");
soltestdb.applyAll(function (x) {
    var name = soltestdb.getItemName(x);
    var rts = soltestdb.getItemRelationshipTypes(x);
    var rns = soltestdb.getItemRelationshipTargets(x);
    var sc = soltestdb.isItemSideCave(x);
    var sn = soltestdb.isItemSecondary(x);
    debug(name + (sc ? " is a side cave" : " is not a side cave"));
    debug(name + (sn ? " is a secondary entity" : " is a primary entity"));
    if (rts.length == 0) {
        debug(name + " has no relationships");
    } else {
        var i;
        for (i = 0; i < rts.length; i++) {
            var rt = rts[i];
            var rn = rns[i];
        debug(name + " has a " + rt + " relation to " + rn);
        }
    }
});

debug("-- names and searching");
var namedItems = soltestdb.getNamedItems("Solamäen kivenalusluola, Siuntio");
debug("result length " + namedItems.length.toString());
debug("result item name " + namedItems[0].n);
debug("result main cave " + soltestdb.getItemMainCave(namedItems[0]));
var namedItems2 = soltestdb.getNamedItems("Solamäen luola, Siuntio");
debug("main result length " + namedItems2.length.toString());
debug("main result item name " + namedItems2[0].n);
debug("main result main cave " + JSON.stringify(soltestdb.getItemMainCave(namedItems2[0])));
debug("main result side caves " + JSON.stringify(soltestdb.getItemSideCaves(namedItems2[0])));

debug("-- article filters");
debug("has map " + JSON.stringify(soltestdb.getItemMap(namedItems2[0])));
debug("has article " + JSON.stringify(soltestdb.hasItemReadingListUrl(namedItems2[0])));
var fm = soltestdb.filterMatchMap(true);
var fa = soltestdb.filterMatchArticle(true);
debug("-- article filters all entries");
soltestdb.applyAllExtraFilter(fm,function (x) {
    debug("  map filter entry " + soltestdb.getItemName(x));
});
soltestdb.applyAllExtraFilter(fa,function (x) {
    debug("  article filter entry " + soltestdb.getItemName(x));
});

debug("-- converting complex names");
var convertitem1 =
    {"n": "Rokokallion luolat, Vihti (27m,lippa 1-8x32m,14m,lippa 3-4x6m,lippa 3x7m) [U93] {BE,F}",
     "lat": 60.498596900, "lon": 24.477130225,
     "l": 86, "la": "exact",
     "c": "Finland",
     "o": "Europe",
     "rl": [
         { "t": "Rokokallion luolat, Vihti (27m,lippa 1-8x32m,14m,lippa 3-4x6m,lippa 3x7m) [U93] {BE,F}",
           "w": ["Aimo Kejonen"],
           "a": ["Caving"],
           "sa": ["Rock"],
           "u": "https://www.salakirjat.net/product/242/suomen-luolat" }]};
var convertlist =
    [convertitem1];
debug("  creating db");
var converttestdb = PsgeoDB(lib,convertlist,"convert");
debug("  showing convert db results");
converttestdb.applyAll(function (x) {
    var item = JSON.stringify(x);
    debug("convert result: " + item);
});

debug("-- merging of items");

var mergetestitem1 =
    {"n": "Vuorisen luola",
     "lat": 62.067613573832, "lon": 23.822323132184,
     "l": 15, "la": "approx",
     "c": "Finland",
     "o": "Europe",
     "rl": []};
var mergetestitem2 =
    {"n": "Tommin luola",
     "lat": 61.059315413301, "lon": 23.386241059515,
     "l": 15, "la": "approx",
     "c": "Finland",
     "o": "Europe",
     "rl": [{ "t": "Tommin luola", "w": ["Tommi Vuorinen"], "a": ["Caving"], "sa": ["Rock"], "u": "" }]};
var mergetestitem3 =
    {"n": "Pääluola, Rokokallio, Vihti",
     "lat": 60.489854, "lon": 24.476853,
     "an": ["Rokokallion luolat, Vihti"],
     "d": "One description of this cave. Lets see if we can see another one.",
     "lc": "5<<50", "la": "approx",
     "k": "Vihti", "c": "Finland", "o": "Europe",
     "rl": [
         { "t": "Going to Rokokallio!",
           "i": "https://1.bp.blogspot.com/-x_Q6RufLg1s/XwoUNGfkBDI/AAAAAAABibI/Cd91-EERE1oTBHqUknLBFz-Hfek_v8-XwCK4BGAsYHg/w400-h250/blog811_edit.jpg",
           "y": 2020, "m": 7,
           "w": ["Jari Arkko"],
           "a": ["Caving"],
           "sa": [["Rock","Rock-Granite","Morphology-Crack","Morphology-Boulders","Basic"]],
           "u": "https://planetskier.blogspot.com/2020/07/going-to-rokokallio.html" }]};
var mergetestitem4 =
    {"n": "Rokokallion luolat, Vihti (27m,lippa 1-8x32m,14m,lippa 3-4x6m,lippa 3x7m) [U93] {BE,F}",
     "lat": 60.498596900, "lon": 24.477130225,
     "l": 86, "la": "exact",
     "c": "Finland",
     "o": "Europe",
     "rl": [
         { "t": "Rokokallion luolat, Vihti (27m,lippa 1-8x32m,14m,lippa 3-4x6m,lippa 3x7m) [U93] {BE,F}",
           "w": ["Aimo Kejonen"],
           "a": ["Caving"],
           "sa": ["Rock"],
           "u": "https://www.salakirjat.net/product/242/suomen-luolat" }]};
var mergetestlist =
    [mergetestitem1,
     mergetestitem2,
     mergetestitem3,
     mergetestitem4];
debug("  creating merge db");
var mergetestdb = PsgeoDB(lib,mergetestlist,"merge");
debug("  showing merge db results");
mergetestdb.applyAll(function (x) {
    var item = JSON.stringify(x);
    debug("merge result: " + item);
});
debug("  creating lang object");
var lang = PsgeoLang("fi");
debug("  describing all items");
mergetestdb.applyAll(function (x) {
    debug("x = " + JSON.stringify(x));
    debug("describing item " + mergetestdb.getItemName(x) + ":")
    var description = mergetestdb.describeItem(lang,x,true,false);
    debug("Basic HTML description:\n" + description);
    var description = mergetestdb.describeItem(lang,x,false,false);
    debug("Basic TXT description:\n" + description);
    var description = mergetestdb.describeItem(lang,x,false,true);
    debug("Compact TXT description:\n" + description);
});

var cmergetestitem1 = {
    "type": "Feature",
    "geometry": {
	"type": "Point",
	"coordinates": [60.430570994, 22.280602151] }, 
    "properties": {
	"n": "Luolavuoren luola, Turku [TP124] {BEF}",
	"an": [],
	"d": "Luolassa on useita reittejä.",
	"la": "approx",
	"l": 60,
	"k": "Turun ja Porin lääni",
	"c": "Finland",
	"o": "Europe",
	"rl": [{ "t": "Esimerkki retkestä luolaan Luolavuoren luola",
		 "w": ["Aimo Kejonen"],
		 "y": 2020,
		 "a": ["Caving"],
		 "sa": [["Rock"]],
		 "p": "Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1",
		 "u": "" } ]
    }
};
var cmergetestitem2 = {
    "type": "Feature",
    "geometry": {
	"type": "Point",
	"coordinates": [60.429993,22.277781] },
    "properties": {
        "n": "Luolavuoren luola, Turku",
        "d": {
            "en": "A spectacular 60m cave in almost downtown Turku. Easy cave for beginners, but also harder and harder crawling towards the end.",
            "fi": "Loistava kaupunkiluola, lähellä Turun keskustaa. Helppo luola aloittelijoille käydä, ja luolaa onkin käytety Suomen Luolaseuran opetustilaisuuksissa. Mutta edetessäsi tämän 60-metrisen luolan sisempiin osiin tarjoaa se myös haasteita ja ahtaita paikkoja kaikentasoisille luolailijoille!"},
        "l": 60.0, "la": "approx",
        "k": "Turku",
        "c": "Finland",
        "o": "Europe",
        "rl": [{ "t": "More multi-flash practice in caves",
                 "i": "https://2.bp.blogspot.com/-Zw1dFINajwE/W7nkLUC0-II/AAAAAAAA6P0/_MK1JVtFZIkJ3Eetg-cC77ahaQ6v6O8rwCLcBGAs/s640/blog510_opening.gif",
                 "y": 2018,
                 "m": 10, 
                 "w": ["Jari Arkko","Jukka Palm","Ralf Strandell","Tor Paulin"], 
                 "a": ["Caving"],
                 "sa": [["Rock","Rock-Granite","Morphology-Crack","Basic","Training"]],
                 "u": "https://planetskier.blogspot.com/2018/10/more-multi-flash-practice-in-caves.html" }]
    }
};

debug("-- complex merge and gen 2 test");
var cmergelist1 = {
    "type": "FeatureCollection",
    "features": [
        cmergetestitem1
    ]
};
var cmergelist2 = {
    "type": "FeatureCollection",
    "features": [
        cmergetestitem2
    ]
};
var cmergetestdb = PsgeoDB(lib,cmergelist1,"dataset 1");
cmergetestdb.addPlaces(cmergelist2,"dataset 2");
cmergetestdb.applyAll(function (x) {
    var item = JSON.stringify(x);
    var description = cmergetestdb.describeItem(lang,x,false,false);
    debug(description);
});
var cmergeN = cmergetestdb.nPlaces();
debug("n (all) = " + cmergeN.toString());
cmergetestdb.setFilter(cmergetestdb.filterMatchSource("dataset 1"));
cmergeN = cmergetestdb.nPlaces();
debug("n (filter 1) = " + cmergeN.toString());
psgeoAssert("merged source filter 1",cmergeN == 1);
cmergetestdb.setFilter(cmergetestdb.filterMatchSource("dataset 2"));
cmergeN = cmergetestdb.nPlaces();
debug("n (filter 2) = " + cmergeN.toString());
psgeoAssert("merged source filter 2",cmergeN == 1);

debug("-- publications and articles");
var pubart1 = {
    "type": "Feature",
    "geometry": {
	"type": "Point",
	"coordinates": [60.546145452, 21.338651550] }, 
    "properties": {
	"n": "Jeremian luolat, Kustavi [TP32] {F}",
	"an": [],
	"d": "",
	"la": "exact",
	"l": 8,
	"k": "Turun ja Porin lääni",
	"c": "Finland",
	"o": "Europe",
	"rl": [{ "t": "Esimerkki retkestä luolaan Jeremian luolat",
		 "w": ["Aimo Kejonen"],
		 "y": 2020,
		 "a": ["Caving"],
		 "sa": [["Rock"]],
		 "p": "Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1",
		 "u": "https://luolaseura.fi/suomessa/luolia-suomessa/#Jeremian%20luolat" } ]
    }
};
var pubart2 = {
    "type": "Feature",
    "geometry": {
	"type": "Point",
	"coordinates": [50.546145452, 11.338651550] }, 
    "properties": {
	"n": "Jeremian luolat 2, Kustavi [TP32] {F}",
	"an": [],
	"d": "",
	"la": "exact",
	"l": 8,
	"k": "Turun ja Porin lääni",
	"c": "Finland",
	"o": "Europe",
	"rl": [
            {
                "t": "",
	        "w": ["Aimo Kakkos-Kejonen"],
	        "a": ["Caving"],
	        "sa": [["Rock"]],
	        "p": "Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1",
	        "u": ""
            },
            {
                "t": "Esimerkki retkestä luolaan Jeremian luolat",
	        "w": ["Aimo Ykkos-Kejonen"],
	        "a": ["Caving"],
	        "sa": [["Rock"]],
	        "u": "https://luolaseura.fi/suomessa/luolia-suomessa/#Jeremian%20luolat"
            }
              ]
    }
};
var pubart3 = {
    "type": "Feature",
    "geometry": {
	"type": "Point",
	"coordinates": [60.442924881, 20.383939821] }, 
    "properties": {
	"n": "Brunnskobbin luola, Vårdö",
	"an": ["Brunnskobbin luola", "Brunnskoppankittel"],
	"d": "Luolan tunniste AL21. Geneettis-morfologinen luokitus {A}.",
	"la": "exact",
	"l": 2,
	"k": "Ahvenanmaa",
	"c": "Finland",
	"o": "Europe",
	"rl": [{ "t": "Brunnskobbin luola",
		 "w": ["Aimo Kejonen"],
		 "y": 2020,
		 "a": ["Caving"],
		 "sa": [["Rock"]],
		 "u": "" }  ]
    }
};

var pubartlist = {
    "type": "FeatureCollection",
    "features": [
        pubart1,
        pubart2,
        pubart3
    ]
};
var pubartdb = PsgeoDB(lib,pubartlist,"pubart");
pubartdb.applyAll(function (x) {
    var item = JSON.stringify(x);
    var description = pubartdb.describeItem(lang,x,false,false);
    debug(description);
});

debug("test complete and successful");
