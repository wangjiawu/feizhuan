var base = base();
new Vue({
    el: '#app',
    data: {
        userinfo: {
            mobile: '',
            password: ''
        }
    },
    methods: {
        handleClick() {
            let _this = this;
            $.ajax({
                url: API + '/user/login.wckj',
                method: 'POST',
                data: {
                    type: '1',
                    mobile: _this.userinfo.mobile,
                    password: $.md5(_this.userinfo.password),
                    t: base.t,
                    uuid: base.uuid,
                    v: base.v,
                    h: base.h,
                    c: base.c,
                },
                dataType: 'JSON',
                success(res) {
                    console.log(res);

                    if (res.resultCode == 10000) {
                        localStorage.uid = res.resultData.uid
                        localStorage.token = res.resultData.token;
                        localStorage.icon = $(".icon img").attr("src")
                        window.location.href = 'index.html';
                    }

                },
                error(error) {
                    console.info("调用error");
                    console.log(error)
                }
            })
        }
    }
})
