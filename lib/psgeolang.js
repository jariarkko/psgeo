//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//

//
// PSGEO -- The Planet Skier Geography Software
// Authors: Jari Arkko (initial author)
//          Ralf Strandell (improvements)
//
// This is the PsgeoLang module, which can provide some key messages
// in several languages
//
// Usage:
//
//   // create the object
//   var lang = "fi";
//   var langLib = PsgeoLang(lang);
//
//   // get the string "cities" in the given language
//   var lang = "fi";
//   var citiesText = langLib.citiesText(); // "paikkakuntaa"
//  
//		NEW: var citiesText=langLib.getText("cities");

function PsgeoLang(language) {

	// initialize data structure
	// $.ajax({
	//	url:		"https://luolaseura.fi/luolakanta/lib/psgeolang-base-init.js",
	//	dataType:	"script",
	//	success:	psgeoDebug("Language module initialized.")
	// });

	var translation = {};

	$.getScript("https://luolaseura.fi/luolakanta/lib/psgeolang-base-init.js");


	// load english texts
	$.ajax({
		url:		"https://luolaseura.fi/luolakanta/lang/psgeolang-base-en.js",
		dataType:	"script",
		success:	psgeoDebug("Language module en loaded.")
	});

	// load finnish texts
	$.ajax({
		url:		"https://luolaseura.fi/luolakanta/lang/psgeolang-base-fi.js",
		dataType:	"script",
		success:	psgeoDebug("Language module fi loaded.")
	});


// VOCABULARIES BEGIN

	// initialize data structure
	$.ajax({
		url:		"./psgeolang-vocabularies-init.js",
		dataType:	"script",
		success:	psgeoDebug("Vocabularies module initialized.")
	});

	// load english vocabularies
	$.ajax({
		url:		"../lang/psgeolang-vocabularies-en.js",
		dataType:	"script",
		success:	psgeoDebug("Vocabularies module en loaded.")
	});

	// load finnish vocabularies
	$.ajax({
		url:		"../lang/psgeolang-vocabularies-en.js",
		dataType:	"script",
		success:	psgeoDebug("Vocabularies module en loaded.")
	});


// SCRIPTS BEGIN


//	INTERNAL FUNCTIONS BEGIN


	function genText(textId) {
	// return a string in current language,
	// 	or in english if the translation is missing.
	// 	Example: genText(andTexts) returns "and" by default, or "ja" if language=finnish

	// psgeoDebug("Language: " + language + " and textId: " + textId );

	if (typeof translations.textId.language !== "string") {
		psgeoDebug("Error: textId " + textId + " (language " + language + ") text is not a string! Defaulting to english.");
		return(translations.textId.en);
		}
	else	{
		return(translations.textId.language);
		}
	}

// METHODS BEGIN

 
	function getText(textId,needShort) {
		// textId 	is string
		// needShort 	is boolean, optional
		// RETURN	string

		// Checks
		if ( typeof(textId) != "string" || textId == "" ) {
			psgeoDebug("Error: a text string was requested from function getText, but textId is not a non-empty string!");
			}

		// Chooce which version to use, normal or short
		if (typeof(needShort) == "boolean" && needShort)	return(genText(textId + "Short")); // it had better exist! Check in genText.
		else							return(genText(textId));
	}


	function getTextWithValues(textId,needShort,insertables) {
		// textId	is a string
		// needShort	is boolean
		// insertables	is an array of strings (if inserting numeric values, use .stringify)
		// RETURN	string
	
		var message = getText(textId,needShort);	// Ex: message="text with {{string1}} or {{string2}} placeholders."

		if ( message === "undefined" ) psgeoDebug("Error: getTextWithValues: texId: " + textId + " returns no translation string!");

		// replace {{string1}} with the first member of the array, {{string2}} with the second, and so on. Maxint is the limit.
		// WARNING string numbering starts form one (not zero)!

		var one = "";
		var i = 0;
		for ( one of insertables ) {
			i++;
			message = message.replace( '{{string' + i.toString() + '}}',one);
			}
		return message;
	}


	function getTextCollectionItem(controlledVocabulary,tagText) {
		// contolledVocabulary		is a string
		// tagText			is a string
		// RETURN			string

		// these will be used to read vocabulary[controlledVocabulary][tagText][language], which is a string

		// Terminology: A collection (e.g. rockType) determines a controlled vocabulary (a fixed set of words)
		//		These words can be called tags, because they are, in effect, metadata. Hence their variable name: tagText

		// controlled vocabularies of psgeo include (but are not limited to):
		//	rockType		[of caves] such as volcanic, (sediment) sandstone, (sediment) limestone/dolomite, (metamorphic) marble...
		//	morphology		[of caves] such as karst, crevice, boulders, ... extended Finnish classification
		//	swimming		such as indoor, outdoor, underground, waterbody-lake, waterbody-sea, ... NOTE environment-*? environment-ice...
		//	swimmingMaterial	such as water, ice, ball pit	NOTE fresh/brekish/salt? icy? pool water? watertype-*? 
		//	skiMaterial		...	
		//	urbanexTarget
		//	bikeTrack
		//	bikeType
		//	saunaType
		//	cavingActivity
		// NOTE: ideally this could be an extensible file based system


		// Checks
		if ( controlledVocabulary === "undefined" || controlledVocabulary == "" ) {
			psgeoDebug("Error: Cannot return tag text unless the relevant controlled vocabulary is non-empty!");
			}
		if ( tagText === "undefined" || tagText == "" ) {
			psgeoDebug("Error: an empty or undefined tag text in vocabulary " + controlledVocabulary + " was requested!");
			}

		// Special case: cave material
		// 	Caves exist both in rock, ice, moraine and turf, at least.
		//	Rock types however can be used in climbing too.
		//	A two level classification is thus in order.
		//	We will thus introduce a new higher level vocabulary: groundType (which includes rock, ice, snow, turf, ...)

		if (  controlledVocabulary == "rockTypeAndOtherMaterial" ) {	// SHOULD THIS NOT BE CALLED CaveMaterialTopLevelCategory ?
			switch (tagText) {
				case "other-material": 	return(genText("otherMaterial")); break; // return "other than ice or rock" [relevant for caves]
				case "ice": 		controlledVocabulary="groundType"; break;
				default: 		controlledVocabulary="rockType";
				}
			}

		// Return value
		// 	Ex: return(vocabulary["rockType"]["volcanic"]["fi"]); gives "vulkaaninen".
		return(vocabulary[controlledVocabulary][tagText][language]);	
	}


	function listToText(list) {
		// list		is an object of type Array
		// RETURN	string

		// Configuration
		listSeparator=", ";
		lastSeparator=" " + getText("and") + " ";

		// Loop and insert
		var result = list[0];            	                                              	// FIRST item in list	(item 1)
		for ( var i = 1; i<list.length -1; i++ ) result = result + listSeparator + list[i];   	// COMMA MIDDLE item 	(items 2 to n-1)
		if (list.length>1) result = result + lastSeparator + list[list.length -1];		// AND LAST		(item n>1)

		return(result);
	}
   
 
	function capitalize(string) {
		// string	is a string
		// RETURN	string

		if (string.length > 0) {
			return(string[0].toUpperCase() + string.slice(1));
		} else {
			return(string);
		}
	}
   
 
	function numberAlign(n,nchars) {
		// n		is a string
		// ncahrs	is an integer
		// RETURN	string: an html element: preformatted text.

		var ns = "" + n;
		while (ns.length < nchars) {
			ns = " " + ns;
		}

		return(ns);

		// NOTE: to be fixed in main branch: return('<pre>'+ns+</pre>');
		// PREformatted text is displayed with a monospace font with spaces as written
	}


	function getLanguage() {
		// RETURN	string

		return(language);
	} 


// RETURN AN OBJECT WITH METHODS

return({
	getLanguage: 			getLanguage,		// returns language
	getText:			getText,		// returns a string in current language
	getTextWithValues:		getTextWithValues,	// same as getText but with {{valueX}} replacement
	getTextCollectionItem:		getTextCollectionItem,	// returns a term (item) from a controlled vocabulary in current language
	listToText: 			listToText,
	capitalize: 			capitalize,
	numberAlign: 			numberAlign
});

}

