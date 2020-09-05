
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
	$(JSC) psgeolang.js psgeolangtest.js 2> testlang.res
	diff testlang.res testlang.res.ok
	rm -f testlang.res

checksource:	checkgettextusage \
		checktabs

checkgettextusage:
	fgrep 'getText("' *.js > gettext.res

checktabs:
	true

wc:
	wc -l *.js

clean:
	-rm -f *.res

