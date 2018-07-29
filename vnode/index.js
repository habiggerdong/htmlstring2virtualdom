
//虚拟dom
class VNode{
    constructor(name,nodeType){
        this.name=name;
        this.nodeType=nodeType;
        this.attributes=[];
        this.childrens=[];
        this.parentNode=null;
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