let htmlStr='<div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div>';

//匹配一个html标签开头部分
const matchBeginningElement=/^<(.)*[^<]/;

console.log(htmlStr.match(matchBeginningElement));