// var baseURL = 'http://172.16.255.118:8080' //本地
var baseURL = 'http://47.104.135.224:8080' //服务器
var HttpUrl = 'http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com';
// 位置接口
function getWeizhi(data) {
  $.ajax({
    url: baseURL + '/risk/detils/l/' + data.gpsinfoId,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: {
//    pageNum: data.pageNum
    },
    success(res) {
      data.callback(res)
     	console.log(res)
    }
  })
}
//地图
function getMap(data) {
  $.ajax({
    url: baseURL + '/risk/detils/l/' + 15652,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: {},
    success: function(res) {
     	console.log(res)
     	
     	
    }
  })
}






//图片
function getImg(data){
	$.ajax({
    url: baseURL + '/risk/detils/p/' + 15811,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: {
      pageNum: data
    },
    success : function(res) {
    	if(res.list == ''){
    		win.$('#img-dispaly').css("display","block")
    	}
//  	console.log(res.list)
    	win.$('#imgId').empty();
    	pageNum = res.pageNum;
    	pages = res.pages;
    	img = res.list;
    	total = res.total;
    	imgTag(img[0].upload_url,img[0].upload_date);
    	imgIndex = 0; 
	    	var imgTotal =`第<input id="img-put" class="tz_b" type="text" style="cursor: pointer;"/>个/共<span>` + total + `</span>个`				
						win.$('#img-total').html(imgTotal);
						
					win.$('#img-put').keyup(function(event){
     				if(event.keyCode == 13){
     					//获取input值
     					var num = Number(win.$('.tz_b').val());
//   					console.log(num)
     					//不是数组或者是0空都为fales
     					if(!isNaN(num) && num){
     						//是否超出最大长度
     						if( num <= res.list.length){
//   							console.log(res.list[num - 1].upload_date)
     							win.$('#img-puts').attr('src', HttpUrl + res.list[num - 1].upload_url); //改变url
     							win.$('#img-puts').attr('title',res.list[num - 1].upload_date); //改变url
     							
     						}else{
     							alert("输入的数已经大于总数啦")
     						}
     						
     					}else{
     						alert("请输入整数")
     					}
     				}
     			})	
    }
  })
}
function imgClick(){
	win.$('.j-img-next').click(function(){
		let len = img.length;
		if(imgIndex >= len - 1) {
					++pageNum;
					if(pages >= pageNum) {
						getImg(pageNum);
						imgIndex = 0;
					} else {
						alert('已经是最后一个啦');
					}
				} else {
					imgIndex++;
					let singleImg = img[imgIndex];
					win.$('.vactives').attr("class", "vactive item")
					imgTag(singleImg.upload_url, singleImg.upload_date);
				}
	});
	win.$('.j-img-previous').click(function(){
				//设置第一张图片的索引值为0
				if(imgIndex <= 0) {
						--pageNum;
					if(pageNum > 0) {
						getImg(pageNum);
						imgIndex = 9;
						let singleImg = img[imgIndex];
						win.$('.vactives').attr("class", "vactive item")
						imgTag(singleImg.upload_url, singleImg.upload_date);
					} else {
						imgIndex=0;
						alert('已经是第一个啦');
					}
				} else {
					--imgIndex;
					let singleImg = img[imgIndex];
					win.$('.vactives').attr("class", "vactive item")
					imgTag(singleImg.upload_url, singleImg.upload_date);
				}
		});
}
function imgTag(upload_url,title,total){
	let imgTag ="<div class=\"item vactives vactives active tp-b\" style=\"margin-top: -40px;\">" +
								"<img title=\""+ title + "\" alt=\"image\" id=\"img-puts\" class=\"center-block\" src=\"http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com/"+upload_url+"\" style=\"width: 400px;height: 230px;\">" +
							"</div>"
							win.$('#imgId').append(imgTag);
}













//视频
function getVideo(data){
	$.ajax({
    url: baseURL + '/risk/detils/v/' + 15811,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: {
      pageNum: data
    },
    success : function(res) {
    	console.log(res)
    	if(res.list == ''){
    		win.$('#video-dispaly').css("display","block")
    	}
	    	win.$('#videoId').empty();
				 pages = res.pages;
				 pageNum = res.pageNum;
				 video = res.list;
				 total = res.total;
				 videoTag(video[0].upload_url,video[0].upload_date,total)
				 videoIndex = 0;
				 
				  var videoTotal = `第<input id="v-put" class="tz-ipt v-put" type="text" style="cursor: pointer;"/>个/共<span>` + total + `</span>个`     
		        win.$('#video-total').html(videoTotal)
		        //键盘事件
		        win.$('.v-put').keyup(function(event){
		        	if(event.keyCode == 13){
		        		
     					//获取input值
     					var num = Number(win.$('.tz-ipt').val());
//   					console.log(num)
     					//不是数组或者是0空都为fales
     					if(!isNaN(num) && num){
     						//是否超出最大长度
     						if( num <= res.list.length){
//   							console.log(res.list[num - 1].upload_date)
     							win.$('#v-puts').attr('src', HttpUrl + res.list[num - 1].upload_url); //改变url
     							win.$('#v-puts').attr('title',res.list[num - 1].upload_date); //改变url
     						}else{
     							alert("输入的数已经大于总数啦")
     						}
     						
     					}else{
     						alert("请输入整数")
     					}
     				
		        		
		        	}
		        })
		       
    }
 })
}
function videoClick() {
			win.$('.j-video-next').click(function() {
				//设置第一张图片的索引值为0len
				var len = video.length;
				if(videoIndex >= len - 1) {
					++pageNum;
					if(pages >= pageNum) {
						getVideo(pageNum);
						videoIndex = 0;
					} else {
						alert('已经是最后一个啦');
					}
				} else {
					videoIndex++;
					var singleVideo = video[videoIndex];
					win.$('.videoids').attr("class", "vactive item")
					videoTag(singleVideo.upload_url, singleVideo.upload_date);
				}
			});
			win.$('.j-video-previous').click(function() {
				//设置第一张图片的索引值为0  
				if(videoIndex <= 0) {  
						--pageNum;
					if(pageNum > 0) {
						getVideo(pageNum);
						videoIndex = 9;
						var singleVideo = video[videoIndex];
						win.$('.videoids').attr("class", "vactive item")
						videoTag(singleVideo.upload_url, singleVideo.upload_date);
					} else {
						videoIndex= 0;
						alert('已经是第一个啦');
					}
				} else {
					--videoIndex;
					var singleVideo = video[videoIndex];
					win.$('.videoids').attr("class", "vactive item")
					videoTag(singleVideo.upload_url, singleVideo.upload_date);
				}
			});
			}
	 function videoTag(upload_url,title) {
			 	var videoTag = "<div title=\""+title+"\" class=\"videoids vactive item active\" style=\"margin-top: -40px;\">"+
								"<video id=\"v-puts\" class=\"center-block\" controls style=\"height:289px;\"><source src=\"http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com/"+upload_url+"\"></video>"+
								"</div>"
	            win.$('#videoId').append(videoTag);
			 }
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 
	 //音频
function getAudio(data){
	$.ajax({
    url: baseURL + '/risk/detils/a/' + 15811,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    data: {
      pageNum: data
    },
    success: function(res) {
     	console.log(res)
     	pageNum = res.pageNum;
     	pages = res.pages;
     	audio = res.list;
			audio =res.list;
			total = res.total;
     	audioList(audio[0].upload_url,audio[0].upload_date);

     		//mp3长度
     	var Vlist = res.list.length;
     		console.log(Vlist)
     		//循环显示到页面
				for(var i =0 ;i < Vlist; i++){
					var audiotable =`<div class="v-list-name" title= "`+ res.list[i].upload_title +`">` +res.list[i].upload_date +
												`<audio class="j-exhibit-audio exhibit-audio j-audio-mp3" src="http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com/`+ res.list[i].upload_url +`"  controls="controls"></audio></div>`
							win.$('#v-list').append(audiotable)
				}
				
				//音频类表播放
     		var aud = win.$('.j-audio-list').find('.j-exhibit-audio');
				let audioListItem = win.$('.j-audio-list-item');
	     	win.$('.v-list-name').click(function(){
							//自身播放
							let audioExhibit = $(this).find('.j-exhibit-audio')[0];
						//判断点击的是否是新的
						if(audioExhibit.paused) {
							for(let i = 0; i < aud.length; i++) {
								aud[i].pause();
								aud[i].load();
							}
							audioExhibit.load();
							audioExhibit.play();
			
						} else {
							audioExhibit.pause();
						}
						$(this).addClass('active').siblings().removeClass('active');
	     	})
	     	
     	
     	//跳转
     	var audioTotal =`第<input id="a-put" class="a-put" type="text" style="width: 40px;height: 20px; cursor: pointer;" />个/共<span>` + total + `</span>个`
     			win.$('#audio-total').html(audioTotal)
     			
     			win.$('#a-put').keyup(function(event){
     				if(event.keyCode == 13){
     					//获取input值
     					var num = Number(win.$('.a-put').val());
     					console.log(num)
     					//不是数组或者是0空都为fales
     					if(!isNaN(num) && num){
     						//是否超出最大长度
     						if( num <= res.list.length){
     							console.log(res.list[num - 1].upload_date)
     							win.$('#audiolist').attr('src', HttpUrl + res.list[num - 1].upload_url); //改变url
     						}else{
     							alert("输入的数已经大于总数啦")
     						}
     						
     					}else{
     						alert("请输入整数")
     					}
     				}
     			})
    }
  })
}
function audioClick(){
	win.$('.j-audio-click').on('click', function(){
		win.$('.j-audio-lists').toggle(500);
	})
}
function audioList(upload_url){
	var audioTap =`<source src="http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com/`+upload_url +`">`
			win.$('#audiolist').append(audioTap)
}

// 获取受理人列表数据
function getAcceptlist(data) {
	//client_user_id当事人的id
	//	console.log(data);	
  $.ajax({
    url: baseURL + '/risk/detils/u/' + data.client_user_id,
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success(res) {
      data.callback(res)
    },
    error(err) {
      data.error && data.error(err)
    }
  })
}
// 短信1接口
function mes1(data) {
  $.ajax({
    url: baseURL + '/log/sms1/' + data.phone,
    type: 'post',
    contentType: 'application/json;charset=UTF-8',
    data: JSON.stringify(data.paramMap),
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success(res) {
      data.callback(res)
    },
    error(err) {
      data.error && data.error(err)
    }
  })
}
// 短信2接口
function mes2(data) {
  $.ajax({
    url: baseURL + '/log/sms2/' + data.phone,
    contentType: 'application/json;charset=UTF-8',
    type: 'post',
    data: JSON.stringify(data.paramMap),
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success(res) {
      data.callback(res)
    },
    error(err) {
      data.error && data.error(err)
    }
  })
}
//提交
function sum(data){
	$.ajax({
		type:"post",
		url: baseURL +'/log/' + data.gpsinfoId + '/' + data.type,
		contentType: 'application/json;charset=UTF-8',
		crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
		success(res) {
			data.Callbacks(res)
		},
		error(err) {
			data.error && data.error(err)
		}
	});
}

// 受理完成2，结案3

function shouli(data) {
	console.log(data);	
  $.ajax({
    url: baseURL + '/risk/status/' + data.gpsinfoId + '/' + data.status,
    type: 'put',
    contentType: 'application/json;charset=UTF-8',
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    success(res) {
      data.callback(res)
    },
    error(err) {
      data.error && data.error(err)
    }
  })
}



//function map(data){
//	console.log(data)
//	$.ajax({
//		type:"post",
//		url: baseURL +'/risk/detils/l/' + data.gpsinfoId,
//		contentType: 'application/json;charset=UTF-8',
//		crossDomain: true,
//  xhrFields: {
//    withCredentials: true
//  },
//		success(res) {
//			data.Callbacks(res)
//		},
//		error(err) {
//			data.error && data.error(err)
//		}
//	});
//}

