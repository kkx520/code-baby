//获取ID
function getId(id){
		return document.getElementById(id);
	}
//显示modal
function showModal(modal){
		var modalCon = getId(modal);
		modalCon.style.display="block";

		setCenter("modal-container","modal-box");
	}

//隐藏modal
function hideModal(modal){
	var modalCon = getId(modal);
	modalCon.style.display="none";
}


//阻止冒泡
function stoPropagation(e){
	e = e || window.event;
	if(e.stopPropagation){
	     e.stopPropagation();
	}else{
	     e.cancelBubble=true;
	}
}
//modal垂直居中
function setCenter(reEL,poEL){
	var parentH=getId(reEL).offsetHeight/2;
	var childH=getId(poEL).offsetHeight/2;
	getId(poEL).style.marginTop=parentH-childH+"px";
}

window.onload=function(){
	
	var madolBtn=getId('modal1');
	var modalCon =getId('modal-container');
	var madalBox =getId('modal-box');
	var modalCancel=getId("modal-cancel");
	var modalConfirm=getId("modal-confirm");

	madolBtn.onclick =function(){
		showModal("modal-container");
	}
	modalCon.onclick=function(e){
		stoPropagation(e);
   		hideModal("modal-container");
	}
	madalBox.onclick=function(e){
		stoPropagation(e);
		showModal("modal-container");
	}
	modalCancel.onclick=function(e){
		stoPropagation(e);
		hideModal("modal-container");
		return false;
	}

	modalConfirm.onclick=function(e){
		stoPropagation(e);
		hideModal("modal-container");
		return true;

	}
}



//监听resize
window.addEventListener('resize',function(){
		setCenter("modal-container","modal-box");
	})