

import Player from "/src/js/Beings/player.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Range from "/src/js/Items/range.js";
var calque_rochers;
var calque_nature;

export default class tutomap extends Phaser.Scene {
  constructor() {
    super({ key: "tutomap" });
  }

  preload() {
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });  
    this.load.spritesheet("img_ennemi", "src/assets/ennemi.png", {
      frameWidth: 32,
      frameHeight: 48
    }); 

    this.load.image("Phaser_tuiles1", "src/assets/tileset2.png");
    this.load.image("Phaser_tuiles2", "src/assets/clouds2.png");
    this.load.image("Phaser_tuiles3", "src/assets/sky2.png");
    this.load.image("Phaser_tuiles4", "src/assets/sea2.png");
    this.load.image("Phaser_tuiles5", "src/assets/far-grounds2.png");

    this.load.tilemapTiledJSON("carte", "src/assets/Tutorielmap.json"); 
  }

  create() {
    this.boundx=0;
      this.boundy=0;
      this.boundWidth=4800;
      this.boundHeight=3200;



    const carteDuNiveau = this.make.tilemap({ key: "carte" });

    const tileset1 = carteDuNiveau.addTilesetImage("tileset2", "Phaser_tuiles1");
    const tileset6 = carteDuNiveau.addTilesetImage("clouds2", "Phaser_tuiles2");
    const tileset3 = carteDuNiveau.addTilesetImage("sky2", "Phaser_tuiles3");
    const tileset4 = carteDuNiveau.addTilesetImage("sea2", "Phaser_tuiles4");
    const tileset5 = carteDuNiveau.addTilesetImage("far-grounds2", "Phaser_tuiles5");

    const calque_ciel = carteDuNiveau.createLayer("calque_ciel", tileset3);
    const calque_nuages = carteDuNiveau.createLayer("calque_nuages", tileset6);
    const calque_mer = carteDuNiveau.createLayer("calque_mer", tileset4);
    const calque_ile = carteDuNiveau.createLayer("calque_ile", tileset5);
    const calque_rochers = carteDuNiveau.createLayer("calque_rochers", tileset1);
    const calque_nature = carteDuNiveau.createLayer("calque_nature", tileset1);

    calque_nature.setCollisionByProperty({ estSolide: true });
    calque_rochers.setCollisionByProperty({ estSolide: true }); 

    this.cursors = this.input.keyboard.createCursorKeys();
    
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 
    this.groupe_ennemis = this.physics.add.group();
    
    this.player = new Player(this, "img_perso", 100, 450, calque_nature);
    this.physics.add.collider(this.player.sprite, calque_nature);
    this.physics.add.collider(this.player.sprite, calque_rochers);  
    this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setBounce(0.2);

    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.startFollow(this.player.sprite);

        // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
        tab_points.objects.forEach(point => {
          if (point.name == "ennemi") { 
            var nouvel_ennemi = new Terrestre(this,"img_perso",point.x, point.y,calque_nature,calque_rochers);
            nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
            this.groupe_ennemis.add(nouvel_ennemi.sprite);
          } else if (point.name == "ennemi2") { 
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

      this.player.sprite.body.world.on("worldbounds", function(body, up, down, left, right) {
        if (body.gameObject === this.player.sprite && down == true) {
            this.player.gameOver = true;
        }
    }, this);
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
    this.scene.stop('tutomap');
    this.scene.start('tutomap');
  }
}

