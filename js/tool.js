/* 
* @Author: Marte
* @Date:   2016-11-23 16:12:01
* @Last Modified by:   Marte
* @Last Modified time: 2016-12-01 10:57:33
*/

$(document).ready(function(){
    var flag = true;
    var flag_t = $(".wrap_text").length - 1;
    var flag_btn = $(".button_box").length - 1;
    var flag_i = $(".img_box").length - 1;
    var flag_b = true;
    function create_text(){
        flag_t++;
        var text = $('<div class = "wrap"></div>');
        text.html('<span class="tips"></span><span class = "del"></span><p class="edit_text">可编辑文本</p><span class="bac_col"><input type="color" value="#000000" class="bac_color"></span><span class = "nw"></span><span class = "ne"></span><span class = "sw"></span><span class = "se"></span><span class = "n"></span><span class = "e"></span><span class = "s"></span><span class = "w"></span>');
        text.appendTo($("body"));
        init();
    }
    function create_editor(selector){
        var editor = $('<div class="editor_box"></div>');
        editor.html('<div class ="bold"></div><div class="col"><input type="color" value="#000000" class="word_color"></div><div class = "italic"></div><div class="go_left"></div><div class="go_center"></div><div class="go_right"></div><div class = "font_size"><select class="fontsize"><option value="">10px</option><option value="">12px</option><option value="">16px</option><option value="">18px</option><option value="">24px</option><option value="">32px</option><option value="">48px</option></select></div><div class="font"><select class="font"><option value="">宋体,SimSun</option><option value="">微软雅黑,Microsoft YaHei</option><option value="">楷体,楷体_GB2312, SimKai</option><option value="">黑体, SimHei</option><option value="">隶书, SimLi</option><option value="">andale mono</option><option value="">arial, helvetica,sans-serif</option><option value="">arial black,avant garde</option><option value="">comic sans ms</option><option value="">impact,chicago</option><option value="">times new roman</option></select></div></div>');
        editor.appendTo(selector);
        //------------------------------------------ 改变文字的属性-------------------------------------------//
         $(".bold").on("mousedown",function(e){
                document.execCommand("Bold",false,null);                         
                e.stopPropagation();
         }) 
         $(".go_left").on("mousedown",function(e){
                $(this).parent().parent().parent().find(".edit_text").css({"text-align":"left"});                       
                e.stopPropagation();
         }) 
         $(".go_center").on("mousedown",function(e){
                $(this).parent().parent().parent().find(".edit_text").css({"text-align":"center"});                       
                e.stopPropagation();
         }) 
         $(".go_right").on("mousedown",function(e){
                $(this).parent().parent().parent().find(".edit_text").css({"text-align":"right"});                       
                e.stopPropagation();
         }) 
         $(".italic").on("mousedown",function(e){
                document.execCommand("Italic",false,null);                         
                e.stopPropagation();
         })   
         $(".word_color").change(function(e){
                var color = $(this).val();
                console.log(color);
                document.execCommand("ForeColor",false,color);                                                          
                e.stopPropagation();   
         })  
         $(".fontsize").on("change",function(e){
                var font = $(this).find("option:selected").get(0).index + 1;
                console.log(font);
                document.execCommand("FontSize",false,font);                                               
                e.stopPropagation();   
         })
         $(".font").change(function(e){
                var font = $(this).find("option:selected").text();
                console.log(font);
                document.execCommand("FontName",false,font);                                               
                e.stopPropagation();   
         }) 
    }
    function init(){
                direction();
                $(".wrap").hover(function(){
                    if(flag){
                        $(this).find(".tips").show();  
                        $(this).find(".del").show();
                        $(this).find(".bac_col").show();
                    } 
                        $(document).find(".wrap").find(".n").show();
                        $(document).find(".wrap").find(".w").show();
                        $(document).find(".wrap").find(".s").show();
                        $(document).find(".wrap").find(".e").show();
                        $(document).find(".wrap").find(".ne").show();
                        $(document).find(".wrap").find(".nw").show();
                        $(document).find(".wrap").find(".se").show();
                        $(document).find(".wrap").find(".sw").show();
                        $(document).find(".wrap").css({"border-color":"rgba(44,249,49,1)"});                               
                    },function(){
                        if(flag_b){
                            $(document).find(".tips").hide();  
                            $(document).find(".del").hide(); 
                            $(document).find(".bac_col").hide();
                            $(document).find(".wrap").css({"border-color":"rgba(122,122,122,0)"}); 
                            $(document).find(".wrap").find(".n").hide();
                            $(document).find(".wrap").find(".w").hide();
                            $(document).find(".wrap").find(".s").hide();
                            $(document).find(".wrap").find(".e").hide();
                            $(document).find(".wrap").find(".ne").hide();
                            $(document).find(".wrap").find(".nw").hide();
                            $(document).find(".wrap").find(".se").hide();
                            $(document).find(".wrap").find(".sw").hide();  
                        }
                })
                $(".wrap").on("click",function(e){
                    var e = e || window.event;
                    flag_b = false;
                    e.stopPropagation();
                })
                $(".wrap").eq(flag_t).find(".tips").on("click",function(e){
                    $(this).hide();
                    $(this).parent().find(".del").hide();
                    $(this).parent().find(".bac_col").hide();
                    create_editor($(this).parent());
                    $(this).parent().css({"cursor":"text"});
                    flag = false;
                    flag_b = false;
                    $(this).parent().find(".edit_text").attr("contenteditable",true);
                    e.stopPropagation();
                })
                $(".wrap").eq(flag_t).find(".del").on("click",function(e){
                    flag_t--;
                    $(this).parent().remove();
                    e.stopPropagation();
                })
                $(".wrap").find(".bac_color").change(function(){
                    $(this).parent().parent().css({"background-color":$(this).val()});
                })
                $(".wrap").on("mousedown",function(e){
                        var e = e || window.event;
                        e.stopPropagation(); 
                        var target = this;
                        var cc = $(this).find(".edit_text").eq(0).get(0).getAttribute("contenteditable");
                        if(cc != "true"){
                            remove_editor($(document));
                            flag = true; 
                            $(".wrap").css({"cursor":"move"});
                            $(".edit_text").attr("contenteditable",false);                       
                        }
                        disX = e.clientX - target.offsetLeft; //鼠标相对box边界偏移值
                        disY = e.clientY - target.offsetTop;  //鼠标相对box边界偏移值
                        document.onmousemove = function (e){
                             var e = e || window.event;  
                             if(flag){
                                target.style.left = (e.clientX - disX) + 'px';
                                target.style.top = (e.clientY - disY) + 'px';   
                                e.preventDefault();   
                             }                              
                        };  
                        document.onmouseup = function (){
                            document.onmousemove = null;  
                        };             
                })
    }

    function create_button(){
        flag_btn++;
        var text = $('<div class="button_box"></div>');
        text.html('<span class="tips"></span> <span class="del"></span> <span class="bac_col"><input type="color" value="#000000" class="bac_color"></span><a data-href="javascript:void(0);" class = "edit_text">按钮</a><span class = "nw"></span><span class = "ne"></span><span class = "sw"></span><span class = "se"></span><span class = "n"></span><span class = "e"></span><span class = "s"></span><span class = "w"></span>');
        text.appendTo($("#www"));
        init_button();       
    }    
    function create_button_editor(selector){
        var editor = $('<div class="editor_button"></div>');
        editor.html('<div class="bold"></div><div class="col"><input type="color" value="#000000" class="word_color"></div><div class="font_size"><select class="fontsize"><option value="">10px</option><option value="">12px</option><option value="">16px</option><option value="">18px</option><option value="">24px</option><option value="">32px</option><option value="">48px</option></select></div><div class="font"><select class="font"><option value="">宋体,SimSun</option><option value="">微软雅黑,Microsoft YaHei</option><option value="">楷体,楷体_GB2312, SimKai</option><option value="">黑体, SimHei</option><option value="">隶书, SimLi</option><option value="">andale mono</option><option value="">arial, helvetica,sans-serif</option><option value="">arial black,avant garde</option><option value="">comic sans ms</option><option value="">impact,chicago</option><option value="">times new roman</option></select></div><div class = "style"><select class="button_style"><option value="">样式一</option><option value="">样式二</option><option value="">样式三</option><option value="">样式四</option><option value="">样式五</option></select></div><div class = "style"><select class="button_width"><option value="">边框一</option><option value="">边框二</option><option value="">边框三</option><option value="">边框四</option><option value="">边框五</option></select></div><div class="col"><input type="color" value="#000000" class="border_color"></div><div class="link"></div>');
        editor.appendTo(selector);
        //------------------------------------------ 改变文字的属性-------------------------------------------//
         $(".bold").on("mousedown",function(e){
                document.execCommand("Bold",false,null);                         
                e.stopPropagation();
         })   
         $(".word_color").change(function(e){
                var color = $(this).val();
                console.log(color);
                document.execCommand("ForeColor",false,color);                                                          
                e.stopPropagation();   
         })  
         $(".fontsize").on("change",function(e){
                var font = $(this).find("option:selected").get(0).index + 1;
                console.log(font);
                document.execCommand("FontSize",false,font);                                               
                e.stopPropagation();   
         })
         $(".font").change(function(e){
                var font = $(this).find("option:selected").text();
                console.log(font);
                document.execCommand("FontName",false,font);                                               
                e.stopPropagation();   
         }) 
        $(".button_style").change(function(e){
            var font = $(this).find("option:selected").index();
            $(this).parent().parent().parent().find("a").css({"border-radius":5*font + "px"});                                            
            e.stopPropagation();   
        }) 
        $(".button_width").change(function(e){
            var font = $(this).find("option:selected").index();
            $(this).parent().parent().parent().find("a").css({"border-width":font + "px"});                                            
            e.stopPropagation();   
        }) 
        $(".border_color").change(function(e){
                var color = $(this).val();
                $(this).parent().parent().parent().find("a").css({"border-color":color});                    
         }) 
        $(".link").on("click",function(){
                console.log($(this).parent().parent());
                $(this).parent().parent().addClass('add');
                $(".link_list").show();
                $(".cover").show();
        }) 
    }
    function init_button(){
                direction_b();
                $(".button_box").on("click",function(e){
                    var e = e || window.event;
                    flag_b = false;
                    e.stopPropagation();
                })
                $(".button_box").hover(function(){
                    if(flag){
                        $(this).find(".tips").show();  
                        $(this).find(".del").show();
                        $(this).find(".bac_col").show();
                    }
                        $(this).find(".n").show();
                        $(this).find(".w").show();
                        $(this).find(".s").show();
                        $(this).find(".e").show();
                        $(this).find(".ne").show();
                        $(this).find(".nw").show();
                        $(this).find(".se").show();
                        $(this).find(".sw").show(); 
                        $(this).css({"border-color":"rgba(44,249,49,1)"});                               
                    },function(){
                        if(flag_b){
                            $(this).find(".tips").hide();  
                            $(this).find(".del").hide();
                            $(this).find(".bac_col").hide();
                            $(this).css({"border-color":"rgba(122,122,122,0)"});   
                            $(this).find(".n").hide();
                            $(this).find(".w").hide();
                            $(this).find(".s").hide();
                            $(this).find(".e").hide();
                            $(this).find(".ne").hide();
                            $(this).find(".nw").hide();
                            $(this).find(".se").hide();
                            $(this).find(".sw").hide();  
                        }
                })
                $(".button_box").eq(flag_btn).find(".tips").on("click",function(e){
                    $(this).hide();
                    $(this).parent().find(".del").hide();
                    $(this).parent().find(".bac_col").hide();
                    $(this).parent().find(".style").hide();
                    create_button_editor($(this).parent());
                    $(this).parent().css({"cursor":"text"});
                    flag = false;
                    $(this).parent().find(".edit_text").attr("contenteditable",true);
                    e.stopPropagation();
                })
                $(".button_box").eq(flag_btn).find(".del").on("click",function(e){
                    flag_btn--;
                    $(this).parent().remove();
                    e.stopPropagation();
                })
                $(".bac_color").change(function(e){
                    var color = $(this).val();
                    $(this).parent().parent().find("a").css({"background-color":color});
                }) 
                $(".button_box").on("mousedown",function(e){
                        var e = e || window.event;
                        e.stopPropagation(); 
                        var target = this;
                        var cc = $(this).find(".edit_text").eq(0).get(0).getAttribute("contenteditable");
                        console.log(123,cc);
                        if(cc != "true"){
                            remove_editor($(document));
                            flag = true; 
                            $(target).css({"cursor":"move"});
                            $(".edit_text").attr("contenteditable",false);                       
                        }
                        disX = e.clientX - target.offsetLeft; //鼠标相对box边界偏移值
                        disY = e.clientY - target.offsetTop;  //鼠标相对box边界偏移值
                        document.onmousemove = function (e){
                             var e = e || window.event;  
                             if(flag){
                                target.style.left = (e.clientX - disX) + 'px';
                                target.style.top = (e.clientY - disY) + 'px';   
                                e.preventDefault();   
                             }                              
                        };  
                        document.onmouseup = function (){
                            document.onmousemove = null;  
                        };             
                })
    }

    function create_img(){
        var text = $('<div class = "img_box"></div>');
        text.html('<span class="tips"></span><span class = "del"></span></span><span class = "nw"></span><span class = "ne"></span><span class = "sw"></span><span class = "se"></span><span class = "n"></span><span class = "e"></span><span class = "s"></span><span class = "w"></span>');
        text.appendTo($("body"));
        init_img();
    } 
    function init_img(){
                direction();
                $(".img_box").hover(function(){
                    if(flag){
                        $(this).find(".tips").show();  
                        $(this).find(".del").show();
                    } 
                        $(this).find(".n").show();
                        $(this).find(".w").show();
                        $(this).find(".s").show();
                        $(this).find(".e").show();
                        $(this).find(".ne").show();
                        $(this).find(".nw").show();
                        $(this).find(".se").show();
                        $(this).find(".sw").show();
                    $(this).css({"border-color":"rgba(44,249,49,1)"});                                
                    },function(){
                        if(flag_b){
                        $(this).find(".tips").hide();  
                        $(this).find(".del").hide();   
                        $(this).css({"border-color":"rgba(44,249,49,0)"}); 
                        $(this).find(".n").hide();
                        $(this).find(".w").hide();
                        $(this).find(".s").hide();
                        $(this).find(".e").hide();
                        $(this).find(".ne").hide();
                        $(this).find(".nw").hide();
                        $(this).find(".se").hide();
                        $(this).find(".sw").hide();  
                        }
                }) 
                $(".img_box").on("click",function(e){
                    var e = e || window.event;
                    flag_b = false;
                    e.stopPropagation();
                }) 
                $(".img_box .tips").on("click",function(e){
                    alert("更换图片");
                })
                $(".img_box .del").on("click",function(e){
                    $(this).parent().remove();
                    e.stopPropagation();
                })  
                $(".img_box").on("mousedown",function(e){
                        var e = e || window.event;
                        remove_editor($(document));
                        flag = true; 
                        $(".wrap").css({"cursor":"move"});
                        $(".edit_text").attr("contenteditable",false);
                        e.stopPropagation(); 
                        var target = this;
                        disX = e.clientX - target.offsetLeft; //鼠标相对box边界偏移值
                        disY = e.clientY - target.offsetTop;  //鼠标相对box边界偏移值
                        document.onmousemove = function (e){
                             var e = e || window.event;  
                             if(flag){
                                target.style.left = (e.clientX - disX) + 'px';
                                target.style.top = (e.clientY - disY) + 'px';   
                                e.preventDefault();   
                             }                              
                        };  
                        document.onmouseup = function (){
                            document.onmousemove = null;  
                            flag_b = true;
                        };             
                }) 
    }
    function direction(){
                $(".e").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        console.log(flag_b);
                        disX = e.clientX;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            if(a >= 100){
                                target.parentNode.style.width = a + "px";
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});
                                $(target).css({"left":(a - 3) + "px"});
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".w").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disX = e.clientX;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            if(a >= 100){
                                target.parentNode.style.width = a + "px";
                                $(target).parent().css({"left": + divpos.left + changeX + "px"});
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".n").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.height - changeY ;//当前元素的宽高加上改变量
                            if(a >= 50){
                                target.parentNode.style.height = a + "px";
                                $(target).parent().css({"top": + divpos.top + changeY + "px"});
                                $(target).parent().find(".w").css({"top":(a/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(a/2 - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".s").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.height + changeY ;//当前元素的宽高加上改变量
                            if(a >= 50){
                                target.parentNode.style.height = a + "px";
                                $(target).parent().find(".w").css({"top":(a/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(a/2 - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".se").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height + changeY; 
                            if(a >= 100 && b >=50){
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});   
                            }                            
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".ne").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height - changeY; 
                            if(a >= 100 && b >=50){
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.top = divpos.top + changeY + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".sw").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height + changeY; 
                            if(a >= 100 && b >=50){
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.left = divpos.left + changeX + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".nw").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height - changeY; 
                            if(a >= 100 && b >=50){
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.left = divpos.left + changeX + "px";
                                target.parentNode.style.top = divpos.top + changeY + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
    }
    function direction_b(){
                $(".e").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        console.log(flag_b);
                        disX = e.clientX;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            if(a >= 100){
                                target.parentNode.style.width = a + "px";
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});
                                $(target).css({"left":(a - 3) + "px"});
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".w").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disX = e.clientX;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            if(a >= 100){
                                target.parentNode.style.width = a + "px";
                                $(target).parent().css({"left": + divpos.left + changeX + "px"});
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".n").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.height - changeY ;//当前元素的宽高加上改变量
                            if(a >= 50){
                                $(target).parent().find("a").css({"line-height":a + "px"});
                                target.parentNode.style.height = a + "px";
                                $(target).parent().css({"top": + divpos.top + changeY + "px"});
                                $(target).parent().find(".w").css({"top":(a/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(a/2 - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".s").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.height + changeY ;//当前元素的宽高加上改变量
                            if(a >= 50){
                                $(target).parent().find("a").css({"line-height":a + "px"});
                                target.parentNode.style.height = a + "px";
                                $(target).parent().find(".w").css({"top":(a/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(a/2 - 3) + "px"});                                
                            }
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".se").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height + changeY; 
                            if(a >= 100 && b >=50){
                                $(target).parent().find("a").css({"line-height":b + "px"});
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});   
                            }                            
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".ne").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width + changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height - changeY; 
                            if(a >= 100 && b >=50){
                                $(target).parent().find("a").css({"line-height":b + "px"});
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.top = divpos.top + changeY + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".sw").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height + changeY; 
                            if(a >= 100 && b >=50){
                                $(target).parent().find("a").css({"line-height":b + "px"});
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.left = divpos.left + changeX + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
                $(".nw").on("mousedown",function(e){
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        flag_b = false;
                        disY = e.clientY;//获取当前光标的位置
                        disX = e.clientX;
                        var divpos = target.parentNode.getBoundingClientRect();//获取当前元素的宽高
                        document.onmousemove = function(e){
                            var e = e || window.event;
                            changeX = e.clientX - disX;
                            changeY = e.clientY - disY;//获取光标位置的改变量
                            var a = divpos.width - changeX ;//当前元素的宽高加上改变量
                            var b = divpos.height - changeY; 
                            if(a >= 100 && b >=50){
                                $(target).parent().find("a").css({"line-height":b + "px"});
                                target.parentNode.style.width = a + "px";
                                target.parentNode.style.height = b + "px";
                                target.parentNode.style.left = divpos.left + changeX + "px";
                                target.parentNode.style.top = divpos.top + changeY + "px";
                                $(target).parent().find(".w").css({"top":(b/2 - 3) + "px"});
                                $(target).parent().find(".e").css({"top":(b/2 - 3) + "px"});  
                                $(target).parent().find(".e").css({"left":(a - 3) + "px"});     
                                $(target).parent().find(".n").css({"left":(a/2 - 3) + "px"});   
                                $(target).parent().find(".s").css({"left":(a/2 - 3) + "px"});    
                            }                           
                            e.preventDefault();
                        } 
                        document.onmouseup = function (){
                            document.onmousemove = null; 
                            flag_b = true;
                        };  
                        e.stopPropagation();             
                })
    }
    function remove_editor(selector){
        selector.find(".editor_box").remove();
        selector.find(".editor_button").remove();
    }
    $(".create .first").on("click",function(e){
        create_text();
        e.stopPropagation();
    })
    $(".create .second").on("click",function(e){
        create_img();
        e.stopPropagation();
    }) 
    $(".create .third").on("click",function(e){
        create_button();
        e.stopPropagation();
    })           
    $(document).on("mousedown",function(){
        var txt = document.getSelection();
        if(txt.toString().length > 0){
            return;
        }
        else{
            remove_editor($(document));
            flag = true; 
            $(".wrap").css({"cursor":"move"});
            $(".edit_text").attr("contenteditable",false);
        }
    })
    $(document).on("mouseup",function(){
        flag_b = true;
    })


});