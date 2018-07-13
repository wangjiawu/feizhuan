var base = base();
new Vue ({
    el: "#app",
    data :{
     
    },
    mounted(){
     this.getTaskType();
    },
    methods:{
        getTaskType(id){
            let _this =this;
            $.ajax({
                url:API + '/task/getTaskTypeList.wckj',
                method :'GET',
                // data:data,
                dataType:'JSON',
                success(res){
                    if(res.resultCode == 10000){
                      console.log('获取成功');
                    }
                },
                error(error){
                    console.log(error);
                }
            })
        }
    }
})