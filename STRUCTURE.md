// A curated list of functions in psGeo in rough calling order
//
//    - ignoring lang.getText() translation calls
//    - numbers represent function call nesting depth

1. psgeoInit
    lib = psgeoInitLib                                     FUNCTION LIBRARY - AUXILIARY STUFF
    cfg = psgeoSettings                                    HANDLES ALL SETTINGS
    db  = psgeoDB                                          ACTIVITY DATABASE AND FILTERING
    tbl = psgeoTables                                      INTERNAL STRUCTURES
    psgeoDomainDefault = cfg.getDomainDefault              IMPORT SETTINGS FROM JSON USING FETCH API
    psgeoSources = psgeoDomainDefault.sources
    psgeoInitDisplaySize                                   SMALL OR NOT?
    psgeoInitLanguage                                      OVERRIDE DEFAULTS WITH PARAMS?
    psgeoInitCavemaps                                      ONE OVERRIDE MORE
    psgeoForceDisplayOfCustomLinks                         ONE OVERRIDE MORE
    lang = PsgeoLang                                       TRANSLATION LIBRARY USED FOR UI
2.  psgeoInitMap
        topoMap = psgeoInitMapTerrain                      GOTTA CATH 'EM ALL
        psgeoMap.addListener: psgeoZoomChanged             ADD LISTENER ZOOM
        psgeoMap.addListener: maptypeid_changed            ADD LISTENER CHANGE TO UK TOPOGRAPHIC MAP
        psgeoInitMarkerImages
        psgeoInitFilterPaneControl
            filterPaneWin = new PsgeoFilterPaneWin
        psgeoInitStatsPaneControl
            filterPaneWin = new PsgeoFilterPaneWin
3.      psgeoInitList
            lib.getDefaultFilterCaving
            db.getFilter
            db.setFilter
            lib.getDefaultFilterSkiing
4.          async function fetchData                       PARALLEL IMPORT. LAST TO COMPLETE RUNS psgeoFINISH LOADING
                db.addPlacesWithFilter
5.              psgeoFinishLoading
                    db.filterMatchMap
                    db.filterAnd
                    db.setFilter
                    db.applyAllNoFilter
                        psgeoInitMarker
6.                  psgeoInitFilterPane                        STATS PANE IS THE MAIN CONTROL
7.                      psgeoInitFilterPaneText                ON LARGE DISPLAYS IT SPAWNS A SEPARATE FILTERPANE
                            psgeoInitFilterPaneTextActivities
                                psgeoFilterSectionPrefix
                                lib.getActivityShortName
                                lib.isOtherActivity
                                psgeoCreateActivityCheckbox
                            psgeoInitFilterPaneTextRangeCategories
                                psgeoFilterSectionPrefix
                                psgeoCreateRangeCheckbox
                            psgeoInitFilterPaneTextContent
                                psgeoFilterSectionPrefix
                                psgeoCreateCaveMapCheckbox
8.                          addEventListener: psgeoRerunFilters      ADD LISTENER RERUN FILTERS  // ?????????
                                    psgeoCreateOnlyFinlandFilter
                                    psgeoCreateNameFilter
                                    psgeoCreateSubtypGroupFilters
                                    db.filterMatchActivities
                                    db.filterMatchMap
                                    db.filterRange
                                    db.filterOr
                                    db.filterAnd
                                    psgeoMakeSourceFilter
                                    db.setFilter
9.                                  psgeoRecheckVisibility
                                        db.matchFilter
                                        psgeoItemShouldBeVisibleAtThisZoomLevel
8.                          psgeoUpdateStatsPane
                                psgeoUpdateStatsPaneText
6.                  psgeoUpdateStatsPane                    THIS IS THE MAIN THING HERE
7.                      psgeoUpdateStatsPaneText
                            statLines = tbl.getStatLines    TABLES TELL WHETHER WE HAVE A CAVING RELATED VIEW OR A GENERAL VIEW
                            psgeoMoreFilterWindowNeeded  
                            psgeoGetFilterMenuButton        OPENS ADVANCED FILTERING/SEARCH
                                psgeoFilterMenuBringUp
                                    psgeoGenericMenuButton
                                    psgeoFilterMenuContents
                                        psgeoFilterSectionPrefix
                                        psgeoNameFilterInput
                                            psgeoGetNameInput
                                            psgeoRerunFilters   /// child functions will not be included in this list
                                        psgeoInitFilterPaneText
                                            lib.getActivityList
                                            lib.getActivityShortName
                                            psgeoCreateActivityCheckbox
                                            psgeoRangeCheckbox
                                        psgeoGetSubtypeGroupCheckboxList
                                        psgeoGetOnlyFinlandCheckbox
                                        psgeoGetGetOtherCountriesCheckbox
                                        psgeoGetSourcesCheckboxes
                            google.maps.event.addListener(markerMyPosition ...
                            psgeoGetGeolocationButton           ADD WEB WORKER WITH CALLBACKS
                                geolocationPending
                                geolocationStopWatchPosition
                                geolocationAchieved
                                geolocationFailed
                            psgeoGetMoreMenuButton              OPENS A WINDOW WITH CUSTOM LINKS AND ABOUT
                                psgeoMoreMenuBringUp
                                    psgeoGenericMenuButton
                                    psgeoMoreMenuContents       /// child functions will not be included in this list
                    addEventListener:resize
                        adjustUserInterfaceForSmallScreen
                        adjustUserInterfaceForLargeScreen
                        putStuffBackInFilterPane                STORE DIVS BEFORE THEIR CONTAINER MENU IS DESTROYED
                        updateStatsPane
6.                  psgeoInitPlace
                        psgeoInitPlaceAux 
                            db.getNamedItemsPartialMatch
                            map.setCenter
                            map.setZoom
                            psgeoMarkerPopupItem
3.      psgeoInitLinkHandlers
4.          psgeoInitPlaceAux
                db.getNamedItemsPartialMatch
                map.setCenter
                map.setZoom
                psgeoMarkerPopupItem

