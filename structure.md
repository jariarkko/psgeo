// A curated list of functions in psGeo in rough calling order
//
//    - ignoring lang.getText() translation calls
//    - numbers represent function call nesting depth

1. psgeoInit
    lib = pseoInitLib
    cfg = psgeoSettings
    db  = psgeoDB
    tbl = psgeoTables
    psgeoDomainDefault = cfg.getDomainDefault
    psgeoSources = psgeoDomainDefault.sources
    psgeoInitDisplaySize
    psgeoInitLanguage
    psgeoInitCavemaps
    psgeoForceDisplayOfCustomLinks
    lang = PsgeoLang
2.  psgeoInitMap
        topoMap = psgeoInitMapTerrain
        psgeoMap.addListener: psgeoZoomChanged             ADD LISTENER ZOOM
        psgeoInitMarkerImages
        psgeoInitStatsPaneControl
            statsPaneWin = new PsgeoStatsPaneWin
            filterPaneWin = new PsgeoFilterPaneWin
3.      psgeoInitList
            lib.getDefaultFilterCaving
            db.setFilter
            db.getFilter
            lib.getDefaultFilterSkiing
            $.getJSON
                db.addPlacesWithFilter
4.          psgeoFinishLoading
                db.filterMatchMap
                db.filterAnd
                db.setFilter
                db.applyAllNoFilter
                    psgeoInitMarker
5.              psgeoInitStatsPane 
6.                  psgeoInitFilterPaneText
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
6.                  psgeoUpdateStatsPane
7.                      psgeoUpdateStatsPaneText
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

