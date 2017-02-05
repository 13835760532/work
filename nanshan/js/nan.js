$(function(){
	function lunbo(father,time){
		$(father+">.lunbo-box>.lunbo-img>img").hide().eq(0).show();
		var num=0;
		function change(){
			num++;
			if(num>=$(father+">.lunbo-box>.lunbo-img>img").length){
				num=0;
			}
			$(father+">.lunbo-box>.lunbo-img>img").fadeOut().eq(num).fadeIn();
			$(father+">ul>li").removeClass("active").eq(num).addClass("active");
		}
		var t=setInterval(change,time);
        $(father+">.p-btn>.lb-prev").hide();
        $(father+">.p-btn>.lb-next").hide();
        $(father).mouseover(function(){
          clearInterval(t);
          $(father+">.p-btn>.lb-prev").show();
          $(father+">.p-btn>.lb-next").show();
        })
        $(father).mouseout(function(){
        t=setInterval(change,time);
      $(father+">.p-btn>.lb-prev").hide();
      $(father+">.p-btn>.lb-next").hide();
  })
  $(father+">.p-btn>.lb-next").click(function(){
       change();
  })
  $(father+">.p-btn>.lb-prev").click(function(){
         num--;
         if(num <0){
          num=$(father+">.lunbo-box>.lunbo-img>img").length-1;
         }
    $(father+">.lunbo-box>.lunbo-img>img").fadeOut().eq(num).fadeIn();
    $(father+">ul>li").removeClass("active").eq(num).addClass("active");
    
  })
  $(father+">ul>li").click(function(){
         num=$(this).index();
         $(father+">.lunbo-box>.lunbo-img>img").fadeOut().eq(num).fadeIn();
      $(father+">ul>li").removeClass("active").eq(num).addClass("active")
  })
	}
lunbo(".lunbo",2000);
/*map特效*/

/*index选项卡*/
$(".index-tab>li").mouseover(function(){
  var index=$(this).index();
    $(".lb-title").hide().eq(index).show();
    $(".lb-text").hide().eq(index).show();
})
/*index轮播*/
var iw=$(".index-box-img>img").width();
$(".index-box-img>img:gt(0)").css({left:1000})
var now=0;var next=0;
function indexmove(){
  next++;  
  if(next>=$(".index-box-img>img").length){
    next=0;
  }
 $(".index-box-img>img").eq(now).css ({left:0})
 $(".index-box-img>img").eq(next).css ({left:1000})
 $(".index-jump>li").eq(next).addClass("index-active") 
  $(".index-jump>li").eq(now).removeClass("index-active")
  $(".index-box-title>p").eq(now).hide();
  $(".index-box-title>p").eq(next).show();
 $(".index-box-img>img").eq(now).animate({left:-1000})
 $(".index-box-img>img").eq(next).animate({left:0})
 now=next;
}
var t=setInterval(indexmove,2000)
function indexchange(){
  next--;
  if(next<0){
    next=$(".index-box-img>img").length-1;
  }
  $(".index-box-img>img").eq(now).css ({left:0})
  $(".index-box-img>img").eq(next).css ({left:-1000})
  $(".index-jump>li").eq(next).addClass("index-active") 
  $(".index-jump>li").eq(now).removeClass("index-active")
   $(".index-box-title>p").eq(now).hide();
  $(".index-box-title>p").eq(next).show();
  $(".index-box-img>img").eq(now).animate({left:1000})
  $(".index-box-img>img").eq(next).animate({left:0})
 now=next;
}
$(".index-banner").mouseover(function(){
  clearInterval(t);
})
$(".index-banner").mouseout(function(){
  t=setInterval(indexmove,2000)
})
$(".index-prev").click(function(){
  indexchange();
})
$(".index-next").click(function(){
  indexmove();
})
$(".index-jump>li").mouseover(function(){
  var index=$(this).index()
  $(".index-box-img>img").each(function(i){
    if(next<index){
      next++;
      if(next>=$(".index-box-img>img").length){
          next=0;
      } 
      next=index;
       $(".index-box-img>img").eq(now).css ({left:0})
       $(".index-box-img>img").eq(next).css ({left:1000})
        $(".index-box-title>p").eq(now).hide();
       $(".index-box-title>p").eq(next).show();
       $(".index-jump>li").eq(next).addClass("index-active") 
       $(".index-jump>li").eq(now).removeClass("index-active")
       $(".index-box-img>img").eq(now).animate({left:-1000})
       $(".index-box-img>img").eq(next).animate({left:0})
        now=next;  
    }else if(next>index){
      next=index;
      $(".index-box-img>img").eq(now).css ({left:0})
      $(".index-box-img>img").eq(next).css ({left:-1000})
       $(".index-box-title>p").eq(now).hide();
     $(".index-box-title>p").eq(next).show();
      $(".index-jump>li").eq(next).addClass("index-active") 
      $(".index-jump>li").eq(now).removeClass("index-active")
      $(".index-box-img>img").eq(now).animate({left:1000})
      $(".index-box-img>img").eq(next).animate({left:0})
         now=next;
    }
  })
})
/*btn划过效果*/
var arr=0;
$(".jq-btn>li").each(function(i,obj){
  if($(obj).hasClass("item-active"))
    arr=i;
})
$(".jq-btn>li")
.mouseover(function(){
  var index=$(this).index()
  $(".jq-item").eq(index).addClass("item-active")
})
.mouseout(function(){
   var index=$(this).index()
  $(".jq-item").eq(index).removeClass("item-active")
    var index=$(this).index()
  $(".jq-item").eq(arr).addClass("item-active")
})
/*景区返回顶部*/
function testList(event){
  var st=$(this).scrollTop();
  if(st>=600){
    $(".jqreturn").show()
  }else{
    $(".jqreturn").hide()
  }
}
$(window).scroll(testList);
$(".jqreturn").click(function(){
  $("html,body").animate({scrollTop:0},500)
})
})