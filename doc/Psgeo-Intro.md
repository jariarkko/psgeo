
# Psgeo Introduction

Psgeo is a small Javascript library for managing and filtering
information for web applications that deal with, e.g., sports
activities in different locations. Its primary purpose is to be able
to display maps of activities at those different locations, while
allowing for smart filtering.

![example screen](https://github.com/jariarkko/psgeo/blob/master/doc/screenshot-small.jpg)

# Using Psgeo in your web page

Include the following code on your .html page:

    <body>
    <div id="map"></div>
    <div id="Filter"><h3>Filter</h3></div>
    <div id="Planetcaver"><h3>Cave Maps Map</h3></div>
    <script>
    </script>
    <script src="psgeomap.js"></script>
    <script src="psgeodb.js"></script>
    <script src="psgeodbbackend.js"></script>
    <script src="psgeodbtext.js"></script>
    <script src="psgeolang.js"></script>
    <script src="psgeoschema.js"></script>
    <script src="psgeolib.js"></script>
    <script src="psgeostat.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=YOURAPIKEY&callback=psgeoInitMap"
    async defer></script>
    </body>

# Query parameters

Each web service running the Psgeo software supports URLs. The service
itself has a specific url, e.g., the Finnish Caving Association URL
is https://luolaseura.fi/luolakanta/kartta.html and the Planetskier URL is https://planetskier.net/geo.html

By default, this URL starts the main view, goes to the default map
view, centered on default place, default language, etc. that are
relevant for the service in question.

But you can tailor this service with query parameters, however:

* The c parameter can be used to center the map initially on a given place. For instance, https://planetskier.net/geo.html?c=Chamonix centers the map on a ski area, Chamonix, registered in the Planetskier database. The name given on this search parameter can be the full name of a place or a partial match. For instance, https://planetskier.net/geo.html?c=Cham also centers the map on Chamonix. If there are multiple matches, the software picks the "best" answer (e.g., the longest cave) but it is generally good to use the full name if predictable results are desired :-) The name of the place should be URL encoded, e.g., https://planetskier.net/geo.html?c=Kauniainen%20ski%20hill,%20Kauniainen gets the map centered on the "Kauniainen ski Hill, Kauniainen" where the spaces have been percent-encoded.

* The p parameter is like the c parameter, centers the map, but also brings up information window for the place in question.

* The i parameter is like the p parameter, but instead of the information, it brings up an image representing the place. 
  
* The m parameter is like the p parameter, but instead of the information, it brings up a map representing the internals of the place (typically, a cave or ski hill). If no map is available, this parameter behaves as the p parameter, i.e.,  just brings up an information window.
  
* The o parameter is like the p parameter, but instead of the information, it brings up the 3D model for the place in question (typically, a cave). If no 3D model is available, this parameter behaves as the p parameter, i.e.,  just brings up an information window.
  
* The parameter "lang" can be   used to specify language for the UI. Currently supported languages are "fi", "sv", and "en" for Finnish, Swedish and English, respectively.

* The "cavemaps" parameter, when set to "true" makes the UI behave as primarily showing cave maps for caves that have them.

* The "luolaseura" parameter, when set to "true" makes the UI tailored for the Finnish Caving Association.
  
# APIs

The main API of the Psgeo is the Psgeolib and Psgeodb objects. You can
proceed to create a database of entries as follows:

    var dataset = []; // the Activity JSON dataset, typically read from a file/URL
    var lib =  PsgeoLib();
    var db = PsgeoDB(lib,dataset);

Once you have the database, you can make queries, e.g., number of
countries:

    var n = db.nCountries();

Or loop through all entries that satisfy a particular criteria:

    var filt = db.filterAnd([db.filterMatchCountry("Sweden"),
                             db.filterMatchActivity("Skiing")]);
    db.applyAllExtraFilter(filt,
                           function (item) { console.log("Skiing in Sweden in " + db.getItemName(item)); });
                           
# Tailoring Psgeo

By default, Psgeo uses the Planetskier/Planetcaver databases, but you
can tailor it by:

* Adding query parameters to your URL. See the separate section on
  query parameters.
* Psgeo.js tailorable parameters. At the beginning of the file
   there are some parameters that can be modified. These can be used
   to set the database you want to feed from, for instance. There are
   some reasonable defaults, however, and you add to the defaults
   (that are based on origin domain).
* Modifying psgeo.js (as a last resort). If you're modifying
  the rest of the code, please make a general improvement and submit
  it to GitHub as an enhancement!

