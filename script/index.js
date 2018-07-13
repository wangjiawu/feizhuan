var base = base();
new Vue({
    el: "#app",
    data: {

        tasks: [],
        banner: [], // 轮播图
        messageSys: [], // 公告信息
        typetask: [],//任务类型
        taskList: [],//首页任务列表
        timeTask: [],//限时任务
    },
    mounted() {
        this.getIndexTaskVertical();
        this.getBanner();
        this.getMessageSys();
        this.typeTask();
        this.getIndexTaskList();
        this.getTimeTask();
    },
    methods: {
        go(i) {
            location.href = "taskdetail.html?" + i
        },
        getBanner() {
            let _this = this;
            $.ajax({
                url: API + '/task/getBanner.wckj',
                method: 'POST',
                data: {
                    type: '3'
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.banner = res.resultData;
                    }
                },
                error(error) {
                    console.info("调用error");
                    console.log(error)
                }
            })
        },
        getMessageSys() {
            let _this = this;
            $.ajax({
                url: API + '/task/getMessageSys.wckj',
                method: 'POST',
                data: {
                    type: '3'
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.messageSys = res.resultData
                    }
                },
                error(error) {
                    console.info("调用error");
                    console.log(error)
                }
            })
        },
        getIndexTaskVertical() {
            let _this = this;
            $.ajax({
                url: API + '/task/getIndexTaskVertical.wckj',
                method: 'GET',
                data: {
                    limit: 3,
                    page: 1,
                    type: 3,
                    uid: localStorage.uid,
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.tasks = res.resultData;
                    }
                },
                error(error) {
                    console.info("调用error");
                }
            })
        },
        typeTask() {
            let _this = this;
            $.ajax({
                url: API + '/task/getIndexTaskCross.wckj',
                method: 'GET',
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.typetask = res.resultData;
                        console.log(res);
                    }
                },
                error(error) {
                    console.info("调用error");
                }
            })
        },
        getIndexTaskList() {
            let _this = this;
            $.ajax({
                url: API + '/task/getIndexTaskList.wckj',
                method: 'GET',
                data: {
                    limit: 10,
                    page: 1,
                    type: 3,
                    uid: localStorage.uid,
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.taskList = res.resultData.task;
                        console.log(res);
                        console.log(_this.taskList);
                    }
                },
                error(error) {
                    console.info("调用error");
                }
            })
        },
        taskDetail(id) {
            window.location.href = `taskdetail.html?${id}`;
        },
        getTimeTask() {
            let _this = this;
            var myDate = new Date();
            var time = myDate.getHours();
            $.ajax({
                url: API + '/task/getTimeTask.wckj',
                method: 'POST',
                data: {
                    limit: 3,
                    page: 1,
                    type: 3,
                    uid: localStorage.uid,
                    time: time,
                },
                dataType: 'JSON',
                success(res) {
                    if (res.resultCode == 10000) {
                        _this.timeTask = res.resultData;
                    }
                    // console.log(localStorage.icon)
                },
                error(error) {
                    console.info("调用error");
                }
            })
        }
    }
})
