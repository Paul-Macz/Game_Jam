import * as fct from "/src/js/fonctions.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";
import Range from "/src/js/Items/range.js";

  // création et lancement du jeu
  var calque_plateformes; 
  var calque_plateformes;

export default class niveau1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
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
      this.load.image("Phaser_tuilesdejeu", "src/assets/tuilesJeu.png");
      this.load.tilemapTiledJSON("carte", "src/assets/map.json"); 
    }

    create() {  
      this.boundx=0;
      this.boundy=0;
      this.boundWidth=3200;
      this.boundHeight=640;

      const carteDuNiveau = this.add.tilemap("carte");
      const tileset = carteDuNiveau.addTilesetImage(
        "tuiles_de_jeu",
        "Phaser_tuilesdejeu"
      );  
      
      const calque_background = carteDuNiveau.createLayer(
        "calque_background",
        tileset
      );
      const calque_background_2 = carteDuNiveau.createLayer(
        "calque_background_2",
        tileset
      );
      calque_plateformes = carteDuNiveau.createLayer(
        "calque_plateformes",
        tileset
      ); 
      calque_plateformes.setCollisionByProperty({ estSolide: true }); 


      this.cursors = this.input.keyboard.createCursorKeys();

      this.player = new Player(this,"img_perso",100,450, calque_plateformes);
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);

      this.player.sprite.body.onWorldBounds = true; 

      this.player.sprite.body.world.on(
        "worldbounds", // evenement surveillé
        function (body, up, down, left, right) {
          // on verifie si la hitbox qui est rentrée en collision est celle du player,
          // et si la collision a eu lieu sur le bord inférieur du player
          if (body.gameObject === this.player.sprite && down == true) {
            // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
            this.player.gameOver=true;
          }
        },
        this
      ); 

      this.weap = new Range(this, "bull", 2, 10, 1, "bullet",true,1,1000,false);
      this.player.pickWeapon(this.weap);
      
      //this.add.text(50,30,"TEST");
      
      
      this.physics.add.collider(this.player, calque_plateformes); 
      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundHeight);
      
    
      // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
      const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");   
      this.groupe_ennemis = this.physics.add.group();
    
      this.physics.add.collider(this.groupe_ennemis, calque_plateformes); 
      // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
      tab_points.objects.forEach(point => {
        if (point.name == "ennemi") { 
          var nouvel_ennemi = new Terrestre(this,"img_perso",point.x, point.y,calque_plateformes);
          nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
          this.groupe_ennemis.add(nouvel_ennemi.sprite);
        }
    });  
    this.player.inventory.forEach(element => {
      this.physics.add.collider(element.Bullets,calque_plateformes,element.erase, null, element);
      this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
    });
    
    // this.physics.add.overlap(this.player.this.groupe_ennemis,this.player.getHit,[],this)

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
    this.scene.stop('niveau1');
    this.scene.start('niveau1');
  }
} 
