const uid = getCookie('uid');
var base = base();
new Vue({
    el: '#app',
    data: {
        friends: {}
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let _this = this;
            $.ajax({
                url: API + '/user/getMyFriends.wckj',
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
                    if(res.resultCode == 10000) {
                        _this.friends = res.resultData;
                       
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
