
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

function dbAppendTrackRecord(trackId,trackDate,latlon,altitude) {

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

        var posixTimestamp = new Date()  // seconds since 1.1.1970
        var positionTimestamp = posixTimestamp.toISOString()
        var positionRecord = { timestamp: positionTimestamp, position: latlon, trackId: trackId, alt: altitude}
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

function restoreTraceFromDb(lib,lang,trackStartDate,psgeoMap,psgeoDomainDefault) {

    if (!psgeoDomainDefault.locationTracking.showTrack) return false

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
        psgeoDebug("Database connection open.")
        var db = request.result
        if (!db.objectStoreNames.contains("recordedTracks")) return         // Nothing to process
        var transaction         = db.transaction(["trackList", "recordedTracks"], "readonly")
        var trackList           = transaction.objectStore("trackList")      // "Table of contents" - keys (id's) by date
        var trackListIndex      = trackList.index("trackDate")
        var recordedTracks      = transaction.objectStore("recordedTracks") // Actual data, indexed by keys
        var recordedTracksIndex = recordedTracks.index("trackId")
        var tracksRequest
        if (lib.isDeclared(trackStartDate) && trackStartDate !== undefined) {
            psgeoDebug("Retrieving a list of todays tracks.")
            tracksRequest = trackListIndex.getAll([trackStartDate])
        } else {
            psgeoDebug("Retrieving a list of all tracks.")
            tracksRequest = trackListIndex.getAll()
        }
        tracksRequest.onfailure = function (e) { console.log(e); db.close() }
        tracksRequest.onsuccess = async function () {
            tracksToProcess.value = tracksRequest.result.length             // Reset shared counter to actual value
            psgeoDebug('Tracks to process: '+tracksToProcess.value)
            if (tracksToProcess.value === 0) sharedOutput.innerHTML=lang.getText("noRecordedTracks")
            for (let index=0; index < tracksToProcess.value; index++) {
                psgeoDebug('Processing track '+index)
                let track = tracksRequest.result[index]
                var trackDataRequest = await recordedTracksIndex.getAll([track.trackId]) // async!
                trackDataRequest.onsuccess = function (e) {
                    let trackData = e.target.result // MUST BE LET OR PARAM
                    // we want { lat: LAT, lng: LNG, alt: ALT } // ZZZZZZ
                    fn(lib,lang,trackData,psgeoMap,tracksToProcess,sharedOutput)
                    }
                }
            }
        }
}

// EXPORT ---------------------------------------

function createGPX(trackName,trackData) {
    psgeoDebug("Making GPX. Track length is "+trackData.length)
    const docHead = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
    const gpxHead = '<gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" version="1.1" creator="Psgeo">' // creator could be URL to site!
    const trkHead = '<trk><name>'+trackName+'</name><trkseg>' // src, link
    const closure = '</trkseg></trk></gpx>'
    let   gpxFile = docHead + gpxHead + trkHead
    for (const pt of trackData) {
        // trackData = [{timestamp,location,trackName,alt},...]
        // where location = {lat,lng} and alt may be undefined
        // Make this: <trkpt lat="LATITUDE" lon="LONGITUDE"><ele>ELEVATION</ele><time>TIME</time></trkpt>
        gpxFile += '<trkpt lat="' + pt.position.lat + '" lon="' + pt.position.lng + '">'
        if (pt.alt !== null && pt.alt !== undefined) gpxFile += '<ele>' + pt.alt + '</ele>'
        gpxFile += '<time>'+pt.timestamp+'</time>'
        gpxFile += '</trkpt>'
    }
    gpxFile += closure
    return gpxFile
}

function getTrackDownloadLink(trackName,trackData) {
    const gpxFile = createGPX(trackName,trackData)
    const url = 'data:text/json;charset=utf-8,' + gpxFile
    const link = document.createElement('a')
    link.download = trackName + '.gpx'
    link.href = url
    link.textContent = trackName
    return link 
}

function positionTrackingMenuInit(lib,lang,cfg,psgeoMap,psgeoDomainDefault,trackStartDate) {
    // !! trackStartDate is an optional parameter. It can be undefined.

    // 1) Create a container div for the menu
    let positionTrackingMenuDiv = document.createElement('div')
        positionTrackingMenuDiv.setAttribute("id", "positionTrackingMenuDiv")
    let closeButton = psgeoGenericMenuButton(
            lang,'','&#10005;',positionTrackingMenuDiv,
            () => positionTrackingMenuDiv.style.display="none",
            '','closeButton',cfg,psgeoDomainDefault)
        closeButton.classList.add('checkboxControlButtons')

    // 2) Add radio buttons for track recording settings
    let headerOpts = document.createElement('p')
        headerOpts.classList.add("boldText")
    let headerOptsText = document.createTextNode(lang.getText('trackDisplay'))
        headerOpts.appendChild(headerOptsText)
        positionTrackingMenuDiv.appendChild(headerOpts)
    let radioGroup = "positionDisplay"
    let idArray = [ "showPositionMarker","showTrack","showPositionMarkerAndTrack" ]
    let fnArray = [ () => { psgeoDomainDefault.locationTracking.showPositionMarker=true
                            psgeoDomainDefault.locationTracking.showTrack=false 
                            window.localStorage.setItem("showPositionMarker",JSON.stringify(true))
                            window.localStorage.setItem("showTrack",JSON.stringify(false))},
                    () => { psgeoDomainDefault.locationTracking.showPositionMarker=false
                            psgeoDomainDefault.locationTracking.showTrack=true
                            window.localStorage.setItem("showPositionMarker",JSON.stringify(false))
                            window.localStorage.setItem("showTrack",JSON.stringify(true)) },
                    () => { psgeoDomainDefault.locationTracking.showPositionMarker=true
                            psgeoDomainDefault.locationTracking.showTrack=true
                            window.localStorage.setItem("showPositionMarker",JSON.stringify(true))
                            window.localStorage.setItem("showTrack",JSON.stringify(true)) }
                  ]
    let checkedIndex = 2
    if (psgeoDomainDefault.locationTracking.showPositionMarker === true  && psgeoDomainDefault.locationTracking.showTrack === false) {
        checkedIndex = 0
    }
    if (psgeoDomainDefault.locationTracking.showPositionMarker === false && psgeoDomainDefault.locationTracking.showTrack === true) {
        checkedIndex = 1
    }

    let buttons = psgeoGetGenericRadioGroup(lang,radioGroup,idArray,fnArray,checkedIndex,positionTrackingMenuDiv,psgeoDomainDefault)

    // 3) Add a checkbox for rich position info
    let id = "richPositionInfo"
    let text = lang.getText(id)
    let structure = positionTrackingMenuDiv
    let initiallyChecked = psgeoDomainDefault.locationTracking.richPositionInfo
    let spacer = "br"
    positionTrackingMenuDiv.appendChild(document.createElement('br'))
    let richPositionInfo = psgeoGetGenericCheckbox(id,text,structure,initiallyChecked,spacer)
        richPositionInfo.onclick = function () {
            if (psgeoDomainDefault.locationTracking.richPositionInfo) {
                psgeoDomainDefault.locationTracking.richPositionInfo = false
            } else {
                psgeoDomainDefault.locationTracking.richPositionInfo = true
            }
        }
    // 3) Add a header for GPX download
    let headerGpx = document.createElement('p')
        headerGpx.classList.add("boldText")
    let headerGpxText = document.createTextNode(lang.getText('downloadGPX'))
        headerGpx.appendChild(headerGpxText)
        positionTrackingMenuDiv.appendChild(headerGpx)

    // 4) Add record/doNotRecord checkbox // MAKE THIS A FUNCTION
    id = "recordRoute"
    text = lang.getText(id)
    structure = positionTrackingMenuDiv
    initiallyChecked = psgeoDomainDefault.locationTracking.trackRecording
    spacer = "br"
    let recordRoute = psgeoGetGenericCheckbox(id,text,structure,initiallyChecked,spacer)
    recordRoute.onclick = function () {
        if (psgeoDomainDefault.locationTracking.trackRecording) {
            psgeoDomainDefault.locationTracking.trackRecording = false
        } else {
            psgeoDomainDefault.locationTracking.trackRecording = true
        }
    }

    // 5) Add initial delay to plotting
    id = "requireStablePosition"
    text = lang.getText(id)
    structure = positionTrackingMenuDiv
    let plotOnlyStablePosition = false 
    initiallyChecked = psgeoDomainDefault.locationTracking.requireStablePosition
    spacer = "br"
    let requireStablePosition = psgeoGetGenericCheckbox(id,text,structure,initiallyChecked,spacer)
    requireStablePosition.onpointerdown = function () {
        // Use onpointerdown instead of onclick to avoid spurious clicks:
        // Sometimes the menu button and the checkbox in the opening menu overlap!
        if (psgeoDomainDefault.locationTracking.requireStablePosition) {
            psgeoDomainDefault.locationTracking.requireStablePosition = false
        } else {
            psgeoDomainDefault.locationTracking.requireStablePosition = true
        }
    }
    positionTrackingMenuDiv.appendChild(document.createElement('br'))

    // 6) Add a container for GPX download links
    let tracksForDownloadDiv = document.createElement('div') // sharedOutput for async functions
        tracksForDownloadDiv.setAttribute("id", "Gpx")
        positionTrackingMenuDiv.appendChild(tracksForDownloadDiv)

    // 7) Publish
    positionTrackingMenuDiv.style.display="none"
    psgeoMap.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(positionTrackingMenuDiv)
}

async function showTrackRecordingDialog(lib,lang,cfg,psgeoMap,psgeoDomainDefault,trackStartDate) { 

    // 1) Define a handler for the database records
    var fn = function(lib,lang,trackData,psgeoMap,sharedCounter,sharedOutput) {
        if (trackData.length > 0) {
            let trackName = trackData[0].trackId   // [{timestamp,position,trackId,alt},...]
            // let trackPointArray = []
            // for (const trackPoint of trackData) trackPointArray.push(trackPoint.position)
            // const link = getTrackDownloadLink(trackName,trackPointArray)
            const link = getTrackDownloadLink(trackName,trackData)
            const br = document.createElement('br')
            sharedOutput.appendChild(link) // ideally append these as one object!
            sharedOutput.appendChild(br)   // use object literals??? ZZZZZZZ
        }
        tracksToProcess.value--
        if (tracksToProcess.value === 0) { // Last fn process // Close Group
            if (sharedOutput.innerHTML === "") sharedOutput.innerHTML=lang.getText("noRecordedTracks")
            document.getElementById('positionTrackingMenuDiv').style.display='block'
        }
    }

    // 2) And run download link generation!
    let tracksForDownloadDiv = document.getElementById('Gpx') // Locate the div
        tracksForDownloadDiv.innerHTML = ""                   // Clear old contents
    let tracksToProcess = { "value": 0 }                      // SharedCounter for async functions

    if (document.getElementById('MoreFilter') !== null) document.getElementById('MoreFilter').style.display='none';
    if (document.getElementById('MoreInfo')   !== null) document.getElementById('MoreInfo').style.display='none';
    if (document.getElementById('AboutMenu') !== null)  document.getElementById('AboutMenu').style.display='none';
    if (document.getElementById('OtherTools') !== null)  document.getElementById('OtherTools').style.display='none';
    document.getElementById('positionTrackingMenuDiv').style.display='block'
    lib.reCenterCustomControl('positionTrackingMenuDiv')

    iterateOverTracks(lib,lang,psgeoMap,fn,tracksToProcess,tracksForDownloadDiv,trackStartDate) // Update
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
                // Make sure this position marker does not come back:
                psgeoDomainDefault.locationTracking.showPositionMarker = false
                // Reset the track display setting
                document.getElementById('showPositionMarker').checked=false
                document.getElementById('showPositionMarkerAndTrack').checked=false
                if (psgeoDomainDefault.locationTracking.showTrack) {
                    document.getElementById('showTrack').checked=true
                } else {
                    document.getElementById('showTrack').checked=false
                    // No more position markers on map. We can stop the worker.
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
                    }
             })
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
            await restoreTraceFromDb(lib,lang,trackStartDate,psgeoMap,psgeoDomainDefault)
            markerMyPosition.setPosition(psgeoMap.getCenter());
            markerMyPosition.setContent(lang.getText("geolocationWaitForPosition"));
            markerMyPosition.open(psgeoMap);
        }

        function geolocationStopWatchPosition() {
            trace = []           // Clear trace, so that stop/start leaves line gap on map
    	    gpsfixCounter = 0    // We want to ignore the first (may be cached)
            navigator.geolocation.clearWatch(geolocatorId);
            markerMyPosition.close();
            psgeoDebug("Toggle "+geolocationClicks+". Geolocation worker " + geolocatorId + " stopped. Marker removed.");
            myPosition.lat = null;
            myPosition.lng = null;
            myPosition.acc = null;
            myPosition.alt = null;
            myPosition.heading = null;
            myPosition.speed = null;
            return;
        }


        // async function geolocationAchieved()
        // is a callback function that gets position as its only parameter.
        // In order to pass another parameter we instead need to define geolocationAchieved as
        // a function of param, which returns a function of position (now with param included in the code of course)
        // Syntactically this can be done in two ways:
        // EITHER with (anonymous) arrow functions of the form () => { }
        //     const geolocationAchieved = (param) =>
        //                                 async (position) => { console.log(param); console.log(position) }
        //     const watchId = navigator.geolocation.watchPosition(geolocationAchieved(myParam), errorCallback);
        // OR
        //     function geolocationAchieved(param) {
        //         return async function(position) {
        //             console.log(param); console.log(position)
        //         }
        //     }
        //     var watchId = navigator.geolocation.watchPosition(geolocationAchieved(myParam), errorCallback);
        // HOWEVER,
        //     objects and variables might still be visible and it's not necessary to pass them as parameters!
        //     
        // const geolocationAchieved = (psgeoDomainDefault) => async (position) => {
        async function geolocationAchieved(position) {
    	    gpsfixCounter += 1                        // Declared in function Psgeolocation
            if (gpsfixCounter === 1) return           // Ignore first position, which often is a cached one.
            myPosition.lat = position.coords.latitude // Declared in function initGeoMap
            myPosition.lng = position.coords.longitude
            myPosition.acc = Math.ceil(position.coords.accuracy)
            myPosition.alt = position.coords.altitude
            myPosition.heading = position.coords.heading
            myPosition.speed = position.coords.speed
            let LatLng = { lat: myPosition.lat, lng: myPosition.lng }

            // A) Center map when the position is first marked
            // - but do not constantly recenter the map. That would be annoying.
            // - we can detect that this is the first position fix
            //   because the message text has not yet been changed!
            // - autopanning was also set to false in markerMyPosition definition.
            if (markerMyPosition.getContent() === lang.getText("geolocationWaitForPosition")) {
               psgeoMap.setCenter(LatLng) // First accepted position
               psgeoMap.setZoom(psgeoDomainDefault.locationTracking.initialZoomWhenTrackingPosition)
            }
            // B) Move marker to current location
            if (psgeoDomainDefault.locationTracking.showPositionMarker) {
                markerMyPosition.open(psgeoMap)
                markerMyPosition.setPosition(LatLng)
            } else {
                markerMyPosition.close()
            }
            // C) Store location
            //    Ignore 10 first positions (at least Firefox is awful at first)
            //    After 10 positions only ignore inaccurate positions
            if (psgeoDomainDefault.locationTracking.requireStablePosition === false) {
                trace.push(LatLng) // Update the data for the polyline
                if (psgeoDomainDefault.locationTracking.trackRecording) {
                    await dbAppendTrackRecord(trackId,trackDate,LatLng,myPosition.alt) // store in indexeddb
                }
             } else if (gpsfixCounter >= firstAcceptedPosition &&
                        Math.ceil(position.coords.accuracy) <= maximumErrorAllowed) {
                            trace.push(LatLng) // Update the data for the polyline
                            if (psgeoDomainDefault.locationTracking.trackRecording) {
                                await dbAppendTrackRecord(trackId,trackDate,LatLng,myPosition.alt) // store in indexeddb
                            }
            }
            // D) Trace track on map
            if (psgeoDomainDefault.locationTracking.showTrack) plotTrace(psgeoMap,trace)
            // E) Display rich position info or just a positional marker?
            if (!psgeoDomainDefault.locationTracking.richPositionInfo) {
                markerMyPosition.setContent(lang.getText("geolocationYouAreHere"))
                return
            }
            // This should really create DOM objects, not literal tags!
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
                // speed > 0 guarantees that heading is not NaN,
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
        getGeolocationButton: getGeolocationButton,
        positionTrackingMenuInit: positionTrackingMenuInit
    }
    
} // End of PsgeoLocation
