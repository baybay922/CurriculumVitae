/**
 * Created by AYANG on 17/8/2.
 * details.js
 */
;(function($){
    var startx, starty;
    var _init = function (){
            this.tansfre()
    };
    var hasclass = true;
    _init.prototype = {
        custructor: _init,
        tansfre:function(){
            var $this = this;
            $("#openBtn").on("click",function(){
                $this.addclass($this)
            });
            $("#listing").on("click","li",function () {
                $this.displaylist($this)
            })
            //手指接触屏幕
            document.addEventListener("touchstart", function(e) {
                startx = e.touches[0].pageX;
                starty = e.touches[0].pageY;
            }, false);
            //手指离开屏幕
            document.addEventListener("touchend", function(e) {
                var endx, endy;
                endx = e.changedTouches[0].pageX;
                endy = e.changedTouches[0].pageY;
                var direction = $this.getDirection(startx, starty, endx, endy);
                switch (direction) {
                    case 1:
                        $this.slideup();
                        break;
                    case 2:
                        $this.slidedown();
                        hasclass = false;
                        break;
                    default:
                }
            }, false);
        },
        displaylist: function($this){
            var _this = $this;
            _this.slideup();

        },
        getAngle: function(angx, angy){//根据起点终点返回方向 1向上 2向下 3向左 4向右 0未滑动
            return Math.atan2(angy, angx) * 180 / Math.PI;
        },
        getDirection: function(startx, starty, endx, endy){
            var angx = endx - startx;
            var angy = endy - starty;
            var result = 0;
            //如果滑动距离太短
            if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
                return result;
            }
            var angle = this.getAngle(angx, angy);
            if (angle >= -135 && angle <= -45) {
                result = 1;
            } else if (angle > 45 && angle < 135) {
                result = 2;
            } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                result = 3;
            } else if (angle >= -45 && angle <= 45) {
                result = 4;
            }
            return result;
        },
        addclass:function($this){
            var _this = $this;
            if(hasclass){
                _this.slidedown();

            }else{
                _this.slideup();

            }
        },
        slidedown: function(){
            $(".top_liner").addClass("top_close");
            $(".bottom_liner").addClass("bottom_close");
            $("#listing").slideDown();
            hasclass = false;
        },
        slideup: function(){
            $(".top_liner").removeClass("top_close");
            $(".bottom_liner").removeClass("bottom_close");
            $("#listing").slideUp();
            hasclass = true;
        }
    }
    return new _init()
})(jQuery)