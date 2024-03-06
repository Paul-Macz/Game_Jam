
import * as fct from "/src/js/fonctions.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";
import Range from "/src/js/Items/range.js";
var Calque_background; 
var calque_plateformes;
var calque_grotte;
export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
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
    this.load.image("Phaser_tuilesdejeu1", "src/assets/tiles.png");
  this.load.image("Phaser_tuilesdejeu2", "src/assets/miscellaneous.png");
  this.load.tilemapTiledJSON("carte", "src/assets/Niveau2.json"); 
  
}
  

  create() {
    const carteDuNiveau = this.add.tilemap("carte");
  const tileset1 = carteDuNiveau.addTilesetImage(
    "tiles",
    "Phaser_tuilesdejeu1",
  ); 
  const tileset2 = carteDuNiveau.addTilesetImage(
    "miscellaneous",
    "Phaser_tuilesdejeu2"
  );

  const Fond_noir = carteDuNiveau.createLayer(
    "Fond_noir",
    tileset1,
   
  ); 
  const brique_fond = carteDuNiveau.createLayer(
    "brique_fond",
    tileset1,
    
  );
  const Calque_ladder = carteDuNiveau.createLayer(
    "Calque_ladder",
    tileset2
  )
  const calque_grotte = carteDuNiveau.createLayer(
    "calque_grotte",
    tileset1
  )
  const pics = carteDuNiveau.createLayer(
    "pics",
    tileset1
  )
  const calque_plateformes = carteDuNiveau.createLayer(
    "calque_plateformes",
    tileset2
  )
  const Calque_background = carteDuNiveau.createLayer(
    "Calque_background",
    tileset1,
    
  );

  Calque_background.setCollisionByProperty({ estSolide: true });
  calque_plateformes.setCollisionByProperty({ estSolide: true });
  calque_grotte.setCollisionByProperty({ estSolide: true });  
  this.cursors = this.input.keyboard.createCursorKeys();

   
// extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
const tab_points = carteDuNiveau.getObjectLayer("calque_fitgh"); 
this.groupe_ennemis = this.physics.add.group();


  this.player = new Player(this,"img_perso",100,450, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_plateformes);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);  
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);
    this.physics.world.setBounds(0, 0, 4800, 3200);
    this.cameras.main.setBounds(0, 0, 4800, 3200);
    this.cameras.main.startFollow(this.player.sprite); 

    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "figther") { 
        var nouvel_ennemi = new Terrestre(this,"img_perso",point.x, point.y,Calque_background);
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
    this.scene.stop('niveau2');
    this.scene.start('niveau2');
  }
}
