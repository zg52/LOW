/* // 解析 url 参数
 $(document).ready(function () {
        var re = /([^&=]+)=?([^&]*)/g,
            decodeRE = /\+/g,
            decode = function (str) { return decodeURIComponent( str.replace(decodeRE, " ") ); };
        $.parseParams = function(query) {
            let params = {}, e;
            while ( e = re.exec(query) ) params[ decode(e[1]) ] = decode( e[2] );
            return params;
        };
})
    

//var url = 'http://127.0.0.1:8020/2/index.html?number=8000&phonePass=miaosos_fsy2017&phoneType=sip', // 模拟的 url 地址
var url=window.location.href;
console.log(url,'========')
//  param = $.parseParams(url.split('?')[1] || ''); // 解析问号后的 url 参数
//  console.log(param)*/