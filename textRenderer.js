class textRenderer {
  constructor () {
    this.damageText = [];
    this.playerText = [1];
  }

  addDamageText (newText) {this.damageText[this.damageText.length] = newText;}
  addplayerText (newText) {this.playerText[this.playerText.length] = newText;}

  updateAllText (dt){
    for (var t = 0; t<this.damageText.length; t++){
      this.damageText[t][2] += dt ;
      if (this.damageText[t][2] > 1.5){this.damageText.splice(t,1);t--;}
    }
    for (var t = 0; t<this.playerText.length; t++){}
  }

  drawAllText (ph){
    for (var t = 0; t<this.damageText.length; t++){
      var timeModifer = this.damageText[t][2];
      if (this.damageText[t][0][1]){
        stroke(max (255 - 192 * timeModifer, 0) ,  255 - 160 * timeModifer);
        strokeWeight (2 - 1 *timeModifer);
        fill(32, 32, 32, 255- 160 * timeModifer);
        textSize(48-24*timeModifer);
      }else{
        fill(64, 32, 64, 255- 160 *timeModifer);
        textSize(32-20*timeModifer);
        stroke(64, 255 - 160 *timeModifer);
        strokeWeight (2 - 1 *timeModifer);
      }
        text(this.damageText[t][0][0],this.damageText[t][1].x , this.damageText[t][1].y);
    }
      for (var t = 0; t<this.playerText.length; t++){
        textSize(24);
        strokeWeight (1);
        stroke (0,0,0, 255);
        textAlign (CENTER, CENTER);
        fill (0,0,0, 255);
        text (ph, 0, 0);
      }
      textSize(24);
      strokeWeight (1);
      stroke (0,0,0, 255);
      textAlign (CENTER, CENTER);
      fill (0,0,0, 255);
      text (score, -width/2+24, -height/2+24);

  }
  drawEndGame(){
    textSize(24);
    strokeWeight (1);
    stroke (0,0,0, 255);
    textAlign (CENTER, CENTER);
    fill (0,0,0, 255);
    text ('GAME OVER', 0, 0);
  }


}
