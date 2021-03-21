class player extends entity {

    constructor (inPos, inSize, inBox, inHead) {
      //player base Structure
      super(inBox, inPos, inSize, 10, [190,60,40], [190,60,20], 1, 10, true, inHead, 0, 1.0, 2, 2, 0.2);

      //player gun structure
      this.playerGuns = [new playerGun ('rect', createVector (this.position.x+(this.size[0]*0.5),this.position.y), [this.size[0]*0.4, this.size[0]*0.20], 10, [190,20,50], [190,10,35], 1, 1, false, [0,0], 0, 0.5, 1, 1, 0)];

      //Array of all current bullets shot by player
      this.bullet = [];
    }

    addBullet(){
      angleMode(RADIANS);
      let h = createVector (1,1);
      this.playerGuns[0].gunTip.rotate(this.playerGuns[0].gunAngle);
      this.bullet[this.bullet.length] = new entity ('point', this.playerGuns[0].gunTip, [], 1, [0,0,0], [0,0,0], 8, 1, true, h, 60, 1, 1, 1, 0);
      this.playerGuns[0].gunTip = createVector (this.playerGuns[0].position.x+(this.playerGuns[0].size[0]*0.6),this.playerGuns[0].position.y);
    }

    updatePlayer(dt){
        super.update(dt);
        this.playerGuns[0].update();
        for (var i = 0; i<this.bullet.length; i++){
          if (this.bullet[i].active){this.bullet[i].update(dt); }
          else {this.bullet.splice(i,1);}
        }
    }

    drawPlayer(){
      super.drawEntity();
      this.playerGuns[0]. drawEntity();
      for (var i = 0; i<this.bullet.length; i++){this.bullet[i].drawEntity();}
    }


}
