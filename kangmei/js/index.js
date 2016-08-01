(function(w,d,wzp){ 
    wzp.app = {
        toMainTab:function(){
            var oUl       = d.getElementById("main-ul");
            var aLi       = oUl.getElementsByTagName("li");
            var oTab      = d.getElementById("main-tab");
            var aTab      = wzp.tools.getByClass(oTab,"main-hd-right");
            var oUl2      = d.getElementById("main-ul2");
            var aLi2      = oUl2.getElementsByTagName("li");
            var oTab2     = d.getElementById("main-tab2");
            var aTab2     = wzp.tools.getByClass(oTab2,"main-hd-right");
            var oUl3      = d.getElementById("main-ul3");
            var aLi3      = oUl3.getElementsByTagName("li");
            var oTab3     = d.getElementById("main-tab3");
            var aTab3     = wzp.tools.getByClass(oTab3,"main-hd-right");
            var oUl4      = d.getElementById("main-ul4");
            var aLi4      = oUl4.getElementsByTagName("li");
            var oTab4     = d.getElementById("main-tab4");
            var aTab4     = wzp.tools.getByClass(oTab4,"main-hd-right");
            var oUl5      = d.getElementById("main-ul5");
            var aLi5      = oUl5.getElementsByTagName("li");
            var oTab5     = d.getElementById("main-tab5");
            var aTab5     = wzp.tools.getByClass(oTab5,"main-hd-right");
            wzp.ui.tab(aLi,aTab,"selected");
            wzp.ui.tab(aLi2,aTab2,"selected");
            wzp.ui.tab(aLi3,aTab3,"selected");
            wzp.ui.tab(aLi4,aTab4,"selected");
            wzp.ui.tab(aLi5,aTab5,"selected");
        },
        toTab:function(){
            var oTab       = d.getElementById("tab-menu");
            var aTi        = oTab.getElementsByTagName("li");
            var oBox       = d.getElementById("tab-box");
            var aTab       = wzp.tools.getByClass(oBox,"tab-panel");
            wzp.ui.tab(aTi,aTab,"bt");
        },
        toBannerSlide:function(){
            var oBox       = d.getElementById("slide-box");
            var oUl        = d.getElementById("banner-slide");
            var oNl        = d.getElementById("slide-nav");
            var aLi        = oUl.getElementsByTagName("li");
            var aNi        = oNl.getElementsByTagName("li");
            var oPre       = d.getElementById("prev");
            var oNext      = d.getElementById("next");
            var oPage      = d.getElementById("slide-page");
            var len        = aLi.length;
            var j          = 0;
            var oTimer     = null;
            //左右图标控制轮播
            wzp.tools.bind(oBox,"mouseover",function(){
                oPage.style.display = "block";
            });
             wzp.tools.bind(oBox,"mouseout",function(){
                oPage.style.display = "none";
            });
             oPre.onmouseover = function(){
                clearInterval(oTimer);
             }
             oPre.onclick= function(){
                  j = j>0?--j:len-1;
                  run(j);
             }
             oPre.onmouseout = function(){
                autotimer();
             }
             oNext.onmouseover = function(){
                clearInterval(oTimer);
             }
             wzp.tools.bind(oNext,"click",function(){
                 j = j<len-1?++j:0;
                 run(j);
             });
             oNext.onmouseout = function(){
                autotimer();
             }
            //开启自动轮播
            autotimer();
            //小图标控制轮播
            for(var i=0; i<aNi.length; i++){
                aNi[i].index = i;
                aNi[i].onmouseover = function(){
                    run(this.index);
                    clearInterval(oTimer);
                }
                aNi[i].onmouseout  = function(){
                    autotimer();
                }
            }
             function autotimer(){
                 oTimer     = setInterval(function(){
                    if(j<len-1 )
                        j ++;
                    else  
                        j = 0;
                    run(j);
                },2000); 
            }
            function run(j){
                    for( var i=0; i<len ; i++ ){
                       wzp.tools.startMove(aLi[i],{"opacity":0});
                       wzp.tools.removeClass(aNi[i],"selected");
                     }
                       wzp.tools.startMove(aLi[j],{"opacity":1000});
                       wzp.tools.addClass(aNi[j],"selected");
            }
           
        },
        toBannerLeft:function(){
            var oBannerLeft= d.getElementById("banner-left-bd");
            var oUl        = d.getElementById("banner-left-panel");
            var aLi        = oUl.getElementsByTagName("li");
            var aPanel     = wzp.tools.getByClass(oBannerLeft,"banner-left-panel-box");
            for(var i=0; i<aLi.length; i++){
                wzp.ui.tobanner(aLi[i],aPanel[i]);
                wzp.ui.tobanner(aLi[i],aPanel[i]);
            }
        }
    },
    wzp.ui = {
        tab:function(obj1,obj2,oClass){
            var len                 = obj1.length;
            for(var i=0; i<len; i++){
                obj1[i].index        = i
                obj1[i].onmouseover = function(){
                     for(var j=0; j<len; j++){
                        wzp.tools.removeClass(obj1[j],oClass);
                        obj2[j].style.display = "none";
                     }
                     wzp.tools.addClass(this,oClass);
                     obj2[this.index].style.display = "block";
                }
            }
        },
       textChange:function(obj)
        {
             var oValue    = obj.value;
             obj.onfocus   = function()
             {
                obj.value = "";
             }
             obj.onblur    = function()
             {
                obj.value = oValue;
             }
        },
        tobanner:function (obj1,obj2)
        {
          obj1.onmouseover =  obj2.onmouseover = function()
          {        
                 obj1.getElementsByTagName("a")[0].style.color      = "#c81623";
                 obj1.style.background = "#fff";
                 obj2.style.display    = "block";
          }
          obj1.onmouseout  =   obj2.onmouseout = function()
          {
                obj1.getElementsByTagName("a")[0].style.color      = "#fff";
                obj1.style.background = "#c81623";
                obj2.style.display    = "none";
          }
        },
        toggle:function (obj1,obj2)
        {
          obj1.onmouseover =  obj2.onmouseover = function()
          {
                 obj1.style.background = "#fff";
                 obj2.style.display    = "block";
          }
          obj1.onmouseout  =   obj2.onmouseout = function()
          {
                obj1.style.background = "#f5f5f5";
                obj2.style.display    = "none";
          }
        }
    },
    //主页banner左部菜单特效
    wzp.app.toBannerLeft();
    //主页banner轮播图
    wzp.app.toBannerSlide();
    //主页banner部分tab选项卡
    wzp.app.toTab();
     //主页container部分tab选项卡
    wzp.app.toMainTab();
})(window,document,wzp)