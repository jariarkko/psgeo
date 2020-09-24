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
    var warningsAboutLackOfSubActivity = [];
    var warnedAboutBookAsArticle = false;
    var warnedAboutFailingUrl = false;
    var warnedAboutDescriptionInName = false;
    var warnedAboutInvalidCaveClassificationLetter = false;
    var warnedAboutDataSetActivityList = false;
    var warnedAboutDataSetSubActivityList = false;
    var warnedAboutDataSetActivityListLength = false;
    
    //
    // Some configuration settings ------------------------------------------------------------
    //

    const needToCheckForDuplicates = false;
    const needToProvideSubsumeNotices = false;

    //
    // Tables that drive the behaviour --------------------------------------------------------
    //

    //
    // Finnish cave classification system, as described in
    // https://luolaseura.fi/luolakanta/luokittelu-fi.html
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
            classification: ["Rock","Morphology-Karst"]
        },
        {
            letter: "C1",        // limestone & karst
            classification: ["Rock","Rock-Limestone","Morphology-Karst"]
        },
        {
            letter: "C2",        // gypsum & karst
            classification: ["Rock","Rock-Gypsum","Morphology-Karst"]
        },
        {
            letter: "C3",        // salt & karst
            classification: ["Rock","Rock-Salt","Morphology-Karst"]
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
            classification: ["Material-Other","Morphology-Other"]
        },
        {
            letter: "H",
            classification: ["Rock","Morphology-Erosion"]
        },
        {
            letter: "I",        // talus cave
            classification: ["Rock","Morphology-Boulders"]       // As explained in Suomen luolat
        },
        {
            letter: "I1",        // neotectonic talus cave
            classification: ["Rock","Morphology-Boulders"]       // Rock, Boulders
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
            letter: "M",        // glacier cave
            classification: ["Glacier"]
        },
        
        {
            letter: "N1",
            classification: ["Morphology-Organic","Rock-Limestone"]
        },
        {
            letter: "N2",
            classification: ["Morphology-Organic"]
        },
        {
            letter: "V1",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V2",
            classification: ["Morphology-Volcanic"]
        },
        {
            letter: "V3",
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
        {
            letter: "Z1",
            classification: []
        },
        {
            letter: "Z2",
            classification: []
        }
    ];
    
    //
    // The subActivityGroupsWithUnknown table contains all groups of
    // sub-activity tags that can represent an unknown state.  For
    // instance, under activity Caving, Rock-Limestone, Rock-Granite,
    // etc. represent different rock types, while Rock-Unknown signals
    // that we do not know what the rock is. (Note that this is
    // different from Rock-Other, which tells that we know the rock
    // but it is not one of categories supported by Activity JSON.)
    //
    // We need to have a table of all these, because PsgeoDB supports
    // automatic insertion of the unknown tags. This makes searching
    // easier, e.g., one can search for rocks of various types, and as
    // long as unknown is part of the criteria, also those caves will
    // show up in the search result.
    //
    // The table is an array of items, one per activity tag (or a
    // group of related activities, if they share the same
    // sub-activities). Each entry is of the following form:
    //
    //     { activities: ..., subActivitySets: ... }
    //
    // Here the value of activities is a list of strings, and the
    // value of subActivitySets is a list of records of the following
    // form:
    //
    //     {
    //       condition: ...,
    //       subActivities: ...,
    //       unknown: ...
    //     }
    //
    // Where the fields are as follows:
    //
    // - condition is a string that represents a sub-activity that must be
    //   present for the group to be valid. For instance, the sub-activity
    //   Rock represents a rock-based cave, and the various Rock-Limestone etc.
    //   values are only relevant if Rock also appears in the sub-activities.
    //   If the value of condition is undefined/missing, the condition is
    //   always true.
    //
    // - negcondition is a string, and represents a sub-activity that should
    //   NOT appear for the condition to hold. If the value of the fied
    //   is undefined/missing, the condition always passes. Note that both
    //   condition and negcondition can be set, e.g., sub-activity ABC must
    //   always appear and DEF never appear.
    //
    // - subActivities is a list of strings, representing the list of
    //   sub-activities making up the designated group. E.g.,
    //   Rock-Limestone, Rock-Granite, etc. This list must also include
    //   the string that represents the unknown value.
    //
    // - unknown is a string that represents the unknown value. As noted
    //   above, this string must also appear in the subActivities field.
    //
    // - warning is a string that can be used to provide a warning about
    //   the lack of proper values.
    //
    
    const subActivityGroupsWithUnknown = [

        //
        // Caving: We have to main sub-activity groups, one on rock
        // type and one on morphology. Both should be listed in all
        // cases, but many databases do not specify everything, so we
        // will add unknown entries for both if needed.
        //
        
        { activities: ["Caving"],
          subActivitySets: [
              { condition: "Rock",
                negcondition: undefined,
                subActivities: lib.getCavingRockTypeSubActivities(true),
                unknown: "Rock-Unknown",
                warning: "Caving in rock, but no rock type specified" },
              { condition: "Rock",
                negcondition: undefined,
                subActivities: lib.getCavingMorphologySubActivities(true),
                unknown: "Morphology-Unknown",
                warning: "Caving in rock, but no cave type specified" }]},

        //
        // Swimming: There are waterbody types, place types, and
        // swimming-place/material types. Both should be marked as
        // unknown, if not specified.
        //
        
        { activities: ["Swimming"],
          subActivitySets: [
              { condition: undefined,
                negation: undefined,
                subActivities: lib.getSwimmingPlaceSubActivities(true),
                unknown: "Unknown",
                warning: "Swimming somewhere, but no place type specified" },
              { condition: "Water",
                negation: undefined,
                subActivities: lib.getSwimmingWaterbodySubActivities(true),
                unknown: "Waterbody-Unknown",
                warning: "Swimming in water, but no waterbody type specified" },
              { condition: undefined,
                negcondition: undefined,
                subActivities: lib.getSwimmingMaterialSubActivities(true),
                unknown: "Unknown",
                warning: "Swimming material type not specified" }]},

        //
        // For skiing and related activities, we have two aspects to
        // consider: the material skied on, and the method of getting
        // up the hill. If these are not known, the relevant unknown
        // tag will be added.
        //
        
        { activities: ["Skiing","Snowboarding","Sliding"],
          subActivitySets: [
              { condition: undefined,
                negcondition: "None",
                subActivities: lib.getSkiingPlaceSubActivities(true),
                unknown: "Unknown",
                warning: "Skiing, Snowboarding, or Sliding but no place type specified" },
              { condition: undefined,
                negcondition: "None",
                subActivities: lib.getSkiingUphillSubActivities(true),
                unknown: "Uphill-Unknown",
                warning: "Skiing, Snowboarding, or Sliding but no uphill type specified" },
              { condition: undefined,
                negcondition: "None",
                subActivities: lib.getSkiingSubstanceSubActivities(true),
                unknown: "Substance-Unknown",
                warning: "Skiing, Snowboarding, or Sliding but no substance type specified" }]},

        //
        // If the Sauna activity is specified but no sauna type (e.g.,
        // Normal, Smoke, Steam, Infrared) is specified in the
        // sub-activities, the Unknown sub-activity will be added.
        //
        
        { activities: ["Sauna"],
          subActivitySets: [
              { condition: undefined,
                negcondition: "None",
                subActivities: lib.getSaunaTypeSubActivities(true),
                unknown: "Unknown",
                warning: "Sauna activity given, but no sauna type specified" }]},

        //
        // If the Climbing activity is specified but no climbing type
        // (e.g., Mountain, Wall) is specified in the sub-activities,
        // the Unknown sub-activity will be added.
        //
        
        { activities: ["Climbing"],
          subActivitySets: [
              { condition: undefined,
                negcondition: false,
                subActivities: lib.getClimbingTypeSubActivities(true),
                unknown: "Unknown",
                warning: "Climbing activity given, but no climbing type specified" }]},
        
        //
        // If the Bike activity is specified but no bike type (e.g.,
        // Bike-Mountain) or track type (e.g., Track-City) is
        // specified in the sub-activities, the relevant unknown
        // sub-activity will be added.
        //
        
        { activities: ["Biking"],
          subActivitySets: [
              { condition: undefined,
                negcondition: false,
                subActivities: lib.getBikingBikeTypeSubActivities(true),
                unknown: "Bike-Unknown",
                warning: "Biking activity given, but no bike type specified" },
              { condition: undefined,
                negcondition: false,
                subActivities: lib.getBikingBikeTrackSubActivities(true),
                unknown: "Track-Unknown",
                warning: "Biking activity given, but no track type specified" }]}
    ];

    //
    // Some accuracy controls, to control how accurate we expect
    // various sources to be. This information is used when merging
    // entries.
    //
    
    var bookNames = ["Suomen luolat"];
    var bookUrls = ["https://www.salakirjat.net/product/242/suomen-luolat"];
    var bookAuthors = ["Aimo Kejonen"];
    var possiblyInaccurateCoordinateBookUrls = bookUrls;
    var possiblyInaccurateCoordinateBookAuthors = bookAuthors;

    //
    // Some URLs we know are broken, to avoid them in the database.
    //
    
    var knownFailingUrls = [
        "https://web.archive.org/web/20051201053118/http://img.groundspeak.com/cache/1203_000.gif"
    ];
    
    //
    // Private data ---------------------------------------------------------------------------
    //

    var langen = PsgeoLang("en");
    var list = normalizeDataset(listin,source);
    var table = constructTable(list);
    var filter = filterTrue();
    var dbText = PsgeoDBText(lib);
    
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

    function isTable(obj) {
        return(lib.isRecord(obj) && obj.isTable === true);
    }
    
    function isItem(obj) {
        return(lib.isRecord(obj));
    }
    
    function isReadingListItem(obj) {
        return(lib.isRecord(obj));
    }
    
    function isLang(obj) {
        if (!lib.isRecord(obj)) return(false);
        if (obj.getLanguage === undefined) return(false);
        return(true);
    }

    function nameMatch(name,pattern,caseSensitive) {
        if (!lib.isString(name)) throw ("Name needs to be a string");
        if (!lib.isString(pattern)) throw ("Pattern needs to be a string");
        if (!lib.isBoolean(caseSensitive)) throw ("Parameter caseSensitive needs to be a boolean");
        if (!caseSensitive) name = name.toLowerCase();
        if (name.indexOf(pattern) != -1) return(true);
        else return(false);
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

    //
    // Internal methods for normalization -----------------------------------------------------
    //

    function normalizeItem(place,source) {

        if (place === undefined ||
            !isItem(place)) {
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

        if (article.a === undefined) {
            if (!warnedAboutDataSetActivityList) {
                warn("Dataset item " + place.n + " does not have an activity list");
                warnedAboutDataSetActivityList = true;
            }
            article.a = [];
        }
        
        if (article.sa === undefined) {
            if (!warnedAboutDataSetSubActivityList) {
                warn("Dataset item " + place.n + " does not have a sub activity list");
                warnedAboutDataSetSubActivityList = true;
            }
            article.sa = [];
        }
        
        if (article.a.length != article.sa.length) {
            if (!warnedAboutDataSetActivityListLength) {
                warn("Dataset item " + place.n + " does not have equal activity and sub activity list lengths");
                warnedAboutDataSetActivityListLength = true;
            }
            if (article.a.length > article.sa.length) {
                article.a = article.a.slice(0,article.sa.length);
            } else {
                article.sa = article.sa.slice(0,article.a.length);
            }
        }
        
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
            !lib.isRecord(place.geometry) ||
            place.geometry.type === undefined ||
            place.geometry.type !== "Point" ||
            place.geometry.coordinates === undefined ||
            !lib.isArray(place.geometry.coordinates) ||
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

    function normalizeItemFieldsUnknownSubActivitiesOneSubActivitySet(place,entry,set,a,sa)  {

        //
        // See if the conditions apply. If not, we bail out and do nothing.
        //
        
        if (set.condition !== undefined && !sa.includes(set.condition)) return;
        if (set.negcondition !== undefined && sa.includes(set.negcondition)) return;

        //
        // Check the list of given sub-activities. Does any of them exist in the given place?
        //
        
        const specifics = set.subActivities; 
        if (!lib.includesAny(sa,specifics)) {
            //debug("unknown " + set.unknown +
            //      " not included in set " + JSON.stringify(sa) +
            //      " which should have one of " + JSON.stringify(specifics));
            const warnBase = set.warning;
            if (!warningsAboutLackOfSubActivity.includes(warnBase)) {
                warn("Place " + place.n + " " + warnBase);
                warningsAboutLackOfSubActivity.push(warnBase);
            }
            addItemSubActivity(place,a,set.unknown);
        }
    }
    
    function normalizeItemFieldsUnknownSubActivitiesOneActivity(place,entry)  {

        //
        // First check if the activity even appears
        //
        
        if (hasItemActivities(place,entry.activities)) {
            
            //
            // It does appear. First pick the activity we are actually doing from the set.
            //
            
            var a = undefined;
            for (var j = 0; j < entry.activities.length; j++) {
                const one = entry.activities[j];
                if (hasItemActivity(place,one)) {
                    a = one;
                    break;
                }
            }
            if (a === undefined) throw ("Inconsistent search result");
            
            //
            // Then go through each of the sub-activity sets in the activity.
            //
            
            var sa = getItemMultiSubActivities(place,entry.activities);
            for (var i = 0; i < entry.subActivitySets.length; i++) {
                const set = entry.subActivitySets[i];
                normalizeItemFieldsUnknownSubActivitiesOneSubActivitySet(place,entry,set,a,sa);
            }
        }

        //
        // Done. If there was any modification of 'place', it happened
        // inside the function called above,
        // normalizeItemFieldsUnknownSubActivitiesOneSubActivitySet.
        //
        
    }
    
    function normalizeItemFieldsUnknownSubActivities(place)  {
        for (var i = 0; i < subActivityGroupsWithUnknown.length; i++) {
            var unknownEntry = subActivityGroupsWithUnknown[i];
            normalizeItemFieldsUnknownSubActivitiesOneActivity(place,unknownEntry);
        }
    }
    
    function normalizeItemFields(place,source) {
        
        // The following problems and checked for and corrected:
        //    - description (d) exists but is empty
        //    - relationship fields (rt,rn) are inconsistent
        //    - errors within the reading list (rl) structure 
        //    - map field (m) exists but is empty 
        //    - map field (m) contains an invalid url (no map there) 
        //    - city field (k) is not defined 
        //    - source field (s) is not defined
        // Find Finnish cave classification data in the description field (d)
        //
        //
        //

        //debug("normalizeItemFields source = " + source);
       
        // Existing but empty description field?
        if (place.d !==  undefined &&
            place.d === "") {
            if (!warnedAboutDescription) {
                warn("Dataset item " + place.n + " has a d field but it contains an empty string");
                warnedAboutDescription = true;
            }
            place.d = undefined;
        }
       
        // Inconsistent relationship fields?
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

        // Problems in the reading list?
        if (place.rl === undefined) place.rl = [];
        for ( const item of place.rl ) normalizeReadingListItem(place,item,source);
        
        // Map field exists but is empty?
        if (place.m !== undefined && place.m === "") {
            place.m = undefined;
            if (!warnedAboutM) {
                warn("Item " +
                     place.n +
                     " m field is set to an empty string (if there is no map, leave the field out)");
                warnedAboutM = true;
            }
        }

        // Map url is known to not point to a map. IS THIS NEEDED ANYMORE?
        if (place.m !== undefined && knownFailingUrls.includes(place.m)) {

            if (!warnedAboutFailingUrl) {
                warn("The URL " + place.m + " in " + place.n + " is not working, deleting");
                warnedAboutFailingUrl = true;
            }

            place.m = undefined;
        }
       
        // City field (k) is not defined? 
        if (place.k === undefined) {
            place.k = determineCity(place);
            if (!warnedAboutCity) {
                warn("Item " +
                     place.n +
                     " k field is not set, please add city there");
                warnedAboutCity = true;
            }
        }

        // Source field (s) is not defined?
        if (place.s === undefined) {
            place.s = source;
            //debug("normalization set source to " + place.s);
        }


        //
        // See if we have further info in the description field that
        // may be used to fill-in extra flags in the sub-activities
        // field.
        //

        //debug("before finnish check rl = " + JSON.stringify(place.rl));
        if (place.d !== undefined) {
            
            // See if we have cave type info in braces
            var type = undefined;
            if (lib.isString(place.d)) {
                type = findFinnishCaveType(place.d);
            } else {
                var supportedLanguages = langen.getSupportedLanguages();
                for (var i = 0; type === undefined && i < supportedLanguages.length; i++) {
                    var supportedLanguage = supportedLanguages[i];
                    var description = place.d[supportedLanguage];
                    if (description !== undefined) {
                        type = findFinnishCaveType(description);
                    }
                }
            }
            //debug("for cave " + place.n + " found type = " + JSON.stringify(type));
            if (type !== undefined) {
                addFinnishCaveCategories(place,type);
            }
            
        }
        
        //
        // See if we have, e.g., a cave but no rock type or morphology
        // information, in that case tag the entry with the suitable
        // "unknown" tag.
        //

        normalizeItemFieldsUnknownSubActivities(place);

        //
        // Done. Return the place (possibly modifed).
        //
        
        return(place);
    }

    function removeString(x,string) {
        var location = x.indexOf(string);
        if (location < 0) throw ("Internal error: Inconsistent search");
        var newx = x.substring(0,location) + x.substring(location + string.length);
        return(lib.trimspace(lib.removedoublespace(newx)));
    }
    
    function normalizeDataset(dataset,source) {
        if (lib.isArray(dataset)) {
            if (needToCheckForDuplicates) dataset = removeDuplicates(dataset,source);
            var result = [];
            var k;
            for (k = 0; k < dataset.length; k++) {
                result.push(normalizeItem(dataset[k],source));
            }
            return(result);
        } else if (lib.isRecord(dataset)) {
            if (dataset.type !== undefined &&
                dataset.type === "FeatureCollection" &&
                dataset.features !== undefined &&
                lib.isArray(dataset.features)) {
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
        if (!isTable(tab)) throw ("Not a table");
        if (!lib.isArray(list)) throw ("Not a dataset item list");
        var i;
        for (i = 0; i < normlist.length; i++) {
            finishNormalizingItem(tab,normlist[i]);
        }
        findSubsumedItems(tab);
    }
    
    function finishNormalizingItem(tab,item) {
        if (!isTable(tab)) throw ("Not a table");
        if (!isItem(item)) throw ("Not a dataset item");
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

    function findFinnishCaveType(text) {
	var result = text.match(/{[A-Z0-9 ,ja]+}/);
	if (result === null) return(undefined);
	else return(result[0]);
    }

    function addFinnishCaveCategories(item,type) {
        // item         an object
        // type         string (LATIN alphabet. [A-Z0-9, ]+)
        // DEPENDS      finnishCaveTypes (array of objects)
        // ALTERS       item
        // RETURNS      (nothing)

        // Operation: Example:
        // Group of three caves. Classes {ABC, C2D ja E}
        //     Argument:   type is a classes string, no braces.
        //     Phase 1:    "ABC, C2D ja E" --> "A B C C2 D E"
        //     Phase 2:    "A B C C2 D E" --> ["A","B","C","C2","D","E"]
        //     Phase 3:    assign clear text cave types on item based on the letter codes.

        // debug("Cave type: Finnish cave classes " + type);

        // Phase 1: simplify
        function prependSpace(match) { return " " + match };
        type = type.replace(/,| | ja /g,"").replace(/[A-Z]/g,prependSpace).replace(/ /,"");

        // Phase 2: create array
	// Example: "A B C C2 D E" --> ["A","B","C","C2","D","E"]
        var classArray = [];
        var caveClass = "";
        for ( const char of type ) {
            if (char.match(/[A-Z]/)) caveClass=char;
            if (char.match(/[0-9]/)) caveClass=caveClass+char;
            if (char == " " ) classArray.push(caveClass);
            }
        classArray.push(caveClass);

        // Phase 3: assign rock type, morphology etc.
        var found=false;
        for ( const aClass of classArray ) {
            for ( const knownType of finnishCaveTypes ) {
                if ( aClass === knownType.letter ) {
                    addSubactivities(item,"Caving",knownType.classification);
                    found=true;
                    break; // go to next aClass
                }	
            } 
        }

	if (!found) warn("Unrecognised Finnish cave category " + type);

        //debug("after adding cave type(s), the cave entry is " + JSON.stringify(item));
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
        if (lib.isString(rli.sa[activityindex])) {
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(source)) throw ("Source is not a string");
        if (item.s === source) return;
        else if (item.as === undefined) item.as = [source];
        else if (item.as.includes(source)) return;
        else item.as.push(source);
    }
    
    function addDescriptions(item,description,source) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isRecord(description)) throw ("Trying to add a description that is not a record");
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
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
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

        if (!isItem(mainitem)) throw ("Not a dataset item");
        if (!isItem(otheritem)) throw ("Not a dataset item");
        
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
            otheritem.rl[i].s = otheritem.s;
        }
        //debug("subsume: main item rl = " + JSON.stringify(mainitem.rl));
        //debug("subsume: other item rl = " + JSON.stringify(otheritem.rl));
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
                if (sa.includes("Rock-Unknown") && lib.includesAny(sa,rockSpecifics)) {
                    removeItemSubActivity(mainitem,"Caving","Rock-Unknown");
                }
                if (sa.includes("Morphology-Unknown") && lib.includesAny(sa,morphologySpecifics)) {
                    removeItemSubActivity(mainitem,"Caving","Morphology-Unknown");
                }
            }
        }
        
        if (hasItemActivity(mainitem,"Swimming")) {
            var sa = getItemSubActivities(mainitem,"Swimming");
            if (sa.includes("Water")) {
                var waterbodySpecifics = lib.getSwimmingWaterbodySubActivities(false);
                if (sa.includes("Waterbody-Unknown") && lib.includesAny(sa,waterbodySpecifics)) {
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
        if (!isTable(tab)) throw ("Not a table");
        if (!isItem(item)) throw ("Not a dataset item");
        if (tab[item.n] === undefined) {
            tab[item.n] = [];
        }
        tab[item.n].push(item);
    }

    function removeItemFromTable(tab,item) {
        if (!isTable(tab)) throw ("Not a table");
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!lib.isArray(seq))
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
        if (!lib.isArray(seq))
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
        if (!lib.isString(name)) throw ("Parameter name needs to be a string");
        if (!lib.isBoolean(caseSensitive)) throw ("Parameter caseSensitive needs to be a boolean");
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
        if (!lib.isArray(continents))
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
        if (!lib.isArray(countries))
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
        if (!lib.isArray(cities))
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
        if (!lib.isArray(activities))
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
        if (!lib.isArray(subactivities))
            throw ("Filter subactivities needs a list argument");
        if (subactivities === []) {
            return(filterFalse());
        } else {
            var newlist = [];
            for (var i = 0; i < subactivities.length; i++) {
                newlist.push(filterMatchSubActivity(activity,subactivities[i]));
            }
            return(filterOr(newlist));
        }
    }
    
    function filterMatchMultiSubActivities(activities,subactivities) {
        if (!lib.isArray(subactivities))
            throw ("Filter subactivities needs a list argument");
        if (subactivities === []) {
            return(filterFalse());
        } else {
            var newlist = [];
            for (var j = 0; j < activities.length; j++) {
                var activity = activities[j];
                for (var i = 0; i < subactivities.length; i++) {
                    newlist.push(filterMatchSubActivity(activity,subactivities[i]));
                }
            }
            return(filterOr(newlist));
        }
    }
    
    function filterMatchNotSubActivities(activity,subactivities) {
        if (!lib.isArray(subactivities))
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
            return(lib.trimspaces(lib.lastcommaseparatedpart(entry.n)));
        } else if (entry.c == "USA") {
            //debug("psgeodb::state US arm");
            return(lib.trimspaces(lib.lastcommaseparatedpart(entry.n)));
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
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.n);
    }

    function hasItemAlternativeNames(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.an === undefined ||
           item.an.length == 0) {
            return(false);
        } else {
            return(true);
        }
    }
    
    function getItemAlternativeNames(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        //debug("item.an = " + JSON.stringify(item.an));
        if (item.an === undefined) {
            return([]);
        } else {
            return(item.an);
        }
    }
    
    function getItemAlternativeNamesLowerCase(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var list = getItemAlternativeNames(item);
        var result = [];
        for (var i = 0; i < list.length; i++) {
            result.push(list[i].toLowerCase());
        }
        return(result);
    }
    
    function getItemDescription(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.d);
    }

    function getItemAlternativeDescriptions(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.ad === undefined) return([]);
        else return(item.ad);
    }
    
    function getItemLat(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.lat);
    }
    
    function getItemLon(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.lon);
    }
    
    function getItemAlternativeCoordinates(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.ac === undefined) return([]);
        else return(item.ac);
    }
    
    function getItemMap(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.m);
    }
    
    function getItemAlternativeMaps(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.am === undefined) return([]);
        else return(item.am);
    }
    
     function getItemLength(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.l);
    }

    function getItemLengthCategory(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.lc);
    }

    function getItemLengthCategoryMin(item) {
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.alt);
    }

    function getItemFuzzy(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.fz !== undefined && item.fz === true);
    }

    function getItemActivities(item) {
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
        var activities = getItemActivities(item);
        if (activities.includes(activity)) {
            return(true);
        } else {
            return(false);
        }
    }
            
    function hasItemActivities(item,activities) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isArray(activities)) throw ("Activities is not an array");
        var itemActivities = getItemActivities(item);
        for (var i = 0; i < activities.length; i++) {
            var activity = activities[i];
            if (itemActivities.includes(activity)) {
                return(true);
            }
        }
        return(false);
    }
    
    function hasItemSubActivity(item,activity,subactivity) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
        if (!lib.isString(subActivity)) throw ("SubActivity is not a string");
        for (var j = 0; j < item.rl.length; j++) {
            var rli = item.rl[j];
            for (var i = 0; i < rli.a.length; i++) {
                var a = rli.a[i];
                if (a === activity) {
                    addSubactivitiesAux(rli,i,[subActivity]);
                    //if (!rli.sa[i].includes(subActivity)) {
                    //    rli.sa[i].push(subActivity);
                    //}
                }
            }
        }
    }
    
    function removeItemSubActivity(item,activity,subActivity) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
        if (!lib.isString(subActivity)) throw ("SubActivity is not a string");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isArray(activities)) throw ("Activities is not an array");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isString(activity)) throw ("Activity is not a string");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (!lib.isArray(activities)) throw ("Activitis is not an array");
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
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.l === undefined) {
            return("approx");
        } else if (item.la === undefined) {
            return("approx");
        } else {
            return(item.la);
        }
    }

    function getItemReadingList(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.rl === undefined) return([]);
        else return(item.rl);
    }
    
    function hasItemReadingListUrl(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemURL(lis[i]) !== undefined) {
                return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListVideoUrl(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemVideoURL(lis[i]) !== undefined) {
                return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListImageUrl(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemImageURL(lis[i]) !== undefined) {
                return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListPublication(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemPublication(lis[i]) !== undefined) {
                return(true);
            }
        }
        return(false);
    }
    
    function hasItemReadingListPublicationUrl(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var lis = getItemReadingList(item);
        for (var i = 0; i < lis.length; i++) {
            if (getReadingListItemPublicationUrl(lis[i]) !== undefined) {
                return(true);
            }
        }
        return(false);
    }
    
    function getItemSource(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        return(item.s);
    }
    
    function getItemSources(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var result  = [item.s];
        var alternatives = getItemAlternativeSources(item);
        result = result.concat(alternatives);
        return(result);
    }
    
    function getItemAlternativeSources(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.as === undefined) return([]);
        else return(item.as);
    }

    function addItemRelationship(item,type,name) {
        //debug("addItemRelationship " + item.n + " " + type + " " + name);
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.rt === undefined) item.rt = [];
        if (item.rn === undefined) item.rn = [];
        item.rt.push(type);
        item.rn.push(name);
    }
    
    function getItemRelationshipTypes(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.rt === undefined || item.rn === undefined) return([]);
        else return(item.rt);
    }

    function getItemRelationshipTargets(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        if (item.rt === undefined || item.rn === undefined) return([]);
        else return(item.rn);
    }

    function isItemSideCave(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var list = getItemRelationshipTypes(item);
        var i;
        for (i = 0; i < list.length; i++) {
            var relation = list[i];
            if (relation == "sidecaveof") return(true);
        }
        return(false);
    }
    
    function isItemSecondary(item) {
        if (!isItem(item)) throw ("Not a dataset item");
        var list = getItemRelationshipTypes(item);
        var i;
        for (i = 0; i < list.length; i++) {
            var relation = list[i];
            if (relation == "secondaryto") return(true);
        }
        return(false);
    }

    function getItemMainCave(item) {
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
        return(getItemMainCave(item) !== undefined);
    }
    
    function getItemSideCaves(item)  {
        if (!isItem(item)) throw ("Not a dataset item");
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
        if (!isItem(item)) throw ("Not a dataset item");
        return(getItemSideCaves(item).length > 0);
    }

    function getItemRepresentativeImageURL(item) {

        //
        // Sanity checks
        //
        
        if (!isItem(item)) throw ("Not a dataset item");

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
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemTitle");
        return(article.t);
    }

    function getReadingListItemURL(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemURL");
        return(article.u);
    }

    function getReadingListItemVideoURL(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemURL");
        return(article.v);
    }
    
    function getReadingListItemImageURL(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemImageURL");
        return(article.i);
    }

    function getReadingListItemImageRepresentative(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemImageRepresentative");
        if (article.r === undefined) return(false);
        else if (article.r === 1) return(true);
        else return(false);
    }

    function getReadingListItemPublicationURL(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemPublicationURL");
        return(article.pu);
    }

    function getReadingListItemYear(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemYear");
        return(article.y);
    }

    function getReadingListItemMonth(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemMonth");
        return(article.m);
    }

    function getReadingListItemWith(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemWith");
        if (article.w === undefined)
            return([]);
        else
            return(article.w);
    }
    
    function getReadingListItemPublication(article) {
        if (!isReadingListItem(article)) throw ("Not a reading list item in getReadingListItemPublication");
        return(article.p);
    }

    //
    // Item descriptions ----------------------------------------------------------------------
    //

    function describeItem(lang,
                          item,
                          useHtml = true,
                          conserveSpace = false) {
        if (dbThis === undefined) throw ("No database object in db.describeItem");
        if (!isLang(lang)) throw ("Not a language object in db.describeItem");
        if (!isItem(item)) throw ("Not a dataset item in db.describeItem");
        return(dbText.describeItem(dbThis,lang,item,useHtml,conserveSpace));
    }
    
    //
    // Return the object ----------------------------------------------------------------------
    //
    
    var dbThis = {
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
        filterMatchMultiSubActivities: filterMatchMultiSubActivities,
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
        getItemAlternativeDescriptions,
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
        hasItemActivities: hasItemActivities,
        getItemSubActivities: getItemSubActivities,
        getItemSubActivitiesWithPrefix: getItemSubActivitiesWithPrefix,
        getItemSubActivitiesWithinSet: getItemSubActivitiesWithinSet,
        getItemMultiSubActivitiesWithinSet: getItemMultiSubActivitiesWithinSet,
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
        isItem: isItem,
        isReadingListItem: isReadingListItem,
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
    };

    return(dbThis);
}
