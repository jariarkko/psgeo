
function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

var liben = PsgeoLang("en");
var libfi = PsgeoLang("fi");
var text1en = liben.getText("cities");
var text1fi = libfi.getText("cities");

psgeoAssert("text1en",text1en == "cities");
psgeoAssert("text1fi",text1fi == "paikkakuntaa");

debug("test complete and successful");
