# Psgeo Coding Style Guide

This is a brief note about how we expect the Psgeo software to be written. This not a document that describes the software structure, see separate [document](https://github.com/jariarkko/psgeo/blob/master/doc/Psgeo-Software-Structure.md)  on that. There's also a separate document on how to [use](https://github.com/jariarkko/psgeo/blob/master/doc/Psgeo-Intro.md) Psgeo.

However, this document talks about how we expect the software to be written, in terms of process, testing, use of external libraries, and detailed coding style.

## Process

Psgeo is open source. We collaborate at the GitHub site:

* All contributions should be made in GitHub.
* Small contributions by experienced developers can be made directly on the master branch.
* Anything large should generally be done in a separate branch, and a suitable Pull  Request be created to request its integration. This allows testing and review and modification by other contributors.
* All PRs and commits to the GitHub master branch must be made only if "make" succeeds in the lib directory. This will ensure tests are run and their results are correct, i.e., no existing functionality is broken.

All bugs and feature requests should be documented in GitHub issue [list](https://github.com/jariarkko/psgeo/issues).

## Releases

All weekly and major releases should be tagged with a tag "v<i>.<j>.<k>". E.g., to view current tags, use

    git tag

And making a new version:

    git tag -a v2.0.0
    make updateversion
    git add lib/psgeolib.js
    git commit -m"new version"

## Testing

The Makefile in the lib directory runs various code checks and unit tests on the entire software. Its use is mandatory after changes.

(A future change may involve continuous integration approach where this happens automatically for all attempted commits.)

## Community behaviour

We strive for polite collaboration, welcome all contibutors, and respect the different needs diffferent people may have for the software and data formats.

We also strive for technical excellence (even if at times this means pointing out problems in the software -- but not in people).

## Detailed coding style

We use JavaScript. The following additional quidelines apply:

* Please comment all data structures, all functions (incl. input parameters and return values), and all complex pieces of code.
* Please use defensive programming style, i.e,. for most functions this means that all input parameters should be checked, and appropriate exceptions thrown upon error.
* Please indent your code appropriately, using 4 character indent settings. Please avoid the use of TABs, as their usage can sometimes be dependent on the contributor's programming environment, and look different to the other contributors.
* Avoid leaving "FIXIT" type comments in the code, please use the GitHub issue list instead.
* Please limit the use of external libraries to the minimum; we attempt to keep Psgeo as portable and independent of other systems as possible.

