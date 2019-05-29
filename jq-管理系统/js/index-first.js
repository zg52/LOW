
//			juese = JSON.parse(localStorage.getItem('juese'));
//			console.log(juese)
//			console.log(juese.cmenu)
//			console.log
//			
//			var str = "<ul class="nav nav-second-level">"
//				 str +="<li class="baoxian">" + "<a class="J_menuItem" href="risk.html?type=1">" +  +"</a>" + "</li>"
//				 str +="<li>" + "<a class="J_menuItem" href="risk.html?type=2">" +  +"</a>" + "</li>"
//				 str +="<li>" + "<a class="J_menuItem" href="risk.html?type=3">" +  +"</a>" + "</li>"
//				 str +="<li>" + "<a class="J_menuItem" href="sign_manage.html">" +  +"</a>" + "</li>"
//				 str += "</ul>";
//				 $('#rescue').append(str);
			
			$(function() {
				var number = localStorage.getItem("number");
				var phonePass = localStorage.getItem("phonePass");
				var phoneType = localStorage.getItem("phoneType");
				var tag1 = null;
				var tag = "<iframe src=\"phonebar.html?loginName=" + number + "&password=" + phonePass + "&loginType=" + phoneType + "\" frameborder=\"0\" class=\"xin-f\"></iframe>"
				console.log($('#aaaa'))

				console.log($("iframe"))
				console.log(number);
				console.log(phonePass)
				console.log(phoneType);
			}); 

			//		 var maxtime = 5 * 30;  
			//		 var maxtime = 1 * 10;  
			//    function CountDown() {
			//      if (maxtime >= 0) {
			//        minutes = Math.floor(maxtime / 60);
			//        seconds = Math.floor(maxtime % 60);
			//        msg = "倒计时" + minutes + "分" + seconds + "秒";
			//        document.all["timer"].innerHTML = msg;
			////        if (maxtime == 2 * 30)alert("距离结束仅剩5分钟");
			//          --maxtime;
			//      } else{
			//        clearInterval(timer);
			//        alert("已受理150秒,是否联系受理人");
			//      }
			//    }
			//    timer = setInterval("CountDown()", 1000);  

			function test() {
//				alert("abc");
			}
			//登出接口
			$('.logouts').click(function() {
				var baseURL = 'http://47.104.135.224:8080'
				$.ajax({
					type: 'delete',
					url: baseURL + '/sys/logout',
					crossDomain: true,
					xhrFields: {
						withCredentials: true
					},
					data: {},
					success: function(res) {
						console.log(res);
						window.location.href = "login.html";
					},
					error: function(error) {}
				});
			})

			//工作记录
			$('#tab_select').change(function(){
				 
				let val = $(this).val();
				let search = $('#tab-val').val();
				
				$("#workrecord-table").bootstrapTable('refresh',{
					url:`${baseURL}/log/record/15652/${val}`,
		    		query:{search:search}
		    	});
			})
			//工作记录中的搜索
			$('#tab-button').click(function(){
				let search = $('#tab-val').val();
				
				$("#workrecord-table").bootstrapTable('refresh',{
					url:`${baseURL}/log/record/15652`,
		    		query:{search:search}
		    	});
			});
				//工作记录接口
			$('.workrecord').click(function() {
				//点击这里弹窗  
				$('.tab_a').show();
				$('.tab_bg').show();

				let gpsInfoId = 15652;
				
				$("#workrecord-table").bootstrapTable({
					dataType: "json",
					method: 'get',
					contentType: "application/x-www-form-urlencoded",
					cache: false,
					url:`${baseURL}/log/record/15652`,
					ajaxOptions: {
						crossDomain: true,
						xhrFields: {
							withCredentials: true
						},
					},
					queryParams: function (params) {
						return {
							pageNum: params.offset / params.limit +1,
							size: params.limit,
							search:''
						}
					},
					
					pagination: true,
					sidePagination: 'server',
					pageNumber: 1,
					pageSize: 10,
					pageList: [10],
					onLoadSuccess: function (data) {
						data.rows = data.list//数据
						$("#workrecord-table").bootstrapTable("load", data)
					
						console.log(data)
					
					},
					columns: [{
						title: '时间',
						field: 'createtime'
					},{
						title: '电话',
						field: 'phone'
					},{
						title: '客服名字',
						field: 'sysname'
					},{
						title: '内容',
						field: 'log_content'
					},{
						title: '处理类型',
						field: 'type'
					},{
						title: '状态',
						field: 'status'
					}]
				})
			});
				
			$('.delete_x').click(function() {
				$('.tab_a').hide();
				$('.tab_bg').hide();
			})
			
			//提交接口
			$('#Handover').on('click',function(){
				let _this = $(this)
				if(!_this.siblings('.j-Handover-list').is(':visible')){
					console.log('9-----------------')
					$.ajax({
						type:"get",
						url:"http://47.104.135.224:8080/risk/onlinesysuser",
						async:true,
						crossDomain: true,
					    xhrFields: {
					      withCredentials: true
					    },
						success(res){
							let html = '';
							for(let i of res){
								html +=`<div class="audio-list-item">
											<div class="list-name j-handover-name" onclick="javascript:hidename();" data-id="${i.user_id}" data-name="${i.name}">${i.name}</div>					
										</div>`
								
							}
							_this.siblings('.j-Handover-list').html(html);
						}
					});
				}
				_this.siblings('.j-Handover-list').toggle(500);
			});
			$('.j-Handover-list').on('click','.j-handover-name',function(){
				$(this).addClass('active').siblings().removeClass('active');
				let name = $(this).data('name');
				let id = $(this).data('id');
				console.log(name,id)
				$.ajax({
					type:"PUT",
					url:`http://47.104.135.224:8080/risk/transfer/2567/${id}/${name}`,
					dataType : "json" ,
					async:true,
					crossDomain: true,
				    xhrFields: {
				      withCredentials: true
				    },
					success(res){
						
					}
				});
			})
			console.log(window.showModalData)
			// 头像
			$(".user-photo").on({
				click: function(e) {
					if(e && e.stopPropagation) {
						e.stopPropagation();
					} else {
						(event || window.event).cancelBubble = true;
					}
					alert("切换头像")
				}
			})

			// 初始化地图  加那个  
			function initMap(x, y, type, local) {
				//alert("初始化地图");

				// 创建地图  这样写吗
				var map = new BMap.Map("dituContent");
				var mPoint = new BMap.Point(116.404, 39.915);
				map.enableScrollWheelZoom();
				map.centerAndZoom(mPoint, 14);
				var circle = new BMap.Circle(mPoint, 1000, {
					fillColor: "#b9d3f4",
					strokeWeight: 1,
					fillOpacity: 0.5,
					strokeOpacity: 0.3
				});
				map.addOverlay(circle);
				var local = new BMap.LocalSearch(map, {
					renderOptions: {
						map: map,
						autoViewport: false
					}
				});
				local.searchNearby('餐馆', mPoint, 1000);
				// 定义一个控件类，即function    
				function ZoomControl() {
					// 设置默认停靠位置和偏移量 
					this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
					this.defaultOffset = new BMap.Size(10, 10);
				}
				// 通过JavaScript的prototype属性继承于BMap.Control   
				ZoomControl.prototype = new BMap.Control();
				// 自定义控件必须实现initialize方法，并且将控件的DOM元素返回   
				// 在本方法中创建个div元素作为控件的容器，并将其添加到地图容器中   
				ZoomControl.prototype.initialize = function(map) {
					// 创建一个DOM元素   
					var div = document.createElement("div");
					// 添加图标
					var text = "+";
					div.appendChild(document.createTextNode(text));

					// 设置样式    
					div.style.cursor = "pointer";
					div.style.color = "white";
					div.style.fontSize = "20px";
					div.style.height = "30px";
					div.style.width = "30px";
					div.style.opacity = "0.6";
					div.style.textAlign = "center";
					div.style.border = "1px solid #3987ec";
					div.style.backgroundColor = "#3987ec";
					// 绑定事件
					div.onclick = function(e) {
						// 地图容器的父元素row
						var _div = $(map.getContainer()).parents(".map-con");
						if(text == "+") { // 隐藏其余部分，充满右边
							// col-sm-8的宽度只有8/12，想要充满右半边，需要将宽度写为100%
							_div.children(".map-parent").css({
								width: "100%"
							});
							// 将地图容器的高度充满，并且隐藏其余部分
							$(map.getContainer()).css("height", "672px");
							_div.siblings(".row").addClass("none");
							_div.children(".desc-record").addClass("none");

							// 将加号变为减号
							text = "-";
							div.innerHTML = "";
							div.appendChild(document.createTextNode(text));
						} else { // 还原
							_div.children(".col-sm-8").css({
								width: "66.66666667%"
							});
							// 将地图容器的高度充满，并且隐藏其余部分
							$(map.getContainer()).css("height", "332px");
							_div.siblings(".row").removeClass("none");
							_div.children(".desc-record").removeClass("none");

							// 将加号变为减号
							text = "+";
							div.innerHTML = "";
							div.appendChild(document.createTextNode(text));
						}
					}

					// 添加DOM元素到地图中   
					map.getContainer().appendChild(div);
					// 将DOM元素返回  
					return div;
				}
				// 创建控件实例    
				var myZoomCtrl = new ZoomControl();
				// 添加到地图当中    
				map.addControl(myZoomCtrl);
			}

			// 点击相应的推送变色
			$("ul.prop-list li").on({
				click: function() {
					// 如果当前元素已经变色，再点击无效
					// if ($(this).hasClass("cur")) return;
					$(this).addClass("cur").siblings().removeClass("cur");
					//					alert("点击事件");
				}
			});

			$('#riskModal').on('show.bs.modal', function(event) {
				//				alert("弹框出现时的方法")
				var button = $(event.relatedTarget); // 触发的按钮或链接
				var recipient = button.data('whatever');
				var modal = $(this); // 获取到当前弹框实例
			});

			// 弹框关闭时的方法  
			$('#riskModal').on('hide.bs.modal', function() {
				
				$(".border-bottom11").empty()
				$(".xin-e").empty()
				var number = localStorage.getItem("number")
				var phonePass = localStorage.getItem("phonePass")
				var phoneType = localStorage.getItem("phoneType")
				var tag = "<iframe src=\"phonebar.html?loginName=" + number + "&password=" + phonePass + "&loginType=" + phoneType + "\" frameborder=\"0\" class=\"xin-f\"></iframe>"
				$(".border-bottom11").append(tag);
				
				
//				var baseURL = 'http://47.104.135.224:8080'
//				var urlObj = splitUrl();
//					
//					let url = '';
//					if (urlObj.type == 1) {
//						url = '/risk/acceptlist';
//					}else if(urlObj.type == 2){
//						url = '/risk/handlelist/2'
//					}else if(urlObj.type == 3){
//						url = '/risk/handlelist/3'
//					}						
//					console.log(url)
//				$("#exampleTableEvents").bootstrapTable('refresh',{
//	    		 	url:baseURL + url
//	    		});
				
			});
			
//			function splitUrl() {
//				//返回当前 URL 的查询部分（问号 ? 之后的部分）。
//				var urlParameters = location.search;
//	
//				//声明并初始化接收请求参数的对象
//				var requestParameters = new Object();
//				//如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
//				if (urlParameters.indexOf('?') != -1) {
//					//获取请求参数的字符串
//					var parameters = decodeURI(urlParameters.substr(1));
//					//将请求的参数以&分割中字符串数组
//					parameterArray = parameters.split('&');
//					//循环遍历，将请求的参数封装到请求参数的对象之中
//					for (var i = 0; i < parameterArray.length; i++) {
//						requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
//					}
//					console.info('theRequest is =====', requestParameters);
//				} else {
//					console.info('There is no request parameters');
//				}
//				return requestParameters;
//			}
			// 图片每次旋转的角度 
			var deg = 0;
			// 图片点击旋转事件
			$(".img-slide").find("img").on({
				click: function() {
					deg += 90;
					this.style.transform = "rotate(" + deg + "deg)";
				}
			});
			// 图片左右切换事件,当切换完成时，旋转角度清0
			$('#carousel1').on('slid.bs.carousel', function() {
				// 把所有的图片都旋转为0
				$.each($(".img-slide").find("img"), function(ind, val) {
					val.style.transform = "rotate(" + 0 + "deg)";
				});
				deg = 0;
			});

			// 视频播放事件
			$(".video_bg").on({
				click: function() {
					// 去掉遮罩 播放当前视频
					$(this).addClass("none").siblings(".carousel").removeClass("none").find(".active video")[0].play();
				}
			});
			// 视频左右切换事件,当切换完成时，播放视频
			$('#carousel2').on('slid.bs.carousel', function() {
				// 左右切换完成时，播放当前视频
				$(this).find(".active video")[0].play();
			});
			// 弹框出现时的方法
			$('#userInfoModal').on('show.bs.modal', function(event) {
				//				alert("弹框出现时的方法")
				var button = $(event.relatedTarget); // 触发的按钮或链接
				var recipient = button.data('whatever');
				var modal = $(this); // 获取到当前弹框实例
			});
			// 弹框关闭时的方法
			$('#userInfoModal').on('hide.bs.modal', function() {
				//				alert("触发了弹框关闭时的方法");
			});

			// 查看弹框的确定方法
			$('#userInfoModal .save').on({
				click: function(event) {
					// var button = $(event.relatedTarget) // 触发事件的按钮  
					// var recipient = button.data('whatever') // 解析出data-whatever内容
					//					alert("触发了确定方法");
					$('#userInfoModal').modal('hide'); // model隐藏
				}
			});