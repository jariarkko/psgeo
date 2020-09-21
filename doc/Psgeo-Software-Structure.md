# Psgeo Software Structure

Psgeo is a Javascript library that can process information about hobby activities on a  map. It is typically used to build web pages that can display information on Google Maps background. The main software architecture can be seen  here:

![architecture](https://github.com/jariarkko/psgeo/blob/master/doc/Diagrams-Architecture.jpg)

There are four major pieces on the diagram:

* The browser
* Existing utility modules (the diagram shows Google Maps, in addition for instance JQuery is used)
* The main Psgeo software components (Psgeo, PsgeoDB, and PsgeoDBBackend)
* The library tools Psgeo software modules (PsgeoLib, PsgeoSchema, PsgeoLang, and PsgeoDBText).

## Modules

The modules are as follows:

* Browser. This your standard browser, capable of running Javascript on webpages.

* Google Maps is a Google-built framework for building maps that can perform special functions on top of Google Maps. The Google Maps API library also supports using other map data than that provided by Google Maps. Psgeo for instance uses also map data from the Finnish terrain maps, not provided by Google. For more information about the Google Maps API, see https://developers.google.com/maps/documentation/javascript/overview

* JQuery is a HTML manipulation library (not shown in figure; also we need to check if that's actually used, see issue #221). For more information on JQuery, see https://www.w3schools.com/jquery/jquery_intro.asp

* Psgeo. This is the main user interface for Psgeo, and handles the instantiation of the relevant Google Maps maps, Psgeo databases, etc. The usage instruction for instantiating Psgeo can be found [here](https://github.com/jariarkko/psgeo/blob/master/doc/Psgeo-Intro.md). The software for Psgeo module is in [psgeo.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeo.js).

* PsgeoDB. This module represents an interface to a database of a set of places. The interface can be used to iterate over places and access all kinds of information from each place, but it hides the details of how the places are stored, whether they are in local memory or elsewhere. This is the main interface between Psgeo and the a database of information about places. Typically, place data is initialized from Activity JSON files, but whether that happens locally in the browser or somewhere else on the server side isn't visible to users of PsgeoDB. PsgeoDB runs always in the client, in the browser's Javascript engine, but it may communicate with the actual database backend at a server for actual access to data, filtering the data, etc. PsgeoDB typically holds only minimal amount of data itself (e.g., names and coordinates of places) but the actual data is held by the PsgeoDBBackend. The software for PsgeoDB module is in [psgeodb.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodb.js).

* PsgeoDBBackend. This module implements an in-memory full database of the places. It can  be  run in the browser's Javascript engine, but could also be run in a server. Running the full database in the server offers some benefits, e.g., with respect limiting access to the full database data when it is sensitive. Only limited amount of information needs to be actually known by the Psgeo user interface, such as the coordinates, and textual data to be displayed for items clicked by the user. PsgeoDBBackend can contain all the information. Note that PsgeoDBBackend is still only an in-memory database -- the actual storage of the data for long-term storage can be in Activity JSON files, remote URLs, SQL databases, etc. Note that the software is designed to be able to use _multiple_ data sources, and in fact regularly does use them in. The software for PsgeoDBBackend module is in [psgeodbbackend.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbbackend.js).

* PsgeoDBText. This module takes the information about a place and can turn it into a natural language description, HTML page to display, etc. The software for PsgeoDBText module is in [psgeodbtext.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtext.js).

* PsgeoLib. This module contains general functions for string processing, coordinate conversions, etc. The software for PsgeoLib module is in [psgeolib.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolib.js).

* PsgeoLang. This module is able to map all user-interface messages, item descriptions, etc to natural language messages in various languages. Currently supported languages are English, Finnish, and Swedish. The software for PsgeoDBLang module is in [psgeolang.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolang.js).

* PsgeoSchema. This module contains a set of library functions that can be used to "understand" Activity JSON entries, e.g., to know what sub-activities there are for Skiing or Caving, and what those sub-activities are related to. For instance, in Skiing one can specify sub-activities for the material skied on (Snow, Sand, etc.) or the method of going uphill (e.g., by walking or with the help of lifts). The software for PsgeoDBSchema module is in [psgeoschema.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeoschema.js).

* PsgeoStat. This module is currently unused, and may be removed. The software for PsgeoDBStat module is in [psgeodbstat.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeostat.js).

### Auxiliary Software

In addition, there are software components that are not part of a running instance of Psgeo, but are used for testing etc. These are:

* Makefile: runs tests, checks some things from the software, etc.

* Tests: There is a unit test for every module in the software, and they are run every time changes are made in the software, to ensure that no errors have crept in. The files are [psgeodbbackendtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbbackendtest.js), [psgeodbtexttest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtexttest.js), [psgeolibtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolibtest.js), [psgeostattest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeostattest.js), [psgeodbtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeodbtest.js), [psgeolangtest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeolangtest.js), [psgeoschematest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeoschematest.js), and [psgeotest.js](https://github.com/jariarkko/psgeo/blob/master/lib/psgeotest.js).

## Principles

There are number of architectural principles or ideas that are form the core of the design, and have dictated some aspects of the structure.

*Limited dependencies*
