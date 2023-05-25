//
// psGeo Tables
//

function PsgeoTables()
{

    //
    // Displayable statistics settings. These are tunable statistics that can be shown.
    //

    // Set psgeoStatLines: "general" or "caving" in Domain Defaults to match these display options.

    // NOTE: if you add new statistic display styles below (and corresponding selectors in Domain Defauls),
    //       then function getStatLines(type) needs to be updated too, at the end of this file.
    //       If you want to hide a specific statistic from display, select psgeoStatLineEmpty for it.
    //
    //       Domain Defaults: psgeoStatLines: "general" or "caving".
 
    const psgeoStatLinesGeneral = {
    
        //            function for small displays               function for large displays
    
        place:    { true:   psgeoStatLineNumberOfPlaces,    false: psgeoStatLineNumberOfPlaces    },
        city:     { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCities    },
        country:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCountries },
        continent:{ true:   psgeoStatLineNumberOfContinents,false: psgeoStatLineNumberOfContinents},
        state:    { true:   psgeoStatLineNumberOfStates,    false: psgeoStatLineNumberOfStates    },
        province: { true:   psgeoStatLineNumberOfProvinces, false: psgeoStatLineNumberOfProvinces },
        cavemap:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             }
    };
    
    const psgeoStatLinesCaving = {
    
        //             function for small displays             function for large displays
        place:    { true:   psgeoStatLineNumberOfCaves,     false: psgeoStatLineNumberOfCaves     },
        city:     { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCities    },
        country:  { true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfCountries },
        continent:{ true:   psgeoStatLineEmpty,             false: psgeoStatLineNumberOfContinents},
        state:    { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             },
        province: { true:   psgeoStatLineEmpty,             false: psgeoStatLineEmpty             },
        cavemap:  { true:   psgeoStatLineNumberOfCaveMaps,  false: psgeoStatLineNumberOfCaveMaps  }
    };
   

    //
    // Subtype groups
    //

    // Caution: Be careful! These are tightly knit into program logic
    //          and typos can cause fatal errors.
 
    // Search settings for subtype groups (e.g., rock type, sauna type,
    // waterbody type, etc)
    //
    // Each record in this array describes a set of subactivities (e.g.,
    // Waterbody-Lake, Waterbody-Sea, etc) of an activity (e.g.,
    // Swimming). This array is what links the schema (as defined in the
    // psgeolib.js functions) to what can be represented in the user
    // interface (by psgeo.js) to texts associated with specific choices
    // (as defined in psgeolang.js).
    //
    // NOTE that the table is represented as an indirection. I.e., it
    // doesn't really list subtypes and other things as such, but refers
    // to them via function pointers to psgeolib.js. Note also that all
    // function pointers here are represented as strings, which enables us
    // to have this table as a constant structure before psgeolib,
    // psgeolang, and other objects have been created.
    //
    // The fields in the table are as follows:
    //
    //   selector: refers to a field name in psgeoDomainDefault that
    //   should be either true or false. True indicates that in this
    //   particular website, this group should be active and should be
    //   displayed in the filter window.
    //
    //   displaySizeSelector: This is a two-element array, with a one
    //   element in index "true" representing small displays (e.g.,
    //   mobile) and another element "false" representing larger displays
    //   (e.g., desktop). This allows a filter to be only set up in large
    //   displays, for instance, if space is at premium. A value of {
    //   true: true, false: true } indicates that the filter is always
    //   used.
    //
    //   descriptionTextId: This should be the name (as a string) of
    //   a function in psgeolang that returns the name of this category,
    //   e.g., "waterbody" (in a given language) for the group of
    //   waterbody sub-activities.
    //
    //   activities:The set of activities that apply to this entry. This
    //   set is represented as a list of strings.
    //
    //   getSubActivitiesFunction and getSubActivitiesFunctionArgument:
    //   These are a function name (again, as a string) in psgeolib, that
    //   returns the set of subactivities in this group.
    //
    //   extraSubActivitiesBefore, exteaSubActivitiesAfter: Often there's
    //   the usual sub-activities, followed by some special cases. The
    //   special cases can be listed here, as an array of strings. They
    //   come in two lists, one to insert before any other sub-activities,
    //   and another to insert after.
    //
    //   subActivityCollection: This string refers to a data structure in psgeolang.js,
    //   that maps sub-activities to natural language text in a given language.
    //
    
    const psgeoSubtypeGroups = [
    
        //
        // Swimming includes places (indoor/outdoor etc) and waterbody
        // types. First place types:
        //
        
        {
            selector: "waterbodySearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "place",
            activities: ["Swimming"],
            getSubActivitiesFunction: "getSwimmingOtherPlaceSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: ["Unknown"],
            subActivityCollection: "swimmingPlace"
        },
        
        //
        // Then waterbody types:
        //
        
        {
            selector: "waterbodySearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "waterbody",
            activities: ["Swimming"],
            getSubActivitiesFunction: "getSwimmingWaterbodySubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: ["Waterbody-Unknown"],
            subActivityCollection: "swimmingPlace"
        },
    
        //
        // Sauna types in activity Sauna, e.g., Normal, Smoke, etc.
        //
        
        {
            selector: "saunaTypeSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "saunaType",
            activities: ["Sauna"],
            getSubActivitiesFunction: "getSaunaTypeSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: ["Unknown"],
            subActivityCollection: "saunaType"
        },
    
        //
        // The material that you ski on in activity Skiing, e.g., Snow,
        // Grass, Sand, etc.
        //
        
        {
            selector: "skiingSubstanceSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "skiMaterial",
            activities: ["Skiing","Snowboarding","Sliding"],
            getSubActivitiesFunction: "getSkiingSubstanceSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: ["Substance-Unknown"],
            subActivityCollection: "skiMaterial"
        },
    
        //
        // The skiing place, e.g., Indoor, Outdoor, etc.
        //
        
        {
            selector: "skiingPlaceSearch",
            displaySizeSelector: { true: false, false: true },
            descriptionTextId: "place",
            activities: ["Skiing","Snowboarding","Sliding"],
            getSubActivitiesFunction: "getSkiingPlaceSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "skiPlace"
        },
    
        //
        // The uphill method for skiing, e.g., Lifts, Hiking, etc.
        //
        
        {
            selector: "skiingUphillSearch",
            displaySizeSelector: { true: false, false: true },
            descriptionTextId: "up",
            activities: ["Skiing","Snowboarding","Sliding"],
            getSubActivitiesFunction: "getSkiingUphillSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: ["Uphill-Unknown"],
            subActivityCollection: "skiUphill"
        },
    
        //
        // The climbing type for climbing, e.g., Mountain, Wall, etc.
        //
        
        {
            selector: "climbingTypeSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "climbingTypeText",
            activities: ["Climbing"],
            getSubActivitiesFunction: "getClimbingTypeSubActivities",
            getSubActivitiesFunctionArgument: false,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "climbingType"
        },
    
        //
        // Rock and other material types in activity Caving, e.g.,
        // Rock-Sandstone, Ice, etc.
        //
        
        {
            selector: "rockTypeSearch",
            displaySizeSelector: { true: false, false: true },
            descriptionTextId: "rockType",
            activities: ["Caving"],
            getSubActivitiesFunction: "getCavingRockTypeSubActivities",
            getSubActivitiesFunctionArgument: true,
            extraSubActivitiesBefore: ["Material-Other","Glacier","Ice"],
            extraSubActivitiesAfter: [],
            subActivityCollection: "rockTypeAndOtherMaterial"
        },
    
        //
        // Cave morphology in activity Caving, e.g., Morphology-Crack,
        // Morphology-Karst, etc.
        //
        
        {
            selector: "morphologySearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "morphology",
            activities: ["Caving"],
            getSubActivitiesFunction: "getCavingMorphologySubActivities",
            getSubActivitiesFunctionArgument: true,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "morphology"
        },
    
        //
        // Urban exploration target tpes in activity Urban-Exploration,
        // e.g., Bunkers, Ruins, etc.
        //
        
        {
            selector: "urbanexTargetSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "urbanexTarget",
            activities: ["Urban-Exploration"],
            getSubActivitiesFunction: "getUrbanexTargetSubActivities",
            getSubActivitiesFunctionArgument: true,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "urbanexTarget"
        },
        
        //
        // Bike types in activity Biking, e.g., Bike-Mountain, Bike-City,
        // etc.
        //
        
        {
            selector: "bikingSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "bikeType",
            activities: ["Biking"],
            getSubActivitiesFunction: "getBikingBikeTypeSubActivities",
            getSubActivitiesFunctionArgument: true,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "bikeType"
        },
        
        //
        // Bike track types in activity Biking, e.g., Bike-Road,
        // Bike-Trail, etc.
        //
        
        {
            selector: "bikingSearch",
            displaySizeSelector: { true: true, false: true },
            descriptionTextId: "bikeTrack",
            activities: ["Biking"],
            getSubActivitiesFunction: "getBikingBikeTrackSubActivities",
            getSubActivitiesFunctionArgument: true,
            extraSubActivitiesBefore: [],
            extraSubActivitiesAfter: [],
            subActivityCollection: "bikeTrack"
        }
    ];

    //
    // Methods
    //

    function getStatLines(type) {
        if (type === "caving") return psgeoStatLinesCaving;
        return psgeoStatLinesGeneral;
    }
  
    function getSubtypeGroups() {
        return psgeoSubtypeGroups;
    }

    //
    // Deliver object
    // 

    return {
        getStatLines: getStatLines,
        getSubtypeGroups: getSubtypeGroups           
    }
}

