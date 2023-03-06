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
        psgeoInitStatsPaneControl
            statsPaneWin = new PsgeoStatsPaneWin
            filterPaneWin = new PsgeoFilterPaneWin
3.      psgeoInitList
            lib.getDefaultFilterCaving
            db.setFilter
            db.getFilter
            lib.getDefaultFilterSkiing
            $.getJSON                                      READ THE ACTIVITY DATABASE
                db.addPlacesWithFilter
4.          psgeoFinishLoading
                db.filterMatchMap
                db.filterAnd
                db.setFilter
                db.applyAllNoFilter
                    psgeoInitMarker
5.              psgeoInitStatsPane                         STATS PANE IS THE MAIN CONTROL
6.                  psgeoInitFilterPaneText                ON LARGE DISPLAYS IT SPAWNS A SEPARATE FILTERPANE
                        psgeoFilterSectionPrefix
                        lib.isOtherActivity
                        lib.getActivityShortName
                        psgeoCreateActivityCheckbox
                        psgeoCreateRangeCheckbox
                        psgeoCreateCaveMapCheckbox
7.                      addEventListener: psgeoRerunFilters      ADD LISTENER RERUN FILTERS
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
8.                          psgeoRecheckVisibility
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
                                            psgeoRerunFilters ///
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
                                    psgeoMoreMenuContents ///
                                    
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
