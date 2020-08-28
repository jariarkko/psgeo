
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

all:	test

test:	test.res \
	testlib.res \
	testlang.res \
	testdb.res \
	teststat.res

test.res:	$(SOURCES) $(TESTFILES)
	$(JSC) psgeolib.js psgeotest.js 2> test.res
	diff test.res test.res.ok

testdb.res:	$(SOURCES) $(TESTFILES)
	$(JSC) psgeolang.js psgeolib.js psgeodb.js psgeodbtest.js 2> testdb.res
	diff testdb.res testdb.res.ok

teststat.res:	$(SOURCES) $(TESTFILES)
	$(JSC) psgeostat.js psgeolib.js psgeodb.js psgeostattest.js 2> teststat.res
	diff teststat.res teststat.res.ok

testlib.res:	$(SOURCES) $(TESTFILES)
	$(JSC) psgeolib.js psgeodb.js psgeolibtest.js 2> testlib.res
	diff testlib.res testlib.res.ok

testlang.res:	$(SOURCES) $(TESTFILES)
	$(JSC) psgeolang.js psgeolangtest.js 2> testlang.res
	diff testlang.res testlang.res.ok

wc:
	wc -l *.js

clean:
	-rm -f *.res

