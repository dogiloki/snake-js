class Block{

    constructor(x,y,color="white"){
        this.x=x;
        this.y=y;
        this.color;
        this.orientation;
        this.container=Util.createElement("div",(element)=>{
            element.classList.add("block");
            element.setAttribute("x",this.x);
            element.setAttribute("y",this.y);
            return element;
        })
        this.setOrientation(Util.ORIENTATIONS.UP);
        this.setColor(color);
    }

    setOrientation(orientation){
        this.orientation=orientation;
    }

    setColor(color){
        this.color=color;
        this.container.style.background=this.color;
    }

}