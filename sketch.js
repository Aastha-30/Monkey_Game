  //to declare the variables
  var monkey,monkey_running;
  var bananaImage,obstacleImage;
  var FoodGroup,obstacleGroup;
  var survivalTime=0;

function preload(){
  
    //to load the images for monkey,banana and obstacles
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
    bananaImage = loadImage("banana.png");
    obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  //to create the canvas
  createCanvas(450,450);

  //to create a sprite for the monkey
  monkey=createSprite(150,330,10,10);
  monkey.addAnimation("m",monkey_running);
  monkey.scale=0.22;
  
  //to create a sprite for the ground
  ground=createSprite(225,400,500,10);
  ground.velocityX=-4;
  
  //to create a group for food and obstacles
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
}

function draw() {
  
  //to change the background color to white
  background(280);
  
  //to display the survival time and update it time to time
  textSize(18);
  survivalTime=survivalTime+Math.round(getFrameRate()/60);
  text("Survival Time : "+ survivalTime,170,30);
  
  //to reset the ground
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  //to make the monkey jump when the space key is pressed
  if(keyDown("space")){
    monkey.velocityY=-10;
  }
  
  //to assign gravity to the monkey
  monkey.velocityY=monkey.velocityY+0.8;
  
  //to make the monkey collide with the ground
  monkey.collide(ground);
  
  //to call the food and stone function
  food();
  stone();
  
  //to make the obstacles and bananas disappear and stop when     when the monkey touches the obstacle         
  if(obstacleGroup.isTouching(monkey)){
    
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
  }
  
  //to draw the sprites
  drawSprites();
  
}

function food(){
  
  if(frameCount%80===0){
    var banana=createSprite(390,250,10,10);
    banana.y=Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.14;
    banana.velocityX=-5;
    banana.lifetime=-100;
    monkey.depth=banana.depth;
    monkey.depth=monkey.depth+1;
    FoodGroup.add(banana);
  }
    
}

function stone(){
  
  if(frameCount%300===0){
    var obstacle=createSprite(325,338,10,10);
    obstacle.velocityX=-5;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.3;
    obstacle.lifetime=-100;
    monkey.depth=obstacle.depth;
    monkey.depth=monkey.depth+1;
    obstacleGroup.add(obstacle);
  }
  
}