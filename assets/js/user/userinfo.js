$(function () {
    let form = layui.form;
    let layer = layui.layer;
    //获取用户的基本信息 表单回显
    getInfo()
    function getInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                form.val("form-userinfo", res.data)
            }
        })

    }

    //表单校验
    form.verify({
        nickname: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value.length > 6) {
                return "昵称不能超过6位！"
            }
        }

    });


    //更新用户信息
    $("#form-userinfo").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data,
            success: function (res) {
                layer.msg(res.message)
                window.parent.getUserInfo()
            },
            complete: function () {
                getInfo()
            }
        })

    })

    //重置功能
    $("#resetBtn").on("click", function (e) {
        e.preventDefault()
        getInfo()
    })

})