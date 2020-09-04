
function psgeoAssert(name,cond) {
    if (cond !== true) {
	debug("Assertion " + name + " failed -- abort");
	quit();
    }
}

var lib = PsgeoLib();
var img1 = lib.getActivityMarkerImage("Wakeboarding");

psgeoAssert("img1",img1 == "./icons/balloons/plainblue.png");

debug("test complete and successful");
