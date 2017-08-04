
/**
 * Created by AYANG on 17/7/31.
 * login.js
 */
;(function($){
    var login = {
        _init:function(){//自动执行函数
            login.autoHide($("#loading"),1500);
            login.executionEvent();
        },
        autoHide: function(ele,timer){
            setTimeout(function () {
                ele.fadeOut(1000,function(){
                    ele.remove();
                });

            },timer);
        },
        foucsInput:function(){
            var $this = $(this),
                $validation = $(".validation");
            $this.prev().animate({
                "opacity":1
            },300)
        },
        blurInput: function(){
            var $this = $(this);
            $this.prev().animate({
                "opacity":.5
            },300)
        },
        judgementCorrec: function(){
            var $this = $(this),
                $value = $this.val();
            if($value.length > 0){
                $this.next().animate({
                    "opacity":1,
                    "right":10+"px"
                },300)
            }else{
                $this.next().animate({
                    "opacity":0,
                    "right":0
                },300)
            }
        },
        Verification: function(){
            var userVal = $("#user").val(),
                pwdVal = $("#pwd").val(),
                hidden_user = $("#hidden_user").val(),
                hidden_pwd = $("#hidden_pwd").val();
            if( userVal == "" && pwdVal == ""){
                $.dialog({
                    isShow:false,
                    title:"提示",
                    mes: "用户名和密码不能为空"
                });
            }else if(userVal == hidden_user && pwdVal == hidden_pwd){
                window.location.href = "page/introduction.html"
            }
        },
        dialog : function (set){
            var defaults = {
                isShow:true,
                title:"标题",
                mes: "消息",
                button: ["确定","取消"],
                callback:null
            }
            var opts = $.extend(defaults,set);
            $("<div class='mask'></div>").appendTo($("body"));
            if(opts.isShow){
                var html = '<div id="dialog">'
                    +'<h2 class="title">'+ opts.title +'</h2>'
                    +'<div class="content">'+ opts.mes +'</div>'
                    +'<div class="button">'
                    +'<span i8d="yes">'+ opts.button[0] +'</span>'
                    +'<span id="cancel">'+ opts.button[1] +'</span>'
                    +'</div>'
                    +'<a id="close" class="close">关闭</a>'
                    +'</div>';
            }else{
                var html = '<div id="dialog">'
                    +'<h2 class="title">'+ opts.title +'</h2>'
                    +'<div class="content">'+ opts.mes +'</div>'
                    +'</div>';
            }

            $(html).appendTo($(".mask"));
            login.autoCenter()
            login.autoHide($(".mask"),1500)
        },
        autoCenter: function(){
            var H = $("#dialog").height();
            $("#dialog").css({
                "marginTop":-(H/2)
            })
        },
        forgots:function(){
            $.dialog({
                isShow:false,
                title:"提示",
                mes: "如果你也是一个程序猿，那你一定知道怎么找到密码"
            });
            console.log("用户名：admin");
            console.log("密码：admin");
        },
        executionEvent:function(){
            $(".login-fields").on("focus","input",login.foucsInput);
            $(".login-fields").on("blur","input",login.blurInput);
            $(".login-fields,.login-fields").on("input propertychange","input",login.judgementCorrec);
            $("#submit").on("click",login.Verification);
            $("#forgot").on("click",login.forgots)
        }
    }
    login._init();
    $.dialog = function(set){
        return new login.dialog(set)
    }
})(jQuery)

