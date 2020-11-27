function getUserInfo() {
    //获取用户信息
    $.ajax({
        url: "/my/userinfo",
        success: function (res) {
            let data = res.data;

            if (res.status === 0) {
                let $img = $('.layui-nav-img')
                let $span = $('.text-avatar')
                let name = (data.nickname || data.username);
                $('#welcome-text').text("欢迎 " + name);
                let W = name[0].toUpperCase();
                if (data.user_pic) {
                    $img.show().attr("src", data.user_pic);
                    $span.hide()
                } else {
                    $img.hide()
                    $span.text(W).show()
                }
            }
        }
        //身份认证失败跳转登录页面 登录校验，移至base中
        //complete形参为JQ封装的xhr，responsText是字符串!
        // complete: function (xhr) {
        //     let res = JSON.parse(xhr.responseText)
        //     if (res.status === 1 && res.message === "身份认证失败！") {
        //         console.log('fdsa');
        //         localStorage.removeItem("token")
        //         location.href = "login.html"
        //     }
        // }
    })
}



$(function () {
    let layer = layui.layer;

    //获取用户信息
    getUserInfo();

    //退出功能
    $("#exitBtn").on("click", function () {
        layer.confirm(
            '确定退出登录?',
            { icon: 3, title: '提示' },
            function (index) {
                //do something
                localStorage.removeItem("token");
                location.href = "login.html";
                layer.close(index);
            }
        );

    })

})