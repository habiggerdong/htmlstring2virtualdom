let selfClosure=['BR','HR ','AREA ','BASE ','IMG ','INPUT ','LINK ','META ','BASEFONT','PARAM','COL','FRAME','EMBED','KEYGEN','SOURCE']
//虚拟dom
class VNode{
    constructor(){
        this.name=null;
        this.nodeType=null;
        this.attributes=[];
        this.childrens=[];
        this.parentNode=null;
       
    }
    setElementName(name,nodeType){
        if(typeof name!=='string'){
            return;
        }
        this.name=name.toUpperCase();
        this.isSelfClosure=selfClosure.indexOf(this.name)>-1;
        this.nodeType=nodeType;
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

//此处需要分离

module.exports=VNode;