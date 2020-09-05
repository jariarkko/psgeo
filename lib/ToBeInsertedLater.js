// Into psgeolang.js

// NEEDSHORT AUTODETECTION OLISI HYVÄ SAADA MYÖS getText:iin! Sinne myös stringId-tarkastus!!!


	function vgetText(textId,insertables,needShort) {
		// textId       is a string
		// insertables  is an array of strings
		// needShort    is boolean

		if ( arguments.length < 3 ) needShort = false; // needShort is an optional argument!
		if ( typeof(needShort) != "boolean" ) psgeoDebug("Error: vgetText(): argument needShort was given, but its type was " + typeOf(needShort));

		var message = "";
		var one = "";
		var i = 0;

		if (needShort)	{ message=genText(textId + "Short") }
		else		{ message=genText(textId) }

		// replace {{string1}} with the first member of the array, {{string2}} with the second, and so on.
		for ( one of insertables ) {
			i++;
			message = message.replace( '{{string' + i.toString() + '}}',one);
			}
		return message;
	}


		// Further tests would be possible, eg:
		// if ( insertables === undefined || insertables.length == 0 ) psgeoDebug("Error: vgetText(): textId " + textId + ": insertable values is empty or undefined!");
		// if ( textId === undefined || textId == "" ) psgeoDebug("Error: vgetText(): textId is empty. Do not know what to translate!");

