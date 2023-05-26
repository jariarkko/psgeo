function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

debug("-- DB backend tests");

var lib = PsgeoLib();
var schema = PsgeoLib();
var lang = PsgeoLang("en");

debug("test complete and successful");
