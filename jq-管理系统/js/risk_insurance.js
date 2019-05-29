
		//  首页
		$(function(){
			window.parent.$(".border-bottom11").empty();
			var number = localStorage.getItem("number")
			var phonePass = localStorage.getItem("phonePass")
			console.log(phoneType);
			var phoneType = localStorage.getItem("phoneType")
			var  tag = "<iframe id=\"aaaa\" src=\"phonebar.html?loginName="+number+"&password="+phonePass+"&loginType="+phoneType+"\" frameborder=\"0\" class=\"xin-f\"></iframe> "
				console.log(tag)
			$("#phone").append(tag)
			
				console.log(number); 
				console.log(phonePass)
			});
		
			
		function splitUrl() {
			//返回当前 URL 的查询部分（问号 ? 之后的部分）。
			var urlParameters = location.search;

			//声明并初始化接收请求参数的对象
			var requestParameters = new Object();
			//如果该求青中有请求的参数，则获取请求的参数，否则打印提示此请求没有请求的参数
			if (urlParameters.indexOf('?') != -1) {
				//获取请求参数的字符串
				var parameters = decodeURI(urlParameters.substr(1));
				//将请求的参数以&分割中字符串数组
				parameterArray = parameters.split('&');
				//循环遍历，将请求的参数封装到请求参数的对象之中
				for (var i = 0; i < parameterArray.length; i++) {
					requestParameters[parameterArray[i].split('=')[0]] = (parameterArray[i].split('=')[1]);
				}
				console.info('theRequest is =====', requestParameters);
			} else {
				console.info('There is no request parameters');
			}
			return requestParameters;
		}
		
		var urlObj = splitUrl();
		window.dataUrl = baseURL + '/risk/acceptlist',
		
		function ajaxHead(res) {
			console.log(res);
		}
		var url = null;
		
		$('.onquery').click(function(){
//			alert(1111111)
			let search=$('#value').val();
			if(search==""){
				alert('请填写查找内容');
				return;
			}
			let url = '';
			if (urlObj.type == 1) {
				url = '/risk/acceptlist';
			}else if(urlObj.type == 2){
				url = '/risk/handlelist/2'
			}else if(urlObj.type == 3){
				url = '/risk/handlelist/3'
			}			
			
			$("#exampleTableEvents").bootstrapTable('refresh',{
	    		 query:{search:search}
	    	});

		})
		
		if (urlObj.type == 1) {
			url = '/risk/acceptlist';
		}else if(urlObj.type == 2){
			url = '/risk/handlelist/2'
		}else if(urlObj.type == 3){
			url = '/risk/handlelist/3'
		}
			console.log(url)
			
		
			$("#exampleTableEvents").bootstrapTable({
				dataType: "json",
				method: 'get',
				contentType: "application/x-www-form-urlencoded",
				cache: false,
				url:baseURL + url,
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
					}
				},
				pagination: true,
				sidePagination: 'server',
				pageNumber: 1,
				pageSize: 10,
				pageList: [10],
				onLoadSuccess: function (data) {
					data.rows = data.list//数据
					$("#exampleTableEvents").bootstrapTable("load", data)
				
					$("tbody > tr").change(function() {
						window.frames[0].document.getElementById("gpsInfoId").value=$(this).children()[1].innerHTML
					})
				},
				columns: [{
					 checkbox: true	
				},{
					title: 'ID',
					field: 'id'
				}, {
					title: '真实姓名',
					field: 'username'
				}, {
					title: '当事人电话',
					field: 'phone'
				}, {
					title: '报险地址',
					field: 'gps_addr'
				}, {
					title: '报险时间',
					field: 'call_time'
				}, {
					title: '设备编号',
					field: 'phoneContect'
				}, {
					title: '设备类型',
					field: 'typename'
				}, {
					title: '处理人',
					field: 'name'
				}, {
					title: '操作',
					field: 'id',
					formatter: actionFormatter
				}]
			})
		
				//操作栏的格式化   
			function actionFormatter(value, row, index) {
				var result = "";
										//这里也是可以弹窗的  不知道为啥已换成你们的代码  就不行了
				result += "<a href='#' onclick='showModal(" + JSON.stringify(row) + ");' title='查看'><span class='c_f11 m-r-sm look'>查看</span></a>";
				result += "<a href='#' onclick='javascript:relation();' title='关联'><span class='c_333 m-r-sm'>关联</span></a>";
		//		result += "<a href='#' onclick='showModal(" + JSON.stringify(row) + ");' title='结案报告'><span class='c_11c997'>结案报告</span></a>";

				return result;
			}
			
			//关联
			function relation(){
				var number = localStorage.getItem("number")
				$.ajax({
    				type: 'put',
    				url:baseURL +'/risk/join/' + number +'/' + 18763417038 + '/' + 'gpsinfoId',
    				crossDomain: true,
    				xhrFields: {
					    withCredentials: true
					},
    				data:{
    				},
    				success: function(res) {
						console.log(res);
						alert('关联成功')
					},
					error: function(error) {
						alert('关联失败')
					}
    			});
			}

		var client_user_id = '';// client_user_id  当事人的id
		var gpsinfoId ='';//险情人的id
		var win = window.parent;
		function showModal(params) {  
			console.log(params)
			var _$modal = win.$('#riskModal');
			$("#phone").empty();
			win.$(".xin-e").empty()
			$(".myWylPhone").empty()
			var number = localStorage.getItem("number")
			var phonePass = localStorage.getItem("phonePass")
			var phoneType = localStorage.getItem("phoneType")
			var  tag = "<iframe src=\"phonebar.html?loginName="+number+"&password="+phonePass+"&loginType="+phoneType+"\" frameborder=\"0\" class=\"xin-f\"></iframe>"
//				console.log(tag)
			win.$(".xin-e").append(tag)
			
			gpsinfoId = params.id
			console.log(gpsinfoId)
			console.log(gpsinfoId)
			
			client_user_id = params.client_user_id;
			console.log(client_user_id)
			//根据身份证判断性别
			var str2 = params.id_card;
			var num = str2.charAt(16);
			win.$('#dangshiren').text(params.username)
			win.$('#xingbie').text(num%2 == 0 ? '女' : '男')
			win.$('#zhuangtai').text(params.status == 1 ? '正常' : '不正常')
			win.$('#dianhua').text(params.phone)
			win.$('#shebeima').text(params.phoneContect)
			win.$('#shebeileixing').text(params.typename)
			win.$('#shebeidianliang').text(params.device_power + '%')
			win.$('#shenfenzheng').text(params.id_card)
			win.$('#baoxiandizhi').text(params.gps_addr)
					
			getAcceptlist({
				client_user_id,
				callback(res){
					var shoulirenlist = '';
					for(var i=0;i<res.length;i++){
						shoulirenlist += `<div class="col-sm-12">
											<div class="row">
												<div class="col-sm-12">
													<!-- 需引用awesome-bootstrap-checkbox.css -->
													<div class="checkbox checkbox-inline">
														<label for="checkbox1"><input type="checkbox" value='${ JSON.stringify(res[i]) }' class="shouxinrencheckbox"> “第 ${ i+1 } 受信人” </label>
													</div>
												</div>
												<div class="col-sm-11 col-sm-offset-1 text-warning a_style">
													<span class="text-info m-r"> ${ res[i].acc_name }-${ res[i].acc_phone } </span>
													<span>状态:</span>
													<span class="text-info"> ${ res[i].status == 0 ? '正常' : '不正常' } </span>
													<a class="text-green" onclick="javascript:test();" title="拨号" style="font-size: 18px; margin-left: 5px">
				                                        <i class="fa fa-volume-control-phone"></i>
				                                    </a>
												</div>
											</div>
										</div>`
					}
					win.$('#shouxinren').html(shoulirenlist)
				},
				error(err){
					console.log(err)
				}
			})
			
			//点击受理完成. 结案返回受理界面
//			var oRiskModal = win.$('#riskModal');
//				oRiskModal.onclick = function(){
////					alert(1)
//				};
//			
			// 受理完成 // 结案
			win.$('#shoujiwancheng').click(function(){
				shouli({ 
					gpsinfoId:params.id,
					status:2,
					callback(res){
//						oRiskModal.click();	
//						alert('成功')
					}
				})
			})
			win.$('#jiean').click(function(){
				shouli({
					gpsinfoId:params.id,
					status:3,
					callback(res){
						alert('成功')
					}
				})
			})
			
			// 短信1
			win.$('#mes1').click(function(){
				var el = win.$('.shouxinrencheckbox:checked');
				var num = el.length;
				if(num == 0){
					alert('请选择一个受理人')
					return
				}
				for(var i = 0; i<el.length;i++){
					var val = JSON.parse(el.eq(i).val());
					mes1({
						phone:val.acc_phone,
						paramMap:{
							acceptName: val.acc_name,
							clientUsername:params.username,
							sysname:params.name,
							alermTime:params.call_time,
							gpsInfoId:params.id
						},
						callback(res){
							alert('发送成功');
						}
					})
				}
			})
			// 短信2
			win.$('#mes2').click(function(){
				var el = win.$('.shouxinrencheckbox:checked');
				var num = el.length;
				if(num == 0){
					alert('请选择一个受理人')
					return
				}
				for(var i = 0; i<el.length;i++){
					var val = JSON.parse(el.eq(i).val());
					mes2({
						phone:val.acc_phone,
						paramMap:{
							acceptName: val.acc_name,
							clientUsername:params.username,
							sysname:params.name,
							alermTime:params.call_time,
							gpsInfoId:params.id
						},
						callback(res){
							alert('发送成功');
						}
					})
				}
			})
			//提交 
			var baseURL = 'http://47.104.135.224:8080' 
			win.$('#sub').click(function(){
				var biaoshiVal = $(this).parents('.m-describe').siblings('#biaoshi').val();
					if(biaoshiVal == ''){
						alert('请填写提交内容')
					}
					let data = {						
						clientUsername:params.username,
						sysname:params.name,
						content:biaoshiVal
					}
					$.ajax({
						url: baseURL +'/log/' + gpsinfoId + '/' + 0,
						type:"POST",
						contentType: 'application/json;charset=UTF-8',
    					data: JSON.stringify(data),
    					crossDomain: true,
					    xhrFields: {
					      withCredentials: true
					    },
						success(res) {
							if(res){
								console.log(res)
							}
						}
					})
			});
			

			// 初始化地图
//			win.initMap(params.id, params.phoneContect, params.typename, params.gps_addr)
			
			// 弹框初始化 
			_$modal.modal('show');
			
			//调用借口    
			s(gpsinfoId);
			
		}
		
		function s(id){
				win.getFunAjax('/risk/detils/v/',id,1,'.j-video-total','.j-video-mp4','.j-video-input',win,'.j-video-next','.j-video-last')//视频
				win.getFunAjax('/risk/detils/a/',id,1,'.j-audio-total','.j-audio-mp3','.j-audio-input',win)//mp3		
				win.getFunAjax('/risk/detils/p/',id,1,'.j-img-total','.j-img-img','.j-img-input',win,'.j-img-next','.j-img-last'); //图片
				
				win.getAjax(id);
				win.initMaps();//创建和初始化地图
			}
		win.$('#shuaxin').click(function () {
			if (gpsinfoId) {
				s(gpsinfoId);
				getWeizhi({
					gpsinfoId: gpsinfoId,
					callback(res) {
						win.$('#baoxiandizhi').text(res[0].gps_addr);
						console.log(res);
					}
				})
			} else {
				alert('获取失败请重试')
			}
		})
		
		// 查看弹框的确定方法
		$('#viewModal .confirm').on({
			click: function (event) {
				// var button = $(event.relatedTarget) // 触发事件的按钮  
				// var recipient = button.data('whatever') // 解析出data-whatever内容
				alert("触发了确定方法");
				$('#resetModal').modal('hide'); // model隐藏
			}
		});