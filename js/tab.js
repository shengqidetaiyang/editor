/* 
* @Author: Marte
* @Date:   2016-11-23 18:10:14
* @Last Modified by:   Marte
* @Last Modified time: 2016-12-01 10:58:07
*/

$(document).ready(function(){  
var tpp = $(".tab_wrap").length - 1;
var index = [];
var a = [];
var b = [];
var c = [];
var time_tar = [];
var timer = [];
function pre(m){
    index[m]--;
    if(index[m] < 0){
        index[m] = c[m];
    }  
}
function next(n){
    index[n]++;
    if(index[n] > c[n]){
        index[n] = 0;
    }  
}
function create_tab(){
        var text = $('<div class="tab_wrap" data-id='+ tpp +'></div>');
        text.html('<span class="plus"></span> <span class="minus"></span> <span class="del"></span><div class="tab_box"><div class="inner"><div class="list list1"><span class="meng">第一张图片(点击换图)</span></div><div class="list list2"><span class="meng">第二张图片(点击换图)</span></div><div class="list list3"><span class="meng">第三张图片(点击换图)</span></div><div class="list list4"><span class="meng">第四张图片(点击换图)</span></div><div class="list list5"><span class="meng">第五张图片(点击换图)</span></div></div><span class="go_left"></span> <span class="go_right"></span> <span class="resize_z"></span></div><span class="move"></span>');
        text.appendTo($("#www"));
        init_tab();
}

function init_tab(){
     index[tpp] = 0;
     a[tpp] = 200;
     b[tpp] = 150;
     c[tpp] = 2;
    $(".tab_wrap .move").hover(function(){
        $(this).css({"background-image":"url(img/move1.png)"});
    },function(){
        $(this).css({"background-image":"url(img/move.png)"});
    })
    $(".tab_wrap .move").on("mousedown",function(e){
            var e = e || window.event;
            e.stopPropagation(); 
            e.preventDefault();
            var target = this.parentNode;
            disX = e.clientX - target.offsetLeft; //鼠标相对box边界偏移值
            disY = e.clientY - target.offsetTop;  //鼠标相对box边界偏移值
            document.onmousemove = function (e){
                 var e = e || window.event;  
                    target.style.left = (e.clientX - disX) + 'px';
                    target.style.top = (e.clientY - disY) + 'px';   
                    e.preventDefault();                                
            };  
            document.onmouseup = function (){
                document.onmousemove = null;  
            };             
    }) 
    $(".tab_wrap").eq(tpp).find(".go_left").on("click",function(){
        var num = parseInt($(this).parent().parent().attr("data-id"));
        pre(num);
        $(this).parent().find(".inner").stop().animate({"left":-index[num] * a[num] + "px"});
    }) 
    $(".tab_wrap").eq(tpp).find(".go_right").on("click",function(){
        var num = parseInt($(this).parent().parent().attr("data-id"));
        next(num);
        $(this).parent().find(".inner").stop().animate({"left":-index[num] * a[num] + "px"});
    }) 
    $(".tab_wrap").eq(tpp).hover(
            function(){
                var num = parseInt($(this).attr("data-id"));
                $(this).find(".go_left").show();
                $(this).find(".go_right").show();
                $(this).find(".del").show();
                $(this).find(".plus").show();
                $(this).find(".minus").show();
                $(this).find(".meng").show();
                clearInterval(timer[num]);
            },
            function(){
                var num = parseInt($(this).attr("data-id"));
                $(this).find(".go_left").hide();
                $(this).find(".go_right").hide();
                $(this).find(".del").hide();
                $(this).find(".plus").hide();
                $(this).find(".minus").hide();
                $(this).find(".meng").hide();
                time_tar[num] = this;
                    timer[num] = setInterval(function(){
                    next(num);
                    $(time_tar[num]).find(".inner").animate({"left":-index[num] * a[num] + "px"});
                },2000);       
            }  
        );
       
    $(".tab_wrap").eq(tpp).find(".resize_z").on("mousedown",function(e){
            var num = parseInt($(this).parent().parent().attr("data-id"));
            var e = e || window.event;
            var target = e.target || e.srcElement;
            disX = e.clientX;//获取当前光标的位置
            disY = e.clientY;
            var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
            document.onmousemove = function(e) {
                var e = e || window.event;
                changeX = e.clientX - disX;//获取光标位置的改变量
                changeY = e.clientY - disY;
                a[num] = divpos.width + changeX ;//当前元素的宽高加上改变量
                b[num] = divpos.height + changeY;
                if(a[num] >= 200 && b[num] >= 120){
                    target.parentNode.style.width = a[num] + "px";
                    target.parentNode.style.height = b[num] + "px";
                    $(target).parent().find(".inner").css({"width":5 * a[num] + "px"});
                    $(target).parent().find(".inner").css({"height":b[num] + "px"});
                    $(target).parent().find(".list").css({"height":b[num] + "px"});
                    $(target).parent().find(".list").css({"width":a[num] + "px"});
                    $(target).parent().find(".go_left").css({"height":b[num] + "px"});
                    $(target).parent().find(".go_right").css({"height":b[num] + "px"});
                    $(target).parent().find(".meng").css({"line-height":b[num] + "px"});
                    $(target).parent().parent().find(".move").css({"left":(a[num]/2 - 33) + "px"});                    
                }
                e.preventDefault();
            } 
            document.onmouseup = function (){
                document.onmousemove = null; 
            };  
            e.stopPropagation();             
    })
    $(".tab_wrap").eq(tpp).find(".plus").on("click",function(){
        var num = parseInt($(this).parent().attr("data-id"));
        c[num]++;
        if(c[num] >= 4){
            c[num] = 4;
            alert("图片张数已达最大值5张");
            return;
        }
        var d = c[num] + 1;
        alert("现共有" + d + "张图片");            
    })
    $(".tab_wrap").eq(tpp).find(".minus").on("click",function(){
        var num = parseInt($(this).parent().attr("data-id"));
        c[num]--;
        if(c[num] <= 1){
            c[num] = 1;
            alert("图片张数已达最小值2张");
            return;
        }
        var d = c[num] + 1;
        alert("现共有" + d + "张图片");        
    })
    $(".tab_wrap").eq(tpp).find(".del").on("click",function(){
        tpp--;
        $(this).parent().remove();
        console.log("tpp",tpp);
    })   
}

$(".create .forth").on("click",function(e){
    tpp++;
    console.log("tpp",tpp);
    create_tab();
    e.stopPropagation();
}) 

function encodeUTF8(str){
var temp = "",rs = "";
for( var i=0 , len = str.length; i < len; i++ ){
    temp = str.charCodeAt(i).toString(16);
    rs  += "\\u"+ new Array(5-temp.length).join("0") + temp;
}
    return rs;
 }
 function decodeUTF8(str){
    return str.replace(/(\\u)(\w{4}|\w{2})/gi, function($0,$1,$2){
        return String.fromCharCode(parseInt($2,16));
    }); 
 }
 $(".save").on("click",function(){
    localStorage.removeItem("abc");
    var lens = $(".tab_wrap").length;
    console.log(lens);
    for(var i = 0;i <lens;i++){
        $(".tab_wrap").eq(i).attr("data-a",a[i]);
        $(".tab_wrap").eq(i).attr("data-b",b[i]);
        $(".tab_wrap").eq(i).attr("data-c",c[i]);
    }
    localStorage.setItem("abc",encodeUTF8($("#www").html()));
 })    



})