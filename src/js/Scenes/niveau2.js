
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";
import Range from "/src/js/Items/range.js";

var Calque_background; 
var calque_volant;
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
    this.boundx=0;
      this.boundy=0;
      this.boundWidth=4800;
      this.boundHeight=3200;


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
   calque_grotte = carteDuNiveau.createLayer(
    "calque_grotte",
    tileset1
  )
  const pics = carteDuNiveau.createLayer(
    "pics",
    tileset1
  )
   calque_volant = carteDuNiveau.createLayer(
    "calque_volant",
    tileset2
  )
  Calque_background = carteDuNiveau.createLayer(
    "Calque_background",
    tileset1,
    
  );

  Calque_background.setCollisionByProperty({ estSolide: true });
  calque_volant.setCollisionByProperty({ estSolide: true });
  calque_grotte.setCollisionByProperty({ estSolide: true });  
  this.cursors = this.input.keyboard.createCursorKeys();

   
// extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
const tab_points = carteDuNiveau.getObjectLayer("calque_figth"); 
this.groupe_ennemis = this.physics.add.group();


  this.player = new Player(this,"img_perso",90,1360, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_volant);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);  
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
      

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundHeight);
   
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "figther") { 
        var nouvel_ennemi = new Terrestre(this,"img_perso",point.x, point.y,Calque_background);
        nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
        this.groupe_ennemis.add(nouvel_ennemi.sprite);
      }
  });  
  this.player.inventory.forEach(element => {
    this.physics.add.collider(element.Bullets,Calque_background,element.erase, null, element);
    this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
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
  this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
    un_ennemi.ennemiObject.update();
   
  }); 
  }
  restartScene() {
    this.scene.stop('niveau2');
    this.scene.start('niveau2');
  }
}
