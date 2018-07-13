// new Vue({
//     el:"#app",
//     data:{
//         cpIndexList:[],
//     },
//     mounted(){
//         this.getIndexList();
//     },
//     methods:{
//         getIndexList(){
//             let _this = this;
//             $.ajax({
//                 url:API + "/lottery/getIndexList.wckj",
//                 method:'POST',
//                 data:{},
//                 dataType:'JSON',
//                 success(res){
//                     console.log(res)
//                     if(res.resultCode == 10000){
//                         _this.cpIndexList = res.resultData;

//                     }
//                 }
//             })
//         }
//     }
// })

$.ajax({
    url: API + "/lottery/getIndexList.wckj",
    method: 'POST',
    data: {},
    dataType: 'JSON',
    success(res) {
        console.log(res)
        if (res.resultCode == 10000) {
            
            //双色球
            for (var i = 0; i < res.resultData.ssq.length; i++) {
                var html = '<div class="award-content-box flexbox fb_acenter" >' +
                    '<div class="award-content-img"></div>' +
                    '<div class="fb1">' +
                    '<p class="light-gray">' + res.resultData.ssq[i].issue + '</p>' +
                    '<div class="ssq">' +
                    '<span>' + res.resultData.ssq[i].code[0] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[1] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[2] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[3] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[4] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[5] + '</span>' +
                    '<span>' + res.resultData.ssq[i].code[6] + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                $(".listData1").append(html)

            }
            //大乐透
            for (var i = 0; i < res.resultData.T001.length; i++) {
                var html = '<div class="award-content-box flexbox fb_acenter">' +
                    '<div class="award-content-img1"></div>' +
                    '<div class="fb1">' +
                    '<p class="light-gray">' + res.resultData.T001[i].issue + '</p>' +
                    '<div class="dlt">' +
                    '<span>' + res.resultData.T001[i].code[0] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[1] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[2] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[3] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[4] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[5] + '</span>' +
                    '<span>' + res.resultData.T001[i].code[6] + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div> '
                $(".listData2").append(html)
            }

        }
    }
})