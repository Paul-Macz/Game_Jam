import * as fct from "/src/js/fonctions.js";
import Ennemi from "/src/js/ennemi.js";
import Player from "/src/js/player.js";

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
      fct.doNothing();
      fct.doAlsoNothing();

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
      // this.physics.add.collider(this.player.sprite, calque_plateformes); 
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);

      this.weap = new Range(this, "bull", 1, 50, 1, "bullet",true,20,100);
      this.player.pickWeapon(this.weap);

      
      this.physics.add.collider(this.player, calque_plateformes); 
      this.physics.world.setBounds(0, 0, 3200, 640);
      this.cameras.main.setBounds(0, 0, 3200, 640);
      this.cameras.main.startFollow(this.player.sprite); 
    
      // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
      const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");   
      //this.groupe_ennemis = this.physics.add.group();
    
      this.physics.add.collider(this.groupe_ennemis, calque_plateformes); 
      // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
      tab_points.objects.forEach(point => {
        if (point.name == "ennemi") {
          var nouvel_ennemi = new Ennemi(calque_plateformes,this,"img_perso",point.x, point.y);
          nouvel_ennemi.sprite.setTint(0xff0000); 
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
          this.player.sprite.setTint(0xff0000);
          this.player.sprite.anims.play("stand");
          this.time.delayedCall(3000,this.resetMap,[],this);
      } 
    
    this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      if (un_ennemi.direction == "left" && un_ennemi.body.blocked.down) {
          var coords = un_ennemi.getBottomLeft();
          var tuileSuivante = calque_plateformes.getTileAtWorldXY(
              coords.x,
              coords.y + 10
          );
          if (tuileSuivante == null) {
              // on risque de marcher dans le vide, on tourne
              un_ennemi.direction = "droite";
              un_ennemi.setVelocityX(90);
              un_ennemi.play("turn_right", true);
          } else if (un_ennemi.body.blocked.left) {
              un_ennemi.setVelocityY(-300);    
              // Déclencher le déplacement vers la gauche après quelques millisecondes
              setTimeout(function() {
                  un_ennemi.setVelocityX(-90);
              }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
          }    

      } else if (un_ennemi.direction == "right" && un_ennemi.body.blocked.down) {
          var coords = un_ennemi.getBottomRight();
          var tuileSuivante = calque_plateformes.getTileAtWorldXY(
              coords.x,
              coords.y + 10
          );
          if (tuileSuivante == null) {
              // on risque de marcher dans le vide, on tourne
              un_ennemi.direction = "left";
              un_ennemi.setVelocityX(-90);
              un_ennemi.play("turn_left", true);
          } else if (un_ennemi.body.blocked.right) {
              un_ennemi.setVelocityY(-300);    
              // Déclencher le déplacement vers la gauche après quelques millisecondes
              setTimeout(function() {
                  un_ennemi.setVelocityX(90);
              }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
          }  
      }   
    });    
  }
} 
