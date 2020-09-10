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
    var warnedAboutVideoUrl = false;
    var warnedAboutPublication = false;
    var warnedAboutM = false;
    var warnedAboutDescription = false;
    var warnedAboutCity = false;
    var warnedAboutInvalidDatasetItemType = false;
    var warnedAboutGeoJSONDatasetInvalidType = false;
    var warnedAboutDatasetInvalidType = false;
    var warnedAboutMissingName = false;
    var warnedAboutGeoJSONGeometry = false;
    var warnedAboutCaveLengthFiltering = false;
    var warnedAboutMalformedCategory = false;
    var warnedAboutInconsistentRelationships = false;
    var warnedAboutLackOfRockType = false;
    var warnedAboutLackOfMorphology = false;
    var warnedAboutLackOfWaterbody = false;
    var warnedAboutLackOfUphill = false;
    var warnedAboutBookAsArticle = false;
    var warnedAboutNepperi = false;
    var warnedAboutFailingUrl = false;
    var warnedAboutDescriptionInName = false;
    var warnedAboutInvalidCaveClassificationLetter = false;
    
    //
    // Some configuration settings ------------------------------------------------------------
    //

    const needToCheckForDuplicates = false;
    const needToProvideSubsumeNotices = false;

    const kmDigits = 1;
    const coordinateDigits = 5;

    const publicationNamesToShorten = [
        { pattern: /Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1/,
          shorter: "Suomen luolat. Kesäläinen et al. Salakirjat" }
    ];
    
    var bookNames = ["Suomen luolat"];
    var bookUrls = ["https://www.salakirjat.net/product/242/suomen-luolat"];
    var bookAuthors = ["Aimo Kejonen"];
    
    var possiblyInaccurateCoordinateBookUrls = bookUrls;
    var possiblyInaccurateCoordinateBookAuthors = bookAuthors;
    
    var knownFailingUrls = ["https://web.archive.org/web/20051201053118/http://img.groundspeak.com/cache/1203_000.gif"];

    //
    // Finnish cave classification system, as described in https://luolaseura.fi/luolakanta/luokittelu-fi.html
    //
    
    const finnishCaveTypes = [

        //
        // Ones from the literature
        //
        
        {
            letter: "A",        // no volcanic rock (surface) and no sediment, hence "granite"
            classification: ["Rock","Rock-Granite", "Morphology-Crystallization"]
        },
        {
            letter: "B",
            classification: ["Rock","Morphology-Crack"]
        },
        {
            letter: "C",        // could be limestone, could be gypsum karst too
            classification: ["Rock","Rock-Limestone","Morphology-Karst"]
        },
        {
            letter: "D1",
            classification: ["Rock","Morphology-Weathering"]
        },
        {
            letter: "D2",
            classification: ["Rock","Morphology-Weathering"]
        },
        {
            letter: "D3",
            classification: ["Rock","Morphology-Weathering"]
        },
        {
            letter: "E",
            classification: ["Rock","Morphology-Crack"]
        },
        {
            letter: "F",
            classification: ["Rock","Morphology-Boulders"]
        },
        {
            letter: "G",
            classification: ["Other-Material","Morphology-Other"]
        },
        {
            letter: "H",
            classification: ["Rock","Morphology-Erosion"]
        },
        {
            letter: "I",        // maan tai vuorenvieremä = boulders, entä maanvieremä?
            classification: ["Morphology-Other"]       // Rock, Boulders
        },
        {
            letter: "J",
            classification: ["Rock","Morphology-Erosion"]
        },
        {
            letter: "K",
            classification: ["Rock","Morphology-Erosion"]
        },
        {
            letter: "L",        // rock cave but with ice inside, lets highlight this
            classification: ["Ice"]
        },
        {
            letter: "M",        // glacier cave
            classification: ["Ice"]
        },
        {
            letter: "N",        // neotectonic boulder cave
            classification: ["Rock","Morphology-Boulders"]
        },

        //
        // Delimeters
        //
        
        {
            letter: ",",
            classification: []
        },
        {
            letter: " ja ",
            classification: []
        },

        //
        // Luolaseura additions
        //
        
        {
            letter: "M",
            classification: ["Ice"]
        },
        {
            letter: "N",
            classification: []
        },
        {
            letter: "O1",
            classification: ["Morphology-Organic"]
        },
        {
            letter: "O2",
            classification: ["Morphology-Organic"]
        },
        {
            letter: "O",
            classification: ["Morphology-Organic"]
        },
        {
            letter: "R",
            classification: ["Morphology-Erosion"]
        },
        {
            letter: "V11",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V12",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V1",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V21",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V22",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V23",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V24",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V2",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V31",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V3",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V41",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V4",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "Z",
            classification: []
        },

        //
        // Broken stuff
        //
            
        {
            letter: "f",
            classification: ["Rock","Morphology-Boulders"],
            warn: "Invalid use of lower-case letter in a cave class"
        }
];

    //
    // Private data ---------------------------------------------------------------------------
    //

    var langen = PsgeoLang("en");
    var langfi = PsgeoLang("fi");
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

    function notice(text) {
        if (console !== undefined) {
            console.log("NOTICE: " + text);
        }
    }

    function isboolean(obj) {
        return(obj === false || obj === true);
    }
    
    function isarray(obj)  {
        return(obj !== undefined && Array.isArray(obj));
    }
    
    function isrecord(obj) {
        return(obj !== undefined &
               (!isarray(obj)) &&
               typeof obj === "object");
    }

    function isstring(x) {
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
        if (obj.getLanguage === undefined) return(false);
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
    
    function includesAny(set1,set2) {
        //debug("includesAny("  + JSON.stringify(set1) + "," + JSON.stringify(set2));
        for (var i = 0; i < set2.length; i++) {
            if (set1.includes(set2[i])) {
                //debug("yes");
                return(true);
            }
        }
        //debug("no");
        return(false);
    }
    
    function nameMatch(name,pattern,caseSensitive) {
        if (!isstring(name)) throw ("Name needs to be a string");
        if (!isstring(pattern)) throw ("Pattern needs to be a string");
        if (!isboolean(caseSensitive)) throw ("Parameter caseSensitive needs to be a boolean");
        if (!caseSensitive) name = name.toLowerCase();
        if (name.indexOf(pattern) != -1) return(true);
        else return(false);
    }
    
    function distanceInUnits(x) {
        if (x < 2000) {
            return(x.toString() + "m");
        } else {
            return((x/1000.0).toFixed(kmDigits) + "km");
        }
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
    
    function listSubstract(list1,item) {
        var result = list1;
        var i;
        for (i = 0; i < result.length; i++) {
            if (result[i] == item) {
                result.splice(i,1);
                i--;
            }
        }
        return(result);
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

    function simplifyName(basename,othername) {
        const separator = ", ";
        var otherindex = othername.lastIndexOf(separator);
        if (otherindex <= 0) return(othername);
        var otherrest = othername.substr(otherindex);
        var baseindex = basename.lastIndexOf(separator);
        if (baseindex <= 0) return(othername);
        var baserest = basename.substr(baseindex);
        if (baserest !== otherrest) return(othername);
        else return(othername.substr(0,otherindex));
    }

    function simplifyNames(basename,othernames) {
        var result = [];
        for (var i = 0; i < othernames.length; i++) {
            result.push(simplifyName(basename,othernames[i]));
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

        if (article.v !== undefined && article.v === "") {
            if (!warnedAboutVideoUrl) {
                warn("Dataset item "  + place.n + " has a reading list item video URL field but it contains an empty string");
                warnedAboutVideoUrl = true;
            }
            article.v = undefined;
        }

        if (article.p !== undefined && article.p === "") {
            if (!warnedAboutPublication) {
                warn("Dataset item "  + place.n + " has a reading list item publication field but it contains an empty string");
                warnedAboutPublication = true;
            }
            article.p = undefined;
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
        
        if (place.d !==  undefined &&
            place.d === "") {
            if (!warnedAboutDescription) {
                warn("Dataset item " + place.n + " has a d field but it contains an empty string");
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

        if (place.s === undefined) {
            place.s = source;
            //debug("normalization set source to " + place.s);
        }

        //
        // See if we have cave ID in brackets
        //
        
        var id = findFinnishCaveId(place.n);
        if (id !== undefined) {
            if (warnedAboutDescriptionInName) {
                warn("Dataset item " + place.n + " has a Finnish cave identifier in its name, should be in description");
            }
            var idbrackets = "[" + id + "]";
            place.n = removeString(place.n,idbrackets);

            //
            // See if we have cave type info in braces
            //
            
            var moretexten = "";
            var moretextfi = "";
            var type = findFinnishCaveType(place.n);
            if (type !== undefined) {
                var typebraces = "{" + type + "}";
                place.n = removeString(place.n,typebraces);
                moretexten += " Cave type is " + type + ".";
                moretextfi += " Luolan tyyppi on " + type + ".";
                addFinnishCaveCategories(place,type);
            }

            //
            // See if we have other information in parenthesis
            //
            
            var lkdesc = findFinnishCaveDescription(place.n);
            if (lkdesc !== undefined) {
                var lkdescparan = "(" + lkdesc + ")";
                place.n = removeString(place.n,lkdescparan);
                var prefixen = "";
                var prefixfi = "";
                if (lib.isdigit(lkdesc[0])) {
                    prefixen = langen.getText("dimensions") + " ";
                    prefixfi = langfi.getText("dimensions") + " ";
                }
                moretexten += " " + langen.capitalize(prefixen + lkdesc) + ".";
                moretextfi += " " + langfi.capitalize(prefixfi + lkdesc) + ".";
            }
            addDescriptions(place,
                            { d: { en: langen.getText("literatureCaveId") + " " + id + "." + moretexten,
                                   fi: langfi.getText("literatureCaveId") + " " + id + "." + moretextfi },
                              s: source },
                            source);
        }

        //
        // See if we have further info in the description field that
        // may be used to fill-in extra flags in the sub-activities
        // field.
        //

        if (place.d !== undefined) {
            
            //
            // See if we have cave type info in braces
            //
            
            var type = undefined;
            if (isstring(place.d)) {
                type = findFinnishCaveType(place.d);
            } else if (place.d.en !== undefined) {
                type = findFinnishCaveType(place.d.en);
            } else if (place.d.fi !== undefined) {
                type = findFinnishCaveType(place.d.fi);
            }
            if (type !== undefined) {
                addFinnishCaveCategories(place,type);
            }
            
        }

        //
        // See if we have a cave but no rock type or morphology
        // information, in that case tag the entry with the suitable
        // "unknown" tag.
        //
        
        if (hasItemActivity(place,"Caving")) {
            var sa = getItemSubActivities(place,"Caving");
            if (sa.includes("Rock")) {
                var rockSpecifics = lib.getCavingRockTypeSubActivities(true);
                var morphologySpecifics = lib.getCavingMorphologySubActivities(true);
                if (!includesAny(sa,rockSpecifics)) {
                    if (!warnedAboutLackOfRockType) {
                        warn("Place " + place.n + " is caving in rock, but no rock type specified");
                        warnedAboutLackOfRockType = true;
                    }
                    //debug("adding rock-unknown to " + place.n);
                    addItemSubActivity(place,"Caving","Rock-Unknown");
                }
                if (!includesAny(sa,morphologySpecifics)) {
                    if (!warnedAboutLackOfMorphology) {
                        warn("Place " + place.n + " is caving in rock, but no cave type has been specified");
                        warnedAboutLackOfMorphology = true;
                    }
                    //debug("adding morphology-unknown to " + place.n);
                    addItemSubActivity(place,"Caving","Morphology-Unknown");
                }
            }
        }
        
        //
        // See if we have a swimming spot but no waterbody type
        // information, in that case tag the entry with the suitable
        // "unknown" tag.
        //
        
        if (hasItemActivity(place,"Swimming")) {
            var sa = getItemSubActivities(place,"Swimming");
            if (sa.includes("Water")) {
                var waterbodySpecifics = lib.getSwimmingWaterbodySubActivities(true);
                if (!includesAny(sa,waterbodySpecifics)) {
                    if (!warnedAboutLackOfWaterbody) {
                        warn("Place " + place.n + " is swimming in water, but no waterbody type specified");
                        warnedAboutLackOfWaterbody = true;
                    }
                    addItemSubActivity(place,"Swimming","Waterbody-Unknown");
                }
            }
        }
        
        //
        // See if we have a skiing/snowboarding/sliding spot but no
        // uphill method information, in that case tag the entry with
        // the suitable "unknown" tag.
        //
        
        if (hasItemActivity(place,"Skiing")) {
            var sa = getItemSubActivities(place,"Skiing");
            if (!sa.includes("None")) {
                var specifics = lib.getSkiingUphillSubActivities(true);
                if (!includesAny(sa,specifics)) {
                    if (!warnedAboutLackOfUphill) {
                        warn("Place " + place.n + " is skiing, but no uphill type specified");
                        warnedAboutLackOfUphill = true;
                    }
                    addItemSubActivity(place,"Skiing","Unknown-Uphill");
                }
            }
        }
        if (hasItemActivity(place,"Snowboarding")) {
            var sa = getItemSubActivities(place,"Snowboarding");
            if (!sa.includes("None")) {
                var specifics = lib.getSkiingUphillSubActivities(true);
                if (!includesAny(sa,specifics)) {
                    if (!warnedAboutLackOfUphill) {
                        warn("Place " + place.n + " is snowboarding, but no uphill type specified");
                        warnedAboutLackOfUphill = true;
                    }
                    addItemSubActivity(place,"Snowboarding","Unknown-Uphill");
                }
            }
        }
        if (hasItemActivity(place,"Sliding")) {
            var sa = getItemSubActivities(place,"Sliding");
            if (!sa.includes("None")) {
                var specifics = lib.getSkiingUphillSubActivities(true);
                if (!includesAny(sa,specifics)) {
                    if (!warnedAboutLackOfUphill) {
                        warn("Place " + place.n + " is sliding, but no uphill type specified");
                        warnedAboutLackOfUphill = true;
                    }
                    addItemSubActivity(place,"Sliding","Unknown-Uphill");
                }
            }
        }
        
        return(place);
    }

    function removeString(x,string) {
        var location = x.indexOf(string);
        if (location < 0) throw ("Internal error: Inconsistent search");
        var newx = x.substring(0,location) + x.substring(location + string.length);
        return(lib.trimspace(lib.removedoublespace(newx)));
    }
    
    function normalizeDataset(dataset,source) {
        if (isarray(dataset)) {
            if (needToCheckForDuplicates) dataset = removeDuplicates(dataset,source);
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
                if (needToCheckForDuplicates) dataset.features = removeDuplicates(dataset.features,source);
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

    function findFinnishCaveId(name) {
        var position = name.indexOf("[");
        if (position < 0) return(undefined);
        var firsttwo = name.substring(position+1,position+1+2);
        const possible = ["U1","U2","U3","U4","U5","U6","U7","U8","U9",
                          "KY","TP","HÄ","MI","VA","KS","KU","PK","OU","LA","ÅL"];
        if (!possible.includes(firsttwo)) return(undefined);
        var charLen = ((firsttwo[0] == "U") ? 1 : 2);
        var numPosition = position + 1 + charLen;
        var numLength = 0;
        while (numPosition + numLength < name.length && lib.isdigit(name[numPosition+numLength])) numLength++;
        var closePosition = numPosition + numLength;
        if (closePosition >= name.length) return(undefined)
        var endchar = name[closePosition];
        if (endchar != "]") return(undefined);
        var result = name.substring(position+1,position+1+charLen+numLength);
        return(result);
    }

    function findFinnishCaveType(name) {
        var index = name.search(/{[ABCD123EFGHIJKL ,jaMNORV4Zf]+}/);
        if (index < 0) return(undefined);
        var start = index + 1;
        var end = name.indexOf("}");
        var result  = name.substring(start,end);
        return(result);
    }
    
    function findFinnishCaveDescription(name) {
        var index = name.indexOf("(");
        if (index < 0) return(undefined);
        var start = index + 1;
        var end = name.indexOf(")");
        if (end < 0) return(undefined);
        var result  = name.substring(start,end);
        return(result);
    }

    function addFinnishCaveCategories(item,type) {
        while (type.length > 0) {
            var found = false;
            for (var i = 0; i < finnishCaveTypes.length; i++) {
                const knownType = finnishCaveTypes[i];
                if (type.substring(0,knownType.letter.length) === knownType.letter) {
                    addSubactivities(item,"Caving",knownType.classification);
                    type = type.substring(knownType.letter.length);
                    found = true;
                    if (knownType.warn !== undefined) {
                        if (!warnedAboutInvalidCaveClassificationLetter) {
                            warn(knownType.warn + " in " + item.n);
                            warnedAboutInvalidCaveClassificationLetter = true;
                        }
                    }
                    break;
                }
            }
            if (!found) {
                warn("Unrecognised Finnish cave category " + type);
                return;
            }
        }
    }

    function addSubactivities(item,activity,subactivities) {
        if (item.rl === undefined) return;
        //debug("addSubactivities(" + item.n + "," + activity + ",[" + JSON.stringify(subactivities) + "])");
        for (var i = 0; i < item.rl.length; i++) {
            var rli = item.rl[i];
            for (var j = 0; j < rli.a.length && j < rli.sa.length; j++) {
                if (rli.a[j] === activity) {
                    addSubactivitiesAux(rli,j,subactivities);
                }
            }
        }
    }

    function addSubactivitiesAux(rli,activityindex,subactivities) {
        //debug("addSubactivitiesAux " + JSON.stringify(subactivities));
        if (isstring(rli.sa[activityindex])) {
            rli.sa[activityindex] = [rli.sa[activityindex]];
        }
        for (var k = 0; k < subactivities.length; k++) {
            var sub = subactivities[k];
            //debug("attempting to add " + sub);
            if (!rli.sa[activityindex].includes(sub)) {
                rli.sa[activityindex].push(sub);
            }
        }
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

    function itemStrengthEvaluation(item) {
        var points = 0;
        // An entry with a map is a very strong one
        if (item.m !== undefined) points += 2;
        // An entry with more than two articles is a strong one
        if (item.rl.length > 2) points++;
        // An entry with an image is a strong one
        if (item.i !== undefined) points++;
        // An entry with a description is a strong one
        if (item.d !== undefined) points++;
        //debug("strength of " + item.n + "/"  + item.s + " = " + points.toString());
        return(points);
    }
    
    function itemStrongerThanAnother(mainitem,otheritem) {

        // Determine how "strong" the entries are, e.g., with a map they are strong
        var mainpoints = itemStrengthEvaluation(mainitem);
        var otherpoints = itemStrengthEvaluation(otheritem);

        // One with most points wins
        if  (mainpoints > otherpoints) return(true);

        // Otherwise, equal or unknown
        return(false);
    }
    
    function itemSubsumedByAnother(mainitem,otheritem) {

        //debug("investigating subsuming " + otheritem.n + " by " + mainitem.n);
        
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

        var cleanedupname = otheritem.n.toLowerCase();
        var paran1 = cleanedupname.indexOf(" (");
        if (paran1 > 0) cleanedupname = cleanedupname.substring(0,paran1);
        var paran2 = cleanedupname.indexOf(" [");
        if (paran2 > 0) cleanedupname = cleanedupname.substring(0,paran2);
        const mainname = mainitem.n.toLowerCase();
        const samename = (mainname === cleanedupname);
        const samenameasalternatename = (!samename &&
                                         getItemAlternativeNamesLowerCase(mainitem).includes(cleanedupname));
        
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
        if (needToProvideSubsumeNotices) {
            notice("Subsuming item " + otheritem.n + "/" + otheritem.s +
                   " by item " + mainitem.n + "/" + mainitem.s +
                   " because " + why);
        }
    }
    
    function addSources(item,source) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(source)) throw ("Source is not a string");
        if (item.s === source) return;
        else if (item.as === undefined) item.as = [source];
        else if (item.as.includes(source)) return;
        else item.as.push(source);
    }
    
    function addDescriptions(item,description,source) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isrecord(description)) throw ("Trying to add a description that is not a record");
        addSources(item,source);
        if (description.d === undefined) throw ("Added description has no d field");
        if (description.s === undefined) description.s = source;
        if (description.s === undefined) throw ("Added description has no s field");
        if (item.d === undefined && item.s === description.s) {
            item.d = description.d;
        } else {
            if (item.ad === undefined) item.ad = [];
            item.ad.push(description);
        }
    }
    
    function addMaps(item,map,source) {
        if (!isitem(item)) throw ("Not a dataset item");
        addSources(item,source);
        if (item.m === undefined) item.m = map;
        if (item.m === map) return;
        if (item.am === undefined) item.am = [];
        for (var i = 0; i < item.am; i++) {
            var thismap = item.am[i];
            if (thismap === map) return;
        }
        item.am.push(map);
    }
    
    function addAltitudes(item,alt,source) {
        if (!isitem(item)) throw ("Not a dataset item");
        addSources(item,source);
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
        if (!isitem(item)) throw ("Not a dataset item");
        addSources(item,source);
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
        // Sanity checks
        //

        if (!isitem(mainitem)) throw ("Not a dataset item");
        if (!isitem(otheritem)) throw ("Not a dataset item");
        
        //
        // Add coordinates
        //

        addCoordinates(mainitem,otheritem.lat,otheritem.lon,otheritem.s);
        if (otheritem.alt !== undefined) addAltitudes(mainitem,otheritem.alt,otheritem.s);

        //
        // Merge descriptions if any
        //

        if (otheritem.d !== undefined) addDescriptions(mainitem,{d: otheritem.d},otheritem.s);
        var ads = getItemAlternativeDescriptions(otheritem);
        for (var k = 0; k < ads.length; k++) {
            var ad = ads[k];
            addDescriptions(mainitem,ad,otheritem.s);
        }
        
        //
        // Add map information
        //

        if (otheritem.m !== undefined) addMaps(mainitem,otheritem.m,otheritem.s);
        
        //
        // Merge reading lists
        //

        for (var i = 0; i < otheritem.rl.length; i++) {
            otheritem.rl[i].s = mainitem.s;
        }
        mainitem.rl = mainitem.rl.concat(otheritem.rl);

        //
        // Determine if some of the sub-active unknown items (e.g.,
        // rock type) become resolved and the unknown items can be
        // removed.
        //
        
        if (hasItemActivity(mainitem,"Caving")) {
            var sa = getItemSubActivities(mainitem,"Caving");
            if (sa.includes("Rock")) {
                var rockSpecifics = lib.getCavingRockTypeSubActivities(false);
                var morphologySpecifics = lib.getCavingMorphologySubActivities(false);
                if (sa.includes("Rock-Unknown") && includesAny(sa,rockSpecifics)) {
                    removeItemSubActivity(mainitem,"Caving","Rock-Unknown");
                }
                if (sa.includes("Morphology-Unknown") && includesAny(sa,morphologySpecifics)) {
                    removeItemSubActivity(mainitem,"Caving","Morphology-Unknown");
                }
            }
        }
        
        if (hasItemActivity(mainitem,"Swimming")) {
            var sa = getItemSubActivities(mainitem,"Swimming");
            if (sa.includes("Water")) {
                var waterbodySpecifics = lib.getSwimmingWaterbodySubActivities(false);
                if (sa.includes("Waterbody-Unknown") && includesAny(sa,waterbodySpecifics)) {
                    removeItemSubActivity(mainitem,"Swimming","Waterbody-Unknown");
                }
            }
        }
        
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

    function getNamedItemsPartialMatch(partialName) {
        if (table[partialName] === undefined) {
            var result = [];
            applyAll(function (entry) {
                if (entry.n.indexOf(partialName) > -1) {
                    result.push(entry);
                } else {
                    var an = getItemAlternativeNames(entry);
                    for (var j = 0; j < an.length; j++) {
                        if (an[j].indexOf(partialName) > -1) {
                            result.push(entry);
                            break;
                        }
                    }
                }
            });
            return(result);
        } else {
            return(table[partialName]);
        }
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

    function filterMatchName(name,caseSensitive = false) {
        if (!isstring(name)) throw ("Parameter name needs to be a string");
        if (!isboolean(caseSensitive)) throw ("Parameter caseSensitive needs to be a boolean");
        if (!caseSensitive) name = name.toLowerCase();
        if (name.length == 0) {
            return(filterTrue());
        } else {
            return({op: "nameMatch",
                    param1: name,
                    param2: caseSensitive});
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
        case "nameMatch":
            return("name~" + condition.param1);
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
        case "nameMatch":
            return(cities());
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
        case "nameMatch":
            return(countries());
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
        case "nameMatch":
            return(any);
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
        case "nameMatch":
            return(lib.getActivityList());
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
        case "nameMatch":
            {
                var name = condition.param1;
                var caseSensitive = condition.param2;
                if (nameMatch(getItemName(entry),name,caseSensitive)) return(true);
                var an = getItemAlternativeNames(entry);
                for (var i = 0; i < an.length; i++) {
                    if (nameMatch(an[i],name,caseSensitive)) return(true);
                }
                return(false);
            }
        case "cityMatch":
            return(city(entry) === condition.param1);
        case "countryMatch":
            return(entry.c === condition.param1);
        case "continentMatch":
            return(entry.o === condition.param1);
        case "withMatch":
            return(entry.w === condition.param1);
        case "sourceMatch":
            if (entry.s === condition.param1) {
                return(true);
            } else if (entry.as === undefined) {
                return(false);
            } else {
                for (var i = 0; i < entry.as.length; i++) {
                    if (entry.as[i] === condition.param1) return(true);
                }
                return(false);
            }
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

    function hasItemAlternativeNames(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.an === undefined ||
           item.an.length == 0) {
            return(false);
        } else {
            return(true);
        }
    }
    
    function getItemAlternativeNames(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        //debug("item.an = " + JSON.stringify(item.an));
        if (item.an === undefined) {
            return([]);
        } else {
            return(item.an);
        }
    }
    
    function getItemAlternativeNamesLowerCase(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var list = getItemAlternativeNames(item);
        var result = [];
        for (var i = 0; i < list.length; i++) {
            result.push(list[i].toLowerCase());
        }
        return(result);
    }
    
    function getItemDescription(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        return(item.d);
    }

    function getItemDescriptionLang(item,lang) {
        if (!isstring(lang)) throw ("Language is not a string");
        if (lang.length != 2) throw ("Language is not a string of 2 characters");
        if (!isitem(item)) throw ("Not a dataset item");
        var candidate = item.d;
        if (candidate === undefined) return(undefined);
        if (isstring(candidate)) return(candidate);
        candidate = item.d[lang];
        if (candidate !== undefined)
            return(candidate);
        candidate = item.d.en;
        if (candidate !== undefined)
            return(candidate);
        return(undefined);
    }
    
    function getItemAlternativeDescriptions(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.ad === undefined) return([]);
        else return(item.ad);
    }
    
    function getItemAlternativeDescriptionsLang(item,lang) {
        if (!isstring(lang)) throw ("Language is not a string");
        if (lang.length != 2) throw ("Language is not a string of 2 characters");
        if (!isitem(item)) throw ("Not a dataset item");
        var input = getItemAlternativeDescriptions(item,lang);
        var result = [];
        for (var i = 0; i < input.length; i++) {
            var one = input[i];
            if (!isrecord(one)) throw ("Alternative description entry is not a record");
            if (isstring(one.d)) {
                result.push(one);
            } else {
                var candidate = one.d[lang];
                if (candidate === undefined) candidate = item.d.en;
                if (candidate != undefined) {
                    result.push({d: candidate, s: one.s});
                }
            }
        }
        return(result);
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
        } else if ((pos = item.lc.search("<<")) != -1) {
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
        } else if ((pos = item.lc.search("<<")) != -1) {
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

    function hasItemActivity(item,activity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(activity)) throw ("Activity is not a string");
        var activities = getItemActivities(item);
        if (activities.includes(activity)) {
            return(true);
        } else {
            return(false);
        }
    }
            
    function hasItemSubActivity(item,activity,subactivity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(activity)) throw ("Activity is not a string");
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (a === activity) {
                    var sa = rli.sa[i];
                    for (var k = 0; k < sa.length; k++) {
                        var sub = sa[k];
                        if (sub === subactivity) {
                            return(true);
                        }
                    }
                }
            }
        }
        return(false);
    }

    function addItemSubActivity(item,activity,subActivity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(activity)) throw ("Activity is not a string");
        if (!isstring(subActivity)) throw ("SubActivity is not a string");
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (a === activity) {
                    if (!rli.sa[i].includes(subActivity)) {
                        rli.sa[i].push(subActivity);
                    }
                }
            }
        }
    }
    
    function removeItemSubActivity(item,activity,subActivity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(activity)) throw ("Activity is not a string");
        if (!isstring(subActivity)) throw ("SubActivity is not a string");
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (a === activity) {
                    if (rli.sa[i].includes(subActivity)) {
                        rli.sa[i] = listSubstract(rli.sa[i],subActivity);
                    }
                }
            }
        }
    }
    
    function getItemSubActivities(item,activity) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isstring(activity)) throw ("Activity is not a string");
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
    
    function getItemMultiSubActivities(item,activities) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isarray(activities)) throw ("Activities is not an array");
        var result = [];
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (activities.includes(a)) {
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
        if (!isstring(activity)) throw ("Activity is not a string");
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
        if (!isstring(activity)) throw ("Activity is not a string");
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
    
    function getItemMultiSubActivitiesWithinSet(item,activities,set) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isarray(activities)) throw ("Activitis is not an array");
        var allSubs = getItemMultiSubActivities(item,activities);
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
    
    function hasItemReadingListVideoUrl(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemVideoURL(lis[i]) !== undefined) {
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
    
    function getItemSources(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        var result  = [item.s];
        var alternatives = getItemAlternativeSources(item);
        result = result.concat(alternatives);
        return(result);
    }
    
    function getItemAlternativeSources(item) {
        if (!isitem(item)) throw ("Not a dataset item");
        if (item.as === undefined) return([]);
        else return(item.as);
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

    function getItemRepresentativeImageURL(item) {

        //
        // Sanity checks
        //
        
        if (!isitem(item)) throw ("Not a dataset item");

        //
        // Initialize
        //
        
        var lis = getItemReadingList(item);

        //
        // First try to find a representative image
        //
        
        for (var i = 0; i < lis.length; i++) {
            var rli = lis[i];
            var image = getReadingListItemImageURL(rli);
            if (image === undefined) continue;
            if (getReadingListItemImageRepresentative(rli)) return(image);
        }

        //
        // Not found. Get any image.
        //
        
        for (var j = 0; j < lis.length; j++) {
            var rli = lis[j];
            var image = getReadingListItemImageURL(rli);
            if (image !== undefined) return(image);
        }
        
        //
        // Can't find anything. Fail.
        //
        
        return(undefined);
    }
    
    function getReadingListItemTitle(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemTitle");
        return(article.t);
    }

    function getReadingListItemURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemURL");
        return(article.u);
    }

    function getReadingListItemVideoURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemURL");
        return(article.v);
    }
    
    function getReadingListItemImageURL(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemImageURL");
        return(article.i);
    }

    function getReadingListItemImageRepresentative(article) {
        if (!isreadinglistitem(article)) throw ("Not a reading list item in getReadingListItemImageRepresentative");
        if (article.r === undefined) return(false);
        else if (article.r === 1) return(true);
        else return(false);
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
        if (!islang(lang)) throw ("Not a language object in descriptionTitle");
        return(useHtml ? lib.htmlParagraph(lib.htmlBold(text)) : (text.toUpperCase() + "\n\n"));
    }
    
    function descriptionImage(lang,url,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionImage");
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
        //debug("descriptionText " + text);
        if (!islang(lang)) throw ("Not a language object in descriptionText");
        if (text.length == 0) return("");
        if (useHtml) {
            return(lib.htmlParagraph(text));
        } else {
            return(text + "\n\n");
        }
    }

    function descriptionTextAdd(lang,text1,text2,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionTextAdd");
        if (text1.length == 0) {
            return(text2);
        } else if (text2.length == 0) {
            return(text1);
        } else  {
            return(text1 + " " + text2);
        }
    }
    
    function descriptionTextLine(lang,text,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionTextLine");
        return(text + (useHtml ? lib.htmlBreak() : "\n"));
    }

    function descriptionNameToURL(lang,name,useHtml,conserveSpace) {
        return("?p=" + encodeURI(name));
    }
    
    function descriptionLink(lang,link,url,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionTextAndLink");
        if (useHtml) {
            return(lib.htmlLink(link,url,true));
        } else {
            return(link + " (" + url + ")");
        }
    }

    function descriptionTextAndLink(lang,text,link,url,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionTextAndLink");
        if (useHtml) {
            return(text + lib.htmlLink(link,url,true));
        } else {
            return(text + link + " (" + url + ")");
        }
    }

    function descriptionTextAndLinkAndText(lang,text1,link,url,text2,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionTextAndLinkAndText");
        if (useHtml) {
            return(text1 + lib.htmlLink(link,url,true) + text2);
        } else {
            return(text1 + link + " " + url + text2);
        }
    }

    function descriptionCoordinates(lang,lat,lon,includetext,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in descriptionCoordinates");
        var textHeader = includetext ? (lang.capitalize(lang.getText("coordinates")) + ": ") : "";
        var textCoords = "";
        if (lat < 0) {
            textCoords += "S " + ((-lat).toFixed(coordinateDigits));
        } else {
            textCoords += "N " + ((lat).toFixed(coordinateDigits));
        }
        textCoords += " ";
        if (lon < 0) {
            textCoords += "W " + ((-lon).toFixed(coordinateDigits));
        } else {
            textCoords += "E " + ((lon).toFixed(coordinateDigits));
        }
        var urlCoords = "http://www.google.com/maps/place/" + String(lat) + "," + String(lon);
        var text = descriptionTextAndLink(lang,textHeader,textCoords,urlCoords,useHtml,conserveSpace);
        return(text);
    }

    function rockTypeText(lang,prefix,list,manmade) {
        if (!islang(lang)) throw ("Not a language object in rockTypeText");
        if (list.length == 0 ||
            (list.length == 1 && list[0] == "Rock-Unknown")) {
            return("");
        }
        var text = lang.capitalize(lang.getText("rock") + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += "/";
            var unprocessed = list[i].toLowerCase();
            var translated = lang.getTextCollectionItem("rockType",unprocessed);
            text += lang.capitalize(translated);
        }
        if (manmade) {
            if (list.length > 0) {
                text += "/";
            }
            text += lang.getText("manmade");
        }
        text += ".";
        return(text);
    }

    function morphologyText(lang,prefix,list) {
        if (!islang(lang)) throw ("Not a language object in morphologyText");
        if (list.length == 0 ||
            (list.length == 1 && list[0] == "Morphology-Unknown")) {
            return("");
        }
        var text = lang.capitalize(lang.getText("morphology") + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += "/";
            var unprocessed = list[i].toLowerCase();
            var translated = lang.getTextCollectionItem("morphology",unprocessed);
            text += lang.capitalize(translated);
        }
        text += ".";
        return(text);
    }

    function activityText(lang,list) {
        if (!islang(lang)) throw ("Not a language object in activityText");
        var text = lang.capitalize(lang.getText("cave") + "-" + lang.getText("activity") + ": ");
        for (var i = 0; i < list.length; i++) {
            if (i > 0) text += ", ";
            var unprocessed = list[i].toLowerCase();
            var translated = lang.getTextCollectionItem("cavingActivity",unprocessed);
            text += lang.capitalize(translated);
        }
        text += ".";
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
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemAuthors");
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
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemAuthorsAndYear");
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
    
    function itemDescriptionAuxRLItemPublication(lang,item,rli,authorsandyear,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemPublication");
        if (getReadingListItemPublication(rli) !== undefined) {
            var pretext = "";
            if (getReadingListItemTitle(rli) === undefined ||
                getReadingListItemTitle(rli) === "") {
                pretext = lang.capitalize(lang.getText("publicationReference")) + ": ";
            } else {
                pretext =
                    lang.capitalize(lang.getText("publicationReference")) + ": " +
                    lang.capitalize(getReadingListItemTitle(rli)) + ". ";
            }
            var pubitself = getReadingListItemPublication(rli);
            if (conserveSpace) {
                for (var i = 0; i < publicationNamesToShorten.length; i++) {
                    const shorten = publicationNamesToShorten[i];
                    pubitself = pubitself.replace(shorten.pattern,shorten.shorter);
                }
            }
            if (getReadingListItemPublicationURL(rli) !== undefined) {
                return(descriptionTextAndLinkAndText(lang,
                                                     pretext,
                                                     pubitself,
                                                     getReadingListItemPublicationURL(rli),
                                                     authorsandyear,
                                                     useHtml,
                                                     conserveSpace));
            } else {
                var text =
                    pretext  +
                    pubitself +
                    authorsandyear;
                return(text);
            }
        } else {
            return("");
        }
    }
    
    function itemDescriptionAuxRLItem(lang,item,rli,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAuxRLItem");
        if (!isitem(item)) throw ("Not a dataset item");
        if (!isreadinglistitem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItem");
        var html = "";
        var authorsandyear = itemDescriptionAuxRLItemAuthorsAndYear(lang,rli,conserveSpace);
        if (getReadingListItemURL(rli) !== undefined) {
            var videopart = "";
            if (getReadingListItemVideoURL(rli) !== undefined) {
                videopart += descriptionTextAndLink(lang,
                                                    " " + lang.getText("and") + " ",
                                                    lang.getText("video"),
                                                    getReadingListItemVideoURL(rli),
                                                    useHtml,
                                                    conserveSpace);
            }
            html += descriptionTextAndLinkAndText(lang,
                                                  "",
                                                  getReadingListItemTitle(rli),
                                                  getReadingListItemURL(rli),
                                                  videopart + authorsandyear,
                                                  useHtml,
                                                  conserveSpace);
        } else  {
            if (getReadingListItemVideoURL(rli) !== undefined) {
                if (html.length > 0) {
                    html = descriptionTextLine(lang,html,useHtml,conserveSpace);
                }
                videopart = " (" + lang.getText("video") + ")",
                html += descriptionTextAndLinkAndText(lang,
                                                      "",
                                                      getReadingListItemTitle(rli),
                                                      getReadingListItemVideoURL(rli),
                                                      videopart + authorsandyear,
                                                      useHtml,
                                                      conserveSpace);
            }
        }
        var pubhtml = itemDescriptionAuxRLItemPublication(lang,item,rli,authorsandyear,useHtml,conserveSpace);
        if (html.length > 0 && pubhtml.length > 0) {
            html = descriptionTextLine(lang,html,useHtml,conserveSpace);
        }
        html += pubhtml;
        return(html);
    }
        
    function itemDescriptionTextCavingActivities(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionTextCavingActivities");
        if (!isitem(item)) throw ("Not a dataset item");
        var movementtypes = lib.getCavingMovementSubActivities();
        var otheractivitytypes = lib.getCavingNonMovementActivitySubActivities();
        var movements = getItemSubActivitiesWithinSet(item,"Caving",movementtypes);
        var otheractivities = getItemSubActivitiesWithinSet(item,"Caving",otheractivitytypes);
        var movementissimple = (movements.length == 0 || (movements.length == 1 && movements[0] === "Basic"));
        var otheractivitiesissimple = (otheractivities.length == 0);
        if (movementissimple && otheractivitiesissimple) {
            return("");
        } else {
            var allactivities = movements.concat(otheractivities);
            var descr = activityText(lang,allactivities);
            return(descr);
        }
    }

    function itemDescriptionSaunaType(lang,item,useHtml,conserveSpace) {
        return(itemDescriptionGenericSubActivities(lang,
                                                   item,
                                                   ["Sauna"],
                                                   lib.getSaunaSaunaTypeSubActivities(true),
                                                   "Normal",
                                                   undefined,
                                                   "saunaType",
                                                   useHtml,
                                                   conserveSpace));
    }
    
    function itemDescriptionClimbingType(lang,item,useHtml,conserveSpace) {
        return(itemDescriptionGenericSubActivities(lang,
                                                   item,
                                                   ["Climbing"],
                                                   lib.getClimbingTypeSubActivities(true),
                                                   undefined,
                                                   "climbingTypeIs",
                                                   "climbingType",
                                                   useHtml,
                                                   conserveSpace));
    }
    
    function itemDescriptionSwimmingPlace(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionSwimmingPlace");
        if (!isitem(item)) throw ("Not a dataset item");
        var placeTypes = lib.getSwimmingPlaceSubActivities();
        var materialTypes = lib.getSwimmingMaterialSubActivities();
        var places = getItemSubActivitiesWithinSet(item,"Swimming",placeTypes);
        var materials = getItemSubActivitiesWithinSet(item,"Swimming",materialTypes);
        if (places.length == 0 && materials.length == 0) {
            return("");
        }
        var usesDefaults =
            ((places.length == 0 ||
              (places.length == 1 && places[0] === "Outdoor") ||
              (places.length == 2 && places[0] === "Outdoor" && (places[1] === "Waterbody-Lake" ||
                                                                 places[1] === "Waterbody-Sea" ||
                                                                 places[1] === "Waterbody-Pool"))) &&
             (materials.length == 0 || (materials.length == 1 && materials[0] === "Water")));
        if (usesDefaults && conserveSpace) {
            return("");
        } else {
            var result = lang.capitalize(lang.getText("swimming")) + " ";
            for (var i = 0; i < places.length; i++) {
                if (i > 0 && i < places.length - 1) result += ", ";
                else if (i > 0 && i == places.length -1) result += " " + lang.getText("and") + " ";
                result += lang.getTextCollectionItem("swimmingPlace",places[i].toLowerCase());
            }
            if (places.length > 0 && materials.length > 0) result += ", ";
            for (var j = 0; j < materials.length; j++) {
                if (j > 0 && j < materials.length - 1) result += ", ";
                else if (j > 0 && j == materials.length -1) result += " " + lang.getText("and") + " ";
                result += lang.getTextCollectionItem("swimmingMaterial",materials[j].toLowerCase());
            }
            result += ".";
            return(result);
        }
    }
    
    function itemDescriptionSkiingPlaceUphillAndMaterial(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionSkiingPlaceUpHillAndMaterial");
        if (!isitem(item)) throw ("Not a dataset item");
        var placeTypes = lib.getSkiingPlaceSubActivities();
        var materialTypes = lib.getSkiingSubstanceSubActivities(true);
        var uphillTypes = lib.getSkiingUphillSubActivities(true);
        var activities = ["Skiing","Snowboarding","Sliding"];
        var places = getItemMultiSubActivitiesWithinSet(item,activities,placeTypes);
        var uphill = getItemMultiSubActivitiesWithinSet(item,activities,uphillTypes);
        var materials = getItemMultiSubActivitiesWithinSet(item,activities,materialTypes);
        if (places.length == 0 && materials.length == 0) {
            return("");
        }
        var usesDefaults =
            ((places.length == 0 || (places.length == 1 && places[0] === "Outdoor")) &&
             (uphill.length == 0 || (uphill.length == 1 && uphill[0] === "Lifts")) &&
             (materials.length == 0 || (materials.length == 1 && materials[0] === "Snow")));
        if (usesDefaults && conserveSpace) {
            return("");
        } else {
            var result = lang.capitalize(lang.getText("ski")) + " ";
            for (var k = 0; k < places.length; k++) {
                if (k > 0 && k < places.length - 1) result += ", ";
                else if (k > 0 && k == places.length -1) result += " " + lang.getText("and") + " ";
                result += lang.getTextCollectionItem("skiPlace",places[k].toLowerCase());
            }
            result += " ";
            for (var j = 0; j < materials.length; j++) {
                if (j > 0 && j < materials.length - 1) result += ", ";
                else if (j > 0 && j == materials.length -1) result += " " + lang.getText("and") + " ";
                result += lang.getTextCollectionItem("skiMaterial",materials[j].toLowerCase());
            }
            result += ". ";
            result += lang.capitalize(lang.getText("up"));
            result += " ";
            for (var l = 0; l < uphill.length; l++) {
                if (l > 0 && l < uphill.length - 1) result += ", ";
                else if (l > 0 && l == uphill.length -1) result += " " + lang.getText("and") + " ";
                result += lang.getTextCollectionItem("skiUphill",uphill[l].toLowerCase());
            }
            result += ".";
            return(result);
        }
    }
    
    function itemDescriptionBikingTrackAndBikeType(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionBikingTrackAndBikeType");
        if (!isitem(item)) throw ("Not a dataset item");
        var placeTypes = lib.getBikingBikeTrackSubActivities();
        var bikeTypes = lib.getBikingBikeTypeSubActivities();
        var places = getItemSubActivitiesWithinSet(item,"Biking",placeTypes);
        var bikes = getItemSubActivitiesWithinSet(item,"Biking",bikeTypes);
        if (places.length == 0 && bikes.length == 0) {
            return("");
        }
        var result = lang.capitalize(lang.getText("biking")) + " ";
        for (var i = 0; i < bikes.length; i++) {
            if (i > 0 && i < bikes.length - 1) result += ", ";
            else if (i > 0 && i== bikes.length -1) result += " " + lang.getText("and") + " ";
            result += lang.getTextCollectionItem("bikeType",bikes[i].toLowerCase());
        }
        result = descriptionTextAdd(lang,result,lang.getText("and") + " ",useHtml,conserveSpace);
        for (var j = 0; j < places.length; j++) {
            if (j > 0 && j < places.length - 1) result += ", ";
            else if (j > 0 && j == places.length -1) result += " " + lang.getText("and") + " ";
            result += lang.getTextCollectionItem("bikeTrack",places[j].toLowerCase());
        }
        result += ".";
        return(result);
    }

    function itemDescriptionGenericSubActivities(lang,
                                                 item,
                                                 activities,
                                                 subActivities,
                                                 emptyItem,
                                                 headerTextId,
                                                 itemTextId,
                                                 useHtml,
                                                 conserveSpace) {
        
        // lang            The language object
        // item            The dataset item we are looking at
        // activities      The main activities we are looking at, e.g., ["Skiing","Snowboarding"]
        // subActivities   The sub-activities of interest
        // emptyItem       The value for an item which does not need to described.
        //                 If the list is empty or contains only this, nothing is printed.
        //                 Use the value undefined here if an empty item does not make sense.
        // headerTextId    The textid for the language object, to be used for printing a header, e.g., "ski"
        // itemTextId      The textid for the language object, to be used for printing individual items, e.g, "skiMaterial"
        // useHtml         A boolean. True if we should return HTML, false if plain text.
        // conserveSpace   A boolean. True if we should attempt to be as brief as possible, false otherwise.
        
        if (!islang(lang)) throw ("Not a language object in itemDescriptionUrbanExplorationTarget");
        if (!isitem(item)) throw ("Not a dataset item");
        var items = getItemMultiSubActivitiesWithinSet(item,activities,subActivities);
        if (items.length == 0 ||
            (items.length == 1 && emptyItem !== undefined && items[0] === emptyItem)) {
            return("");
        }
        var result = "";
        if (headerTextId !== undefined) {
            result += lang.capitalize(lang.getText(headerTextId)) + " ";
        }
        for (var i = 0; i < items.length; i++) {
            if (i > 0 && i < items.length - 1) result += ", ";
            else if (i > 0 && i == items.length -1) result += " " + lang.getText("and") + " ";
            result += lang.getTextCollectionItem(itemTextId,items[i].toLowerCase());
        }
        result += ".";
        return(result);
    }
    
    function itemDescriptionUrbanExplorationTarget(lang,item,useHtml,conserveSpace) {
        return(itemDescriptionGenericSubActivities(lang,
                                                   item,
                                                   ["Urban-exploration"],
                                                   lib.getUrbanexTargetSubActivities(true),
                                                   "None",
                                                   "target",
                                                   "urbanexTarget",
                                                   useHtml,
                                                   conserveSpace));
    }
    
    function itemDescriptionTextMainCave(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionTextMainCave");
        if (!isitem(item)) throw ("Not a dataset item");
        if (conserveSpace) return("");
        if (hasItemMainCave(item)) {
            //debug("main cave");
            return(descriptionTextAndLink(lang,
                                          lang.capitalize(lang.getText("mainCave") + ": "),
                                          simplifyName(item.n,getItemMainCave(item)),
                                          descriptionNameToURL(lang,getItemMainCave(item),useHtml,conserveSpace),
                                          useHtml,
                                          conserveSpace));
        } else {
            return("");
        }
    }

    function itemDescriptionTextSideCaves(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionTextSideCaves");
        if (!isitem(item)) throw ("Not a dataset item");
        var htmlInside = "";
        var sidecaves =  getItemSideCaves(item);
        if (conserveSpace) {
            switch (sidecaves.length) {
            case 0:
                return("");
            case 1:
                return("1 " + lang.capitalize(lang.getText("sideCave")));
            default:
                return(sidecaves.length.toString() + " " + lang.capitalize(lang.getText("sideCaves")));
            }
        } else {
            for (var i = 0; i < sidecaves.length; i++) {
                var sidecave = sidecaves[i];
                var thisHtml = lang.capitalize(lang.getText("sideCave"));
                thisHtml += ": ";
                thisHtml += descriptionLink(lang,
                                            simplifyName(item.n,sidecave),
                                            descriptionNameToURL(lang,sidecave,useHtml,conserveSpace),
                                            useHtml,
                                            conserveSpace);
                if (i+1 < sidecaves.length) thisHtml = descriptionTextLine(lang,thisHtml,useHtml,conserveSpace);
                htmlInside += thisHtml;
            }
            if (htmlInside.length > 0) {
                //debug("side cave");
                return(descriptionText(lang,
                                       htmlInside,
                                       useHtml,
                                       conserveSpace));
            } else {
                return("");
            }
        }
    }
    
    function itemDescriptionAlternateNames(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAlternativeNames");
        if (!isitem(item)) throw ("Not a dataset item");
        if (conserveSpace) {
            return("");
        } else if (hasItemAlternativeNames(item)) {
            var an = simplifyNames(item.n,getItemAlternativeNames(item));
            return(lang.capitalize(lang.getText("alternativeNames")) +
                   ": " +
                   lang.listToText(an) +
                   ".");
        } else {
            return("");
        }
    }
    
    function itemDescriptionCavingRockMorphology(lang,item,useHtml,conserveSpace) {
        //
        // Check for man-made caves
        //
        
        var manmade = hasItemSubActivity(item,"Caving","Man-Made");

        //
        // Check for rock and morphology types
        //
        
        var rocktypeprefix = "Rock-";
        var morphologyprefix = "Morphology-";
        var rocktype = getItemSubActivitiesWithPrefix(item,"Caving",rocktypeprefix);
        var morphology = getItemSubActivitiesWithPrefix(item,"Caving",morphologyprefix);

        var html = "";
        if (rocktype.length > 0) {

            html = descriptionTextAdd(lang,
                                      html,
                                      rockTypeText(lang,rocktypeprefix,rocktype,manmade),
                                      useHtml,
                                      conserveSpace);
        }

        if (morphology.length > 0) {
            
            html = descriptionTextAdd(lang,
                                      html,
                                      morphologyText(lang,morphologyprefix,morphology),
                                      useHtml,
                                      conserveSpace);
            
        }
        
        return(html);
    }
    
    function itemDescriptionCavingMapLength(lang,item,useHtml,conserveSpace) {

        if (!islang(lang)) throw ("Not a language object in itemDescriptionCavingCharacteristics");
        
        var html = "";
        
        //
        // Output map
        //
        
        var cavemap = getItemMap(item);
        if (cavemap !== undefined) {
            var maptext = "";
            maptext += descriptionTextAndLink(lang,
                                              lang.capitalize(lang.getText("caveMap") + ": "),
                                              lang.getText("map"),
                                              cavemap,
                                              useHtml,
                                              conserveSpace);
            maptext += itemDescriptionAlternativeMaps(lang,item);
            maptext += ". ";
            html += maptext;
        }
        
        //
        // Output cave characteristics about length, rock and morphology
        //
        
        if (getItemLength(item) !== undefined) {
            var lengthtext = distanceInUnits(getItemLength(item));
            if (getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
            lengthtext += ".";
            html +=
                lang.capitalize(lang.getText("length")) +
                ": " +
                lengthtext;
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
            lengthtext += ".";
            html +=
                lang.capitalize(lang.getText("lengthCategory")) +
                ": " +
                lengthtext;
        }
        
        //
        // Done
        //

        return(html);
    }
    
    function itemDescriptionAlternativeMaps(lang,item) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAlternativeMaps");
        if (!isitem(item)) throw ("Not a dataset item");
        var result = "";
        var am = getItemAlternativeMaps(item);
        for (var i = 0; i < am.length; i++) {
            var cavemap = am[i];
            result += ", ";
            result += descriptionTextAndLink(lang,
                                             lang.capitalize(lang.getText("caveMap") + ": "),
                                             lang.getText("map"),
                                             cavemap,
                                             useHtml,
                                             conserveSpace);
        }
        return(result);
    }

    function itemDescriptionAlternativeCoordinates(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionAlternativeCoordinates");
        if (!isitem(item)) throw ("Not a dataset item");
        var ac = getItemAlternativeCoordinates(item);
        if (ac.length == 0 || conserveSpace) {
            return("");
        }
        
        var result = "";
        result += " (";
        result += lang.capitalize(getItemSource(item));
        result += "). ";
        result += lang.capitalize(lang.getText("alternativeCoordinates"));
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
                result += lang.capitalize(coord.s);
                result += ", ";
            }
            var distance = lib.coordinatesDistance(getItemLat(item),
                                                   getItemLon(item),
                                                   coord.lat,
                                                   coord.lon);
            result += distance.toFixed(0);
            result += "m ";
            result += lang.getText("off");
            result += ")";
            
        }
        result += ".";
        return(result);
    }

    function itemDescriptionReadingList(lang,item,rl,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionReadingList");
        var htmlinside = "";
        var first = true;
        for (var i = 0; i < rl.length; i++) {
            var thishtml = itemDescriptionAuxRLItem(lang,item,rl[i],useHtml,conserveSpace);
            if (thishtml.length == 0) continue;
            if (first) {
                htmlinside += descriptionTextLine(lang,
                                                  lang.capitalize(lang.getText("moreToRead") + ":"),
                                                  useHtml,
                                                  conserveSpace);
                first = false;
            }
            if (i+1 < rl.length) htmlinside += descriptionTextLine(lang,thishtml,useHtml,conserveSpace);
            else htmlinside += thishtml;
        }
        return(descriptionText(lang,htmlinside,useHtml,conserveSpace));
    }

    function itemDescriptionTheDescription(lang,item,useHtml,conserveSpace) {
        if (!islang(lang)) throw ("Not a language object in itemDescriptionTheDescription");
        var descr = getItemDescriptionLang(item,lang.getLanguage());
        if (descr !== undefined) {
            var descrtexts = "";
            var alternates = conserveSpace ? [] : getItemAlternativeDescriptionsLang(item,lang.getLanguage());
            if (alternates.length > 0) {
                descr = lang.capitalize(getItemSource(item)) + ": " + descr;
            }
            descrtexts += descr;
            for (var da = 0; da < alternates.length; da++) {
                var thealternate = alternates[da];
                var altdescr = thealternate.d;
                descrtexts += " ";
                if (thealternate.s !== undefined) {
                    altdescr = lang.capitalize(thealternate.s) + ": " + altdescr;
                }
                descrtexts += altdescr;
            }
            //debug("the description");
            return(descriptionText(lang,descrtexts,useHtml,conserveSpace));
        } else {
            return("");
        }
    }

    function describeItem(lang,
                          item,
                          useHtml = true,
                          conserveSpace = false) {

        //
        // Sanity checks
        //
        
        if (!islang(lang)) throw ("Not a language object in describeItem");
        if (!isitem(item)) throw ("Not a dataset item in describeItem");

        //
        // Setup for producing text
        //
        
        var rl = getItemReadingList(item);
        var html = "";

        //
        // Output name and picture (if any)
        //
        
        html +=  descriptionTitle(lang,getItemName(item),useHtml,conserveSpace);
        if (hasItemReadingListImageUrl(item)) {
            var imageUrl = getItemRepresentativeImageURL(item);
            html +=  descriptionImage(lang,imageUrl,useHtml,conserveSpace);
        }
        
        //
        // Output description, if any. Note that there can be
        // alternate descriptions, so we may have to output many.
        //

        html += itemDescriptionTheDescription(lang,item,useHtml,conserveSpace);

        //
        // Output coordinates
        //

        //debug("coordinates");
        if (getItemFuzzy(item)) {
            html += descriptionText(lang,
                                    lang.capitalize(lang.getText("locationSecret")),
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

        var characteristics = "";
        
        //
        // Output any caving-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionCavingMapLength(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionCavingRockMorphology(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any caving activities
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionTextCavingActivities(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any sauna-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionSaunaType(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);

        //
        // Output any climbing-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionClimbingType(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);

        //
        // Output any swimming-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionSwimmingPlace(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any skiing-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionSkiingPlaceUphillAndMaterial(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);

        //
        // Output any biking-related characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionBikingTrackAndBikeType(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any urban exploration -related characteristics
        //

        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionUrbanExplorationTarget(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);

        //
        // Output any alternate names, if any
        //

        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionAlternateNames(lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output the above characteristics together, if there was any
        //

        if (characteristics.length > 0) {
            html += descriptionText(lang,characteristics,useHtml,conserveSpace);
        }
        
        //
        // Output the reading list, i.e., articles, books, etc.
        //
        
        html += itemDescriptionReadingList(lang,item,rl,useHtml,conserveSpace);
        
        //
        // Output any cave group related information
        //
        
        html += itemDescriptionTextMainCave(lang,item,useHtml,conserveSpace);
        html += itemDescriptionTextSideCaves(lang,item,useHtml,conserveSpace);

        //
        // Done!
        //
        
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
        filterMatchName: filterMatchName,
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
        getNamedItemsPartialMatch: getNamedItemsPartialMatch,
        getItemName: getItemName,
        hasItemAlternativeNames: hasItemAlternativeNames,
        getItemAlternativeNames: getItemAlternativeNames,
        getItemAlternativeNamesLowerCase: getItemAlternativeNamesLowerCase,
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
        hasItemActivity: hasItemActivity,
        getItemSubActivities: getItemSubActivities,
        getItemSubActivitiesWithPrefix: getItemSubActivitiesWithPrefix,
        getItemSubActivitiesWithinSet: getItemSubActivitiesWithinSet,
        getItemSource: getItemSource,
        getItemSources: getItemSources,
        getItemAlternativeSources: getItemAlternativeSources,
        getItemRelationshipTypes: getItemRelationshipTypes,
        getItemRelationshipTargets: getItemRelationshipTargets,
        getItemRepresentativeImageURL: getItemRepresentativeImageURL,
        getItemMainCave: getItemMainCave,
        getItemSideCaves: getItemSideCaves,
        hasItemMainCave: hasItemMainCave,
        hasItemSideCaves: hasItemSideCaves,
        hasItemReadingListUrl: hasItemReadingListUrl,
        hasItemReadingListVideoUrl: hasItemReadingListVideoUrl,
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
        getReadingListItemVideoURL: getReadingListItemVideoURL,
        getReadingListItemImageURL: getReadingListItemImageURL,
        getReadingListItemImageRepresentative: getReadingListItemImageRepresentative,
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
