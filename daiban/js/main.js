
angular.module("myapp",[]).controller("ctrl",["$scope","$filter",function (s,f) {

    s.shi=localStorage.daiban?JSON.parse(localStorage.daiban):[];
    s.wan=localStorage.wanc?JSON.parse(localStorage.wanc):[];
    //查询标记
    // s.chaxunarr=[];
    if(s.shi.length>0){
        s.keyid=s.shi[s.shi.length-1].id;
    }else{
        s.keyid=-1;
    }

    s.indexlis=s.shi[0]?s.shi[0].id:0;
    // s.indexcha=s.indexlis;
    gethot(s.shi,s.indexlis);

    s.wanflag=false;
    s.daiflag=true;
    // s.time=new Date().getTime();
    // s.chaxunid=function (id) {
    //     s.chaxunarr.push(id);
    // };
    // s.clearchaxunarr=function () {
    //     s.chaxunarr=[];
    // };
    // s.chaxunlis=function () {
    //     s.indexlis=s.chaxunarr[0];
    // };

    s.addlis=function (title) {
        s.keyid++;
        var tl=title||"new";
        s.wanflag=false;
        s.daiflag=true;
        // s.shi.push({title:tl,con:[],id:(s.shi.length),key:s.keyid});
        s.shi.push({title:tl,con:[],id:s.keyid,hot:"true"});
        s.indexlis=getindex(s.shi,s.keyid);
        gethot(s.shi,s.keyid);
        // s.indexcha=s.indexlis;
        s.chaxun="";
        localStorage.daiban=JSON.stringify(s.shi);
    };
    s.addcon=function () {
        s.keyid++;
        s.shi[s.indexlis].con.push({cons:[],id:s.keyid,time:new Date().getTime()});
        localStorage.daiban=JSON.stringify(s.shi);
    };
    s.alercon=function (item1,ind) {
        angular.forEach(s.shi[s.indexlis].con,function (obj,index) {
            if(obj.id==ind){
                s.shi[s.indexlis].con[index]=item1;
            }
        });
        localStorage.daiban=JSON.stringify(s.shi);
    };
    s.showlis=function (index) {
        s.daiflag=true;
        s.wanflag=false;
        angular.forEach(s.shi,function (obj,ind) {
            console.log(obj.id+'==='+index)
            if(obj.id==index){
                s.indexlis=ind;
                // s.indexcha=s.indexlis;
                gethot(s.shi,s.shi[ind].id);
            }
        })
    };
    s.savelis=function () {
         localStorage.daiban=JSON.stringify(s.shi);
    };
//     $watch(watchExpression, listener, objectEquality);
//
//     每个参数的说明如下：
//
// watchExpression：监听的对象，它可以是一个angular表达式如'name',或函数如function(){return $scope.name}。
//
// listener:当watchExpression变化时会被调用的函数或者表达式,它接收3个参数：newValue(新值), oldValue(旧值), scope(作用域的引用)
//
//     objectEquality：是否深度监听，如果设置为true,它告诉Angular检查所监控的对象中每一个属性的变化. 如果你希望监控数组的个别元素或者对象的属性而不是一个普通的值, 那么你应该使用它
//     s.$watch("shi.length",function () {
//         s.showlis=function (index) {
//             s.daiflag=true;
//             s.wanflag=false;
//             angular.forEach(s.shi,function (obj,ind) {
//                 if(obj.id==index){
//                     s.indexlis=ind;
//                     s.indexcha=s.indexlis;
//                 }
//             })
//         };
//     });
    s.watchflag=false;
    s.wanflagf=function () {
        s.wanflag=true;
        s.daiflag=false;
        s.indexlis=-1;
        // s.indexcha=s.indexlis;
        gethot(s.shi,s.indexlis);
        s.chaxun="";
        s.watchflag=true;
    };
    s.$watch("chaxun",function () {
        if(!s.watchflag){
            s.daiflag=true;
            s.wanflag=false;
        }
        s.watchflag=false;
        var arr=f("filter")(s.shi,{title:s.chaxun});
        if(arr.length>0){

            s.indexlis=getindex(s.shi,arr[0].id);
            // s.indexcha=getindex(arr,arr[0].id);
            gethot(s.shi,arr[0].id);

            s.showlis=function (index) {
                s.daiflag=true;
                s.wanflag=false;
                angular.forEach(s.shi,function (obj,ind) {
                    if(obj.id==index){
                        s.indexlis=ind;
                        gethot(s.shi,index);
                    }
                });
                // angular.forEach(arr,function (obj,ind) {
                //     if(obj.id==index){
                //         s.indexcha=ind;
                //     }
                // })
            };
        }else{
            s.indexlis=-1;
            // s.indexcha=s.indexlis;
            gethot(s.shi,s.indexlis);
        }
    });
    s.wanadd=function (ind) {
         angular.forEach(s.shi[s.indexlis].con,function (obj,index) {
             if(obj.id==ind){
                s.shi[s.indexlis].con[index].wanid=s.wan.length;
                s.shi[s.indexlis].con[index].fuid=s.shi[s.indexlis].id;
                s.shi[s.indexlis].con[index].title=s.shi[s.indexlis].title;
                s.wan.push(s.shi[s.indexlis].con[index]);
                s.shi[s.indexlis].con.splice(index,1);
                localStorage.wanc=JSON.stringify(s.wan);
                localStorage.daiban=JSON.stringify(s.shi);
             }
         });
    };
    s.huanyuan=function (item) {
        var idflag=false;
        angular.forEach(s.shi,function (obj,index) {
            if(obj.id==item.fuid){
                idflag=true;
            }
        });
        if(idflag){
            s.keyid++;
            var num=getindex(s.shi,item.fuid);
            s.shi[num].con.push({cons:[item.cons],id:s.keyid,time:item.time});
            localStorage.daiban=JSON.stringify(s.shi);
            s.delwan(item.wanid);
        }else{
            if(confirm("此计划内容所属的计划事项名已经被删除或改变,要新创建一个事项吗？")){
                s.addlis(item.title);
                s.keyid++;
                s.shi[s.indexlis].con.push({cons:[item.cons],id:s.keyid,time:item.time});
                localStorage.daiban=JSON.stringify(s.shi);
                s.delwan(item.wanid);
                angular.forEach(s.wan,function (obj,index) {

                    if(obj.fuid==item.fuid){
                        obj.fuid=s.shi[s.shi.length-1].id;
                    }
                });
                localStorage.wanc=JSON.stringify(s.wan);
            };
        }
    };
    s.deldai=function (ind) {
        angular.forEach(s.shi[s.indexlis].con,function (obj,index) {
            if(obj.id==ind){
                s.shi[s.indexlis].con.splice(index,1);
            }
        });
        localStorage.daiban=JSON.stringify(s.shi);
    };
    s.delwan=function (ind) {
        angular.forEach(s.wan,function (obj,index) {
            if(obj.wanid==ind){
             s.wan.splice(index,1);
            }
        });
            localStorage.wanc=JSON.stringify(s.wan);
    };
    s.clearwan=function () {
           s.wan=[];
            localStorage.wanc=JSON.stringify(s.wan);
    };

    s.dellis=function (lis) {
        angular.forEach(s.shi,function (obj,ind) {
            if(obj.id==lis){
                s.shi.splice(ind,1);
                if(ind==0){
                    s.indexlis=0;
                    // s.indexcha=s.indexlis;
                    gethot(s.shi,s.shi[0].id);
                }else{
                    if(ind==s.shi.length){
                        s.indexlis=ind-1;
                        // s.indexcha=s.indexlis;
                        gethot(s.shi,s.shi[ind-1].id);
                    }else{
                        s.indexlis=ind;
                        // s.indexcha=s.indexlis;
                        gethot(s.shi,s.shi[ind].id);
                    }

                }
            }
        });
        localStorage.daiban=JSON.stringify(s.shi);
    };

function getindex(arr,key){
    for(var i=0;i<arr.length;i++){
        if(arr[i].id==key){
            return i;
        }
    }
}
    function gethot(arr,key){
        for(var i=0;i<arr.length;i++){
            // console.log(key+'==='+arr[i].id);
            if(arr[i].id==key){
                arr[i].hot="true";
            }else{
                arr[i].hot="false";
            }
        }
    }
}]);


// $('.list-group-item').click(function () {
//
//     $('.list-group-item').removeClass("active");
//     $(this).addClass("active");
// })

//  循环是用自己的唯一值，不用angular自带的 track by $index 写在ng-repea中可以在本地存储时不产生多余的数据