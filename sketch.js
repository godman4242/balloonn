var bg,bgimg
var balloon,balloonimg
var top,down
var obstop1,obstop2,obstop
var obsbot1,obsbot2,obsbot3,obsbot
var PLAY = 1
var END = 0
var gamestate = PLAY
var score  = 0
var gameoverimg,restartimg,gameover,restart
var topgroup,bottomgroup,bargroup
var backgroundimg

function preload(){
  bgimg = loadImage('assets/bg.png')
  bgimg2 = loadImage('assets/bgimg2.jpg')
  balloonimg = loadAnimation('assets/balloon1.png','assets/balloon2.png','assets/balloon3.png')

  obstop1 = loadImage('assets/obsTop1.png')
  obstop2 = loadImage('assets/obsTop2.png')

  obsbot1 = loadImage('assets/obsBottom1.png')
  obsbot2 = loadImage('assets/obsBottom2.png')
  obsbot3 = loadImage('assets/obsBottom3.png')
  gameoverimg = loadImage('assets/gameOver.png')
  restartimg = loadImage('assets/restart.png')
}

function setup(){
  bg = createSprite(165,485,1,1)
  getbackgroundimg();
 // bg.addImage(bgimg)
 // bg.scale = 1.3

  bottom = createSprite(200,390,800,20)
bottom.visible = false

top = createSprite(200,10,800,20)
top.visible = false


balloon= createSprite(100,200,20,50)
balloon.addAnimation('balloon',balloonimg)
balloon.scale = 0.2
topgroup = new Group()
bottomgroup = new Group()
bargroup = new Group()

gameover = createSprite(220,200)
restart = createSprite(220,240)
gameover.addImage(gameoverimg)
gameover.scale = 0.5
restart.addImage(restartimg)
restart.scale = 0.5
gameover.visible = false
restart.visible = false

}

function draw(){
  background('black')
  if(gamestate === PLAY){

  
  if(keyDown('space')){
    balloon.velocityY = -10
  }
  balloon.velocityY = balloon.velocityY + 0.5
  Bar()
 
  spawnobstaclestop();
  spawnobstaclesbottom();
  if(topgroup.isTouching(balloon) 
  || balloon.isTouching(top) ||
   balloon.isTouching(bottom) ||
    bottomgroup.isTouching(balloon))
    { gameState = END;}
}
if(gamestate === END){
  gameover.visible =  true
  gameover.depth=gameover.depth+1

  restart.visible =  true
  restart.depth=restart.depth+1
  balloon.velocityX = 0
  balloon.velocityY = 0
  topgroup.setVelocityXEach(0)
  bottomgroup.setVelocityXEach(0)
  bargroup.setVelocityXEach(0)

topgroup.setLifetimeEach(-1)
bottomgroup.setLifetimeEach(-1)

balloon.y = 200
if(mousedPressedOver(restart)){
  reset()
}

}
drawSprites();

}

function reset(){
gamestate = PLAY
gameover.visible =  false


restart.visible =  false

topgroup.destroyEach()
bottomgroup.destroyEach()
}


function spawnobstaclestop(){

if(frameCount%60 === 0){

obstop = createSprite(400,50,40,50)
obstop.scale = 0.1
obstop.velocityX = -4
obstop.y = Math.round(random(10,100))
var rand = Math.round(random(1,2))

switch(rand){
  case 1: obstop.addImage(obstop1)
  break;

  case 2: obstop.addImage(obstop2)
  break;

  default:break;


}

obstop.lifetime = 100
balloon.depth = balloon.depth + 1
topgroup.add(obstop)
}
}

function spawnobstaclesbottom(){

  if(frameCount%60 === 0){
  
  obsbottom = createSprite(400,50,40,50)
  obsbottom.addImage(obsbot1)
  obsbottom.scale = 0.1
  obsbottom.velocityX = -4
 //obsbottom.y = Math.round(random(10,100))
  var rand = Math.round(random(1,3))
  
  switch(rand){
    case 1:  obsbottom.addImage(obsbot1)
    break;
  
    case 2:  obsbottom.addImage(obsbot2)
    break;
  
    case 3:  obsbottom.addImage(obsbot3)
    break;

    default:break;
  
  
  }
  
  obsbottom.lifetime = 100
  balloon.depth = balloon.depth + 1
  bottomgroup.add(obsbottom)

  }
}

function Bar(){
if(frameCount%60 === 0){
var bar = createSprite(400,200,10,800)
bar.velocityX = -6
bar.depth = balloon.depth
bar.lifetime = 70
bar.visible = false


}

}

async function getbackgroundimg(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
   var responseJSON = await response.json();
   var datetime = responseJSON.datetime
   var hour = datetime.slice(11,13)
   if(hour>=06 && hour<=19){
bg.addImage(bgimg)
bg.scale = 1.3

   }
   else{
    bg.addImage(bgimg2)
bg.scale = 1.3
   }
}

