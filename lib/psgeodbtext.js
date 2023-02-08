//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

function PsgeoDBText(lib) {

    //
    // Some configuration settings ------------------------------------------------------------
    //

    const kmDigits = 1;
    const coordinateDigits = 5;
    
    const smallImageWidth = 'width="120"';
    const largeImageWidth = 'width="140"';
    
    //
    // The following table determines how to print sub-activities,
    // e.g., Caving has the sub-activities "Morphology-Boulders",
    // "Morphology-Karst", and so on. We want to be able to print
    // these as natural language text. To do so, we need to understand
    // what activities there are (e.g., "Skiing" or "Caving") and what
    // sub-activities in them should be printed in which way.
    //
    // The sub-activities may come in many different groups, e.g., under
    // Skiing there's sub-activities for material (e.g., "Snow" and "Sand")
    // and method of getting up the hill (e.g., "Lifts", "Helicopter").
    //
    // The table provides a lot of flexibility to control how the
    // sub-activity groups are represented in natural language.  Some
    // groups might be joined together, e.g., if A, B, and C form one
    // group and D, E, and F another
    //
    // In the table there is one entry for each activity (or a group
    // of activities, if they share the same sub-activities, as Skiing
    // and Snowboarding do). Each of these entries has the following
    // structure:
    //
    //    { activities: ..., subActivitySets: ... }
    //
    //  where the fields are as follows:
    //
    //  - activities         A list of strings, representing the activities.
    //  - subActivitySets    A list of records, each one representing one sub-activity group.
    //
    //  Each subactivity group record takes the following form:
    //
    //    {
    //      subActivities: ..,
    //      defaultItem: ...,
    //      omitEmpty: ...,
    //      omitDefault: ...,
    //      headerTextIds: ...,
    //      colonAfterHeader: ...,
    //      itemTextId: ...,
    //      useCommaAsItemSeparator: ...,
    //      sentence: ...,
    //      useCommaAfterList: ...
    //    }
    //
    //  where the fields are as follows:
    //
    // - subActivities The sub-activities of interest
    //
    // - defaultItem   The value for an item which does not need to
    //                 described.  If the list is empty or contains
    //                 only this, nothing is printed.  Use the value
    //                 undefined here if an empty item does not make
    //                 sense.
    //
    // - omitEmpty     Omit the entire item list if there's zero values.
    //
    // - omitDefault   Omit the entire item list if there's only the
    //                 default value in the list.
    //
    // - headerTextIds The textid values for the language object, to
    //                 be used for printing a header, e.g.,
    //                 ["ski","snowboard","slide"].
    //
    //                 This field should contain an array of strings,
    //                 with the array being equal to the length of the
    //                 activities field.  Each element of the array
    //                 represent the headerTextId for the given
    //                 activity.
    //
    // - colonAfterHeader
    //                 A boolean, true if the header should follow a colon and a space.
    //
    // - itemTextId    The textid for the language object, to be used for
    //                 printing individual items, e.g, "skiMaterial"
    //
    // - sentence      A boolean. True if we should make each separate sub
    //                 activity set a different sentence, false if
    //                 they should be just joined with "," or "and"
    //                 depending on the setting for
    //                 "useCommaAfterList" parameter.
    //
    // - useCommaAfterList
    //                 A boolean. True if we should use comma to separate multiple sub
    //                 activity sets. False if we should use an "and".
    //

    const subActivityDescriptionTable = [

        //
        // Caving: here we have three sets of printable
        // sub-activities: rock type/material (e.g., Rock-Limestone,
        // Man-Made, etc), morphology (e.g., Morphology-Boulders,
        // Morphology-Karst, etc.), and what movement activity was
        // going on (Basic, Diving, SRT, etc.).
        //
        
        { activities: ["Caving"],
          subActivitySets: [
              { subActivities: lib.getCavingRockTypeAndOtherMaterialSubActivities(),
                defaultItem: "Rock-Unknown",
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: ["rock"],
                colonAfterHeader: true,
                itemTextId: "rockTypeAndOtherMaterial",
                useCommaAsItemSeparator: false,
                sentence: true,
                useCommaAfterList: false},
              { subActivities: lib.getCavingMorphologySubActivities(),
                defaultItem: "Morphology-Unknown",
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: ["morphology"],
                colonAfterHeader: true,
                itemTextId: "morphology",
                useCommaAsItemSeparator: false,
                sentence: true,
                useCommaAfterList: false},
              { subActivities: lib.getCavingMovementAndNonMovementActivitySubActivities(),
                defaultItem: "Basic",
                omitEmpty: true,
                omitDefault: true,
                headerTextIds: ["caveActivity"],
                colonAfterHeader: true,
                itemTextId: "cavingActivity",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false}]},

        //
        // Sauna: here we have the sauna type (Smoke, Normal, etc.).
        //
        
        { activities: ["Sauna"],
          subActivitySets: [
              { subActivities: lib.getSaunaTypeSubActivities(true),
                defaultItem: "Normal",
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: [undefined],
                colonAfterHeader: false,
                itemTextId: "saunaType",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false
              }]},

        //
        // Climbing: here we have the climbing type (Mountain, Wall, etc.)
        //
        
        { activities: ["Climbing"],
          subActivitySets: [
              { subActivities: lib.getClimbingTypeSubActivities(true),
                defaultItem: undefined,
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: ["climbingTypeIs"],
                colonAfterHeader: false,
                itemTextId: "climbingType",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false}]},

        //
        // Swimming: here we have two sub-activity groups, the place
        // (e.g., indoor/outdoor, lake, sea, etc.) and the material
        // (e.g., Water, Ice, Balls).
        //
        
        { activities: ["Swimming"],
          subActivitySets: [
              { subActivities: lib.getSwimmingPlaceSubActivities(true),
                defaultItem: undefined,
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: ["swimming"],
                colonAfterHeader: false,
                itemTextId: "swimmingPlace",
                useCommaAsItemSeparator: true,
                sentence: false,
                useCommaAfterList: true},
              { subActivities: lib.getSwimmingMaterialSubActivities(true),
                defaultItem: "Water",
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: [undefined],
                colonAfterHeader: false,
                itemTextId: "swimmingMaterial",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false}]},

        //
        // Skiing and related activities (Snowboarding and Sliding)
        // have three groups of sub-activity tags. The first subgroup
        // is about the place (indoor/outdoor). The second one is
        // about what material one skis on (e.g., Snow, Grass, Sand,
        // etc.). The third one is about the method of going up the
        // hill (e.g., Lifts, Hiking, etc.).
        //
        
        { activities: ["Skiing","Snowboarding","Sliding"],
          subActivitySets: [
              { subActivities: lib.getSkiingPlaceSubActivities(true),
                defaultItem: "Outdoor",
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: ["ski","snowboard","slide"],
                colonAfterHeader: false,
                itemTextId: "skiPlace",
                useCommaAsItemSeparator: true,
                sentence: false,
                useCommaAfterList: true},
              { subActivities: lib.getSkiingSubstanceSubActivities(true),
                defaultItem: "Snow",
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: [undefined,undefined,undefined],
                colonAfterHeader: false,
                itemTextId: "skiMaterial",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false},
              { subActivities: lib.getSkiingUphillSubActivities(true),
                defaultItem: "Lifts",
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: ["up","up","up"],
                colonAfterHeader: false,
                itemTextId: "skiUphill",
                useCommaAsItemSeparator: true,
                sentence: true,  
                useCommaAfterList: false}]},

        //
        // Biking: here we have two subgroups: the type of the bike
        // (e.g., MTB) and the place of biking (e.g., trail, city,
        // etc.)
        //
        
        { activities: ["Biking"],
          subActivitySets: [
              { subActivities: lib.getBikingBikeTypeSubActivities(true),
                defaultItem: undefined,
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: ["biking"],
                colonAfterHeader: false,
                itemTextId: "bikeType",
                useCommaAsItemSeparator: true,
                sentence: false,
                useCommaAfterList: false},
              { subActivities: lib.getBikingBikeTrackSubActivities(true),
                defaultItem: undefined,
                omitEmpty: false,
                omitDefault: false,
                headerTextIds: [undefined],
                colonAfterHeader: false,
                itemTextId: "bikeTrack",
                useCommaAsItemSeparator: true,
                sentence: false,
                useCommaAfterList: false}]},

        //
        // Urban exploration: here we have only the target of the
        // exploration: bunkers, mines, etc.
        //
        
        { activities: ["Urban-Exploration"],
          subActivitySets: [
              { subActivities: lib.getUrbanexTargetSubActivities(true),
                defaultItem: "None",
                omitEmpty: true,
                omitDefault: false,
                headerTextIds: ["target"],
                colonAfterHeader: false,
                itemTextId: "urbanexTarget",
                useCommaAsItemSeparator: true,
                sentence: true,
                useCommaAfterList: false}]}
    ];
    
    //
    // Some printing style controls, to keep outputs short on mobile
    //
    
    const publicationNamesToShorten = [
        { pattern: /Suomen luolat. Kesäläinen, Kejonen, Kielosto, Salonen, Lahti. 2015. Salakirjat. ISBN 978-952-5774-80-1/,
          shorter: "Suomen luolat. Kesäläinen et al. Salakirjat" }
    ];

    //
    // Internal utility methods ---------------------------------------------------------------
    //

    function isDb(obj) {
        if (!lib.isRecord(obj)) return(false);
        if (obj.setFilter === undefined) return(false);
        return(true);
    }
    
    function isLang(obj) {
        if (!lib.isRecord(obj)) return(false);
        if (obj.getLanguage === undefined) return(false);
        return(true);
    }
    
    function distanceInUnits(x) {
        if (x < 2000) {
            return(x.toString() + "m");
        } else {
            return((x/1000.0).toFixed(kmDigits) + "km");
        }
    }
    
    function getItemDescriptionLang(db,item,lang) {
        if (!isDb(db)) throw ("Not a database");
        if (!lib.isString(lang)) throw ("Language is not a string");
        if (lang.length != 2) throw ("Language is not a string of 2 characters");
        if (!db.isItem(item)) throw ("Not a dataset item");
        var candidate = item.d;
        if (candidate === undefined) return(undefined);
        if (lib.isString(candidate)) return(candidate);
        candidate = item.d[lang];
        if (candidate !== undefined)
            return(candidate);
        candidate = item.d.en;
        if (candidate !== undefined)
            return(candidate);
        return(undefined);
    }
    
    function getItemAlternativeDescriptionsLang(db,item,lang) {
        if (!lib.isString(lang)) throw ("Language is not a string");
        if (lang.length != 2) throw ("Language is not a string of 2 characters");
        if (!db.isItem(item)) throw ("Not a dataset item");
        var input = db.getItemAlternativeDescriptions(item,lang);
        var result = [];
        for (var i = 0; i < input.length; i++) {
            var one = input[i];
            if (!lib.isRecord(one)) throw ("Alternative description entry is not a record");
            if (lib.isString(one.d)) {
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
    // Item descriptions internal functions ---------------------------------------------------
    //

    function descriptionTitle(lang,text,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTitle");
        if (!lib.isString(text)) throw ("Text is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        return(useHtml ? lib.htmlParagraph(lib.htmlBold(text)) : (text.toUpperCase() + "\n\n"));
    }
    
    function descriptionImage(lang,name,url,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionImage");
        if (!lib.isString(url)) throw ("URL is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (useHtml) {
            var imageLink = descriptionNameToURL(lang,name,"image",useHtml,conserveSpace);
            var width = conserveSpace ? smallImageWidth : largeImageWidth;
            var base = lib.htmlImage(url,width);
            return(lib.htmlLink(base,imageLink,false));
        } else {
            return("");
        }
    }

    function descriptionText(lang,text,useHtml,conserveSpace) {
        //debug("descriptionText " + text);
        if (!isLang(lang)) throw ("Not a language object in descriptionText");
        if (!lib.isString(text)) throw ("Text is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (text.length == 0) return("");
        if (useHtml) {
            return(lib.htmlParagraph(text));
        } else {
            return(text + "\n\n");
        }
    }

    function descriptionTextAdd(lang,text1,text2,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextAdd");
        if (!lib.isString(text1)) throw ("Text1 is not a string");
        if (!lib.isString(text2)) throw ("Text2 is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (text1.length == 0) {
            return(text2);
        } else if (text2.length == 0) {
            return(text1);
        } else  {
            return(text1 + " " + text2);
        }
    }
    
    function descriptionTextLine(lang,text,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextLine");
        if (!lib.isString(text)) throw ("Text is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        return(text + (useHtml ? lib.htmlBreak() : "\n"));
    }

    function descriptionNameToURL(lang,name,what,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextLine");
        if (!lib.isString(name)) throw ("Name is not a string");
        if (!lib.isString(what)) throw("what is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        switch (what) {
        case "image": return("?i=" + encodeURI(name));
        case "model": return("?o=" + encodeURI(name));
        case "place": return("?p=" + encodeURI(name));
        default:
            throw ("Invalid URL type: " + what);
        }
    }
    
    function descriptionLink(lang,link,url,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextAndLink");
        if (!lib.isString(link)) throw ("Link is not a string");
        if (!lib.isString(url)) throw ("URL is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (useHtml) {
            return(lib.htmlLink(link,url,true));
        } else {
            return(link + " (" + url + ")");
        }
    }

    function descriptionTextAndLink(lang,text,link,url,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextAndLink");
        if (!lib.isString(text)) throw ("Text is not a string");
        if (!lib.isString(link)) throw ("Link is not a string");
        if (!lib.isString(url)) throw ("URL is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (useHtml) {
            return(text + lib.htmlLink(link,url,true));
        } else {
            return(text + link + " (" + url + ")");
        }
    }

    function descriptionTextAndLinkAndText(lang,text1,link,url,text2,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionTextAndLinkAndText");
        if (!lib.isString(text1)) throw ("Text1 is not a string");
        if (!lib.isString(link)) throw ("Link is not a string");
        if (!lib.isString(url)) throw ("URL is not a string");
        if (!lib.isString(text2)) throw ("Text2 is not a string");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (useHtml) {
            return(text1 + lib.htmlLink(link,url,true) + text2);
        } else {
            return(text1 + link + " " + url + text2);
        }
    }

    function descriptionCoordinates(lang,lat,lon,includetext,useHtml,conserveSpace) {
        if (!isLang(lang)) throw ("Not a language object in descriptionCoordinates");
        if (!lib.isBoolean(includetext)) throw ("Includetext is not a boolean");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
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

    function itemDescriptionAuxRLItemAuthorsInitials(name) {
        var spaceIndex = name.indexOf(" ");
        if (name.length <= 3 || spaceIndex < 1 || spaceIndex + 1 == name.length) return("NN");
        var firstname = name[0].toUpperCase();
        var lastname = name[spaceIndex+1].toUpperCase();
        return(firstname + lastname);
    }

    function itemDescriptionAuxRLItemAuthors(db,lang,rli) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemAuthors");
        if (!db.isReadingListItem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItemAuthors");
        var auth = db.getReadingListItemWith(rli);

        var initialsList=[];
        for ( const author of auth ) {
            initialsList.push(itemDescriptionAuxRLItemAuthorsInitials(author));
        }
        return(lang.listToText(initialsList,true,3)); // truncate to three, use "&" instead of "and"
    }
    
    function itemDescriptionAuxRLItemAuthorsAndYear(db,lang,rli,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemAuthorsAndYear");
        if (!db.isReadingListItem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItemAuthorsAndYear");
        if (conserveSpace) return("");
        var authpart = itemDescriptionAuxRLItemAuthors(db,lang,rli);
        if (db.getReadingListItemYear(rli) === undefined) {
            if (authpart === "") return("");
            else return(" (" + authpart + ")");
        } else {
            var year = db.getReadingListItemYear(rli).toString();
            if (year.length == 4) {
                var shortyear = "'" + year.substring(2);
                if (authpart !== "") authpart += " ";
                return(" (" + authpart + shortyear + ")");
            }
        }
    }
    
    function itemDescriptionAuxRLItemPublication(db,lang,item,rli,authorsandyear,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAuxRLItemPublication");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!db.isReadingListItem(rli)) throw ("Not a reading list item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (db.getReadingListItemPublication(rli) !== undefined) {
            var pretext = "";
            if (db.getReadingListItemTitle(rli) === undefined ||
                db.getReadingListItemTitle(rli) === "") {
                pretext = lang.capitalize(lang.getText("publicationReference")) + ": ";
            } else {
                pretext =
                    lang.capitalize(lang.getText("publicationReference")) + ": " +
                    lang.capitalize(db.getReadingListItemTitle(rli)) + ". ";
            }
            var pubitself = db.getReadingListItemPublication(rli);
            if (conserveSpace) {
                for (var i = 0; i < publicationNamesToShorten.length; i++) {
                    const shorten = publicationNamesToShorten[i];
                    pubitself = pubitself.replace(shorten.pattern,shorten.shorter);
                }
            }
            if (db.getReadingListItemPublicationURL(rli) !== undefined) {
                return(descriptionTextAndLinkAndText(lang,
                                                     pretext,
                                                     pubitself,
                                                     db.getReadingListItemPublicationURL(rli),
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
    
    function itemDescriptionAuxRLItem(db,lang,item,rli,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAuxRLItem");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!db.isReadingListItem(rli)) throw ("Not a reading list item in itemDescriptionAuxRLItem");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        var html = "";
        var authorsandyear = itemDescriptionAuxRLItemAuthorsAndYear(db,lang,rli,conserveSpace);
        if (db.getReadingListItemURL(rli) !== undefined) {
            var videopart = "";
            if (db.getReadingListItemVideoURL(rli) !== undefined) {
                videopart += descriptionTextAndLink(lang,
                                                    " " + lang.getText("and") + " ",
                                                    lang.getText("video"),
                                                    db.getReadingListItemVideoURL(rli),
                                                    useHtml,
                                                    conserveSpace);
            }
            html += descriptionTextAndLinkAndText(lang,
                                                  "",
                                                  db.getReadingListItemTitle(rli),
                                                  db.getReadingListItemURL(rli),
                                                  videopart + authorsandyear,
                                                  useHtml,
                                                  conserveSpace);
        } else  {
            if (db.getReadingListItemVideoURL(rli) !== undefined) {
                if (html.length > 0) {
                    html = descriptionTextLine(lang,html,useHtml,conserveSpace);
                }
                videopart = " (" + lang.getText("video") + ")",
                html += descriptionTextAndLinkAndText(lang,
                                                      "",
                                                      db.getReadingListItemTitle(rli),
                                                      db.getReadingListItemVideoURL(rli),
                                                      videopart + authorsandyear,
                                                      useHtml,
                                                      conserveSpace);
            }
        }
        var pubhtml = itemDescriptionAuxRLItemPublication(db,lang,item,rli,authorsandyear,useHtml,conserveSpace);
        if (html.length > 0 && pubhtml.length > 0) {
            html = descriptionTextLine(lang,html,useHtml,conserveSpace);
        }
        html += pubhtml;
        return(html);
    }
    
    function itemDescriptionGenericCharacteristics(db,
                                                   lang,
                                                   item,
                                                   useHtml,
                                                   conserveSpace) {
        
        // lang            The language object
        // item            The dataset item we are looking at
        // useHtml         A boolean. True if we should return HTML, false if plain text.
        // conserveSpace   A boolean. True if we should attempt to be as brief as possible, false otherwise.
        
        //
        // Sanity checks
        //
        
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionGenericCharacteristics");
        if (!db.isItem(item)) throw ("Not a dataset item in itemDescriptionGenericCharacteristics");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean in itemDescriptionGenericCharacteristics");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean in itemDescriptionGenericCharacteristics");

        //
        // Go through the table and invoke the characteristic-printing process for each activity
        //

        var result = "";
        for (var i = 0; i < subActivityDescriptionTable.length; i++) {
            const entry = subActivityDescriptionTable[i];
            var one =
                itemDescriptionGenericSubActivities(db,lang,
                                                    item,
                                                    entry.activities,
                                                    entry.subActivitySets,
                                                    useHtml,
                                                    conserveSpace);
            result = descriptionTextAdd(lang,result,one,useHtml,conserveSpace);
        }

        //
        // Done. Return any results that were collected
        //
        
        return(result);
    }
    
    function itemDescriptionGenericSubActivities(db,
                                                 lang,
                                                 item,
                                                 activities,
                                                 subActivitySets,
                                                 useHtml,
                                                 conserveSpace) {
        
        // lang            The language object
        // item            The dataset item we are looking at
        // activities      The main activities we are looking at, e.g., ["Skiing","Snowboarding"]
        // subActivitySets A list of sets, with each set containing the following fields:
        // - subActivities The sub-activities of interest
        // - defaultItem   The value for an item which does not need to described.
        //                 If the list is empty or contains only this, nothing is printed.
        //                 Use the value undefined here if an empty item does not make sense.
        // - omitEmpty     Omit the entire item list if there's zero values.
        // - omitDefault   Omit the entire item list if there's only the default value
        //                 in the list.
        // - headerTextIds The textid for the language object, to be used for printing a
        //                 header, e.g., "ski"
        // - colonAfterHeader
        //                 A boolean, true if the header should follow a colon and a space.
        // - itemTextId    The textid for the language object, to be used for printing individual
        //                 items, e.g, "skiMaterial"
        // - sentence      A boolean. True if we should make each separate sub activity set a
        //                 different sentence, false if they should be just joined with "," or
        //                 "and" depending on the setting for "useCommaAfterList" parameter.
        // - useCommaAfterList
        //                 A boolean. True if we should use comma to separate multiple sub
        //                 activity sets. False if we should use an "and".
        // useHtml         A boolean. True if we should return HTML, false if plain text.
        // conserveSpace   A boolean. True if we should attempt to be as brief as possible, false otherwise.

        //
        // Sanity checks
        //
        
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionUrbanExplorationTarget");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isArray(subActivitySets)) throw ("Not a list of sub activity sets");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");

        //
        // Do we even have the activity in question?
        //

        if (!db.hasItemActivities(item,activities)) {
            return("");
        }
        
        //
        // Determine whether all sets are empty/default
        //
        
        var hasContent = false;
        var subActivityEmpty = [];
        var subActivityDefault = [];
        for (var k = 0; k < subActivitySets.length; k++) {
            var subActivitySet = subActivitySets[k];
            //debug("subActivitySet = " + JSON.stringify(subActivitySet));
            if (subActivitySet.subActivities === undefined) throw ("SubActivitySet is missing a field 1");
            if (subActivitySet.itemTextId === undefined) throw ("SubActivitySet is missing a field 4");
            if (!lib.isBoolean(subActivitySet.omitEmpty)) throw("omitEmpty is not a boolean");
            if (!lib.isBoolean(subActivitySet.omitDefault)) throw("omitDefault is not a boolean");
            if (!lib.isBoolean(subActivitySet.sentence)) throw("sentence is not a boolean");
            if (!lib.isBoolean(subActivitySet.colonAfterHeader)) throw("colonAfterHeader is not a boolean");
            if (!lib.isBoolean(subActivitySet.useCommaAsItemSeparator)) throw("useCommaAsItemSeparator is not a boolean");
            if (!lib.isBoolean(subActivitySet.useCommaAfterList)) throw("useCommaAfterList is not a boolean");
            var items = db.getItemMultiSubActivitiesWithinSet(item,activities,subActivitySet.subActivities);
            subActivityEmpty[k] = (items.length == 0);
            subActivityDefault[k] = (items.length == 1 &&
                                     subActivitySet.defaultItem !== undefined &&
                                     items[0] === subActivitySet.defaultItem);
            if (!subActivityEmpty[k] && !subActivityDefault[k]) {
                hasContent = true;
            }
        }
        
        //
        // If no content, return nothing
        //
        
        if (conserveSpace && !hasContent) {
            return("");
        }
        
        //
        // Otherwise, go through the sets again and print the information in them.
        //
        
        var result = "";
        for (var k = 0; k < subActivitySets.length; k++) {

            //
            // First fetch the various parametrs
            //
            
            var subActivitySet = subActivitySets[k];
            var items = db.getItemMultiSubActivitiesWithinSet(item,activities,subActivitySet.subActivities);
            var itemSeparatorRegular =
                subActivitySet.useCommaAsItemSeparator ? ", " : "/";
            var itemSeparatorFinal =
                subActivitySet.useCommaAsItemSeparator ? (" " + lang.getText("and") + " ") : "/";

            //
            // Then see if we need to skip this list, e.g., if it is empty
            //
            
            if (items.length == 0 && subActivitySet.omitEmpty) continue;
            if (conserveSpace && (subActivityEmpty[k] || subActivityDefault[k])) continue;
            if (subActivitySet.omitDefault && subActivityDefault[k]) continue;
            if (result.length > 0 && result[result.length-1] != " ") {
                result += " ";
            }

            //
            // Print the header for the list, if any
            //

            if (subActivitySet.headerTextIds.length != activities.length) {
                throw ("header text ID array and activity array lengths do not match");
            }
            var activityIndex = indexOfActivityPresent(db,item,activities);
            if (activityIndex === undefined) throw ("Inconsistent activity");
            var headerTextId =  subActivitySet.headerTextIds[activityIndex];
            if (headerTextId !== undefined) {
                var header = lang.getText(headerTextId);
                if (k == 0 || subActivitySet.sentence) {
                    header = lang.capitalize(header);
                }
                result += header;
                if (subActivitySet.colonAfterHeader) {
                    result += ":";
                }
                result += " ";
            }

            //
            // Print the individual items in the list
            //
            
            for (var i = 0; i < items.length; i++) {
                if (i > 0 && i < items.length - 1) result += itemSeparatorRegular;
                else if (i > 0 && i == items.length -1) result += itemSeparatorFinal;
                result += lang.getTextCollectionItem(subActivitySet.itemTextId,items[i].toLowerCase());
                // For the first ever item, if there's no header text, we need to capitalize the text
                if (k == 0 && i == 0 && headerTextId === undefined) {
                    result = lang.capitalize(result);
                }
            }

            //
            // Figure out how to end the list, e.g., add a dot at the
            // end if we are finishing a sentence-style list.
            //
            
            if (subActivitySet.sentence || k + 1 == subActivitySets.length) {
                result += ".";
            } else if (subActivitySet.useCommaAfterList) {
                result += ",";
            } else {
                var separator = lang.getText("and");
                result = descriptionTextAdd(lang,result,separator,useHtml,conserveSpace);
            }
            
        }

        //
        // All lists done, just return the result
        //
        
        return(result);
    }

    function indexOfActivityPresent(db,item,activities) {
        if (!isDb(db)) throw ("Not a database object");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isArray(activities)) throw ("Not an array");
        for (var i = 0; i < activities.length; i++) {
            if (db.hasItemActivity(item,activities[i])) return(i);
        }
        return(undefined);
    }
    
    function itemDescriptionTextMainCave(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionTextMainCave");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (conserveSpace) return("");
        if (db.hasItemMainCave(item)) {
            //debug("main cave");
            return(descriptionTextAndLink(lang,
                                          lang.capitalize(lang.getText("mainCave") + ": "),
                                          simplifyName(item.n,db.getItemMainCave(item)),
                                          descriptionNameToURL(lang,
                                                               db.getItemMainCave(item),
                                                               "place",
                                                               useHtml,
                                                               conserveSpace),
                                          useHtml,
                                          conserveSpace));
        } else {
            return("");
        }
    }

    function itemDescriptionTextSideCaves(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionTextSideCaves");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        var htmlInside = "";
        var sidecaves =  db.getItemSideCaves(item);
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
                                            descriptionNameToURL(lang,sidecave,"place",useHtml,conserveSpace),
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
    
    function itemDescriptionAlternateNames(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAlternativeNames");
        if (!db.isItem(item)) throw ("Not a dataset item in itemDescriptionAlternativeNames");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        if (conserveSpace) {
            return("");
        } else if (db.hasItemAlternativeNames(item)) {
            var an = simplifyNames(item.n,db.getItemAlternativeNames(item));
            return(lang.capitalize(lang.getText("alternativeNames")) +
                   ": " +
                   lang.listToText(an) +
                   ".");
        } else {
            return("");
        }
    }
    
    function itemDescriptionCavingMapLength(db,lang,item,useHtml,conserveSpace) {

        //
        // Sanity checks
        //
        
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionCavingCharacteristics");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        
        var html = "";
        
        //
        // Output map
        //
        
        var cavemap = db.getItemMap(item);
        if (cavemap !== undefined) {
            var maptext = "";
            maptext += descriptionTextAndLink(lang,
                                              lang.capitalize(lang.getText("caveMap") + ": "),
                                              lang.getText("map"),
                                              cavemap,
                                              useHtml,
                                              conserveSpace);
            maptext += itemDescriptionAlternativeMaps(db,lang,item,useHtml,conserveSpace);
            maptext += ".";
            html += maptext;
        }
        
        //
        // Output model
        //
        
        var cavemodel = db.getItemModel(item);
        if (cavemodel !== undefined) {
            if (html.length > 0) html += " ";
            var modeltext = "";
            const viewableModel = /[.][gG][lL][bB]/;
            if (useHtml && db.getItemSpecificModel(item,viewableModel) !== undefined) {
                const queryUrl = descriptionNameToURL(lang,db.getItemName(item),"model",useHtml,conserveSpace);
                modeltext += descriptionTextAndLink(lang,
                                                    lang.capitalize(lang.getText("caveModel") + ": "),
                                                    lang.getText("show"),
                                                    queryUrl,
                                                    useHtml,
                                                    conserveSpace);
            } else {
                modeltext += descriptionTextAndLink(lang,
                                                    lang.capitalize(lang.getText("caveModel") + ": "),
                                                    itemDescriptionModelType(lang,cavemodel),
                                                    cavemodel,
                                                    useHtml,
                                                    conserveSpace);
                modeltext += itemDescriptionAlternativeModels(db,lang,item,useHtml,conserveSpace);
            }
            modeltext += ".";
            html += modeltext;
        }
        
        //
        // Output cave characteristics about length, rock and morphology
        //
        
        if (db.getItemLength(item) !== undefined) {
            if (html.length > 0) html += " ";
            var lengthtext = distanceInUnits(db.getItemLength(item));
            if (db.getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
            lengthtext += ".";
            html +=
                lang.capitalize(lang.getText("length")) +
                ": " +
                lengthtext;
        } else if (db.getItemLengthCategory(item) !== undefined) {
            var lengthtext = "";
            if (db.getItemLengthCategoryMin(item) !== undefined &&
                db.getItemLengthCategoryMax(item) !== undefined) {
                lengthtext += db.getItemLengthCategoryMin(item).toString() + "-";
                lengthtext += db.getItemLengthCategoryMax(item).toString() + " m";
            } else if (db.getItemLengthCategoryMin(item) === undefined) {
                lengthtext += "-" + db.getItemLengthCategoryMax(item).toString() + " m";
            } else {
                lengthtext += db.getItemLengthCategoryMin(item).toString() + "- m";
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
    
    function itemDescriptionAlternativeMaps(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAlternativeMaps");
        if (!db.isItem(item)) throw ("Not a dataset item");
        var result = "";
        var am = db.getItemAlternativeMaps(item);
        for (var i = 0; i < am.length; i++) {
            var cavemap = am[i];
            result += ", ";
            result += descriptionTextAndLink(lang,
                                             "",
                                             lang.getText("map"),
                                             cavemap,
                                             useHtml,
                                             conserveSpace);
        }
        return(result);
    }

    function itemDescriptionAlternativeModels(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAlternativeModels");
        if (!db.isItem(item)) throw ("Not a dataset item");
        var result = "";
        var am = db.getItemAlternativeModels(item);
        for (var i = 0; i < am.length; i++) {
            var cavemodel = am[i];
            var desc = itemDescriptionModelType(lang,cavemodel);
            if (desc == "ICON") continue;
            result += ", ";
            result += descriptionTextAndLink(lang,
                                             "",
                                             desc,
                                             cavemodel,
                                             useHtml,
                                             conserveSpace);
        }
        return(result);
    }
    
    function itemDescriptionModelType(lang,model) {
        var base = lang.getText("model");
        var modellower = model.toLowerCase();
        if (modellower.search(/[.]glb/) != -1) {
            return("GLB " + base)
        } else if (modellower.search(/[.]mp4/) != -1) {
            return("MP4 " + base)
        } else if (modellower.search(/[.]blend/) != -1) {
            return("BLENDER " + base)
        } else if (modellower.search(/[.]dxf/) != -1) {
            return("DXF " + base)
        } else if (modellower.search(/[.]3d/) != -1) {
            return("Aven " + base)
        } else if (modellower.search(/icon[.]jpg/) != -1) {
            return("ICON " + base)
        } else if (modellower.search(/[.]jpg/) != -1) {
            return("JPG " + base)
        } else if (modellower.search(/[.]obj/) != -1 || modellower.search(/obj[.]zip/) != -1) {
            return("OBJ " + base)
        } else if (modellower.search(/[.]stl/) != -1 || modellower.search(/stl[.]zip/) != -1) {
            return("STL " + base)
        } else {
            return(base);
        }
    }
    
    function itemDescriptionAlternativeCoordinates(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionAlternativeCoordinates");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        var ac = db.getItemAlternativeCoordinates(item);
        if (ac.length == 0 || conserveSpace) {
            return("");
        }
        
        var result = "";
        result += " (";
        result += lang.capitalize(db.getItemSource(item));
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
            var distance = lib.coordinatesDistance(db.getItemLat(item),
                                                   db.getItemLon(item),
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

    function itemDescriptionReadingList(db,lang,item,rl,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionReadingList");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        var htmlinside = "";
        var first = true;
        for (var i = 0; i < rl.length; i++) {
            var thishtml = itemDescriptionAuxRLItem(db,lang,item,rl[i],useHtml,conserveSpace);
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

    function itemDescriptionTheDescription(db,lang,item,useHtml,conserveSpace) {
        if (!isDb(db)) throw ("Not a database object");
        if (!isLang(lang)) throw ("Not a language object in itemDescriptionTheDescription");
        if (!db.isItem(item)) throw ("Not a dataset item");
        if (!lib.isBoolean(useHtml)) throw("useHtml is not a boolean");
        if (!lib.isBoolean(conserveSpace)) throw("conserveSpace is not a boolean");
        var descr = getItemDescriptionLang(db,item,lang.getLanguage());
        if (descr !== undefined) {
            var descrtexts = "";
            var alternates = conserveSpace ? [] : getItemAlternativeDescriptionsLang(db,item,lang.getLanguage());
            if (alternates.length > 0) {
                descr = lang.capitalize(db.getItemSource(item)) + ": " + descr;
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

    function describeItem(db,
                          lang,
                          item,
                          useHtml = true,
                          conserveSpace = false) {

        //
        // This function generates the popup that is shown while clicking/tapping on a marker 
        //

        //
        // Sanity checks
        //
        
        if (!isDb(db)) throw ("Not a database object in dbtext.describeItem");
        if (!isLang(lang)) throw ("Not a language object in dbtext.describeItem");
        if (!db.isItem(item)) throw ("Not a dataset item in dbtext.describeItem");
        
        //
        // Setup for producing text
        //
        
        var rl = db.getItemReadingList(item);
        var html = "";

        //
        // Output name and picture (if any)
        //
        
        html +=  descriptionTitle(lang,db.getItemName(item),useHtml,conserveSpace);
        if (db.hasItemReadingListImageUrl(item)) {
            var imageUrl = db.getItemRepresentativeImageURL(item);
            html +=  descriptionImage(lang,db.getItemName(item),imageUrl,useHtml,conserveSpace);
        }
        
        //
        // Output description, if any. Note that there can be
        // alternate descriptions, so we may have to output many.
        //

        html += itemDescriptionTheDescription(db,lang,item,useHtml,conserveSpace);

        //
        // Output coordinates
        //

        if (db.getItemFuzzy(item)) {
            html += descriptionText(lang,
                                    lang.capitalize(lang.getText("locationSecret")),
                                    useHtml,
                                    conserveSpace);
        } else {
            var coordstext = descriptionCoordinates(lang,
                                                    db.getItemLat(item),
                                                    db.getItemLon(item),
                                                    true,
                                                    useHtml,
                                                    conserveSpace);
            coordstext += itemDescriptionAlternativeCoordinates(db,lang,item,useHtml,conserveSpace);
            html += (useHtml ? lib.htmlParagraph(coordstext) : (coordstext + "\n\n"));
        }

        var characteristics = "";
        
        //
        // Output any caving-related special characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionCavingMapLength(db,lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any generic characteristics
        //
        
        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionGenericCharacteristics(db,lang,item,useHtml,conserveSpace),
                                             useHtml,conserveSpace);
        
        //
        // Output any alternate names, if any
        //

        characteristics = descriptionTextAdd(lang,
                                             characteristics,
                                             itemDescriptionAlternateNames(db,lang,item,useHtml,conserveSpace),
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
        
        html += itemDescriptionReadingList(db,lang,item,rl,useHtml,conserveSpace);
        
        //
        // Output any cave group related information
        //
        
        html += itemDescriptionTextMainCave(db,lang,item,useHtml,conserveSpace);
        html += itemDescriptionTextSideCaves(db,lang,item,useHtml,conserveSpace);

        //
        // Output distance to target, if geolocation is active
        //

        if (!db.getItemFuzzy(item) && typeof myPosition !== 'undefined' ) {
            let targetLat = db.getItemLat(item);
            let targetLng = db.getItemLon(item);
            let myLat = myPosition.lat;
            let myLng = myPosition.lng;
            let distance = Math.floor(lib.coordinatesDistance(myLat,myLng,targetLat,targetLng));
            let bearing = Math.floor(lib.bearing(myLat,myLng,targetLat,targetLng));

            if (conserveSpace) {
            html += lib.htmlBreak + lang.getTextWithValues("distanceAndBearing", false, [distance,bearing]);
            } else {
            html += lib.htmlParagraph(lang.getTextWithValues("distanceAndBearing", false, [distance,bearing]));
            }
            psgeoDebug("Target lat lng vs. my lat lng: " + targetLat + " " + targetLng + " vs. " + myLat + " " + myLng);
        }

        //
        // Done!
        //
        
        return(html);
    }
    
    //
    // Return the object ----------------------------------------------------------------------
    //
    
    return({ describeItem: describeItem });
}
