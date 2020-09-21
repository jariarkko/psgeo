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

debug("test complete and successful");
