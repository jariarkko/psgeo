#!/bin/sh

# ONLY WORKS FOR SINGLE LINE DEFINITON
# THE REST MUST BE EDITED MANUALLY IN CODE

grep '^[ ]*addTranslation(".*, fi:' psgeolang.js | sed -e 's/^.*, fi: "/"/' -e 's/ \});[ ]*$//' | sed 's/.*/&\/&, se: "" \});/' | sed 's/^/s\//' > sed-commands.sed

