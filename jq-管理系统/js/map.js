//	var baseURL = 'http://47.104.135.224:8080';
//  //创建和初始化地图函数：
// var map;
//  function initMaps(){
//      createMap();//创建地图
//      setMapEvent();//设置地图事件
//      addMapControl();//向地图添加控件
//      addMarker();//向地图中添加marker
//  }
//
//  //创建地图函数：
//  function createMap(){
//      map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
//      var point = new BMap.Point(116.395645,39.929986);//定义一个中心点坐标
//      map.centerAndZoom(point,12);//设定地图的中心点和坐标并将地图显示在地图容器中
//      window.map = map;//将map变量存储在全局
//  }
//
//  //地图事件设置函数：
//  function setMapEvent(){
//      map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
//      map.enableScrollWheelZoom();//启用地图滚轮放大缩小
//      map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
//      map.enableKeyboard();//启用键盘上下左右键移动地图
//  }
//
//  //地图控件添加函数：
//  function addMapControl(){
//      //向地图中添加缩放控件
//
//      //向地图中添加缩略图控件
//      var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
//      map.addControl(ctrl_ove);
//      //向地图中添加比例尺控件
//      var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
//      map.addControl(ctrl_sca);
//  }
//
//  //标注点数组
//  let markerArr = [];
//  function getAjax(id){
//      let url = `${baseURL}/risk/detils/l/${id}`;
//      $.ajax({
//			url: url,
//			crossDomain: true,
//			xhrFields: {
//				withCredentials: true
//			},
//			success(res) {
//			  if(res){			  	
//                  markerArr = res
//                  addMarker(res)
//              }
//
//			}
//		})
//  }
//  //创建marker
//  function addMarker(markerArr){
//      if(markerArr)
//      for(let i=0;i<markerArr.length;i++){
//          let json = markerArr[i];
//          let p0 = json.gps_dimension;
//          let p1 = json.gps_latitude;
//          let point = new BMap.Point(p0,p1);
////          console.log(json)
//          let iconImg = createIcon(JSON.parse(json.icon));
//
//          let marker = new BMap.Marker(point,{icon:iconImg});
//          let iw = createInfoWindow(i);
//          let label = new BMap.Label(json.gps_addr,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
//          marker.setLabel(label);
//          map.addOverlay(marker);
//          label.setStyle({
//              borderColor:"#808080",
//              color:"#333",
//              cursor:"pointer"
//          });
//
//          (function(){
//              var index = i;
//              var _iw = createInfoWindow(i);
//              var _marker = marker;
//              _marker.addEventListener("click",function(){
//                  this.openInfoWindow(_iw);
//              });
//              _iw.addEventListener("open",function(){
//                  _marker.getLabel().hide();
//              })
//              _iw.addEventListener("close",function(){
//                  _marker.getLabel().show();
//              })
//              label.addEventListener("click",function(){
//                  _marker.openInfoWindow(_iw);
//              })
//          })()
//      }
//  }
//  //创建InfoWindow
//  function createInfoWindow(i){
//      var json = markerArr[i];
//      
//      var iw = new BMap.InfoWindow("<div class='iw_poi_content'><span>报险地址:</span>" + json.gps_addr + "</div><div class='iw_poi_content'><span>保险时间:</span>"+json.gps_time+"</div>");
//      return iw;
//  }
//  //创建一个Icon
//  function createIcon(json){
// 
//      var icon = new BMap.Icon("http://api.map.baidu.com/lbsapi/creatmap/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
//      return icon;
//  }
// 
// 
