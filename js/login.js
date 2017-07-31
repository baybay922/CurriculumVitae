
/**
 * Created by AYANG on 17/7/31.
 * login.js
 */
;(function(){
    var login = {
        _init:function(){//自动执行函数
            setTimeout(function () {
                $("#loading").fadeOut()
            },1500);


        }(),
        foucsInput:function(){

        },
        executionEvent:function(){
            $(".login-fields").on("focus","input",function(){
                console.log($(this))
            })
        }
    }
    //login._init();

})()

