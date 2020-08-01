 //
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

function PsgeoDB(lib,listin,source) {

    //
    // Warning controls -----------------------------------------------------------------------
    //
    
    var warnedAboutUrl = false;
    var warnedAboutM = false;
    var warnedAboutDescription = false;
    var warnedAboutTyresjo = false;
    var warnedAboutCity = false;
    var warnedAboutInvalidDatasetItemType = false;
    var warnedAboutGeoJSONDatasetInvalidType = false;
    var warnedAboutDatasetInvalidType = false;
    var warnedAboutMissingName = false;
    var warnedAboutGeoJSONGeometry = false;
    var warnedAboutCaveLengthFiltering = false;
    var warnedAboutMalformedCategory = false;
    var warnedAboutInconsistentRelationships = false;
    var warnedAboutBookAsArticle = false;
    var warnedAboutNepperi = false;
    var warnedAboutFailingUrl = false;
    
    //
    // Some configuration settings ------------------------------------------------------------
    //
    
    var bookNames = ["Suomen luolat"];
    var bookUrls = ["https://www.salakirjat.net/product/242/suomen-luolat"];
    var bookAuthors = ["Aimo Kejonen"];
    
    var possiblyInaccurateCoordinateBookUrls = bookUrls;
    var possiblyInaccurateCoordinateBookAuthors = bookAuthors;
    
    var knownFailingUrls = ["https://web.archive.org/web/20051201053118/http://img.groundspeak.com/cache/1203_000.gif"];
    
    //
    // Private data ---------------------------------------------------------------------------
    //
    
    var list = normalizeDataset(listin,source);
    var table = constructTable(list);
    var filter = filterTrue();

    //
    // Internal utility methods ---------------------------------------------------------------
    //

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

    function isString(x) {
        if (x !== undefined && x.constructor === String)
            return(true);
        else
            return(false);
    }
    
    function istable(obj) {
        return(isrecord(obj) && obj.isTable === true);
    }
    
    function isitem(obj) {
        return(isrecord(obj));
    }
    
    function isreadinglistitem(obj) {
        return(isrecord(obj));
    }

    function islang(obj) {
        if (!isrecord(obj)) return(false);
        if (obj.aboutText === undefined) return(false);
        return(true);
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

    function anyIsFalse(seq) {
        var i;
        for (i = 0; i < seq.length; i++) {
            var filt = seq[i];
            if (filt.op === "false") return(true);
        }
        return(false);
    }
    
    function anyIsTrue(seq) {
        var i;
        for (i = 0; i < seq.length; i++) {
            var filt = seq[i];
            if (filt.op === "true") return(true);
        }
        return(false);
    }
    
    function listSubstraction(list1,list2) {
	var result = list1;
	var i;
	for (i = 0; i < result.length; i++) {
	    if (list2.indexOf(result[i]) != -1) {
		result.splice(i,1);
                i--;
	    }
	}
	return(result);
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

    //
    // Internal methods for normalization -----------------------------------------------------
    //

    function normalizeItem(place,source) {

        if (place === undefined ||
            !isitem(place)) {
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

        if (place.d !==  undefined &&
            place.d === "") {
            if (!warnedAboutDescription) {
                warn("Dataset item has a d field but it contains an empty string");
                warnedAboutDescription = true;
            }
            place.d = undefined;
        }
        
        if ((place.rt !== undefined && place.rn === undefined) ||
            (place.rt === undefined && place.rn !== undefined) ||
            (place.rt !== undefined && place.rn !== undefined &&
             place.rt.length != place.rn.length)) {
            place.rt = undefined;
            place.rn = undefined;
            if (!warnedAboutInconsistentRelationships) {
                warn("Dataset item " + place.n + " relationship lists are inconsistent");
                warnedAboutInconsistentRelationships = true;
            }
        }

        if (place.rl === undefined) place.rl = [];
        var i;
        for (i = 0; i < place.rl.length; i++) {
            normalizeReadingListItem(place,place.rl[i],source);
        }
        
        return(normalizeItemFields(place,source));
    }

    function normalizeReadingListItem(place,article,source) {
        
        if (article.u !== undefined && article.u === "") {
            if (!warnedAboutUrl) {
                warn("Dataset item "  + place.n + " has a reading list item URL field but it contains an empty string");
                warnedAboutUrl = true;
            }
            article.u = undefined;
        }
        
        var bookIndex = bookUrls.indexOf(article.u);
        if (bookIndex != -1) {
            if (!warnedAboutBookAsArticle) {
                warn("URLs of printed publications should be given in field pu, not so in " + place.n);
                warnedAboutBookAsArticle = true;
            }
            if (article.pu === undefined) {
                article.pu = article.u;
            }
            article.u = undefined;
            if (article.p === undefined) {
                article.p = bookNames[bookIndex];
            }
        }
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

        if (place.m !== undefined && knownFailingUrls.includes(place.m)) {

            if (!warnedAboutFailingUrl) {
                warn("The URL " + place.m + " in " + place.n + " is not working, deleting");
                warnedAboutFailingUrl = true;
            }

            place.m = undefined;
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

        if (place.n === "Nepperin luola, Kauniainen") {
            if (!warnedAboutNepperi) {
                warn("Item " + place.n + " has an incorrect city");
                warnedAboutNepperi = true;
            }
            place.n = "Nepperin luola, Espoo";
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
        if (isarray(dataset)) {
            dataset = removeDuplicates(dataset,source);
            var result = [];
            var k;
            for (k = 0; k < dataset.length; k++) {
                result.push(normalizeItem(dataset[k],source));
            }
            return(result);
        } else if (isrecord(dataset)) {
            if (dataset.type !== undefined &&
                dataset.type === "FeatureCollection" &&
                dataset.features !== undefined &&
                isarray(dataset.features)) {
                var result = [];
                var i;
                dataset.features = removeDuplicates(dataset.features,source);
                for (i = 0; i < dataset.features.length; i++) {
                    var normalized = normalizeItem(dataset.features[i],source);
                    if (normalized !== undefined) {
                        result.push(normalized);
                    }
                }
                return(result);
            } else {
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
        }
    }

    function finishNormalizing(tab,normlist) {
        if (!istable(tab)) throw ("Not a table");
        if (!isarray(list)) throw ("Not a dataset item list");
        var i;
        for (i = 0; i < normlist.length; i++) {
            finishNormalizingItem(tab,normlist[i]);
        }
        findSubsumedItems(tab);
    }
    
    function finishNormalizingItem(tab,item) {
        if (!istable(tab)) throw ("Not a table");
        if (!isitem(item)) throw ("Not a dataset item");
        var i;
        for (i = 0; i < list.length; i++) {
            var otherItem = list[i];
            if (otherItem !== item) {
                finishNormalizingItemRelationships(tab,item,otherItem);
            }
        }
    }
    
    function finishNormalizingItemRelationships(tab,item,otherItem) {
        //debug("finishNormalizingItemRelationships " + item.n + " " + otherItem.n);
        var list1 = getItemRelationshipTypes(otherItem);
        var list2 = getItemRelationshipTargets(otherItem);
        //debug("list lengths " + list1.length.toString() + " " + list2.length.toString());
        if (list1.length != list2.length) throw("relationship list lengths mismatch");
        var i;
        for (i = 0; i < list1.length; i++) {
            var relation = list1[i];
            //debug("relationship " + relation);
            if (relation === "sidecaveof") {
                //debug("found a sidecave relationship");
                var target = list2[i];
                if (target === item.n) {
                    addItemRelationship(item,"sidecave",otherItem.n);
                }
            }
        }
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

    function removeDuplicates(list,source) {
        var newList = [];
        var newListStrings = [];
        var nDuplicates = 0;
        var lastDuplicate = "";
        for (var i = 0; i < list.length; i++) {
            var candidate = list[i];
            var candidateString = JSON.stringify(candidate);
            if (newListStrings.includes(candidateString)) {
                nDuplicates++;
                lastDuplicate = candidate.n;
            } else {
                newList.push(candidate);
                newListStrings.push(candidateString);
            }
        }
        if (nDuplicates > 0) {
            warn("Found " + nDuplicates.toString() +
                 " duplicates in the " + source + " dataset, " +
                 " for instance, with item " + lastDuplicate);
        }
        return(newList);
    }
    
    //
    // Internal methods for item merging ------------------------------------------------------
    //

    function findSubsumedItems(tab) {
        for (var i = 0; i < list.length; i++) {
            var item1 = list[i];
            for (var j = 0; j < list.length; j++) {
                if (j != i) {
                    var item2 = list[j];
                    if (itemSubsumedByAnother(item1,item2)) {
                        subsumeItem(tab,item1,item2);
                    }
                }
            }
        }
    }

    function itemStrongerThanAnother(mainitem,otheritem) {
        if (mainitem.m !== undefined && otheritem.m === undefined) return(1);
    }
    
    function itemSubsumedByAnother(mainitem,otheritem) {

        //debug("investingating subsuming " + otheritem.n + " by " + mainitem.n);
        
        //
        // Case 0: Can't subsume itself
        //
        
        if (mainitem === otheritem) return(false);
        //debug("subsume test pt 1");
        
        //
        // Case 1: If the item-to-be-subsumed has better information,
        // we will not subsume, at least not this way.
        //
        
        if (itemStrongerThanAnother(otheritem,mainitem)) return(false);
        //debug("subsume test pt 2");

        //
        // Case 2: If the item-to-be-subsumed has information that we
        // cannot (currently) merge, we will not attempt subsumption.
        //
        
        if (getItemRelationshipTypes(otheritem).length > 0 ||
            getItemRelationshipTargets(otheritem).length > 0 ||
            otheritem.fz !== undefined) {
            return(false);
        }
        //debug("subsume test pt 3");
        
        //
        // Case 2: Same coordinates and names => we can subsume.
        //

        var cleanedupname = otheritem.n;
        var paran1 = cleanedupname.indexOf(" (");
        if (paran1 > 0) cleanedupname = cleanedupname.substring(0,paran1);
        var paran2 = cleanedupname.indexOf(" [");
        if (paran2 > 0) cleanedupname = cleanedupname.substring(0,paran2);
        const samename = (mainitem.n === cleanedupname);
        const samenameasalternatename = (!samename &&
                                         getItemAlternativeNames(mainitem).includes(cleanedupname));
        
        //debug("subsume cleanedupname = " + cleanedupname);
        //debug("subsume samename = " + JSON.stringify(samename));
        //debug("subsume samenameasalternatename = " + JSON.stringify(samenameasalternatename));
        
        if (samename &&
            mainitem.lat === otheritem.lat &&
            mainitem.lon === otheritem.lon) {
            subsumeItemNotice(mainitem,otheritem,"same name and coordinates");
            return(true);
        }
        //debug("subsume test pt 4");

        //
        // Case 3: Same coordinates and name matches an alternative name
        //
        
        if (samenameasalternatename &&
            mainitem.lat === otheritem.lat &&
            mainitem.lon === otheritem.lon) {
            subsumeItemNotice(mainitem,otheritem,"alternative names match and coordinates are the same");
            return(true);
        }
        //debug("subsume test pt 5");
        
        //
        // Case 4: Same name and coordinates close enough => we can subsume.
        //

        const closeEnoughNormal = 250; // meters
        const closeEnoughForPossiblyInaccurate = 2500; // meters
        const possiblyInaccurate = possiblyInaccurateItem(otheritem);
        const closeEnough = possiblyInaccurate ? closeEnoughForPossiblyInaccurate : closeEnoughNormal;
        const distance =
              lib.coordinatesDistance(mainitem.lat,mainitem.lon,otheritem.lat,otheritem.lon);
        //debug("subsume possibly inaccurate = " + JSON.stringify(possiblyInaccurate));
        //debug("subsume distance " + distance.toString() + " with close enough defined as " + closeEnough.toString());
        
        if (samename &&
            distance < closeEnough) {
            subsumeItemNotice(mainitem,otheritem,
                              "same name and coordinates only " + distance.toString() + "m apart");
            return(true);
        }
        //debug("subsume test pt 6");

        //
        // Case 5: Alternative names match and coordinates close enough => we can subsume.
        //

        if (samenameasalternatename &&
            distance < closeEnough) {
            subsumeItemNotice(mainitem,otheritem,
                              "alternative names match and coordinates only " + distance.toString() + "m apart");
            return(true);
        }
        //debug("subsume test pt 7");
        
        //
        // Default: not subsumed
        //
        
        return(false);
    }

    function possiblyInaccurateItem(item) {
        if (item.rl.length > 1) return(false);
        if (item.rl.length < 1) return(false);
        var rli = item.rl[0];
        var auth = getReadingListItemWith(rli);
        if (auth.length != 1) return(false);
        //debug("auth = " + auth[0]);
        //debug("possiblyInaccurateCoordinateBookAuthors = " + JSON.stringify(possiblyInaccurateCoordinateBookAuthors));
        if (!possiblyInaccurateCoordinateBookAuthors.includes(auth[0])) return(false);
        var u = getReadingListItemURL(rli);
        if (u === undefined) u = getReadingListItemPublicationURL(rli);
        //debug("url is " + (u === undefined ? "not set" : "set"));
        if (u === undefined) return(false);
        //debug("url = " + u);
        if (!possiblyInaccurateCoordinateBookUrls.includes(u)) return(false);
        return(true);
    }
    
    function subsumeItemNotice(mainitem,otheritem,why) {
        warn("Subsuming item " + otheritem.n + "/" + otheritem.s +
             " by item " + mainitem.n + "/" + mainitem.s +
             " because " + why);
    }

    function addMaps(item,map) {
        if (item.m === undefined) item.m = map;
        if (item.m === map) return;
        if (item.am === undefined) item.am = [];
        for (var i = 0; i < item.am; i++) {
            var thismap = item.am[i];
            if (thismap === map) return;
        }
        item.am.push(map);
    }
    
    function addAltitudes(item,alt) {
        if (item.alt === undefined) item.alt = alt;
        if (item.alt === alt) return;
        if (item.aa === undefined) item.aa = [];
        for (var i = 0; i < item.aa; i++) {
            var thisalt = item.aa[i];
            if (thisalt === alt) return;
        }
        item.aa.push(alt);
    }
    
    function addCoordinates(item,lat,lon,source) {
        if (item.lat === lat && item.lon === lon) return;
        if (item.ac === undefined) item.ac = [];
        for (var i = 0; i < item.ac; i++) {
            var thiscoord = item.ac[i];
            if (thiscoord.lat === lat && thiscoord.lon === lon) return;
        }
        item.ac.push({lat: lat,lon: lon,s: source});
    }

    function removeItemFromList(item) {
        var idx = list.indexOf(item);
        if (idx == -1) throw ("Cannot find list item " + item.n + " to be removed!");
        list.splice(idx,1);
    }

    function subsumeItem(tab,mainitem,otheritem,why) {

        //
        // Add coordinates
        //

        addCoordinates(mainitem,otheritem.lat,otheritem.lon,otheritem.s);
        if (otheritem.alt !== undefined) addAltitudes(mainitem,otheritem.alt);

        //
        // Add map information
        //

        if (otheritem.m !== undefined) addMaps(mainitem,otheritem.m);
        
        //
        // Merge reading lists
        //

        for (var i = 0; i < otheritem.rl.length; i++) {
            otheritem.rl[i].s = mainitem.s;
        }
        mainitem.rl = mainitem.rl.concat(otheritem.rl);

        //
        // Remove the other item from the list and table
        //

        removeItemFromList(otheritem);
        removeItemFromTable(tab,otheritem);
    }
    
    //
    // Internal methods for table management --------------------------------------------------
    //
    
    function constructTable(list) {
        var tab = { isTable: true };
        addItemsToTable(tab,list);
        finishNormalizing(tab,list);
        return(tab);
    }

    function addItemsToTable(tab,list) {
        var i;
        for (i = 0; i < list.length; i++) {
            addItemToTable(tab,list[i]);
        }
    }
    
    function addItemToTable(tab,item) {
        if (!istable(tab)) throw ("Not a table");
        if (!isitem(item)) throw ("Not a dataset item");
        if (tab[item.n] === undefined) {
            tab[item.n] = [];
        }
        tab[item.n].push(item);
    }

    function removeItemFromTable(tab,item) {
        if (!istable(tab)) throw ("Not a table");
        if (!isitem(item)) throw ("Not a dataset item");
        var list = tab[item.n];
        if (list === undefined || list.length == 0) throw ("Nothing to remove");
        var idx = list.indexOf(item);
        if (idx < 0) throw ("Cannot find item to remove");
        list.splice(idx,1);
    }
    
    //
    // Public methods for adding places -------------------------------------------------------
    //
    
    function addPlaces(dataset,source) {
        var places = normalizeDataset(dataset,source);
        var toFinishNormalizing = [];
	for (i = 0; i < places.length; i++) {
            var place = places[i];
            toFinishNormalizing.push(place);
	    list.push(place);
            addItemToTable(table,place);
	}
        finishNormalizing(table,toFinishNormalizing);
    }
    
    function addPlacesWithFilter(dataset,extraFilter,source) {
        var places = normalizeDataset(dataset,source);
        var toFinishNormalizing = [];
	var i;
	for (i = 0; i < places.length; i++) {
            var place = places[i];
	    if (matchFilter(place,extraFilter)) {
                toFinishNormalizing.push(place);
	        list.push(place);
                addItemToTable(table,place);
            }
	}
        finishNormalizing(table,toFinishNormalizing);
    }
    
    //
    // Public methods for statistics ----------------------------------------------------------
    //
    
    function nPlaces() {
	var n = 0;
	applyAll(function (entry) {
	    n++;
	});
	return(n);
    }
    
    function hasArticle(visit) {
	return(visit.u !== undefined);
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

    function countryPlaceCount(givenCountry) {
	var counter = 0;
	applyAll(function (entry) {
	    if (entry.c === givenCountry) {
		counter++;
	    }
	});
	return(counter);
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
    
    function cityPlaceCount(givenCity) {
	var counter = 0;
	applyAll(function (entry) {
	    if (city(entry) === givenCity) {
		counter++;
	    }
	});
	return(counter);
    }
    
    function nWith() {
	var list = wihs();
	return(list.length);
    }

    function nStates(country) {
	var list = states(country);
	return(list.length);
    }
    
    //
    // Public methods for asking lists of things (countries, cities, etc.) --------------------
    //
    
    function places() {
	var collectedPlaces = [];
	applyAll(function (entry) {
	    collectedPlaces.push(entry.n);
	});
	return(collectedPlaces);
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
    
    function countriesNoFilter() {
	var collectedCountries = [];
	applyAllNoFilter(function (entry) {
	    if (collectedCountries.indexOf(entry.c) == -1) {
		collectedCountries.push(entry.c);
	    }
	});
	return(collectedCountries);
    }
    
    function cities(extra = undefined) {
	var collectedCities = [];
	applyAll(function (entry) {
            var theCity = city(entry);
            if (extra === undefined || matchFilter(entry,extra)) {
                if (collectedCities.indexOf(theCity) == -1) {
		    collectedCities.push(theCity);
	        }
	    }
	});
	return(collectedCities);
    }
    
    function citiesNoFilter(extra = undefined) {
	var collectedCities = [];
	applyAllNoFilter(function (entry) {
            var theCity = city(entry);
            if (extra === undefined || matchFilter(entry,extra)) {
                if (collectedCities.indexOf(theCity) == -1) {
		    collectedCities.push(theCity);
	        }
	    }
	});
	return(collectedCities);
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
    
    //
    // Mapping through the database in various ways -------------------------------------------
    //
    
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

    function getNamedItems(name) {
        if (table[name] === undefined)
            return([]);
        else
            return(table[name]);
    }

    //
    // Methods to create filters --------------------------------------------------------------
    //
    
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
        case 0:
            return(filterTrue());
        case 1:
            return(seq[0]);
        default:
            if (anyIsFalse(seq))
                return(filterFalse());
            else if (seq.length == 2 &&
                     seq[0].op === "true")
                return(seq[1]);
            else if (seq.length == 2 &&
                     seq[1].op === "true")
                return(seq[0]);
            else
                return({ op: "and", conds: seq});
        }
    }

    function filterOr(seq) {
        if (!isarray(seq))
            throw ("Filter or needs a list argument");
        switch (seq.length) {
        case 0:
            return(filterFalse());
        case 1:
            return(seq[0]);
        default:
            if (anyIsTrue(seq))
                return(filterTrue());
            else if (seq.length == 2 &&
                     seq[0].op === "false")
                return(seq[1]);
            else if (seq.length == 2 &&
                     seq[1].op === "false")
                return(seq[0]);
            else
                return({ op: "or", conds: seq});
        }
    }
    
    function filterNot(filt) {
        if (filt.op === "true") return(filterFalse());
        else if (filt.op === "false") return(filterTrue());
        else if (filt.op === "not") return(filt.conds);
        else return({ op: "not", conds: filt});
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
    
    function filterMatchNotSubActivities(activity,subactivities) {
        if (!isarray(subactivities))
            throw ("Filter not subactivities needs a list argument");
        return(filterNot(filterMatchSubActivities(activity,subactivities)));
    }
    
    function filterMatchSource(source) {
	return({ op: "sourceMatch", param1: source});
    }
    
    function filterMatchMap(needsMap) {
	return({ op: "mapMatch", param1: needsMap});
    }
    
    function filterMatchArticle(needsArticle) {
	return({ op: "articleMatch", param1: needsArticle});
    }
    
    function filterCaveSize(limitType,value) {
        switch (limitType) {
        case "min": return({ op: "minCaveSize", param1: value});
        case "max": return({ op: "maxCaveSize", param1: value});
        default: throw ("Bad limit type " + limitType);
        }
    }

    //
    // Filter setting and other management ----------------------------------------------------
    //
    
    function setFilter(newFilter) {
	filter = newFilter;
    }
    
    function getFilter()  {
	return(filter);
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
	case "articleMatch":
	    if (condition.param1)
                return("article");
            else
                return("noarticle");
	case "minCaveSize":
            return("cavesize>=" + condition.param1.toString());
	case "maxCaveSize":
            return("cavesize<" + condition.param1.toString());
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
	case "not":
            {
	        var result = "not ";
                result += filterToString(condition.conds);
	        return(result);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }
    
    //
    // Asking data about filters --------------------------------------------------------------
    //
    
    function getFilterCities() {
	return(getFilterCitiesAux(filter));
    }

    function getFilterCountries() {
	return(getFilterCountriesAux(filter));
    }

    function getFilterCaveSizes() {
	return(getFilterCaveSizesAux(filter));
    }
    
    function getFilterActivities()  {
	return(getFilterActivitiesAux(filter));
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
	case "articleMatch":
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
        case "not":
            {
	        var result = cities();
		var subresult = listSubstraction(result,getFilterCitiesAux(condition.conds));
	        return(subresult);
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }
    
    function getFilterCountriesAux(condition) {
        switch(condition.op) {
        case "true":
            return(countries());
        case "false":
            return([]);
        case "cityMatch":
            return(countries());
	case "countryMatch":
	    return([condition.param1]);
	case "continentMatch":
	    return(countries());
	case "withMatch":
	    return(countries());
	case "sourceMatch":
	    return(countries());
	case "mapMatch":
	    return(countries());
	case "articleMatch":
	    return(countries());
	case "minCaveSize":
	    return(countries());
	case "maxCaveSize":
	    return(countries());
	case "activityMatch":
	    return(countries());
	case "subactivityMatch":
	    return(countries());
	case "and":
            {
	        var result = countries();
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listIntersection(result,getFilterCountriesAux(condition.conds[i]));
	        }
	        return(result);
            }
	case "or":
            {
	        var result = [];
	        var i;
	        for (i = 0; i < condition.conds.length; i++) {
		    result = listUnion(result,getFilterCountriesAux(condition.conds[i]));
	        }
	        return(result);
            }
        case "not":
            {
	        var result = cities();
		var subresult = listSubstraction(result,getFilterCountriesAux(condition.conds));
	        return(subresult);
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
	case "articleMatch":
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
	case "not":
	    return(caveSizeReverse(getFilterCaveSizesAux(condition.conds)));
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
	case "articleMatch":
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
	case "not":
            {
	        var result = lib.getActivityList();
		return(listSubstraction(result,getFilterActivitiesAux(condition.conds)));
            }
	case undefined:
	    throw ("Bad Filter structure: " + condition.toString());
	default:
	    throw ("Bad Filter opcode: " + condition.op.toString());
	}
    }

    //
    // Matching filters -----------------------------------------------------------------------
    //
    
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
	case "articleMatch":
	    return(condition.param1 === false ||
                   (hasItemReadingListUrl(entry)));
	case "minCaveSize":
            //debug("minCaveSize check for entry " + entry.n + " with filter " + filterToString(condition));
            if (entry.l !== undefined) {
                //debug("case length " + entry.l.toString());
                //debug("will return " + (entry.l >= condition.param1) ? "true" : "false");
                return(entry.l >= condition.param1);
            }
            if (entry.lc !== undefined) {
                var min = getItemLengthCategoryMin(entry);
                //debug("case length category " + entry.lc +
                //" min " + JSON.stringify(min) +
                //" max " + JSON.stringify(getItemLengthCategoryMax(entry)) +
                //" testing for " + condition.param1 +
                //" result will be " + JSON.stringify(min >= condition.param1));
                if (min === undefined) return(false);
                else if (min >= condition.param1) return(true);
                else return(false);
            }
            if (!warnedAboutCaveLengthFiltering) {
                warn("cannot filter based on cave lengths for cave " + entry.n + " that has no length");
                warnedAboutCaveLengthFiltering = true;
            }
            return(false);
	case "maxCaveSize":
            //debug("maxCaveSize check for entry " + entry.n + " with filter " + filterToString(condition));
            if (entry.l !== undefined) {
                //debug("case length " + entry.l.toString());
                //debug("will return " + (entry.l < condition.param1) ? "true" : "false");
                return(entry.l < condition.param1);
            }
            if (entry.lc !== undefined) {
                var max = getItemLengthCategoryMax(entry);
                //debug("case length category " + entry.lc +
                //" min " + JSON.stringify(getItemLengthCategoryMin(entry)) +
                //" max " + JSON.stringify(max) +
                //" testing for " + condition.param1 +
                //" result will be " + JSON.stringify(max <= condition.param1));
                if (max === undefined) return(false);
                else if (max <= condition.param1) return(true);
                else return(false);
            }
            if (!warnedAboutCaveLengthFiltering) {
                warn("cannot filter based on cave lengths for cave " + entry.n + " that has no length");
                warnedAboutCaveLengthFiltering = true;
            }
            return(false);
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
	case "not":
	    return(!matchFilter(entry,condition.conds));
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
    
    //
    // Basic queries for an entry -------------------------------------------------------------
    //
    
    function country(entry) {
	return(entry.c);
    }
    
    function city(entry) {
        return(entry.k);
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

    function getItemName(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.n);
    }

    function getItemAlternativeNames(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.an === undefined) {
            return([]);
        } else {
            return(item.an);
        }
    }
    
    function getItemDescription(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.d);
    }

    function getItemDescriptionLang(item,lang) {
        if (!isString(lang)) throw ("Language is not a string");
        if (lang.length != 2) throw ("Language is not a string of 2 characters");
        if (!isitem(item)) throw ("Not a dataset item");
        var candidate = item.d;
        if (candidate === undefined) return(undefined);
        if (isString(candidate)) return(candidate);
        candidate = item.d[lang];
        if (candidate !== undefined)
            return(candidate);
        candidate = item.d.en;
        if (candidate !== undefined)
            return(candidate);
        return(undefined);
    }
    
    function getItemLat(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.lat);
    }
    
    function getItemLon(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.lon);
    }
    
    function getItemAlternativeCoordinates(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.ac === undefined) return([]);
        else return(item.ac);
    }
    
    function getItemMap(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.m);
    }
    
    function getItemAlternativeMaps(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.am === undefined) return([]);
        else return(item.am);
    }
    
    function getItemLength(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.l);
    }

    function getItemLengthCategory(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.lc);
    }

    function getItemLengthCategoryMin(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var pos;
        if (item.lc === undefined) {
            return(undefined);
        } else if (item.lc.substring(0,1) === "<") {
            return(0);
        } else if (item.lc.substring(0,1) === ">") {
            return(parseFloat(item.lc.substring(1)));
        } else if ((pos = item.lc.search("><")) != -1) {
            return(parseFloat(item.lc.substring(0,pos)));
        } else {
            if (!warnedAboutMalformedCategory) {
                warn("cave length category " + item.lc + " is invalid");
                warnedAboutMalformedCategory = true;
            }
            return(undefined);
        }
    }

    function getItemLengthCategoryMax(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var pos;
        if (item.lc === undefined) {
            return(undefined);
        } else if (item.lc.substring(0,1) === "<") {
            return(parseFloat(item.lc.substring(1)));
        } else if (item.lc.substring(0,1) === ">") {
            return(undefined);
        } else if ((pos = item.lc.search("><")) != -1) {
            return(parseFloat(item.lc.substring(pos+2)));
        } else {
            if (!warnedAboutMalformedCategory) {
                warn("cave length category " + item.lc + " is invalid");
                warnedAboutMalformedCategory = true;
            }
            return(undefined);
        }
    }

    function getItemAlt(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.alt);
    }

    function getItemFuzzy(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.fz !== undefined && item.fz === true);
    }

    function getItemActivities(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var result = [];
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                if (!result.includes(rli.a[i])) {
                    result.push(rli.a[i]);
                }
            }
        }
        return(result);
    }
    
    function getItemSubActivities(item,activity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isString(activity)) throw ("Activity is not a string");
        var result = [];
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (a === activity) {
                    var sa = rli.sa[i];
                    for (var k = 0; k < sa.length; k++) {
                        var sub = sa[k];
                        if (!result.includes(sub)) {
                            result.push(sub);
                        }
                    }
                }
            }
        }
        return(result);
    }
    
    function getItemSubActivitiesWithPrefix(item,activity,prefix) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isString(activity)) throw ("Activity is not a string");
        var allSubs = getItemSubActivities(item,activity);
        var result = [];
        for (var i = 0;  i < allSubs.length; i++) {
            var sub = allSubs[i];
            if (!result.includes(sub) &&
                sub.length >= prefix.length &&
                sub.substring(0,prefix.length) === prefix) {
                result.push(sub);
            }
        }
        return(result);
    }
    
    function getItemSubActivitiesWithinSet(item,activity,set) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isString(activity)) throw ("Activity is not a string");
        var allSubs = getItemSubActivities(item,activity);
        var result = [];
        for (var i = 0;  i < allSubs.length; i++) {
            var sub = allSubs[i];
            if (!result.includes(sub) &&
                set.includes(sub)) {
                result.push(sub);
            }
        }
        return(result);
    }
    
    function getItemLengthAccuracy(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.l === undefined) {
            return("approx");
        } else if (item.la === undefined) {
            return("approx");
        } else {
            return(item.la);
        }
    }

    function getItemReadingList(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.rl === undefined) return([]);
        else return(item.rl);
    }
    
    function hasItemReadingListUrl(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
	    if (getReadingListItemURL(lis[i]) !== undefined) {
	        return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListImageUrl(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
	    if (getReadingListItemImageURL(lis[i]) !== undefined) {
	        return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListPublication(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
	    if (getReadingListItemPublication(lis[i]) !== undefined) {
	        return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListPublicationUrl(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
	    if (getReadingListItemPublicationUrl(lis[i]) !== undefined) {
	        return(true);
            }
        }
        return(false);
    }
    
    function getItemSource(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.s);
    }

    function addItemRelationship(item,type,name) {
        //debug("addItemRelationship " + item.n + " " + type + " " + name);
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.rt === undefined) item.rt = [];
        if (item.rn === undefined) item.rn = [];
        item.rt.push(type);
        item.rn.push(name);
    }
    
    function getItemRelationshipTypes(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.rt === undefined || item.rn === undefined) return([]);
        else return(item.rt);
    }

    function getItemRelationshipTargets(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.rt === undefined || item.rn === undefined) return([]);
        else return(item.rn);
    }

    function isItemSideCave(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var list = getItemRelationshipTypes(item);
        var i;
        for (i = 0; i < list.length; i++) {
            var relation = list[i];
            if (relation == "sidecaveof") return(true);
        }
        return(false);
    }
    
    function isItemSecondary(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var list = getItemRelationshipTypes(item);
        var i;
        for (i = 0; i < list.length; i++) {
            var relation = list[i];
            if (relation == "secondaryto") return(true);
        }
        return(false);
    }

    function getItemMainCave(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var list1 = getItemRelationshipTypes(item);
        var list2 = getItemRelationshipTargets(item);
        if (list1.length != list2.length) throw("relationship list lengths mismatch");
        var result = [];
        var i;
        for (i = 0; i < list1.length; i++) {
            var relation = list1[i];
            if (relation == "sidecaveof") {
                return(list2[i]);
            }
        }
        return(undefined);
    }
    
    function hasItemMainCave(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(getItemMainCave(item) !== undefined);
    }
    
    function getItemSideCaves(item)  {
        if (!isitem(item)) throw ("Not a dataset item");
        var list1 = getItemRelationshipTypes(item);
        var list2 = getItemRelationshipTargets(item);
        if (list1.length != list2.length) throw("relationship list lengths mismatch");
        var result = [];
        var i;
        for (i = 0; i < list1.length; i++) {
            var relation = list1[i];
            if (relation == "sidecave") {
                var target = list2[i];
                result.push(target);
            }
        }
        return(result);
    }
    
    function hasItemSideCaves(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(getItemSideCaves(item).length > 0);
    }
    
    function getReadingListItemTitle(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemTitle");
        return(article.t);
    }

    function getReadingListItemURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemURL");
        return(article.u);
    }

    function getReadingListItemImageURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemImageURL");
        return(article.i);
    }

    function getReadingListItemPublicationURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemPublicationURL");
        return(article.pu);
    }

    function getReadingListItemYear(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemYear");
        return(article.y);
    }

    function getReadingListItemMonth(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemMonth");
        return(article.m);
    }

    function getReadingListItemWith(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemWith");
        if (article.w === undefined)
            return([]);
        else
            return(article.w);
    }
    
    function getReadingListItemPublication(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemPublication");
        return(article.p);
    }

    //
    // Item descriptions ----------------------------------------------------------------------
    //

    function descriptionTitle(lang,text,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        return(useHtml ? lib.htmlParagraph(lib.htmlBold(text)) : (text.toUpperCase() + "\n\n"));
    }
    
    function descriptionImage(lang,url,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (useHtml) {
            if (conserveSpace) {
                return(lib.htmlImage(url,'width="120"'));
            } else {
                return(lib.htmlImage(url,'width="140"'));
            }
        } else {
            return("");
        }
    }

    function descriptionText(lang,text,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (text.length == 0) return("");
        if (useHtml) {
            return(lib.htmlParagraph(text));
        } else {
            return(text + "\n\n");
        }
    }

    function descriptionTextLine(lang,text,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        return(text + (useHtml ? lib.htmlBreak() : "\n"));
    }

    function descriptionTextAndLink(lang,text,link,url,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (useHtml) {
            return(text + lib.htmlLink(link,url,true));
        } else {
            return(text + link + " (" + url + ")");
        }
    }

    function descriptionTextAndLinkAndText(lang,text1,link,url,text2,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (useHtml) {
            return(text1 + lib.htmlLink(link,url,true) + text2);
        } else {
            return(text1 + link + " " + url + " " + text2);
        }
    }

    function descriptionCoordinates(lang,lat,lon,includetext,useHtml,conserveSpace) {
        var textHeader = includetext ? (lang.capitalize(lang.coordinatesText()) + ": ") : "";
        var textCoords = "";
        const n = 5;
        if (lat < 0) {
            textCoords += "S " + ((-lat).toFixed(n));
        } else {
            textCoords += "N " + ((lat).toFixed(n));
        }
        textCoords += " ";
        if (lon < 0) {
            textCoords += "W " + ((-lon).toFixed(n));
        } else {
            textCoords += "E " + ((lon).toFixed(n));
        }
        var urlCoords = "http://www.google.com/maps/place/" + String(lat) + "," + String(lon);
        var text = descriptionTextAndLink(lang,textHeader,textCoords,urlCoords,useHtml,conserveSpace);
        return(text);
    }

    function findImageUrl(item,rl) {
        if (!isitem(item)) throw ("Not a dataset item");
        for (var i = 0; i < rl.length; i++) {
	    if (getReadingListItemImageURL(rl[i]) !== undefined) {
	        return(getReadingListItemImageURL(rl[i]));
            }
        }
        return(undefined);
    }

    function rockTypeText(lang,prefix,list) {
        if (!islang(lang)) throw ("Not a language object");
        var text = lang.capitalize(lang.rockTypeText() + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += "/";
            var unprocessed = list[i].substring(prefix.length).toLowerCase();
            var translated = lang.rockTypeValueText(unprocessed);
            text += lang.capitalize(translated);
        }
        return(text);
    }

    function morphologyText(lang,prefix,list) {
        if (!islang(lang)) throw ("Not a language object");
        var text = lang.capitalize(lang.morphologyText() + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += "/";
            var unprocessed = list[i].substring(prefix.length).toLowerCase();
            var translated = lang.morphologyValueText(unprocessed);
            text += lang.capitalize(translated);
        }
        return(text);
    }

    function activityText(lang,list) {
        if (!islang(lang)) throw ("Not a language object");
        var text = lang.capitalize(lang.activityText() + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += ", ";
            var unprocessed = list[i].toLowerCase();
            var translated = lang.cavingActivityValueText(unprocessed);
            text += lang.capitalize(translated);
        }
        return(text);
    }

    function itemDescriptionAuxRLItemAuthorsInitials(name) {
        var spaceIndex = name.indexOf(" ");
        if (name.length <= 3 || spaceIndex < 1 || spaceIndex + 1 == name.length) return("NN");
        var firstname = name[0].toUpperCase();
        var lastname = name[spaceIndex+1].toUpperCase();
        return(firstname + lastname);
    }

    function itemDescriptionAuxRLItemAuthors(lang,rli) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isreadinglistitem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItemAuthors");
        var auth = getReadingListItemWith(rli);
        if (auth.length == 0) return("");
        else if (auth.length == 1)
            return(itemDescriptionAuxRLItemAuthorsInitials(auth[0]));
        else if (auth.length == 2)
            return(itemDescriptionAuxRLItemAuthorsInitials(auth[0]) +
                   "&" +
                   itemDescriptionAuxRLItemAuthorsInitials(auth[1]));
        else if (auth.length == 3)
            return(itemDescriptionAuxRLItemAuthorsInitials(auth[0]) +
                   "," +
                   itemDescriptionAuxRLItemAuthorsInitials(auth[1]) +
                   "&" +
                   itemDescriptionAuxRLItemAuthorsInitials(auth[2]));
        else
            return(itemDescriptionAuxRLItemAuthorsInitials(auth[0]) +
                   "," +
                   itemDescriptionAuxRLItemAuthorsInitials(auth[1]) +
                   "," +
                   itemDescriptionAuxRLItemAuthorsInitials(auth[2]) +
                   "...");
    }
    
    function itemDescriptionAuxRLItemAuthorsAndYear(lang,rli,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isreadinglistitem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItemAuthorsAndYear");
        if (conserveSpace) return("");
        var authpart = itemDescriptionAuxRLItemAuthors(lang,rli);
        if (getReadingListItemYear(rli) === undefined) {
            if (authpart === "") return("");
            else return(" (" + authpart + ")");
        } else {
            var year = getReadingListItemYear(rli).toString();
            if (year.length == 4) {
                var shortyear = "'" + year.substring(2);
                if (authpart !== "") authpart += " ";
                return(" (" + authpart + shortyear + ")");
            }
        }
    }
    
    function itemDescriptionAuxRLItem(lang,item,rli,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isreadinglistitem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItem");
        var authorsandyear = itemDescriptionAuxRLItemAuthorsAndYear(lang,rli,conserveSpace);
        if (getReadingListItemURL(rli) !== undefined) {
            return(descriptionTextAndLinkAndText(lang,
                                                 lang.capitalize(lang.articleText()) + ": ",
                                                 getReadingListItemTitle(rli),
                                                 getReadingListItemURL(rli),
                                                 authorsandyear,
                                                 useHtml,
                                                 conserveSpace));
        } else if (getReadingListItemPublication(rli) !== undefined) {
            if (getReadingListItemPublicationURL(rli) !== undefined) {
                return(descriptionTextAndLinkAndText(lang,
                                                     lang.capitalize(lang.publicationText()) + ": ",
                                                     getReadingListItemPublication(rli),
                                                     getReadingListItemPublicationURL(rli),
                                                     authorsandyear,
                                                     useHtml,
                                                     conserveSpace));
            } else {
                return(descriptionText(lang,
                                       lang.capitalize(lang.publicationText()) + ": ",
                                       getReadingListItemPublication(rli) + authorsandyear,
                                       useHtml,
                                       conserveSpace));
            }
        } else {
            return("");
        }
    }

    function itemDescriptionTextActivities(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var movementtypes = ["Basic","SRT","Swimming","Boating","Diving","Digging","Skiing"];
        var otheractivitytypes = ["Surveying","Researching","Training","Studying"];
        var movements = getItemSubActivitiesWithinSet(item,"Caving",movementtypes);
        var otheractivities = getItemSubActivitiesWithinSet(item,"Caving",otheractivitytypes);
        var movementissimple = (movements.length == 0 || (movements.length == 1 && movements[0] === "Basic"));
        var otheractivitiesissimple = (otheractivities.length == 0);
        if (movementissimple && otheractivitiesissimple) {
            return("");
        } else {
            var allactivities = movements.concat(otheractivities);
            var descr = activityText(lang,allactivities);
            return(descriptionText(lang,descr,useHtml,conserveSpace));
        }
    }

    function itemDescriptionTextMainCave(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        if (conserveSpace) return("");
        if (hasItemMainCave(item)) {
            return(descriptionText(lang,
                                   lang.capitalize(lang.mainCaveText() + ": ") +
                                   getItemMainCave(item),
                                   useHtml,
                                   conserveSpace));
        } else {
            return("");
        }
    }

    function itemDescriptionTextSideCaves(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var htmlInside = "";
        var sidecaves =  getItemSideCaves(item);
        if (conserveSpace) {
            switch (sidecaves.length) {
            case 0:
                return("");
            case 1:
                return("1 " + lang.capitalize(lang.sideCaveText()));
            default:
                return(sidecaves.length.toString() + " " + lang.capitalize(lang.sideCavesText()));
            }
        } else {
            for (var i = 0; i < sidecaves.length; i++) {
                var sidecave = sidecaves[i];
                var thisHtml = lang.capitalize(lang.sideCaveText());
                thisHtml += ": ";
                thisHtml += sidecave;
                if (i+1 < sidecaves.length) thisHtml = descriptionTextLine(lang,thisHtml,useHtml,conserveSpace);
                htmlInside += thisHtml;
            }
            if (htmlInside.length > 0) {
                return(descriptionText(lang,
                                       htmlInside,
                                       useHtml,
                                       conserveSpace));
            } else {
                return("");
            }
        }
    }
    
    function itemDescriptionAlternativeNames(lang,item,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var an = getItemAlternativeNames(item);
        if (!conserveSpace && an.length > 0) {
            return(". " +
                   lang.capitalize(lang.alternativeNamesText()) +
                   ": " +
                   lang.listToText(an));
        } else {
            return("");
        }
    }

    function itemDescriptionAlternativeMaps(lang,item) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var result = "";
        var am = getItemAlternativeMaps(item);
        for (var i = 0; i < am.length; i++) {
            var cavemap = am[i];
            result += lib.htmlBreak();
            result += descriptionTextAndLink(lang,
                                             lang.capitalize(lang.caveMapText() + ": "),
                                             lang.mapText(),
                                             cavemap,
                                             useHtml,
                                             conserveSpace);
        }
        return(result);
    }

    function itemDescriptionAlternativeCoordinates(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var ac = getItemAlternativeCoordinates(item);
        if (ac.length == 0 || conserveSpace) {
            return("");
        }
        
        var result = "";
        result += " (";
        result += lang.capitalize(getItemSource(item));
        result += "). ";
        result += lang.capitalize(lang.alternativeCoordinatesText());
        result += ": ";

        for (var i = 0; i < ac.length; i++) {
            var coord = ac[i];
            if (i > 0) result += ", ";
            result += descriptionCoordinates(lang,
                                             coord.lat,
                                             coord.lon,
                                             false,
                                             useHtml,
                                             conserveSpace);
            result += " (";
            
            if (coord.s !== undefined) {
                result += coord.s.toUpperCase();
                result += ", ";
            }
            var distance = lib.coordinatesDistance(getItemLat(item),
                                                   getItemLon(item),
                                                   coord.lat,
                                                   coord.lon);
            result += distance.toFixed(0);
            result += "m ";
            result += lang.offText();
            result += ")";
            
        }
        result += ".";
        return(result);
    }

    function describeItem(lang,item,useHtml = true,conserveSpace = false) {
        if (!islang(lang)) throw ("Not a language object");
        if (!isitem(item)) throw ("Not a dataset item");
        var rl = getItemReadingList(item);
        var html = "";
        html +=  descriptionTitle(lang,getItemName(item),useHtml,conserveSpace);
        if (hasItemReadingListImageUrl(item)) {
            var imageUrl = findImageUrl(item,rl);
            html +=  descriptionImage(lang,imageUrl,useHtml,conserveSpace);
        }
        var descr = getItemDescriptionLang(item,lang.getLanguage());
        if (descr != undefined) {
            html += descriptionText(lang,descr,useHtml,conserveSpace);
        }
        if (getItemFuzzy(item)) {
            html += descriptionText(lang,
                                    lang.capitalize(lang.locationSecretText()),
                                    useHtml,
                                    conserveSpace);
        } else {
            var coordstext = descriptionCoordinates(lang,
                                                    getItemLat(item),
                                                    getItemLon(item),
                                                    true,
                                                    useHtml,
                                                    conserveSpace);
            coordstext += itemDescriptionAlternativeCoordinates(lang,item,useHtml,conserveSpace);
            html += (useHtml ? lib.htmlParagraph(coordstext) : (coordstext + "\n\n"));
        }
        var cavemap = getItemMap(item);
        if (cavemap !== undefined) {
            var maptext = "";
            maptext += descriptionTextAndLink(lang,
                                              lang.capitalize(lang.caveMapText() + ": "),
                                              lang.mapText(),
                                              cavemap,
                                              useHtml,
                                              conserveSpace);
            maptext += itemDescriptionAlternativeMaps(lang,item);
            html += maptext;
        }
        var rocktypeprefix = "Rock-";
        var morphologyprefix = "Morphology-";
        var rocktype = getItemSubActivitiesWithPrefix(item,"Caving",rocktypeprefix);
        var morphology = getItemSubActivitiesWithPrefix(item,"Caving",morphologyprefix);
        if (getItemLength(item) !== undefined) {
            var lengthtext = getItemLength(item).toString() + "m"
            if (getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
            if (rocktype.length > 0) {
                lengthtext += ". " + rockTypeText(lang,rocktypeprefix,rocktype);
            }
            if (morphology.length > 0) {
                lengthtext += ". " + morphologyText(lang,morphologyprefix,morphology);
            }
            lengthtext += itemDescriptionAlternativeNames(lang,item,conserveSpace);
            html += descriptionText(lang,
                                    lang.capitalize(lang.lengthText()) +
                                    ": " +
                                    lengthtext,
                                    useHtml,
                                    conserveSpace);
        } else if (getItemLengthCategory(item) !== undefined) {
            var lengthtext = "";
            if (getItemLengthCategoryMin(item) !== undefined &&
                getItemLengthCategoryMax(item) !== undefined) {
                lengthtext += getItemLengthCategoryMin(item).toString() + "-";
                lengthtext += getItemLengthCategoryMax(item).toString() + " m";
            } else if (getItemLengthCategoryMin(item) === undefined) {
                lengthtext += "-" + getItemLengthCategoryMax(item).toString() + " m";
            } else {
                lengthtext += getItemLengthCategoryMin(item).toString() + "- m";
            }
            if (rocktype.length > 0) {
                lengthtext += ". " + rockTypeText(lang,rocktypeprefix,rocktype);
            }
            if (morphology.length > 0) {
                lengthtext += ". " + morphologyText(lang,morphologyprefix,morphology);
            }
            lengthtext += itemDescriptionAlternativeNames(lang,item,conserveSpace);
            html += descriptionText(lang,
                                    lang.capitalize(lang.lengthCategoryText()) +
                                    ": " +
                                    lengthtext,
                                    useHtml,
                                    conserveSpace);
        } else if (rocktype.length > 0 || morphology.length) {
            var typetext = "";
            if (rocktype.length > 0) {
                typetext += rockTypeText(lang,rocktypeprefix,rocktype);
            }
            if (morphology.length > 0) {
                if (typetext.length > 0) typetext += ". ";
                typetext += morphologyText(lang,morphologyprefix,morphology);
            }
            typetext += itemDescriptionAlternativeNames(lang,item);
            html += descriptionText(lang,
                                    typetext,
                                    useHtml,
                                    conserveSpace);
        }
        html += itemDescriptionTextActivities(lang,item,useHtml,conserveSpace);
        var htmlinside = "";
        for (var i = 0; i < rl.length; i++) {
            var thishtml = itemDescriptionAuxRLItem(lang,item,rl[i],useHtml,conserveSpace);
            if (i+1 < rl.length) thishtml = descriptionTextLine(lang,thishtml,useHtml,conserveSpace);
            htmlinside += thishtml;
        }
        html += descriptionText(lang,htmlinside,useHtml,conserveSpace);
        html += itemDescriptionTextMainCave(lang,item,useHtml,conserveSpace);
        html += itemDescriptionTextSideCaves(lang,item,useHtml,conserveSpace);
        return(html);
    }

    //
    // Return the object ----------------------------------------------------------------------
    //
    
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
	countriesNoFilter: countriesNoFilter,
        cities: cities,
        citiesNoFilter: citiesNoFilter,
        continentPlaceCount: continentPlaceCount,
        countryPlaceCount: countryPlaceCount,
        cityPlaceCount: cityPlaceCount,
	continent: continent,
	country: country,
        city: city,
	dominantActivity: dominantActivity,
	filterAnd: filterAnd,
	filterOr: filterOr,
        filterNot: filterNot,
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
	filterMatchNotSubActivities: filterMatchNotSubActivities,
        filterMatchMap: filterMatchMap,
        filterMatchArticle: filterMatchArticle,
        filterCaveSize: filterCaveSize,
	filterTrue: filterTrue,
	getFilter: getFilter,
	getFilterCities: getFilterCities,
	getFilterCountries: getFilterCountries,
	getFilterActivities: getFilterActivities,
        getFilterCaveSizes: getFilterCaveSizes,
        filterToString: filterToString,
	matchFilter: matchFilter,
        getNamedItems: getNamedItems,
        getItemName: getItemName,
        getItemAlternativeNames: getItemAlternativeNames,
        getItemDescription: getItemDescription,
        getItemDescriptionLang: getItemDescriptionLang,
        getItemLat: getItemLat,
        getItemLon: getItemLon,
        getItemAlternativeCoordinates: getItemAlternativeCoordinates,
        getItemMap: getItemMap,
        getItemAlternativeMaps: getItemAlternativeMaps,
        getItemLength: getItemLength,
        getItemLengthCategory: getItemLengthCategory,
        getItemLengthCategoryMin: getItemLengthCategoryMin,
        getItemLengthCategoryMax: getItemLengthCategoryMax,
        getItemLengthAccuracy: getItemLengthAccuracy,
        getItemAlt: getItemAlt,
        getItemFuzzy: getItemFuzzy,
        getItemActivities: getItemActivities,
        getItemSubActivities: getItemSubActivities,
        getItemSubActivitiesWithPrefix: getItemSubActivitiesWithPrefix,
        getItemSubActivitiesWithinSet: getItemSubActivitiesWithinSet,
        getItemSource: getItemSource,
        getItemRelationshipTypes: getItemRelationshipTypes,
        getItemRelationshipTargets: getItemRelationshipTargets,
        getItemMainCave: getItemMainCave,
        getItemSideCaves: getItemSideCaves,
        hasItemMainCave: hasItemMainCave,
        hasItemSideCaves: hasItemSideCaves,
        hasItemReadingListUrl: hasItemReadingListUrl,
        hasItemReadingListImageUrl: hasItemReadingListImageUrl,
        hasItemReadingListPublication: hasItemReadingListPublication,
        hasItemReadingListPublicationUrl: hasItemReadingListPublicationUrl,
        isItemSideCave: isItemSideCave,
        isItemSecondary: isItemSecondary,
        getItemReadingList: getItemReadingList,
        getReadingListItemTitle: getReadingListItemTitle,
        getReadingListItemYear: getReadingListItemYear,
        getReadingListItemMonth: getReadingListItemMonth,
        getReadingListItemPublication: getReadingListItemPublication,
        getReadingListItemURL: getReadingListItemURL,
        getReadingListItemImageURL: getReadingListItemImageURL,
        getReadingListItemPublicationURL: getReadingListItemPublicationURL,
        getReadingListItemWith: getReadingListItemWith,
        describeItem: describeItem,
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
