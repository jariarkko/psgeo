function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

var lib = PsgeoLib();

debug("-- DB text tests");

var lib = PsgeoLib();
var schema = PsgeoLib();
var lang = PsgeoLang("en");

debug("-- publications and articles");
var pubart1 = {
    "type": "Feature",
    "geometry": {
        "type": "Point",
        "coordinates": [60.546145452, 21.338651550] }, 
    "properties": {
        "n": "Jeremian luolat, Kustavi",
        "an": [],
        "d": "Suomalainen luolakoodi luolalle on TP32. Luolan tyyppi on {F}.",
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
        "n": "Jeremian luolat 2, Kustavi",
        "an": [],
        "d": "Suomalainen luolakoodi luolalle on TP32. Luolan tyyppi on {F}.",
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
    var description = pubartdb.describeItem(lang,x,false,false);
    debug(description);
});

debug("-- test against the bug that causes extra empty lines in article lists");
var emptylinetest = {
    "type": "FeatureCollection",
    "features":
    [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [60.657160204, 26.024298863] }, 
            "properties": {
                "n": "Soidenkallion onkalot, Lapinjärvi",
                "an": [],
                "d": "Luolan tunniste U26. Geneettis-morfologinen luokitus {BD2D3}. 1-5x25m",
                "la": "exact",
                "l": 25,
                "k": "Uudenmaan lääni",
                "c": "Finland",
                "o": "Europe",
                "rl": [{ "t": "Soidenkallion onkalot",
                         "w": ["Aimo Kejonen"],
                         "y": 2015,
                         "a": ["Caving"],
                         "sa": [["Rock"]],
                         "u": "" } 
                       , { "t": "U26 Soidenkallion onkalot",
                           "w": ["Aimo Kejonen"],
                           "y": 2015,
                           "a": ["Caving"],
                           "sa": [["Rock"]],
                           "p": "Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1" } ]
            }
        }
    ]
};
var emptylinetestdb = PsgeoDB(lib,emptylinetest,"emptyline");
emptylinetestdb.applyAll(function (x) {
    var description = emptylinetestdb.describeItem(lang,x,false,false);
    debug(description);
});

debug("-- biking description tests");
var bikingList =
    [
        {
            "n": "Philadelphia, Pennsylvania",
            "lat": 40.0046684, "lon": -75.2581, "k": "Philadelphia", "c": "USA", "o": "North America",
            "rl": [{ "t": "Forbidden Drive",
                     "i": "https://example.com/blog28_tsunami.jpg",
                     "y": 2011, "m": 10, "w": ["Jari Arkko"],
                     "a": ["Biking"], "sa": [["Bike-Mountain","Track-Trail","Track-Road","Outdoor"]],
                     "u": "https://planetskier.blogspot.com/2011/10/forbidden-drive.html" }]},
        {
            "n": "Sibbergroeve, Valkenburg",
            "lat": 50.846991, "lon": 5.830299, "k": "Valkenburg", "c": "Netherlands", "o": "Europe",
            "rl": [{ "t": "Underground biking in Maastricht",
                     "i": "https://example.com/blog846_bikers.jpg",
                     "y": 2010, "m": 7,
                     "w": ["Jari Arkko","Tero Kivinen","Mary Barnes","Marshall Eubanks"],
                     "a": ["Biking","Urban-Exploration","Caving"],
                     "sa": [["Bike-Mountain","Underground"],["Mines"],["Man-Made","Biking","Rock","Rock-Marble"]],
                     "u": "https://planetskier.blogspot.com/2020/08/underground-biking-in-maastricht.html" }]}
    ];
var bikingtestdb = PsgeoDB(lib,bikingList,"planetbiker");
bikingtestdb.applyAll(function (x) {
    var description = bikingtestdb.describeItem(lang,x,false,false);
    debug(description);
});

debug("-- tests with several activities");
var multiacttestlist =
    [
        {
            "n": "Flakturm Stiftskaserne, Vienna",
            "lat": 48.201621, "lon": 16.356024,
            "k": "Vienna", "c": "Austria", "o": "Europe",
            "rl": [
                { "t": "Re-visiting the Vienna flak towers",
                  "i": "https://example.com/blog699_control.jpg",
                  "y": 2020, "m": 1,
                  "w": ["Jari Arkko","Janne Arkko"],
                  "a": ["Urban-Exploration","Caving"], "sa": [["Bunkers","Military"],["Man-Made"]],
                  "u": "https://planetskier.blogspot.com/2020/01/re-visiting-vienna-flak-towers.html" }
            ]
        }
];
var multiacttestdb = PsgeoDB(lib,multiacttestlist,"multiact");
multiacttestdb.applyAll(function (x) {
    var description = multiacttestdb.describeItem(lang,x,false,false);
    debug(description);
});

debug("-- video tests");
var videotestlist = [
    {
        "n": "Högberget, Kirkkonummi",
        "lat": 60.106870, "lon": 24.486241,
        "an": ["Högbergetin luola, Kirkkonummi"],
        "d": {
            "en": "This is the world-famous Finnish cave, even if just 7 meters long. The cave looks exactly like an ... onion.",
            "fi": "Maailmalla kuuluisa suomalainen, vain seitsemän metriä pitkä luola. Luola näyttää aivan... sipulilta."},
        "m": "https://www.arkko.com/hogberget/Hogberget.pdf",
         "l": 6500, "la": "exact",
        "k": "Kirkkonummi", "c": "Finland", "o": "Europe",
        "rl": [
            { "t": "Lights on ... again",
              "i": "https://example.com/blog654_on2.jpg",
              "y": 2019, "m": 8,
              "w": ["Jari Arkko","Per Bäckström","Ralf Strandell"],
              "a": ["Car"], "sa": [],
              "u": "https://planetskier.blogspot.com/2019/08/lights-on-again.html" },
            { "t": "Map of the Högberget Cave",
              "i": "https://example.com/blog297_map3.jpg",
              "r": 0,
              "y": 2017, "m": 6,
              "w": ["Jari Arkko","Johan Torsner","Mats Sågfors"],
              "a": ["Caving"], "sa": [["Rock","Rock-Granite","Morphology-Erosion","Basic","Surveying"]],
              "u": "https://planetskier.blogspot.fi/2017/06/map-of-hogberget-cave.html" },
            { "t": "Högberget Cave",
              "i": "https://example.com/blog189_cave_onion4.jpg",
              "y": 2015, "m": 12,
              "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"],
              "a": ["Caving"], "sa": [["Rock","Rock-Granite","Morphology-Erosion","Basic"]],
              "u": "https://planetskier.blogspot.com/2015/12/hogberget-cave.html",
              "v": "https://player.vimeo.com/video/148812270" },
            { "t": "",
              "i": "https://example.com/blog189_cave_onion.jpg",
              "r": 1,
              "a": ["Car"], "sa": [] }
        ]
    }
];
var videotestdb = PsgeoDB(lib,videotestlist,"video");
videotestdb.applyAll(function (x) {
    var description = videotestdb.describeItem(lang,x,false,false);
    debug(description);
    debug("representative image = " + videotestdb.getItemRepresentativeImageURL(x));
});

debug("-- representative image tests");

videotestdb.applyAll(function (x) {
    var description = videotestdb.describeItem(lang,x,false,false);
    debug("representative image = " + videotestdb.getItemRepresentativeImageURL(x));
});
var representativetestlist = [
    {
        "n": "Högberget, Kirkkonummi",
        "lat": 60.106870, "lon": 24.486241,
        "an": ["Högbergetin luola, Kirkkonummi"],
        "d": {
            "en": "This is the world-famous Finnish cave, even if just 7 meters long. The cave looks exactly like an ... onion.",
            "fi": "Maailmalla kuuluisa suomalainen, vain seitsemän metriä pitkä luola. Luola näyttää aivan... sipulilta."},
        "m": "https://www.arkko.com/hogberget/Hogberget.pdf",
        "l": 6.5, "la": "exact",
        "k": "Kirkkonummi", "c": "Finland", "o": "Europe",
        "rl": [
            { "t": "Lights on ... again",
              "i": "https://example.com/blog654_on.jpg",
              "y": 2019, "m": 8, "w": ["Jari Arkko","Per Bäckström","Ralf Strandell"], "a": ["Car"], "sa": [], "v": "",
              "u": "https://planetskier.blogspot.com/2019/08/lights-on-again.html" },
            { "t": "Map of the Högberget Cave",
              "i": "https://example.com/blog297_map.jpg",
              "y": 2017, "m": 6,
              "w": ["Jari Arkko","Johan Torsner","Mats Sågfors"],
              "a": ["Caving"],
              "sa": [["Rock","Rock-Granite","Morphology-Erosion","Basic","Surveying"]],
              "v": "",
              "u": "https://planetskier.blogspot.fi/2017/06/map-of-hogberget-cave.html" },
            { "t": "Högberget Cave",
              "i": "https://example.com/blog189_cave_onion.jpg", "r": 1,
              "y": 2015, "m": 12,
              "w": ["Jari Arkko","Jarmo Ruuth","Eetu Ruuth","Eino Ruuth"],
              "a": ["Caving"],
              "sa": [["Rock","Rock-Granite","Morphology-Erosion","Basic"]],
              "v": "https://vimeo.com/148812270",
              "u": "https://planetskier.blogspot.com/2015/12/hogberget-cave.html" }]}
];

var representativetestdb = PsgeoDB(lib,representativetestlist,"rep");
representativetestdb.applyAll(function (x) {
    var description = representativetestdb.describeItem(lang,x,false,false);
    debug("representative image = " + representativetestdb.getItemRepresentativeImageURL(x));
});

debug("-- shortening book  names");

var shorteninglist = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [12.34, 56.78] }, 
            "properties": {
                "n": "Blaa blaa",
                "an": [],
                "d": "Luolan tunniste A1. Geneettis-morfologinen luokitus {A}",
                "la": "exact",
                "l": 4000000,
                "c": "Finland",
                "o": "Europe",
                "rl": [{ "t": "Joo joo",
                         "w": ["N N"],
                         "y": 2200,
                         "a": ["Caving"],
                         "sa": [["Rock"]],
                         "p": "Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1" } ]
            }
        }
    ]
};

debug("-- search tests");
var shorteningdb = PsgeoDB(lib,shorteninglist,"short");
shorteningdb.applyAll(function (x) {
    debug(shorteningdb.describeItem(lang,x,false,true));
});
shorteningdb.setFilter(shorteningdb.filterMatchName("A",true));
shorteningdb.applyAll(function (x) { debug("filter A sensitive: " + shorteningdb.getItemName(x)); });
shorteningdb.setFilter(shorteningdb.filterMatchName("b",false));
shorteningdb.applyAll(function (x) { debug("filter b non-sensitive: " + shorteningdb.getItemName(x)); });

debug("-- bug #231 test");
var bug231list = [
    {"n": "Beijing",
     "lat": 39.904361, "lon": 116.391317,
     "k": "Beijing", "c": "China", "o": "Asia",
     "rl": [{ "t": "Beijing Visit", "y": 2012, "m": 3,
              "w": ["Jari Arkko"],
              "a": ["Biking"], "sa": [["Normal"]] }]}
];
var bug231db = PsgeoDB(lib,bug231list,"bug231");
bug231db.applyAll(function (x) {
    debug(JSON.stringify(x));
    debug(bug231db.describeItem(lang,x,false,false));
});

debug("-- 3d model test");
var modellist = [
    {"n": "Grottbergetin luola, Siuntio",
     "lat": 39.904361, "lon": 116.391317,
     "k": "Siuntio", "c": "Finland", "o": "Europe",
     "l": 10.6,
     "m": "https://example.com/map1.pdf",
     "am": ["https://example.com/map2.pdf"],
     "d3": "https://example.com/model1-obj.zip",
     "ad3": ["https://example.com/model2-STL.zip","https://example.com/model2-GLB.glb","https://example.com/model3.bar"],
     "rl": [{ "t": "3D test", "y": 2021, "m": 3,
              "w": ["Jari Arkko"],
              "a": ["Caving"], "sa": [["Basic","Rock","Surveying"]] }]},
    {"n": "Keinoluola, Kiuntio",
     "lat": 0.904361, "lon": 100.391317,
     "k": "Kiuntio", "c": "Finland", "o": "Europe",
     "m": "https://example.com/keinomap.pdf",
     "d3": "https://example.com/keinomodel.glb",
     "rl": [{ "t": "3D test", "y": 2021, "m": 3,
              "w": ["Jari Arkko"],
              "a": ["Caving"], "sa": [["Basic","Rock","Surveying"]] }]}];
var modeldb = PsgeoDB(lib,modellist,"model");
modeldb.applyAll(function (x) {
    debug(JSON.stringify(x));
    debug(modeldb.describeItem(lang,x,false,false));
});

debug("test complete and successful");
