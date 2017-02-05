//2016 8 29
//1.解决类名的兼容问题
/*1.判断浏览器
2. ff:现有的方法
3.IE:
  1)获取所有的标签
  2)遍历,判断 
   标签.className==classname
  3)条件满足 ,保留标签
  4)返回新的数组*/

function getClass(classname,father){
	var father=father||document;
	if(father.getELementsClassName){
		return father.getELementsClassName(classname);
         
	}else{
        var all=father.getElementsByTagName("*")
        var newarr=[];
        for(var i=0;i<all.length;i++){
        	if(checkRep(classname,all[i].className)){
        		newarr.push(all[i]);
        	}
        }
        return newarr; 
	}
    

}
function checkRep(val,string){
	var arr=string.split(" ");//转化
	for(var i in arr){
		if(arr[i]==val){
			return true;
		}
	}
    return false;

}
//2016 8 30 
//获取样式的值兼职函数问题
function getStyle(obj,arrt){
  if(obj.currentStyle){
    return obj.currentStyle[arrt];
  }else{
    return getComputedStyle(obj,null)[arrt];
  }
}
//2016 8 31
//获取元素的兼容函数（可以支持标签、id、class）
function $(selecter,father){
  father=father||document;
  if(typeof selecter=="string"){
      //去除字符串前后空格
      selecter=selecter.replace(/^\s*|\s*$/g,"")
      if(selecter.charAt(0)=="."){
        return getClass(selecter.substring(1),father);
      }else if(selecter.charAt(0)=="#"){
        return document.getElementById(selecter.substring(1));
      }else if(/^[a-z][1-6a-z]*/g.test()){
        return father.getElementsByTagName(selecter)

      }
    
   }else if(typeof selecter=="function"){
   /* window.onload=function(){
      selecter();
    }*/
    addEvent(window,"load",function(){
        selecter();
    })
   }
}

//获取元素所有子节点的兼容函数
//father父节点 type传入的类型 
//a 只有文字节点  b既有文字节点又有元素节点

function getChild(father,type){
  type=type||"a";
  var newarr=[];
  var all=father.childNodes;
   for(var i=0;i<all.length;i++){
     if(type=="a"){
         if(all[i].nodeType==1){
         newarr.push(all[i])
             }
         }else if(type=="b"){
             if (all[i].nodeType==1 || (all[i].nodeType==3&& all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
      
      newarr.push(all[i])
          }
        }
     }
   return newarr;
}
//获取第一个子节点
function  getFirst(father){
  return getChild(father)[0];
}
//获取最后一个子节点
function getLast(father){
   return getChild(father)[getChild(father).length-1];
}
//获取固定的下标
function getNum(father,xiabiao){
   return getChild(father)[xiabiao];
}
//获取下一个兄弟节点
function getNext(obj){
    var next=obj.nextSibling;
    if(!next){
      return false;
    }
    while(next.nodeType==3 || next.nodeType==8){
      next=next.nextSibling;
      if(!next){getClass
      return false;
       }
     }
    return next;
}
//获取上一个兄弟节点
function getPre(obj){
    var pre=obj.previousSibling;
    if(!pre){
      return false;
    }
    while(pre.nodeType==3||pre.nodeType==8){
       pre=pre.previousSibling;
       if(!pre){
        return false
       }
    }
    return pre;
}
//10.事件绑定的兼容函数
function addEvent(obj,event,fun){
  obj[fun]=function(){
    fun.call(obj)
  }
  if(obj.attchEvent){
    obj.attachEvent("on"+event,obj[fun])
 }else{
    obj.addEventListener(event,obj[fun],false);
  }

}
//11.移除事件的兼容函数
function removeEvent(obj,event,fun){
  if(obj.detachEvent){
    obj.detachEvent("on"+event,obj[fun]);
     
  }else{
    obj.removeEventListener(event,obj[fun],false)
  }

}