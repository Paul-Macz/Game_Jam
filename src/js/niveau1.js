import * as fct from "/src/js/fonctions.js";
import Player from "/src/js/player.js";

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  }
  init (data){
    this.player=data.player1;
  }
  create(data) {
    fct.doNothing();
    fct.doAlsoNothing();
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.image(400, 300, "img_ciel");
    this.groupe_plateformes = this.physics.add.staticGroup();
    this.groupe_plateformes.create(200, 584, "img_plateforme");
    this.groupe_plateformes.create(600, 584, "img_plateforme");
    // ajout d'un texte distintcif  du niveau
    this.add.text(400, 100, "Vous êtes dans le niveau 1", {
      fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      fontSize: "22pt"
    });

    this.porte_retour = this.physics.add.staticSprite(100, 550, "img_porte1");
    
    if(data.player1===undefined){
      this.player = new Player(this,100,450);
      console.log("Creation");
    }
    else{
      this.player = data.pl;
      console.log("Recovery");
    }
    this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setBounce(0.2);
    
    this.physics.add.collider(this.player.sprite, this.groupe_plateformes);
  }

  update() {
    this.player.update();

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) == true) {
      if (this.physics.overlap(this.player.sprite, this.porte_retour)) {
        this.scene.switch("selection");
      }
    }
    
  if (this.player.gameOver) {
    this.physics.pause();
    this.player.sprite.setTint(0xff0000);
    this.player.sprite.anims.play("stand");
    this.time.delayedCall(3000,this.resetMap,[],this);
  } 
}
resetMap(){
  this.scene.restart();
}
}
