
function psgeoAssert(name,cond) {
    if (cond !== true) {
        debug("Assertion " + name + " failed -- abort");
        quit();
    }
}

var liben = PsgeoLang("en");
var libfi = PsgeoLang("fi");

debug("basic tests");
var text1en = liben.getText("cities");
var text1fi = libfi.getText("cities");
psgeoAssert("text1en",text1en == "cities");
psgeoAssert("text1fi",text1fi == "paikkakuntaa");

debug("missing language tests");
var libother = PsgeoLang("es");
var text1es = liben.getText("cities");
psgeoAssert("text1es",text1es == "cities");

debug("variable replacement tests");
var textbigcaves = liben.getTextWithValues("bigCaves",true,[50]);
psgeoAssert("textbigcaves",textbigcaves == ">50m");

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

debug("vocabulary tests");
var diving = libfi.getTextCollectionItem("cavingActivity","diving");
debug("  diving = " + diving);
psgeoAssert("diving",diving == "sukellus");

debug("test complete and successful");
