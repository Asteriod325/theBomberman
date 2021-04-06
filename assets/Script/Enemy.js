//敌人 自动移动
cc.Class({
    extends: cc.Component,

    properties: {
    },

    start () {
      this.tilePos=this.map.tilePos;
   },   
  
      onLoad(){
        this.enemyDir=1;    

         
   
    },
    RandomNum() {
    var Range=3;
    var Rand=Math.random();
    var num=1+Math.round(Range*Rand);
    return num;

      },


   //32 32  /544 32
    //敌人的逻辑
     //帧调度剂，每一帧调用一次，一秒调用60次，dt:代表两次调用时间间隔
     update (dt) {
       
      //将敌人的世界坐标转换成坐标然后转换成瓦片坐标
     // cc.log(this.node.x,this.node.y);
      this.tile=cc.v2(this.node.x,576-this.node.y);
      this.enemyTile=this.getTilePos(this.tile); 
      let e=Math.abs(this.map.playerTile.x-this.enemyTile.x);
      let f=Math.abs(this.map.playerTile.y-this.enemyTile.y);
         //玩家和敌人接触了，则游戏结束
         if(e==0&&f==0)
         {
          cc.log("玩家和敌人相撞，游戏结束");
             //游戏结束
             this.map.gameOver();
         }
      //写敌人的自动移动  1 2 3 4   0-1
         //右边
       //  cc.log(this.enemyTile);
       if(this.enemyDir==1)
       {     
        
        let tilePos=cc.v2(this.enemyTile.x+1,this.enemyTile.y);
      if(this.node.x>544||this.node.x<0||this.node.y<32||this.node.y>544||this.map.mainLayer.getTileGIDAt(tilePos)||this.map.brickLayer.getTileGIDAt(tilePos)){
             this.enemyDir=this.RandomNum();      
      }else {  this.node.x++;     }
      }

     else  if(this.enemyDir==2)
       {     
      //  this.node.x--; 
        let tilePos=cc.v2(this.enemyTile.x,this.enemyTile.y);
        //cc.log("ans:"+tilePos); 
      if(this.node.x>544||this.node.x<0||this.node.y<32||this.node.y>544||this.map.mainLayer.getTileGIDAt(tilePos)||this.map.brickLayer.getTileGIDAt(tilePos)){
             this.enemyDir=this.RandomNum();         
      }else{ this.node.x--;}                    
     }
   else  if(this.enemyDir==3)
     {     
      //this.node.y++; 
      let tilePos=cc.v2(this.enemyTile.x,this.enemyTile.y);
    if(this.node.x>544||this.node.x<0||this.node.y<32||this.node.y>544||this.map.mainLayer.getTileGIDAt(tilePos)||this.map.brickLayer.getTileGIDAt(tilePos)){
           this.enemyDir=this.RandomNum();          
       }else{this.node.y++;}                    
    }
   else if(this.enemyDir==4)
    {     
      //this.node.y--; 
     let tilePos=cc.v2(this.enemyTile.x,this.enemyTile.y+1);
   if(this.node.x>544||this.node.x<0||this.node.y<32||this.node.y>544||this.map.mainLayer.getTileGIDAt(tilePos)||this.map.brickLayer.getTileGIDAt(tilePos)){
          this.enemyDir=this.RandomNum();          
   }else{   this.node.y--;}                    
  }
      
    this.map.enemyTile=this.enemyTile;
      
   },



//获取瓦片图的坐标
getTilePos(pos){
  let tileSize=this.map.map.getTileSize();
  let x=Math.floor(pos.x/tileSize.width);//tileSize.width:32
  let y=Math.floor(pos.y/tileSize.height);
 // cc.log(x,y)//
  return cc.v2(x,y);
},
});
