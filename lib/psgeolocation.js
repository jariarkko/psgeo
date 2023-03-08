
//
// psGeo geolocation code
//

function PsgeoLocation() {

    // REQUIRES: psgeoGenericMenuButton (visible in the scope?)
    // DELIVERS: geolocationButton
    
    function psgeoGetGeolocationButton(lang,structure,fn,cfg,psgeoDomainDefault) {
        var icon = cfg.getDefaultIcons.imgGeolocation;
        if ( icon === undefined ) { icon=""; psgeoDebug("icon was undefined"); } else { psgeoDebug("icon was real: " + icon); }
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

    
    function getGeolocationButton(lang,lib,cfg,psgeoDomainDefault,psgeoMap,myPosition,psgeoGeolocationButton,psgeoSmallDisplayMode,arrayitems,psgeoFilterPaneTexts) {
    
        // INIT VARIABLES
        const geolocationOptions =     {maximumAge:0, timeout:60000, enableHighAccuracy: true};
        let geolocatorId = 0;          // Worker id needed to stop it. Actual real ids start from 1.
        let geolocationClicks = 0;     // Geolocation button is on/off toggle depending on %2
        let geolocationButtonLocation = 
            psgeoSmallDisplayMode ?
            arrayitems[8] :            // Button to lower pane. Position: after 8th div.
            psgeoFilterPaneTexts[0];   // Button to upper pane. Position: after 1st div (with many labels).
    
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
                if (geolocatorId > 0) navigator.geolocation.clearWatch(geolocatorId); // ok, could be a null test too...
                psgeoDebug("User closed the position marker. Geolocation worker "+geolocatorId+" stopped.");
                // Do not store myLocation as it would eventually become unreliable
                myPosition.lat = null;
                myPosition.lng = null;
                myPosition.alt = null;
                myPosition.heading = null;
                myPosition.speed = null;
             });
         }
    
        // GEOLOCATION HELPER FUNCTIONS
        function geolocationPending() {
            markerMyPosition.setPosition(psgeoMap.getCenter());
            markerMyPosition.setContent(lang.getText("geolocationWaitForPosition"));
            markerMyPosition.open(psgeoMap);
        }
        function geolocationStopWatchPosition() {
            // The web worker in the background will be removed
            navigator.geolocation.clearWatch(geolocatorId);
            markerMyPosition.close();
            psgeoDebug("Toggle "+geolocationClicks+". Geolocation worker " + geolocatorId + " stopped. Marker removed.");
            // Do not store myLocation as it would eventually become unreliable
            myPosition.lat = null;
            myPosition.lng = null;
            myPosition.alt = null;
            myPosition.heading = null;
            myPosition.speed = null;
            return;
        }
        function geolocationAchieved(position) {
            // markerMyPosition has been made visible on map in geolocationPending already.
            // Now update it with position and also update myPosition.
            // NOTE: myPosition is declared in initGeoMap and passed as parameter to make it available where needed.
            myPosition.lat = position.coords.latitude;
            myPosition.lng = position.coords.longitude;
            myPosition.alt = position.coords.altitude;
            myPosition.heading = position.coords.heading;
            myPosition.speed = position.coords.speed;
    
            let LatLng = { lat: myPosition.lat, lng: myPosition.lng };
            markerMyPosition.setPosition(LatLng);
    
            // Center map when the position is first marked
            //    - but do not constantly recenter the map. That would be annoying.
            //    - autopanning was also set to false in markerMyPosition definition.
            if (markerMyPosition.getContent() === lang.getText("geolocationWaitForPosition")) {
               // First position fix. Center map.
               psgeoMap.setCenter(LatLng);
               // And do NOT do any map centering on successive updates.
               // We can detect that this is the first position fix because the message text has not yet been changed!
            }
    
            // Display rich position info or just a positional marker?
            if (!psgeoDomainDefault.richPositionInfo) {
                markerMyPosition.setContent(lang.getText("geolocationYouAreHere"));
                return;
            }
    
            // Display position information
            let positionText = "Lat: " + myPosition.lat + lib.htmlBreak() + "Lon: " + myPosition.lng;
            if (myPosition.alt !== null) {
                positionText += lib.htmlBreak() + lang.getTextWithValues("altitudeInfo", false, [lib.round(myPosition.alt,0)]);
            }
            if (myPosition.speed !== null && myPosition.speed > 0 && myPosition.heading !== null && myPosition.alt !== null) { 
                // speed > 0 guarantees that headding is not NaN, and we check it is not null either.
                // The altitude check exists to tell apart mobile devices with GPS from desktop computers (no altitude info).
                positionText += lib.htmlBreak() + "&rarr; " + lib.round(myPosition.heading,0) + "&deg; " + lang.getText("Speed") + ": " + lib.round(3.6 * myPosition.speed,1) + " km/h";
            }
    
            if (positionText == "" ) positionText = "Help, I'm lost!";
            markerMyPosition.setContent(positionText);
    
            // markerMyPosition.setContent(lang.getText("geolocationYouAreHere")+" Worker: "+geolocatorId); // DEBUG
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
            markerMyPosition.setPosition(map.getCenter());
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
                        markerMyPosition.setPosition(map.getCenter());
                        markerMyPosition.setContent(lang.getText("geolocationNotSupported"));
                        psgeoDebug("Geolocation not supported.");
                        return;
                    }
                    // COUNT POINTERDOWNS (click/tap/pen/...)
                    geolocationClicks++;
                    // SINGLE POSITION?
                    if (!psgeoDomainDefault.geolocationContinuousUpdate ) {
                        geolocationPending();
                        navigator.geolocation.getCurrentPosition(geolocationAchieved,geolocationFailed,geolocationOptions);
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
                    geolocatorId = navigator.geolocation.watchPosition(geolocationAchieved,geolocationFailed,geolocationOptions);
                    psgeoDebug("Click "+geolocationClicks+". Geolocation worker "+geolocatorId+" started.");
                    return; 
                 }, // end click event function
                 cfg,
                 psgeoDomainDefault
             ); // end psgeoGetGeolocationButton
    
       return psgeoGeolocationButton;
    }
    
    return {
        getGeolocationButton: getGeolocationButton
    }
    
} // End of PsgeoLocation
