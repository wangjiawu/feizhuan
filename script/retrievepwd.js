var base = base();
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
new Vue({
    el: '#app',
    data: {
        userinfo: {
            mobile: '',
            code: '',
            newPassword: ''
        }
    },
    methods: {
        getCode() {
            let _this = this;
            $.ajax({
                url: API + '/user/getSmsVerCode.wckj',
                method: 'POST',
                data: {
                    type: '2',
                    mobile: _this.userinfo.mobile,
                },
                dataType: 'JSON',
                success(res) {
                    console.log(res)
                },
                error(error) {
                    console.log(error);
                }
            })
        },
        handleClick() {
            let _this = this;
            $.ajax({
                url: API + '/user/resetPassword.wckj',
                method: 'POST',
                data: {
                    mobile: _this.userinfo.mobile,
                    newPassword: $.md5(_this.userinfo.newPassword),
                    code: _this.userinfo.code,
                    t: base.t,
                    uuid: base.uuid,
                    v: base.v,
                    h: base.h,
                    c: base.c,
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        console.log(res);
                        window.location.href = "login.html"
                    }
                    console.log(_this.userinfo)
                    console.log(res);
                },
                error(error) {
                    console.info("调用error");
                    console.log(error)
                }
            })
        }
    }
})
