var thePlayer = [];
var mooks = [];
var canvas;
var gaming = true;
var reseting = false;
var dt = 0.016;
var textDisplay;
var longerOfXOrY = 0;
var score = 0;
var difficulty = 0;

function setup() {
  longerOfXOrY = setupCanvas (640,480);
  setupPlayers (1,longerOfXOrY);
  setupWave (10, longerOfXOrY);
  textDisplay = new textRenderer ();
}

function draw() {
  //Draw setup
    dt = (deltaTime) / 1000;// * 0.001;
    if (dt<0.01){ dt = 0.01;}
    if (dt>0.1) {dt = 0.1;}
    translate(width / 2, height / 2);
    if (mooks.length <= 0){
      difficulty++;
      thePlayer[0].health = min (10, thePlayer[0].health+2);
      setupWave (10+(difficulty*2), longerOfXOrY);
    }
  if (thePlayer[0].health>0){
  //Collisions
  var collided = checkCollisionsArrays (mooks, thePlayer[0].bullet);
  for (var h = 0; h< collided.length; h++){
    var mook = collided[h][0];
    var bullet = collided[h][1];
    var damage = bullet.damageDealt();
    textDisplay.addDamageText ([damage, mook.position, 0])
    mook.damaged (damage[0]);
    bullet.active = false;

  }

  collided = checkCollisionsArrays (mooks, thePlayer);
  for (var h = 0; h< collided.length; h++){
    var mook = collided[h][0];
    var thePlayers = collided[h][1];
    mook.active = false;
    thePlayers.health--;
    score--;
    thePlayers.healthchanged = 0.00001;
  }

  //Update States
  for (var i = 0; i<mooks.length;i++){
      mooks[i].update(dt);
      if (!mooks[i].active) {
        score++;
        mooks.splice(i,1);
      }
  }
  thePlayer[0].updatePlayer(dt);
  textDisplay.updateAllText(dt);

  //Draw States
  background(GAMEBGCOLOR);
  thePlayer[0].drawPlayer(dt);
  for (var i = 0; i<mooks.length;i++){
    if (mooks[i].active){
      mooks[i].drawEntity();
    }
  }

textDisplay.drawAllText (thePlayer[0].health);
}
else {
  background(GAMEBGCOLOR);
  textDisplay.drawEndGame();
}
}

function mouseClicked() {
  thePlayer[0].addBullet ();
  return true;
}


function keyPressed (){
  if (keyCode == '80') {
    if (gaming){
        gaming = false;
        noLoop ();
    }
    else {
      gaming = true;
      loop();
    }
  }
}

function setupCanvas (x,y){
  canvas = createCanvas(x,y);
  //canvas.parent('mainScreen');
  canvas.id("thedisplay");
  frameRate (120);
  colorMode (HSL);
  return (width>height) ? width*.1:height*.1;
}

function setupPlayers (numPlayers, sides) {
  for (var i = 0; i < numPlayers; i++){
    var x  = createVector (0,0);
    var h = x;
    thePlayer[i] = new player(x, [sides], 'circle', h);
  }
}

function setupWave (waveSize, sides) {
  for (var i = 0; i<waveSize;i++){
    let pos = chooseStart();
    let head = createVector (-1,-1);
    mooks [i] = new entity ('circle', pos, [sides/2], 10, [0,40,40], [0,40,20], 1, floor(1+difficulty/8), true, head, sides/2, 1, 1, 1, 0);

  }
}

function checkCollisionsArrays (arr1, arr2){
    var theCollisions = []
    var count = 0;
    for (var i = 0; i<arr1.length;i++){
      for (var j = 0; j<arr2.length; j++){
          var arr1pos = arr1[i].position;
          var arr2pos = arr2[j].position;
          var size = 0;
          var collisionDetected =false;
          if ((arr1[i].boundingBox == 'circle' && arr2[j].boundingBox == 'point')||
              (arr2[j].boundingBox == 'circle' && arr1[i].boundingBox == 'point')){
                size = (arr1[i].boundingBox == 'circle')? arr1[i].size:arr2[j].size;
                if (pointToCicrleCollision (arr2pos, arr1pos, size*0.6)){
                  collisionDetected = true;
                }
            }
            if (arr1[i].boundingBox == 'circle' && arr2[j].boundingBox == 'circle'){
              size = arr1[i].size;
              size2= arr2[j].size;
              if (circleToCicrleCollision (arr2pos, arr1pos, size*0.5, size2*0.5)){
                collisionDetected = true;
              }
            }
            if (collisionDetected){
            var newCol = [arr1[i],arr2[j]];
            theCollisions[count] = newCol;
            count++;
            }
          }
      }
      return theCollisions;
    }
