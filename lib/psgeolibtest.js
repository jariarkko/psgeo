
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

debug("test complete and successful");
