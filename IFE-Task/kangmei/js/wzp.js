var wzp = window.wzp ||{};
wzp.tools = {

	//获取class元素集合
	getByClass:function(oParent, sClass)
	{
		var aEle   = oParent.getElementsByTagName('*');
		var aResult= [];
		var re     = new RegExp('\\b'+sClass+'\\b', 'i');
		var i      = 0;
		for(i=0;i<aEle.length;i++)
		{
			if(re.test(aEle[i].className))
			{
				aResult.push(aEle[i]);
			}
		}
		return aResult;
	},

	//获取非行间样式
	getStyle:function( obj,attr ){
		if(obj.currentStyle){
			return obj.currentStyle[attr];
		}
		else {
			return getComputedStyle(obj,false)[attr];
		}
	},

	//ajax异步请求
	ajax: function(options) {
        options = options || {};
        options.type = ("POST" || "GET").toUpperCase();
        options.dataType = options.dataType || "json";
        var params = formatParams(options.data);
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    options.success && options.success(xhr.responseText, xhr.responseXML);
                } else {
                    options.fail && options.fail(status);
                }
            }
        }
        if (options.type == "GET") {
            xhr.open("GET", options.url + "?" + params, true);
            xhr.send(null);
        } else if (options.type == "POST") {
            xhr.open("POST", options.url, true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(params);
        }
        function formatParams(data) {
        var arr = [];
        for (var name in data) {
            arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
        }
        arr.push(("v=" + Math.random()).replace("."));
        return arr.join("&");
  	  }
    },
    

	//事件绑定
	bind:function(obj, sEv, fn)
	{
		//有bug，会将绑定对象的this变成window。
		if(obj.attachEvent)
		{
				obj.attachEvent('on'+sEv, function (){
				//如果该函数的返回值为flase，让其外层函数的返回值为false，阻止M默认事件
				if(false==fn.call(obj))
				{
					//阻止冒泡
					event.cancelBubble=true;
					//阻止默认事件
					window.event.returnValue = false;
				}
			});
		}
		else{
			obj.addEventListener(sEv, function (ev){
				if(false==fn.call(obj)){
					//阻止冒泡
					ev.cancelBubble=true;
					//firefox的阻止父级元素事件发生
					ev.preventDefault();
				}
			}, false);
		}
	},
	/**
 	* 添加class
 	* @param      {<type>}  elements  The elements
 	* @param      {string}  cName     The name
 	*/
	addClass:function(obj,oClass)
	{
				if(!obj.className.match(oClass)){
					obj.className +=" "+oClass; 
				}
	},
	/**
	  * 删除class
 	  * @param      {<type>}  elements  The elements
 	  * @param      {string}  cName     The name
 	  */
removeClass:function( obj,oClass ){
				obj.className = obj.className.replace(new RegExp( "(\\s|^)" + oClass )," ");
			},
			/**
	 * 完美运动框架
	 * @param      obj                   运动的对象
	 * @param      {(Function|number|string)}  json json对象
	 * @param      {Function}                  fn   回调函数
	 */
startMove:function (obj, json, fn)
	{
	//清除未关闭的定时器
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//
		//循环json值
		for(var attr in json)
		{
			//1.定义属性初始值
			var iCur=0;
			//判断属性是否为透明度，获取元素的初始值
			if(attr=='opacity')
			{
				//1.为什么不用offsetLeft，为它会计算机border边框值。
				//2.使用parseFloat,因为opacity的值为小数并且将String转换成number
				//3.使用parseInt,因为小数位数太长(计算机是模拟的存储小数，有误差)，透明值变化值出现闪烁。
				//
				iCur=parseInt(parseFloat(wzp.tools.getStyle(obj, attr))*100);
			}
			//其他属性，获取元素的初始值
			else
			{
				iCur=parseInt(wzp.tools.getStyle(obj, attr));
			}
			
			//2.目标值与初始值的差得到速度
			var iSpeed=(json[attr]-iCur)/8;
			//ceil向上取整，计算机处理小数时，四舍五入会把大于0小于0.5的数当做0处理，所以
			//会出现永远无法达到目标距离而进入死循环。
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			
			//3.
			if(iCur!=json[attr])
			{
				bStop=false;
			}
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
	}, 30)
}
}