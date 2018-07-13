const uid = getCookie('uid');
// console.log(uid)
var base = base();
// console.log(base)
new Vue({
    el: '#app',
    data: {
        userinfo: {}
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let _this = this;
            $.ajax({
                url: API + '/user/getMyInfo.wckj',
                method: 'POST',
                data: {
                    uid: localStorage.uid,
                    t: base.t,
                    uuid: base.uuid,
                    v: base.v,
                    h: base.h,
                    c: base.c,
                },
                dataType: 'JSON',
                success(res) {
                    console.log(res)
                    if (res.resultCode == 10000) {
                        _this.userinfo = res.resultData;
                        localStorage.money = res.resultData.moneyTask

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
