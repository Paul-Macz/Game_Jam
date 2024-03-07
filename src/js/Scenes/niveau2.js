import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js"
import Character from "/src/js/Beings/character.js";
import Flying from "/src/js/Beings/flying.js"
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";


var Calque_background; 
var calque_volant;
var calque_grotte;
var light;

export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    
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


  this.player = new Player(this,"battlemage",90,1360, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_volant);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);  
      this.player.sprite.setCollideWorldBounds(true);
      // this.player.sprite.setBounce(0.2);
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
      ); 
      
    

      this.weap = new Melee(this, "bull", 2, 10, 1, "bullet",true,10);
      this.player.pickWeapon(this.weap);
      

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundHeight);
      
    // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
    tab_points.objects.forEach(point => {
      if (point.name == "figther") { 
        var nouvel_ennemi = new Terrestre(this,"walk_squelette_1",point.x, point.y,Calque_background);
        nouvel_ennemi.sprite.setCollideWorldBounds(true);
        nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
        this.groupe_ennemis.add(nouvel_ennemi.sprite);
      }
  });  
  
  this.player.inventory.forEach(element => {
    if(element instanceof Range){
    this.physics.add.collider(element.Bullets,Calque_background,element.erase, null, element);
    this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
    }
  });
  this.physics.add.overlap(this.player.sprite, this.groupe_ennemis, this.handlePlayerEnnemiCollision, null, this);

  this.physics.add.overlap(this.player.swordHitbox,this.groupe_ennemis,this.handleSwordEnnemiCollision,null,this);

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
