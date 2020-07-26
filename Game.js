class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      player1 = createSprite(20, 200);
      player1.addImage("firstRunner", playerImg);
      player2 = createSprite(20, 350);
      player2.addImage("firstRunner", playerImg);
      player3 = createSprite(20, 500);
      player3.addImage("firstRunner", playerImg);
      player4 = createSprite(20, 750);
      player4.addImage("firstRunner", playerImg);
      players = [player1, player2, player3, player4];

    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      
      if(allPlayers !== undefined){
        background(rgb(198, 135, 103));
       // image(trackImg, 0, -displayHeight*4, displayWidth, displayHeight*5);
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the players
        var x = 10;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 200;
          //use data form the database to display the cars in y direction
          
  
          if (index === player.index){
            
            camera.position.x = displayWidth/2;
            camera.position.y = players[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
   
      
      if(keyIsDown(RIGHT_ARROW) && player.index !== null){
        player.distance +=10
        player.update();
      }
      if(player.distance > 3800){
        gameState = 2;
      }
      drawSprites();
    }
    end(){
      game.update(2);
    }
  }
  