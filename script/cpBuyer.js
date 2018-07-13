var type = JSON.parse(sessionStorage.getItem('key'));
var num = $('.nub').text();
// console.log(num)
// console.log(type);
new Vue({
    el: "#app",
    data: {
        myIndex: {},
    },
    mounted() {
        this.getMyIndex();
    },
    methods: {
        getMyIndex() {
            let _this = this;
            $.ajax({
                url: API + "/lottery/getMyIndex.wckj",
                method: 'GET',
                data: {
                    uid: localStorage.uid,
                },
                success(res) {
                    console.log(res)
                    if (res.resultCode == 10000) {
                        _this.myIndex = res.resultData;
                        // console.log(_this.myIndex);
                    }
                }
            })
        },
        setOrder() {
            let _this = this;
            $.ajax({
                url: API + "/lottery/setOrder.wckj",
                method: 'POST',
                data: {
                    lotteryId: type,
                    outUserId: localStorage.uid,
                    name: _this.myIndex.name,
                    idCard: _this.myIndex.idCard,
                    phone: _this.myIndex.phone,
                    count: num
                },
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.myIndex = res.resultData;
                        console.log(_this.myIndex)
                        console.log(res.resultData.result);
                        _this.data = sessionStorage.setItem('key', JSON.stringify(_this.myIndex));
                        window.location.href = 'tzhm.html';
                    } else {
                        alert(res.resultMsg);
                    }
                },
                error(error) {
                   
                    console.log(error)
                }
            })
        }
    }
})