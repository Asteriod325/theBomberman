

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

  

    onLoad(){
   
      //初始化键盘输入监听: 参数：事件类型，响应的回调函数，监听对象                                          
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
      //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
      
  },

 //销毁脚本时自动执行
 onDestroy(){
   //释放键盘事件
  cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
  //cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
 },

    onKeyDown(event){
        //cc.log("按下了！");
       // cc.log(this.map);
         switch(event.keyCode){
             case cc.macro.KEY.left:this.goLeft();break;
             case cc.macro.KEY.right:this.goRight();break;
             case cc.macro.KEY.up:this.goUp();break;
             case cc.macro.KEY.down:this.goDown();break;
             case cc.macro.KEY.space:this.setBomb();break;
         }

     },
     goLeft(){
         let x=this.map.playerTile.x;
         let y=this.map.playerTile.y;
         this.move(--x,y);
     },
     goRight(){
        let x=this.map.playerTile.x;
        let y=this.map.playerTile.y;
        this.move(++x,y);
    },
    goUp(){
        let x=this.map.playerTile.x;
        let y=this.map.playerTile.y;
        this.move(x,--y);
    },
    goDown(){
        let x=this.map.playerTile.x;
        let y=this.map.playerTile.y;
        this.move(x,++y);
    },
    setBomb(){

        var bomb=cc.instantiate(this.map.bombPrefab);
        this.map.mainLayer.node.addChild(bomb);
     
        let tilePos=cc.v2(this.map.playerTile.x,this.map.playerTile.y);
        let realPos=this.map.mainLayer.getPositionAt(tilePos);
        bomb.setPosition(realPos);
        
        bomb.getComponent("Bomb").player = this;  
        this.bomb=bomb;
        this.tilePos=tilePos;
    },
    move(x,y){
        //cc.log(x,y);
     
        let tilePos=cc.v2(x,y);
        
        if(this.map.mainLayer.getTileGIDAt(tilePos)){
            return false;
        }
        if(this.map.brickLayer.getTileGIDAt(tilePos)){
            return false;
        }
   
        

        let realPos=this.map.mainLayer.getPositionAt(tilePos);
        cc.log(realPos);
        this.map.playerTile.x=x;
        this.map.playerTile.y=y;
        this.node.setPosition(realPos);
      //  cc.log(this.node.x,this.node.y);
    },



});
