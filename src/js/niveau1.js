import * as fct from "/src/js/fonctions.js";
  
  // création et lancement du jeu
  var calque_plateformes; 
  var player;
  var clavier;
  var groupe_ennemis; 
  var groupe_etoiles; 
  var score = 0;
  var zone_texte_score; 
  var groupe_bombes; 
  var calque_plateformes;
  var gameOver = false;

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
      this.load.image("img_etoile", "src/assets/star.png"); 
      this.load.image("img_bombe", "src/assets/bomb.png"); 
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
      
      player = this.physics.add.sprite(100, 450, 'img_perso'); 
      player.setCollideWorldBounds(true); 
      
      player.setBounce(0.2); 
      clavier = this.input.keyboard.createCursorKeys(); 
      this.anims.create({
        key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
        frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }), // on prend toutes les frames de img perso numerotées de 0 à 3
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 // nombre de répétitions de l'animation. -1 = infini
      }); 
      this.anims.create({
        key: "anim_face",
        frames: [{ key: "img_perso", frame: 4 }],
        frameRate: 20
      }); 
      groupe_etoiles = this.physics.add.group(); 
      for (var i = 0; i < 10; i++) {
        var coordX = 70 + 70 * i;
        groupe_etoiles.create(coordX, 10, "img_etoile");
      } 
      this.physics.add.collider(groupe_etoiles, calque_plateformes); 
      groupe_etoiles.children.iterate(function iterateur(etoile_i) {
        // On tire un coefficient aléatoire de rerebond : valeur entre 0.4 et 0.8
        var coef_rebond = Phaser.Math.FloatBetween(0.4, 0.8);
        etoile_i.setBounceY(coef_rebond); // on attribut le coefficient de rebond à l'étoile etoile_i
      }); 
      this.physics.add.overlap(player, groupe_etoiles, ramasserEtoile, null, this);
      zone_texte_score = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' }); 
      groupe_bombes = this.physics.add.group(); 
      
      calque_plateformes.setCollisionByProperty({ estSolide: true }); 
      this.physics.add.collider(player, calque_plateformes); 
      this.physics.world.setBounds(0, 0, 3200, 640);
      this.cameras.main.setBounds(0, 0, 3200, 640);
      this.cameras.main.startFollow(player); 
    
      // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");   
    groupe_ennemis = this.physics.add.group();
    
    this.physics.add.collider(groupe_ennemis, calque_plateformes); 
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
        if (point.name == "ennemi") {
          var nouvel_ennemi = this.physics.add.sprite(point.x, point.y, "img_ennemi");
          nouvel_ennemi.setTint(0xff0000); 
          groupe_ennemis.add(nouvel_ennemi);
        }
    }); 
    
    /*****************************************************
       *  ajout du modele de mobilite des ennemis *
       ******************************************************/
      // par défaut, on va a gauche en utilisant la meme animation que le personnage
      groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        un_ennemi.setVelocityX(-90);
        un_ennemi.direction = "gauche";
        un_ennemi.play("anim_tourne_gauche", true);
      }); 
    }

    update() {
      if (clavier.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("anim_tourne_droite", true);
      } 
      else if (clavier.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("anim_tourne_gauche", true);
      } else {
        player.setVelocityX(0);
        player.anims.play('anim_face'); 
      } 
      if (clavier.up.isDown && player.body.blocked.down) {
        player.setVelocityY(-330);
      }
      if (gameOver) {
        return;
      }
    
    groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      if (un_ennemi.direction == "gauche" && un_ennemi.body.blocked.down) {
          var coords = un_ennemi.getBottomLeft();
          var tuileSuivante = calque_plateformes.getTileAtWorldXY(
              coords.x,
              coords.y + 10
          );
          if (tuileSuivante == null) {
              // on risque de marcher dans le vide, on tourne
              un_ennemi.direction = "droite";
              un_ennemi.setVelocityX(90);
              un_ennemi.play("anim_tourne_droite", true);
          } else if (un_ennemi.body.blocked.left) {
              un_ennemi.setVelocityY(-300);    
              // Déclencher le déplacement vers la gauche après quelques millisecondes
              setTimeout(function() {
                  un_ennemi.setVelocityX(-90);
              }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
          }    

      } else if (un_ennemi.direction == "droite" && un_ennemi.body.blocked.down) {
          var coords = un_ennemi.getBottomRight();
          var tuileSuivante = calque_plateformes.getTileAtWorldXY(
              coords.x,
              coords.y + 10
          );
          if (tuileSuivante == null) {
              // on risque de marcher dans le vide, on tourne
              un_ennemi.direction = "gauche";
              un_ennemi.setVelocityX(-90);
              un_ennemi.play("anim_tourne_gauche", true);
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

function ramasserEtoile(un_player, une_etoile) {
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

function chocAvecBombe(un_player, une_bombe) {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play("anim_face");
  gameOver = true;
}

function predictTilemapCollision(tilemapLayer, x, y, width, height, stepWidth, stepHeight) {
  // Convertir les coordonnées du monde en coordonnées de tuile
  var startX = Math.floor(x / tilemapLayer.tileWidth);
  var endX = Math.ceil((x + width) / tilemapLayer.tileWidth);
  var startY = Math.floor(y / tilemapLayer.tileHeight);
  var endY = Math.ceil((y + height) / tilemapLayer.tileHeight);

  // Parcourir les tuiles dans la zone définie par les coordonnées
  for (var tileY = startY; tileY < endY; tileY += stepHeight) {
      for (var tileX = startX; tileX < endX; tileX += stepWidth) {
          var tile = tilemapLayer.getTileAt(tileX, tileY);
          if (tile && tile.collides) {
              // Collision détectée
              return true;
          }
      }
  }

  // Aucune collision détectée
  return false;
}

