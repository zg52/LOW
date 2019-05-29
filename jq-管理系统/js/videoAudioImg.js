	let HttpUrl = 'http://8snf0ca1cc2m.d0o9w1n.t3re.miaosos.com';
	var baseURL = 'http://47.104.135.224:8080';
	var arrAjaxList = {
		v: [],
		a: [],
		p: []
	};

	function getFunAjax(url, id, pageNum, total, exhibit, input, win,next,last) {
		$.ajax({
			url: baseURL + url + id,
			crossDomain: true,
			xhrFields: {
				withCredentials: true
			},
			data: {
				pageNum: pageNum
			},
			success(res) {
				if(res) {
					let key = url.split('/')[url.split('/').length - 2];
					if(res.nextPage) {
						//把当前分页的数据组合
						arrAjaxList[key] = [...arrAjaxList[key], ...res.list];
						//还有第下一页数据请求第二次
						getFunAjax(url, id, res.nextPage, total, exhibit, input, win,next,last);
					} else {
						arrAjaxList[key] = [...arrAjaxList[key], ...res.list];
						//最后一页,开始渲染数据
						funInputJump(total, exhibit, input, arrAjaxList[key], win,next,last);
						if(url.indexOf('a') != -1) {
							audioJsonList(arrAjaxList[key], win);
						}
						arrAjaxList = {
							v: [],
							a: [],
							p: []
						};
						return false;
					}
				}
			}
		})
		return false;
	}
	/*
	 * total 总量  exhibit 视频  input 输入框
	 *    
	 * */
	function funInputJump(total, exhibit, input, list, win,next,last) {

		win.$(total).html(list.length); //渲染总量

		win.$(exhibit).attr('src', HttpUrl + list[0].upload_url); //渲染默认进入的第一个
		
		win.$(input).keyup(function(event) { //input按钮事件
			if(event.keyCode == 13) { //keyCode 13  判断是否为回车
				let num = Number($(this).val()); //获取当前的val转换成数字
				console.log(num)
				if(!isNaN(num) && num) { //不是数组或者是0空都为fales
					if(num <= list.length) { //是否超出最大长度
						console.log(list[num - 1].upload_url)
						win.$(exhibit).attr('src', HttpUrl + list[num - 1].upload_url); //改变url
						videoIndex = num-1;
					}else {
						$(this).val('');
						alert("你输入的数值超出最大值");
					}
				} else {
					alert("请输入整数");
				}
			}
		});
		
		let videoIndex = 0;
		win.$(next).click(function(){
			 //设置第一张图片的索引值为0len
			 let len = list.length;
			 
			 if(videoIndex>=len-1){
			 	alert('已经是最后一个啦')
			 }else{
			 	videoIndex++;
			 	win.$(exhibit).attr('src', HttpUrl + list[videoIndex].upload_url); //动态改变图片的路径	
			
			 }
			
		});
		win.$(last).click(function(){
			 //设置第一张图片的索引值为0
			if(videoIndex<=0){
			 	alert('已经是第一个啦');
			 }else{
			 	videoIndex--;
			 	win.$(exhibit).attr('src', HttpUrl + list[videoIndex].upload_url); //动态改变图片的路径	
			 }
		});
	};

	function audioJsonList(list, win) {

		//切换显示列表
		win.$('.j-audio-click').on('click', function() {
			$(this).siblings('.j-audio-list').toggle(500);
		});

		//初始渲染列表
		let audioList = "";
		for(let i of list) {
			audioList += `
				<div class="audio-list-item j-audio-list-item">
					<div class="list-name j-name">${i.upload_title}</div>		
					<div class="list-time j-time">00:00</div>
					<audio class="j-exhibit-audio exhibit-audio j-audio-mp3" src="${HttpUrl}${i.upload_url}"  controls="controls"></audio>
				</div>
			`
		}
		win.$('.j-audio-list').html(audioList);

		//双击点击mp3播放    
		win.$('.j-audio-list-item').on('dblclick', function() {
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

		});
		
		//下拉加载
		
		
		
		
		
		
		//计算秒
		function getTimeMinute(s) {
			var h;
			h = Math.floor(s / 60);
			//计算秒
			//算法：取得秒%60的余数，既得到秒数
			s = s % 60;
			//将变量转换为字符串
			h += '';
			s += '';
			//如果只有一位数，前面增加一个0
			h = (h.length == 1) ? '0' + h : h;
			s = (s.length == 1) ? '0' + s : s;
			return h + ':' + s;
		}

		//回去mp3的时间  展示 
		var aud = win.$('.j-audio-list').find('.j-exhibit-audio');
		let audioListItem = win.$('.j-audio-list-item');

		function getTime() {
			setTimeout(function() {
				for(let i = 0; i < aud.length; i++) {

					if(isNaN(aud[i].duration)) {
						getTime();
					} else {
						audioListItem.eq(i).find('.j-time').html(getTimeMinute(~~aud[i].duration));
					}
				}
			}, 100);
		}
		getTime();
		
		
		
	}