//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)

//          Ralf Strandell (improvements)
//
//
// This is the PsgeoLib module. It provides a library of useful
// functions to look at activities.
//
// Usage:
//
//   // create an object
//   var foo = PsgeoLib();
//
//   // get the list of "main" activities
//   var list = foo.getActivityList();
//
//   // get the list of "other" activities not considered main
//   var listother = foo.getOtherActivityList();
//
//   // test if an activity is other or main
//   var resultisno = foo.isOtherActivity(foo.jsonSchemaActivitySkiing);
//
//   // For some activities, there's a shorter name (to compress how much
//   // space they consume in UIs, lists, etc.)
//   var shorter = foo.getShorter
//
//   // get the marker URL for a particular type of activity
//   var marker = foo.getActivityMarkerImage("Caving");
//
//   // get the activity string for caving, as defined in
//   // the JSON schema
//   var cavingActivity = foo.jsonSchemaActivityCaving;
//
//   // set the marker URL for a particular type of activity
//   foo.setActivityMarkerImage(cavingActivity,"./plainpink.png");
//
//   // create a filter for a particular activity
//   var bar = PsgeoDB([]);
//   var filt = getDefaultFilterSwimming(bar);
//

//
// Internal definitions -- do not change
//

function PsgeoLib() {

    //
    // Changeable parameters, which you could change, but
    // it would be much better to use setActivityMarkerImage
    // instead. For instance:
    //
    //   psgeolib.setActivityMarkerImage("Caving",
    //                                   "./plainyellow.png");
    //
   
    const balloonStand = "./icons/balloons/" 
    // Using tabs to adjust columns
    const activityMarkerAfterski =      balloonStand + "plainred.png";
    const activityMarkerBiking =        balloonStand + "plainyellow.png";
    const activityMarkerCanoeing =      balloonStand + "plainblue.png";
    const activityMarkerCar =           balloonStand + "plainpink.png";
    const activityMarkerCaving =        balloonStand + "plainpurple.png";
    const activityMarkerCharity =       balloonStand + "plainpink.png";
    const activityMarkerClimbing =      balloonStand + "plainpurple.png";
    const activityMarkerDiving =        balloonStand + "plainblue.png";
    const activityMarkerEquipment =     balloonStand + "plainpink.png";
    const activityMarkerFlying =        balloonStand + "plainblue.png";
    const activityMarkerFood =          balloonStand + "plainred.png";
    const activityMarkerHealth =        balloonStand + "plainred.png";
    const activityMarkerHiking =        balloonStand + "plaingreen.png";
    const activityMarkerSnowshoeing =   balloonStand + "plainwhite.png";
    const activityMarkerHistory =       balloonStand + "plainpink.png";
    const activityMarkerPeople =        balloonStand + "plainpink.png";
    const activityMarkerPolitical =     balloonStand + "plainpink.png";
    const activityMarkerSauna =         balloonStand + "plaingrey.png";
    const activityMarkerSkiing =        balloonStand + "plainwhite.png";
    const activityMarkerSkydiving =     balloonStand + "plainblue.png";
    const activityMarkerSliding =       balloonStand + "plainwhite.png";
    const activityMarkerSnowboarding =  balloonStand + "plainwhite.png";
    const activityMarkerSurfing =       balloonStand + "plainblue.png";
    const activityMarkerSwimming =      balloonStand + "plainblue.png";
    const activityMarkerTravel =        balloonStand + "plainblue.png";
    const activityMarkerUrbanExploration = balloonStand + "plainbrown.png";
    const activityMarkerWakeboarding =  balloonStand + "plainblue.png";
    const activityMarkerWalking =       balloonStand + "plaingreen.png";
    const activityMarkerWaterfalls =    balloonStand + "plainblue.png";
    const activityMarkerMeteorites =    balloonStand + "plainpurple.png";
    const activityMarkerOther =         balloonStand + "plainpink.png";

    //
    // Fixed parameters (can't change these as the JSON files rely on these).
    //
    
    const jsonSchemaActivityAfterski = "Afterski";
    const jsonSchemaActivityBiking = "Biking";
    const jsonSchemaActivityCanoeing = "Canoeing";
    const jsonSchemaActivityCar = "Car";
    const jsonSchemaActivityCaving = "Caving";
    const jsonSchemaActivityCharity = "Charity";
    const jsonSchemaActivityClimbing = "Climbing";
    const jsonSchemaActivityDiving = "Diving";
    const jsonSchemaActivityEquipment = "Equipment";
    const jsonSchemaActivityFlying = "Flying";
    const jsonSchemaActivityFood = "Food";
    const jsonSchemaActivityHealth = "Health";
    const jsonSchemaActivityHiking = "Hiking";
    const jsonSchemaActivitySnowshoeing = "Snowshoeing";
    const jsonSchemaActivityHistory = "History";
    const jsonSchemaActivityPeople = "People";
    const jsonSchemaActivityPolitical = "Political";
    const jsonSchemaActivitySauna = "Sauna";
    const jsonSchemaActivitySkiing = "Skiing";
    const jsonSchemaActivitySkydiving = "Skydiving";
    const jsonSchemaActivitySliding = "Sliding";
    const jsonSchemaActivitySnowboarding = "Snowboarding";
    const jsonSchemaActivitySurfing = "Surfing";
    const jsonSchemaActivitySwimming = "Swimming";
    const jsonSchemaActivityTravel = "Travel";
    const jsonSchemaActivityUrbanExploration = "Urban-Exploration";
    const jsonSchemaActivityWakeboarding = "Wakeboarding";
    const jsonSchemaActivityWalking = "Walking";
    const jsonSchemaActivityWaterfalls = "Waterfalls";
    const jsonSchemaActivityMeteorites = "Meteorites";
    const jsonSchemaActivityOther = "Other";
    
    //
    // Internal variables and parameters, do not touch these
    //
    
    var markerImageTable = {};
    markerImageTable[jsonSchemaActivityAfterski] = activityMarkerAfterski;
    markerImageTable[jsonSchemaActivityBiking] = activityMarkerBiking;
    markerImageTable[jsonSchemaActivityCanoeing] = activityMarkerCanoeing;
    markerImageTable[jsonSchemaActivityCar] = activityMarkerCar;
    markerImageTable[jsonSchemaActivityCaving] = activityMarkerCaving;
    markerImageTable[jsonSchemaActivityCharity] = activityMarkerCharity;
    markerImageTable[jsonSchemaActivityClimbing] = activityMarkerClimbing;
    markerImageTable[jsonSchemaActivityDiving] = activityMarkerDiving;
    markerImageTable[jsonSchemaActivityEquipment] = activityMarkerEquipment;
    markerImageTable[jsonSchemaActivityFlying] = activityMarkerFlying;
    markerImageTable[jsonSchemaActivityFood] = activityMarkerFood;
    markerImageTable[jsonSchemaActivityHealth] = activityMarkerHealth;
    markerImageTable[jsonSchemaActivityHiking] = activityMarkerHiking;
    markerImageTable[jsonSchemaActivitySnowshoeing] = activityMarkerSnowshoeing;
    markerImageTable[jsonSchemaActivityHistory] = activityMarkerHistory;
    markerImageTable[jsonSchemaActivityPeople] = activityMarkerPeople;
    markerImageTable[jsonSchemaActivityPolitical] = activityMarkerPolitical;
    markerImageTable[jsonSchemaActivitySauna] = activityMarkerSauna;
    markerImageTable[jsonSchemaActivitySkiing] = activityMarkerSkiing;
    markerImageTable[jsonSchemaActivitySkydiving] = activityMarkerSkydiving;
    markerImageTable[jsonSchemaActivitySliding] = activityMarkerSliding;
    markerImageTable[jsonSchemaActivitySnowboarding] = activityMarkerSnowboarding;
    markerImageTable[jsonSchemaActivitySurfing] = activityMarkerSurfing;
    markerImageTable[jsonSchemaActivitySwimming] = activityMarkerSwimming;
    markerImageTable[jsonSchemaActivityTravel] = activityMarkerTravel;
    markerImageTable[jsonSchemaActivityUrbanExploration] = activityMarkerUrbanExploration;
    markerImageTable[jsonSchemaActivityWakeboarding] = activityMarkerWakeboarding;
    markerImageTable[jsonSchemaActivityWalking] = activityMarkerWalking;
    markerImageTable[jsonSchemaActivityWaterfalls] = activityMarkerWaterfalls;
    markerImageTable[jsonSchemaActivityMeteorites] = activityMarkerMeteorites;
    markerImageTable[jsonSchemaActivityOther] = activityMarkerOther;
    
    var activitiesList = [
        jsonSchemaActivityBiking,
        jsonSchemaActivityCaving,
        jsonSchemaActivityClimbing,
        jsonSchemaActivitySauna,
        jsonSchemaActivitySkiing,
        jsonSchemaActivitySnowboarding,
        jsonSchemaActivitySwimming,
        jsonSchemaActivityUrbanExploration,
        // not included: everything in the otherActivitiesLlist
        jsonSchemaActivityOther
    ];
    
    var otherActivitiesList = [
        jsonSchemaActivityAfterski,
        jsonSchemaActivityCanoeing,
        jsonSchemaActivityCar,
        jsonSchemaActivityCharity,
        jsonSchemaActivityDiving,
        jsonSchemaActivityEquipment,
        jsonSchemaActivityFlying,
        jsonSchemaActivityFood,
        jsonSchemaActivityHealth,
        jsonSchemaActivityHiking,
        jsonSchemaActivitySnowshoeing,
        jsonSchemaActivityHistory,
        jsonSchemaActivityPeople,
        jsonSchemaActivityPolitical,
        jsonSchemaActivitySkydiving,
        jsonSchemaActivitySliding,
        jsonSchemaActivitySurfing,
        jsonSchemaActivityTravel,
        jsonSchemaActivityWakeboarding,
        jsonSchemaActivityWalking,
        jsonSchemaActivityWaterfalls,
        jsonSchemaActivityMeteorites
    ];

    const jsonSchemaActivitySnowboardingShortName = "Snowboard";
    const jsonSchemaActivityWakeboardingShortName = "Wakeboard";
    const jsonSchemaActivityClimbingShortName = "Climb";
    const jsonSchemaActivitySurfingShortName = "Surf";
    const jsonSchemaActivityCavingShortName = "Cave";
    const jsonSchemaActivitySwimmingShortName = "Swim";
    const jsonSchemaActivityWaterfallsShortName = "Waterfall";
    const jsonSchemaActivitySkiingShortName = "Ski";
    const jsonSchemaActivityDivingShortName = "Dive";
    const jsonSchemaActivityUrbanExplorationShortName = "Urbanex";
    
    var shortNames = [];
    shortNames[jsonSchemaActivityCaving] = jsonSchemaActivityCavingShortName;
    shortNames[jsonSchemaActivityClimbing] = jsonSchemaActivityClimbingShortName;
    shortNames[jsonSchemaActivityDiving] = jsonSchemaActivityDivingShortName;
    shortNames[jsonSchemaActivitySkiing] = jsonSchemaActivitySkiingShortName;
    shortNames[jsonSchemaActivitySnowboarding] = jsonSchemaActivitySnowboardingShortName;
    shortNames[jsonSchemaActivitySurfing] = jsonSchemaActivitySurfingShortName;
    shortNames[jsonSchemaActivitySwimming] = jsonSchemaActivitySwimmingShortName;
    shortNames[jsonSchemaActivityUrbanExploration] = jsonSchemaActivityUrbanExplorationShortName;
    shortNames[jsonSchemaActivityWakeboarding] = jsonSchemaActivityWakeboardingShortName;
    shortNames[jsonSchemaActivityWaterfalls] = jsonSchemaActivityWaterfallsShortName;
    
    function getActivityList() {
        
        return(activitiesList);
    }
    
    function getActivityListDominanceOrder() {

        var activitiesListDominance = [];
        activitiesListDominance.push(jsonSchemaActivitySkiing);
        activitiesListDominance.push(jsonSchemaActivityCaving);
        activitiesListDominance.push(jsonSchemaActivityUrbanExploration);
        activitiesListDominance.push(jsonSchemaActivitySauna);
        activitiesListDominance.push(jsonSchemaActivityClimbing);
        activitiesListDominance.push(jsonSchemaActivitySnowboarding);
        
        var i;
        for (i = 0; i < activitiesList.length; i++) {
            var activity = activitiesList[i];
            if (activitiesListDominance.indexOf(activity) != -1) {
                activitiesListDominance.push(activity);
            }
        }
        
        return(activitiesListDominance);
    }
    
    function getOtherActivityList() {
        
        return(otherActivitiesList);
    }
    
    function isOtherActivity(activity) {
        
        return(otherActivitiesList.indexOf(activity) != -1);
    }

    function getActivityShortName(activity)  {
        var shortName = shortNames[activity];
        if (shortName !== null && (typeof shortName) === "string") {
            return(shortName);
        } else {
            return(activity);
        }
    }
    
    function getActivityMarkerImage(activity) {
        if (markerImageTable[activity] === undefined) {
            return(markerImageTable.Other);
        } else {
            return(markerImageTable[activity]);
        }
    }

    //
    // Subactivities --------------------------------------------------------------------------
    //
    
    function getCavingMaterialSubActivities() {
        return(["Rock",
                "Glacier",          // walls are ice
                "Ice",              // ice covers the walls (or big part)
                "Man-Made",         // concrete as in bunkers, tunnels
                "Material-Other"]); // moraine, turf, others
    }
    
    function getCavingMovementSubActivities() {
        return(["Basic",
                "SRT",
                "Swimming",
                "Boating",
                "Diving",
                "Digging",
                "Biking",
                "Skiing"]);
    }
    
    function getCavingNonMovementActivitySubActivities() {
        return(["Surveying",
                "Researching",
                "Training",
                "Studying",
                "Social",
                "Media"]);
    }
    
    function getCavingMovementAndNonMovementActivitySubActivities() {
        var result = getCavingMovementSubActivities();
        result = result.concat(getCavingNonMovementActivitySubActivities());
        return(result);
    }
    
    function getCavingRockTypeSubActivities(includeUnknown = false) {
        var result = ["Rock-Volcanic",
                      "Rock-Sandstone",
                      "Rock-Mudrock",
                      "Rock-Limestone",
                      "Rock-Gypsum",
                      "Rock-Salt",
                      "Rock-Marble",
                      "Rock-Granite" ];
                      // "Rock-Other"];
        if (includeUnknown) result.push("Rock-Unknown");
        return(result);
    }
    
    function getCavingRockTypeAndOtherMaterialSubActivities(includeUnknown = false) {
        var result = ["Glacier",
                      "Ice",
                      "Man-Made",
                      "Material-Other"];
        result = result.concat(getCavingRockTypeSubActivities(includeUnknown));
        return(result);
    }
    function getCavingMorphologySubActivities(includeUnknown = false) {
        var result = [
            "Morphology-Crack",
            "Morphology-Boulders",
            "Morphology-Karst",
            "Morphology-Volcanic",
            "Morphology-Erosion",
            "Morphology-Weathering",
            "Morphology-Crystallization",
            "Morphology-Organic" // reef caves and turf caves
            // "Morphology-Other"
            // Lippaluola, Morphology-Rockshelter (or -Shelter)
        ];
        if (includeUnknown) result.push("Morphology-Unknown");
        return(result);
    }
    
    function getSwimmingWaterbodySubActivities(includeUnknown = false) {
        var result = ["Waterbody-River",
                      "Waterbody-Lake",
                      "Waterbody-Sandpit",
                      "Waterbody-Sea",
                      "Waterbody-Pool",
                      "Waterbody-Cave",
                      "Waterbody-Other"];
        if (includeUnknown) result.push("Waterbody-Unknown");
        return(result);
    }

    function getSwimmingOtherPlaceSubActivities(includeUnknown = false) {
        var result = ["Outdoor",
                      "Indoor",
                      "Underground",
                      "Beach",
                      "Nature",
                      "Thermal-Bath",
                      "Other"];
        if (includeUnknown) result.push("Unknown");
        return(result);
    }
    
    function getSwimmingPlaceSubActivities(includeUnknown = false) {
        var result = getSwimmingWaterbodySubActivities(includeUnknown);
        result = result.concat(getSwimmingOtherPlaceSubActivities(includeUnknown));
        return(result);
    }
    
    function getSwimmingMaterialSubActivities(includeUnknown = false) {
        var result = ["Water",
                      "Ice",
                      "Balls",
                      "Material-Other",
                      "None"];
        if (includeUnknown) result.push("Material-Unknown");
        return(result);
    }

    function getClimbingTypeSubActivities(includeUnknown = false) {
        var result = ["Mountain",
                      "Rock",
                      "Ice",
                      "Wall",
                      "Volcanoes",
                      "None",
                      "Other"];
        if (includeUnknown) result.push("Unknown");
        return(result);
    }
    
    function getSaunaTypeSubActivities(includeUnknown = false) {
        var result = ["Normal",
                      "Smoke",
                      "Steam",
                      "Infrared",
                      "None",
                      "Other"];
        if (includeUnknown) result.push("Unknown");
        return(result);
    }

    function getSkiingSubstanceSubActivities(includeUnknown = false) {
        var result = ["Snow",
                      "Sand",
                      "Rock",
                      "Ash",
                      "Asphalt",
                      "Grass",
                      "Mud",
                      "Plastic",
                      "Substance-Other",
                      "Imported-Snow"];
        if (includeUnknown) result.push("Substance-Unknown");
        return(result);
    }

    function getSkiingPlaceSubActivities(includeUnknown = false) {
        var result = ["Indoor",
                      "Outdoor",
                      "Underground"];
        if (includeUnknown) result.push("Unknown");
        return(result);
    }

    function getSkiingUphillSubActivities(includeUnknown = false) {
        var result = ["Lifts",
                      "Heli",
                      "Hiking",
                      "Snowshoeing",
                      "Skinning",
                      "Car",
                      "Bus",
                      "Train",
                      "Horse",
                      "Dogs",
                      "Uphill-Other"];
        if (includeUnknown) result.push("Uphill-Unknown");
        return(result);
    }

    function getSkiingOtherSubActivities() {
        var result = ["Equipment"];
        var result = ["Social"];
        var result = ["Media"];
        return(result);
    }
    
    function getUrbanexTargetSubActivities(includeUnknown = false) {
        var result = ["Tunnels",
                      "Buildings",
                      "Ruins",
                      "Bunkers",
                      "Quarries",
                      "Mines",
                      "Industrial",
                      "Silos",
                      "Containers",
                      "Ski-Lifts",
                      "Landfills",
                      "Castles",
                      "Vehicles",
                      "Trenches",
                      "Memorial",
                      "Historic-Sites",
                      "Bridges",
                      "Skating-Rinks",
                      "Amusement-Parks",
                      "Airports",
                      "Catacombs",
                      "Railways",
                      "Smokestacks",
                      "Towers",
                      "Prisons",
                      "Harbours",
                      "Military",
                      "Other",
                      "None"];
        if (includeUnknown) result.push("Unknown");
        return(result);
    }

    function getBikingBikeTrackSubActivities(includeUnknown = false) {
        var result = [
            "Track-City",
            "Track-Road",
            "Track-Trail",
            "Track-Nature",
            "Indoor",
            "Outdoor",
            "Underground"
        ];
        if (includeUnknown) result.push("Track-Unknown");
        return(result);
    }
    
    function getBikingBikeTypeSubActivities(includeUnknown = false) {
        var result = [
            "Bike-City",
            "Bike-Road",
            "Bike-Mountain",
            "Bike-Unicycle",
            "Bike-Tandem",
            "Bike-Tricycle",
            "Bike-Other"
        ];
        if (includeUnknown) result.push("Bike-Unknown");
        return(result);
    }
    
    //
    // Marker images --------------------------------------------------------------------------
    //
    
    function setActivityMarkerImage(activity,image) {
        markerImageTable[activity] = image;
    }

    function getDefaultFilterSkiing(db) {
        return(db.filterOr([db.filterMatchActivity(jsonSchemaActivitySkiing),
                            db.filterMatchActivity(jsonSchemaActivitySnowboarding)]));
    }
    
    function getDefaultFilterCaving(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Glacier","Ice","Material-Other"])]));
    }
    
    function getDefaultFilterCavingFinland(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Glacier","Ice"]),
                             db.filterMatchCountry("Finland")]));
    }
    
    function getDefaultFilterCavingMap(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Glacier","Ice"]),
                             db.filterMatchMap(true)]));
    }
    
    function getDefaultFilterCavingMapFinland(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Glacier","Ice"]),
                             db.filterMatchCountry("Finland"),
                             db.filterMatchMap(true)]));
    }
    
    function getDefaultFilterUrbanex(db) {
        return(db.filterMatchActivity(jsonSchemaActivityUrbanExploration));
    }
    
    function getDefaultFilterClimbing(db) {
        return(db.filterOr([db.filterMatchActivity(jsonSchemaActivityClimbing)]));
    }
    
    function getDefaultFilterBiking(db) {
        return(db.filterMatchActivity(jsonSchemaActivityBiking));
    }
    
    function getDefaultFilterSwimming(db) {
        return(db.filterMatchActivity(jsonSchemaActivitySwimming));
    }
    
    function getDefaultFilterFlying(db) {
        return(db.filterMatchActivity(jsonSchemaActivityFlying));
    }
    
    function getDefaultFilterSauna(db) {
        return(db.filterMatchActivity(jsonSchemaActivitySauna));
    }

    //
    // Coordinate functions
    //

    var pi = Math.PI;
    
    function toDegrees(radians) {
        return(radians * (180/pi));
    }
    
    function toRadians(degrees) {
        return(degrees * (pi/180));
    }

    function toDegrees(radians) {
        return radians * 180 / Math.PI; 
    }

    function convertWGS84ToTM35FIN(x, y) {
        // ...
        return( {
            lat: 0,
            lon: 0
        });
    }
    
    function convertTM35FINToWGS84(x, y) {

        //
        // code modified from
        // https://github.com/hkurhinen/etrs-tm35fin-to-wgs84-converter/
        //   blob/master/src/fi/elemmings/converter/Etrs35fin2wgs84Converter.java
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
        var Clo0 = lib.toRadians(27.0);
        var CE0 = 500000.0;
        var Cn = Cf / (2.0 - Cf);
        var CA1 = Ca / (1.0 + Cn) * (1.0 + (Math.pow(Cn, 2.0)) / 4.0 + (Math.pow(Cn, 4.0)) / 64.0);
        var Ce = Math.sqrt((2.0 * Cf - Math.pow(Cf, 2.0)));
        var Ch1 =
            1.0 / 2.0 * Cn -
            2.0 / 3.0 * (Math.pow(Cn, 2.0)) +
            37.0 / 96.0 * (Math.pow(Cn, 3.0)) -
            1.0 / 360.0 * (Math.pow(Cn, 4.0));
        var Ch2 =
            1.0 / 48.0 * (Math.pow(Cn, 2.0)) +
            1.0 / 15.0 * (Math.pow(Cn, 3.0)) -
            437.0 / 1440.0 * (Math.pow(Cn, 4.0));
        var Ch3 =
            17.0 / 480.0 * (Math.pow(Cn, 3.0)) -
            37.0 / 840.0 * (Math.pow(Cn, 4.0));
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
        
        var latitude = lib.toDegrees(Math.atan(Math.sinh(Qp)));
        var longitude = lib.toDegrees(Clo0 + Math.asin(Math.tanh(nnp) / Math.cos(be)));
        
        return( {
            lat: longitude,
            lon: latitude
        });
    }
    
    function coordinatesDistance(inputlat1,inputlon1,inputlat2,inputlon2) {
        
        //
        // Based on the 'haversine' algorithm, and partially using
        // code from
        // https://www.movable-type.co.uk/scripts/latlong.html
        //
        
        const R = 6371e3; // metres
        const lat1 = inputlat1 * pi/180; // lat, lon in radians
        const lat2 = inputlat2 * pi/180;
        const deltalat = (inputlat2-inputlat1) * Math.PI/180;
        const deltalon = (inputlon2-inputlon1) * Math.PI/180;
        
        const a =
              Math.sin(deltalat/2) * Math.sin(deltalat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltalon/2) * Math.sin(deltalon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c; // in metres
        
        return(d);
    }

    //
    // Calculate bearing
    //

    function bearing(startLat, startLng, destLat, destLng) {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);

        y = Math.sin(destLng - startLng) * Math.cos(destLat);
        x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        brng = Math.atan2(y, x);
        brng = toDegrees(brng);
        return (brng + 360) % 360;
    }

    //
    // HTML functions
    //
    
    function htmlBold(text) {
        return("<b>" + text + "</b>");
    }

    function htmlBreak() {
        return("<br/>");
    }

    function htmlFontSize(text,size) {
        return('<font size="' +
               size +
               '">' +
               text +
               '</font>');
    }

    function htmlImage(url,params) {
        return('<img src="' + url + '" ' + params + '>');
    }

    function htmlLink(link,url,blank) {
        var extra = blank ? ' target="_blank"' : "";
        return('<a href="' + url + '"' + extra +  '>' + link + '</a>');
    }

    function htmlParagraph(text) {
        return("<p>" + text + "</p>");
    }

    function htmlTable(rows,params) {
        var contents = "";
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var content = "";
            for (var j = 0; j < row.length; j++) {
                var column = row[j];
                content += "<td>" + column + "</td>";
            }
            contents += "<tr>" + content + "</tr>\n";
        }
        return("<table " + params + "><tbody>"  + contents + "</tbody></table>");
    }

    function htmlList(intro,elements) {
        var contents = htmlParagraph(intro);
        contents += "<ul>";
        for (var i = 0; i < elements.length; i++) {
            var one = "<li>";
            one += elements[i];
            one += "</li>";
            contents += one;
        }
        contents += "</ul>";
        return(contents);
    }
    
    //
    // Text processing functions --------------------------------------------------------------
    //

    function linefy(text,maxtotallen = 100,maxlinelen = 40) {
        if (text.length > maxtotallen) {
            text = text.substring(0,maxtotallen-3);
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

    function trimspace(text) {
        while (text.length > 0 && text[0] == " ") text = text.substring(1);
        while (text.length > 0 && text[text.length-1] == " ") text = text.substring(0,text.length-1);
        return(text);
    }
    
    function removedoublespace(text) {
        while ((spaces = text.search("  ")) != -1) {
            text = text.substring(0,spaces) + text.substring(spaces+1);
        }
        return(text);
    }

    function isdigit(x) {
        return(x.length == 1 && x >= "0" && x <= "9");
    }
    
    function stringStartsWith(s,what) {
        if (s.length < what.length) {
            return(false);
        } else {
            var part = s.substr(0,what.length);
            return(part === what);
        }
    }
    
    function stringEndsWith(s,what) {
        if (s.length < what.length) {
            return(false);
        } else {
            var part = s.substr(s.length-what.length);
            return(part === what);
        }
    }
    
    function trimspaces(s) {
        while (stringEndsWith(s," ")) { s = s.substr(0,s.length-1); }
        while (stringStartsWith(s," ")) { s = s.substr(1); }
        return(s);
    }
    
    function lastcommaseparatedpart(s) {
        var parts = s.split(",");
        return(parts[parts.length-1]);
    }
    
    function includesAny(set1,set2) {
        for (var i = 0; i < set2.length; i++) {
            if (set1.includes(set2[i])) {
                return(true);
            }
        }
        return(false);
    }

    //
    // Time measurement functions -------------------------------------------------------------
    //

    function timingInitialize(what) {
        var date = new Date();
        var nms = date.getTime();
        return({what: what, nms: nms});
    }

    function timingReport(obj) {
        if (console !== undefined) {
            var date = new Date();
            var nms = date.getTime();
            var diff = nms - obj.nms;
            var diffs = diff / 1000;
            var message = "TIMING: " + obj.what + " took " + diffs.toString() + " ";
            console.log(message);
        }
    }
    
    //
    // Checking functions ---------------------------------------------------------------------
    //
    
    function isBoolean(obj) {
        return(obj === false || obj === true);
    }
    
    function isArray(obj)  {
        return(obj !== undefined && Array.isArray(obj));
    }
    
    function isRecord(obj) {
        return(obj !== undefined &
               (!isArray(obj)) &&
               typeof obj === "object");
    }

    function isString(x) {
        if (x !== undefined && x.constructor === String)
            return(true);
        else
            return(false);
    }
    
    //
    // Version functions ----------------------------------------------------------------------
    //
    
    var softwareVersion = "v1.8.0";
    
    function getVersion() {
        return(softwareVersion);
    }
    
    //
    // Return the object ----------------------------------------------------------------------
    //
    
    return({
        jsonSchemaActivityAfterski: jsonSchemaActivityAfterski,
        jsonSchemaActivityBiking: jsonSchemaActivityBiking,
        jsonSchemaActivityCaving: jsonSchemaActivityCaving,
        jsonSchemaActivityClimbing: jsonSchemaActivityClimbing,
        jsonSchemaActivityDiving: jsonSchemaActivityDiving,
        jsonSchemaActivityEquipment: jsonSchemaActivityEquipment,
        jsonSchemaActivityFlying: jsonSchemaActivityFlying,
        jsonSchemaActivityFood: jsonSchemaActivityFood,
        jsonSchemaActivityHealth: jsonSchemaActivityHealth,
        jsonSchemaActivityHiking: jsonSchemaActivityHiking,
        jsonSchemaActivitySnowshoeing: jsonSchemaActivitySnowshoeing,
        jsonSchemaActivitySauna: jsonSchemaActivitySauna,
        jsonSchemaActivitySkiing: jsonSchemaActivitySkiing,
        jsonSchemaActivitySliding: jsonSchemaActivitySliding,
        jsonSchemaActivitySnowboarding: jsonSchemaActivitySnowboarding,
        jsonSchemaActivitySurfing: jsonSchemaActivitySurfing,
        jsonSchemaActivitySwimming: jsonSchemaActivitySwimming,
        jsonSchemaActivityTravel: jsonSchemaActivityTravel,
        jsonSchemaActivityUrbanExploration: jsonSchemaActivityUrbanExploration,
        jsonSchemaActivityOther: jsonSchemaActivityOther,
        getActivityList: getActivityList,
        getActivityListDominanceOrder: getActivityListDominanceOrder,
        getOtherActivityList: getOtherActivityList,
        isOtherActivity: isOtherActivity,
        getActivityShortName: getActivityShortName,
        getActivityMarkerImage: getActivityMarkerImage,
        setActivityMarkerImage: setActivityMarkerImage,
        getDefaultFilterSkiing: getDefaultFilterSkiing,
        getDefaultFilterCaving: getDefaultFilterCaving,
        getDefaultFilterCavingFinland: getDefaultFilterCavingFinland,
        getDefaultFilterCavingMap: getDefaultFilterCavingMap,
        getDefaultFilterCavingMapFinland: getDefaultFilterCavingMapFinland,
        getDefaultFilterUrbanex: getDefaultFilterUrbanex,
        getDefaultFilterClimbing: getDefaultFilterClimbing,
        getDefaultFilterBiking: getDefaultFilterBiking,
        getDefaultFilterSwimming: getDefaultFilterSwimming,
        getDefaultFilterFlying: getDefaultFilterFlying,
        getDefaultFilterSauna: getDefaultFilterSauna,

        //
        // Subactivity functions
        //

        getCavingMaterialSubActivities: getCavingMaterialSubActivities,
        getCavingRockTypeSubActivities: getCavingRockTypeSubActivities,
        getCavingRockTypeAndOtherMaterialSubActivities: getCavingRockTypeAndOtherMaterialSubActivities,
        getCavingMorphologySubActivities: getCavingMorphologySubActivities,
        getCavingMovementSubActivities: getCavingMovementSubActivities,
        getCavingNonMovementActivitySubActivities: getCavingNonMovementActivitySubActivities,
        getCavingMovementAndNonMovementActivitySubActivities: getCavingMovementAndNonMovementActivitySubActivities,
        getSwimmingWaterbodySubActivities: getSwimmingWaterbodySubActivities,
        getSwimmingOtherPlaceSubActivities: getSwimmingOtherPlaceSubActivities,
        getSwimmingPlaceSubActivities: getSwimmingPlaceSubActivities,
        getSwimmingMaterialSubActivities: getSwimmingMaterialSubActivities,
        getSaunaTypeSubActivities: getSaunaTypeSubActivities,
        getSkiingSubstanceSubActivities: getSkiingSubstanceSubActivities,
        getSkiingPlaceSubActivities: getSkiingPlaceSubActivities,
        getSkiingUphillSubActivities: getSkiingUphillSubActivities,
        getSkiingOtherSubActivities: getSkiingOtherSubActivities,
        getUrbanexTargetSubActivities: getUrbanexTargetSubActivities,
        getBikingBikeTrackSubActivities: getBikingBikeTrackSubActivities,
        getBikingBikeTypeSubActivities: getBikingBikeTypeSubActivities,
        getClimbingTypeSubActivities: getClimbingTypeSubActivities,
        
        //
        // Coordinate functions
        //
        
        toDegrees: toDegrees,
        toRadians: toRadians,
        coordinatesDistance: coordinatesDistance,
        bearing: bearing,
        convertWGS84ToTM35FIN: convertWGS84ToTM35FIN,
        convertTM35FINToWGS84: convertTM35FINToWGS84,
        
        //
        // HTML functions
        //
        
        htmlBold: htmlBold,
        htmlBreak: htmlBreak,
        htmlFontSize: htmlFontSize,
        htmlImage: htmlImage,
        htmlLink: htmlLink,
        htmlParagraph: htmlParagraph,
        htmlTable: htmlTable,
        htmlList: htmlList,

        //
        // String processing
        //

        linefy: linefy,
        trimspace: trimspace,
        removedoublespace: removedoublespace,
        isdigit: isdigit,
        stringStartsWith: stringStartsWith,
        stringEndsWith: stringEndsWith,
        lastcommaseparatedpart: lastcommaseparatedpart,
        trimspaces: trimspaces,
        includesAny: includesAny,

        //
        // Time measurements
        //

        timingInitialize: timingInitialize,
        timingReport: timingReport,
        
        //
        // Checking
        //

        isBoolean: isBoolean,
        isArray: isArray,
        isRecord: isRecord,
        isString: isString,
        
        //
        // Versions
        //
        
        getVersion: getVersion

    });
}

