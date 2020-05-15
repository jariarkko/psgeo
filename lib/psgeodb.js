//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

function PsgeoDB(lib,listin,source) {

    // Private data
    
    var list = normalizeDataset(listin,source);
    var filter = filterTrue();
    var warnedAboutM = false;
    var warnedAboutTyresjo = false;
    var warnedAboutCity = false;
    var warnedAboutInvalidDatasetItemType = false;
    var warnedAboutGeoJSONDatasetInvalidType = false;
    var warnedAboutDatasetInvalidType = false;
    var warnedAboutMissingName = false;
    var warnedAboutGeoJSONGeometry = false;
    
    // Methods

    function warn(text) {
        if (console !== undefined) {
            console.log("WARNING: " + text);
        }
    }

    function isarray(obj)  {
        return(obj !== undefined && Array.isArray(obj));
    }
    
    function isrecord(obj) {
        return(obj !== undefined &
               (!isarray(obj)) &&
               typeof obj === "object");
    }
    
    function normalizeItem(place,source) {

        //debug("normalizeItem source = " + source);
        if (place === undefined ||
            !isrecord(place)) {
            if (!warnedAboutInvalidDatasetItemType) {
                warn("Invalid dataset item type");
                warnedAboutInvalidDatasetItemType = true;
            }
            return(undefined);
        }
        
        if  (place.type !== undefined &&
             place.type === "Feature") {
            return(normalizeItemGeoJSON(place,source));
        }
        
        if (place.n === undefined ||
            place.n === "") {
            if (!warnedAboutMissingName) {
                warn("Dataset item has no name (field n)");
                warnedAboutMissingName = true;
            }
            return(undefined);
        }

        return(normalizeItemFields(place,source));
    }

    function normalizeItemGeoJSON(place,source) {
        //debug("normalizeItemGeoJSON source = " + source);
        if (place.geometry === undefined ||
            !isrecord(place.geometry) ||
            place.geometry.type === undefined ||
            place.geometry.type !== "Point" ||
            place.geometry.coordinates === undefined ||
            !isarray(place.geometry.coordinates) ||
            place.geometry.coordinates.length < 2) {
            if (!warnedAboutGeoJSONGeometry) {
                warn("GeoJSON dataset item has missing or invalid geometry or invalid geometry type");
                warnedAboutGeoJSONGeometry = true;
            }
            return(undefined);
        }
        place.properties.lat = place.geometry.coordinates[0];
        place.properties.lon = place.geometry.coordinates[1];
        place = place.properties;
        return(normalizeItemFields(place,source));
    }
    
    function normalizeItemFields(place,source) {
        
        //debug("normalizeItemFields source = " + source);
        
        if (place.m !== undefined && place.m === "") {
            place.m = undefined;

            if (!warnedAboutM) {
                warn("Item " +
                     place.n +
                     " m field is set to an empty string (if there is no map, leave the field out)");
                warnedAboutM = true;
            }
        }
        
        if ((place.n.indexOf("Tyresö Brevik") != -1 ||
             place.n.indexOf("Hammersta") != -1) &&
            place.c !== "Sweden") {
            //place.c = "Sweden";
            if (!warnedAboutTyresjo) {
                warn("Item " + place.n + " c field is set to an incorrect country");
                warnedAboutTyresjo = true;
            }
        }
        
        if (place.k === undefined) {
            place.k = determineCity(place);
            if (!warnedAboutCity) {
                warn("Item " +
                     place.n +
                     " k field is not set, please add city there");
                warnedAboutCity = true;
            }
        }

        //debug("normalizing item " + place.n + " and source = " + source);
        if (place.s === undefined) {
            place.s = source;
            //debug("normalization set source to " + place.s);
        }
        
        return(place);
    }

    function normalizeDataset(dataset,source) {
        //debug("normalizeDataset source = " + source);
        if (isarray(dataset)) {
            var result = [];
            var k;
            //debug("normalizeDataset case list");
            for (k = 0; k < dataset.length; k++) {
                result.push(normalizeItem(dataset[k],source));
            }
            return(result);
        } else if (isrecord(dataset)) {
            //debug("normalizeDataset case record");
            if (dataset.type !== undefined &&
                dataset.type === "FeatureCollection" &&
                dataset.features !== undefined &&
                isarray(dataset.features)) {
                //debug("normalizeDataset case good record");
                var result = [];
                var i;
                for (i = 0; i < dataset.features.length; i++) {
                    //debug("normalizeDataset record list item " + i.toString());
                    var normalized = normalizeItem(dataset.features[i],source);
                    if (normalized !== undefined) {
                        //debug("normalizeDataset case item normalization succeeded");
                        result.push(normalized);
                    }
                }
                return(result);
            } else {
                //debug("normalizeDataset case bad record");
                if (!warnedAboutGeoJSONDatasetInvalidType) {
                    warn("GeoJSON dataset is of invalid type");
                    warnedAboutGeoJSONDatasetInvalidType = true;
                }
                return([]);
            }
        } else {
            if (!warnedAboutDatasetInvalidType) {
                warn("Dataset is of invalid type");
                warnedAboutDatasetInvalidType = true;
            }
            return([]);
            //debug("normalizeDataset case error");
        }
    }
    
    function addPlaces(dataset,source) {
        var places = normalizeDataset(dataset,source);
	for (i = 0; i < places.length; i++) {
	    list.push(places[i]);
	}
    }
    
    function addPlacesWithFilter(dataset,extraFilter,source) {
        var places = normalizeDataset(dataset,source);
	var i;
	for (i = 0; i < places.length; i++) {
            var place = places[i];
	    if (matchFilter(place,extraFilter)) {
	        list.push(place);
            }
	}
    }
    
    function nPlaces() {
	var n = 0;
	applyAll(function (entry) {
	    n++;
	});
	return(n);
    }
    
    function places() {
	var collectedPlaces = [];
	applyAll(function (entry) {
	    collectedPlaces.push(entry.n);
	});
	return(collectedPlaces);
    }
    
    function hasArticle(visit) {
	return(visit.u !== undefined);
    }
    
    function articles() {
	var collectedArticles = [];
	//debug("psgeodb::articles");
	applyAll(function (entry) {
	    //debug("psgeodb::articles got entry " + entry.n);
	    applyAllVisits(entry,
			   function (visit) {
			       //debug("psgeodb::articles entry " + entry.n + " visit " + visit.t);
			       if (hasArticle(visit) &&
				   collectedArticles.indexOf(visit.t) == -1) {
				   collectedArticles.push(visit.t);
				   //debug("psgeodb::articles pushed title");
			       }
			   });
	});
	return(collectedArticles);
    }
    
    function nArticles() {
	var list = articles();
	return(list.length);
    }
    
    function nCountries() {
	var list = countries();
	return(list.length);
    }
    
    function nCities() {
	var list = cities();
	return(list.length);
    }
    
    function nCavemaps() {
	var counter = 0;
        applyAll(function (entry) {
            if (entry.m !== undefined) {
	        counter++;
            }
        });
	return(counter);
    }

    function nContinents() {
	var list = continents();
	return(list.length);
    }

    function countries() {
	var collectedCountries = [];
	applyAll(function (entry) {
	    if (collectedCountries.indexOf(entry.c) == -1) {
		collectedCountries.push(entry.c);
	    }
	});
	return(collectedCountries);
    }
    
    function countryPlaceCount(givenCountry) {
	var counter = 0;
	applyAll(function (entry) {
	    if (entry.c === givenCountry) {
		counter++;
	    }
	});
	return(counter);
    }
    
    function cities() {
	var collectedCities = [];
	applyAll(function (entry) {
            var theCity = city(entry);
	    if (collectedCities.indexOf(theCity) == -1) {
		collectedCities.push(theCity);
	    }
	});
	return(collectedCities);
    }
    
    function cityPlaceCount(givenCity) {
	var counter = 0;
	applyAll(function (entry) {
	    if (city(entry) === givenCity) {
		counter++;
	    }
	});
	return(counter);
    }
    
    function continents() {
	var collectedContinents = [];
	applyAll(function (entry) {
	    if (collectedContinents.indexOf(entry.o) == -1) {
		collectedContinents.push(entry.o);
	    }
	});
	return(collectedContinents);
    }
    
    function continentPlaceCount(givenContinent) {
	var counter = 0;
	applyAll(function (entry) {
	    if (entry.o === givenContinent) {
		counter++;
	    }
	});
	return(counter);
    }
    
    function nWith() {
	var list = wihs();
	return(list.length);
    }

    function withs() {
	var collectedWiths = [];
	applyAll(function (entry) {
	    var friends = entry.w;
	    var i;
	    for (i = 0; i < friends.length; i++) {
		var friend = friends[i];
		if (collectedWiths.indexOf(friend) == -1) {
		    collectedWiths.push(friend);
		}
	    }
	});
	return(collectedWiths);
    }
    
    function applyAll(f) {
        //debug("PsgeoDB.applyAll for list " + list.length.toString());
	var i;
	for (i = 0; i < list.length; i++) {
	    var e = list[i];
            //debug("PsgeoDb.applyAll item " + i.toString() + " " + (e === undefined ? "ud" : "non-ud"));
	    if (matchFilter(e,filter)) {
		f(e);
	    }
	}
    }
    
    function applyAllExtraFilter(extra,f) {
	var i;
	for (i = 0; i < list.length; i++) {
	    var e = list[i];
	    if (matchFilter(e,filter) &&
                matchFilter(e,extra)) {
		f(e);
	    }
	}
    }
    
    function applyAllNoFilter(f) {
	var i;
	for (i = 0; i < list.length; i++) {
	    var e = list[i];
	    f(e);
	}
    }
    
    function applyAllVisits(entry,f) {
	var i;
	for (i = 0; i < entry.rl.length; i++) {
	    f(entry.rl[i]);
	}
    }
    
    function country(entry) {
	return(entry.c);
    }
    
    function city(entry) {
        return(entry.k);
    }

    function determineCity(entry) {
	var place = entry.n;
        var separator = ", ";
        var n = place.indexOf(separator);
        while (n != -1) {
            place = place.substr(n+separator.length);
            n = place.indexOf(separator);
        }
        return(place);
    }
    
    function stringStartsWith(s,what) {
	if (s.length < what.length) {
	    return(false);
	} else {
	    var part = s.substr(0,what.length);
	    //debug("psgeodb::stringStartsWith testing " + part + " with " + what);
	    return(part === what);
	}
    }
    
    function stringEndsWith(s,what) {
	if (s.length < what.length) {
	    return(false);
	} else {
	    var part = s.substr(s.length-what.length);
	    //debug("psgeodb::stringEndsWith testing " + part + " with " + what);
	    return(part === what);
	}
    }
    
    function trimspaces(s) {
	//debug("psgeodb::trimspaces(" + s + ")");
	while (stringEndsWith(s," ")) { s = s.substr(0,s.length-1); }
	//debug("psgeodb::trimspaces end trimmed, s = " + s);
	while (stringStartsWith(s," ")) { s = s.substr(1); }
	//debug("psgeodb::trimspaces start trimmed, s = " + s);
	return(s);
    }
    
    function lastcommaseparatedpart(s) {
	var parts = s.split(",");
	return(parts[parts.length-1]);
    }

    function state(entry,country) {
	if (entry.c != country) {
	    //debug("psgeodb::state returns undefined due to country mismatch " + country + " vs " + entry.c);
	    return(undefined);
	} else if (entry.c == "Canada") {
	    //debug("psgeodb::state canada arm");
	    return(trimspaces(lastcommaseparatedpart(entry.n)));
	} else if (entry.c == "USA") {
	    //debug("psgeodb::state US arm");
	    return(trimspaces(lastcommaseparatedpart(entry.n)));
	} else {
	    //debug("psgeodb::state other country arm");
	    return(undefined);
	}
    }
    
    function nStates(country) {
	var list = states(country);
	return(list.length);
    }
    
    function states(country) {
	var collectedStates = [];
	applyAll(function (entry) {
	    var stateo = state(entry,country);
	    if (stateo !== undefined) {
		//debug("psgeodb::states state " + stateo.toString() + " for " + entry.n);
		if (collectedStates.indexOf(stateo) == -1) {
		    collectedStates.push(stateo);
		    //debug("psgeodb::states pushed");
		}
	    } else {
		//debug("psgeodb::states state undefined for " + entry.n);
	    }
	});
	return(collectedStates);
    }
    
    function continent(entry) {
	return(entry.o);
    }
    
    function dominantActivity(entry) {
	    
	var activitiesHere = activities(entry);
	var activitiesList = lib.getActivityListDominanceOrder();
	var i;
	var j;
	
	for (i = 0; i < activitiesList.length; i++) {
	    for (j = 0; j < activitiesHere.length; j++) {
		if (activitiesList[i] === activitiesHere[j]) {
		    return(activitiesList[i]);
		}
	    }
	}
	
	return("Other");
    }
    
    function activities(entry) {
	var result = [];
	var i;
	for (i = 0; i < entry.rl.length; i++) {
	    result = result.concat(entry.rl[i].a);
	}
	return(result);
    }

    function filterTrue() {
	return({ op: "true"});
    }

    function filterFalse() {
	return({ op: "false"});
    }

    function filterAnd(seq) {
        if (!isarray(seq))
            throw ("Filter and needs a list argument");
        switch (seq.length) {
        case 0: return(filterTrue());
        case 1: return(seq[0]);
        default: return({ op: "and", conds: seq});
        }
    }

    function filterOr(seq) {
        if (!isarray(seq))
            throw ("Filter or needs a list argument");
        switch (seq.length) {
        case 0: return(filterFalse());
        case 1: return(seq[0]);
        default: return({ op: "or", conds: seq});
        }
    }
    
    function filterMatchContinent(continent) {
	return({ op: "continentMatch", param1: continent});
    }
    
    function filterMatchContinents(continents) {
        if (!isarray(continents))
            throw ("Filter continents needs a list argument");
        var subfilters = [];
        var i;
        for (i = 0; i < continents.length; i++) {
	    subfilters.push(filterMatchContinent(continents[i]));
        }
        return(filterOr(subfilters));
    }
    
    function filterMatchCountry(country) {
	return({ op: "countryMatch", param1: country});
    }
    
    function filterMatchCountries(countries) {
        if (!isarray(countries))
            throw ("Filter countries needs a list argument");
        var subfilters = [];
        var i; 
        for (i = 0; i < countries.length; i++) {
	    subfilters.push(filterMatchCountry(countries[i]));
        }
        return(filterOr(subfilters));
    }
    
    function filterMatchCity(city) {
	return({ op: "cityMatch", param1: city});
    }
    
    function filterMatchCities(cities) {
        if (!isarray(cities))
            throw ("Filter cities needs a list argument");
        var subfilters = [];
        var i;
        for (i = 0; i < cities.length; i++) {
	    subfilters.push(filterMatchCity(cities[i]));
        }
        return(filterOr(subfilters));
    }
    
    function filterMatchWith(withFriends) {
	return({ op: "withMatch", param1: withFriends});
    }
    
    function filterMatchActivity(activity) {
	return({ op: "activityMatch", param1: activity});
    }

    function filterMatchActivities(activities) {
        if (!isarray(activities))
            throw ("Filter activities needs a list argument");
	if (activities === []) {
	    return(filterFalse());
	} else {
	    var newlist = [];
	    var i;
	    for (i = 0; i < activities.length; i++) {
		newlist.push(filterMatchActivity(activities[i]));
	    }
	    return(filterOr(newlist));
	}
    }

    function filterMatchSubActivity(activity,subactivity) {
	return({ op: "subactivityMatch", param1: activity, param2: subactivity});
    }
    
    function filterMatchSubActivities(activity,subactivities) {
        if (!isarray(subactivities))
            throw ("Filter subactivities needs a list argument");
	if (subactivities === []) {
	    return(filterFalse());
	} else {
	    var newlist = [];
	    var i;
	    for (i = 0; i < subactivities.length; i++) {
		newlist.push(filterMatchSubActivity(activity,subactivities[i]));
	    }
	    return(filterOr(newlist));
	}
    }
    
    function filterMatchSource(source) {
	return({ op: "sourceMatch", param1: source});
    }
    
    function filterMatchMap(needsMap) {
	return({ op: "mapMatch", param1: needsMap});
    }
    
    function filterCaveSize(limitType,value) {
        switch (limitType) {
        case "min": return({ op: "minCaveSize", param1: value});
        case "max": return({ op: "maxCaveSize", param1: value});
        default: throw ("Bad limit type " + limitType);
        }
    }

    function setFilter(newFilter) {
	filter = newFilter;
    }
    
    function getFilter()  {
	return(filter);
    }

    function getFilterCities() {
	return(getFilterCitiesAux(filter));
    }

    function getFilterCaveSizes() {
	return(getFilterCaveSizesAux(filter));
    }
    
    function getFilterActivities()  {
	return(getFilterActivitiesAux(filter));
    }

    function listIntersection(list1,list2) {
	var result = [];
	var i;
	for (i = 0; i < list1.length; i++) {
	    if (list2.indexOf(list1[i]) != -1) {
		result.push(list1[i]);
	    }
	}
	return(result);
    }
    
    function listUnion(list1,list2) {
	var result = list1;
	var i;
	for (i = 0; i < list2.length; i++) {
	    if (result.indexOf(list2[i]) == -1) {
		result.push(list2[i]);
	    }
	}
	return(result);
    }
    
    function caveSizeIntersectionAux(item1,item2) {

        //
        // Sanity checks
        //
        
        if (item1.min === undefined ||
            item2.min === undefined)
            throw ("Cave size minimum should not be undefined");
        
        //
        // Align min values to the highest one
        //
        
        if (item1.min > item2.min) {
            item2 = {min: item1.min, max: item2.max};
        } else if (item2.min > item1.min) {
            item1 = {min: item2.min, max: item1.max};
        }
        
        //
        // Min values are now same. Then branch based on max values.
        //
        
        if (item1.max == item2.max) return(item1);
        else if (item1.max !== undefined && item2.max === undefined) return(item1);
        else if (item1.max === undefined && item2.max !== undefined) return(item2);
        else if (item1.max < item2.max) return(item1);
        else return(item2);
    }
    
    function caveSizeIntersection(list1,list2) {
	var result = [];
	var i;
	for (i = 0; i < list1.length; i++) {
            var item1 = list1[i];
            var j;
            for (j = 0; j < list2.length; j++) {
                var item2 = list2[j];
                var jointitem = caveSizeIntersectionAux(item1,item2);
                if (jointitem !== undefined) {
		    result.push(jointitem);
	        }
	    }
	}
	return(result);
    }
    
    function getFilterCitiesAux(condition) {
        switch(condition.op) {
        case "true":
            return(cities());
        case "false":
            return([]);
        case "cityMatch":
            return([condition.param1]);
	case "countryMatch":
	    return(cities());
	case "continentMatch":
	    return(cities());
	case "withMatch":
	    return(cities());
	case "sourceMatch":
	    return(cities());
	case "mapMatch":
	    return(cities());
	case "minCaveSize":
	    return(cities());
	case "maxCaveSize":
	    return(cities());
	case "activityMatch":
	    return(cities());
	case "subactivityMatch":
	    return(cities());
	case "and":
            {
	        var result = cities();
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listIntersection(result,getFilterCitiesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case "or":
            {
	        var result = [];
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listUnion(result,getFilterCitiesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }
    
    function getFilterCaveSizesAux(condition) {
        var any = [{min: 0, max: undefined}]
        var none = [];
        switch(condition.op) {
        case "true":
            return(any);
        case "false":
            return(none);
        case "cityMatch":
            return(any);
	case "countryMatch":
	    return(any);
	case "continentMatch":
	    return(any);
	case "withMatch":
	    return(any);
	case "sourceMatch":
	    return(any);
	case "mapMatch":
	    return(any);
	case "minCaveSize":
	    return([{min: condition.param1, max: undefined}]);
	case "maxCaveSize":
	    return([{min: 0, max: condition.param1}]);
	case "activityMatch":
	    return(any);
	case "subactivityMatch":
	    return(any);
	case "and":
            {
	        var result = any;
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = caveSizeIntersection(result,getFilterCaveSizesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case "or":
            {
	        var result = none;
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listUnion(result,getFilterCaveSizesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }
    
    function getFilterActivitiesAux(condition) {
	switch (condition.op) {
        case "true":
	    return(lib.getActivityList());
	case "false":
	    return([]);
	case "cityMatch":
	    return(lib.getActivityList());
	case "countryMatch":
	    return(lib.getActivityList());
	case "continentMatch":
	    return(lib.getActivityList());
	case "withMatch":
	    return(lib.getActivityList());
	case "sourceMatch":
	    return(lib.getActivityList());
	case "mapMatch":
	    return(lib.getActivityList());
	case "minCaveSize":
	    return(lib.getActivityList());
	case "maxCaveSize":
	    return(lib.getActivityList());
	case "activityMatch":
	    return([condition.param1]);
	case "subactivityMatch":
	    return(lib.getActivityList());
	case "and":
            {
	        var result = lib.getActivityList();
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listIntersection(result,getFilterActivitiesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case "or":
            {
	        var result = [];
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listUnion(result,getFilterActivitiesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }

    function matchFilter(entry,condition) {
	switch (condition.op) {
        case "true":
	    return(true);
	case "false":
	    return(false);
	case "cityMatch":
	    return(city(entry) === condition.param1);
	case "countryMatch":
	    return(entry.c === condition.param1);
	case "continentMatch":
	    return(entry.o === condition.param1);
	case "withMatch":
	    return(entry.w === condition.param1);
	case "sourceMatch":
	    return(entry.s === condition.param1);
	case "mapMatch":
	    return(condition.param1 === false ||
                   (entry.m !== undefined));
	case "minCaveSize":
            return(entry.l === undefined ||
                   entry.l >= condition.param1);
	case "maxCaveSize":
            return(entry.l === undefined ||
                   entry.l <= condition.param1);
	case "activityMatch":
            {
	        var i;
	        for (i = 0; i < entry.rl.length; i++) {
		    if (entry.rl[i].a.indexOf(condition.param1) != -1) {
		        return(true);
		    }
	        }
	        return(false);
            }
	case "subactivityMatch":
            {
	        var i;
	        for (i = 0; i < entry.rl.length; i++) {
		    
	    	    var j;
		    for (j = 0; j < entry.rl[i].a.length; j++) {
		        if (entry.rl[i].a[j] == condition.param1) {
			    var subs = entry.rl[i].sa[j];
			    if (subs.indexOf(condition.param2) != -1) {
			        return(true);
			    }
		        }
		    }
	        }
	        return(false);
            }
	case "and":
            {
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    if (matchFilter(entry,condition.conds[i]) === false) {
		        return(false);
		    }
	        }
	        return(true);
            }
	case "or":
            {
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    if (matchFilter(entry,condition.conds[i]) === true) {
		        return(true);
		    }
	        }
	        return(false);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }
    
    function filterToString(condition) {
	switch (condition.op) {
        case "true":
	    return("true");
	case "false":
	    return("false");
	case "cityMatch":
	    return("city=" + condition.param1);
	case "countryMatch":
	    return("country=" + condition.param1);
	case "continentMatch":
	    return("continent=" + condition.param1);
	case "withMatch":
	    return("with=" + condition.param1);
	case "sourceMatch":
	    return("source=" + condition.param1);
	case "mapMatch":
	    if (condition.param1)
                return("map");
            else
                return("nomap");
	case "minCaveSize":
            return("cavesize>=" + condition.param1.toString());
	case "maxCaveSize":
            return("cavesize<=" + condition.param1.toString());
	case "activityMatch":
            return("activity=" + condition.param1.toString());
	case "subactivityMatch":
            return("subactivity=" + condition.param2.toString());
	case "and":
            {
	        var result = "(";
                var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    var subresult = filterToString(condition.conds[i]);
                    if (result.length > 1) result = result + " and ";
                    result += subresult;
                }
                result += ")";
	        return(result);
            }
	case "or":
            {
	        var result = "(";
                var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    var subresult = filterToString(condition.conds[i]);
                    if (result.length > 1) result = result + " or ";
                    result += subresult;
                }
                result += ")";
	        return(result);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }

    function getItemName(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.n);
    }
    
    function getItemLat(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.lat);
    }
    
    function getItemLon(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.lon);
    }
    
    function getItemMap(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.m);
    }
    
    function getItemLength(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.l);
    }

    function getItemAlt(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.alt);
    }

    function getItemFuzzy(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.fz !== undefined && item.fz === true);
    }
    
    function getItemLengthAccuracy(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        if (item.l === undefined) {
            return("approx");
        } else if (item.la === undefined) {
            return("approx");
        } else {
            return(item.la);
        }
    }

    function getItemReadingList(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        if (item.rl === undefined) return([]);
        else return(item.rl);
    }
    
    function getItemSource(item) {
        if (!isrecord(item)) throw ("Not a dataset item");
        return(item.s);
    }

    function getReadingListItemTitle(article) {
        if (!isrecord(article)) throw ("Not a reading  list item");
        return(article.t);
    }

    function getReadingListItemURL(article) {
        if (!isrecord(article)) throw ("Not a reading  list item");
        return(article.u);
    }

    function getReadingListItemImageURL(article) {
        if (!isrecord(article)) throw ("Not a reading  list item");
        return(article.i);
    }

    function getReadingListItemYear(article) {
        if (!isrecord(article)) throw ("Not a reading  list item");
        return(article.y);
    }

    function getReadingListItemMonth(article) {
        if (!isrecord(article)) throw ("Not a reading  list item");
        return(article.m);
    }

    return({
	activities: activities,
	addPlaces: addPlaces,
	addPlacesWithFilter: addPlacesWithFilter,
	applyAll: applyAll,
	applyAllExtraFilter: applyAllExtraFilter,
	applyAllNoFilter: applyAllNoFilter,
	applyAllVisits: applyAllVisits,
	articles: articles,
	continents: continents,
	countries: countries,
        cities: cities,
        continentPlaceCount: continentPlaceCount,
        countryPlaceCount: countryPlaceCount,
        cityPlaceCount: cityPlaceCount,
	continent: continent,
	country: country,
        city: city,
	dominantActivity: dominantActivity,
	filterAnd: filterAnd,
	filterOr: filterOr,
	filterFalse: filterFalse,
        filterMatchSource: filterMatchSource,
	filterMatchCity: filterMatchCity,
	filterMatchCities: filterMatchCities,
	filterMatchCountry: filterMatchCountry,
	filterMatchCountries: filterMatchCountries,
	filterMatchContinent: filterMatchContinent,
	filterMatchContinents: filterMatchContinents,
	filterMatchActivity: filterMatchActivity,
	filterMatchActivities: filterMatchActivities,
	filterMatchSubActivity: filterMatchSubActivity,
	filterMatchSubActivities: filterMatchSubActivities,
        filterMatchMap: filterMatchMap,
        filterCaveSize: filterCaveSize,
	filterTrue: filterTrue,
	getFilter: getFilter,
	getFilterCities: getFilterCities,
	getFilterActivities: getFilterActivities,
        getFilterCaveSizes: getFilterCaveSizes,
        filterToString: filterToString,
	matchFilter: matchFilter,
        getItemName: getItemName,
        getItemLat: getItemLat,
        getItemLon: getItemLon,
        getItemMap: getItemMap,
        getItemLength: getItemLength,
        getItemLengthAccuracy: getItemLengthAccuracy,
        getItemAlt: getItemAlt,
        getItemFuzzy: getItemFuzzy,
        getItemSource: getItemSource,
        getItemReadingList: getItemReadingList,
        getReadingListItemTitle: getReadingListItemTitle,
        getReadingListItemYear: getReadingListItemYear,
        getReadingListItemMonth: getReadingListItemMonth,
        getReadingListItemURL: getReadingListItemURL,
        getReadingListItemImageURL: getReadingListItemImageURL,
	nArticles: nArticles,
	nPlaces: nPlaces,
	nContinents: nContinents,
	nCountries: nCountries,
        nCities: nCities,
	nCavemaps: nCavemaps,
	nStates: nStates,
	nWith: nWith,
	places: places,
	state: state,
	states: states,
	setFilter: setFilter,
	withs: withs
    });
}
