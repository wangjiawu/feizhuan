// var boo = false;
var api = "http://114.55.225.181:8001"
// $(function(){
// 	var user = $.cookie(table+'_user');
// 	if(user == undefined){
// 		boo = false;
// 	}else{
// 		boo = true;
// 	}
// });
//注册
function register(){
	//登录之后返回的地址
	var strss = location.search; //获取url中"?"符后的字串 ('?modFlag=business&role=1') 
	var str = strss.replace("?",""); 
	var strs = new Array(); //定义一数组 
    strs = str.split("="); //字符分割 
    var url = strs[1];
    
	var txt_LoginName = $("#txt_LoginName").val()
	var txt_Vcode = $("#txt_vcode").val()
	var txt_Pwd = $("#txt_Pwd").val()
	var txt_pwdAgain = $("#txt_pwdAgain").val()
	if(txt_LoginName == null || txt_LoginName == "" || txt_LoginName == "用户名/手机"){
		alert('请输入用户名/手机');
	}else if(txt_Vcode == null || txt_Vcode == "" || txt_Vcode == "验证码"){
		alert('请输入验证码');
	}else if(txt_Pwd == null || txt_Pwd == "" || txt_Pwd == "输入密码"){
		alert('请输入输入密码');
	}else if(txt_pwdAgain == null || txt_pwdAgain == "" || txt_pwdAgain == "确认密码"){
		alert('请输入确认密码');
	}else{
		var data = {};
		data.txt_Mobile = txt_LoginName;
		data.txt_Pwd = txt_Pwd;
		data.txt_PwdAgain = txt_pwdAgain;
		data.txt_Vcode = txt_Vcode;

		$.ajax({
			type: "get",
			url: api+"/register.wckj",
			data: data,
			dataType: 'json',
			success: function (msg) {
				var resultCode = msg.resultCode;
				var resultMsg = msg.resultMsg;
				if(resultCode != "10000"){
					alert(resultMsg);
				}else{
					window.location.href='Login.html?url='+url;
				}
			},
		});
	}
	
}
