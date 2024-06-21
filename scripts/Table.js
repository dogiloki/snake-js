class Table{

    constructor({
        width=30,
        height=30,
        background="#f5f5f5",
        border="black",
        container_table=document.getElementById("table"),
        container_score=document.getElementById("score")
    }={}){
        this.intervale;
        this.width=width;
        this.height=height;
        this.background=background;
        this.border=border;
        this.blocks=[];
        this.snake=null;
        this.score=null;
        this.apple=null;
        this.container_table=container_table;
        this.container_score=container_score;
        this.create();
        this.restart();
    }

    events(){
        document.addEventListener('keydown',(evt)=>{
            this.changeOrientation(evt.key);
        });
        document.getElementById('btn-up').addEventListener('click',(evt)=>{
            this.changeOrientation('ArrowUp');
        });
        document.getElementById('btn-down').addEventListener('click',(evt)=>{
            this.changeOrientation('ArrowDown');
        });
        document.getElementById('btn-left').addEventListener('click',(evt)=>{
            this.changeOrientation('ArrowLeft');
        });
        document.getElementById('btn-right').addEventListener('click',(evt)=>{
            this.changeOrientation('ArrowRight');
        });
    }

    changeOrientation(key){
        switch(key){
            case "ArrowUp": this.snake.setOrientation(Util.ORIENTATIONS.UP); break;
            case "ArrowDown": this.snake.setOrientation(Util.ORIENTATIONS.DOWN); break;
            case "ArrowLeft": this.snake.setOrientation(Util.ORIENTATIONS.LEFT); break;
            case "ArrowRight": this.snake.setOrientation(Util.ORIENTATIONS.RIGHT); break;
        }
    }

    create(){
        this.container_table.style.border="1px solid "+this.border;
        this.container_table.style.background=this.background;
        for(let a=0; a<this.width; a++){
            let row=Util.createElement("div",(element)=>{
                element.classList.add("row");
                return element;
            });
            for(let b=0; b<this.height; b++){
                let block=new Block(a,b,this.background);
                this.blocks.push(block);
                row.appendChild(block.container);
            }
            this.container_table.appendChild(row);
        }
        this.events();
    }

    restart(){
        this.snake=new Snake(this.blocks[Util.random(this.width*this.height)]);
        this.setScore(0);
        this.render();
    }

    setScore(score){
        this.score=score;
        this.container_score.textContent="Puntaje: "+this.score;
    }

    update(){
        this.blocks.forEach((block)=>{
            block.setColor(this.background);
            this.snake.blocks.forEach((snake_block)=>{
                if(snake_block.x==block.x && snake_block.y==block.y){
                    block.setColor(this.snake.color);
                }
            });
            if(this.apple!=null && block.x==this.apple.x && block.y==this.apple.y){
                block.setColor(this.apple.color);
            }
        });
        if(this.apple!=null && this.snake.head.x==this.apple.x && this.snake.head.y==this.apple.y){
            this.apple=null;
            this.setScore(this.score+1);
            this.snake.grow();
        }
    }

    render(){
        clearInterval(this.intervale);
        this.intervale=setInterval(()=>{
            this.generateApple();
            if(this.snake.head.x<0 || this.snake.head.x>=this.width ||
                this.snake.head.y<0 || this.snake.head.y>=this.height
            ){
                clearInterval(this.intervale);
                alert("Tu puntaje fue: "+this.score);
                this.restart();
            }else{
                this.update();
                this.snake.life();
            }
        },120);
    }

    generateApple(){
        if(this.apple!=null){
            return;
        }
        let generate;
        do{
            generate=true;
            this.apple=new Block(Util.random(this.width-1),Util.random(this.height-1),"red");
            this.snake.blocks.forEach((snake_block)=>{
                if(snake_block.x==this.apple.x && snake_block.y==this.apple.y){
                    generate=false;
                }
            });
        }while(!generate);
    }

}