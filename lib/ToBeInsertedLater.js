// Into psgeolang.js

	function vgetText(textId,insertables,needShort) {
		// textId       is a string
		// insertables  is an array of strings
		// needShort    is boolean

		if ( insertables === undefined || insertables.length == 0 ) psgeoDebug("Error: textId " + textId + ": insertable values is empty or undefined!");

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

