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
var light;
var niv2;
export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
  this.load.image("Phaser_tuilesdejeu1", "src/assets/tiles.png");
  this.load.image("Phaser_tuilesdejeu2", "src/assets/miscellaneous.png");
  this.load.tilemapTiledJSON("carte", "src/assets/Niveau2.json"); 
  
}
  

  create() {
   niv2 = this.sound.add('niv2')
   niv2.play();
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

  this.porte_ouvrante2 = this.physics.add.staticSprite(60, 2280, "porte_ouvrante"); 
  this.porte_ouvrante2.ouverte = false; 

  // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
  const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 
  this.groupe_ennemis = this.physics.add.group();


  this.player = new Player(this,"battlemage",90,1360, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_volant);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);
      this.physics.add.collider(this.player.sprite, pics);
    
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.body.onWorldBounds = true; 

      
      
    

      this.weap = new Melee(this, "bull", 2, 5, 1, "fire-ball",true,10);
        this.magic = new Range(this, "magic", 2, 5, 1, "fire-ball", true, 1, 500, false);
        this.player.pickWeapon(this.weap);
        this.player.pickWeapon(this.magic);
        this.magic2 = new Range(this, "magic2", 1,10, 1, "holy-ball", true, 1, 600, false);
        this.player.pickWeapon(this.magic2);

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundHeight);
      
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      const randomNumber = Math.random();
      var image;
      // Distribution aléatoire de l'item
      if (randomNumber < 0.33 && point.name == "figther") {
          image="slime"
          
      } else if (randomNumber > 0.33 && randomNumber < 0.66 && point.name == "figther") {
          image="viking"
      } else if (randomNumber > 0.66 && randomNumber < 1 &&  point.name == "figther") {
          image="hache_rouge"
      }
      var nouvel_ennemi = new Terrestre(this,image,point.x, point.y,Calque_background);
      nouvel_ennemi.sprite.setCollideWorldBounds(true);
      nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
      this.groupe_ennemis.add(nouvel_ennemi.sprite);
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
      }); 

      this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        if(this.player.sprite.x < un_ennemi.x) {
          un_ennemi.setVelocityX(-60);
          // un_ennemi.anims.play("squelet_walk1",true)
        } else if(this.player.sprite.x > un_ennemi.x) {
          un_ennemi.setVelocityX(60);
          // un_ennemi.anims.play("squelet_walk2",true)
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
      let self=this
    this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
      self.physics.add.overlap(self.player.sprite, un_ennemi.ennemiObject.Drops, self.handlePlayerItemCollision, null, self);
  });
  }

  update() {

    this.player.update()

    if (this.player.gameOver) {
      this.player.death++;
      niv2.stop();
      niv2.stop()
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
  niv2.stop();
  this.scene.start("fin_niveau2");
 
}
handlePlayerEnnemiCollision(player, ennemiSp) {
  const knockbackForce = 200; // Adjust as needed

  // Calculate the direction from the enemy to the player
  const dx = player.x - ennemiSp.x;
  const dy = player.y - ennemiSp.y;

  // Normalize the direction vector
  const dir = new Phaser.Math.Vector2(dx, dy).normalize();

  // Apply a knockback force to both the player and enemy sprites
  player.setVelocity(dir.x * 2*knockbackForce, dir.y * knockbackForce);
  ennemiSp.setVelocity(-dir.x * knockbackForce, -dir.y * knockbackForce);

  // Damage the player
  if(!this.player.hurtState){
    this.player.getHit(ennemiSp.ennemiObject.equippedWeapon.damage);
  }
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
  handlePlayerItemCollision(playerSp, drop){
    if(!drop.item.used){ 
      drop.item.applyHealthBoost(this.player)
      if(this.player.PV>this.player.maxPV){
        this.player.PV=this.player.maxPV
      }
      drop.item.applyAttackSpeedBoost(this.player.equippedWeapon)
      drop.item.applyDamageBoost(this.player.equippedWeapon)
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
