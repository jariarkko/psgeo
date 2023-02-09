
SOURCES		=	Makefile \
			psgeo.js \
			psgeolib.js \
			psgeostat.js \
			psgeodb.js \
			psgeolang.js
TESTFILES	=	psgeotest.js \
	  		psgeolangtest.js \
			psgeodbtest.js \
			psgeolibtest.js \
			psgeostattest.js \
			psgeotestdatabases.js \
			test.res.ok \
			testlib.res.ok \
			testschema.res.ok \
			testlang.res.ok \
			testdb.res.ok \
			testdbtext.res.ok \
			testdbbackend.res.ok
JSC	=	jsc

all:	test \
	checksource \
	checkdatabases

test:	test.res \
	testlib.res \
	testschema.res \
	testlang.res \
	testdb.res \
	testdbbackend.res \
	testdbtext.res \
	teststat.res

test.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolib.js psgeotest.js 2> test.res
	diff test.res test.res.ok
	rm -f test.res

testdb.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtext.js psgeodbbackend.js psgeodbtest.js 2> testdb.res
	diff testdb.res testdb.res.ok
	rm -f testdb.res

testdbtext.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtext.js psgeodbbackend.js psgeodbtexttest.js 2> testdbtext.res
	diff testdbtext.res testdbtext.res.ok
	rm -f testdbtext.res

testdbbackend.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtext.js psgeodbbackend.js psgeodbbackendtest.js 2> testdbbackend.res
	diff testdbbackend.res testdbbackend.res.ok
	rm -f testdbbackend.res

teststat.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeostat.js psgeolib.js psgeodb.js psgeostattest.js 2> teststat.res
	diff teststat.res teststat.res.ok
	rm -f teststat.res

testlib.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolib.js psgeodb.js psgeolibtest.js 2> testlib.res
	diff testlib.res testlib.res.ok
	rm -f testlib.res

testschema.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolib.js psgeolang.js psgeoschema.js psgeoschematest.js 2> testschema.res
	diff testschema.res testschema.res.ok
	rm -f testschema.res

testlang.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeolangtest.js 2> testlang.res
	diff testlang.res testlang.res.ok
	rm -f testlang.res

checksource:	checkgettextusage \
		checkgettextcollectionusage \
		checktabs \
		checklonglines

checkgettextusage:
	@fgrep 'getText("' *.js > gettext0.res
	@cut -f2- -d: gettext0.res > gettext1.res
	@sed 's/.*getText//' gettext1.res > gettext2.res
	@cut -f2 -d'"' gettext2.res > gettext3.res
	@sort -u < gettext3.res > gettext4.res
	@grep '^    addTranslation' psgeolang.js > translations0.res
	@cut -f2 -d'"' < translations0.res > translations1.res
	@sort -u < translations1.res > translations2.res
	@(for x in `cat gettext4.res` ; do if fgrep $$x translations2.res > /dev/null; then nop=nop; else echo Text ID $$x not defined in psgeolang.js; fi; done) > usage0.res
	@echo The following psgeolang text identifiers have been used but not defined:
	@cat usage0.res
	@test ! -s usage0.res

checkgettextcollectionusage:
	@fgrep 'getTextCollectionItem("' *.js > gettext0.res
	@cut -f2- -d: gettext0.res > gettext1.res
	@sed 's/.*getTextCollectionItem//' gettext1.res > gettext2.res
	@cut -f2 -d'"' gettext2.res > gettext3.res
	@sort -u < gettext3.res > gettext4.res
	@grep 'v = addVocabulary' psgeolang.js > translations0.res
	@cut -f2 -d'"' < translations0.res > translations1.res
	@sort -u < translations1.res > translations2.res
	@(for x in `cat gettext4.res` ; do if fgrep $$x translations2.res > /dev/null; then nop=nop; else echo $x no; fi; done) > usage0.res
	@echo The following psgeolang text vocabulary identifiers have been used but not defined:
	@cat usage0.res
	@test ! -s usage0.res

checktabs:
	@(fgrep -l '	' *.js > checktabs.res; exec true)
	@echo The following source files use TABs: `cat checktabs.res` 
	-@test ! -s checktabs.res

LONGLINE=120
LINECHECKAWK='                                                                                           \
                                                                                                         \
    BEGIN {                                                                                              \
        quot = sprintf("%c",34);                                                                         \
        squot = sprintf("%c",39);                                                                        \
    }                                                                                                    \
                                                                                                         \
    function stringsiz(inputxin) {                                                                       \
        inputx = inputxin;                                                                               \
        sz = 0;                                                                                          \
        while (1) {                                                                                      \
            quotindex = index(inputx,quot);                                                              \
            squotindex = index(inputx,squot);                                                            \
            if (quotindex >= 1 && (squotindex < 1 || quotindex < squotindex)) {                          \
              restx = substr(inputx,quotindex+1);                                                        \
              if (index(restx,quot) < 1) return(sz);                                                     \
              sz += index(restx,quot) - 1;                                                               \
              inputx = substr(restx,index(restx,quot)+1);                                                \
            } else if (squotindex >= 1) {                                                                \
              restx = substr(inputx,squotindex+1);                                                       \
              if (index(restx,squot) < 1) return(sz);                                                    \
              sz += index(restx,squot) - 1;                                                              \
              inputx = substr(restx,index(restx,squot)+1);                                               \
            } else {                                                                                     \
	      return(sz);                                                                                \
            }                                                                                            \
        }                                                                                                \
    }                                                                                                    \
                                                                                                         \
    /.*/ {                                                                                               \
        thisline = $$0;                                                                                  \
        len = length(thisline); stringlen = stringsiz(thisline);                                         \
        if ((len - stringlen) > lim && index(thisline,"pattern") < 1) {                                  \
            printf("found %s %u %u: %s\n", FILENAME, len, stringlen, thisline) >> "/tmp/foo.txt";        \
            if (li[FILENAME] == "") {                                                                    \
                li[FILENAME]=FNR;                                                                        \
                ctr[FILENAME]=0;                                                                         \
            }                                                                                            \
            ctr[FILENAME]++;                                                                             \
        }                                                                                                \
        next;                                                                                            \
    }                                                                                                    \
                                                                                                         \
    END {                                                                                                \
        for (x in ctr) printf("%s (%u lines, starting at %u)\n", x, ctr[x], li[x]);                      \
    }'

checklonglines:
	-@rm -f checklines.res
	@(awk -v lim=$(LONGLINE) $(LINECHECKAWK) *.js)>checklines.res
	@echo The following source files have long lines: `cat checklines.res` 
	-@test ! -s checklines.res

checkdatabases:
	-@rm -f /tmp/caves.luolaseura.json
	-@rm -f /tmp/locations.json
	(cd /tmp; wget -q https://kartta.luolaseura.fi/db/caves.luolaseura.json)
	(cd /tmp; wget -q https://planetcaver.net/locations.json)
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtext.js psgeodbbackend.js psgeotestdatabases.js -- Planetcaver /tmp/locations.json Luolaseura /tmp/caves.luolaseura.json 2> checkdatabases.res
	egrep -v '(Warning:)|(Note:)' checkdatabases.res
	fgrep 'Warning:' checkdatabases.res | grep Planetcaver: > checkdatabases.planetcaver.warnings.res
	fgrep 'Note:' checkdatabases.res | grep Planetcaver: > checkdatabases.planetcaver.notes.res
	fgrep 'Warning:' checkdatabases.res | grep Luolaseura: > checkdatabases.luolaseura.warnings.res
	fgrep 'Note:' checkdatabases.res | grep Luolaseura: > checkdatabases.luolaseura.notes.res

updateversion:
	@echo This makefile target updates one software source file based on tags in GitHub,
	@echo to set the version number of the software.
	@echo ''
	@echo Only run this if you know what you are doing. Press Control-C now otherwise.
	@sleep 5
	@git describe > version.res
	@sed 's/var softwareVersion = .*;/var softwareVersion = "'`cat version.res`'";/' < psgeolib.js > lib.res
	cp -i lib.res psgeolib.js

wc:
	wc -l *.js

clean:
	-rm -f *.res

