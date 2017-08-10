/**
 * Created by AYANG on 17/8/2.
 * details.js
 */
;(function($){
    var startx, starty,
        html = "",
        ind_A = 0,
        model = 1,
        page = $(".page"),
        cur_page = 1,
        len = 4,
        tot_page = 1,
        res = null;

    var _init = function (){
            var _this = this;
            this.tansfre();
            new WOW().init();
            this.getData(ind_A, _this);
    };
    var hasclass = true;
    _init.prototype = {
        custructor: _init,
        tansfre:function(){
            var _this = this;
            $("#openBtn").on("click",function(){
                _this.addclass(_this)
            });
            $("#listing").on("click","li",function () {
                var ind = $(this).attr("datatype");
                model = ind;
                _this.getData(ind,_this)
                _this.displaylist(_this);

            });
            setTimeout(function () {
                _this.progress();
            },2500);
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
                var direction = _this.getDirection(startx, starty, endx, endy);
                switch (direction) {
                    case 1:
                        _this.slideup();
                        break;
                    case 2:
                        _this.slidedown();
                        hasclass = false;
                        break;
                    case 3:
                        if(model == 4){
                            cur_page++;
                            if(cur_page > tot_page){
                                cur_page = tot_page;
                            }
                            _this.getpage(res, _this, cur_page);
                        }
                        break;
                    case 4:
                        if(model == 4){
                            cur_page--;
                            if(cur_page < 1){
                                cur_page = 1;
                            }
                            _this.getpage(res, _this, cur_page);
                        }
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
        getDirection: function(startx, starty, endx, endy){//判断滑动距离
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
        slidedown: function(){//列表显示
            $(".top_liner").addClass("top_close");
            $(".bottom_liner").addClass("bottom_close");
            $("#listing").slideDown();
            $("#listing li").addClass("bounceInLeft");
            hasclass = false;
        },
        slideup: function(){//列表隐藏
            $(".top_liner").removeClass("top_close");
            $(".bottom_liner").removeClass("bottom_close");
            $("#listing").slideUp();
            $("#listing li").removeClass("bounceInLeft");
            hasclass = true;
        },
        getData: function(ind, _this){//ajax根据参数，判断当前页面
            $.ajax({
                url: "../data/data.json",
                type: "post",
                success: function(data){
                    var result = data;
                    page.html("");
                    if(ind == 0 || ind == 1){
                        _this.getInfo(result, _this)
                    }
                    if(ind == 2){
                        _this.getEducation(result, _this);
                    }
                    if(ind == 3){
                        _this.getwork(result, _this);
                    }
                    if(ind == 4){
                        _this.getobject(result, _this)
                    }
                    if(ind ==5){
                        _this.gettechnology(result, _this);
                    }
                },
                error: function(){
                    alert("请求错误")
                }
            })
        },
        progress: function(){//进度条
            $.each($(".dataList li"),function(i){
                var span_w = $(this).find("span:last-child").attr("data-width");
                $(this).find("span").find("i").animate({
                    "width": span_w+"%"
                },800);
            })
        },
        getInfo: function(result, _this){
            html='<div class="header">'
                    +'<div class="head_bg">'
                        +'<div class="HeadPortrait">'
                            +'<img src="../images/head.jpg" alt="">'
                        +'</div>'
                    +'</div>'
                    +'<div class="material">'
                        +'<p class="monicker wow bounceInLeft" data-wow-duration="1s">'+result.name+'/baybay</p>'
                        +'<span class="wow bounceInRight" data-wow-duration="1.2s">我性格开朗、思维活跃；拥有年轻人的朝气蓬勃，做事有责任心，条理性强；易与人相处，对工作充满热情,勤奋好学，敢挑重担，具有很强的团队精神和协调能力。</span>'
                    +'</div>'
                    +'<h2 class="caption wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay="1.4s"><span></span><span>资料</span></h2>'
                    +'<ul id="infolist" class="infolist">'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1.6s"><span>年龄：</span><span>'+result.age+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1.8s"><span>职位：</span><span>'+result.position+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="2s"><span>手机：</span><span>'+result.Telephone+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="2.2s"><span>e－mail：</span><span>'+result.email+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="2.4s"><span>学历：</span><span>'+result.Education+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="2.6s"><span>学院：</span><span>'+result.college+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="2.8s"><span>技术：</span><span>'+result.major+'</span></li>'
                        +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="3s"><span>毕业时间：</span><span>'+result.Graduationtime+'</span></li>'
                    +'</ul>'
                +'</div>';
            $(html).appendTo(page);

        },
        getEducation: function(result, _this){//获取教育经历
            html=' <h2 class="caption wow rotateInDownLeft" data-wow-duration="0.8s"><span></span><span>工作经验</span></h2>'
                +'<div class="limit wow bounceInLeft" data-wow-duration="0.8s" data-wow-delay="0.5s">'+result.limit+'</div>'
                +'<h2 class="caption wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay="0.8s"><span></span><span>个人技能</span></h2>'
                +'<ul id="dataList" class="dataList">'
                    +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1s"><span>JAVASCRIPT:</span><span data-width="75"><i></i></span></li>'
                    +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1.2s"><span>CSS:</span><span data-width="90"><i></i></span></li>'
                    +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1.4s"><span>HTML5:</span><span data-width="100"><i></i></span></li>'
                    +'<li class="wow fadeInDown" data-wow-duration="0.8s" data-wow-delay="1.6s"><span>PS:</span><span data-width="50"><i></i></span></li>'
                +'</ul>'
             $(html).appendTo(page);
             if(_this != null){
             setTimeout(function(){
             _this.progress();
             },2000)
             }
        },
        getwork: function(result, _this){//获取工作经历
            page.html("");
            var cont='<div class="workTitle wow flipInX" data-wow-duration="1s" data-wow-delay="1s">工作经历</div>';
            $.each(result.workExperience,function(i, k){
                var resp = "";
                $.each(k.responsible,function(ind, val){
                    resp+='<li class="wow fadeInLeft" data-wow-duration="1s" data-wow-delay="2.'+ind+'s"><span>'+(ind+1)+'、</span>'+val+'</li>';
                })
                cont+='<div class="workexperience">'
                        +'<div class="detailBox">'
                        +'<div class="details">'
                        +'<div class="apellation">'
                        +'<div class="company wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay="1.5s">'+k.Corporatename+'</div>'
                        +'<div class="workTime wow rotateInDownRight" data-wow-duration="0.8s" data-wow-delay="1.5s">'+k.worktime[0]+'-'+k.worktime[1]+'</div>'
                        +'</div>'
                             +'<ul class="introduce">'+resp+'</ul>'
                        +'</div>'
                        +'</div>'
                    +'</div>';
            });

            $(cont).appendTo(page);
        },
        getobject: function(result, _this){//获取个人项目
            res = result;
            _this.getpage(res, _this, cur_page);
            console.log(cur_page+','+tot_page)
            if(cur_page == 1){
                $(".left_arr").hide();
                $(".right_arr").show();
            }else if(cur_page > 1 && cur_page < tot_page){
                $(".left_arr").show();
                $(".right_arr").show();
            }else{
                $(".left_arr").show();
                $(".right_arr").hide();
            }

        },
        gettechnology: function(result, _this){//获取个人技能
            var cont = "";
            $.each(result.MainSkills,function(i, k){
                cont+='<li class="wow flipInY" data-wow-duration="1s" data-wow-delay="1.'+i+'s"><span>'+(i+1)+'、</span><p>'+k.technology+'</p></li>';
            });
            cont = '<h2 class="caption wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay=".5s"><span></span><span>个人评价</span></h2><ul id="MainSkills" class="MainSkills">'+ cont +'</ul>';
            $(cont).appendTo(page);
        },
        getpage:function(result, _this, pages){
            $(".page").html("");
            if(result.ProjectExperience.length%len==0){//总页数
                tot_page = result.ProjectExperience.length/len;
            }else{
                tot_page = Math.floor(result.ProjectExperience.length/len)+1;
            }
            if(tot_page >= cur_page){
                var cont = "",
                    pros = result.ProjectExperience,
                    start= ((cur_page-1)>=0?(cur_page-1):0)*len,//开始位置
                    end = (start+len)<=pros.length?(start+len):pros.length;//结束位置
                pros = pros.slice(start,end);
                $.each(pros,function(i, k){
                    cont+='<li>'
                        +'<span class="wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay="1.'+(i)+'s"></span>'
                        +'<a href="'+k.url+'" class="wow bounceInRight" data-wow-duration="0.8s" data-wow-delay="1.'+(i)+'s">'
                        +'<div class="describe">'
                        +'<h3>'+k.entryname+'</h3>'
                        +'<p>日期：'+k.projectTime[0]+' － '+k.projectTime[1]+'</p>'
                        +'<p class="text-overflow">描述：'+k.ntroduction+'</p>'
                        +'</div>'
                        +'</a>'
                        +'</li>';
                });
                cont = '<h2 class="caption wow rotateInDownLeft" data-wow-duration="0.8s" data-wow-delay=".5s"><span></span><span>项目经验</span></h2><div class="linerY"></div><ul class="objectlist">'+cont+'</ul><div class="left_arr wow flash" data-wow-duration="2s" data-wow-iteration="infinite" data-wow-delay="1s"></div><div class="right_arr wow flash" data-wow-duration="2s"" data-wow-iteration="infinite" data-wow-delay="1s"></div>'
                $(cont).appendTo(page);

            }
        }

    }
    return new _init()
})(jQuery)