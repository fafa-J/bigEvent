$(function () {
    let layer = layui.layer;
    let form = layui.form;
    //表单校验
    form.verify({
        newPwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            //属性选择器写错！忘写name=！！！
            if (value === ($("#form-cp input[name=oldPwd]").val())) {
                return "新密码不能与旧密码相同！";
            }
        },
        rePwd: function (value, item) { //value：表单的值、item：表单的DOM对象
            if (value !== ($("#form-cp input[name=newPwd]").val())) {
                return "两次密码输入不一致！";
            }
        },

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    //修改密码
    $("#form-cp").on("submit", function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                    console.log(this);
                    $("#form-cp")[0].reset()
                    window.parent.getUserInfo();
                } else {
                    layer.msg(res.message)
                    console.log(this);
                }
            }
        })

    })

})