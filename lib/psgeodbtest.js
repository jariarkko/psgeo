
function psgeoAssert(name,cond) {
    if (cond !== true) {
	debug("Assertion " + name + " failed -- abort");
	quit();
    }
}

var lib = PsgeoLib();
var db1 = PsgeoDB(lib,[]);
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
var db2 = PsgeoDB(lib,[vuokatti]);
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
var db3 = PsgeoDB(lib,[stubai,vuokatti]);
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
var db4 = PsgeoDB(lib,[stubai,vuokatti,copper]);
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
psgeoAssert("db4.filter",db4.filterToString(f) == "true");
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
psgeoAssert("db4.filter",db4.filterToString(f) == "cavesize>=0");
db4.setFilter(max5filter);
f = db4.getFilter();
psgeoAssert("db4.filter",db4.filterToString(f) == "cavesize<=5");
db4.setFilter(db4.filterAnd([min0filter,max5filter]));
f = db4.getFilter();
psgeoAssert("db4.filter",db4.filterToString(f) == "(cavesize>=0 and cavesize<=5)");
var cs = db4.getFilterCaveSizes(f);
debug("cs len " + cs.length.toString());
debug("cs min1 " + cs[0].min.toString() + " max1 " + cs[0].max.toString());
psgeoAssert("cs.length",cs.length == 1);
psgeoAssert("cs[0].min",cs[0].min == 0);
psgeoAssert("cs[0].max",cs[0].max == 5);
db4.setFilter(db4.filterAnd([min0filter,min5filter,max100filter]));
f = db4.getFilter();
psgeoAssert("db4.filter",db4.filterToString(f) == "(cavesize>=0 and cavesize>=5 and cavesize<=100)");
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
psgeoAssert("db4.filter",fs == "((cavesize>=0 and cavesize<=5) or cavesize>=100)");
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
var dbgen0 = PsgeoDB(lib,inputgen0);
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
var dbgen1 = PsgeoDB(lib,inputgen1);
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
        }
    ]
  };

var dbgen2 = PsgeoDB(lib,inputgen2);
var itemgen2 = undefined;
dbgen2.applyAll(function (x) {
    psgeoAssert("x",x !== undefined);
    psgeoAssert("itemgen2",itemgen2 === undefined);
    itemgen2 = x;
});
psgeoAssert("itemgen2",itemgen2 !== undefined);
psgeoAssert("itemgen2.lat",itemgen2.lat === 60.30145486);

debug("test complete and successful");
