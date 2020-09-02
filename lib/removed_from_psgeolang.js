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
// COULD BE COMBINED -- TEMPORARY ---> 
// <--- TEMPORARY
// UUSI
//		switch (textId) {
//			case "map": 			return(genText(mapTexts)); break;
//			case "caveMap": 		return(genText(caveMapTexts)); break;
//			case "locationSecret": 		return(genText(locationSecretTexts)); break;
//			case "other": 			return(genText(otherTexts)); break;
//			case "noArticleYet": 		return(genText(noArticleYetTexts)); break;
//			case "article": 		return(genText(articleTexts)); break;
//			case "articles": 		return(genText(articlesTexts)); break;
//			case "publication": 		return(genText(publicationTexts)); break;
//			case "publicationReference": 	return(genText(publicationReferenceTexts)); break;
//			case "places": 			return(genText(placesTexts)); break;
//			case "city": 			return(genText(cityTexts)); break;
//			case "country": 		return(genText(countryTexts)); break;
//			case "cities": 			return(genText(citiesTexts)); break;
//			case "countries": 		return(genText(countriesTexts)); break;
//			case "continents": 		return(genText(continentsTexts)); break;
//			case "states": 			return(genText(statesTexts)); break;
//			case "provinces": 		return(genText(provincesTexts)); break;
//			case "caveMaps": 		return(genText(caveMapsTexts)); break;
//			case "size": 			return(genText(sizeTexts)); break;
//			case "cave": 			return(genText(caveTexts)); break;
//			case "caves": 			return(genText(cavesTexts)); break;
//			case "source": 			return(genText(sourceTexts)); break;
//			case "sources": 		return(genText(sourcesTexts)); break;
//			case "filterHeaderText": 	return(genText(filterHeaderTexts)); break;
//			case "filterLinkText": 		return(genText(filterLinkTexts)); break;
//			case "moreFilters": 		return(genText(moreFiltersTexts)); break;
//			case "filterByName": 		return(genText(filterByNameTexts)); break;
//			case "filterByRockTypeText": 	return(genText(filterByRockTypeTexts)); break;
//			case "filterByMaterialTypeText":return(genText(filterByMaterialTypeTexts)); break;
//			case "filterByMorphology": 	return(genText(filterByMorphologyTexts)); break;
//			case "filterBySource": 		return(genText(filterBySourceTexts)); break;
//			case "withCavemap": 		return(genText(withCavemapTexts)); break;
//			case "mainCave": 		return(genText(mainCaveTexts)); break;
//			case "sideCave": 		return(genText(sideCaveTexts)); break;
//			case "sideCaves": 		return(genText(sideCavesTexts)); break;
//			case "other": 			return(genText(otherTexts)); break;
//			case "onlyFinland": 		return(genText(onlyFinlandTexts)); break;
//			case "and": 			return(genText(andTexts)); break;
//			case "caveClassification": 	return(genText(caveClassificationTexts)); break;
//			case "coordinates": 		return(genText(coordinatesTexts)); break;
//			case "alternativeNames": 	return(genText(alternativeNamesTexts)); break;
//			case "alternativeCoordinates": 	return(genText(alternativeCoordinatesTexts)); break;
//			case "off": 			return(genText(offTexts)); break;
//			case "add": 			return(genText(addTexts)); break;
//			case "orModify": 		return(genText(orModifyTexts)); break;
//			case "moreMaps": 		return(genText(moreMapsTexts)); break;
//			case "settingsTexts": 		return(genText(settingsTexts)); break;
//			case "moreInformation": 	return(genText(moreInformationTexts)); break;
//			case "more": 			return(genText(moreTexts)); break;
//			case "toolsAndAbout": 		return(genText(toolsAndAboutTexts)); break;
//			case "moreToRead": 		return(genText(moreToReadTexts)); break;
//			case "video": 			return(genText(videoTexts)); break;
//			case "warningsAndDisclaimers": 	return(genText(warningsAndDisclaimersTexts)); break;
//			case "openInNewWindow": 	return(genText(openInNewWindowTexts)); break;
//			case "toolsExplanation": 	return(genText(toolsExplanationTexts)); break;
//			case "dimensions": 		return(genText(dimensionsTexts)); break;
//			case "literatureCaveId": 	return(genText(literatureCaveIdTexts)); break;
//			case "length": 			return(genText(lengthTexts)); break;
//			case "lengthCategory": 		return(genText(lengthCategoryTexts)); break;
//			case "manmade": 		return(genText(manmadeTexts)); break;
//			case "ice": 			return(genText(iceTexts)); break;
//			case "balls": 			return(genText(ballsTexts)); break;
//			case "otherMaterial": 		return(genText(otherMaterialTexts)); break;
//			case "name": 			return(genText(nameTexts)); break;
//			case "rock": 			return(genText(rockTexts)); break;
//			case "rockType": 		return(genText(rockTypeTexts)); break;
//			case "morphology": 		return(genText(morphologyTexts)); break;
//			case "swimming": 		return(genText(swimmingTexts)); break;
//			case "waterbody": 		return(genText(waterbodyTexts)); break;
//			case "ski": 			return(genText(skiTexts)); break;
//			case "indoor": 			return(genText(indoorTexts)); break;
//			case "outdoor": 		return(genText(outdoorTexts)); break;
//			case "skiMaterial": 		return(genText(skiMaterialTexts)); break;
//			case "target": 			return(genText(targetTexts)); break;
//			case "urbanexTarget": 		return(genText(urbanexTargetTexts)); break;
//			case "biking": 			return(genText(bikingTexts)); break;
//			case "saunaType": 		return(genText(saunaTypeTexts)); break;
//			case "activity": 		return(genText(activityTexts)); break;
//			case "about": 			return(genText(aboutTexts)); break;
//			case "dataExplanation": 	return(genText(dataExplanationTexts)); break;
//			case "dataExplanationCavingAssociation":	return(genText(dataExplanationCavingAssociationTexts)); break;
//			case "libraryExplanation": 	return(genText(libraryExplanationTexts)); break;
//			case "developersExplanation": 	return(genText(developersExplanationTexts)); break;
//			case "dataDistinctExplanation": return(genText(dataDistinctExplanationTexts)); break;
//			case "dangerousExplanation": 	return(genText(dangerousExplanationTexts)); break;
//			case "retkipaikkaToolName": 	return(genText(retkipaikkaToolNameTexts)); break;
//			case "retkipaikkaToolDescription":	return(genText(retkipaikkaToolDescriptionTexts)); break;
//			case "ruuthToolName": 		return(genText(ruuthToolNameTexts)); break;
//			case "ruuthToolDescription": 	return(genText(ruuthToolDescriptionTexts)); break;
//			case "hakkuToolName": 		return(genText(hakkuToolNameTexts)); break;
//			case "hakkuToolDescription": 	return(genText(hakkuToolDescriptionTexts)); break;
//			case "laserToolName": 		return(genText(laserToolNameTexts)); break;
//			case "laserToolDescription": 	return(genText(laserToolDescriptionTexts)); break;
//			case "nimisampoToolName": 	return(genText(nimisampoToolNameTexts)); break;
//			case "nimisampoToolDescription":return(genText(nimisampoToolDescriptionTexts)); break;
//			default: return("ERROR");
//		}
