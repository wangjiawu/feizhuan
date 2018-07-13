 var taskId = Utils.getQueryString('taskid');
new Vue({
    el:"#app",
    data:{
        taskDetail: {
            task: {},
            audit: [],
            explain: [],
            label: [],
            isTaskMsg:'',
        }
    },
    mounted(){
        this.id = location.href.split('?')[1];
        this.getTaskDetails();
       
    },
    methods:{
        getTaskDetails() {
            let _this =this;
            $.ajax({
                url:API + '/task/getTaskDetails.wckj',
                method: 'GET',
                data:{
                    taskId: this.id,
                    uid:localStorage.uid,
                },
                dataType:'JSON',
                success(res){
                    if(res.resultCode == 10000){
                        _this.taskDetail = res.resultData;
                        _this.explain = res.resultData.explain;
                        _this.task = res.resultData.task;
                        _this.explain.id = res.resultData.explain;
                        _this.taskDetail.task.addTime = Utils.timetrans(res.resultData.task.addTime);
                    }
                }
            });
        },
        getTask() {
            let _this = this;
            $.ajax({
                url:API + '/task/getUserTask.wckj',
                method: 'GET',
                data:{
                    taskId: _this.id, 
                    uid:localStorage.uid,
                    userId:localStorage.uid,
                },
                dataType:'JSON',
                success(res){
                    if(res.resultCode == 10000){
                        _this.getTaskDetails();
                    }
                },
                error(error) {
                   console.info("调用error");
                   console.log(error)
               }
            });
        },
    
        img4BrowseFolder(){
            var  that = this;
            $.ajaxFileUpload({
                url: 'http://114.55.225.181:8002/android_img.wckj', //用于文件上传的服务器端请求地址
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: 'bug_file', //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success(res){
                    if(res.resultCode == 10000){
                        url1= res.resultData;
                        that.addUserTask(url1);
                 }
                },
                error(error) {
                    console.info("调用error");
                    console.log(error);
                }
            });
        },
        addUserTask(url){
            let _this = this;
            $.ajax({
                url:API+ "/task/addUserTask.wckj",
                type:"GET",
                data:{
                    userId:localStorage.uid,
                    taskId:_this.id,
                    taskExplainId:_this.taskDetail.explain[0].id,
                    img1:url
                },
                dataType:'json',
                success(res){
                    if(res.resultCode == 10000){
                        _this.taskDetail.explain[0].stateExplain = 0;
                        _this.taskDetail.task.stateUserTask = 1; 
                    }
                },
                error(error) {
                    console.info("调用error");
                    console.log(error);
                }
            })
        }
    }
})
