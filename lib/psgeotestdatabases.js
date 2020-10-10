
var databases = [];
var databasefiles = [];
var warnings = [];
var notes = [];

for (var i = 0; i < arguments.length; i += 2) {
    databases.push(arguments[i]);
    databasefiles.push(arguments[i+1]);
    warnings.push([]);
    notes.push([]);
}

debug("testing data bases " + JSON.stringify(databases) + "...");

function getdatabaseindex(source) {
    for (var k = 0; k < databases.length; k++) {
        if (databases[k] === source) return(k);
    }
    debug("Cannot find database " + source);
    quit();
}

function warnfn(what,text,source) {
    var idx = getdatabaseindex(source);
    warnings[idx].push(text);
}

function notefn(what,text,source) {
    var idx = getdatabaseindex(source);
    notes[idx].push(text);
}

function outputlist(list,prefix) {
    for (var u = 0; u < list.length; u++) {
        debug(prefix + list[u]);
    }
}

var lib = PsgeoLib();
var db = PsgeoDB(lib,[],"empty",warnfn,notefn);
for (var j = 0; j < databases.length; j++) {
    debug("Reading file " + databasefiles[j] + "...");
    var string = read(databasefiles[j]);
    try {
        var list = JSON.parse(string);
        db.addPlaces(list,databases[j]);
        debug("Database size is now " + db.nPlaces().toString() + " places");
    } catch (ex) {
        debug('Exception when trying to parse json = ' + ex);
        quit();
    }
}

for (var z = 0; z < databases.length; z++) {
    outputlist(warnings[z],"Warning: " + databases[z] + ": ");
    outputlist(notes[z],"Note: " + databases[z] + ": ");
}

for (var l = 0; l < databases.length; l++) {
    debug(databases[l] + ": " +
          warnings[l].length.toString() + " warnings and " +
          notes[l].length.toString() + " notes");
}

debug("database test completed");
