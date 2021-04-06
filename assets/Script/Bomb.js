cc.Class({
    extends: cc.Component,

    properties: {
       
    },
    onFinishBomb(){
        cc.log("爆炸了");
        //cc.log(this.player.map.map.node.children[6].enemyDir);

        this.node.parent.emit("onFinishBomb");  
        
        if(this.player.map.brickLayer.getTileGIDAt(this.tilePos.x-1,this.tilePos.y))
        {
            this.player.map.brickLayer.setTileGIDAt(0,this.tilePos.x-1,this.tilePos.y)
        }
        if(this.player.map.brickLayer.getTileGIDAt(this.tilePos.x+1,this.tilePos.y))
        {
            this.player.map.brickLayer.setTileGIDAt(0,this.tilePos.x+1,this.tilePos.y)
        }
        if(this.player.map.brickLayer.getTileGIDAt(this.tilePos.x,this.tilePos.y-1))
        {
            this.player.map.brickLayer.setTileGIDAt(0,this.tilePos.x,this.tilePos.y-1)
        }
        if(this.player.map.brickLayer.getTileGIDAt(this.tilePos.x,this.tilePos.y+1))
        {
            this.player.map.brickLayer.setTileGIDAt(0,this.tilePos.x,this.tilePos.y+1)
        }

       // this.mainLayer.node.removeChild(this.comp.bomb);

        

       //检测玩家和炸弹有没有相撞
        let a=Math.abs(this.player.map.playerTile.x-this.tilePos.x);
        let b=Math.abs(this.player.map.playerTile.y-this.tilePos.y);
         //炸弹的上下左右有一个方向有玩家的话
        if((a==0&&b==1)||(a==1&&b==0)||(a==0&&b==0))
        {
            //游戏结束
            this.player.map.gameOver();
        }

          //把炸了的炸弹去除
        this.player.map.mainLayer.node.removeChild(this.node);


    },  
    // LIFE-CYCLE CALLBACKS:

     onLoad () {
         
         let anim=this.getComponent(cc.Animation);
         anim.play();
     },

    start () {
        this.tilePos=this.player.tilePos;
    },
    //获取瓦片图的坐标
   getTilePos(pos){
    let mapSize=this.map.getMapSize();
    let tileSize=this.map.getTileSize();
    let x=Math.floor(pos.x/tileSize.width);//tileSize.width:32
    let y=Math.floor(pos.y/tileSize.height);
    cc.log(x,y)//1,1
    return cc.v2(x,y);
},

    // update (dt) {},
});
