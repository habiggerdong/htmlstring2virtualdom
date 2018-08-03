let htmlStr = '<div class="toolbar"><span><a href="#" class="toolbar_item command_help help">?</a></span></div>';
let VNode = require('./vnode');
//需要的正则表达式
//拿到一个标签起始
let startIndex = 0;
let endIndex = 0;
let elementStack = [];//确认元素是否闭合的栈
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

            htmlStr = htmlStr(endIndex + 1);
        }


    }
}
// 
// const matchElementNameAttribute=/(\w+)\s*(?:\s*((\w+)\s*(=)\s*("([^<>\s""]*)"|([^<>\s""]*)|'([^<>\s'']*)')))/
const attriBute = /\s*((\w+)\s*(=)\s*("([^<>\s""]*)"|([^<>\s""]*)|'([^<>\s'']*)'))/
const cname = /\s*(\/?)\s*(\w+)/
function parseHtmlElement(htmlStr) {
    //正则表达式匹配元素名称属性的key  value
    // div class="toolbar"
    //匹配元素名称
    let matchElementName = htmlStr.match(cname);
    if (!matchElementName) {
        return;
    }
    let elementName = matchElementName[2];
    let endTag = matchElementName[1];
    if (typeof elementName !== 'string') {
        return;
    }
    elementName = elementName.toUpperCase();
    let start = elementStack[elementStack.length];
    let vNode = null;
    if (endTag) {
        //上一个元素名称如果不相同忽略此次匹配
        if (elementStack.length == 0) {
            return;
        }


        //如果闭合出栈
        if (start.name !== elementName) {
            return;
        }
        elementStack.pop();
        return;
    }

    //替换掉元素，剩下属性
    htmlStr = htmlStr.replace(cname, '');
    //dom结点
    vNode = new VNode(elementName, 1);
    vNode.parentNode = start;
    start.addChildren(vNode)
    if (!vNode.isSelfClosure) {
        elementStack.push(vNode);
    }

    //解析
    parseAttrbute(vNode, )


}



function parseAttrbute(vNode, attrStr) {
    let matchs = attrStr.match(attriBute);
    while (matchs) {
        vNode.setAttribute(matchs[2], matchs[4]);
        attrStr = attrStr.replace(attriBute, '');
        matchs = attrStr.match(attriBute);
    }

    //剩下单个属性
    if (!attrStr) {
        return;
    }

    let attrStrArray = attrStr.split(/\s+/);

    attrStrArray.forEach(element => {
        vNode.setAttribute(element,null);
    });
}

// console.log("adasdasdasd asdasdasd asdasd fggdf".match(attriBute));
// console.log(" / name".match(cname));

console.log("adasdasdasd asdasdasd asdasd fggdf".split(/\s+/));
