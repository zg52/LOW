
//自定义js

//公共配置


$(document).ready(function () {
	
	
//	var socket;
//  if(typeof(WebSocket) == "undefined") {
//      console.log("您的浏览器不支持WebSocket");
//  }else{
//      console.log("您的浏览器支持WebSocket");
//     var userid= localStorage.getItem("usrname");
//      socket = new WebSocket("ws://172.16.255.118:8080/websocket/"+userid);
//      //打开事件
//      socket.onopen = function() {
//          console.log("Socket 已打开");
//          //socket.send("这是来自客户端的消息" + location.href + new Date());
//      };
//      //获得消息事件
//      socket.onmessage = function(msg) {
//          console.log(msg.data);
//          //发现消息进入    调后台获取
//      };
//      //关闭事件
//      socket.onclose = function() {
//          console.log("Socket已关闭");
//      };
//      //发生了错误事件
//      socket.onerror = function() {
//          alert("Socket发生了错误");
//      }
//      $(window).unload(function(){
//          socket.close();
//      });
//
//  }

    // MetsiMenu
    $('#side-menu').metisMenu();

    // 打开右侧边栏
    $('.right-sidebar-toggle').click(function () {
        $('#right-sidebar').toggleClass('sidebar-open');
    });

    //固定菜单栏
    $(function () {
        $('.sidebar-collapse').slimScroll({
            height: '100%',
            railOpacity: 0.9,
            alwaysVisible: false
        });
    });


    // 菜单切换
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });


    // 侧边栏高度
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    $(window).bind("load resize click scroll", function () {
        if (!$("body").hasClass('body-small')) {
            fix_height();
        }
    });

    //侧边栏滚动
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0 && !$('body').hasClass('fixed-nav')) {
            $('#right-sidebar').addClass('sidebar-top');
        } else {
            $('#right-sidebar').removeClass('sidebar-top');
        }
    });

    $('.full-height-scroll').slimScroll({
        height: '100%'
    });

    $('#side-menu>li').click(function () {
        if ($('body').hasClass('mini-navbar')) {
            NavToggle();
        }
    });
    $('#side-menu>li li a').click(function () {
        if ($(window).width() < 769) {
            NavToggle();
        }
    });

    $('.nav-close').click(NavToggle);

    //ios浏览器兼容性处理
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        $('#content-main').css('overflow-y', 'auto');
    }

});

$(window).bind("load resize", function () {
    if ($(this).width() < 769) {
        $('body').addClass('mini-navbar');
        $('.navbar-static-side').fadeIn();
    }
});

function NavToggle() {
    $('.navbar-minimalize').trigger('click');
}

function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 300);
    } else {
        $('#side-menu').removeAttr('style');
    }
}

//菜单点击
$(".J_menuItem").on('click',function(){
    var url = $(this).attr('href');
    $("#J_iframe").attr('src',url);
    return false;
});

