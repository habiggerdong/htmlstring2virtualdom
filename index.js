let htmlStr = '<div class="toolbar"><span></span></div>';
let VNode = require('./vnode');
//需要的正则表达式
//拿到一个标签起始
let startIndex = 0;
let endIndex = 0;
let elementStack = [];//确认元素是否闭合的栈
let vNode = new VNode();
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
            if(endIndex===-1){
                htmlStr="";
                return;
            }
            htmlStr = htmlStr.slice(endIndex + 1);
        }
        //认为匹配到了内容
        if (startCharacter !== '<') {
            startIndex = 0;
            endIndex = htmlStr.indexOf('<');
            parseTextElement(htmlStr.slice(startIndex, endIndex));
            htmlStr = htmlStr.slice(endIndex);
        }
        startCharacter = htmlStr.charAt(0);
        startIndex = 1;


    }

    return vNode;
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
    let start = elementStack[elementStack.length-1];
    start = start ? start : null;
    
    
    if (endTag) {
        //上一个元素名称如果不相同忽略此次匹配
        //如果闭合出栈
        if(!start){
            return;
        }
        if (start.name !== elementName) {
            return;
        }

        return elementStack.pop();
    }
    if (!start) {
        vNode.setElementName
    }
    let _vNode = null;
    //替换掉元素，剩下属性
    htmlStr = htmlStr.replace(cname, '');
    //dom结点
    _vNode = new VNode(elementName, 1);
    _vNode.parentNode = start;
    start.addChildren(_vNode);
    if (!_vNode.isSelfClosure) {
        elementStack.push(_vNode);
    }

    //解析
    parseAttrbute(_vNode, htmlStr)

    // return vNode;


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
        vNode.setAttribute(element, null);
    });
}

function parseTextElement(textStr) {
    //拿到父节点
    let parentNode = elementStack[elementStack.length];
    let textNode = new VNode(textStr, 3)
    parentNode.addChildren(textNode);

}

// console.log("adasdasdasd asdasdasd asdasd fggdf".match(attriBute));
// console.log(" / name".match(cname));

// console.log("adasdasdasd asdasdasd asdasd fggdf".split(/\s+/));
console.log(htmlParse(htmlStr))


//需要解决的问题  Vnode和解析分离