#!/bin/sh

INFILE="./restructure-psgeolang.js"

OUTFILE="./psgeolang-new.js"

cat $INFILE | awk ' NR < 29 { print $0 } ' > $OUTFILE;

echo "// TRANSLATIONS BEGIN" >> $OUTFILE

	./restructure-translations.sh >> $OUTFILE

echo "" >> $OUTFILE
echo "// VOCABULARIES BEGIN" >> $OUTFILE

	./restructure-valuetexts.sh >> $OUTFILE

echo "" >> $OUTFILE
echo "// SCRIPTS BEGIN" >> $OUTFILE

cat $INFILE | awk ' NR > 760 { print $0 } ' >> $OUTFILE;


