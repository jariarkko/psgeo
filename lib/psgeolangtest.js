
function psgeoAssert(name,cond) {
    if (cond !== true) {
	debug("Assertion " + name + " failed -- abort");
	quit();
    }
}

var liben = PsgeoLang("en");
var libfi = PsgeoLang("fi");
var text1en = liben.citiesText();
var text1fi = libfi.citiesText();

psgeoAssert("text1en",text1en == "cities");
psgeoAssert("text1fi",text1fi == "kaupunkia");

debug("test complete and successful");
