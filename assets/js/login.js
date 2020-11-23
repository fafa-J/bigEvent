$(function () {

    //找对象
    $gotoReg = $('#gotoReg')
    $gotoLogin = $('#gotoLogin')
    $regForm = $('.regForm')
    $loginForm = $('.loginForm')

    let form = layui.form;
    let layer = layui.layer;

    //layui配置

    //表单校验
    form.verify({
        username: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名不能有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        password: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repassword: function (value, item) {
            if (value != $('.regForm input[name=password]').val())
                return '两次输入的密码不一致！';
        }
    });


    //注册事件

    //切换登录注册表单
    $gotoReg.on('click', function () {
        $regForm.show()
        $loginForm.hide()
    })

    $gotoLogin.on('click', function () {
        $regForm.hide()
        $loginForm.show()
    })

    //注册
    $regForm.on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()

        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message,
                        {
                            time: 1000
                        },
                        function () {
                            //注册成功模拟人点击去登录
                            $gotoLogin.click()
                        }
                    )
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })

    //登录
    $loginForm.on('submit', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: 'POST',
            url: "/api/login",
            data,
            success: function (res) {
                if (res.status === 0) {
                    localStorage.setItem('token', res.token)
                    layer.msg(res.message,
                        {
                            time: 1000
                        },
                        function () {
                            location.href = "index.html";
                        }
                    );
                } else {
                    layer.msg(res.message)
                }
            }
        })

    })



})