cc.Class({
    extends: cc.Component,
    properties: {
       //地图
    map:{
        default:null ,
        type:cc.TiledMap,
    },
    //玩家预制体
    playerPrefab:{
        default:null,
        type:cc.Prefab,
    },
    //敌人预制体
    enemyPrefab:{
        default:null,
        type:cc.Prefab,
    },
     //炸弹预制体
     bombPrefab:{
        default:null,
        type:cc.Prefab,
    },
    //map下的objects
    objectGroup:{
        default:null,
        type:cc.TiledObjectGroup
    },
    //map下的main墙
    mainLayer:{ 
        default:null,
        type:cc.TiledLayer
    },
    //main下的障碍物墙
    brickLayer:{
        default:null,
        type:cc.TiledLayer
    },
         //背景音效
    bgAudio:{type:cc.AudioClip, default:null},
    //游戏结束的红色提示game over
    gameOverNode:{
     type:cc.Node,
     default:null
    },
    //游戏赢了的红色提示YOU WIN!
    gameWinNode:{
    type:cc.Node,
    default:null
    },
     //游戏开始的红色提示game over
    btnStartNode:{
        type:cc.Node,
        default:null
    },
    musicOn:{
        type:cc.Node,
        default:null
    },
    
    musicOff:{
        type:cc.Node,
        default:null
    },
     
},
start(){
    this.isrunning=false;
},
onLoad(){

    //this.loadMap();
     
    this.mainLayer.node.on("onFinishBomb",()=>{ 
        cc.log(this);
        cc.log("*******把炸弹销毁了*****");

           
            let enemyTile=this.enemy.getComponent("Enemy").enemyTile;  
           //炸弹和敌人有没有相撞
           let c=Math.abs(enemyTile.x-this.comp.tilePos.x);
           let d=Math.abs(enemyTile.y-this.comp.tilePos.y);
            //炸弹的上下左右有一个方向有敌人的话
           if((c==0&&d==1)||(c==1&&d==0)||(c==0&&d==0))
           {   
               cc.log("敌人death");
               //移除敌人
               this.map.node.removeChild(this.enemy);
           }

           
      //  cc.log(this.comp);

        //   if(this.brickLayer.getTileGIDAt(this.comp.tilePos.x-1,this.comp.tilePos.y))
        //   {
        //       this.brickLayer.setTileGIDAt(0,this.comp.tilePos.x-1,this.comp.tilePos.y)
        //   }
        //   if(this.brickLayer.getTileGIDAt(this.comp.tilePos.x+1,this.comp.tilePos.y))
        //   {
        //       this.brickLayer.setTileGIDAt(0,this.comp.tilePos.x+1,this.comp.tilePos.y)
        //   }
        //   if(this.brickLayer.getTileGIDAt(this.comp.tilePos.x,this.comp.tilePos.y-1))
        //   {
        //       this.brickLayer.setTileGIDAt(0,this.comp.tilePos.x,this.comp.tilePos.y-1)
        //   }
        //   if(this.brickLayer.getTileGIDAt(this.comp.tilePos.x,this.comp.tilePos.y+1))
        //   {
        //       this.brickLayer.setTileGIDAt(0,this.comp.tilePos.x,this.comp.tilePos.y+1)
        //   }

        //   this.mainLayer.node.removeChild(this.comp.bomb);

          
        //   let a=Math.abs(this.playerTile.x-this.comp.tilePos.x);
        //   let b=Math.abs(this.playerTile.y-this.comp.tilePos.y);
        //    //炸弹的上下左右有一个方向有玩家的话
        //   if((a==0&&b==1)||(a==1&&b==0)||(a==0&&b==0))
        //   {
        //       //游戏结束
        //       this.gameOver();
        //   }

        

      
      })
     
},
//打开声音
turnOn(){
 
//关掉背景音乐
cc.audioEngine.stopAll();
//把播放声音的图标藏起来
this.musicOff.active=true;
this.musicOn.active=false;   
},
//关掉声音
turnOff(){
 //播放背景音乐
 cc.audioEngine.playMusic(this.bgAudio,true); 
 //把静音的图标藏起来
 this.musicOff.active=false;
 this.musicOn.active=true;
  
},


loadMap(){
        
    let objects=this.map.getObjectGroup('object').getObjects();
     cc.log(objects);    //player enemy
     objects.forEach(item=> {
       if(item.type==0){
           //玩家
           this.playerGenerate(item);
       }else if(item.type==1){
           
           this.enemyGenerate(item);
       }
     });

},
//游戏开始
onstartGame(){
    this.loadMap();
   this.isrunning=true;
    //播放背景音乐
   cc.audioEngine.playMusic(this.bgAudio,true); 
   //把开始按钮挪走
   this.btnStartNode.x=3000;
   //把GAMEOVER提示板隐藏
   this.gameOverNode.active=false;
    //把YOU WIN!提示板隐藏
   this.gameWinNode.active=false;
},
//游戏结束
gameOver(){
//停止所有的敌人和玩家动作
//游戏结束停止背景音乐+把gameover提示+重新加载场景

cc.audioEngine.stopAll();
this.gameOverNode.active=true;
this.scheduleOnce(function(){
//重新加载场景
cc.director.loadScene("helloworld");
},3);

},
gameWin(){
 //游戏胜利
 //停止所有的敌人和玩家动作
  //游戏胜利停止背景音乐+把gameWin提示+重新加载场景
   cc.audioEngine.stopAll();
   this.gameWinNode.active=true;
    this.scheduleOnce(function(){
    //重新加载场景
    cc.director.loadScene("helloworld");
     },3) ;
},

//生成玩家
playerGenerate(item){
   var player=cc.instantiate(this.playerPrefab);
   //this.objectGroup.node.addChild(player);
   this.map.node.addChild(player);
   cc.log(item);
   //获取坐标
   
   let pos=cc.v2(item.offset.x,item.offset.y);// 32 32 
   //玩家的瓦片坐标
    this.playerTile=this.getTilePos(pos);//1,1
   cc.log("player像素坐标："+pos);    //player像素坐标：(32.00, 32.00)
   cc.log("player瓦片坐标："+this.playerTile);//player瓦片坐标：(1.00, 1.00)

   player.getComponent("Player").map = this;
   
   
   this.comp=player.getComponent("Player");
   


    let worldpos=this.mainLayer.getPositionAt(this.playerTile);//1,1
   if(worldpos){
   player.setPosition(worldpos);
   }
  cc.log("player世界坐标："+worldpos);//player世界坐标：(32.00, 544.00)
 
  
  
 
},

//生成敌人 
enemyGenerate(item){

    let enemy=cc.instantiate(this.enemyPrefab);
    //this.objectGroup.node.addChild(enemy);
    this.map.node.addChild(enemy);
    cc.log(item);
    //获取坐标
    let pos=cc.v2(item.offset.x,item.offset.y);
    let enemyTile=this.getTilePos(pos);
     cc.log("enemy像素坐标："+pos);//enemy像素坐标：(32.00, 544.00)      (544.00, 544.00)
    cc.log("enemy瓦片坐标："+enemyTile);//enemy瓦片坐标：(1.00, 17.00)   (17.00, 17.00)
    let worldpos=this.mainLayer.getPositionAt(enemyTile);
    enemy.setPosition(worldpos);
    cc.log("enemy世界坐标："+worldpos);//enemy世界坐标：(32.00, 32.00)  (544.00, 32.00)
    enemy.getComponent("Enemy").map = this;
     this.enemy=enemy;
     this.enemyTile=enemyTile;

   //  this.player.getComponent("Player").enemy=this.enemy.getComponent("Enemy");
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
 update(dt){
    if(this.isrunning){
    let c=Math.abs(this.playerTile.x-this.enemyTile.x);
    let d=Math.abs(this.playerTile.y-this.enemyTile.y);
       //炸弹的上下左右有一个方向有玩家的话
       if(c==0&&d==0)
       {
           //游戏结束
           this.gameOver();
       }
      if(this.playerTile.x==9&&this.playerTile.y==9){
           //游戏成功
          this.gameWin();

      }       
    
  }
  }
});
