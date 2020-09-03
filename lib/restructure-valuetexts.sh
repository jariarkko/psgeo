#!/bin/sh

INPUT="./restructure-psgeolang-with-eval.js"

echo "var vocabularies = {};"

# take rows 30..758 that contain Texts but not ValueTexts[ and remove heading spaces
cat $INPUT | awk 'NR>29 && NR<759 { print $0 } ' | egrep 'ValueTexts = |ValueTexts\[|^[ 	]*"[^"]*":' | sed 's/^ *//' | while read line
do
	echo "$line" | grep -Fq '[]'	# true if declaration

	if [ $? -eq 0 ]
	then
		fixedvoc=`echo "$line" | sed 's/^ *var //' | sed 's/ValueTexts.*$//'`
		echo "vocabularies.${fixedvoc} = {};"
	else	
		echo "$line" | grep -Fq 'ValueTexts["'	# true if header
		if [ $? -eq 0 ]
		then
			termId=`echo "$line" | sed 's/ValueTexts\[.*$//'`
			lang=`echo "$line" | sed -e 's/^[^"]*"//' | cut -c1,2`
		else
			termId=`echo "$line" | sed 's/^[^"]*"//' | sed 's/":.*$//'`
			termText=`echo "$line" | sed 's/^.*: //'`
			echo "vocabularies.${fixedvoc}.${termId}.${lang} = ${termText}"
		fi
	fi
done

