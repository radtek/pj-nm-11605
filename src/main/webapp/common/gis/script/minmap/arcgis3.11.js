var mapPrototype,dojoConfig={parseOnLoad:!0,packages:[{name:"arcgishw",location:com.hw.map.utils.MapConstUtil.MapDirLocation+"/arcgishw"}]};com.hw.map.utils.DomTools.addCssUrl(com.hw.map.utils.MapConstUtil.MapDirLocation+"/arcgishw/InfoWindow.css"),com.hw.map.utils.DomTools.addCssUrl(com.hw.map.utils.MapConstUtil.MapDirLocationGIS+"/dijit/themes/tundra/tundra.css"),com.hw.map.utils.DomTools.addCssUrl(com.hw.map.utils.MapConstUtil.MapDirLocationGIS+"/esri/css/esri.css"),com.hw.map.utils.DomTools.addCssUrl(com.hw.map.utils.MapConstUtil.MapDirLocation+"/css/style.css"),com.hw.map.utils.DomTools.addJavascriptUrl(com.hw.map.utils.MapConstUtil.MapDirLocationGIS+"/init.js"),com.hw.map.utils.DomTools.addJavascriptUrl(com.hw.map.utils.MapConstUtil.MapDirLocation+"/layers/GoogleLayers.js"),com.hw.map.utils.DomTools.addJavascriptUrl(com.hw.map.utils.MapConstUtil.MapDirLocation+"/layers/HWDynamicLayer.js"),mapPrototype=com.hw.map.HWMap.prototype,com.hw.map.HWMap.currentIdIndex=0,com.hw.map.HWMap.getCurrentIdIndex=function(){return com.hw.map.HWMap.currentIdIndex++,com.hw.map.HWMap.currentIdIndex},mapPrototype.defaultOptions={showNavigateBar:!0,showOverview:!0,showScale:!0,mapLoad:function(){},mapExtentChanged:function(){},baseLayers:[{layerId:com.hw.map.HWMapDefaultLayerIds.DEFAULT_TILED_VECTOR_LAYER_ID,url:"http://125.70.9.194:6080/common/rest/services/MAP1230/MapServer",visible:!0,type:"",attributes:{}}]},mapPrototype.__initMap=function(a,b){var c=this;c.dpi=96,c.meterPerInch=.0254,require(["esri/map","esri/SpatialReference","dojo/parser","esri/dijit/InfoWindow","esri/toolbars/draw"],function(d,e,f,g,h){var i,j,k,l,m,n,o;if(b.spatialReference&&(c.spatialReference=new esri.SpatialReference({wkid:b.spatialReference})),defineTiledLayerBeforeInitMap(),defineDynamicLayerBeforeInitMap(),c.mapContainer=dojo.byId(a),dojo.addClass(c.mapContainer,"tundra"),c.mapDiv=dojo.create("div",{},this.mapContainer),dojo.style(c.mapContainer,"overflow","hidden"),dojo.style(c.mapDiv,"width","100%"),dojo.style(c.mapDiv,"height","100%"),dojo.style(c.mapDiv,"margin","0px"),dojo.style(c.mapDiv,"padding","0px"),dojo.style(c.mapDiv,"border","0px"),dojo.style(c.mapContainer,"position","relative"),c.mapDiv.id="com_hw_map_HWMap_"+com.hw.map.HWMap.getCurrentIdIndex(),b&&b.showNavigateBar===!0&&(c.navigateContainerDiv=dojo.create("div",{style:"display:none;width:0px;height:0px;",innerHTML:'<div class="amap-toolbar" style="left: 10px; top: 10px; visibility: visible;width:0px;">  <div class="amap-pancontrol" style="position: relative; display: block;">     <div class="amap-pan-left"></div>     <div class="amap-pan-top"></div>     <div class="amap-pan-right"></div>     <div class="amap-pan-bottom"></div>   </div>   <div class="amap-locate" style="position: relative; left: 17px; display: none;"></div>   <div class="amap-zoomcontrol" style="position: relative; left: 14px;width:0px;height:0px;">     <div class="amap-zoom-plus"></div>     <div class="amap-zoom-ruler" style="display: block;">       <div class="amap-zoom-mask" style="height: 63px;"></div>       <div class="amap-zoom-cursor" style="top: 63px;"></div>       <div class="amap-zoom-labels" style="display: none;">         <div class="amap-zoom-label-street"></div>         <div class="amap-zoom-label-city"></div>         <div class="amap-zoom-label-province"></div>         <div class="amap-zoom-label-country"></div>       </div>     </div>     <div class="amap-zoom-minus"></div>   </div> </div>'},c.mapContainer),c._navigateSliderLength=dojo.query("#"+a+" .amap-zoom-ruler")[0].clientHeight,dojo.connect(dojo.query("#"+a+" .amap-pan-left")[0],"onclick",c,"panLeft"),dojo.connect(dojo.query("#"+a+" .amap-pan-right")[0],"onclick",c,"panRight"),dojo.connect(dojo.query("#"+a+" .amap-pan-top")[0],"onclick",c,"panUp"),dojo.connect(dojo.query("#"+a+" .amap-pan-bottom")[0],"onclick",c,"panDown"),c._navigateSliderMarsk=dojo.query("#"+a+" .amap-zoom-mask")[0],c._navigateSliderCursor=dojo.query("#"+a+" .amap-zoom-cursor")[0],dojo.connect(dojo.query("#"+a+" .amap-zoom-plus")[0],"onclick",c,"zoomIn"),dojo.connect(dojo.query("#"+a+" .amap-zoom-minus")[0],"onclick",c,"zoomOut")),b&&b.showScale===!0&&(c.scaleContainerDiv=dojo.create("div",{id:com.hw.map.HWMap.getCurrentIdIndex(),unselectable:"on","class":"amap_scaleCtrl",style:"bottom: 20px; right: auto; top: auto; left: 5px; width: 104px; position: absolute; z-index: 10;",innerHTML:'<div class="amap_scaleTxt" unselectable="on" style="color: black; background-color: transparent;"></div><div class="amap_scaleBar amap_scaleHBar" style="background-color: black;"></div>'},c.mapContainer),c.scaleTextDiv=dojo.query("#"+c.scaleContainerDiv.id+" .amap_scaleTxt")[0]),dijit.byId("dijit_layout_BorderContainer_0")||dojo.parser.parse(),i=0,j=0,b.center&&(i=b.center.x,j=b.center.y),k=1,b.zoomLevel&&(k=b.zoomLevel),c.mMap=new esri.Map(c.mapDiv.id,{logo:!1,showAttribution:!1,slider:!1,center:[i,j],zoom:k}),c.mMap.hwMap=c,c.mMap.on("load",function(a){com.hw.map.HWLog.log("load"),c.spatialReference||(c.spatialReference=a.map.spatialReference),b&&b.showOverview===!0&&c._addOverview(b.overviewOptions),c.navigateContainerDiv&&(dojo.style(c.navigateContainerDiv,{display:"block"}),c._navigateSliderChange()),b&&b.mapLoad&&b.mapLoad(a.map.hwMap),c._isOverviewVisbile&&c._changeOverviewExtentGeometry(),c.scaleTextDiv&&c._changeScaleMessage()}),c.mMap.on("extent-change",function(a){com.hw.map.HWLog.log("extent-change"),a.levelChange&&c._navigateSliderChange(),b&&b.mapExtentChanged&&b.mapExtentChanged(new com.hw.map.HWExtent(a.extent.xmin,a.extent.ymin,a.extent.xmax,a.extent.ymax)),c._isOverviewVisbile&&c._changeOverviewExtentGeometry(),c.scaleTextDiv&&c._changeScaleMessage()}),l=b.baseLayers,c._baseLayers=[],l)for(m=0;m<l.length;m++)n=l[m],c.addBaseLayer(c._createBaseLayer(n));for(c.mMap.addLayer(new esri.layers.GraphicsLayer({id:com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYGON_LAYER_ID})),c.mMap.addLayer(new esri.layers.GraphicsLayer({id:com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYLINE_LAYER_ID})),c.mMap.addLayer(new esri.layers.GraphicsLayer({id:com.hw.map.HWMapDefaultLayerIds.DEFAULT_MARKER_LAYER_ID})),c._graphicClickEventHandlers={},c._graphicMouseOverEventHandlers={},c._graphicMouseOutEventHandlers={},m=0;m<c.mMap.graphicsLayerIds.length;m++)o=c.mMap.getLayer(c.mMap.graphicsLayerIds[m]),o.on("click",function(a){if(a.graphic.attributes&&a.graphic.attributes.id){var b=c._graphicClickEventHandlers[a.graphic.attributes.id];b&&b(a.graphic.attributes)}}),o.on("mouse-over",function(a){if(a.graphic.attributes&&a.graphic.attributes.id){var b=c._graphicMouseOverEventHandlers[a.graphic.attributes.id];b&&b(a.graphic.attributes)}}),o.on("mouse-out",function(a){if(a.graphic.attributes&&a.graphic.attributes.id){var b=c._graphicMouseOutEventHandlers[a.graphic.attributes.id];b&&b(a.graphic.attributes)}});c._drawTool=h(c.mMap,{showTooltips:!1}),c._currentDragMode="pan",c._currentDragCallback=null,c._drawTool.on("draw-end",function(a){var d,e,b=c._currentDragMode;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASURELENGTH===b&&c._drawMeasureMessage(a.geometry),com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASUREAREA===b&&c._drawMeasureMessage(a.geometry),c._currentDragCallback){if(com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASURELENGTH===b)return c._currentDragCallback(c._GeometryToHWPoints(a.geometry.paths[0])),void 0;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASUREAREA===b)return c._currentDragCallback(c._GeometryToHWPoints(a.geometry.rings[0])),void 0;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOINT===b)return c._currentDragCallback(new com.hw.map.HWPoint(a.geometry.x,a.geometry.y)),void 0;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOLYGON===b)return c._currentDragCallback(c._GeometryToHWPoints(a.geometry.rings[0])),void 0;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOLYLINE===b)return c._currentDragCallback(c._GeometryToHWPoints(a.geometry.paths[0])),void 0;if(com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWCIRCLE===b){if(!a.target._dragged)return;return d=a.geometry.getExtent(),e=d.getCenter(),c._currentDragCallback({points:c._GeometryToHWPoints(a.geometry.rings[0]),center:{x:e.x,y:e.y},radius:d.getWidth()/2}),void 0}return com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWEXTENT===b?(c._currentDragCallback(new com.hw.map.HWExtent(a.geometry.xmin,a.geometry.ymin,a.geometry.xmax,a.geometry.ymax)),void 0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWARROW===b?(c._currentDragCallback(c._GeometryToHWPoints(a.geometry.rings[0])),void 0):void 0}})})},mapPrototype.hideBaseLayer=function(a){this._baseLayers[a].setVisibility(!1)},mapPrototype.showBaseLayer=function(a){this._baseLayers[a].setVisibility(!0)},mapPrototype.addBaseLayer=function(a){this.mMap.addLayer(a),this._baseLayers.push(a)},mapPrototype._navigateSliderChange=function(){var a,b,c,d;com.hw.map.HWLog.log("_navigateSliderChange"),this.navigateContainerDiv&&(a=this,0===this._navigateSliderLength&&(this._navigateSliderLength=dojo.query("#"+this.mapContainer.id+" .amap-zoom-ruler")[0].clientHeight),b=a.mMap.getMaxZoom()-a.mMap.getMinZoom(),c=a.mMap.getMaxZoom()-a.mMap.getZoom(),d=c*a._navigateSliderLength/b,dojo.style(a._navigateSliderMarsk,"height",d+"px"),dojo.style(a._navigateSliderCursor,"top",d+"px"))},mapPrototype._changeScaleMessage=function(){var e,f,g,h,a=this.mMap.__LOD.scale*this.meterPerInch/this.dpi,b=200*a,c=(b+"").split(".")[0],d=c.substr(0,1);for(e=1;e<c.length;e++)d+="0";f=parseInt(d),g=f>1e3?f/1e3+"&nbsp;公里":f+"&nbsp;米",h=f/a,dojo.attr(this.scaleTextDiv,"innerHTML",g),dojo.style(this.scaleContainerDiv,"width",h+"px")},mapPrototype._GeometryToHWPoints=function(a){var c,b=[];for(c=0;c<a.length;c++)b.push(new com.hw.map.HWPoint(a[c][0],a[c][1]));return b},mapPrototype._drawMeasureMessage=function(a){var c,d,e,f,g,h,i,j,b=this.mMap.graphics;if(this.measureTextConfig.graphic&&(b.remove(this.measureTextConfig.graphic._graphic),this.measureTextConfig.graphic._map=void 0,this.measureTextConfig.graphic._graphic=void 0,this.measureTextConfig.graphic=void 0),this.measureGeometryConfig.graphic&&(b.remove(this.measureGeometryConfig.graphic._graphic),this.measureGeometryConfig.graphic._map=void 0,this.measureGeometryConfig.graphic._graphic=void 0,this.measureGeometryConfig.graphic=void 0),this.meterPerMapUnit=this.mMap.__LOD.scale*this.meterPerInch/this.dpi/this.mMap.__LOD.resolution,c="",this._currentDragMode===com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASURELENGTH&&(d=new com.hw.map.HWPolyline(this.measureGeometryConfig.id,this._GeometryToHWPoints(a.paths[0]),this.measureGeometryConfig.lineWidth,this.measureGeometryConfig.lineType,this.measureGeometryConfig.lineColor,this.measureGeometryConfig.lineOpacity),this.addPolyline(d,b),this.measureGeometryConfig.graphic=d,e=com.hw.map.utils.MapTools.calLineLength(d.points)*this.meterPerMapUnit,c=e>1e4?(e/1e3+"").split(".")[0]+" 公里":(e+"").split(".")[0]+" 米"),this._currentDragMode===com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASUREAREA){for(f=new com.hw.map.HWPolygon(this.measureGeometryConfig.id,this._GeometryToHWPoints(a.rings[0]),this.measureGeometryConfig.fillColor,this.measureGeometryConfig.lineColor,this.measureGeometryConfig.lineWidth,this.measureGeometryConfig.lineType,this.measureGeometryConfig.lineOpacity,this.measureGeometryConfig.fillOpacity),this.addPolygon(f,b),this.measureGeometryConfig.graphic=f,g=0,h=0;h<f.points.length-1;h++)g+=f.points[h].x*f.points[h+1].y-f.points[h+1].x*f.points[h].y;g=Math.abs(g*this.meterPerMapUnit*this.meterPerMapUnit)/2,c=g>1e8?(g/1e6+"").split(".")[0]+" 平方公里":(g+"").split(".")[0]+" 平方米"}i=a.getExtent().getCenter(),j=new com.hw.map.HWText(this.measureTextConfig.id,new com.hw.map.HWPoint(i.x,i.y),c,this.measureTextConfig.fontSize,this.measureTextConfig.font,this.measureTextConfig.color,this.measureTextConfig.opacity,this.measureTextConfig.xOffset,this.measureTextConfig.yOffset),this.addText(j,b),this.measureTextConfig.graphic=j},mapPrototype._createBaseLayer=function(a){var c,b=null;switch(a.type){case com.hw.map.HWMapDefaultBaseLayerTypes.ARCGIS_SERVER_TILED_LAYER:b=new esri.layers.ArcGISTiledMapServiceLayer(a.url,a.attributes);break;case com.hw.map.HWMapDefaultBaseLayerTypes.CUSTOM_TILED_MAP_LAYER:c=a.attributes,b=new CustomTiledMapLayer(a.url,c.initExtent,c.fullExtent,c.tiledInfo,c.getImageFunc);break;case com.hw.map.HWMapDefaultBaseLayerTypes.BAIDU_VECTOR_LAYER:b=new BaiduMapLayer;break;case com.hw.map.HWMapDefaultBaseLayerTypes.BAIDU_ANNO_LAYER:b=new BaiduAnooLayer;break;case com.hw.map.HWMapDefaultBaseLayerTypes.BAIDU_IMAGE_LAYER:b=new BaiduImageLayer;break;case com.hw.map.HWMapDefaultBaseLayerTypes.GOOGLE_VECTOR_LAYER:b=new GoogleMapLayer;break;case com.hw.map.HWMapDefaultBaseLayerTypes.GOOGLE_ANNO_LAYER:b=new GoogleAnooLayer;break;case com.hw.map.HWMapDefaultBaseLayerTypes.GOOGLE_IMAGE_LAYER:b=new GoogleImageLayer}return b&&(b.visible=a.visible,b.id=a.layerId),b},mapPrototype._addOverview=function(a){var b,c,d,e;if(com.hw.map.HWLog.log("_addOverview"),b=this,b.overViewContainerBodorDiv=dojo.create("div",{style:"background-color:#cccccc;position:absolute;padding:5px;width:238px;height:153px;right:0px;bottom:0px;",innerHTML:""},b.mapContainer),b.overViewContainerDiv=dojo.create("div",{id:com.hw.map.HWMap.getCurrentIdIndex(),style:"width:238px;height:153px;",innerHTML:""},b.overViewContainerBodorDiv),b.overviewMap=new esri.Map(b.overViewContainerDiv.id,{logo:!1,showAttribution:!1,slider:!1}),c=a.layer,c.url&&(c=[c]),c)for(d=0;d<c.length;d++)e=c[d],b.overviewMap.addLayer(this._createBaseLayer(e));b.overviewMap.parentMap=b,b._isOverviewVisbile=!0,b.overviewMap.graphicsLayer=new esri.layers.GraphicsLayer({id:com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYGON_LAYER_ID}),b.overviewMap.addLayer(b.overviewMap.graphicsLayer),this.overviewMap.disablePan(),this.overviewMap.disableScrollWheelZoom(),b.overViewContainerButton=dojo.create("div",{id:com.hw.map.HWMap.getCurrentIdIndex(),style:"width: 15px; height: 15px; position: absolute; right: 5px; bottom: 5px; cursor: pointer; border: none; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; font-size: 12px; line-height: 16px; font-family: Verdana, Helvetica, Arial, sans-serif;",innerHTML:""},b.overViewContainerBodorDiv),dojo.connect(b.overViewContainerButton,"onclick",b,"switchOverview")},mapPrototype.switchOverview=function(){var a=this;a._isOverviewVisbile?(dojo.style(a.overViewContainerDiv,"display","none"),dojo.style(a.overViewContainerBodorDiv,{width:"15px",height:"15px"}),dojo.style(a.overViewContainerButton,"background","url(http://app.mapabc.com/jsmap/3/Images/bg.png) -183px 0px no-repeat;"),a._isOverviewVisbile=!1):(dojo.style(a.overViewContainerDiv,"display","block"),dojo.style(a.overViewContainerBodorDiv,{width:"238px",height:"153px"}),dojo.style(a.overViewContainerButton,"background","url(http://app.mapabc.com/jsmap/3/Images/bg.png) -183px -15px no-repeat;"),a._isOverviewVisbile=!0,a._changeOverviewExtentGeometry())},mapPrototype._changeOverviewExtentGeometry=function(){var a,b,c,d,e,f,g,h,i;com.hw.map.HWLog.log("_changeOverviewExtentGeometry"),a=this,b=a.getExtent(),a.overviewExtentGeometryConfig.graphic&&(a.overviewMap.graphicsLayer.remove(a.overviewExtentGeometryConfig.graphic),a.overviewExtentGeometryConfig.graphic=void 0),c=new com.hw.map.HWPolygon(this.overviewExtentGeometryConfig.id,b.toPolygon(),a.overviewExtentGeometryConfig.fillColor,a.overviewExtentGeometryConfig.lineColor,a.overviewExtentGeometryConfig.lineWidth,a.overviewExtentGeometryConfig.lineType,a.overviewExtentGeometryConfig.fillOpacity,a.overviewExtentGeometryConfig.lineOpacity),d=this._toAGSPolygon(c.points),e=new esri.Color(c.fillColor),e.a=c.opacity,f=new esri.Color(c.lineColor),f.a=c.lineOpacity,g=new esri.symbol.SimpleLineSymbol(c.lineType,f,c.lineWeight),h=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,g,e),i=new esri.Graphic(d,h,c),a.overviewExtentGeometryConfig.graphic=i,a.overviewMap.graphicsLayer.add(i),b.expand(a.overviewExtentGeometryConfig.expandRadio),a.overviewMap.setExtent(new esri.geometry.Extent(b.xMin,b.yMin,b.xMax,b.yMax,this.spatialReference),!0)},mapPrototype._addVectorLayer=function(a){var b,c,d;if(!a)return alert("no layerId!"),void 0;for(b=this.mMap.layerIds,c=0;c<b.length;c++)if(a==b[c])return alert("layerId is repeated!"),void 0;d=new esri.layers.GraphicsLayer({id:a}),this.mMap.addLayer(d)},mapPrototype._removeLayer=function(a){var b,c;if(!a)return alert("no layerId!"),void 0;for(b=0;b<com.hw.map.HWMapDefaultLayerIds.DEFAULTIDS.length;b++)if(a==com.hw.map.HWMapDefaultLayerIds.DEFAULTIDS[b])return alert("layerId is default layer!"),void 0;c=this.mMap.getLayer(a),c&&this.mMap.removeLayer(c)},mapPrototype._toAGSPoint=function(a){return new esri.geometry.Point(a.x,a.y,this.spatialReference)},mapPrototype._toAGSPolygon=function(a){var b,c,d,e;for((a[0].x!=a[a.length-1].x||a[0].y!=a[a.length-1].y)&&a.push(a[0]),b=[],c=0;c<a.length;c++)d=a[c],b.push([d.x,d.y]);return e=new esri.geometry.Polygon(this.spatialReference),e.addRing(b),e},mapPrototype._toAGSPolyline=function(a){var c,d,e,b=[];for(c=0;c<a.length;c++)d=a[c],b.push([d.x,d.y]);return e=new esri.geometry.Polyline(this.spatialReference),e.addPath(b),e},mapPrototype.addMarker=function(a){var c,d,e,f,b=null;b||(b=com.hw.map.HWMapDefaultLayerIds.DEFAULT_MARKER_LAYER_ID),c=this.mMap.getLayer(b),d=this._toAGSPoint(a.point),e=new esri.symbol.PictureMarkerSymbol(a.imgSrc,a.width,a.height).setOffset(a.xOffset,a.yOffset),f=new esri.Graphic(d,e,a),a._graphic=f,a._map=this,c.add(f)},mapPrototype.addText=function(a,b){var d,e,f,g,h,i,c=null;c||(c=com.hw.map.HWMapDefaultLayerIds.DEFAULT_MARKER_LAYER_ID),d=this.mMap.getLayer(c),b&&(d=b),e=new esri.Color(a.color),e.a=a.opacity,f=new esri.symbol.Font(a.fontSize,esri.symbol.Font.STYLE_NORMAL,esri.symbol.Font.VARIANT_NORMAL,esri.symbol.Font.WEIGHT_NORMAL,a.fontName),g=new esri.symbol.TextSymbol(a.text,f,e).setOffset(a.xOffset,a.yOffset),h=this._toAGSPoint(a.point),i=new esri.Graphic(h,g,a),a._graphic=i,a._map=this,d.add(i)},mapPrototype.addPolygon=function(a,b){var c,d,e,f,g,h,i,j;com.hw.map.HWLog.log("addPolygon---"+(new Date).getTime()),c=null,c||(c=com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYGON_LAYER_ID),d=this.mMap.getLayer(c),b&&(d=b),e=this._toAGSPolygon(a.points),f=new esri.Color(a.fillColor),f.a=a.opacity,g=new esri.Color(a.lineColor),g.a=a.lineOpacity,h=new esri.symbol.SimpleLineSymbol(a.lineType,g,a.lineWeight),i=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,h,f),j=new esri.Graphic(e,i,a),a._graphic=j,a._map=this,com.hw.map.HWLog.log("addPolygon---"+(new Date).getTime()),d.add(j),com.hw.map.HWLog.log("addPolygon---"+(new Date).getTime())},mapPrototype.addCircle=function(a,b){var c,d;com.hw.map.HWLog.log("addCircle---"+(new Date).getTime()),c=null,c||(c=com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYGON_LAYER_ID),d=this.mMap.getLayer(c),b&&(d=b),a.points=com.hw.map.utils.MapTools.getCircles(a.radius,a.point.x,a.point.y),this.addPolygon(a)},mapPrototype.addPolyline=function(a,b){var d,e,f,g,h,c=null;c||(c=com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYLINE_LAYER_ID),d=this.mMap.getLayer(c),b&&(d=b),e=this._toAGSPolyline(a.points),f=new esri.Color(a.color),f.a=a.opacity,g=new esri.symbol.SimpleLineSymbol(a.lineType,f,a.weight),h=new esri.Graphic(e,g,a),a._graphic=h,a._map=this,d.add(h)},mapPrototype.updateMarker=function(a){var c,d,b=a._graphic;return b?(c=this._toAGSPoint(a.point),d=new esri.symbol.PictureMarkerSymbol(a.imgSrc,a.width,a.height).setOffset(a.xOffset,a.yOffset),b.geometry=c,b.symbol=d,b.draw(),void 0):(alert("marker not related !"),void 0)},mapPrototype.updatePolyline=function(a){var c,d,e,b=a._graphic;return b?(c=this._toAGSPolyline(a.points),d=new esri.Color(a.color),d.a=a.opacity,e=new esri.symbol.SimpleLineSymbol(a.lineType,d,a.weight),b.geometry=c,b.symbol=e,b.draw(),void 0):(alert("polygon not related !"),void 0)},mapPrototype.updatePolygon=function(a){var c,d,e,f,g,b=a._graphic;return b?(c=this._toAGSPolygon(a.points),d=new esri.Color(a.fillColor),d.a=a.opacity,e=new esri.Color(a.lineColor),e.a=a.lineOpacity,f=new esri.symbol.SimpleLineSymbol(a.lineType,e,a.lineWeight),g=new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,f,d),b.geometry=c,b.symbol=g,b.draw(),void 0):(alert("polygon not related !"),void 0)},mapPrototype.updateCircle=function(a){var b=a._graphic;return b?(a.points=com.hw.map.utils.MapTools.getCircles(a.radius,a.point.x,a.point.y),this.updatePolygon(a),void 0):(alert("circle not related !"),void 0)},mapPrototype.updateText=function(a){var c,d,e,f,b=a._graphic;return b?(c=new esri.Color(a.color),c.a=a.opacity,d=new esri.symbol.Font(a.fontSize,esri.symbol.Font.STYLE_NORMAL,esri.symbol.Font.VARIANT_NORMAL,esri.symbol.Font.WEIGHT_NORMAL,a.fontName),e=new esri.symbol.TextSymbol(a.text,d,c).setOffset(a.xOffset,a.yOffset),f=this._toAGSPoint(a.point),b.geometry=f,b.symbol=e,b.draw(),void 0):(alert("text not related !"),void 0)},mapPrototype.clearOverlays=function(){var a,b;for(a=0;a<this.mMap.graphicsLayerIds.length;a++)b=this.mMap.getLayer(this.mMap.graphicsLayerIds[a]),b.clear()},mapPrototype.removeOverlay=function(a){var b=null;b="com.hw.map.HWMarker"==a.type||"com.hw.map.HWText"==a.type?this.mMap.getLayer(com.hw.map.HWMapDefaultLayerIds.DEFAULT_MARKER_LAYER_ID):"com.hw.map.HWPolyline"==a.type?this.mMap.getLayer(com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYLINE_LAYER_ID):this.mMap.getLayer(com.hw.map.HWMapDefaultLayerIds.DEFAULT_POLYGON_LAYER_ID),b&&(b.remove(a._graphic),a._graphic.attributes=void 0,a._graphic=void 0,a._map=void 0)},mapPrototype._getOverlayByIdAndLayer=function(a,b){var c,d;for(c=0;c<b.graphics.length;c++)if(d=b.graphics[c],d.attributes.id==a)return d.attributes;return null},mapPrototype.getOverlayById=function(a){var b,c,d;for(c=0;c<this.mMap.graphicsLayerIds.length;c++)if(d=this.mMap.getLayer(this.mMap.graphicsLayerIds[c]),b=this._getOverlayByIdAndLayer(a,d))return b;return null},mapPrototype.removeOverlayById=function(a){var b,c,d;for(c=0;c<this.mMap.graphicsLayerIds.length;c++)if(d=this.mMap.getLayer(this.mMap.graphicsLayerIds[c]),d.graphics&&(b=this._getOverlayByIdAndLayer(a,d)))return d.remove(b._graphic),b._graphic=void 0,!0;return!1},mapPrototype.addHeadLayer=function(a,b){var c=this;require(["esri/layers/FeatureLayer","esri/renderers/HeatmapRenderer","esri/tasks/FeatureSet"],function(d,e){var j,k,l,m,n,g={geometryType:"esriGeometryPoint",fields:[{name:"ID",type:"esriFieldTypeInteger",alias:"ID"}]},h={layerDefinition:g,featureSet:null},i=new d(h,{id:a,mode:d.MODE_SNAPSHOT,opacity:1});for(c.mMap.addLayer(i),j=new e({blurRadius:10,maxPixelIntensity:30,minPixelIntensity:0}),j.setColorStops([{ratio:0,color:"rgb(255, 219, 0, 0)"},{ratio:.6,color:"rgb(250, 146, 0)"},{ratio:.85,color:"rgb(250, 73, 0)"},{ratio:.95,color:"rgba(250, 0, 0)"}]),i.setRenderer(j),k=0;k<b.length;k++)b[k].ID=k,l=c._toAGSPoint(b[k]),m=new esri.symbol.SimpleMarkerSymbol,n=new esri.Graphic(l,m,b[k]),i.add(n)})},mapPrototype.showInfoWindow=function(a,b,c,d,e,f){var g=this;require(["arcgishw/InfoWindow"],function(h){var i,j,k,l;g.mapOptions.infoWindow&&g.mapOptions.infoWindow.isCustom?g.infoWindow||(i=new h({domNode:dojo.create("div",null,g.mapDiv),options:g.mapOptions.infoWindow}),g.mMap.infoWindow=i,i.setMap(g.mMap)):g.infoWindow||(j=dojo.create("div"),i=new esri.dijit.InfoWindow({},j),i.startup(),i.setMap(g.mMap),g.mMap.infoWindow=i,g.mMap.infoWindow.setFixedAnchor(h.ANCHOR_UPPERRIGHT),g.infoWindow=g.mMap.infoWindow),f&&g.mMap.infoWindow.setTitle(f),g.mMap.infoWindow.setContent(e),k=new esri.geometry.Point(a,b,this.spatialReference),g.mMap.infoWindow.resize(c,d),l=g.mMap.toScreen(k),g.mMap.infoWindow.show(l,h.ANCHOR_UPPERRIGHT)})},mapPrototype.hideInfoWindow=function(){this.mMap.infoWindow.hide()},mapPrototype.panByPointAndLevel=function(a,b,c){this.mMap.centerAndZoom(new esri.geometry.Point(a,b,this.spatialReference),c)},mapPrototype.panByExtent=function(a,b,c,d){this.mMap.setExtent(new esri.geometry.Extent(a,b,c,d,this.spatialReference),!0)},mapPrototype.zoomToLevel=function(a){this.mMap.setLevel(a)},mapPrototype.centerAt=function(a,b){this.mMap.centerAt(new esri.geometry.Point(a,b,this.spatialReference))},mapPrototype.panUp=function(){this.mMap.panUp()},mapPrototype.panDown=function(){this.mMap.panDown()},mapPrototype.panLeft=function(){this.mMap.panLeft()},mapPrototype.panRight=function(){this.mMap.panRight()},mapPrototype.zoomIn=function(){this.getLevel()!==this.mMap.getMaxZoom()&&this.zoomToLevel(this.getLevel()+1)},mapPrototype.zoomOut=function(){this.getLevel()!==this.mMap.getMinZoom()&&this.zoomToLevel(this.getLevel()-1)},mapPrototype.setPanZoomEnable=function(a){a===!0?(this.mMap.enablePan(),this.mMap.enableScrollWheelZoom()):(this.mMap.disablePan(),this.mMap.disableScrollWheelZoom())},mapPrototype.getCenter=function(){var a=this.mMap.extent.getCenter();return new com.hw.map.HWPoint(a.x,a.y)},mapPrototype.getExtent=function(){var a=this.mMap.extent;return new com.hw.map.HWExtent(a.xmin,a.ymin,a.xmax,a.ymax)},mapPrototype.toMap=function(a,b){var c=this.mMap.toMap(new esri.geometry.ScreenPoint(a,b));return new com.hw.map.HWPoint(c.x,c.y)},mapPrototype.toScreen=function(a,b){var c=this.mMap.toScreen(new esri.geometry.Point(a,b,this.spatialReference));return new com.hw.map.HWPoint(c.x,c.y)},mapPrototype.getLevel=function(){return this.mMap.getLevel()},mapPrototype.getScale=function(){return this.mMap.getScale()},mapPrototype.getHeight=function(){return this.mMap.height},mapPrototype.getWidth=function(){return this.mMap.width},mapPrototype._getLineStyle=function(a){var b=new esri.Color(a.lineColor);return b.a=a.lineOpacity,new esri.symbol.SimpleLineSymbol(a.lineType,b,a.lineWidth)},mapPrototype._getPolygonStyle=function(a){var c,d,b=new esri.Color(a.fillColor);return b.a=a.fillOpacity,c=new esri.Color(a.lineColor),c.a=a.lineOpacity,d=new esri.symbol.SimpleLineSymbol(a.lineType,c,a.lineWidth),new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,d,b)},mapPrototype.setMapCursor=function(a){this.mMap.setMapCursor(a)},mapPrototype.changeDragMode=function(a,b){return this._currentDragMode=a,this._currentDragCallback=null,this._drawTool.deactivate(),com.hw.map.HWMapOperateModel.PAN===a?(this.currentDragMode="pan",!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASURELENGTH===a?(this._currentDragCallback=b,this._drawTool.setLineSymbol(this._getLineStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.POLYLINE),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_MEASUREAREA===a?(this._currentDragCallback=b,this._drawTool.setFillSymbol(this._getPolygonStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.POLYGON),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOINT===a?(this._currentDragCallback=b,this._drawTool.activate(esri.toolbars.Draw.POINT),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOLYGON===a?(this._currentDragCallback=b,this._drawTool.setFillSymbol(this._getPolygonStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.POLYGON),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWPOLYLINE===a?(this._currentDragCallback=b,this._drawTool.setLineSymbol(this._getLineStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.POLYLINE),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWCIRCLE===a?(this._currentDragCallback=b,this._drawTool.setFillSymbol(this._getPolygonStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.CIRCLE),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWEXTENT===a?(this._currentDragCallback=b,this._drawTool.setFillSymbol(this._getPolygonStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.EXTENT),!0):com.hw.map.HWMapOperateModel.MAP_OPERATION_DRAWARROW===a?(this._currentDragCallback=b,this._drawTool.setFillSymbol(this._getPolygonStyle(mapPrototype.DrawGeometryConfig)),this._drawTool.activate(esri.toolbars.Draw.ARROW),!0):(alert(a+" is invalid!"),!1)},mapPrototype.addDynamicLayer=function(a,b){var c=new HWDynamicLayer("",{getUrlFunction:b});c.id=a,this.mMap.addLayer(c)},mapPrototype.removeDynamicLayer=function(a){this._removeLayer(a)},mapPrototype.clearMeasureMessage=function(){this.mMap.graphics.clear()},com.hw.map.HWMarker.prototype.addEventListener=function(a,b){return com.hw.map.HWMap._addGraphicEventHandler(this,a,b)},com.hw.map.HWText.prototype.addEventListener=function(a,b){return com.hw.map.HWMap._addGraphicEventHandler(this,a,b)},com.hw.map.HWPolyline.prototype.addEventListener=function(a,b){return com.hw.map.HWMap._addGraphicEventHandler(this,a,b)},com.hw.map.HWPolygon.prototype.addEventListener=function(a,b){return com.hw.map.HWMap._addGraphicEventHandler(this,a,b)},com.hw.map.HWCircle.prototype.addEventListener=function(a,b){return com.hw.map.HWMap._addGraphicEventHandler(this,a,b)},com.hw.map.HWMap._addGraphicEventHandler=function(a,b,c){var e=a._graphic;return e&&a._map?a.id?b===com.hw.map.HWMapEvents.GRAPHIC_MOUSE_CLICK?(a._map._graphicClickEventHandlers[a.id]=c,!0):b===com.hw.map.HWMapEvents.GRAPHIC_MOUSE_OVER?(a._map._graphicMouseOverEventHandlers[a.id]=c,!0):b===com.hw.map.HWMapEvents.GRAPHIC_MOUSE_OUT?(a._map._graphicMouseOutEventHandlers[a.id]=c,!0):!1:(alert(" no id !"),!1):(alert(" overlay not related !"),!1)};