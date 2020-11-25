//filter拼成了fliter   = =...........
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url;

    //处理请求头
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token")
        };
        //登录校验
        options.complete = function (xhr) {
            let res = JSON.parse(xhr.responseText)
            if (res.status === 1 && res.message === "身份认证失败！") {
                console.log('fdsa');
                localStorage.removeItem("token")
                location.href = "login.html"
            }
        }

    }
});



