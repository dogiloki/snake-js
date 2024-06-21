class Snake{

    constructor(head,color="green"){
        let block=new Block(head.x,head.y,head.color);
        this.blocks=[block];
        this.color=color;
        this.head=block;
        this.queue=block;
        this.way=[];
    }

    setOrientation(orientation){
        switch(this.head.orientation){
            case Util.ORIENTATIONS.UP:{
                if(orientation==Util.ORIENTATIONS.DOWN){
                    return;
                }
                break;
            }
            case Util.ORIENTATIONS.DOWW:{
                if(orientation==Util.ORIENTATIONS.UP){
                    return;
                }
                break;
            }
            case Util.ORIENTATIONS.LEFT:{
                if(orientation==Util.ORIENTATIONS.RIGHT){
                    return;
                }
                break;
            }
            case Util.ORIENTATIONS.RIGHT:{
                if(orientation==Util.ORIENTATIONS.LEFT){
                    return;
                }
                break;
            }
        }
        this.head.orientation=orientation;
        this.way.push({
            x:this.head.x,
            y:this.head.y,
            orientation:this.head.orientation,
            delete:false
        });
    }

    life(){
        this.blocks.forEach((block)=>{
            this.way.forEach((coords)=>{
                if(!coords.delete){
                    if(coords.x==block.x && coords.y==block.y){
                        block.orientation=coords.orientation;        
                        if(block==this.queue){
                            coords.delete=true;
                        }
                    }
                }
            });
            switch(block.orientation){
                case Util.ORIENTATIONS.UP:{
                    block.x-=1;
                    break;
                }
                case Util.ORIENTATIONS.DOWN:{
                    block.x+=1;
                    break;
                }
                case Util.ORIENTATIONS.LEFT:{
                    block.y-=1;
                    break;
                }
                case Util.ORIENTATIONS.RIGHT:{
                    block.y+=1;
                    break;
                }
            }
        });
    }

    grow(){
        let block=new Block(this.queue.x,this.queue.y,this.queue.color);
        switch(this.queue.orientation){
            case Util.ORIENTATIONS.UP:{
                block.x+=1;
                break;
            }
            case Util.ORIENTATIONS.DOWN:{
                block.x-=1;
                break;
            }
            case Util.ORIENTATIONS.LEFT:{
                block.y+=1;
                break;
            }
            case Util.ORIENTATIONS.RIGHT:{
                block.y-=1;
                break;
            }
        }
        block.setOrientation(this.queue.orientation);
        this.blocks.push(block);
        this.queue=block;
    }

}