
//
// HELPER FUNCTIONS ---------------------------------------------------------------------------
//

function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

//
// TESTS --------------------------------------------------------------------------------------
//

//
// Basic setup
//

var lib = PsgeoLib();
var liben = PsgeoLang("en");
var libfi = PsgeoLang("fi");

//
debug("basic tests");
var text1en = liben.getText("cities");
var text1fi = libfi.getText("cities");
psgeoAssert("text1en",text1en == "cities");
psgeoAssert("text1fi",text1fi == "paikkakuntaa");

//
// Test what happens when we request an unknown language.
//

debug("missing language tests");
var libother = PsgeoLang("es");
var text1es = libother.getText("cities");
psgeoAssert("text1es",text1es == "cities");

//
// Test that we can use variables ({{string1}} and so on) in the
// translations.
//

debug("variable replacement tests");
var textbigcaves = liben.getTextWithValues("bigCaves",true,[50]);
psgeoAssert("textbigcaves",textbigcaves == ">50m");

//
// Test the string processing functions (capitalize etc) provided by
// psgeolang.js
//

debug("string processing tests");
var cap = liben.capitalize("ouch!");
psgeoAssert("cap",cap == "Ouch!");
var list0 = liben.listToText([]);
var list1 = liben.listToText(["foo"]);
var list2 = liben.listToText(["foo","bar"]);
var list3 = liben.listToText(["foo","bar","snaap"]);
debug("  list0 = " + list0);
debug("  list1 = " + list1);
debug("  list2 = " + list2);
debug("  list3 = " + list3);
psgeoAssert("list0",list0 == "");
psgeoAssert("list1",list1 == "foo");
psgeoAssert("list2",list2 == "foo and bar");
psgeoAssert("list3",list3 == "foo, bar and snaap");

//
// Basic tests for vocabularies
//

debug("vocabulary tests");
var diving = libfi.getTextCollectionItem("cavingActivity","diving");
debug("  diving = " + diving);
psgeoAssert("diving",diving == "sukellus");

//
// The systematic vocabulary tests ensure that the subactivities
// defined in the schema (psgeolib.js) agree with the translations
// provided in language mappings (psgeolang.js). In other words, that
// for each subactivity there actually is a translation.
//

debug("systematic vocabulary tests");
const vocabularies = [
    { name: "rockType", func: "getCavingRockTypeSubActivities", arg: true },
    { name: "rockTypeAndOtherMaterial", func: "getCavingRockTypeAndOtherMaterialSubActivities", arg: true },
    { name: "morphology", func: "getCavingMorphologySubActivities", arg: true },
    { name: "cavingActivity", func: "getCavingMovementAndNonMovementActivitySubActivities", arg: undefined },
    { name: "swimmingPlace", func: "getSwimmingPlaceSubActivities", arg: true },
    { name: "swimmingMaterial", func: "getSwimmingMaterialSubActivities", arg: true },
    { name: "skiMaterial", func: "getSkiingSubstanceSubActivities", arg: true },
    { name: "skiPlace", func: "getSkiingPlaceSubActivities", arg: true },
    { name: "skiUphill", func: "getSkiingUphillSubActivities", arg: true },
    { name: "urbanexTarget", func: "getUrbanexTargetSubActivities", arg: true },
    { name: "bikeTrack", func: "getBikingBikeTrackSubActivities", arg: true },
    { name: "bikeType", func: "getBikingBikeTypeSubActivities", arg: true },
    { name: "climbingType", func: "getClimbingTypeSubActivities", arg: true },
    { name: "saunaType", func: "getSaunaTypeSubActivities", arg: true }
];
const langs = ["fi","en","sv"];
for (var j = 0; j < langs.length; j++) {
    var onelang = langs[j];
    var libthis = PsgeoLang(onelang);
    for (var i = 0; i < vocabularies.length; i++) {
        var vocabulary = vocabularies[i];
        var name = vocabulary.name;
        var funcall = vocabulary.func;
        var arg = vocabulary.arg;
        var elements = ((arg !== undefined) ? lib[funcall](arg) : lib[funcall]());
        debug("  testing vocabulary " + name + " in language " + onelang + ": " + JSON.stringify(elements));
        for (var k = 0; k < elements.length; k++) {
            var element = elements[k].toLowerCase();
            var result = libthis.getTextCollectionItem(name,element);
            psgeoAssert("result is not undefined",result !== undefined);
            psgeoAssert("result string is non-empty",result.length > 0);
        }
    }
    
}

//
// Set of languages ---------------------------------------------------------------------------
//

debug("test set of languages");
var supported = libfi.getSupportedLanguages();
debug("  languages = " + JSON.stringify(supported));
psgeoAssert("number of supported languages",supported.length == langs.length);

//
// TESTS COMPLETE -----------------------------------------------------------------------------
//

debug("test complete and successful");
