let htmlStr = '<div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div>';

//需要的正则表达式
//拿到一个标签起始
let startIndex = 0;
let endIndex = 0;
function htmlParse(htmlStr) {
    //做一些html清理工作，保证循环的时候是一个干净的html字符串
    if (typeof htmlStr !== 'string') {
        return
    }
    //字符串被截取为空
    let startCharacter = htmlStr.charAt(0);
    if (startCharacter !== '<') {
        return;
    }
    //截取字符串
    // htmlStr=htmlStr.slice(1);
    // return htmlStr
    startIndex = 1;

    //找到一个完整的字符串头
    while (htmlStr) {
        //判断是不是<开头，如果不是并且index为0  那么这个就不是一个合法的字符串
        // if(startIndex==0&&htmlStr[startIndex]){

        // }
        //分为三种情况
        // 第一种<开头
        // 第二种不是<开头
        //
        if (startCharacter === '<') {
            htmlStr = htmlStr.slice(startIndex);
            startIndex = 0;
            //寻找下一个<
            //通过indexof找到
            endIndex = htmlStr.indexOf('<');
            endIndex = htmlStr.lastIndexOf('>', endIndex);
            //找到一个完整的字符串头
             parseHtmlElement(htmlStr.slice(startIndex, endIndex))
             //截取字符串

             htmlStr=htmlStr(endIndex+1);
        }


    }
}


function parseHtmlElement(htmlStr){
    //正则表达式匹配元素名称属性的key  value
}

console.log(htmlParse(htmlStr));
