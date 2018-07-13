// new Vue({
//     el:"#app",
//     data:{
//         myIndex:[]
//     },
//     mounted(){
//         this.getMyIndex();
//     },
//     getMyIndex(){
//             console.log(22222);
//             let _this = this ;
//             $.ajax({
//                 url:API+"/lottery/getMyIndex.wckj",
//                 method:'GET',
//                 data:{
//                   uid:localStorage.uid,
//                 },
//                 success(res){
//                     if(res.resultCode == 10000){
//                         _this.myIndex = res.resultData;
//                         console.log(_this.myIndex);
//                      if(_this.myIndex.name == "" && _this.myIndex.idCard == "" && _this.myIndex.phone == ""){  
//                          _this.getMyIndex();
//                         window.location.href = 'daletou.html?uid='+localStorage.uid; 
//                      }else {
//                         window.location.href='cpBuyer.html?uid='+localStorage.uid; 
//                      }
 
//                     }
//                 }
//             })
//         }
// })