class entity {
  constructor (inBox, inPos, inSize, inMass, inColor, inOutline, inWeight, inHealth, inKillable, inHead, inVel, indmgtime, indmg, inCF, inCR){
    this.boundingBox = (inBox) ? inBox:'point';
    this.position = (inPos) ? createVector (inPos.x, inPos.y): createVector (0,0);
    this.heading = (inHead) ? createVector (inHead.x, inHead.y):createVector (0,0);
    this.velocity = (inVel) ? inVel:0;
    this.size = (inSize) ? inSize:[0];
    this.mass = (inMass) ? inMass:1;

    this.color = (inColor) ? inColor: [0,0,0];
    this.outline = (inOutline) ? inOutline: [0,0,0];
    this.outlineWeight = (inWeight) ? inWeight:1;

    this.health = (inHealth) ? inHealth:1;
    this.healthchanged = 0;
    this.damageTimer = (indmgtime) ? indmgtime:1;

    this.maxDamage = (indmg) ? indmg:1;       //maximum damage of a normal hit
    this.criticalFactor = (inCF) ? inCF:1;  //how much extra damage on a criritcal
    this.criticalRate = (inCR) ? inCR:0;    //Subtract from 100 to get chance of normal hit.

    this.killable = (inKillable) ? inKillable:false;
    this.active = true;
  }

  damageDealt () {
    var crit = (random (0,1)  < this.criticalRate) ? true:false;
    var dmg = (crit) ? floor((this.maxDamage*this.criticalFactor)):floor (random (1,this.maxDamage));
    return [dmg, crit];
  }

  damaged (incoming){
    if (this.killable){
      this.health = this.health - incoming;
      this.healthchanged = 0.001;
    if (this.health < 1) {this.active = false;}
    }
  }

  checkIfGone (){
    if (this.position.x > width *1.5 || this.position.x < -width *1.5 ||
        this.position.y > height *1.5 || this.position.y< -height *1.5 ){
        this.active = false;
        }
  }

  drawEntity (){
    if (this.active) {
      var mod = ((this.damageTimer -this.healthchanged)/this.damageTimer);
      var alpha = max (0.75,1*mod);

      strokeWeight (max (mod, .5) * this.outlineWeight);
      stroke(this.outline[0],this.outline[1],this.outline[2], alpha);
      fill (this.color[0],this.color[1],this.color[2], alpha );

      if (this.size.length == 2){window[this.boundingBox](this.position.x, this.position.y, this.size[0], this.size[1]);}
      else if (this.size.length == 1) {window[this.boundingBox](this.position.x, this.position.y, this.size[0]);}
      else {window[this.boundingBox](this.position.x, this.position.y);}
    }
  }

  update (dt){
    this.checkIfGone ();

    if (this.healthchanged > 0){this.healthchanged += dt;}
    if (this.healthchanged > this.damageTimer){this.healthchanged =0;}

    if (this.active){
      this.prev= createVector (this.heading.x * this.position.x, this.heading.y *this.position.y);
      this.prev.normalize();
      this.position.add(this.prev.mult(this.velocity*dt));
    }
  }

}
