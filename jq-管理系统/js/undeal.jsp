<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
	String resourcePaht = "http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		
		<meta charset="utf-8" />
		<title></title>
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link href="static/css/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="static/css/ace.min.css" />
		<link rel="stylesheet" href="static/css/ace-skins.min.css" />
		<link rel="stylesheet" href="static/assets/css/font-awesome.css" />
		<!-- ace styles -->
		<link rel="stylesheet" href="static/assets/css/ace.css" class="ace-main-stylesheet" id="main-ace-style" />

		<script type="text/javascript" src="static/js/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="static/js/jquery.tips.js"></script>
		<script type="text/javascript" src="static/js/jquery.json-2.3.min.js"></script>
		<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=B546359e1a0a13e1cf124dbd001f823f"></script>
	</head>
	
	<style>
	yourelelment video::-webkit-media-controls-fullscreen-button {
            display: none;
        }
	</style>
<body style="margin: 0px;">
	<!-- <table width="1059" height="327" border="2"> -->
	<table width="1500" height="600" border="1">
	<div id="zhongxin">
	 <iframe class="iframid" id="iframid" src="" style="width: 80%;height: 85px;" ></iframe> 
  <tr >
  <!-- 地图 -->
  	<td rowspan="6" style="width: 25%; height:100%" ><br><a href="#myModal" data-toggle="modal" role="button" class="btn btn-mini btn-primary" onclick="showfull()">地图展示</a><br><div id="allmap" style="width:100%;height:100%;">地图</div></td>
  	<!-- 图片 -->
  	<td style="width: 20%; height:200px;">
  		<img id="photoId" height="100%" onerror="photoFail()" style="height: 300px" width="100%" title="${gpsUploadImg.upload_title }" src="<%=resourcePaht%>${gpsUploadImg.upload_url }">
  	</td>
  	<!-- 视频 -->
  	<td rowspan="3" style="width: 25%;height: 500px; margin: 0px;" ondblclick="showVideo()">
  		<video id="videoId" name="videoName" style="width: 100%;height: 100%; margin: 0px;"  title="${gpsUploadVideo.upload_title }" src=<%=resourcePaht%>${gpsUploadVideo.upload_url } controls="controls" >不支持此类型视频</video>
  	</td>
  	<td width="20%"  style="vertical-align: top;" rowspan="5">
  	<h4><b>用户报险信息:</b></h4>
	    <strong>当事人:</strong><font style="color: red;" id="testname">${pd.username }</font><br/>
	    <strong>性   别:</strong><font style="color: red;" id="testsex">${sex }</font><br/>
	    <strong>状   态:</strong><font style="color: red;" id="testStauts">${gpsShouStatus=='0'?'正常':'误报' }</font><br/>
	    <strong>电   话:</strong><font style="color: red;" id="testphone">${pd.phone }</font><i class="icon-headphones" onclick="callphone('${pd.phone }')"><img src=""></i><br/>
	    <strong>设备码:</strong><font style="color: red;" id="testtime">${pd.deviceNo }</font><br/>
	    <strong>设备类型:</strong><font style="color: red;" id="">${pd.type }</font><br>
	    <strong>设备电量:</strong><font style="color: red;" id="">${pd.device_power }%</font><br>
	    <strong>身份证:</strong><font style="color: red;" id="testid">${pd.id_card }</font><br/>
	    <strong>报险时间:</strong><font style="color: red;" id="newTime">${pd.call_time }</font><br/>
	    <strong>报险地址:</strong><font style="color: red;" id="newAddr">${pd.gps_addr }</font><button onclick="getNewAddrAndResourceCount(${pd.id },${pd.phone })" title="获取最新地址及资源数量" class="btn btn-primary btn-mini">刷新</button><br/>
    <span style="border: 1px"><h4><b>受信人信息:</b></h4></span>
    <c:forEach begin="0" end="${fn:length(gpsShouList) }" items="${gpsShouList }" var="gpsShou" varStatus="vs">
    	<input style="opacity :1;position: static;" type="checkbox" name="shouCheckbox" value="${gpsShou.clientuserId}"/><strong>第${vs.index+1 }受信人:</strong><br/><font style="color: red;" id="">${gpsShou.clientuserId}</font>
    	<c:if test="${gpsShouStatus=='1' }">
    		<strong>状态:</strong><font style="color: red;" id="">误报</font>
    	</c:if>
    	<c:if test="${gpsShouStatus=='0' }">
    		<strong>状态:</strong><font style="color: red;" id="shouStauts">${gpsShou.status=='0'?'正常':'误报'}</font>
    	</c:if>
    	
    	<i class="icon-headphones" onclick="callphone('${gpsShou.clientuserId}')"></i><br/>
    </c:forEach>
     <h4><b>操作:</b></h4>
      <ul style="list-style-type: none;">
     	<li>
     		<div class="control-group success"><input type="text" value="" placeholder="请输入正确的号码" id="telePhone"></div>
     		<button class="btn btn-sm btn-primary" style="width: 80px;" onclick="callphone('boda')">拨号</button>
     		<button class="btn btn-sm btn-primary" onclick="goPhoneRecord()">电话记录</button>
     	</li>
     </ul>
     
	   <h5><b>险情推送:</b></h5>
	    <ul style="list-style-type: none; ">
     	<li >
     		<button class="btn btn-mini btn-primary" onclick="javascript:alert('推送失败!');">110推送</button>&nbsp;&nbsp;
     		<button class="btn btn-mini btn-primary" onclick="YMWorkOrder()">120推送</button>&nbsp;&nbsp;
     		<button class="btn btn-mini btn-primary" onclick="javascript:alert('推送失败!');">志愿者</button>&nbsp;&nbsp;
     		<h5><b></b></h5>
     	<button  name="sendSmsBotton" class="btn btn-mini btn-primary" title="【法视云综合救援】xxx您好！秒帮用户xxx（当事人姓名），在xxx于xxx附近发出了紧急求救报险信息。
	  已与您多次联系未果，请您在收到短信后及时查看处理。" onclick="sendMessage('1');">短信一</button>&nbsp;&nbsp;
     		<button  name="sendSmsBotton" class="btn btn-mini btn-primary" onclick="sendMessage('2');" title="【法视云综合救援】xxx您好！秒帮用户xxx，在xxx于xxx附近发出了紧急求救报险信息。
	 我们已向110和120报警处理。已与您多次联系未果，请您在收到短信后及时查看处理。">短信二</button>
     	</li>
     </ul>
	   <h5><b>案情跟进:</b></h5>
	    <%-- <ul style="list-style-type: none; ">
     	<li >
    		<button class="btn btn-link" onclick="toPolice(${pd.id })">110报告</button>
    		<button class="btn btn-link" onclick="ymCallback(${pd.userId },${pd.id })">120报告</button>
     	</li>
     </ul> --%>
    
     <ul style="list-style-type: none; ">
     	<li >
     	<button style="cursor:pointer;" class="btn btn-sm btn-success"	onclick="caseDetails(${pd.id })">
	    		 案情跟进
     			</button>
     	
     	<button style="cursor:pointer;" class="btn btn-sm btn-warning"	onclick="handleComplete('3')">
	    		 受理完成
     			</button>
    	 <button style="cursor:pointer;" class="btn btn-sm btn-danger" onclick="handleComplete('2')">
	    		 结案
     	</button>
  	</li>
     </ul>
    </td>
  </tr>
  <!-- 图片翻页 -->
  <tr>
  
  	<td style=" height: 25px;">第<input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onkeydown="photoKeyDown(event);" style="width:20px"  id="photoCurrentPage" value="1">个/共<span id="photoCountPage">${photoCount }</span>个<br/><button style="width: 157px" class="btn btn-sm btn-primary"  onclick="photoFunction('+');">上一张图片</button><div style="float: right;"><button style="width: 157px" class="btn btn-sm btn-primary" onclick="photoFunction('-');">下一张图片</button></div></td>
  
  </tr>
  <!-- 音频 -->
  <tr>
  	<td style=" height: 100px;">
  		<audio id="audioId" name="audioName" style="width: 100%;height: 100%" controls="controls" title="${gpsUploadMp3.upload_title }" src="<%=resourcePaht%>${gpsUploadMp3.upload_url }">音频</audio>
  	</td>
  </tr>
  <tr>
  <!-- 音频翻页 -->
  	<td style=" height: 25px;">第<input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onkeydown="audioKeyDown(event);" style="width:20px" id="audioCurrentPage" value="1">个/共<span id="audioCountPage">${audioCount }</span>个<br/><button style="width: 157px" class="btn btn-sm btn-primary" onclick="audioFunction('+');">上一个音频</button><div style="float: right;"><button style="width: 157px" class="btn btn-sm btn-primary" onclick="audioFunction('-');">下一个音频</button></div></td>
  	<!-- 视频翻页 -->
  	<td style=" height: 25px;">第<input onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onkeydown="videoKeyDown(event);" style="width:20px" id="videoCurrentPage" value="1">个/共<span id="videoCountPage">${videoCount }</span>个<br/><button class="btn btn-sm btn-primary" style="width: 210px" onclick="videoFunction('+');">上一个视频</button><div style="float: right;"><button style="width: 157px" class="btn btn-sm btn-primary" onclick="videoFunction('-');">下一个视频</button></div></td>
  </tr>
  <tr style="height: 50px;">
   <td colspan="2">
	    <input type="hidden" value="${pd.id }" name ="Gps_info_id" id="Gps_info_id">
	    <input type="hidden" name="emergencyShouXinRen" value="${fn:split(pd.sms_contact,'@')[0]}">
	    	<span style="margin-top: 20px;">工作描述:<input style="width: 540px;" name="accepted_description" id="work_describe"></input></span>
	    <div style="float: right; "><button style="text-align: right;" class="btn btn-sm btn-primary" onclick="confirmWorkDescribe()">提交</button>
	    	<button style="text-align: right;" class="btn btn-sm btn-primary" onclick="getWorkDescribe()">描述记录</button>
	    	<button style="text-align: right;" class="btn btn-sm btn-primary" onclick="getWorkExchage()">交接</button></div>
    </td>
  </tr>
  
  <div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><br/><img src="static/images/jiazai.gif" /><br/><h4 class="lighter block green">修改中...</h4></div>
</table>


<!-- 地图 -->
<div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:1200px;height:600px;margin-left: -600px;">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">地图查看</h3>
  </div>
  <div class="modal-body">
    <div id="allmap1" style="width:1150px;height:500px;"></div>
  </div>
</div>

<!-- 视频 -->
<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="width:1200px;height:600px;margin-left: -600px;">
  <div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
    <h3 id="myModalLabel">视频查看</h3>
  </div>
  <div class="modal-body">
    <div id="videottt" style="width:1150px;height:500px;"></div>
  </div>

</div>


	
	<input type="hidden" id="channelId" value="${pd.channelId }">
	<input type="hidden" id="userId" value="${pd.userId }">
	<input type="hidden" id="gpsInfoId" value="${pd.id }">
	<input type="hidden" id="gpsAddrMap" value="${gpsAddrMap }">
	<input type="hidden" id="sms_contact" value="${pd.sms_contact }">
	<input type="hidden" id="phoneType" value="${phoneType }">
	<input type="hidden" id="subSysName" value="${subSysName }">
	
<!-- 引入 -->
<!--[if !IE]> -->
<script type="text/javascript">
	window.jQuery || document.write("<script src='static/assets/js/jquery.js'>"+"<"+"/script>");
</script>
<!-- <![endif]-->
<!--[if IE]>
<script type="text/javascript">
 	window.jQuery || document.write("<script src='static/assets/js/jquery1x.js'>"+"<"+"/script>");
</script>
<![endif]-->
<script src="static/js/bootstrap.min.js"></script>
<!-- ace scripts -->
<script src="static/assets/js/ace/elements.fileinput.js"></script>
<script src="static/assets/js/ace/ace.js"></script>
<script type="text/javascript">
	$(top.hangge());
	
	//去电话记录页面
	function goPhoneRecord(){
		 top.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="电话纪录";
		 diag.URL = '${pageContext.request.contextPath}/accept/goPhoneRecord?gpsInfoId='+$("#gpsInfoId").val();
		 diag.Width = 1000;
		 diag.Height = 500;
		 diag.CancelEvent = function(){ //关闭事件
		//	 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				// nextPage(${page.currentPage});
		//	}
			diag.close();
		 };
		 diag.show();
	}
	
	
	//案情跟进
	function caseDetails(gps_info_id) {
		top.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="警务系统";
		 diag.URL = '${pageContext.request.contextPath}/accept/goCaseDetails?gps_info_id ='+gps_info_id;
		 diag.Width = 1500;
		 diag.Height = 600;
		 diag.CancelEvent = function(){ //关闭事件
		//	 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				// nextPage(${page.currentPage});
		//	}
			diag.close();
		 };
		 diag.show();
		 
	}
	
	//去处理/受理完成页面
	function getWorkDescribe(){
		top.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="描述记录";
		 diag.URL = '${pageContext.request.contextPath}/accept/getWorkDescribe?gpsInfoId='+$("#gpsInfoId").val();
		 diag.Width = 1000;
		 diag.Height = 800;
		 diag.CancelEvent = function(){ //关闭事件
		//	 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				// nextPage(${page.currentPage});
		//	}
			diag.close();
		 };
		 diag.show();
	};
	
	var str = "姓名:"+$("#testname").html()+",性别:"+$("#testsex").html()+",电话:"+$("#testphone").html()+",时间:"+$("#testtime").html()+",位置:"+$("#newAddr").html()+",身份证:"+$("#testid").html()+",紧急联系人:"+$("#testsms").html();
	
	function kaiguan(id,deviceNo){
		var url = '<%=basePath%>appClient/androidPushMsg.do?type='+id+'&deviceNo='+deviceNo;
		var args = {};
		$.post(url,args,function(data){
			alert(data.msg);
		});
		
	};
	
			var iframe = document.getElementById("iframid");
		    iframe.src="<%=request.getContextPath()%>/edb_bar/phoneBar/phonebar.html?loginName=${subAccount}&loginPass=${subAccountPass}&loginType=${phoneType}&status=0";
		    if (iframe.attachEvent){
		        iframe.attachEvent("onload", function(){
		         });
		    }else{
		        iframe.onload = function(){
		        };
		    }
	
	
</script>
<script type="text/javascript">

function callphone(phone){
		if(phone == 'boda'){
			phone = $("#telePhone").val();
		}
		if(phone.indexOf("-")>0){
			phone=phone.split("-")[1];
		}else{
			phone = phone;
		}
		if(phone ==''){
			alert('请输入正确号码');
			return false;
		}
		window.frames[0].document.getElementById("gpsinfoid").value = ${pd.id };
		window.frames[0].document.getElementById("username").value = ${subAccount };
		window.frames[0].document.getElementById("icallcenter.dialout.input").value = phone;
		window.frames[0].document.getElementById("DialEnable").click();
		
}
	
	
	//外呼电话
	$(document).on("click",".waihu",function(event){
		event.preventDefault();
		var upid = $("#alltest").val(); 
		if($(".waihuInput").val() == "") {
			alert("请输入外呼电话!");
			return;
		};
		window.frames[0].document.getElementById("gpsinfoid").value = servicetest;
		  window.frames[0].document.getElementById("username").value = phoneAccount;
		window.frames[0].document.getElementById("icallcenter.dialout.input").value  = $(".waihuInput").val();
		window.frames[0].document.getElementById("DialEnable").click();
	});
	//挂机
	$(document).on("click",".guaji",function(){
		window.frames[0].document.getElementById("HangupDisable").click();
		window.frames[0].document.getElementById("HangupEnable").click();
	});


</script>

<!-- 地图方法区 -->
<script type="text/javascript">
//时间格式化
	/* 
		调用： 
			var time1 = new Date().Format("yyyy-MM-dd");
			var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");  
	*/
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "HH+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	};
	
	//获取最新地址
	function getNewAddrAndResourceCount(id,phone){
		location.reload();
		$(this).attr("style","readonly");

	}
	
	$(function() {
		//定位集合
		var gpsAddrMap = eval('('+$("#gpsAddrMap").val()+')');
		if(gpsAddrMap.length == 0) {
			//如果没有定位默认定位到北京
		var map = new BMap.Map("allmap");    // 创建Map实例
		var point = new BMap.Point(116.404, 39.915) //坐标
		map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
/* 		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件 */
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
		}else {
			//初始化map
			createMap(gpsAddrMap);
		};
		
		
	});
	createMap = function(gpsAddrMap) {
		//地图
		
		var map = new BMap.Map("allmap");            // 创建Map实例
		var mPoint = new BMap.Point(gpsAddrMap[0].gps_dimension,gpsAddrMap[0].gps_latitude);  
		map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	 
		map.enableScrollWheelZoom();
		map.centerAndZoom(mPoint,15);
		
		var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
	    map.addOverlay(circle);
	    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});  
	    local.searchNearby('医院,公安局',mPoint,1000);	
		
		for(var i = gpsAddrMap.length-1 ; i>=0  ; i--) {
			map.addOverlay(createMark(i,gpsAddrMap.length,gpsAddrMap[i].gps_dimension,gpsAddrMap[i].gps_latitude,"地址：" + gpsAddrMap[i].gps_addr,"你在" + new Date(gpsAddrMap[i].gps_time).Format("yyyy-MM-dd HH:mm:ss")+ " 位于 "+gpsAddrMap[i].gps_addr));
			
			}
		}
		
	createMark = function(order,length,lng,lat, info_html,date){
		var pic = "";
		if(order == 0){
			pic = "static/img/end.png";
		}else if(order == (length-1)){
			pic = "static/img/start.png";
		}else{
			pic = "static/img/pin.png";
		}
		var icon = new BMap.Icon(pic, new BMap.Size(32, 32), {//是引用图标的名字以及大小，注意大小要一样
	    anchor: new BMap.Size(10, 30)//这句表示图片相对于所加的点的位置
		});
	    var _marker = new BMap.Marker(new BMap.Point(lng, lat),{
	    	    icon: icon
	    });
	    _marker.addEventListener("mouseover", function(e){
	        this.setTitle(info_html);
	    });
	    _marker.addEventListener("click", function(e){ 
	        this.openInfoWindow(new BMap.InfoWindow("<font style='font-size:13px;'>（"+Number(length-order+1)+"）经纬度: "+lng+","+lat+"</font><br><font style='font-size:13px;'>" + date + "</font>"));
	    });
	    return _marker;
	};	
</script>

<!-- 图片,音频,视频 上下页方法区 -->
<script type="text/javascript">
	
	
	/* 图片翻页方法 */
	function photoFunction(flag) {
		/* 图片翻页参数 */
		var photoCurrentNum=$("#photoCurrentPage").val();
		var photoEndNum=$("#photoCountPage").text();
		if(flag == "+") {
			photoCurrentNum--;
			if(photoCurrentNum > photoEndNum) {
				alert("请输入1~"+$("#photoCountPage").text()+"之间的整数!");
				return;
			}else if(photoCurrentNum < 1) {
				alert("已经是第一张!");
				photoCurrentNum=1;
				return;
			} 
			
			$.ajax({
				url : '<%=basePath%>accept/getPhotoResource',
				data : {'photoCurrentNum' : photoCurrentNum-1 ,
						'gpsInfoId' : $("#gpsInfoId").val()},
				success : function(data) {
					$("#photoCurrentPage").val(photoCurrentNum);
					$("#photoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
					$("#photoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
					$("#photoId").attr("title",data.upload_title);
				}
			});
		}else if(flag == "-"){
			if(photoCurrentNum == photoEndNum) {
				alert("已经是最后一张!");
				photoCurrentNum=photoEndNum;
				return;
			}
			photoCurrentNum++;
			if(photoCurrentNum > photoEndNum) {
				alert("请输入1~"+$("#photoCountPage").text()+"之间的整数!");
				return;
			}
			$.ajax({
				url : '<%=basePath%>accept/getPhotoResource',
				data : {'photoCurrentNum' : photoCurrentNum-1,
						'gpsInfoId' : $("#gpsInfoId").val()},
				success : function(data) {
					$("#photoCurrentPage").val(photoCurrentNum);
					$("#photoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
					$("#photoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
					$("#photoId").attr("title",data.upload_title);
				}
			});
		}
	}
	
	//图片跳转方法
	function photoKeyDown(event) {
		if(event.keyCode == 13) {
			if(+$("#photoCurrentPage").val() > +$("#photoCountPage").text()) {
				alert("请输入1~"+$("#photoCountPage").text()+"之间的整数!");
				return;
			}
			$.ajax({
				url : '<%=basePath%>accept/getPhotoResource',
				data : {'photoCurrentNum' : $("#photoCurrentPage").val()-1 ,
						'gpsInfoId' : $("#gpsInfoId").val()},
				success : function(data) {
 					photoCurrentNum = $("#photoCurrentPage").val();
					$("#photoCurrentPage").val($("#photoCurrentPage").val());
					$("#photoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
					$("#photoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
					$("#photoId").attr("title",data.upload_title);
				}
			});
		}
	}

	/* 视频翻页方法 */
	function videoFunction(flag) {
		/* 视频翻页参数 */
		var videoCurrentNum=$("#videoCurrentPage").val();
		var videoEndNum=$("#videoCountPage").text();
		if(flag == "+") {
			videoCurrentNum--;
			if(videoCurrentNum > videoEndNum) {
				alert("请输入1~"+$("#videoCountPage").text()+"之间的整数!");
				return;
			}else if(videoCurrentNum < 1) {
				alert("已经是第一个视频!");
				videoCurrentNum=1;
				return;
			} 
			
				$.ajax({
					url : '<%=basePath%>accept/getVideoResource',
					data : {'videoCurrentNum' : videoCurrentNum-1 ,
							'gpsInfoId' : $("#gpsInfoId").val()},
					success : function(data) {
						$("#videoCurrentPage").val(videoCurrentNum);
						$("#videoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
						$("#videoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
						$("#videoId").attr("title",data.upload_title);
					}
				});
			}else if(flag == "-"){
				if(videoCurrentNum == videoEndNum) {
					alert("已经是最后一个视频!");
					videoCurrentNum=videoEndNum;
					return;
				}
				videoCurrentNum++;
				if(videoCurrentNum > videoEndNum) {
					alert("请输入1~"+$("#videoCountPage").text()+"之间的整数!");
					return;
				}
				$.ajax({
					url : '<%=basePath%>accept/getVideoResource',
					data : {'videoCurrentNum' : videoCurrentNum-1,
							'gpsInfoId' : $("#gpsInfoId").val()},
					success : function(data) {
						$("#videoCurrentPage").val(videoCurrentNum);
						$("#videoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
						$("#videoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
						$("#videoId").attr("title",data.upload_title);
					}
				});
			}
	}
	
	function videoKeyDown(event) {
		if(event.keyCode == 13) {
			if(+$("#videoCurrentPage").val() > +$("#videoCountPage").text()) {
				alert("请输入1~"+$("#videoCountPage").text()+"之间的整数!");
				return;
			}
			$.ajax({
				url : '<%=basePath%>accept/getVideoResource',
				data : {'videoCurrentNum' : $("#videoCurrentPage").val()-1 ,
						'gpsInfoId' : $("#gpsInfoId").val()},
				success : function(data) {
					videoCurrentNum = $("#videoCurrentPage").val();
					$("#videoCurrentPage").val($("#videoCurrentPage").val());
					$("#videoCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
					$("#videoId").attr("src",'<%=resourcePaht%>'+data.upload_url);
					$("#videoId").attr("title",data.upload_title);
				}
			});
		}
	}

	/* 音频翻页方法 */
	function audioFunction(flag) {
		/* 音频翻页参数 */
		var audioCurrentNum=$("#audioCurrentPage").val();
		var audioEndNum=$("#audioCountPage").text();
		
		if(flag == "+") {
			audioCurrentNum--;
			if(audioCurrentNum > audioEndNum) {
				alert("请输入1~"+$("#audioCountPage").text()+"之间的整数!");
				return;
			}else if(audioCurrentNum < 1) {
				alert("已经是第一个音频!");
				audioCurrentNum=1;
				return;
			} 
			
				$.ajax({
					url : '<%=basePath%>accept/getAudioResource',
					data : {'audioCurrentNum' : audioCurrentNum-1 ,
							'gpsInfoId' : $("#gpsInfoId").val()},
					success : function(data) {
						$("#audioCurrentPage").val(audioCurrentNum);
						$("#audioCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
						$("#audioId").attr("src",'<%=resourcePaht%>'+data.upload_url);
						$("#audioId").attr("title",data.upload_title);
					}
				});
			}else if(flag == "-"){
				if(audioCurrentNum == audioEndNum) {
					alert("已经是最后一个音频!");
					audioCurrentNum=audioEndNum;
					return;
				}
				audioCurrentNum++;
				
				if(audioCurrentNum > audioEndNum) {
					alert("请输入1~"+$("#audioCountPage").text()+"之间的整数!");
					return;
				}
				$.ajax({
					url : '<%=basePath%>accept/getAudioResource',
					data : {'audioCurrentNum' : audioCurrentNum-1,
							'gpsInfoId' : $("#gpsInfoId").val()},
					success : function(data) {
						
						$("#audioCurrentPage").val(audioCurrentNum);
						$("#audioCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
						$("#audioId").attr("src",'<%=resourcePaht%>'+data.upload_url);
						$("#audioId").attr("title",data.upload_title);
					}
				});
			}
	}
	
	function audioKeyDown(event) {
		if(event.keyCode == 13) {
			if($("#audioCurrentPage").val() > $("#audioCountPage").text()) {
				alert("请输入1~"+$("#audioCountPage").text()+"之间的整数!");
				return;
			}
			$.ajax({
				url : '<%=basePath%>accept/getAudioResource',
				data : {'audioCurrentNum' : $("#audioCurrentPage").val()-1 ,
						'gpsInfoId' : $("#gpsInfoId").val()},
				success : function(data) {
					audioCurrentNum= $("#audioCurrentPage").val();
					$("#audioCurrentPage").val($("#audioCurrentPage").val());
					$("#audioCountPage").text(data.ftp_status);//因前端不需要此字段,所以ftp_status用作图片总数容器
					$("#audioId").attr("src",'<%=resourcePaht%>'+data.upload_url);
					$("#audioId").attr("title",data.upload_title);
				}
			});
		}
	}
	
	
</script>
<script type="text/javascript">

	//提交工作描述
	function confirmWorkDescribe() {
		var workDescribe = $("#work_describe").val();
		var gpsInfoId = $("#gpsInfoId").val();
		var userId = $("#userId").val();
		var account = ${subAccount};
		var sysUsername = $("#subSysName").val();
		var parameter = {"work_describe" : workDescribe ,
				"user_id" : userId ,
				"phone_account" : account ,
				"gpsInfoId" : gpsInfoId,
				"sysUsername" : sysUsername};
		if(workDescribe == "" || workDescribe.trim() == "") {
			alert("请填写工作描述!");
			return;
		}
		$.ajax({ 
			url : '<%= basePath%>accept/workDescribe' ,
			data : parameter,
			success : function(data) {
				if(data >0) {
					$("#work_describe").val("");
					alert("记录成功!");
				}
			}
			
		});
	}
	
	//交接
	function getWorkExchage() {
		var workDescribe = $("#work_describe").val();
		var gpsInfoId = $("#gpsInfoId").val();
		var userId = $("#userId").val();
		var account = ${subAccount};
		var sysUsername = $("#subSysName").val();
		var parameter = {"work_describe" : workDescribe ,
				"user_id" : userId ,
				"phone_account" : account ,
				"gpsInfoId" : gpsInfoId,
				"sysUsername" : sysUsername};
		if(workDescribe == "" || workDescribe.trim() == "") {
			alert("请填写工号");
			return;
		}
		$.ajax({ 
			url : '<%= basePath%>accept/getWorkExchage' ,
			data : parameter,
			success : function(data) {
				if(data >0) {
					$("#work_describe").val("");
					alert("记录成功!");
					top.Dialog.close();
				}else{
					alert("记录失败!");
				}
			}
			
		});
	}
	
	//发送短信
	function sendMessage(flag) {
		var contact = "";
		$("input:checked").each(function(i) {
			contact+=$(this).val()+"@";
		});
		if(contact == null || contact == "") {
			alert("请勾选受信人!");
			return;
		}
		$("button[name='sendSmsBotton']").attr("disabled","disabled");
		var username = '${pd.username }';
		var gpsAddrMap = eval('('+$("#gpsAddrMap").val()+')');
		var gpsTime = new Date(gpsAddrMap[gpsAddrMap.length-1].gps_time).Format("yyyy-MM-dd HH:mm:ss");
		var lastAddr = gpsAddrMap[gpsAddrMap.length-1].gps_addr; 
		 $.ajax({
			url : '<%=basePath%>accept/sendMessage',
			data : {'sms_contact' : contact,
					'flag' : flag,
					'username' : username ,
					'gpsTime' : gpsTime ,
					'lastAddr' : lastAddr },
			dataType: "json",
			type : "post",
			success : function (data) {
				alert(data.msg);
				$("button[name='sendSmsBotton']").removeAttr("disabled");
			}
		}); 
	}
	//处理完成OR受理完成
	function handleComplete(flag) {
		$.ajax({
			url :'<%=basePath%>accept/handleComplete',
			data : {'flag' : flag,
					'gpsInfoId' : $("#gpsInfoId").attr("value")},
			dataType : "text",
			success : function(data) {
				alert(data);
			}
		});
	}
	//关联
	function callBind() {
		var callPhone = window.frames[0].document.getElementById("icallcenter.dialout.input").value;
		var phoneAccount = ${subAccount}; 
		var gpsInfoId = $("#gpsInfoId").val();
		$.ajax({
			url : '<%=basePath%>accept/callPhone',
			data : {"callPhone" : callPhone,
				"gpsInfoId" : gpsInfoId,
				"phoneAccount":phoneAccount},
			success : function(data) {
				alert(data == 1 ? "关联成功!" : "关联失败!");
			}
		});
	}
	
	//远盟工单
	function YMWorkOrder() {
		var contact = "";
		$("input:checked").each(function(i) {
			contact+=$(this).val()+"@";
		});
		if(contact == null || contact == "") {
			alert("请勾选受信人!");
			return;
		}
		var shouName = contact.split("-")[0];
		var shouPhone = contact.split("-")[1];
		var name = '${pd.username }';
		var phone = '${pd.phone }';
		var idCard = '${pd.id_card }';
		var time = '${pd.call_time }';
		var deviceNo = '${pd.deviceNo }';
		var deviceType = '${pd.type }';
		var gpsinfoId = $("#gpsInfoId").val();
		var userId = $("#userId").val();
		
		var data = {"accidentTriggerTime":time,"terminalId":deviceNo,"name":name,
				"phone":phone,"certificateNumber":idCard,"emergencyContactPerson":shouName,
				"emergencyContact":shouPhone,"gps_info_id":gpsinfoId,"deviceType":deviceType,"extenalId":userId}
		$.ajax({
			url : '<%=basePath%>YMController/YMWorkOrder',
			data :data,
			type : "Post",
			success : function(data) {
				alert(data.result);
			}
		});
	}
	
	//远盟回执
	function ymCallback(user_id,gps_info_id) {
		top.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="远盟回执";
		 diag.URL = '${pageContext.request.contextPath}/YMController/ymCallback?user_id='+user_id+'&gps_info_id='+gps_info_id;
		 diag.Width = 1000;
		 diag.Height = 800;
		 diag.CancelEvent = function(){ //关闭事件
		//	 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				// nextPage(${page.currentPage});
		//	}
			diag.close();
		 };
		 diag.show();
		 
	}
	
	//警务系统
	function toPolice(gps_info_id) {
		top.jzts();
		 var diag = new top.Dialog();
		 diag.Drag=true;
		 diag.Title ="警务系统";
		 diag.URL = '${pageContext.request.contextPath}/accept/toPolice?gps_info_id='+gps_info_id+'&pageStauts='+${pd.pageStatus};
		 diag.Width = 1000;
		 diag.Height = 600;
		 diag.CancelEvent = function(){ //关闭事件
		//	 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				// nextPage(${page.currentPage});
		//	}
			diag.close();
		 };
		 diag.show();
		 
	}
	
	//图片翻转
	var current = 0;
    document.getElementById('photoId').onclick = function(){
     
        current = (current+90)%360;
     
        this.style.transform = 'rotate('+current+'deg)';
    };
    
    //图片加载失败时显示此图片
   	function photoFail() {
   		$("#photoId").attr("src","static/tubiao/nophoto.png");
   	}
   	
   	
   	function showfull(){
    		var gpsAddrMap = eval('('+$("#gpsAddrMap").val()+')');
		if(gpsAddrMap.length == 0) {
			//如果没有定位默认定位到北京
		var map = new BMap.Map("allmap1");    // 创建Map实例
		var point = new BMap.Point(116.404, 39.915) //坐标
		map.centerAndZoom(point, 15);  // 初始化地图,设置中心点坐标和地图级别
/* 		map.addControl(new BMap.MapTypeControl());   //添加地图类型控件 */
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));
		}else {
			//初始化map
			createMap1(gpsAddrMap);
		};
   	}
    
    createMap1 = function(gpsAddrMap) {
		//地图
		
		var map = new BMap.Map("allmap1");  // 创建Map实例
		var mPoint = new BMap.Point(gpsAddrMap[0].gps_dimension,gpsAddrMap[0].gps_latitude);  
		map.addControl(new BMap.MapTypeControl({
		mapTypes:[
            BMAP_NORMAL_MAP,
            BMAP_HYBRID_MAP
        ]}));	 
		map.enableScrollWheelZoom();
		map.centerAndZoom(mPoint,15);
		
		var circle = new BMap.Circle(mPoint,1000,{fillColor:"blue", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});
	    map.addOverlay(circle);
	    var local =  new BMap.LocalSearch(map, {renderOptions: {map: map, autoViewport: false}});  
	    local.searchNearby('医院,公安局',mPoint,1000);	
		
		for(var i = gpsAddrMap.length-1 ; i>=0  ; i--) {
			map.addOverlay(createMark(i,gpsAddrMap.length,gpsAddrMap[i].gps_dimension,gpsAddrMap[i].gps_latitude,"地址：" + gpsAddrMap[i].gps_addr,"你在" + new Date(gpsAddrMap[i].gps_time).Format("yyyy-MM-dd HH:mm:ss")+ " 位于 "+gpsAddrMap[i].gps_addr));
			
			}
		};
		
		function showVideo(){
			$("#myModal1").modal();
			$("#videoId").trigger("pause");
			$("#videottt").html("<video id='videoId11' name='videoName' style='width: 100%;height: 100%; margin: 0px;' title='' src='"+$("#videoId").attr("src")+"' controls='controls' autoplay='autoplay'>不支持此类型视频</video>");
			
		};
</script>
</body>
</html>