var id =  JSON.parse(sessionStorage.getItem('key'));
console.log(id)
new Vue({
    el:'#app',
    data:{
        caipiaoDetail:[],
    },
    mounted(){
        this.getDetails();
    },
    methods:{
        getDetails(){
            let _this = this ;
            $.ajax({
                url:API+'/lottery/getDetails.wckj',
                method:'POST',
                data:{
                    id:id,
                },
                dataType:'JSON',
                success(res){
                    if(res.resultCode == 10000){
                        _this.caipiaoDetail = res.resultData;
                        console.log(_this.caipiaoDetail);
                    }
                }
            })
        }
    }
})