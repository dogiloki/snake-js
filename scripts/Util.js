class Util{

    static ORIENTATIONS=Object.freeze({
        UP:"UP",
        DOWN:"DOWN",
        LEFT:"LEFT",
        RIGHT:"RIGHT"
    });

    static createElement(name,action=null){
        let element=document.createElement(name);
        return action==null?element:action(element);
    }

    static random(max){
        return Math.floor(Math.random()*max)+1;
    }

}