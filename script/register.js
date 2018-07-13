$('.getCode').on('click', () => {
    var mobile = $('.phone').val();
    $.ajax({
        url: API + '/user/getSmsVerCode.wckj',
        method: 'POST',
        data: {
            type: '1',
            mobile: mobile,
        },
        dataType: 'JSON',
        success(res) {
            console.log(res)
        },
        error(error) {
           alert("验证码错误");
        }
    })
})
var countdown=60; 
function sendemail(){
    var obj = $(".getCode");
    settime(obj);
    }
function settime(obj) { //发送验证码倒计时
    if (countdown == 0) { 
        obj.attr('disabled',false); 
        //obj.removeattr("disabled"); 
        obj.val("获取");
        countdown = 60; 
        return;
    } else { 
        obj.attr('disabled',true);
        obj.val(countdown+"秒");
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) }
    ,1000) 
}
var base = base();
$(".submit").on('click', () => {
    var mobile =$('.phone').val();
    var password = $('.password').val();
    var code = $('.yzm').val();
    var yqcode =$('#yqcode').val();
    var data ={
        type: '1',
        mobile: mobile,
        password: $.md5(password),
        code: code,
        imsi: '',
        androidSdk: '',
        uuid: base.uuid,
        t: base.t,
        v: base.v,
        h: base.h,
        c: base.c,
        // invitecode: yqcode
    }
    console.log(data)
    $.ajax({
        url: API + '/user/register.wckj',
        type: 'POST',
        data:data,
        dataType:'JSON',
        success(res) {
            if(res.resultCode == 10000) {
                console.log('注册成功')
                window.location.href = 'login.html';
            } else if(res.resultCode == 30001){
                alert('账户已存在');
            }else if(res.resultCode == 30002){
                alert('短信验证码错误');
            }else {
                console.log(res)
                alert('注册失败')
            }
        },
        error(error) {
         console.log(error)
        }
    });
})
$(".finished").on('click',()=>{
 var mobile  = $('.phone').val();
 var code =$('#codes').val();
 var password = $('.password').val();
 var data = {
    mobile: mobile,
    newPassword: $.md5(password),
    code: code,
    uuid: base.uuid,
    t: base.t,
    v: base.v,
    h: base.h,
    c: base.c
 }
 $.ajax({
     url:API + '/user/resetPassword.wckj',
     type:'POST',
     data:data,
     dataType:JSON,
     cache : false,
     success(res){
         if(resultCode==1000){
            window.location.href ="login.html";
         }else {
            alert('账号不存在');
         }
     },
     error(error) {
      console.log(error)
     }
 })
})
