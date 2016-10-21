(function(w,d,wzp){ 
    wzp.app = {
        toToolbar:function(){
            var oA  = d.getElementById("toolbar");
            var aA  = oA.getElementsByTagName("a");
            var aEm = oA.getElementsByTagName("em");
            for(var i=0; i<aA.length; i++){
                aA[i].index = i ;
                aA[i].onmouseover = function(){
                    wzp.tools.startMove(aEm[this.index],{"left":-60});
                }
                 aA[i].onmouseout = function(){
                    wzp.tools.startMove(aEm[this.index],{"left":41});
                }
            }
        },
        toScroll:function(){          
           function fn(){
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            var oScroll = d.getElementById("scroll-search");
                if(t >= 300)
                    oScroll.style.display = "block";
                else 
                    oScroll.style.display = "none";
           }
           wzp.tools.bind(window,"scroll",fn);
        },
        toInp:function(){
            var oInp = d.getElementById("inp"); 
            wzp.ui.textChange(oInp);
        },
        toNav:function(){
             var oNav = d.getElementById("nav");
             var aHd  = wzp.tools.getByClass(oNav,"site-nav-menu-hd");
             var aBd  = wzp.tools.getByClass(oNav,"site-nav-menu-bd none");
             for(var i=0; i<aBd.length; i++){
                 if( i>2 )
                     wzp.ui.toggle(aHd[i+1],aBd[i]);
                 else 
                    wzp.ui.toggle(aHd[i],aBd[i]);
             }
        }
    };
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
    };
    //主页nav导航部分特效
    wzp.app.toNav();
    //主页搜索框特效
    wzp.app.toInp(); 
    //主页滚动搜索
    wzp.app.toScroll();
    //主页侧边栏工具
    wzp.app.toToolbar();
})(window,document,wzp)