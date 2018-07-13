const uid = getCookie('uid');
var base = base();
new Vue({
    el: '#app',
    data: {
        task: {}
    },
    mounted() {
        this.init();
        this.show()
    },
    methods: {
        init() {
            let _this = this;
            $.ajax({
                url: API + '/user/getMyMoneyTaskList.wckj',
                method: 'POST',
                data: {
                    uid: localStorage.uid,
                    // t: base.t,
                    // uuid: base.uuid,
                    // v: base.v,
                    // h: base.h,
                    // c: base.c,
                    "t": "1528940321003",
                    "uuid": "99000708107109",
                    "v": "V1.2.0",
                    "h": "85c57f0862c7a316a09b1f60b50bcf05",
                    "c": "A0000",
                },
                dataType: 'JSON',
                success(res) {
                    console.log(res);
                    if (res.resultCode == 10000) {
                        res.resultData.gain.forEach(function (item, i) {
                            item.addTime.time = fmtDate(item.addTime.time);
                            switch (item.type) {
                                case 1:
                                    item.type = "扣除"
                                    break;
                                case 2:
                                    item.type = "返还"
                                    break;
                                case 3:
                                    item.type = "充值"
                                    break;
                            }
                        });
                        _this.task = res.resultData;

                    }
                },
                error(error) {
                    console.info("调用error");
                    console.log(error)
                }
            })
        },
        show(id) {
            console.log(id)
            if(id){
                window.location.href = "yjaccount.html?id=" + id
            }
            

        }
    }
})
function fmtDate(obj) {//格式化时间
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}
