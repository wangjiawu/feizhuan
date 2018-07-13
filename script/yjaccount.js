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
$.ajax({
    type: "post",
    url: API + "/user/getMyMoneyTaskDetails.wckj",
    data: "json",
    data: {
        "uid": localStorage.uid,
        "id": a.id
    },
    success(res) {
        console.log(res)
        if (res.resultCode == 10000) {
            var html = template("TaskDetailsTpl", res);
            $(".content ul").html(html);
            if ($(".status li").html().slice(0, 3) == "进行中") {
                $(".status li").addClass("doing")
            } else if ($(".status li").html().slice(0, 3) == "已完成") {
                $(".status li").addClass("finish")
            } else if ($(".status li").html().slice(0, 3) == "未完成") {
                $(".status li").addClass("isno")
            }
        }
    },
    error(info) {
        console.log(info)
    }
})