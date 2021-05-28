var screen =0;
var lives = 5;
var one,oneImage;
var ground,groundImage;

var green,greenImg,blue,blueImg ;
var Icup,Ican,Ibag,Ipaper,Iwrapper;
var Iapple,Ibanana,Ibeans,Iburger,Ipizza
var score=0;
var beep;
var gjob;
var group;
var select;
var dry,dryGroup;
var wet,wetGroup;
var flag = 1;
var pButton,Ibutton;
var ground;


function preload(){
//groundImage = loadImage("ground2.png");
//bins 
blueImg = loadImage("images/bluebin.png")
  greenImg = loadImage("images/greenbin.png")
  //background
  bg = loadImage('images/bg2.jpg');
  //wet waste
  Iapple = loadImage("images/apple.png");
  Ibanana = loadImage("images/banana.png");
  Ibeans = loadImage("images/beans.png")
  Iburger = loadImage("images/burger.png")
  Ipizza  =loadImage("images/pizza.png")
  //dry waste
  Ican = loadImage("images/can.png");
  Icup = loadImage("images/cup.png");
  Ipaper = loadImage("images/paperbag.png");
  Iwrapper = loadImage("images/wrapper.png");
  Ipaper = loadImage("images/paperbag.png"); 
  Ibag = loadImage("images/bag.png");
  //sounds
  beep = loadSound("images/beep.mp3");
  gjob = loadSound("images/good job.mp3")
//button
Ibutton = loadImage("images/play.png");

}
function setup(){
   createCanvas(displayWidth,displayHeight-115);

   dryGroup = createGroup();
   wetGroup = createGroup();
  ground= createSprite(displayWidth/2,displayHeight/2+265,displayWidth-20,20);
   
   /* select = createSprite(random(displayWidth/2-155, displayWidth/2+155), random(100, displayHeight-400), 20, 20)
    select.shapeColor = "red"
   // select.velocityY = 1
    group.add(select);
    group.setVelocityYEach(1);
    */
   ground.visible= false;
  


  
}


function draw() {
if(screen === 0){
  startScreen()
}else if(screen === 1){
  gameOn()
}else if(screen===2){
  endScreen()
}	


}

  function startScreen(){
    background(96, 157, 255)
    drawSprites();
    fill(255)
    pButton = createSprite(displayWidth/2,displayHeight/2,50,50);
    pButton.addImage(Ibutton);
		textAlign(CENTER);
		text('WELCOME TO MY SEGREGATION GAME', width / 2, height / 2)
    text('click to start', width / 2, height / 2 + 20);
    if(mousePressedOver(pButton)){
      reset();
      screen=1;
      
    }

  
    
  }

  function gameOn(){
    background(bg)
  

    pButton.destroy();
    green = createSprite(displayWidth/2-95, displayHeight-170);
    green.addImage("green1",greenImg)
    green.scale = 0.8
   
    blue = createSprite(displayWidth/2+95, displayHeight-170);
    blue.addImage("blue",blueImg)
    blue.scale = 0.8
blue.debug = true; 
green.debug = true;

    drawSprites();
  
    textSize(25)
    fill("black")
    text("Score: "+ score, displayWidth/2-50,50);
    text("Life: "+ lives, displayWidth/2-50,75);


  
    if(frameCount % 85 === 0){
      dry = createSprite(random(displayWidth/2-155, displayWidth/2+155), random(100, displayHeight-400), 20, 20)
      dry.velocityY=5;
      dry.debug =true;
      var select = Math.round(random(4,5));
      ///console.log(select)
      switch(select){
        case 1 : dry.addImage(Ibag);
        dry.scale =0.35;
        
        dry.setCollider("circle",0,0,55)
        break;
        case 2 : dry.addImage(Ipaper);
        dry.scale =0.27;
        
        dry.setCollider("circle",0,0,55)
        break;
        case 3 : dry.addImage(Icup);
                  dry.scale =0.17;
                  
        dry.setCollider("circle",0,0,55)
        break;
        case 4 : dry.addImage(Ican);
        dry.scale =0.27;
        
        dry.setCollider("circle",0,0,55)
        break;  
        case 5 : dry.addImage(Iwrapper);
        dry.scale =0.32;
        dry.setCollider("circle",0,0,55)
        break;
  
        default:break;
       
      }
    
      dryGroup.add(dry);
    }
  
    if(frameCount % 75 === 0){
      wet = createSprite(random(displayWidth/2-155, displayWidth/2+155), random(100, displayHeight-400), 20, 20)
      wet.velocityY=5;
      wet.debug = true;
      var select = Math.round(random(1,5))
      switch(select){
        case 1 : wet.addImage(Ibanana);
        wet.scale =0.07;
        
        break;
        case 2 : wet.addImage(Iapple);
        wet.scale =0.07;
        break;
        case 3 : wet.addImage(Ibeans);
                  wet.scale =0.17;
        break;
        case 4 : wet.addImage(Iburger);
        wet.scale =0.2;
        break;
        case 5 : wet.addImage(Ipizza);
        wet.scale =0.17;
        break;
        default:break;
      }
     // wet.shapeColor = "green"
      wetGroup.add(wet);
    }
  
    for(var i=0;i<dryGroup.length;i++){
    if(mousePressedOver(dryGroup.get(i))){
      dryGroup.get(i).x = mouseX;
      dryGroup.get(i).y = mouseY;
    }
  }
  for(var i=0;i<wetGroup.length;i++){
    if(mousePressedOver(wetGroup.get(i))){
      wetGroup.get(i).x = mouseX;
      wetGroup.get(i).y = mouseY;
    }
  }
  
    for(var i=0;i<dryGroup.length;i++){
  
      if(dryGroup.get(i).isTouching(green)){
        dryGroup.get(i).destroy();
        score=score-10;
      }
      if(dryGroup.get(i).isTouching(blue)){
        dryGroup.get(i).destroy();
        score=score+10;
     
      }
      if(dryGroup.get(i).isTouching(ground)){
        dryGroup.get(i).destroy();
       lives = lives-1;
            }
            
    }
  

    
  
    for(var i=0;i<wetGroup.length;i++){
      if(wetGroup.get(i).isTouching(green)){
        wetGroup.get(i).destroy();
        score=score+10;
      }
      if(wetGroup.get(i).isTouching(blue)){
        wetGroup.get(i).destroy();
        score=score-10;
      }
      if(wetGroup.get(i).isTouching(ground)){
        wetGroup.get(i).destroy();
       lives = lives-1;
            }

    }
  
  
    if(lives==0){
      screen=2;
    }


  }

function endScreen(){

  background(150)
  textAlign(CENTER);
  text('GAME OVER', width / 2, height / 2)
  text("SCORE = " + score, width / 2, height / 2 + 20)
  text('click to play again', width / 2, height / 2 + 40);
}


function mousePressed(){
  console.log("h1");

	if(screen==0){
    screen=1
    console.log("h2")
  }else if(screen==2){
  	screen=0
  }
}

function reset(){
	  score=0;
}

