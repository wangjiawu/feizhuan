function GetRequest() {
    var url = decodeURI(location.search); //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);

        strs = str.split("&");

        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
var a = GetRequest();
getGoodsDetail(a.id)
function getGoodsDetail(id) {
    $.ajax({
        type: "post",
        url: API + "/onepurchase/getGoodsDetail.wckj",
        dataType: "json",
        data: {
            "uid": localStorage.uid,
            "goodsid": id,
            "t": "1528940321003",
            "uuid": "99000708107109",
            "v": "V1.2.0",
            "h": "85c57f0862c7a316a09b1f60b50bcf05",
            "c": "A0000",
        },
        success(res) {
            console.log(res)
            if (res.resultCode == 10000) {
                res.resultData.myorders.forEach(function (item, i) {
                    item.addTime = timeFormatDate(item.addTime)
                });
                res.resultData.allorders.forEach(function (item, i) {
                    item.addTime = timeFormatDate(item.addTime)
                });
                res.resultData.bannerPic = res.resultData.bannerPic.split(",");

                var html = template("detailTpl", res);
                $("body").html(html);

                countDown((res.resultData.endTime - res.resultData.startTime) / 1000)
                new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    autoplay: 2000,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction: false
                })
                $(".orange").css("width", res.resultData.buyCounts / res.resultData.goodsCopies * 100 + "%")//进度条
                $("#details").click(function () {
                    var detailPic = res.resultData.detailPic;
                    var goodsDetails = res.resultData.goodsDetails;
                    window.location.href = "deteils.html?detailPic=" + detailPic + "&goodsDetails=" + goodsDetails
                })
            }
        },
        error(info) {
            console.log(info)
        }
    })
}
//带天数的倒计时
function countDown(times) {
    var timer = null;
    timer = setInterval(function () {
        var day = 0,
            hour = 0,
            minute = 0,
            second = 0;//时间默认值
        if (times > 0) {
            day = Math.floor(times / (60 * 60 * 24));
            hour = Math.floor(times / (60 * 60)) - (day * 24);
            minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        }
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        // console.log($(".buyBtn"+[i]+""))
        $(".time span").eq(0).html(day);
        $(".time span").eq(1).html(hour);
        $(".time span").eq(2).html(minute);
        $(".time span").eq(3).html(second);
        times--;
    }, 1000);
    if (times <= 0) {
        clearInterval(timer);
    }
}
//格式化时间
function timeFormatDate(timeStamp) {

    var tmpTime = Date.parse(new Date(timeStamp));

    Date.prototype.format = function (format) {
        var date = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "S+": this.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }

    var newDate = new Date();
    newDate.setTime(tmpTime);
    return newDate.format('yyyy-MM-dd');
}