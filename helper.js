function mOver(obj) {
  obj.src = "img/sgif.gif"
}

function mOut(obj) {
  obj.src = "img/rgif.gif"
}

function chooseStart() {
    let x = -width/2-random(10,width);
    let y = -height/2-random(10,height);
    let s = random ([1,2,3,4]); //1 = Left, 2 = up, 3 = right, 4 = down
    if (s == 1 || s==3) {
      y = random (-height/2, height/2);
      if (s === 3) {x *= -1;}
    }
    else {
      x = random (-width/2, width/2);
      if (s === 2){y*=-1;}
    }
    return createVector (x,y);
}

//returns true if there is a collision, otherwise returns false
//Does calculation on a single point vs a Circle
function pointToCicrleCollision (pointPos, circlePos, circleRad) {
    return pointPos.dist (circlePos) < circleRad;
}

//returns true if there is a collision, otherwise returns false
//Does calculation on  Cicrle 1 vs  Circle 2
function circleToCicrleCollision (c1Pos, c2Pos, c1Rad, c2Rad){
      var c1TOc2Ddistance = c1Pos.dist(c2Pos);
      return c1TOc2Ddistance <= (c1Rad+c2Rad);
}
