
//
// psGeo geolocation code
//

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

function restoreTraceFromDb(lib,trackStartDate,psgeoMap) {

    // This function is a draft - work in progress
    //
    // Future: split positions into separate hikes (<date/timegap) 
    //         by keeping a record of geolocation start times
    //         More detail on Github.

    psgeoDebug("Loading recorded track data for "+trackStartDate)

        var request = openConnectionToIndexedDb()
        request.onsuccess = function () {
            var db = request.result
            if (!db.objectStoreNames.contains("recordedTracks")) {
                // Nothing to restore
                return
            }
            // Track list - indexed by data
            // var transaction         = db.transaction(["trackList", "recordedTracks"], IDBTransaction.READ_ONLY)
            var transaction         = db.transaction(["trackList", "recordedTracks"], "readonly")
            var trackList           = transaction.objectStore("trackList")
            var trackListIndex      = trackList.index("trackDate")
            // Track data - indexed by track ID
            var recordedTracks      = transaction.objectStore("recordedTracks")
            var recordedTracksIndex = recordedTracks.index("trackId")

            var tracksRequest = trackListIndex.getAll([trackStartDate])
            tracksRequest.onsuccess = function () {
                for (const track of tracksRequest.result) {
                    var trackDataRequest = recordedTracksIndex.getAll([track.trackId])
                    trackDataRequest.onsuccess = function (e) {
                        let trackData = e.target.result // MUST BE LET OR PARAM
                        psgeoDebug(lib.debugPrintObject(trackData))
                        var trace = []
                        for (const index in trackData) {
                            let LatLng = trackData[index].position
                            psgeoDebug("Recovered position: "+lib.debugPrintObject(LatLng))
                            trace.push(LatLng)
                        }
                        psgeoDebug("Plotting "+trace.length+" datapoints.") 
                        plotTrace(psgeoMap,trace)
                    }
                }
            }
            db.close()
        }
}

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

function PsgeoLocation() {

    // REQUIRES: psgeoGenericMenuButton (visible in the scope?)
    // DELIVERS: geolocationButton, trace, restoreTraceFromDb, trackId, trackDate

    var trace = []
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
            restoreTraceFromDb(lib,trackStartDate,psgeoMap)

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
            const maximumErrorAllowed = 20    // Jitter. True error can be larger (e.g. signal reflections)

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
        restoreTraceFromDb: restoreTraceFromDb,
        getGeolocationButton: getGeolocationButton
    }
    
} // End of PsgeoLocation
