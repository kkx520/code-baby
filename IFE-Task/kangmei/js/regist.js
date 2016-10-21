
//验证功能
;(function( w, wzp ){
	var oForm  = document.getElementById( "form" );
	var aI     = document.getElementsByTagName( "i" );
	var aSpan  = document.getElementsByTagName( "span" );
	var oName  = document.getElementById( "username" );
	var oTip   = document.getElementById( "name-tip" );
	var reName = /[^0-9a-zA-Z\u4e00-\u9fa5-_]+/g;
	var oPass  = document.getElementById( "password" );
	var oRepass= document.getElementById( "repassword" );

	wzp.myAddEvent( oName, "change", checkName1 );
	wzp.myAddEvent( oName, "focus", checkName );
	wzp.myAddEvent( oPass, "focus", checkPassword );
	wzp.myAddEvent( oPass, "change" , checkPassword1 );
	wzp.myAddEvent( oRepass, "focus", checkRepassword );
	wzp.myAddEvent( oRepass, "change", checkRepassword1 );

	function checkRepassword()
	{
		if(oRepass.value.length == 0){	
			aSpan[2].innerHTML = "请再次输入密码";
		}
	}
	function checkRepassword1 ()
	{
		if((/^0$/g).test(oRepass.value.length)){
			aSpan[2].innerHTML = "请再次输入密码";
		}
		else if(oPass.value!=oRepass.value){
			wzp.removeClass(aI[2],"icon-succ");
			console.log("两次输入密码不一致");
			aSpan[2].innerHTML = "两次输入密码不一致";
		}
		else {
			aSpan[2].innerHTML = "";
			wzp.addClass(aI[2],"icon-succ");
		}
	}
	function checkPassword()
	{
		if(oPass.value.length == 0){	
			aSpan[1].innerHTML = "建议使用字母、数字和符号两种及以上的组合，6-20个字符";
		}
	}
	function checkPassword1 ()
	{
		if((/^0$/g).test(oPass.value.length)){
			aSpan[1].innerHTML = "建议使用字母、数字和符号两种及以上的组合，6-20个字符";
		}
		else if(!(/^\S{6,20}$/g).test(oPass.value)){
			wzp.removeClass(aI[1],"icon-succ");
			aSpan[1].innerHTML = "长度只能在6-20个字符之间";
		}
		else {
			aSpan[1].innerHTML = "";
			wzp.addClass(aI[1],"icon-succ");
		}
	}
	function checkName (){
		if(oName.value.length == 0 ){
			aSpan[0].innerHTML = "支持中文、字母、数字、“-”“_”的组合，4-20个字符";
		}
	}
	function checkName1(){
		if(oName.value.length == 0 ){
			aSpan[0].innerHTML = "支持中文、字母、数字、“-”“_”的组合，4-20个字符";
		}
		else if(!(/^\S{4,20}$/g).test(oName.value)){
			wzp.removeClass(aI[0],"icon-succ");
			aSpan[0].innerHTML = "长度只能在4-20个字符之间";
		}
		else if(reName.test(oName.value)){
			console.log(reName.test(oName.value));
			aSpan[0].innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合!";
		}
		else {
			wzp.ajax({
				url:"checkRegist.php",
				type:"POST",
				data:{name:oName.value},
				dataType:"json",
				success:function(response,xml){
					if(response == 0){
						aSpan[0].innerHTML = "";
						wzp.addClass(aI[0],"icon-succ");	
					}

				},
				fail:function(status){
					alert("连接失败");
				}
			});
		}
	}
})(window,wzp);

//验证码功能实现
(function(w,wzp){

	var Code   = document.getElementById( "code" );
	var arr    = ['0','']
	


})(window,wzp);