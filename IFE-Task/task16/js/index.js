/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	//trim去掉两边空格
	var oCity = document.getElementById('aqi-city-input').value.trim();
	var oValue= document.getElementById('aqi-value-input').value.trim();
	var re1   = /^[a-zA-Z\u4e00-\u9FA5]+$/;
	var re2   = /^\d+$/
	if(!oCity.match(re1))
	{
		alert("城市名必须为中文字符或字符！");
		return;
	}
	if (!oValue.match(re2)) {
		alert("空气质量指数必须为整数！");
		return;
	}

	//给json对象添加实例。
	aqiData[oCity] = oValue;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var item = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for(city in aqiData)
	{
		item+="<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>删除</button></td></tr>";
	}
	document.getElementById('aqi-table').innerHTML = city?item:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
 delete aqiData[city];//删除json对象
  renderAqiList();
}

function init() {
	var oBtn = document.getElementById('add-btn');
	var oTab = document.getElementById('aqi-table');
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  myAddEvent(oBtn,"click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  myAddEvent(oTab,"click",function(ev){
  	var ev = ev||window.event;
  	var target = ev.target||ev.srcElement;
  	if (target.nodeName.toLowerCase()==='button') {
  		delBtnHandle(target.dataset.city);
  	}
  });
}
function myAddEvent (obj,sEv,fn)
{
	if (obj.attachEvent) {
		obj.attachEvent('on'+sEv,fn);
	}
	else {
		obj.addEventListener(sEv,fn);
	}
}

init();