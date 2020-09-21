# Psgeo Software Structure

Psgeo is a Javascript library that can process information about hobby activities on a  map. It is typically used to build web pages that can display information on Google Maps background. The main software architecture can be seen  here:

![architecture](https://github.com/jariarkko/psgeo/blob/master/doc/Diagrams-Architecture.jpg)

There are four major pieces on the diagram:

* The browser
* Existing utility modules (the diagram shows Google Maps, in addition for instance JQuery is used)
* The main Psgeo software components (Psgeo, PsgeoDB, and PsgeoDBBackend)
* The library tools Psgeo software modules (PsgeoLib, PsgeoSchema, PsgeoLang, and PsgeoDBText).

The modules are as follows:

* Browser. This your standard browser, capable of running Javascript on webpages.

* Google Maps is a Google-built framework for building maps that can perform special functions on top of Google Maps. The Google Maps API library also supports using other map data than that provided by Google Maps. Psgeo for instance uses also map data from the Finnish terrain maps, not provided by Google. For more information about the Google Maps API, see https://developers.google.com/maps/documentation/javascript/overview

* JQuery is a HTML manipulation library (not shown in figure; also we need to check if that's actually used, see issue #221). For more information on JQuery, see https://www.w3schools.com/jquery/jquery_intro.asp

* Psgeo. This is the main user interface for Psgeo, and handles the instantiation of the relevant Google Maps maps, Psgeo databases, etc. The software for Psgeo module is in [psgeo.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeo.js).

* PsgeoDB. The software for PsgeoDB module is in [psgeodb.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodb.js).

* PsgeoDBBackend. The software for PsgeoDBBackend module is in [psgeodbbackend.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbbackend.js).

* PsgeoDBText. The software for PsgeoDBText module is in [psgeodbtext.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtext.js).

* PsgeoLib. The software for PsgeoLib module is in [psgeolib.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolib.js).

* PsgeoLang. The software for PsgeoDBLang module is in [psgeolang.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolang.js).

* PsgeoSchema. The software for PsgeoDBSchema module is in [psgeoschema.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeoschema.js).

* PsgeoStat. This module is currently unused, and may be removed. The software for PsgeoDBStat module is in [psgeodbstat.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeostat.js).

In addition, there are software components that are not part of a running instance of Psgeo, but are used for testing etc. These are:

* Makefile: runs tests, checks some things from the software, etc.

* Tests: There is a unit test for every module in the software, and they are run every time changes are made in the software, to ensure that no errors have crept in. The files are [psgeodbbackendtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbbackendtest.js), [psgeodbtexttest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtexttest.js), [psgeolibtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolibtest.js), [psgeostattest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeostattest.js), [psgeodbtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtest.js), [psgeolangtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolangtest.js), [psgeoschematest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeoschematest.js), and [psgeotest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeotest.js).
