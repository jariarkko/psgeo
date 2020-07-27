//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

//
// Settable parameters ----------------------------------------------------------
//
// The following are parameters that can be adjusted for different
// languages, database location, etc.
//
// Also, if this code is run at https://example.net, one needs to
// authorise the using web page (example.net in this case) at
// https://console.developers.google.com/apis/credentials?project=iconic-rope-139916
//

//
// The database is set below. If the database is from a remote server,
// CORS may prevent you from accessing it. In that case the ttp
// header: Access-Control-Allow-Origin may help.
//

var psgeoSourcesPlain = [
    {
        name: { en: "Planetcaver", fi: "Planetcaver" },
        longName: { en: "Planetcaver Blog", fi: "Planetcaver Blogi" },
        link: "https://www.planetcaver.net",
        datafile: "https://www.planetcaver.net/locations.json"
    }
];

var psgeoSourcesSwimming = [
    {
        name: { en: "Planetswimmer", fi: "Planetswimmer" },
        longName: { en: "Planetswimmer Blog", fi: "Planetswimmer Blogi" },
        link: "https://www.planetswimmer.com",
        datafile: "https://www.planetswimmer.com/locations.json"
    }
];

var psgeoSourcesLuolaseura = [
    {
        name: { en: "Luolaseura", fi: "Luolaseura" },
        longName: { en: "Finnish Caving Association", fi: "Suomen Luolaseura" },
        link: "https://www.luolaseura.fi",
        datafile: "https://luolaseura.fi/luolakanta/db/caves.luolaseura.json"
    }
];

var psgeoFinnishTerrainMapBaseurl =
    "https://avoin-karttakuva.maanmittauslaitos.fi/avoin/wmts/1.0.0/maastokartta/default/WGS84_Pseudo-Mercator/";

var psgeoUsePopups = true;

//
// Default settings for different pages
//
// These include:
//
// Domains and paths: These trigger the specific settings in this
// entry. If the paths array is empty, any path will match.
//
// Filter: The default activity filter.
//
// Lang: The default language is set below. If the URL ends with
// ...?lang=fi then another language may be set. Currently only "en"
// and "fi" are supported.
//
// Cavemaps: Whether to present cavemaps or not.
//
// Finland: Whether to restrict dataset to only Finland.
//
// Cityselection: Whether to bring up a menu of cities for filtering.
//
// Finlandselection: Whether to bring up a menu of selecting Finland
// or other countries. This will only have effect if the "finland"
// parameter is false.
//
// Luolaseura: This software normally runs from the planetskier,
// planetcaver, etc pages. All links point back to the these pages,
// and the labeling is done to represent those pages. If this page is
// run from the Finnish caving association page, set the following
// variable to true to disable the planetskier/caver look and feel,
// and to add links back to the association's page.
//

var psgeoDomainDefaults = [
    {
        domains: ["planetskier.net","www.planetskier.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Skiing",
        name: "Planetskier",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false
    },
    {
        domains: ["caving.fi","luolaseura.fi","luolaseura.planetcaver.net"],
        paths: [],
        lat: 65.4,
        lng: 24.6,
        zoom: 5,
        filter: "Caving",
        name: "Luolakartat Suomessa",
        lang: "fi",
        finland: false,
        cavemaps: true,
        cavemapsFilterInitiallyOn: false,
        luolaseura: true,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: true,
        finnishTerrain: true
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: ["mapmap.html","kartta.html"],
        lat: 65.4,
        lng: 24.6,
        zoom: 5,
        filter: "CavingFinland",
        name: "Planetcaver Cave Maps",
        lang: "en",
        finland: false,
        cavemaps: true,
        cavemapsFilterInitiallyOn: true,
        luolaseura: false,
        cityselection: true,
        finlandselection: true,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true
    },
    {
        domains: ["planetcaver.net","www.planetcaver.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "CavingFinland",
        name: "Planetcaver",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true
    },
    {
        domains: ["theurbanexplorer.net","www.theurbanexplorer.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Urbanex",
        name: "The Urban Explorer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        zoomlevelfordetails: 14,
        sourcesCheckboxes: false,
        finnishTerrain: true
    },
    {
        domains: ["planetclimber.net","www.planetclimber.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Climbing",
        name: "Planetclimber",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false
    },
    {
        domains: ["planetbiker.net","www.planetbiker.net"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Biking",
        name: "Planetbiker",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false
    },
    {
        domains: ["planetswimmer.com","www.planetswimmer.com"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Swimming",
        name: "Planetswimmer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: true
    },
    {
        domains: ["planetflier.com","www.planetflier.com"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Flying",
        name: "Planetflyer",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false
    },
    {
        domains: ["saunablogger.cool","www.saunablogger.cool"],
        paths: [],
        lat: 0,
        lng: 0,
        zoom: 2,
        filter: "Sauna",
        name: "Saunablogger",
        lang: "en",
        finland: false,
        cavemaps: false,
        cavemapsFilterInitiallyOn: false,
        luolaseura: false,
        cityselection: false,
        finlandselection: false,
        zoomouthidesdetails: true,
        sourcesCheckboxes: false,
        finnishTerrain: false
    }
];

var psgeoDomainDefault = undefined;

//
// Whether we run in small displays or not
//

var psgeoSmallDisplayMode = false;
var psgeoSmallDisplayModeLimit = 800;

//
// Cave size categories
//

var psgeoCaveSizeBig = 50;
var psgeoCaveSizeSmall = 5;

//
// How many places must a city have before it is explictly displayed in a filter,
// and when to start pruning the list of cities.
//

var psgeoCityPlacesFilterLimit = 4;
var psgeoNumberOfCitiesFilterLimit = 10;

//
// Internal variables -- do not change -----------------------------------------
//

var dographs = false;
var psgeoMap;
var psgeoList;
var psgeoMarkerList;
var psgeoMarkerItemList;
var psgeoMarkerImage;
var psgeoMarkerShape;

//
// Actual code -----------------------------------------------------------------------
//

function psgeoDebug(message)  {
    console.log("Debug: " + message);
}

function psgeoExtraDebug(message)  {
    //console.log("Debug: " + message);
}

function psgeoInitMarkerImages() {

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  psgeoMarkerShape = {
      coords: [2,1, 5,33, 15,33, 19,1],
      type: 'poly'
  };
}

function psgeoZoomChanged(level) {
    //psgeoExtraDebug("zoom now " + level.toString());
    psgeoRecheckVisibility($.psgeoDB,level);
}

function psgeoGetClickableUrl(db,item) {
    var u = db.getReadingListItemURL(item);
    if (u === undefined) {
        u = db.getReadingListItemPublicationURL(item);
    }
    return(u);
}

function psgeoHtmlBold(text) {
    return("<b>" + text + "</b>");
}

function psgeoHtmlBreak() {
    return("<br/>");
}

function psgeoHtmlImage(url,params) {
    return('<img src="' + url + '" ' + params + '>');
}

function psgeoHtmlLink(link,url,blank) {
    var extra = blank ? ' target="_blank"' : "";
    return('<a href="' + url + '"' + extra +  '>' + link + '</a>');
}

function psgeoHtmlParagraph(text) {
    return("<p>" + text + "</p>");
}

function psgeoPopupTitle(lang,text) {
    return(psgeoHtmlParagraph(psgeoHtmlBold(text)));
}

function psgeoPopupImage(lang,url) {
    return(psgeoHtmlImage(url,'width="100"'));
}

function psgeoPopupText(lang,text) {
    return(psgeoHtmlParagraph(text));
}

function psgeoPopupTextLine(lang,text) {
    return(text + psgeoHtmlBreak());
}

function psgeoPopupTextAndLink(lang,text,link,url) {
    psgeoDebug("popup text and link, text = " + text);
    psgeoDebug("link = " + link);
    psgeoDebug("url = " + link);
    return(text + psgeoHtmlLink(link,url,true));
}

function psgeoPopupTextAndLinkAndText(lang,text1,link,url,text2) {
    psgeoDebug("popup text and link, text1 = " + text1);
    psgeoDebug("link = " + link);
    psgeoDebug("url = " + link);
    return(text1 + psgeoHtmlLink(link,url,true) + text2);
}

function psgeoPopupCoordinates(lang,lat,lon) {
    var textHeader = lang.capitalize(lang.coordinatesText()) + ": ";
    var textCoords = "";
    if (lat < 0) {
        textCoords += "S " + String(-lat);
    } else {
        textCoords += "N " + String(lat);
    }
    textCoords += " ";
    if (lon < 0) {
        textCoords += "W " + String(-lon);
    } else {
        textCoords += "E " + String(lon);
    }
    var urlCoords = "http://www.google.com/maps/place/" + String(lat) + "," + String(lon);
    var text = psgeoPopupTextAndLink(lang,textHeader,textCoords,urlCoords);
    return(psgeoHtmlParagraph(text));
}

function psgeoFindImageUrl(db,item,rl) {
    for (var i = 0; i < rl.length; i++) {
	if (db.getReadingListItemImageURL(rl[i]) !== undefined) {
	    return(db.getReadingListItemImageURL(rl[i]));
        }
    }
    return(undefined);
}

function psgeoRockTypeText(lang,prefix,list) {
    var text = lang.capitalize(lang.rockTypeText() + ": ");
    for (var i = 0; i < list.length; i++) {
        if (i > 0) text += "/";
        var unprocessed = list[i].substring(prefix.length).toLowerCase();
        var translated = lang.rockTypeValueText(unprocessed);
        text += lang.capitalize(translated);
    }
    return(text);
}

function psgeoMorphologyText(lang,prefix,list) {
    var text = lang.capitalize(lang.morphologyText() + ": ");
    for (var i = 0; i < list.length; i++) {
        if (i > 0) text += "/";
        var unprocessed = list[i].substring(prefix.length).toLowerCase();
        var translated = lang.morphologyValueText(unprocessed);
        text += lang.capitalize(translated);
    }
    return(text);
}

function psgeoActivityText(lang,list) {
    var text = lang.capitalize(lang.activityText() + ": ");
    for (var i = 0; i < list.length; i++) {
        if (i > 0) text += ", ";
        var unprocessed = list[i].toLowerCase();
        var translated = lang.cavingActivityValueText(unprocessed);
        text += lang.capitalize(translated);
    }
    return(text);
}

function psgeoMarkerPopupAuxRLItemAuthorsInitials(name) {
    var spaceIndex = name.indexOf(" ");
    if (name.length <= 3 || spaceIndex < 1 || spaceIndex + 1 == name.length) return("NN");
    var firstname = name[0].toUpperCase();
    var lastname = name[spaceIndex+1].toUpperCase();
    return(firstname + lastname);
}

function psgeoMarkerPopupAuxRLItemAuthors(db,lang,rli) {
    var auth = db.getReadingListItemWith(rli);
    if (auth.length == 0) return("");
    else if (auth.length == 1)
        return(psgeoMarkerPopupAuxRLItemAuthorsInitials(auth[0]));
    else if (auth.length == 2)
        return(psgeoMarkerPopupAuxRLItemAuthorsInitials(auth[0]) +
               "&" +
               psgeoMarkerPopupAuxRLItemAuthorsInitials(auth[1]));
    else
        return(psgeoMarkerPopupAuxRLItemAuthorsInitials(auth[0]) +
               "," +
               psgeoMarkerPopupAuxRLItemAuthorsInitials(auth[1]) +
              "...");
}

function psgeoMarkerPopupAuxRLItemAuthorsAndYear(db,lang,rli) {
    var authpart = psgeoMarkerPopupAuxRLItemAuthors(db,lang,rli);
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
    
function psgeoMarkerPopupAuxRLItem(db,lang,item,rli) {
    var authorsandyear = psgeoMarkerPopupAuxRLItemAuthorsAndYear(db,lang,rli);
    if (db.getReadingListItemURL(rli) !== undefined) {
        return(psgeoPopupTextAndLinkAndText(lang,
                                            lang.capitalize(lang.articleText()) + ": ",
                                            db.getReadingListItemTitle(rli),
                                            db.getReadingListItemURL(rli),
                                            authorsandyear));
    } else if (db.getReadingListItemPublication(rli) !== undefined) {
        if (db.getReadingListItemPublicationURL(rli) !== undefined) {
            return(psgeoPopupTextAndLinkAndText(lang,
                                                lang.capitalize(lang.publicationText()) + ": ",
                                                db.getReadingListItemPublication(rli),
                                                db.getReadingListItemPublicationURL(rli),
                                                authorsandyear));
        } else {
            return(psgeoPopupText(lang,
                                  lang.capitalize(lang.publicationText()) + ": ",
                                  db.getReadingListItemPublication(rli) + authorsandyear));
        }
    } else {
        return("");
    }
}

function psgeoMarkerPopupTextActivities(db,lang,item) {
    var movementtypes = ["Basic","SRT","Swimming","Boating","Diving","Digging","Skiing"];
    var otheractivitytypes = ["Surveying","Researching","Training","Studying"];
    var movements = db.getItemSubActivitiesWithinSet(item,"Caving",movementtypes);
    var otheractivities = db.getItemSubActivitiesWithinSet(item,"Caving",otheractivitytypes);
    var movementissimple = (movements.length == 0 || (movements.length == 1 && movements[0] === "Basic"));
    var otheractivitiesissimple = (otheractivities.length == 0);
    if (movementissimple && otheractivitiesissimple) {
        return("");
    } else {
        var allactivities = movements.concat(otheractivities);
        var descr = psgeoActivityText(lang,allactivities);
        return(psgeoPopupText(lang,descr));
    }
}

function psgeoMarkerPopupTextMainCave(db,lang,item) {
    if (db.hasItemMainCave(item)) {
        return(psgeoPopupText(lang,lang.capitalize(lang.mainCaveText() + ": ") + db.getItemMainCave(item)));
    } else {
        return("");
    }
}

function psgeoMarkerPopupTextSideCaves(db,lang,item) {
    var htmlInside = "";
    var sidecaves =  db.getItemSideCaves(item);
    for (var i = 0; i < sidecaves.length; i++) {
        var sidecave = sidecaves[i];
        var thisHtml = lang.capitalize(lang.sideCaveText() + ": ") + sidecave;
        if (i+1 < sidecaves.length) thisHtml = psgeoPopupTextLine(lang,thisHtml);
        htmlInside += thisHtml;
    }
    if (htmlInside.length > 0) {
        return(psgeoPopupText(lang,htmlInside));
    } else {
        return("");
    }
}

function psgeoMarkerPopupText(db,lang,item) {
    var rl = db.getItemReadingList(item);
    var html = "";
    html +=  psgeoPopupTitle(lang,db.getItemName(item));
    if (db.hasItemReadingListImageUrl(item)) {
        var imageUrl = psgeoFindImageUrl(db,item,rl);
        html +=  psgeoPopupImage(lang,imageUrl);
    }
    var descr = db.getItemDescriptionLang(item,lang.getLanguage());
    if (descr != undefined) {
        html += psgeoPopupText(lang,descr);
    }
    if (db.getItemFuzzy(item)) {
        html += psgeoPopupText(lang,lang.capitalize(lang.locationSecretText()));
    } else {
        html += psgeoPopupCoordinates(lang,
                                      db.getItemLat(item),
                                      db.getItemLon(item));
    }
    var cavemap = db.getItemMap(item);
    if (cavemap !== undefined) {
        html += psgeoPopupTextAndLink(lang,
                                      lang.capitalize(lang.caveMapText() + ": "),
                                      lang.mapText(),
                                      cavemap);
    }
    var rocktypeprefix = "Rock-";
    var morphologyprefix = "Morphology-";
    var rocktype = db.getItemSubActivitiesWithPrefix(item,"Caving",rocktypeprefix);
    var morphology = db.getItemSubActivitiesWithPrefix(item,"Caving",morphologyprefix);
    if (db.getItemLength(item) !== undefined) {
        var lengthtext = db.getItemLength(item).toString() + "m"
        if (db.getItemLengthAccuracy(item) !== "exact") {
            lengthtext = "~" + lengthtext;
        }
        if (rocktype.length > 0) {
            lengthtext += ". " + psgeoRockTypeText(lang,rocktypeprefix,rocktype);
        }
        if (morphology.length > 0) {
            lengthtext += ". " + psgeoMorphologyText(lang,morphologyprefix,morphology);
        }
        html += psgeoPopupText(lang,
                               lang.capitalize(lang.lengthText()) +
                               ": " +
                               lengthtext);
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
        if (rocktype.length > 0) {
            lengthtext += ". " + psgeoRockTypeText(lang,rocktypeprefix,rocktype);
        }
        if (morphology.length > 0) {
            lengthtext += ". " + psgeoMorphologyText(lang,morphologyprefix,morphology);
        }
        html += psgeoPopupText(lang,
                               lang.capitalize(lang.lengthCategoryText()) +
                               ": " +
                               lengthtext);
    } else if (rocktype.length > 0 || morphology.length) {
        var typetext = "";
        if (rocktype.length > 0) {
            typetext += psgeoRockTypeText(lang,rocktypeprefix,rocktype);
        }
        if (morphology.length > 0) {
            if (typetext.length > 0) typetext += ". ";
            typetext += psgeoMorphologyText(lang,morphologyprefix,morphology);
        }
        html += psgeoPopupText(lang,typetext);
    }
    html += psgeoMarkerPopupTextActivities(db,lang,item);
    var htmlinside = "";
    for (var i = 0; i < rl.length; i++) {
        var thishtml = psgeoMarkerPopupAuxRLItem(db,lang,item,rl[i]);
        if (i+1 < rl.length) thishtml = psgeoPopupTextLine(lang,thishtml);
        htmlinside += thishtml;
    }
    html += psgeoPopupText(lang,htmlinside);
    html += psgeoMarkerPopupTextMainCave(db,lang,item);
    html += psgeoMarkerPopupTextSideCaves(db,lang,item);
    return(html);
}

function psgeoMarkerPopup(map,marker,popup,db,lang) {
    var item = marker.item;
    var html = psgeoMarkerPopupText(db,lang,item);
    psgeoDebug("content = " + html);
    popup.setContent(html);
    popup.open(map, marker);
}

function psgeoMarkerClick(marker) {
    var db = $.psgeoDB;
    var lang = $.psgeoLang;
    if (psgeoUsePopups) {
        psgeoMarkerPopup(psgeoMap,marker,$.psgeoPopup,db,lang);
    } else {
        var item = marker.item;
        var rl = db.getItemReadingList(item);
        var map = db.getItemMap(item);
        var chosenUrl = undefined;
        if (psgeoDomainDefault.cavemaps && map !== undefined) {
            psgeoDebug("psgeoMarkerClick cavemaps & map case");
            chosenUrl = map;
        } else {
            psgeoDebug("psgeoMarkerClick no maps or no map case");
            if (rl.length == 1 &&
                window.location.href != undefined) {
                psgeoDebug("psgeoMarkerClick single article case");
                psgeoDebug("rl = " + JSON.stringify(rl));
                var u = psgeoGetClickableUrl(db,rl[0]);
                if (u !== undefined) {
	            chosenUrl = u;
                }
            } else {
                var n = rl.length;
                var choice = Math.floor(Math.random() * n);
                psgeoDebug("psgeoMarkerClick random article case " + choice.toString() + "/" + n.toString());
	        chosenUrl = psgeoGetClickableUrl(db,rl[choice]);
            }
        }
        if (chosenUrl !== undefined) {
            psgeoDebug("psgeoMarkerClick URL case " + chosenUrl);
            window.open(chosenUrl, '_blank');
            //window.location.href = chosenUrl;
        } else {
            psgeoDebug("psgeoMarkerClick no URL case");
        }
    }
}

function psgeoArticlesText(db,lang,item) {
    var rl = db.getItemReadingList(item);
    if (db.hasItemReadingListUrl(item)) {
        if (rl.length == 1) {
            return(lang.capitalize(lang.articleText()) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]));
        } else {
            return(lang.capitalize(lang.articleText()) +
                   ": " +
                   db.getReadingListItemTitle(rl[0]) +
                   "\n" +
                   (rl.length-1).toString() +
                   " " +
                   lang.otherText() +
                   " " +
                   lang.articlesText());
        }
    } else if (db.hasItemReadingListPublication(item)) {
        for (var i = 0; i < rl.length; i++) {
            if (db.getReadingListItemPublication(rl[i]) !== undefined) {
                return(lang.capitalize(lang.publicationText()) +
                       ": " +
                       db.getReadingListItemPublication(rl[i]));
            }
        }
        return(lang.capitalize(lang.noArticleYetText()));
    } else {
        return(lang.capitalize(lang.noArticleYetText()));
    }
}

function psgeoDescriptionLinefy(text) {
    var maxlen = 100;
    var maxlinelen = 40;
    if (text.length > maxlen) {
        text = text.substring(0,maxlen-3);
        text = text + "...";
    }
    var linepos = 0;
    for (var i = 0; i < text.length; i++) {
        c = text[i];
        if (c == "\n") {
            linepos = 0;
        } else {
            linepos++;
        }
        if (linepos >= maxlinelen && c == " ") {
            text = text.substring(0,i) + "\n" + text.substring(i+1);
            linepos = 0;
        }
    }
    return(text);
}

function psgeoInitMarker(db,lib,lang,item,filter) {
    var zoom = psgeoMap.getZoom();
    var visible = db.matchFilter(item,filter);
    var latlon = new google.maps.LatLng(db.getItemLat(item),
                                        db.getItemLon(item));
    var t;
    var altstring = "";
    
    if (visible && !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoom)) {
        visible = false;
    }
    if (db.getItemFuzzy(item)) {
        altstring = altstring + " -- " + lang.locationSecretText();
    }
    if (db.getItemAlt(item) != undefined) {
        altstring = altstring + " " + db.getItemAlt(item).toString() + "m";
    }

    if (psgeoDomainDefault.cavemaps) {
        var lengthtext = "";
        psgeoExtraDebug("for item " + db.getItemName(item) +
                        " the l field is set to " + ((db.getItemLength(item) === undefined) ?
                                                     "ud" :
                                                     db.getItemLength(item).toString()));
        psgeoExtraDebug("the full item is:\n" + item.toString());
        if (db.getItemLength(item) !== undefined) {
            lengthtext = db.getItemLength(item).toString() + "m"
            if (db.getItemLengthAccuracy(item) !== "exact") {
                lengthtext = "~" + lengthtext;
            }
        }
        t = db.getItemName(item) + altstring;
        if (lengthtext.length > 0) {
            t += " (" + lengthtext + ")";
        }
        t += ":\n";
        var descr = db.getItemDescriptionLang(item,lang.getLanguage());
        if (descr != undefined) {
            t += psgeoDescriptionLinefy(descr);
            t += "\n";
        }
        if (db.getItemMap(item) !== undefined) {
            t += lang.capitalize(lang.mapText());
            t += "\n";
        }
        var sidecaves =  db.getItemSideCaves(item);
        if (sidecaves.length > 0) {
            t += sidecaves.length.toString() + " " + lang.sideCavesText();
            t += "\n";
        }
        t += psgeoArticlesText(db,lang,item);
    } else {
        t = db.getItemName(item);
        t += altstring;
        t += ":\n";
        var descr = db.getItemDescriptionLang(item,lang.getLanguage());
        if (descr != undefined) {
            t += psgeoDescriptionLinefy(descr);
            t += "\n";
        }
        t += psgeoArticlesText(db,lang,item);
    }
    var dominantActivity = psgeoDomainDefault.cavemaps ? "Caving" : db.dominantActivity(item);
    var image = lib.getActivityMarkerImage(dominantActivity);
    var marker = new google.maps.Marker({
	position: latlon,
	map: visible ? psgeoMap : null,
	title: t,
	item: item,
	icon: image,
	shape: psgeoMarkerShape,
	zIndex: 1
    });
    google.maps.event.addListener(marker, 'click',
				  function() {
				      psgeoDebug("Clicked marker");
				      psgeoMarkerClick(marker);
				  });
    psgeoMarkerList.push(marker);
    psgeoMarkerItemList.push(item);
}

var psgeoFilterCheckboxes = [];
var psgeoSourceFilterCheckboxes = [];

function psgeoCreateCityCheckbox(db,document,subsubdiv1b,city,name) {
    psgeoDebug("psgeoCreateCityCheckbox for city " + city);
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = city;
    checkbox.checked = true;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCityOtherCheckbox(db,document,subsubdiv1b,otherCities,name) {
    psgeoDebug("psgeoCreateCityOtherCheckbox for other cities " + otherCities.toString());
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "other cities";
    checkbox.cityList = otherCities;
    checkbox.checked = true;
    psgeoDebug("psgeoCreateCityOtherCheckbox value " +
               checkbox.value +
               " checked " +
               checkbox.checked.toString());
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCaveSizeCheckbox(db,lang,document,subsubdiv1b,size,name) {
    psgeoDebug("psgeoCreateCaveSizeCheckbox for size " + size + " (name = " + name + ")");
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = size;
    checkbox.checked = true;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateCaveMapCheckbox(db,lang,document,subsubdiv1b,name) {
    psgeoDebug("psgeoCreateCaveMapCheckbox initially on = " +
               JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
               " for " +
               psgeoDomainDefault.name);
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "map";
    checkbox.checked = psgeoDomainDefault.cavemapsFilterInitiallyOn;
    psgeoDebug("map checkbox.checked = " + JSON.stringify(checkbox.checked));
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateOnlyFinlandCheckbox(db,lang,document,subsubdiv1b,name) {
    psgeoDebug("psgeoCreateOnlyFinlandCheckbox");
    var label= document.createElement("label");
    var description = document.createTextNode(lang.capitalize(name));
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = "only finland";
    checkbox.checked = !psgeoDomainDefault.luolaseura;
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoCreateActivityCheckbox(db,document,subsubdiv1b,activitylist,name) {
    psgeoDebug("psgeoCreateActivityCheckbox for activities (" + typeof activitylist + ") = " + activitylist.toString());
    var label= document.createElement("label");
    var description = document.createTextNode(name);
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = activitylist;
    checkbox.checked = false;
    var filt = db.getFilter();
    psgeoDebug("filt in activity checkbox = " + db.filterToString(filt));
    var acts = db.getFilterActivities(filt);
    psgeoDebug("acts = " + acts.toString());
    for (var i = 0; i < acts.length; i++) {
        if (activitylist.indexOf(acts[i]) >= 0) {
            checkbox.checked = true;
        }
    }
    label.appendChild(checkbox);   // add the box to the element
    label.appendChild(description);// add the description to the element
    label.appendChild(document.createElement("br"));
    subsubdiv1b.appendChild(label);
    psgeoFilterCheckboxes.push(checkbox);
}

function psgeoInitStats2Text(db,lang,arrayitems) {
    var subdiv1 = arrayitems[0];
    var subdiv2 = dographs ? arrayitems[1] : null;
    
    var subsubdiv1b = document.createElement('div');
    var fif = psgeoDomainDefault.finland ? db.filterMatchCountry("Finland") : db.filterTrue();
    var notfif = db.filterNot(fif);
    var items = psgeoDomainDefault.cavemaps ? db.citiesNoFilter(fif).sort() : $.psgeoLib.getActivityList();
    if (psgeoDomainDefault.cavemaps && (psgeoSmallDisplayMode || !psgeoDomainDefault.cityselection)) items = [];
    var otheritems = psgeoDomainDefault.cavemaps ? db.cities(notfif).sort() : [];
    psgeoDebug("psgeoInitStats2Text items " + items.length.toString() +
               " otheritems " + otheritems.length.toString());
    var i;
    for (i = 0; i < items.length; i++) {
	var item = items[i];
        if (psgeoDomainDefault.cavemaps) {
            if (items.length <= psgeoNumberOfCitiesFilterLimit ||
                db.cityPlaceCount(item) >= psgeoCityPlacesFilterLimit) {
                psgeoCreateCityCheckbox(db,document,subsubdiv1b,item,item);
            } else {
                otheritems.push(item);
            }
        } else {
	    if (item !== "Other" && !$.psgeoLib.isOtherActivity(item)) {
	        var shortActivity = $.psgeoLib.getActivityShortName(item);
	        var oneactivity = [];
	        oneactivity.push(item);
	        psgeoCreateActivityCheckbox(db,document,subsubdiv1b,oneactivity,shortActivity);
            }
	}
    }
    if (psgeoDomainDefault.cavemaps) {
        if (psgeoDomainDefault.cityselection) {
            if (otheritems.length > 0) {
                psgeoCreateCityOtherCheckbox(db,
                                             document,
                                             subsubdiv1b,
                                             otheritems,
                                             lang.capitalize(lang.otherText()));
            }
            if (!psgeoSmallDisplayMode) subsubdiv1b.appendChild(document.createElement("br"));
        }
        if (psgeoDomainDefault.finlandselection) {
            psgeoCreateOnlyFinlandCheckbox(db,
                                           lang,
                                           document,
                                           subsubdiv1b,
                                           lang.onlyFinlandText())
            if (!psgeoSmallDisplayMode) subsubdiv1b.appendChild(document.createElement("br"));
        }
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "big caves",
                                    lang.bigCavesText(psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "caves",
                                    lang.cavesText(psgeoCaveSizeSmall,psgeoCaveSizeBig))
        psgeoCreateCaveSizeCheckbox(db,
                                    lang,
                                    document,
                                    subsubdiv1b,
                                    "cavelets",
                                    lang.caveletsText(psgeoCaveSizeSmall))
        psgeoCreateCaveMapCheckbox(db,
                                   lang,
                                   document,
                                   subsubdiv1b,
                                   lang.withCavemapText())
    } else {
        psgeoCreateActivityCheckbox(db,
                                    document,
                                    subsubdiv1b,
                                    $.psgeoLib.getOtherActivityList(),
                                    "Other");
    }
    subdiv1.appendChild(subsubdiv1b);

    if (dographs) {
        subdiv2.innerHTML = "Graphs";
        subdiv2.style.cursor = 'pointer';
    }
    
    subdiv1.addEventListener('click', function() {
	psgeoDebug("Filter 1 pressed!");
        psgeoRerunFilters(db,lang);
    });
    
    if (dographs) {
        subdiv2.addEventListener('click', function() {
            psgeoDebug("More statistics pressed!");
        });
    }
}

function psgeoRerunFilters(db,lang) {
    var newBasicFilters = [];
    var newSizeFilters = [];
    var newOnlyFinlandFilter = undefined;
    var newMapFilter = undefined;
    var bigCaveFlag = false;
    var caveFlag = false;
    var caveletFlag = false;
    var i;
    psgeoDebug("We have " + psgeoFilterCheckboxes.length.toString() + " checkboxes");
    for (i = 0; i < psgeoFilterCheckboxes.length; i++) {
        var theCheckbox = psgeoFilterCheckboxes[i];
        var checkValue = theCheckbox.value;
	if (psgeoFilterCheckboxes[i].checked) {
            var newFilter;
            if (psgeoDomainDefault.cavemaps) {
                switch (checkValue) {
                case "big caves":
                    newFilter = db.filterCaveSize("min",psgeoCaveSizeBig);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with big caves");
                    bigCaveFlag = true;
                    break;
                case "caves":
                    var newFilter1 = db.filterCaveSize("min",psgeoCaveSizeSmall);
                    var newFilter2 = db.filterCaveSize("max",psgeoCaveSizeBig);
                    newFilter = db.filterAnd([newFilter1,newFilter2]);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with regular caves");
                    caveFlag = true;
                    break;
                case "cavelets":
                    newFilter = db.filterCaveSize("max",psgeoCaveSizeSmall);
		    newSizeFilters.push(newFilter);
                    psgeoDebug("Adding a new filter with small caves");
                    caveletFlag = true;
                    break;
                case "only finland":
                    newOnlyFinlandFilter = db.filterMatchCountry("Finland");
                    psgeoDebug("Adding a new filter for only Finland");
                    break;
                case "map":
                    newMapFilter = db.filterMatchMap(true);
                    psgeoDebug("Adding a new filter for maps");
                    break;
                case "other cities":
                    newFilter = db.filterMatchCities(theCheckbox.cityList);
		    newBasicFilters.push(newFilter);
                    psgeoDebug("Adding a new filter for other cities " + theCheckbox.cityList.toString());
                    break;
                default:
                    newFilter = db.filterMatchCity(checkValue);
		    newBasicFilters.push(newFilter);
		    psgeoDebug("Adding a new filter with city " + psgeoFilterCheckboxes[i].value.toString());
                    break;
                }
            } else {
                newFilter = db.filterMatchActivities(psgeoFilterCheckboxes[i].value.split(","));
		newBasicFilters.push(newFilter);
		psgeoDebug("Adding a new filter with activities " + psgeoFilterCheckboxes[i].value.toString());
            }
	} else {
	    psgeoDebug("Filter on " + psgeoFilterCheckboxes[i].value.toString() + " not selected");
	}
    }
    var basicFilter = psgeoSmallDisplayMode ? db.filterTrue() : db.filterOr(newBasicFilters);
    if (psgeoDomainDefault.cavemaps && !psgeoDomainDefault.cityselection) basicFilter = db.filterTrue();
    var sizeFilter = db.filterTrue();
    if (psgeoDomainDefault.cavemaps &&
        (!bigCaveFlag || !caveFlag || !caveletFlag)) {
        sizeFilter = db.filterOr(newSizeFilters);
    }
    var finalFilter = db.filterAnd([basicFilter,sizeFilter]);
    if (newOnlyFinlandFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newOnlyFinlandFilter]);
    }
    if (newMapFilter !== undefined) {
        finalFilter = db.filterAnd([finalFilter,newMapFilter]);
    }
    if (psgeoSourceFilterCheckboxes.length > 0) {
        var sourceFilter = psgeoMakeSourceFilter(db,psgeoSourceFilterCheckboxes);
        finalFilter = db.filterAnd([finalFilter,sourceFilter]);
    }
    db.setFilter(finalFilter);
    psgeoDebug("Filter installed:\n" + db.filterToString(finalFilter));
    psgeoRecheckVisibility(db,psgeoMap.getZoom());
    psgeoUpdateStats(db,lang);
}

function psgeoMakeSourceFilter(db,sourceCheckboxes) {
    var subFilters = [];
    var i;
    for (i = 0; i < sourceCheckboxes.length; i++) {
        var box = sourceCheckboxes[i];
        if (box.checked) {
            subFilters.push(db.filterMatchSource(box.value));
        }
    }
    return(db.filterOr(subFilters));
}

function psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel) {
    if (!psgeoDomainDefault.zoomouthidesdetails) return(true);
    if (zoomLevel >= psgeoDomainDefault.zoomlevelfordetails) return(true);
    if (!db.isItemSideCave(item)) return(true);
    return(false);
}

function psgeoRecheckVisibility(db,zoomLevel) {
    psgeoDebug("psgeoRecheckVisibility at level " + zoomLevel.toString());
    var i;
    for (i = 0; i < psgeoMarkerList.length; i++) {
	var m = psgeoMarkerList[i];
	var item = psgeoMarkerItemList[i];
	var visible = db.matchFilter(item,db.getFilter());
        if (visible &&
            !psgeoItemShouldBeVisibleAtThisZoomLevel(db,item,zoomLevel)) {
            visible = false;
        }
	if (visible === false && m.getMap() !== null) {
	    m.setMap(null);
	} else if (visible === true && m.getMap() === null) {
	    m.setMap(psgeoMap);
	}
    }
    psgeoDebug("Filter taken into use");
}

function psgeoUpdateCheckboxes(db) {
    if (psgeoDomainDefault.cavemaps) {
        psgeoUpdateCheckboxesCitiesAndSizes(db);
    } else {
        psgeoUpdateCheckboxesActivities(db);
    }
}

function psgeoFilterSizeIsRange(size,min,max) {
    if (size.min === undefined ||
        min === undefined)
        throw ("Filter cave size range min should not be undefined");
    return(size.min <= min &&
           (size.max === undefined ||
            max === undefined ||
            size.max >= max));
}

function psgeoFilterSizesHasRange(sizes,min,max) {
    var i;
    for (i = 0; i < sizes.length; i++) {
        var size = sizes[i];
        if (psgeoFilterSizeIsRange(size,min,max)) return(true);
    }
    return(false);
}

function psgeoUpdateCheckboxesCitiesAndSizes(db) {
    var filterCities = db.getFilterCities(db.getFilter());
    var filterSizes = db.getFilterCaveSizes(db.getFilter());
    var i;
    psgeoExtraDebug("cities = " + filterCities.toString());
    for (i = 0; i < psgeoFilterCheckboxes.length && i < filterCities.length; i++) {
        var checkbox = psgeoFilterCheckboxes[i];
	var checkString = checkbox.value;
        switch (checkString) {
        case "big caves":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,psgeoCaveSizeBig,undefined);
            break;
        case "caves":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,psgeoCaveSizeSmall,psgeoCaveSizeBig);
            break;
        case "cavelets":
	    checkbox.checked = psgeoFilterSizesHasRange(filterSizes,0,psgeoCaveSizeSmall);
            break;
        case "map":
	    var shouldbechecked = psgeoDomainDefault.cavemapsFilterInitiallyOn;
	    checkbox.checked = shouldbechecked;
            break;
        case "only finland":
            var filterCountries = db.getFilterCountries(db.getFilter());
            checkbox.checked = (filterCountries.length == 1 && filterCountries[0] === "Finland");
            break;
        case "other cities":
            var cityList = checkbox.cityList;
            psgeoDebug("other cities city list = " + JSON.stringify(cityList));
            psgeoDebug("other cities filter city list = " + JSON.stringify(filterCities));
	    var shouldbechecked = false;
            var i;
            for (i = 0; i < cityList.length; i++) {
                var cityString = cityList[i];
	        if (filterCities.includes(cityString)) {
	            shouldbechecked = true;
	        }
            }
	    checkbox.checked = shouldbechecked;
            break;
        default:
            var cityString = checkString;
	    var shouldbechecked = false;
	    if (filterCities.includes(cityString)) {
	        shouldbechecked = true;
	    }
	    checkbox.checked = shouldbechecked;
            break;
        }
    }
}

function psgeoUpdateCheckboxesActivities(db) {
    var filterActivities = db.getFilterActivities(db.getFilter());
    var i;
    psgeoDebug("filterActivities = " + filterActivities.toString());
    for (i = 0; i < psgeoFilterCheckboxes.length; i++) {
	var activitiesString = psgeoFilterCheckboxes[i].value;
	var activities = activitiesString.split(",");
	var shouldbechecked = false;
	var j;
	for (j = 0; j < activities.length; j++) {
	    var oneact = activities[j];
	    //psgeoDebug("  looking at " + oneact + " at " + j.toString());
	    if (filterActivities.includes(oneact)) {
		shouldbechecked = true;
	    }
	}
	psgeoFilterCheckboxes[i].checked = shouldbechecked;
    }
}


function psgeoUpdateStatsText(db,
                              lang,
                              arrayitems,
                              ncontinents,
                              ncountries,
                              ncities,
                              nstatesus,
                              nstatesca,
                              ncavemaps,
                              nplaces) {
    var prefix = "<br>";
    var postfix = "";
    var headerLevel = "3";
    if (psgeoSmallDisplayMode) {
        prefix = "<font size=\"-1\">";
        postfix = "</font>";
        headerLevel = "5";
    }
    if (psgeoDomainDefault.cavemaps && psgeoSmallDisplayMode) {
        arrayitems[0].innerHTML = "";
    } else {
        arrayitems[0].innerHTML = (lang.numberAlign(nplaces,3) + " " + lang.placesText());
    }
    arrayitems[1].innerHTML = (lang.numberAlign(ncities,3) + " " + lang.citiesText());
    arrayitems[2].innerHTML = (lang.numberAlign(ncountries,3) + " " + lang.countriesText());
    if (!psgeoDomainDefault.cavemaps) {
        arrayitems[3].innerHTML = (lang.numberAlign(ncontinents,3) + " " + lang.continentsText());
        arrayitems[4].innerHTML = (lang.numberAlign(nstatesus,3) + " " + lang.statesText());
        arrayitems[5].innerHTML = (lang.numberAlign(nstatesca,3) + " " + lang.provincesText());
    }
    if (psgeoDomainDefault.cavemaps) {
        arrayitems[6].innerHTML = (lang.numberAlign(ncavemaps,3) + " " + lang.caveMapsText());
        if (psgeoDomainDefault.sourcesCheckboxes) {
            if (psgeoSourceFilterCheckboxes.length == 0) {
                if (psgeoDomainDefault.luolaseura) {
                    arrayitems[7].appendChild(document.createElement("br"));
                    arrayitems[7].appendChild(document.createTextNode(lang.capitalize(lang.sourcesText()) + ":"));
                    arrayitems[7].appendChild(document.createElement("br"));
                    psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(arrayitems[7]);
                } else {
                    arrayitems[7].appendChild(document.createElement("br"));
                    psgeoSourceFilterCheckboxes = psgeoGetSourcesCheckboxes(arrayitems[7]);
                }
                arrayitems[7].addEventListener('click', function() {
	            psgeoDebug("Filter 2 pressed!");
                    psgeoRerunFilters(db,lang);
                });
            }
        } else {
            if (psgeoDomainDefault.luolaseura) {
                arrayitems[7].innerHTML =
                    prefix +
                    "<p>" + lang.capitalize(lang.sourcesText()) + ":<br/>" +
                    psgeoGetSources() +
                    "</p>" +
                    postfix;
                psgeoDebug("trailer/ls = " + arrayitems[7].innerHTML);
            } else {
                arrayitems[7].innerHTML =
                    prefix +
                    "<h" +
                    headerLevel +
                    ">" + psgeoGetSources() + "</h" +
                    headerLevel +
                    ">" +
                    postfix;
                psgeoDebug("trailer/fi = " + arrayitems[7].innerHTML);
            }
        }
    }
}

function psgeoUpdateStats(db,lang) {
    var ncontinents = db.nContinents();
    var ncountries = db.nCountries();
    var ncities = db.nCities();
    var nstatesus = db.nStates("USA");
    var nstatesca = db.nStates("Canada");
    var ncavemaps = db.nCavemaps();
    var nplaces = db.nPlaces();

    psgeoUpdateStatsText(db,
                         lang,
                         psgeoStatsTexts,
                         ncontinents,
                         ncountries,
                         ncities,
                         nstatesus,
                         nstatesca,
                         ncavemaps,
                         nplaces);
}

function psgeoInitStats(db,lang) {
    psgeoInitStats2Text(db,lang,psgeoStats2Texts);
    psgeoUpdateStats(db,lang);
}

function psgeoInitList(lang) {
    psgeoList = [];
    psgeoMarkerList = [];
    psgeoMarkerItemList = [];
    var lib = PsgeoLib();
    $.psgeoLib = lib;
    var db = PsgeoDB(lib,[],"");
    $.psgeoDB = db;
    psgeoDebug("psgeoDB set");
    var filterToBeUsedLater = undefined;
    var filterForMarkers = undefined;
    if (psgeoDomainDefault.cavemaps) {
        db.setFilter(lib.getDefaultFilterCaving(db));
        filterForMarkers = db.getFilter();
    } else {
        db.setFilter(db.filterTrue());
        filterForMarkers = lib.getDefaultFilterSkiing(db);
    }
    psgeoDebug("psgeoDBfilter set");
    psgeoDebug("filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    psgeoInitListOne(db,lib,lang,filterForMarkers,0);
}

function psgeoInitListOne(db,lib,lang,filterForMarkers,count) {
    if (count == psgeoSources.length) {
        psgeoDebug("added places");
        psgeoFinishLoading(db,lib,lang,filterForMarkers);
    } else {
        var source = psgeoSources[count];
        var path = source.datafile;
        psgeoDebug("Loading " + source.name.en +
                   " from " + path +
                   "...");
        psgeoDebug("before getJSON filterForMarkers = " +
                   (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
        $.getJSON(path, function(data) {
	    psgeoDebug("got data for " + source.name.en +
                       "..., length = " + data.length.toString());
            psgeoDebug("before addPlaces filterForMarkers = " +
                       (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
            psgeoDebug("adding places from " + source.name.en +
                       " when hard filter = " + db.filterToString(db.getFilter()));
	    db.addPlacesWithFilter(data,db.getFilter(),source.name.en);
            psgeoInitListOne(db,lib,lang,filterForMarkers,count+1);
        });
    }
}

function psgeoFinishLoading(db,lib,lang,filterForMarkers) {
    psgeoDebug("psgeoFinishLoading " +
               JSON.stringify(psgeoDomainDefault.cavemaps) +
               " " +
               JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
               " " +
               JSON.stringify(psgeoDomainDefault.finlandselection) +
               " " +
               db.filterToString(filterForMarkers));
    psgeoDebug("before extra filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    if (psgeoDomainDefault.cavemaps) {
        psgeoDebug("cavemaps init " +
                   JSON.stringify(psgeoDomainDefault.cavemapsFilterInitiallyOn) +
                   " " +
                   JSON.stringify(psgeoDomainDefault.finlandselection));
        if (psgeoDomainDefault.cavemapsFilterInitiallyOn) {
            filterForMarkers =
                db.filterAnd([filterForMarkers,
                              db.filterMatchMap(true)]);
        }
        if (psgeoDomainDefault.finlandselection) {
            filterForMarkers =
                db.filterAnd([filterForMarkers,
                              db.filterMatchCountry("Finland")]);
        }
    } else {
        psgeoDebug("!cavemaps init");
    }
    db.setFilter(filterForMarkers);
    psgeoDebug("before apply filterForMarkers = " +
               (filterForMarkers === undefined ? "ud" : (db.filterToString(filterForMarkers))));
    db.applyAllNoFilter(function(item) {
        psgeoInitMarker(db,lib,lang,item,filterForMarkers);
    });
    psgeoDebug("initStats...");
    psgeoInitStats(db,lang);
    psgeoDebug("updateCheckboxes...");
    psgeoUpdateCheckboxes(db);
    psgeoDebug("Loaded");
}

function psgeoGetSources() {
    var result = "";
    var i;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var prefix = "<a href=\"";
        var midfix = "\">";
        var postfix = "</a>";
        var name;
        if (psgeoSmallDisplayMode) {
            name = source.name[psgeoDomainDefault.lang];
        } else {
            name = source.longName[psgeoDomainDefault.lang];
        }
        if (result !== "") {
            result = result + "<br/>";
        }
        result = result + prefix + source.link + midfix + name + postfix;
    }
    return(result);
}

function psgeoGetSourcesCheckboxes(structure) {
    var result = [];
    var i;
    for (i = 0; i < psgeoSources.length; i++) {
        var source = psgeoSources[i];
        var name;
        if (psgeoSmallDisplayMode) {
            name = source.name[psgeoDomainDefault.lang];
        } else {
            name = source.longName[psgeoDomainDefault.lang];
        }
        var label = document.createElement("label");
        var description = document.createTextNode(name);
        var link = document.createElement("a");
        link.appendChild(description);
        link.title = name;
        link.target= '_blank';
        link.href = source.link;
        var box = document.createElement("input");
        var br = document.createElement("br");
        box.type = "checkbox";
        box.value = source.name.en;
        box.checked = true;
        label.appendChild(box);
        label.appendChild(link);
        label.appendChild(br);
        structure.appendChild(label);
        result.push(box);
    }
    return(result);
}

function psgeoToDegrees(radians) {
  var pi = Math.PI;
  return radians * (180/pi);
}

function psgeoToRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi/180);
}

function psgeoConvertTM35FINToWGS84(x, y) {

    //
    // code modified from
    // https://github.com/hkurhinen/etrs-tm35fin-to-wgs84-converter/blob/master/src/fi/elemmings/converter/Etrs35fin2wgs84Converter.java
    //
    
    var min_x = 6582464.0358;
    var max_x = 7799839.8902;
    var min_y = 50199.4814;
    var max_y = 761274.6247;
    
    if (x < min_x || x > max_x) return undefined;
    if (y < min_y || y > max_y) return undefined;
    
    var Ca = 6378137.0;
    var Cf = 1.0 / 298.257223563;
    var Ck0 = 0.9996;
    var Clo0 = psgeoToRadians(27.0);
    var CE0 = 500000.0;
    var Cn = Cf / (2.0 - Cf);
    var CA1 = Ca / (1.0 + Cn) * (1.0 + (Math.pow(Cn, 2.0)) / 4.0 + (Math.pow(Cn, 4.0)) / 64.0);
    var Ce = Math.sqrt((2.0 * Cf - Math.pow(Cf, 2.0)));
    var Ch1 = 1.0 / 2.0 * Cn - 2.0 / 3.0 * (Math.pow(Cn, 2.0)) + 37.0 / 96.0 * (Math.pow(Cn, 3.0)) - 1.0 / 360.0 * (Math.pow(Cn, 4.0));
    var Ch2 = 1.0 / 48.0 * (Math.pow(Cn, 2.0)) + 1.0 / 15.0 * (Math.pow(Cn, 3.0)) - 437.0 / 1440.0 * (Math.pow(Cn, 4.0));
    var Ch3 = 17.0 / 480.0 * (Math.pow(Cn, 3.0)) - 37.0 / 840.0 * (Math.pow(Cn, 4.0));
    var Ch4 = 4397.0 / 161280.0 * (Math.pow(Cn, 4.0));
    
    var E = x / (CA1 * Ck0);
    var nn = (y - CE0) / (CA1 * Ck0);
    var E1p = Ch1 * Math.sin(2.0 * E) * Math.cosh(2.0 * nn);
    var E2p = Ch2 * Math.sin(4.0 * E) * Math.cosh(4.0 * nn);
    var E3p = Ch2 * Math.sin(6.0 * E) * Math.cosh(6.0 * nn);
    var E4p = Ch3 * Math.sin(8.0 * E) * Math.cosh(8.0 * nn);
    
    var nn1p = Ch1 * Math.cos(2.0 * E) * Math.sinh(2.0 * nn);
    var nn2p = Ch2 * Math.cos(4.0 * E) * Math.sinh(4.0 * nn);
    var nn3p = Ch3 * Math.cos(6.0 * E) * Math.sinh(6.0 * nn);
    var nn4p = Ch4 * Math.cos(8.0 * E) * Math.sinh(8.0 * nn);
    
    var Ep = E - E1p - E2p - E3p - E4p;
    
    var nnp = nn - nn1p - nn2p - nn3p - nn4p;
    var be = Math.asin(Math.sin(Ep) / Math.cosh(nnp));

    var Q = Math.asinh(Math.tan(be));
    var Qp = Q + Ce * Math.atanh(Ce * Math.tanh(Q));
    Qp = Q + Ce * Math.atanh(Ce * Math.tanh(Qp));
    Qp = Q + Ce * Math.atanh(Ce * Math.tanh(Qp));
    Qp = Q + Ce * Math.atanh(Ce * Math.tanh(Qp));
    
    var latitude = psgeoToDegrees(Math.atan(Math.sinh(Qp)));
    var longitude = psgeoToDegrees(Clo0 + Math.asin(Math.tanh(nnp) / Math.cos(be)));

    return( {
        lat: longitude,
        lon: latitude
    });
}

var psgeoStats2Texts;
var psgeoStatsTexts;

function PsgeoStats2Win(div1, map) {
    psgeoStats2Texts = [];
    var subdiv1 = document.createElement('div');
    div1.appendChild(subdiv1);
    psgeoStats2Texts.push(subdiv1);
}

function PsgeoStatsWin(div, map) {

    psgeoStatsTexts = [];
    var i;
    
    for (i = 0; i < 8; i++) {
	var subdiv = document.createElement('div');
	div.appendChild(subdiv);
	subdiv.innerHTML = "";
	psgeoStatsTexts.push(subdiv);
    }
    
}

function psgeoInitStatsControl(map) {

    // Create the DIV to hold the control and call the CenterControl()
    // constructor passing in this DIV.
    var statsDiv = document.getElementById('Info');
    if (statsDiv === undefined || statsDiv === null)
        statsDiv = document.getElementById('Planetcaver');
    var statsWin = new PsgeoStatsWin(statsDiv, map);
    var stats2Div = document.getElementById('Filter');
    var stats2Win = new PsgeoStats2Win(stats2Div, map);
    
    stats2Div.index = 2;
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(stats2Div);
    statsDiv.index = 1;
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(statsDiv);
}

function psgeoInitDisplaySize() {

    //
    // Observe the kind of device we run on, the screen size in
    // particular.  Set the small screen mode on if necessary.  The
    // parameters to trigger this mode have been defined at the top of
    // this file.
    //
    // If set, the small screen mode will affect how much filters, etc
    // one gets on the screen, to retain enough space to see the
    // actual map.
    //
    
    if (window.innerWidth < psgeoSmallDisplayModeLimit) {
        psgeoSmallDisplayMode = true;
    }
}

function psgeoInitLanguage(hostname,urlParams) {

    psgeoDebug("taking language from domain default: " + psgeoDomainDefault.lang);
    
    //
    // The default may be overridden by the 'lang' search parameter. Use, e.g.,
    //
    //    ?lang=fi
    //
    // at the end of your URL to make this happen.
    //
    
    const lang = urlParams.get('lang');
    if (lang !== null) {
        switch (lang) {
        case "fi": psgeoDomainDefault.lang = "fi"; break;
        case "en": psgeoDomainDefault.lang = "en"; break;
        default: break;
        }
    }
}

function psgeoInitCavemaps(pathname,urlParams) {

    psgeoDebug("psgeoDomainDefault.cavemaps is " +
               (psgeoDomainDefault.cavemaps ? "true" : "false"));
    
    //
    // The default may be overridden by the 'cavemaps' search parameter. Use, e.g.,
    //
    //    ?cavemaps=true
    //
    // at the end of your URL to make this happen.
    //
    
    const cavemapssetting = urlParams.get('cavemaps');
    if (cavemapssetting !== null) {
        switch  (cavemapssetting) {
        case "true": psgeoDomainDefault.cavemaps = true; break;
        case "false": psgeoDomainDefault.cavemaps = false; break;
        default: break;
        }
    }
}

function psgeoInitLuolaseura(hostname,urlParams) {

    psgeoDebug("psgeoDomainDefault.luolaseura is " +
               (psgeoDomainDefault.luolaseura ? "true" : "false"));
     
    //
    // The default may be overridden by the 'luolaseura' search parameter. Use, e.g.,
    //
    //    ?luolaseura=true
    //
    // at the end of your URL to make this happen.
    //
    
    const luolaseura = urlParams.get('luolaseura');
    if (luolaseura !== null) {
        switch (luolaseura) {
        case "true": psgeoDomainDefault.luolaseura = true; break;
        case "false": psgeoDomainDefault.luolaseura = false; break;
        default: break;
        }
    }
    
    if (psgeoDomainDefault.luolaseura) {
        psgeoSources = psgeoSourcesLuolaseura.concat(psgeoSourcesPlain);
    } else if (psgeoDomainDefault.name == "Planetswimmer") {
        psgeoSources = psgeoSourcesSwimming;
    } else {
        psgeoSources = psgeoSourcesPlain;
    }
}

function psgeoInitDomainMatchPath(entry,pathname) {
    psgeoDebug("matching paths for entry " + entry.name +
               " (" + entry.paths.length.toString() +
               ") and pathname " +  pathname);
    if (entry.paths.length == 0) {
        return(true);
    } else {
        var k;
        for (k = 0; k < entry.paths.length; k++) {
            var path = entry.paths[k];
            psgeoDebug("matching " + path + " against " + pathname);
            if (pathname.includes(path)) {
                psgeoDebug("match!");
                return(true);
            }
        }
        psgeoDebug("no match");
        return(false);
    }
}

function psgeoInitDomainMatch(entry,hostname,pathname) {
    var j;
    for (j = 0; j < entry.domains.length; j++) {
        var domain = entry.domains[j];
        if (hostname.includes(domain) &&
            psgeoInitDomainMatchPath(entry,pathname)) {
            return(true);
        }
    }
    return(false);
}

function psgeoInitDomain(hostname,pathname) {
    var i;
    for (i = 0; i < psgeoDomainDefaults.length; i++) {
        var candidateDomainDefault = psgeoDomainDefaults[i];
        if (psgeoInitDomainMatch(candidateDomainDefault,hostname,pathname)) {
            psgeoDomainDefault = candidateDomainDefault;
            psgeoDebug("Choosing the domain default " + psgeoDomainDefault.name);
            return;
        }
    }
    psgeoDomainDefault = psgeoDomainDefaults[0];
    psgeoDebug("Choosing the domain default " + psgeoDomainDefault.name + " because nothing matched");
}

function psgeoInitParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pathname = window.location.pathname;
    const hostname = window.location.hostname;
    psgeoInitDomain(hostname,pathname);
    psgeoInitDisplaySize();
    psgeoInitLanguage(hostname,urlParams);
    psgeoInitCavemaps(pathname,urlParams);
    psgeoInitLuolaseura(hostname,urlParams);
}

function psgeoInitMapFinnishTerrain(lang) {
    return(new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
            return(psgeoFinnishTerrainMapBaseurl +
                   zoom +
                   "/" + 
                   coord.y +
                   "/" +
                   coord.x +
                   ".png");
        },
        tileSize: new google.maps.Size(256, 256),
        maxZoom: 18,
        minZoom: 0,
        name: lang.finnishTerrainText(psgeoSmallDisplayMode)
    }));
}

function psgeoInitPopup(map) {
    $.psgeoPopup = new google.maps.InfoWindow({
        content: ""
    });
}

function psgeoInitMap() {
    psgeoInitParameters();
    var lang = PsgeoLang(psgeoDomainDefault.lang);
    $.psgeoLang = lang;
    psgeoMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: psgeoDomainDefault.lat, lng: psgeoDomainDefault.lng},
        zoom: psgeoDomainDefault.zoom,
        styles: [
            {
		"featureType": "administrative.country",
		"stylers": [
                    { "visibility": "on" },
                    { "weight": 1.2 }
                ]
            }
        ],
        mapTypeControlOptions: {
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.SATELLITE
            ]
        }
    });

    if (psgeoDomainDefault.finnishTerrain) {
        $.psgeoMapFinnish = psgeoInitMapFinnishTerrain(lang);
        psgeoMap.mapTypes.set(lang.finnishTerrainText(psgeoSmallDisplayMode), $.psgeoMapFinnish);
        psgeoMap.mapTypeControlOptions.mapTypeIds[2] = lang.finnishTerrainText(psgeoSmallDisplayMode);
    }
    
    psgeoMap.addListener('zoom_changed', function() {
        psgeoZoomChanged(psgeoMap.getZoom());
    });
    psgeoDebug("initImages...");
    psgeoInitMarkerImages();
    psgeoDebug("initStatsControl...");
    psgeoInitStatsControl(psgeoMap);
    psgeoInitPopup(psgeoMap);
    psgeoDebug("initList...");
    psgeoInitList(lang);
    psgeoDebug("all initialisations done.");
}
