var canH, canW;

var bgSprite, bgImg;
var boat, boatImg, boatMoveImg;
var lineL, lineR, lineStart, lineEnd;

var moving = false;
var slow= false;
var gameState = 0;
var btn, inst, info;

var bagImg, bottleImg, rocksImg, batteryImg, netImg, logImg, boatObstacleImg, fuelStationImg;
var bagsGrp, bottleGrp, rocksGrp, batteryGrp, netGrp, logGrp, boatGrp,fuelStationGrp;
var bagObject, bottleObject, rocksObject, batteryObject, netObject, logObject, boatObject, fuelStationObject;
var power, icon;
var waitBg;
var fuel= 500;
var collected= 0;
var score=0;
var page, pageimg;
var start= false;
var life= 3;
var lifeD1, lifeD2, lifeD3;
var lifeimg, nolife;
var waitS, playS, crash, move, bagS, bottleS, winS, winM;
var failureType=0;
var fuelStationImg, fuelGrp;
var dayTime = true;
var timeChangeCounter = 0;

function preload() {
  bgImg= loadImage("./assets/images/bg.jpg");
  boatImg= loadImage("./assets/new pics/boat_tra.png");
  boatMoveImg= loadImage("./assets/new pics/boat.gif");
  bagImg= loadImage("./assets/images/bag.png");
  bottleImg= loadImage("./assets/images/bottle.png");
  rocksImg= loadImage("./assets/images/rocks.png");
  batteryImg= loadImage("./assets/new pics/battery_tra.png");
  power= loadImage("./assets/images/power.png");
  icon= loadImage("./assets/images/icon.png");
  waitBg= loadImage("./assets/images/waitbg2.gif");
  pageimg= loadImage("./assets/new pics/instructions.png");
  lifeimg= loadImage("./assets/images/bolt.png");
  nolife= loadImage("./assets/images/noBolt.png");
          
  logImg = loadImage("./assets/images/log.png");          

  waitS = loadSound("./assets/new s/bg_wait.mp3");
  playS = loadSound("./assets/new s/bg_play.mp3");
  move = loadSound("./assets/sounds/move.mp3");
  crash = loadSound("./assets/sounds/crash.mp3");
  bagS = loadSound("./assets/sounds/bag.mp3");
  batteryS = loadSound("./assets/sounds/bottle.mp3");
  winS = loadSound("./assets/sounds/win.mp3");
  winM = loadSound("./assets/sounds/winbg.mp3");
  over = loadSound("./assets/sounds/over.mp3");
}

function setup() {
  var isMobile= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    canW= displayWidth;
    canH= displayHeight;
    createCanvas(displayWidth+50, displayHeight);
  }
  else{
    canW= windowWidth;
    canH= windowHeight;
    createCanvas(windowWidth, windowHeight-5);
  }
  boat= createSprite(width/2, height-150);
  boat.addImage("boat", boatImg);
  boat.addImage("boatMove", boatMoveImg);
  boat.scale= 0.7;
  //boat.debug= true;
  boat.setCollider("rectangle", 0, -50, boat.width-20, boat.height-150);

  lineL= new Boundary(width/4+50, -height, 20, height * 10);
  lineR= new Boundary(width/2+400, -height, 20, height * 10);
  lineStart= new Boundary(width/2, height-400, width, 20);
  lineEnd= new Boundary(width/2, -height*6+400, width, 20);

  line= new Boundary(width/2, height, width, 20);

  btn= createButton("Play");
  btn.position(width/2-200, 200);
  btn.class("play");

  inst= createButton("Instructions");
  inst.position(width/2-200, 50);
  inst.class("btn");

  info= createButton("Explore");
  info.position(width/2-200, 350);
  info.class("ibtn");

  logo= createImg("./assets/images/logo.png");
  logo.position(width/2-200, height/2+270);
  //logo.size(100,100);

  page= createImg("./assets/new pics/instructions1.png");
  page.position(300, 30);
 // page.scale=0.2;
 // page.class("gameTitleAfterEffect2");
  page.hide();

  bagsGrp= new Group();
  bottleGrp= new Group();
  rocksGrp= new Group();
  batteryGrp= new Group();
  logGrp = new Group();
  boatGrp = new Group();

  bagsObject= new Materials(bagsGrp, 30, bagImg, 0.07, true);
  bottleObject= new Materials(bottleGrp, 25, bottleImg, 0.1, true);
  rocksObject= new Materials(rocksGrp, 5, rocksImg, 0.5);
  batteryObject= new Materials(batteryGrp, 3, batteryImg, 0.2, true);
  logObject= new Materials(logGrp, 5, logImg, 0.4, true)

  bagsObject.spawnMaterials();
  bottleObject.spawnMaterials();
  rocksObject.spawnObstacles();
  batteryObject.spawnMaterials();
  logObject.spawnObstacles();

  lifeD1= createSprite(width-100, camera.position.y+200);
  lifeD2= createSprite(width-200, camera.position.y+200);
  lifeD3= createSprite(width-300, camera.position.y+200);

  lifeD1.addImage("life", lifeimg);
  lifeD2.addImage("life", lifeimg);
  lifeD3.addImage("life", lifeimg);
  lifeD1.addImage("nolife", nolife);
  lifeD2.addImage("nolife", nolife);
  lifeD3.addImage("nolife", nolife);
  lifeD1.scale= 0.3
  lifeD2.scale= 0.3
  lifeD3.scale= 0.3

}

function draw() {

  if (gameState === 0) {
    if (!waitS.isPlaying()) {
      waitS.loop();
    }

    background("lightblue");
    background(waitBg);
    btn.mousePressed(()=>{
      gameState= 1;
      page.hide();
    });

    inst.mousePressed(()=>{
      page.show();
      inst.hide();
      btn.position(width/2+500, 200);
      info.position(width/2+500, 350);
      logo.position(width/2+450, height/2+270);
    });

    info.mousePressed(()=>{
      window.open('info doc.html');
    });
  } 
  else if (gameState===1) {

   if(waitS.isPlaying()){
      waitS.stop();
    }

    if(!playS.isPlaying()){
      playS.loop();
      playS.setVolume(0.5);
    }

   background("lightblue");
    btn.hide();
    inst.hide();
    info.hide();
    logo.position(10, 10);
    logo.class("gameTitleAfterEffect");

    image(bgImg, 25, -height * 6, width-50, height * 7);

    if (life>0){
    handlePlayerControl();
  }

    camera.position.y = boat.position.y-100;
    lifeD1.position.y= camera.position.y+200;
    lifeD2.position.y= camera.position.y+200;
    lifeD3.position.y= camera.position.y+200;

    if (moving === true || start=== true) {
      boat.position.y-=3;
      fuel -= 0.07;
      collected+= 10;
    }
  
    lineL.display();
    lineR.display();
    lineStart.display();
    lineEnd.display();
    line.display();
  
    lineL.collisionWboat();
    lineR.collisionWboat();
    line.collisionWboat();

    bagsObject.updateFloating();
    bottleObject.updateFloating();
    rocksObject.updateFloating();
    batteryObject.updateFloating();
   // logObject.updateFloating();

    var finishline= -(height*6)+500
    //console.log(-(height*6)+500, boat.position.y);

    if (boat.position.y<= finishline) {
      moving= false;
      boat.remove();
      gameState=2;
      if(playS.isPlaying()){
        playS.stop();
        move.stop();
      }

      if(!winM.isPlaying()){
        winM.loop();
       // playS.setVolume(0.5);
      }
      winS.play();

      gameOver();

    }
    drawSprites();

    lives();
   /* textSize(30);
    fill("red");
    text("Score: "+ score, width-200, camera.position.y-200);*/

    energyBar();
    collectedBar();
  
    handleCollisionwithObstacles();
    handleCollisionwithPlastic();
    if (fuel <= 0) {
      gameState=2;
      if(playS.isPlaying()){
        playS.stop();
        move.stop();
      }
      over.play();
      failureType=1;
        missionFail("Game Over");
      } 
  }

  function handlePlayerControl() {
    if (keyIsDown(UP_ARROW)) {
      boat.position.y -= 10;
      moving=true;
      boat.changeImage("boatMove");
      fuel -= 1;
      if (!move.isPlaying()) {
        move.loop();
     //   move.setVolume(1);
      }
    }
  
    if (keyIsDown(LEFT_ARROW)) {
      boat.position.x -= 5;
    }
  
    if (keyIsDown(RIGHT_ARROW)) {
      boat.position.x += 5;
    }
  }
  
  function energyBar(){
    push();
    image(power, width/2-250, camera.position.y-300, 40, 40);
  
    fill("white");
    rect(width/2-200, camera.position.y-300, 500, 30);
  
    fill("#FFD732");
    rect(width/2-200, camera.position.y-300, fuel, 30);
  
    noStroke();
  
    pop();
  }
  
  function collectedBar(){
    push();
    image(icon, width/2-250, camera.position.y-250, 40, 40);
  
    fill("white");
    rect(width/2-200, camera.position.y-250, 500, 30);
  
    fill("#B1C635");
    rect(width/2-200, camera.position.y-250, score, 30);
  
    noStroke();
  
    pop();
  }
  
  function handleCollisionwithObstacles() {
  
    boat.overlap(rocksGrp, function(collection, collected){
     collected.remove();
      life= life-1;
      console.log("LIVES:", life);
        crash.play();
        crash.setVolume(12)
    })

    boat.overlap(logGrp, function(collection, collected){
      collected.remove();
       life= life-1;
       console.log("LIVES:", life);
         crash.play();
         crash.setVolume(12)
     })
  }

  function handleCollisionwithPlastic() {
    boat.overlap(bagsGrp, function(collection, collected){
      collected.remove();
      if(score<=500) {
       score= score + 10
      }
        bagS.play();
    })
  
    boat.overlap(bottleGrp , function(collection, collected){
      collected.remove();
      if(score<=500) {
       score= score + 10
      }
      bagS.play();
    })
  
    boat.overlap(batteryGrp , function(collection, collected){
      collected.remove();
      batteryS.play();
      if (fuel<=450) {
        fuel+=50;
      } else{
        fuel=500;
      }
  
    })

  }
  
  function lives(){
    if(life == 2){
      lifeD1.changeImage("nolife");
      lifeD1.scale=0.3;
    }
    if(life == 1){
      lifeD2.changeImage("nolife");
      lifeD2.scale=0.3;
    }
    if(life == 0){
      lifeD3.changeImage("nolife");
      lifeD3.scale=0.3;
      fuel=0.5;
      moving= false;
   
      if ((score/10)>=10) {
        failureType=2;
        if(playS.isPlaying()){
          playS.stop();
          move.stop();
        }
        if (!over.isPlaying()) {
          over.play();
        }
        
        missionFail("Mission Failed");
      }
      else {
        failureType=3;
        if(playS.isPlaying()){
          playS.stop();
               move.stop();
        }
        if (!over.isPlaying()) {
          over.play();
        }
        
        missionFail("Mission Failed");
      }
    }
  }
}

function gameOver() {
  if ((score/10)>50){
    score=500
    swal({
      title: "Awesome!",
      text:"The river is clean!" + "\n"+ "You collected "+ score/10+ " pieces of garbage."+ "\n"+ "HIGHEST SCORE!",
      imageUrl: "https://www.pngitem.com/pimgs/m/117-1173837_racing-clipart-png-transparent-images-finish-line-flag.png",
      imageSize: "300x300",
      confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
    })
  }
  else if ((score/10)<10){
    score=500
    swal({
      title: "Good Job",
      text:"You have reached the finish line sucessfully." + "\n"+ "But the river is still polluted.",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/024/485/669/non_2x/mission-failed-rubber-stamp-seal-vector.jpg",
      imageSize: "300x300",
      confirmButtonText: "Play Again"
      },
      function (isConfirm) {
        if (isConfirm) {
          location.reload();
        }
    })
  }
  else{
  swal({
    title: "Awesome!",
    text:"You have reached the finish line sucessfully." + "\n"+ "You collected "+ score/10+ " pieces of garbage.",
    imageUrl: "https://www.pngitem.com/pimgs/m/117-1173837_racing-clipart-png-transparent-images-finish-line-flag.png",
    imageSize: "300x300",
    confirmButtonText: "Play Again"
    },
    function (isConfirm) {
      if (isConfirm) {
        location.reload();
      }
  })
}
}

function missionFail(title) {

  if (failureType==1) {
    message= "You ran out of power!"
  } else if (failureType==2) {
  message= "Ran out lives!" + "\n" +"You collected "+ score/10+ " pieces of garbage."
  } else if (failureType==3){
    message= "Ran out of lives! The river is still polluted."
  }

  swal({
    title: title,
    text: message,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFAsFzRRacEftC0n5O2S_TKsTCOHdFHr2Y8fLc2Zmli3lItLbpyoi15Tj_50XBg2cDG4&usqp=CAU",
    imageSize: "300x300",
    confirmButtonText: "Play Again"
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  })
}


