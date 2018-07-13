var id =  JSON.parse(sessionStorage.getItem('key'));
console.log(id)
new Vue ({
    el:"#app",
    data:{
        // details:[],
        num:{}
    },
    mounted(){
        this.getDetails();
    },
    methods:{
        getDetails(){
            let _this =this;
            $.ajax({
                url:API+'/lottery/getDetails.wckj',
                method:'POST',
                data:{
                    id:id
                },
                dataType:'JSON',
                success(res){
                    if(res.resultCode == 10000){
                        _this.num = res.resultData;
                        console.log(_this.num)
                        _this.num.code.map(function(item,index){
                            item.code= item.code.split('#');
                            item.code[0]=item.code[0].split(',');
                            item.code[1]=item.code[1].split(',');    
                            console.log(item.code)
                            return item;
                            })
                    }
                }

            })
        }
    }
})