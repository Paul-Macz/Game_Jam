import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js"
import Character from "/src/js/Beings/character.js";
import Flying from "/src/js/Beings/flying.js"
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";

var porte_ouvrante2;
var Calque_background; 
var calque_volant;
var calque_grotte;
var pics;
var light;

export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  
  this.load.atlas('petit_squelette',"src/assets/ennemis/petit_squelette/petit_squelette.png","src/assets/ennemis/petit_squelette/petit_squelette.json");
  this.load.atlas('squelette_hache',"src/assets/ennemis/squelette_hache/squelette_hache.png","src/assets/ennemis/squelette_hache/squelette_hache.json");
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
   pics = carteDuNiveau.createLayer(
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
  pics.setCollisionByProperty({ estSolide: true});
  pics.setCollisionByProperty({estMort: true});
  this.cursors = this.input.keyboard.createCursorKeys();

  this.porte_ouvrante2 = this.physics.add.staticSprite(60, 2270, "porte_ouvrante"); 
  this.porte_ouvrante2.ouverte = false; 

  // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
  const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 
  this.groupe_ennemis = this.physics.add.group();


  this.player = new Player(this,"battlemage",90,1360, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_volant);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);
      this.physics.add.collider(this.player.sprite, pics, function(player, tile) {
        // Récupérer la tuile avec ses propriétés
    const properties = tile.properties;
    console.log("hi")
        // Si la tuile avec laquelle le joueur entre en collision est mortelle
        if (properties && properties.estMort) {
            gameOver(); // Appeler la fonction de fin de jeu
        }
    });
    
      this.player.sprite.setCollideWorldBounds(true);
      // this.player.sprite.setBounce(0.2);
      this.player.sprite.body.onWorldBounds = true; 

      
      
    

      this.weap = new Melee(this, "bull", 2, 10, 1, "bullet",true,10);
      this.player.pickWeapon(this.weap);
      //this.cameras.main.setZoom(0.2);

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundHeight);
      
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "figther") { 
        var nouvel_ennemi = new Terrestre(this,"squelette_hache",point.x, point.y,Calque_background);
        nouvel_ennemi.sprite.setCollideWorldBounds(true);
        nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
        this.groupe_ennemis.add(nouvel_ennemi.sprite);
      }else if (point.name == "figther2"){
        var nouvel_ennemi2 = new Terrestre(this,"petit_squelette",point.x, point.y,Calque_background);
        nouvel_ennemi2.sprite.setCollideWorldBounds(true);
        nouvel_ennemi2.sprite.ennemiObject = nouvel_ennemi2;
      }
  });  
  
  this.player.inventory.forEach(element => {
    if(element instanceof Range){
    this.physics.add.collider(element.Bullets,Calque_background,element.erase, null, element);
    this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
    }
  });
  this.physics.add.collider(this.player.sprite, this.groupe_ennemis, this.handlePlayerEnnemiCollision, null, this);

  this.physics.add.overlap(this.player.swordHitbox,this.groupe_ennemis,this.handleSwordEnnemiCollision,null,this);

      /*****************************************************
       *  ajout du modele de mobilite des ennemis *
       ******************************************************/
      // par défaut, on va a gauche en utilisant la meme animation que le personnage
    this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        un_ennemi.setVelocityX(-30);
        un_ennemi.direction = "left";
        un_ennemi.anims.play('squelette_hache_walk', true);
        un_ennemi.anims.play
      }); 

      this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        if(this.player.sprite.x < un_ennemi.x) {
          un_ennemi.setVelocityX(-60);
          un_ennemi.anims.play("squelet_walk1",true)
        } else if(this.player.sprite.x > un_ennemi.x) {
          un_ennemi.setVelocityX(60);
          un_ennemi.anims.play("squelet_walk2",true)
        } else {
          un_ennemi.setVelocityX(0);
        }
        if(this.player.sprite.y < un_ennemi.y) {
          un_ennemi.setVelocityY(-70);
          
        } else if(this.player.sprite.y > un_ennemi.y) {
          un_ennemi.setVelocityY(60);
          
        } else {
          un_ennemi.setVelocityY(0);
        } if (this.physics.world.overlap(this.player.sprite,un_ennemi)) {

        }
      },this);
  }

  update() {

    this.player.update()

    if (this.player.gameOver) {
      this.player.death++;
      if(this.player.death==1){
        this.physics.pause();
        this.player.deathState=true
        this.player.sprite.anims.play("battlemage_death",true);
        // this.player.sprite.setTint(0x444444);
        this.time.delayedCall(3000,this.restartScene,[],this);
      }
       
  } 
  this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
    un_ennemi.ennemiObject.update();
   
  }); 

  if ( Phaser.Input.Keyboard.JustDown(this.cursors.space) == true &&
  this.physics.overlap(this.player.sprite, this.porte_ouvrante2) == true) {
 // le personnage est sur la porte et vient d'appuyer sur espace
 if (this.porte_ouvrante2.ouverte == false) {
  this.porte_ouvrante2.anims.play("anim_ouvreporte");
  this.porte_ouvrante2.ouverte = true;
  this.time.delayedCall(1000,this.openDoor,[],this)
  
} else {
  this.porte_ouvrante2.anims.play("anim_fermeporte");
  this.porte_ouvrante2.ouverte = false;
}
} 

}
openDoor(){
  this.scene.start("fin_niveau2");
}
  handlePlayerEnnemiCollision(player, ennemiSp) {

    const dx = this.player.sprite.x - ennemiSp.x;
    const dy = this.player.sprite.y - ennemiSp.y;
    // console.log(dx,dy)
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
    this.player.sprite.setVelocity(dir.x, dir.y)
    this.player.getHit(ennemiSp.ennemiObject.equippedWeapon.damage)

}
  handleSwordEnnemiCollision(sword,ennemiSp){
    if(!(ennemiSp.ennemiObject instanceof Flying)){
    const dx = ennemiSp.x - sword.x;
    const dy = ennemiSp.y - sword.y;
    
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
    ennemiSp.setVelocity(dir.x, dir.y)
    ennemiSp.ennemiObject.getHit(this.player.equippedWeapon.damage)
    }
  }

  // resetSpeed(entity){
  //   entity.sprite.setVelocity(0,0)
  // }
  
  
  restartScene() {
    this.scene.stop('niveau2');
    this.scene.start('niveau2');
  }
}
