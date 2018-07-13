new Vue({
    el: "#app",
    data: {
        cpIndex: [],
        num: {},
    },
    mounted() {
        this.getIndex();
    },
    methods: {
        getIndex() {
            let _this = this;
            $.ajax({
                url: API + '/lottery/getIndex.wckj',
                method: 'POST',
                data: {
                    // type:type,
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.cpIndex = res.resultData;
                        var type = _this.cpIndex[0].type;
                        _this.data = sessionStorage.setItem('key', JSON.stringify(type));
                        var str = _this.cpIndex[0].code;
                        var codeArr = str.split('#');
                        var red = codeArr[0].split(',');
                        var blue = codeArr[1].split(',');
                        _this.num.red = red;
                        _this.num.blue = blue;
                    }
                }
            })
        },
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
                        
                        if (name != "" && idCard != "" && phone != "") {
                            //  _this.getMyIndex();

                            //  window.location.href='cpBuyer.html?uid='+localStorage.uid; 
                            window.location.href = 'cpBuyer.html?uid=' + localStorage.uid;
                            // window.location.href = 'daletou.html?uid='+localStorage.uid; 
                        } else {
                            window.location.href = 'cpBuyer.html?uid=' + localStorage.uid;
                            window.location.href = 'daletou.html';
                        }

                    }else{
                        console.log(res.resultMsg)
                    }
                }
            })
        }
    }
})