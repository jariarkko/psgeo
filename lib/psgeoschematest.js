
function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

debug("-- schema tests");

var schema = PsgeoLib();
var lang = PsgeoLang("en");
var camat = schema.getCavingMaterialSubActivities();
var swmat = schema.getSwimmingPlaceSubActivities();
debug("  caving materials: " + lang.listToText(camat));
debug("  swimming places: " + lang.listToText(swmat));
      
debug("test complete and successful");

