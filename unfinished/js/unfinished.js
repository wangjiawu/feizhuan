(function UnfinishedTask() {
    $.ajax({
        type: "post",
        url: API + "/task/getMyUnfinishedTask.wckj",
        dataType: "json",
        data: {
            "uid":localStorage.uid
        },
        success(res) {
            console.log(res)
            if(res.resultCode==10000){
                var html=template("UnfinishedTaskTpl",res);
                $(".taskList ul").append(html)
            }
        },
        error(info) {
            console.log(info)
        }
    })
})()