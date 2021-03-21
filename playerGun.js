class playerGun extends entity {
  constructor (inBox, inPos, inSize, inMass, inColor, inOutline, inWeight, inHealth, inKillable, inHead, inVel, indmgtime, indmg, inCF, inCR){

    super (inBox, inPos, inSize, inMass, inColor, inOutline, inWeight, inHealth, inKillable, inHead, inVel, indmgtime, indmg, inCF, inCR);
    this.gunTip = createVector (this.position.x+(inSize[0]*0.6),this.position.y);
    this.gunAngle = 0;
    this.gunPower = 100;
  }

  update (dt){
    angleMode(RADIANS);
    let a = atan2(mouseY - height / 2, mouseX - width / 2);
    this.gunAngle = a;
    //super.update(dt);
  }

  drawEntity (){
    push();
      if (this.active) {
        rectMode(CENTER);
        rotate(this.gunAngle );
        super.drawEntity();
      }
    pop();
  }
}
