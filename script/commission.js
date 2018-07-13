const uid = getCookie('uid');
var base = base();
new Vue({
    el: '#app',
    data: {
        myMoney: {}
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            let _this = this;
            $.ajax({
                url: API + '/user/getMyMoney.wckj',
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
                    console.log(res);
                    if(res.resultCode == 10000) {
                        res.resultData.gain.forEach(function(item,i) {
                            switch(item.type){
                                case 1:
                                item.type="注册"
                                break;
                                case 2:
                                item.type="一级好友完成任务"
                                break;
                                case 3:
                                item.type="二级好友完成任务"
                                break;
                                case 4:
                                item.type="完成任务"
                                break;
                                case 5:
                                item.type="一级好友审核任务"
                                break;
                                case 6:
                                item.type="二级好友审核任务"
                                break;
                                case 7:
                                item.type="审核任务"
                                break;
                                case 8:
                                item.type="一元夺宝退款记录"
                                break;
                                case 9:
                                item.type="系统加金额"
                                break;
                                case 12:
                                item.type="签到"
                                break;
                            }
                            
                        });
                        _this.myMoney = res.resultData;
                        
                        // earnings  今日收益
            			// earningsSum  总收益
            			// gain  列表
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
