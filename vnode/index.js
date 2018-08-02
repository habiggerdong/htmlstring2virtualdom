let selfClosure=['BR','HR ','AREA ','BASE ','IMG ','INPUT ','LINK ','META ','BASEFONT','PARAM','COL','FRAME','EMBED','KEYGEN','SOURCE']
//虚拟dom
class VNode{
    constructor(name,nodeType){
        if(typeof name!=='string'){
            return;
        }
        this.name=name.toUpperCase();
        this.nodeType=nodeType;
        this.attributes=[];
        this.childrens=[];
        this.parentNode=null;
        this.isSelfClosure=selfClosure.indexOf(this.name)>-1;
    }
    setAttribute(key,value){
        this.attributes.push({
            key:key,
            value:value
        })
    }
    addChildren(node){
        //渲染的时候需要根据顺序来渲染
        this.childrens.push(node);
    }
    render(){

    }
}

module.exports=VNode;