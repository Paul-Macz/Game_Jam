export function doNothing() {
    // cette fonction ne fait rien.
    // c'est juste un exemple pour voir comment mettre une fonction
    // dans un fichier et l'utiliser dans les autres
}


export function doAlsoNothing() {
    // cette fonction ne fait rien non plus.
 }

   
export function ramasserEtoile(un_player, une_etoile) {
    // on désactive le "corps physique" de l'étoile mais aussi sa texture
    // l'étoile existe alors sans exister : elle est invisible et ne peut plus intéragir
    une_etoile.disableBody(true, true);
    
    if (groupe_etoiles.countActive() == 0) {
      var x;
      if (player.x < 400) {
        x = Phaser.Math.Between(400, 800);
      } else {
        x = Phaser.Math.Between(0, 400);
      }
  
      var une_bombe = groupe_bombes.create(x, 16, "img_bombe");
      une_bombe.setBounce(1);
      une_bombe.setCollideWorldBounds(true);
      une_bombe.setVelocity(Phaser.Math.Between(-200, 200), 20);
      une_bombe.allowGravity = false;
      groupe_etoiles.children.iterate(function iterateur(etoile_i) {
        etoile_i.enableBody(true, etoile_i.x, 0, true, true);
      });
  } 
  score += 10;
    zone_texte_score.setText("Score: " + score); 
    
  } 
  
export function chocAvecBombe(un_player, une_bombe) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("anim_face");
    gameOver = true;
  }
