
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
			test.res.ok \
			testlang.res.ok \
			testdb.res.ok
JSC	=	jsc

all:	test \
	checksource

test:	test.res \
	testlib.res \
	testlang.res \
	testdb.res \
	teststat.res

test.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolib.js psgeotest.js 2> test.res
	diff test.res test.res.ok
	rm -f test.res

testdb.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtest.js 2> testdb.res
	diff testdb.res testdb.res.ok
	rm -f testdb.res

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

testlang.res:	$(SOURCES) $(TESTFILES)
	-@rm -f *.res
	$(JSC) psgeolang.js psgeolib.js psgeolangtest.js 2> testlang.res
	diff testlang.res testlang.res.ok
	rm -f testlang.res

checksource:	checkgettextusage \
		checkgettextcollectionusage \
		checktabs

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
	@echo The following source files use TABs:
	@(fgrep -l '	' *.js > checktabs.res; exec true)
	-@test ! -s checktabs.res

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

