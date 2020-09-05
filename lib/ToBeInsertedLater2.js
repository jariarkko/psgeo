
// function listToText(list) in psgeolang.js becomes 4 lines (+some wrapping here)
// THIS IS READY TO BE RUN AND TESTED ON js.do

<script>
	// list=["A","B","C","D","E","F"]
	// list=["A","B","C"]
	// list=["A","B"]
	// list=["A"]
	// list=[""]
	// list=[]

	var result = list[0]; 								// FIRST
        for ( var i = 1; i<list.length -1; i++ ) result = result + ", " + list[i]; 	// COMMA MIDDLE
        if (list.length>1) result = result + " and " + list[list.length -1]; 		// AND LAST (IF MANY)
	//				+ " " + getText("and") + " "			// This change for production 
        window.alert(result) // return(result)
</script>
