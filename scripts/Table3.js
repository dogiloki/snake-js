class Table{

    constructor({
        width=30,
        height=30,
        background="white",
        border_color="black",
        container=null
    }){
        this.width=width;
        this.height=height;
        this.background=background;
        this.border_color=border_color;
        this.container=container;
        this.blocks=[];
        this.snake;
        this.apple;
        this.create();
        this.restart();
    }

    events(){
        document.addEventListener('keyup',(evt)=>{
            switch(evt.key){
                case "ArrowUp": this.snake.changeOrientation(Util.ORIENTATIONS.UP); break;
                case "ArrowDown": this.snake.changeOrientation(Util.ORIENTATIONS.DOWN); break;
                case "ArrowLeft": this.snake.changeOrientation(Util.ORIENTATIONS.LEFT); break;
                case "ArrowRight": this.snake.changeOrientation(Util.ORIENTATIONS.RIGHT); break;
            }
        });
    }

    create(){
        this.container.style.border="1px solid "+this.border_color;
        for(let a=0; a<this.width; a++){
            let row=Util.createElement("div",(element)=>{
                element.classList.add("row");
                return element;
            });
            for(let b=0; b<this.height; b++){
                let column=Util.createElement("div",(element)=>{
                    element.classList.add("column");
                    return element;
                });
                let block=new Block({
                    x:a,
                    y:b,
                    color:this.background
                });
                this.blocks.push(block);
                column.appendChild(block.container);
                row.appendChild(column);
            }
            this.container.appendChild(row);
        }
        this.events();
    }

    restart(){
        this.snake=new Snake(this.blocks);
        this.render();
    }

    update(){
        this.blocks.forEach((block)=>{
            block.changeColor(this.background);
            this.snake.blocks.forEach((snake_block)=>{
                if(snake_block.x==block.x && snake_block.y==block.y){
                    block.changeColor(snake_block.color);
                    block.changeOrientation(this.snake.head.orientation);
                }
            });
            if(this.apple!=null && block.x==this.apple.x && block.y==this.apple.y){
                block.changeColor(this.apple.color);
            }
        });
        if(this.apple!=null && this.snake.head.x==this.apple.x && this.snake.head.y==this.apple.y){
            this.apple=null;
            this.snake.grow();
        }
    }

    render(){
        let intervale=setInterval(()=>{
            if(this.snake.head.x<0 || this.snake.head.x>=this.width ||
                this.snake.head.y<0 || this.snake.head.y>=this.height
            ){
                alert("FIN!!!");
                clearInterval(intervale);
            }else{
                this.generateApple();
                this.update();
                this.snake.move();
            }
        },100);
    }

    generateApple(){
        if(this.apple!=null){
            return;
        }
        let generate;
        do{
            generate=true;
            this.apple=new Block({
                x:Util.random(this.width),
                y:Util.random(this.height),
                color:"red"
            });
            this.snake.blocks.forEach((snake_block)=>{
                if(snake_block.x==this.apple.x && snake_block.y==this.apple.y){
                    generate=false;
                }
            });
        }while(!generate);
    }

}