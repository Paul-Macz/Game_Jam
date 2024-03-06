import Player from "/src/js/Beings/player.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Range from "/src/js/Items/range.js";

var calque_nature;
var calque_rochers;

export default class niveau3 extends Phaser.Scene {
  constructor(){
      super({key: "niveau3" })
  }

  preload(){
      this.load.spritesheet("img_perso", "src/assets/dude.png", {
          frameWidth: 32,
          frameHeight: 48
        });  
    
        this.load.image("Phaser_tuiles1", "src/assets/castle.png");
        this.load.image("Phaser_tuiles2", "src/assets/greencastle.png");

        this.load.tilemapTiledJSON("carte", "src/assets/sidemoon_level.json");
       
  }
  create() {
      const carteDuNiveau = this.make.tilemap({ key: "carte" });

      const tileset = carteDuNiveau.addTilesetImage("castle", "Phaser_tuiles1");
      const tileset1 = carteDuNiveau.addTilesetImage("greencastle", "Phaser_tuiles2");
      
      const black_background =  carteDuNiveau.createLayer("black_background", tileset);
      
      const green_background = carteDuNiveau.createLayer("green_background", tileset);
      
      const grey_background = carteDuNiveau.createLayer("grey_brackground", tileset);
     
      const ground = carteDuNiveau.createLayer("ground", [tileset, tileset1]);

      const playground = carteDuNiveau.createLayer("playground", [tileset, tileset1]);

      playground.setCollisionByProperty({ estSolide: true });
  
      this.cursors = this.input.keyboard.createCursorKeys();
      this.boundx=0;
      this.boundy=0;
      this.boundWidth=carteDuNiveau.widthInPixels;
      this.boundsHeight=carteDuNiveau.heightInPixels;
      
      // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
      const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 
      this.groupe_ennemis = this.physics.add.group();

      this.player = new Player(this, "img_perso", 170, 30, playground);
      this.physics.add.collider(this.player.sprite, playground);
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);
      

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundsHeight);
              // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
              tab_points.objects.forEach(point => {
                if (point.name == "terrestre") { 
                  var nouvel_ennemi = new Terrestre(this,"img_perso",point.x, point.y,calque_nature,calque_rochers);
                  nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
                  this.groupe_ennemis.add(nouvel_ennemi.sprite);
                    }
                });   
       
        /*****************************************************
       *  ajout du modele de mobilite des ennemis *
         ******************************************************/
       // par défaut, on va a gauche en utilisant la meme animation que le personnage
            this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
              un_ennemi.setVelocityX(-90);
              un_ennemi.direction = "left";
              un_ennemi.anims.play("turn_left", true);
            });

    }
  
    update() {
      this.player.update()
    
  if (this.player.gameOver) {
    this.physics.pause();
    this.player.sprite.setTint(0x444444);
    this.player.sprite.anims.play("stand");
    this.time.delayedCall(3000,this.restartScene,[],this);
  } 
}
restartScene() {
  this.scene.stop('niveau3');
  this.scene.start('niveau3');
 }
}















