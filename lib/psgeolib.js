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
    
    const activityMarkerAfterski = "./plainred.png";
    const activityMarkerBiking = "./plainyellow.png";
    const activityMarkerCanoeing = "./plainblue.png";
    const activityMarkerCar = "./plainpink.png";
    const activityMarkerCaving = "./plainpurple.png";
    const activityMarkerCharity = "./plainpink.png";
    const activityMarkerClimbing = "./plainpurple.png";
    const activityMarkerDiving = "./plainblue.png";
    const activityMarkerEquipment = "./plainpink.png";
    const activityMarkerFlying = "./plainblue.png";
    const activityMarkerFood = "./plainred.png";
    const activityMarkerHealth = "./plainred.png";
    const activityMarkerHiking = "./plaingreen.png";
    const activityMarkerHistory = "./plainpink.png";
    const activityMarkerPeople = "./plainpink.png";
    const activityMarkerPolitical = "./plainpink.png";
    const activityMarkerSauna = "./plaingrey.png";
    const activityMarkerSkiing = "./plainwhite.png";
    const activityMarkerSkydiving = "./plainblue.png";
    const activityMarkerSliding = "./plainwhite.png";
    const activityMarkerSnowboarding = "./plainwhite.png";
    const activityMarkerSurfing = "./plainblue.png";
    const activityMarkerSwimming = "./plainblue.png";
    const activityMarkerTravel = "./plainblue.png";
    const activityMarkerUrbanExploration = "./plainbrown.png";
    const activityMarkerWakeboarding = "./plainblue.png";
    const activityMarkerWalking = "./plaingreen.png";
    const activityMarkerWaterfalls = "./plainblue.png";
    const activityMarkerOther = "./plainpink.png";
    
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
    const jsonSchemaActivityUrbanExploration = "Urban-exploration";
    const jsonSchemaActivityWakeboarding = "Wakeboarding";
    const jsonSchemaActivityWalking = "Walking";
    const jsonSchemaActivityWaterfalls = "Waterfalls";
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
    markerImageTable[jsonSchemaActivityOther] = activityMarkerOther;
    
    var activitiesList = [
	jsonSchemaActivityBiking,
	jsonSchemaActivityCar,
	jsonSchemaActivityCaving,
	jsonSchemaActivityClimbing,
	jsonSchemaActivityDiving,
	jsonSchemaActivityEquipment,
	jsonSchemaActivityFlying,
	jsonSchemaActivityFood,
	jsonSchemaActivityHiking,
	jsonSchemaActivitySauna,
	jsonSchemaActivitySkiing,
	jsonSchemaActivitySliding,
	jsonSchemaActivitySnowboarding,
	jsonSchemaActivitySurfing,
	jsonSchemaActivitySwimming,
	jsonSchemaActivityTravel,
	jsonSchemaActivityUrbanExploration,
	// not included: everything in the otherActivitiesLlist
        jsonSchemaActivityOther
    ];
    
    var otherActivitiesList = [
        jsonSchemaActivityAfterski,
	jsonSchemaActivityCanoeing,
	jsonSchemaActivityCar,
	jsonSchemaActivityCharity,
	jsonSchemaActivityHealth,
	jsonSchemaActivityHistory,
	jsonSchemaActivityPeople,
	jsonSchemaActivityPolitical,
	jsonSchemaActivitySkydiving,
	jsonSchemaActivityWakeboarding,
	jsonSchemaActivityWalking,
	jsonSchemaActivityWaterfalls
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
    
    function setActivityMarkerImage(activity,image) {
        markerImageTable[activity] = image;
    }

    function getDefaultFilterSkiing(db) {
        return(db.filterOr([db.filterMatchActivity(jsonSchemaActivitySkiing),
			    db.filterMatchActivity(jsonSchemaActivitySnowboarding)]));
    }
    
    function getDefaultFilterCaving(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Ice","Diving","Volcanic"])]));
//                             db.filterMatchNotSubActivities("Caving",["None","Equipment","Man-made"])]));
    }
    
    function getDefaultFilterCavingFinland(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Ice"]),
                             db.filterMatchCountry("Finland")]));
    }
    
    function getDefaultFilterCavingMap(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Ice"]),
                             db.filterMatchMap(true)]));
    }
    
    function getDefaultFilterCavingMapFinland(db) {
        return(db.filterAnd([db.filterMatchActivity(jsonSchemaActivityCaving),
                             db.filterMatchSubActivities("Caving",["Rock","Ice"]),
                             db.filterMatchCountry("Finland"),
                             db.filterMatchMap(true)]));
    }
    
    function getDefaultFilterUrbanex(db) {
        return(db.filterMatchActivity(jsonSchemaActivityUrbanExploration));
    }
    
    function getDefaultFilterClimbing(db) {
        return(db.filterOr([db.filterMatchActivity(jsonSchemaActivityClimbing),
			    db.filterMatchActivity(jsonSchemaActivityHiking)]));
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
        getDefaultFilterSauna: getDefaultFilterSauna
    });
}

