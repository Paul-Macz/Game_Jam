import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js"
import Character from "/src/js/Beings/character.js";
import Flying from "/src/js/Beings/flying.js"
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";


var playground;
var porte_ouvrante3;
var niv3;
export default class niveau3 extends Phaser.Scene {
  constructor(){
      super({key: "niveau3" })
  }

  preload(){    
        this.load.image("Phaser_tuilesDeJEU1", "src/assets/castle.png");
        this.load.image("Phaser_tuilesDeJEU2", "src/assets/greencastle.png");

        this.load.tilemapTiledJSON("carte3", "src/assets/niveau3.json");
       
  }
  create() {
    niv3=this.sound.add('niv3')
    niv3.play()
      const carteDuNiveau = this.make.tilemap({ key: "carte3" });

      const tileset = carteDuNiveau.addTilesetImage("castle", "Phaser_tuilesDeJEU1");
      const tileset1 = carteDuNiveau.addTilesetImage("greencastle", "Phaser_tuilesDeJEU2");
      
      const black_background =  carteDuNiveau.createLayer("black_background", tileset);
      
      const green_background = carteDuNiveau.createLayer("green_background", tileset);
      green_background.setTint(0x588f71)
      const grey_background = carteDuNiveau.createLayer("grey_background", tileset);
      grey_background.setTint(0x4a4a4a)
      const ground = carteDuNiveau.createLayer("ground", [tileset, tileset1]);

       playground = carteDuNiveau.createLayer("playground", [tileset, tileset1]); 

      
      

      playground.setCollisionByProperty({ estSolide: true });

      this.porte_ouvrante3 = this.physics.add.staticSprite(4500, 580, "porte_ouvrante"); 
      this.porte_ouvrante3.ouverte = false; 

  
      this.cursors = this.input.keyboard.createCursorKeys();
      this.boundx=0;
      this.boundy=0;
      this.boundWidth=carteDuNiveau.widthInPixels;
      this.boundsHeight=carteDuNiveau.heightInPixels;
      
      // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
      const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 
      this.groupe_ennemis = this.physics.add.group();

      this.player = new Player(this,"battlemage", 170, 40, playground);
      this.physics.add.collider(this.player.sprite, playground);
      this.player.sprite.setCollideWorldBounds(true);
      // this.player.sprite.setBounce(0.2);
      this.player.sprite.body.world.on(
        "worldbounds", // evenement surveillé
        function (body, up, down, left, right) {
          // on verifie si la hitbox qui est rentrée en collision est celle du player,
          // et si la collision a eu lieu sur le bord inférieur du player
          // if (body.gameObject === this.player.sprite && down == true) {
          //   // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
          //   this.player.gameOver=true;
          // }
        },
      ); 
      this.weap = new Melee(this, "bull", 20, 20, 1, "fire-ball",true,10);
      this.magic = new Range(this, "magic", 2, 10, 1, "fire-ball", true, 1, 500, false);
      this.player.pickWeapon(this.weap);
      this.player.pickWeapon(this.magic);
        this.cameras.main.setZoom(1);
        this.magic2 = new Range(this, "magic2", 5,50, 1, "holy-ball", true, 1, 700, false);
        this.player.pickWeapon(this.magic2);

      this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundsHeight);
              // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
              tab_points.objects.forEach(point => {
                const randomNumber = Math.random();
                var image;
                // Distribution aléatoire de l'item
                if (randomNumber < 0.33 && point.name == "terrestre") {
                    image="slime"
                    
                } else if (randomNumber > 0.33 && randomNumber < 0.66 && point.name == "terrestre") {
                    image="viking"
                } else if (randomNumber > 0.66 && randomNumber < 1 &&  point.name == "terrestre") {
                    image="hache_rouge"
                }
                //console.log(image)
                var nouvel_ennemi = new Terrestre(this,image,point.x, point.y,playground);
                // console.log(nouvel_ennemi)
                nouvel_ennemi.sprite.setCollideWorldBounds(true);
                console.log(nouvel_ennemi.image)
                nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
                this.groupe_ennemis.add(nouvel_ennemi.sprite);
          });
                this.player.sprite.body.world.on(
        "worldbounds", // evenement surveillé
        function (body, up, down, left, right) {
          // on verifie si la hitbox qui est rentrée en collision est celle du player,
          // et si la collision a eu lieu sur le bord inférieur du player
          // if (body.gameObject === this.player.sprite && down == true) {
          //   // si oui : GAME OVER on arrete la physique et on colorie le personnage en rouge
          //   this.player.gameOver=true;
          // }
        },
      ); 
        
                this.player.inventory.forEach(element => {
                  if(element instanceof Range){
                  this.physics.add.collider(element.Bullets,playground,element.erase, null, element);
                  this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
                  }
                });
        this.physics.add.overlap(this.player.sprite, this.groupe_ennemis, this.handlePlayerEnnemiCollision, null, this);    
        this.physics.add.overlap(this.player.swordHitbox,this.groupe_ennemis,this.handleSwordEnnemiCollision,null,this);

    }
  
    update() {
      
    this.player.update()

    if (this.player.gameOver) {
      this.player.death++;
      niv3.stop();
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
  this.physics.overlap(this.player.sprite, this.porte_ouvrante3) == true) {
 // le personnage est sur la porte et vient d'appuyer sur espace
 if (this.porte_ouvrante3.ouverte == false) {
  this.porte_ouvrante3.anims.play("anim_ouvreporte");
  this.porte_ouvrante3.ouverte = true;
  this.time.delayedCall(1000,this.openDoor,[],this)
  
} else {
  this.porte_ouvrante3.anims.play("anim_fermeporte");
  this.porte_ouvrante3.ouverte = false;
}
} 

}
openDoor(){
  niv3.stop()
  this.scene.start("fin_niveau3");
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
restartScene() {
  this.scene.stop('niveau3');
  this.scene.start('niveau3');
 }
}