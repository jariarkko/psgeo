
//
// psGeo geolocation code
//


// Function getGeolocationButton creates a button and assigns a function to the click event.
//     The function keeps track of the counter geolocationClicks
//     Every second click is an enable and every second click a disable
//     It also creates and destroys markerMyPosition, which is a Google Maps infowindow, and which shows position.
//     Closing that infowindow also stops the geolocation background worker
//     The function also defines four helper functions:
//         geolocationStopWatchPosition (every second click)
//         geolocationPending (publish an informative message, repaint old polylines, update indexeddb with a new track name & datetime)
//         geolocationAchieved (move marker to correct position, update indexeddb with position, repaint the polyline trace)
//         geolocationFailed (display an error message)
//         geolocationStopWatchPosition (stop the web worker)
//
//     In order to keep track of tracks, indexeddb is used
//         There is a list of tracks, identified by a starting timestamp
//         There is a list of location objects (each containing a track id (see above), timestamp, position)
//         - indexedDbSupported and openConnectionToIndexedDb are of general purpose
//         - dbAppendTrackList(trackId,trackDate) makes a table of contents
//         - dbAppendTrackRecord stores the actual positions
//         - restoreTraceFromDb reads indexeddb and plots todays tracks on the map
//     CreateGPX and getTrackDownloadLink and getFileList help to move data from browser to filesystem
//
// An iterator has been built to run a function fn for each track in the database
//     The function is given as an indirection:
//     iterateOverTracks(...) receives a reference to function fn
//     and starts fn(lib,lang,data,map,sharedCounter,sharedOutput)
//     sequentially for each track. The code also supports async stuff in fn because of the shared's.


// DATABASE ---------------------------------------

function indexedDbSupported() {
    window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {
        psgeoDebug("Your browser doesn't support a stable version of IndexedDB.")
        return false
    }
    return true
}

function openConnectionToIndexedDb() {
    // Note that request needs to be a var, not let/const
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz
    const databaseName="Psgeo"
    const version = 1
    var request = indexedDB.open(databaseName,version)
    request.onerror = function (event) { 
        psgeoDebug("Opening indexedDB failed.")
        psgeoDebug(lib.debugPrintObject(event))
    } 
    request.onupgradeneeded = function () {
        psgeoDebug("Creating/updating database Psgeo (indexeddb).")
        var db = request.result
        var trackList      = db.createObjectStore("trackList", { keyPath: "trackId" }) // Avoid TDZ
        var recordedTracks = db.createObjectStore("recordedTracks", { keyPath: "timestamp" }) // Avoid TDZ
        trackList.createIndex("trackDate", ["trackDate"], { unique: false })
        recordedTracks.createIndex("trackId", ["trackId"], { unique: false })
    }
    return request
}

function dbAppendTrackList(trackId,trackDate) {
    psgeoDebug("Appending track list")
    var request = openConnectionToIndexedDb()
    request.onfailure = () => db.Close()
    request.onsuccess = function () {
        var db = request.result
        var transaction = db.transaction("trackList", "readwrite")
        var trackList = transaction.objectStore("trackList")
        var trackListIndex = trackList.index("trackDate")

        psgeoDebug("Database connection open. About to put.")
        var putPromise = trackList.put({trackId: trackId, trackDate: trackDate})
        putPromise.onsuccess = function () {
            psgeoDebug("Recorded new track into indexedDB.")
            db.close()
        }
        putPromise.onfailure = function () {
            psgeoDebug("Recording a new track to indexedDB failed.")
            db.close()
        }
    }
}

function dbAppendTrackRecord(trackId,trackDate,latlon) {

    if (!indexedDbSupported) return false

    var request = openConnectionToIndexedDb()
    request.onsuccess = function () {
        var db = request.result
        var transaction = db.transaction("recordedTracks", "readwrite")
        var recordedTracks = transaction.objectStore("recordedTracks")
        var trackIndex = recordedTracks.index("trackId")

        // Store new position or update an existing one. This completes sometime later.
        // Problems with sequence order are unlikely:
        //     - location update frequency is rather slow, <wish>enough interval</wish> to avoid problems
        //     - no major impact on plotted route at walking speeds
        //     - at high speeds (e.g. flying) movement is largely linear, no sudden turns
        // Points can be sorted by positionRecordIndex before plotting if this ever becomes a problem

        var positionTimestamp = new Date()  // seconds since 1.1.1970
        var positionRecord = { timestamp: positionTimestamp, position: latlon, trackId: trackId }
        var putPromise = recordedTracks.put(positionRecord)
        putPromise.onsuccess = function () {
            psgeoDebug("New position stored. Timestamp (posix): "+positionTimestamp+" Track ID: "+trackId+" Track date: "+trackDate)
            db.close()
        }
        putPromise.onfailure = function () {
            psgeoDebug("Recording a new position to indexedDB failed.")
            db.close()
        }
    }
}

function restoreTraceFromDb(lib,lang,trackStartDate,psgeoMap) {
    var tracksToProcess = { "value": 0 } // OBJECT, so that a REFERENCE is passed to fn, not a value
    // Preprocess data for a polyline
    var fn = function(lib,lang,trackData,psgeoMap,tracksToProcess) {
        var trace = []
        for (const index in trackData) {
            let LatLng = trackData[index].position
            psgeoDebug("Recovered position: "+lib.debugPrintObject(LatLng))
            trace.push(LatLng)
            }
        tracksToProcess.value = tracksToProcess.value - 1
        psgeoDebug("Plotting "+trace.length+" datapoints.") 
        plotTrace(psgeoMap,trace)
        }
    // Run fn for each track
    let sharedCounter = tracksToProcess
    let sharedOutput = {} // Not used
    iterateOverTracks(lib,lang,psgeoMap,fn,sharedCounter,sharedOutput,trackStartDate)
}


function iterateOverTracks(lib,lang,psgeoMap,fn,sharedCounter,sharedOutput,trackStartDate) {

    // R E A D   T H I S
    //
    // This function accesses indexeddb and retrieves records as an array.
    // The array is then processed in a sequential order (classic for loop).
    // Function fn is then used inside the loop on each record in sequence: fn(record,sharedCounter,sharedOutput)
    // Because the fn are run asynchronously inside nested .onsuccess callback functions (because of db queries),
    //
    //   1) We need to pass a reference to the object which sould be updated with results: sharedOutput
    //      - this makes it possible e.g. to await iterateOverTracks and then proceed with the results, where needed
    //
    //   2) If fn ever starts anything asynchronous, several processes may run in parellel.
    //      - hence the 'shared' in names
    //      - and any operations on sharedOutput should be atomic in order to avoid sequence order issues
    //
    //   3) We need to pass a reference to a shared counter object { "value": X }
    //      - because fn may need to know when it is the last instance completing
    //      - and the counter needs to be an object, not an integer, because else it would become local to each fn
    //
    // Because JS is dynamically typed, we MUST define initial values for the shareds to force them to be of requested type.


    // In this specific implementation,
    //     - with track we mean the coordinate pair array
    //     - with trace we mean the polyline(s) plotted on map
    let tracksToProcess = sharedCounter // reference object


    psgeoDebug("Loading recorded track data.")
    var request = openConnectionToIndexedDb()
    request.onsuccess = function () {
        var db = request.result
        if (!db.objectStoreNames.contains("recordedTracks")) return         // Nothing to process
        var transaction         = db.transaction(["trackList", "recordedTracks"], "readonly")
        var trackList           = transaction.objectStore("trackList")      // "Table of contents" - keys (id's) by date
        var trackListIndex      = trackList.index("trackDate")
        var recordedTracks      = transaction.objectStore("recordedTracks") // Actual data, indexed by keys
        var recordedTracksIndex = recordedTracks.index("trackId")
        var tracksRequest
        (trackStartDate !== undefined) ? tracksRequest = trackListIndex.getAll([trackStartDate]) : tracksRequest = trackListIndex.getAll()
        tracksRequest.onfailure = function (e) { console.log(e); db.close() }
        tracksRequest.onsuccess = async function () {
            tracksToProcess.value = tracksRequest.result.length             // Reset shared counter to actual value
            psgeoDebug('Tracks to process: '+tracksToProcess.value)
            for (let index=0; index < tracksToProcess.value; index++) {
                psgeoDebug('Processing track '+index)
                let track = tracksRequest.result[index]
                var trackDataRequest = await recordedTracksIndex.getAll([track.trackId]) // async!
                trackDataRequest.onsuccess = function (e) {
                    let trackData = e.target.result // MUST BE LET OR PARAM
                    psgeoDebug('Starting fn process '+tracksToProcess.value)
                    fn(lib,lang,trackData,psgeoMap,tracksToProcess,sharedOutput)
                    }
                }
            }
        }
}

// EXPORT ---------------------------------------

function createGPX(trackName,trace) {

    const docHead = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    const gpxHead = '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="Psgeo"' // creator could be URL to site!
    const trkHead = '<trk><name>'+trackName+'</name><trkseg>' // src, link
    const closure = '</trkseg></trk></gpx>'

    psgeoDebug("Making GPX. Trace length is "+trace.length
)
    let gpxFile = docHead + gpxHead + trkHead
    for (const pt of trace) {
        // trace is an array of positions: [ { lat: "LAT", lng: "LNG } , ... ]
        // <trkpt lat="LATITUDE" lon="LONGITUDE"><ele>ELEVATION</ele><time>TIME</time></trkpt>
        const trkpt = '<trkpt lat="' + pt.lat + '" lon="' + pt.lng + '">'
        psgeoDebug("Making GPX. Adding "+trkpt)
        gpxFile += trkpt
    }
    gpxFile += closure
    return gpxFile
}

function getTrackDownloadLink(trackName,trace) {
    const gpxFile = createGPX(trackName,trace)
    const url = 'data:text/json;charset=utf-8,' + gpxFile
    const link = document.createElement('a')
    link.download = trackName + '.gpx'
    link.href = url
    link.textContent = trackName
    return link 
}

async function showTrackRecordingDialog(lib,lang,cfg,psgeoMap,trackStartDate) { 
    // !! trackStartDate is an optional parameter. It can be undefined.

    let tracksToProcess = { "value": 0 }                     // sharedCounter for async functions
    let tracksForDownloadDiv = document.createElement('div') // sharedOutput for async functions
        tracksForDownloadDiv.setAttribute("id", "Gpx")

    // 1) Prepare the div with initial content

    let closeButton = psgeoGenericMenuButton(
            lang,'','&#10005;',tracksForDownloadDiv,
            () => psgeoMap.controls[google.maps.ControlPosition.BOTTOM_CENTER].removeAt(4),
            '','closeButton',cfg,psgeoDomainDefault)
        closeButton.classList.add('checkboxControlButtons')

    let headerOpts = document.createElement('p')
        headerOpts.classList.add("boldText")
    let headerOptsText = document.createTextNode(lang.getText('trackDisplay'))
        headerOpts.appendChild(headerOptsText)
        tracksForDownloadDiv.appendChild(headerOpts)
    let buttons = psgeoGetGenericRadioGroup(lang,"positionMarker",["markerOnly","lineOnly","markerAndLine"],tracksForDownloadDiv)

    let headerGpx = document.createElement('p')
        headerGpx.classList.add("boldText")
    let headerGpxText = document.createTextNode(lang.getText('downloadGPX'))
        headerGpx.appendChild(headerGpxText)
        tracksForDownloadDiv.appendChild(headerGpx)

    // 2) Define a handler for the database records

    var fn = function(lib,lang,trackData,psgeoMap,sharedCounter,sharedOutput) {
        if (trackData.length > 0) {
            let trackName = trackData[0].trackId   // [{timestamp,position,trackId},...]
            psgeoDebug('Processing record '+trackName)
            let trackPointArray = []
            for (const trackPoint of trackData) trackPointArray.push(trackPoint.position)
            const link = getTrackDownloadLink(trackName,trackPointArray)
            const br = document.createElement('br')
            sharedOutput.appendChild(link) // ideally append these as one object!
            sharedOutput.appendChild(br)   // use object literals??? ZZZZZZZ
        }
        tracksToProcess.value--
            psgeoDebug('The result now has ' + sharedOutput.childElementCount + ' child nodes.')
            console.log(sharedOutput)
            psgeoDebug(tracksToProcess.value+' tracks left.')
        if (tracksToProcess.value === 0) {
            if (document.getElementById('MoreFilter') !== null) document.getElementById('MoreFilter').style.display='none';
            if (document.getElementById('MoreInfo')   !== null) document.getElementById('MoreInfo').style.display='none';
            if (document.getElementById('AboutMenu') !== null)  document.getElementById('AboutMenu').style.display='none';
            if (document.getElementById('OtherTools') !== null)  document.getElementById('OtherTools').style.display='none';
            psgeoMap.controls[google.maps.ControlPosition.BOTTOM_CENTER].setAt(4,sharedOutput)

        }
    }

    // 3) And run!

    iterateOverTracks(lib,lang,psgeoMap,fn,tracksToProcess,tracksForDownloadDiv,trackStartDate)
}


// PLOTTING ---------------------------------------

function plotTrace(psgeoMap,trace) {

    const pathTaken = new google.maps.Polyline({
          path: trace,
          geodesic: true,
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
    });
    pathTaken.setMap(psgeoMap)
}

// GEOLOCATION ---------------------------------------

function PsgeoLocation() {

    // REQUIRES: psgeoGenericMenuButton (visible in the scope?)
    // DELIVERS: geolocationButton, trace, restoreTraceFromDb, trackId, trackDate
    // NOTE: geolocationPending(), geolocationStopWatchPosition(), geolocationAchieved()
    //       contain both code related to geolocation
    //       and code related to the recording and displaying of tracks

    var trace = []                       // This will be plotted in real time.
    var trackId = "0001-01-01T00:00:00Z" // Will be replaced
    var trackDate = "0001-01-01"         //
    var gpsfixCounter = 0                // We want to ignore the first (may be cached)
    
    function psgeoGetGeolocationButton(lang,structure,fn,cfg,psgeoDomainDefault) {
        var icon = cfg.getDefaultIcons.imgGeolocation;
        if ( icon === undefined ) {
            icon=""; psgeoDebug("icon was undefined"); }
        else {
            psgeoDebug("icon was real: " + icon);
        }
        if ( psgeoDomainDefault.hideButtontextGeolocation ) {
            return(psgeoGenericMenuButton(lang,icon,"",structure,fn,'','',cfg,psgeoDomainDefault));
        } else {
            return(psgeoGenericMenuButton(lang,
                                          icon,
                                          (psgeoSmallDisplayMode ?
                                           lang.geolocationLinkText() :
                                           lang.getText("centerMap")),
                                          structure,
                                          fn,'','',cfg,psgeoDomainDefault));
        }
    }

    
    function getGeolocationButton(lang,
                                  lib,
                                  cfg,
                                  psgeoDomainDefault,
                                  psgeoMap,
                                  myPosition,
                                  psgeoGeolocationButton,
                                  psgeoSmallDisplayMode,
                                  geolocationButtonLocation) {
    
        // INIT VARIABLES

        const geolocationOptions =     {maximumAge:0, timeout:60000, enableHighAccuracy: true};
        let geolocatorId = 0;          // Worker id needed to stop it. Actual real ids start from 1.
        let geolocationClicks = 0;     // Geolocation button is on/off toggle depending on %2
    
        // DEFINE AN INFOWINDOW WHICH, WHEN CLOSED, STOPS BACKGROUND WORKER (IF ONE EXISTS)

        //     1. Do not pan map to make this visible when position changes. Let user decide where they look.
        const markerMyPosition = new google.maps.InfoWindow({disableAutoPan: true});

        //     2. closeclick -> stop geolocation
        if (psgeoDomainDefault.geolocationContinuousUpdate) {
            google.maps.event.addListener(markerMyPosition, 'closeclick', function() {
                // Keep the on/off toggle updated.
                geolocationClicks++;
                // User closes infoWindow, so stop updating it.
                // but ONLY if watchPosition worker exists.
                // It allways exists, except for when geolocatorId === 0 (and geolocation support is missing)
                geolocationStopWatchPosition(geolocatorId)
                // if (geolocatorId > 0) navigator.geolocation.clearWatch(geolocatorId); // ok, could be a null test too...
                // Always > 0 if this window exists!
                psgeoDebug("User closed the position marker. Geolocation worker "+geolocatorId+" stopped.");
                // Do not store myLocation as it would eventually become unreliable
                myPosition.lat = null;
                myPosition.lng = null;
                myPosition.acc = null;
                myPosition.alt = null;
                myPosition.heading = null;
                myPosition.speed = null;
             });
         }
    
        // GEOLOCATION HELPER FUNCTIONS

        async function geolocationPending() {

            // Record the trackId into the table of contents
            const timestamp = new Date()          // seconds since 1.1.1970
            trackId = timestamp.toISOString()     // Declared in Psgeolocation. Stored in geolocation object.
            trackStartDate = trackId.substring(0, 10)
            dbAppendTrackList(trackId,trackStartDate)
            psgeoDebug("Stored trackId: "+trackId+" on "+trackStartDate)

            // Bring back previous tracks on screen
            await restoreTraceFromDb(lib,lang,trackStartDate,psgeoMap)

            markerMyPosition.setPosition(psgeoMap.getCenter());
            markerMyPosition.setContent(lang.getText("geolocationWaitForPosition"));
            markerMyPosition.open(psgeoMap);
        }

        function geolocationStopWatchPosition() {
            trace = []           // Clear trace, so that stop/start leaves line gap on map
    	    gpsfixCounter = 0    // We want to ignore the first (may be cached)
            // The web worker in the background will be removed
            navigator.geolocation.clearWatch(geolocatorId);
            markerMyPosition.close();
            psgeoDebug("Toggle "+geolocationClicks+". Geolocation worker " + geolocatorId + " stopped. Marker removed.");
            // Do not store myLocation as it would eventually become unreliable
            myPosition.lat = null;
            myPosition.lng = null;
            myPosition.acc = null;
            myPosition.alt = null;
            myPosition.heading = null;
            myPosition.speed = null;
            return;
        }

        async function geolocationAchieved(position) {

            const firstAcceptedPosition = 10
            const maximumErrorAllowed = 50    // Jitter. True error can be larger (e.g. signal reflections)

    	    gpsfixCounter += 1    // We want to ignore the first (may be cached)
            if (gpsfixCounter < firstAcceptedPosition) return
            if (Math.ceil(position.coords.accuracy) > maximumErrorAllowed) return

            // markerMyPosition has been made visible on map in geolocationPending already.
            // Now update it with position and also update myPosition.
            // NOTE: myPosition is declared in initGeoMap and passed as parameter
            // to make it available where needed.
            myPosition.lat = position.coords.latitude;
            myPosition.lng = position.coords.longitude;
            myPosition.acc = Math.ceil(position.coords.accuracy);
            myPosition.alt = position.coords.altitude;
            myPosition.heading = position.coords.heading;
            myPosition.speed = position.coords.speed;

            // Move marker to current location
            let LatLng = { lat: myPosition.lat, lng: myPosition.lng };
            markerMyPosition.setPosition(LatLng);

            // Store location in browser local storage (for trace)
            await dbAppendTrackRecord(trackId,trackDate,LatLng)

            // Update location history and put it on map
            trace.push(LatLng)
            plotTrace(psgeoMap,trace)

            // Center map when the position is first marked
            //    - but do not constantly recenter the map. That would be annoying.
            //    - autopanning was also set to false in markerMyPosition definition.
            if (markerMyPosition.getContent() === lang.getText("geolocationWaitForPosition")) {
               // First position fix. Center map.
               psgeoMap.setCenter(LatLng);
               // And do NOT do any map centering on successive updates.
               // We can detect that this is the first position fix4
               // because the message text has not yet been changed!
            }
    
            // Display rich position info or just a positional marker?
            if (!psgeoDomainDefault.richPositionInfo) {
                markerMyPosition.setContent(lang.getText("geolocationYouAreHere"));
                return;
            }
    
            // Display position information
            //     (should really create DOM objects, not literal tags!!!)
            let positionText = "Lat: " + myPosition.lat + lib.htmlBreak() + "Lon: " + myPosition.lng + lib.htmlBreak();
            if (myPosition.alt !== null) {
                positionText += lang.getTextWithValues("altitudeInfo", false, [lib.round(myPosition.alt,0)]) + " ";
            }
            if (myPosition.acc !== null) {
                positionText += lang.getTextWithValues("accuracyInfo", false, [myPosition.acc]);
            }
            if (myPosition.speed !== null &&
                myPosition.speed > 0 &&
                myPosition.heading !== null &&
                myPosition.alt !== null) { 
                // speed > 0 guarantees that headding is not NaN,
                // and we check it is not null either.
                // The altitude check exists to tell apart mobile devices with GPS
                // from desktop computers (no altitude info).
                positionText += lib.htmlBreak() 
                             + "&rarr; " 
                             + lib.round(myPosition.heading,0) 
                             + "&deg; " 
                             + lang.getText("Speed") 
                             + ": " 
                             + lib.round(3.6 * myPosition.speed,1) 
                             + " km/h";
            }
    
            if (positionText == "" ) positionText = "Help, I'm lost!";
            markerMyPosition.setContent(positionText);
            // Worker: "+geolocatorId); // DEBUG
    }

    function geolocationFailed(error) {
            // Undo state change so that the next attempt will be an ON toggle too.
            if (geolocationClicks > 0) geolocationClicks = 0;
            // Show the appropriate error message, translated.
            let errorMessage;
            switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = lang.getText("geolocationPermissionDenied");
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = lang.textText("geolocationUnavailable");
                break;
            case error.TIMEOUT:
                errorMessage = lang.getText("geolocationRequestTimeout");
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = lang.getText("geolocationUnknownError");
            break;
            }
            markerMyPosition.setPosition(psgeoMap.getCenter());
            markerMyPosition.setContent(errorMessage);
            // The web worker in the background will be removed
            navigator.geolocation.clearWatch(geolocatorId);
        }
    
    // CREATE GEOLOCATION ON/OFF TOGGLE BUTTON
    psgeoGeolocationButton =
        psgeoGetGeolocationButton(
            lang, 
            geolocationButtonLocation,   // in upper (filter) or lower (info) pane datastructure?
            function() {
                // GEOLOCATION SUPPORT?
                if (!navigator.geolocation) {
                    markerMyPosition.setPosition(psgeoMap.getCenter());
                    markerMyPosition.setContent(lang.getText("geolocationNotSupported"));
                    psgeoDebug("Geolocation not supported.");
                    return;
                }
                // COUNT POINTERDOWNS (click/tap/pen/...)
                geolocationClicks++;
                // SINGLE POSITION?
                if (!psgeoDomainDefault.geolocationContinuousUpdate ) {
                    geolocationPending();
                    navigator.geolocation.getCurrentPosition(geolocationAchieved,
                                                             geolocationFailed,
                                                             geolocationOptions);
                    psgeoDebug("Single geolocation queried.");
                    return;
                }
                // STOP UPDATING POSITION? (every second click: 2,4,6,...)
                if ( geolocationClicks %2 === 0 ) { 
                    geolocationStopWatchPosition(); 
                    return;
                }
                // START WATCHING POSITION? (every second click: 1,3,5,...)
                geolocationPending();
                geolocatorId = navigator.geolocation.watchPosition(geolocationAchieved,
                                                                   geolocationFailed,
                                                                   geolocationOptions);
                psgeoDebug("Click "+geolocationClicks+". Geolocation worker "+geolocatorId+" started.");
                return; 
            }, // end click event function
            cfg,
            psgeoDomainDefault
        ); // end psgeoGetGeolocationButton
       return psgeoGeolocationButton;
    }
    
    return {
        trackId,
        trackDate,
        trace: trace,
        showTrackRecordingDialog: showTrackRecordingDialog,
        restoreTraceFromDb: restoreTraceFromDb,
        getGeolocationButton: getGeolocationButton
    }
    
} // End of PsgeoLocation
