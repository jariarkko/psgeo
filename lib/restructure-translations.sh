#!/bin/sh

INPUT="./restructure-psgeolang.js"
DECLARATION="./psgeolang-base-init.js"
MODULE="./psgeolang-base-"

echo "var translations = {};"
echo "var translations = {};" > $DECLARATION
echo "// psgeolang language module (en)" > ${MODULE}en.js
echo "// psgeolang language module (fi)" > ${MODULE}fi.js

# take rows 30..758 that contain Texts but not ValueTexts and remove heading spaces
cat $INPUT | awk 'NR>29 && NR<759 { print $0 } ' | grep 'Texts' | grep -v 'ValueTexts' | sed 's/^ *//' | while read line
do
	echo "$line" | grep -Fq '[]'

	if [ $? -eq 0 ]
	then
		textId=`echo "$line" | sed 's/^ *var //' | sed 's/Texts =.*$//'`
		echo "translations.${textId} = {};"
		echo "translations.${textId} = {};" >> $DECLARATION
	else	
		textId=`echo "$line" | sed 's/Texts\[.*$//'`
		lang=`echo "$line" | sed -e 's/^[^"]*"//' | cut -c1,2`
		translation=`echo "$line" | sed 's/^.*= //'`
		echo "translations.${textId}.${lang} = ${translation}"
		echo "translations.${textId}.${lang} = ${translation}" >> ${MODULE}${lang}.js
	fi
done

