
function psgeoAssert(name,cond) {
    if (cond !== true) {
	debug("Assertion " + name + " failed -- abort");
	quit();
    }
}

var lib = PsgeoLib();
var img1 = lib.getActivityMarkerImage("Wakeboarding");

psgeoAssert("img1",img1 == "./plainblue.png");

var dist = lib.coordinatesDistance(60.209748, 24.729869, 60.131668, 24.510950);
debug("distance is " + dist.toString());
var distkm = dist / 1000;
debug("distance in km is " + distkm.toString());
psgeoAssert("distance calculations",distkm > 14  && distkm < 15);

//
// String processing tests
//

var aString1 = "  foox ";
var trimmed = lib.trimspace(aString1);
debug("trimmed " + aString1 + " to " + trimmed + ".");
var aString2 = "foo  bar snaap  ";
var undoublespaced = lib.removedoublespace(aString2);
debug("undoublespaced " + aString2 + " to " + undoublespaced + ".");

debug("test complete and successful");
