let htmlStr='<div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div>';

<<<<<<< HEAD
//需要的正则表达式
//拿到一个标签起始

function htmlParse(htmlStr){
    //做一些html清理工作，保证循环的时候是一个干净的html字符串
    //字符串被截取为空
    while(htmlStr){
        
    }
}
=======
//匹配一个html标签开头部分
const matchBeginningElement=/^<(.)*[^<]/;

console.log(htmlStr.match(matchBeginningElement));
>>>>>>> d7ca002e1e892513319fba6741c63fc627c6b03e
