import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js"
import Character from "/src/js/Beings/character.js";
import Flying from "/src/js/Beings/flying.js"
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";

var calque_rochers;
var calque_nature;
var porte_ouvrante; 
var tuto_ost
export default class tutomap extends Phaser.Scene {
  constructor() {
    super({ key: "tutomap" });
  }

  preload() {
    this.load.image("Phaser_tuiles1", "src/assets/tileset2.png");
    this.load.image("Phaser_tuiles2", "src/assets/clouds2.png");
    this.load.image("Phaser_tuiles3", "src/assets/sky2.png");
    this.load.image("Phaser_tuiles4", "src/assets/sea2.png");
    this.load.image("Phaser_tuiles5", "src/assets/far-grounds2.png");
    this.load.tilemapTiledJSON("carte_tuto", "src/assets/Tutorielmap.json"); 
  }

  create() {
    this.boundx=0;
      this.boundy=0;
      this.boundWidth=4800;
      this.boundHeight=3200;

      tuto_ost = this.sound.add('tuto_ost');
      tuto_ost.play(); 

    const carteDuNiveau = this.make.tilemap({ key: "carte_tuto" });

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

    this.porte_ouvrante = this.physics.add.staticSprite(4540, 740, "porte_ouvrante"); 
    this.porte_ouvrante.ouverte = false; 
    this.cursors = this.input.keyboard.createCursorKeys();
    
    // extraction des poitns depuis le calque calque_ennemis, stockage dans tab_points
    const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis"); 

    this.groupe_ennemis = this.physics.add.group();
   
    this.player = new Player(this, "battlemage", 100, 500, calque_nature);
    
    this.player.sprite.body.onWorldBounds = true;
    this.physics.add.collider(this.player.sprite, calque_nature);
    this.physics.add.collider(this.player.sprite, calque_rochers);  
    this.player.sprite.setCollideWorldBounds(true);
    // this.player.sprite.setBounce(0.2);

    this.player.sprite.body.world.on("worldbounds", function(body, up, down, left, right) {
      if (body.gameObject === this.player.sprite && down == true) {
          this.player.deaths();

      }
  }, this);
    
    // this.weap = new Range(this, "bull", 2, 10, 1, "bullet", true, 1, 1000, false);
    this.weap = new Melee(this, "bull", 2, 10, 1, "bullet",true,10);

    this.player.pickWeapon(this.weap);

    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.startFollow(this.player.sprite);

    

        // on fait une boucle foreach, qui parcours chaque élements du tableau tab_points  
        tab_points.objects.forEach(point => {
          if (point.name == "ennemi") { 
            var nouvel_ennemi1 = new Terrestre(this,"hache_rouge",point.x, point.y,calque_nature,calque_rochers);
            nouvel_ennemi1.sprite.ennemiObject = nouvel_ennemi1;
            this.groupe_ennemis.add(nouvel_ennemi1.sprite);
          } else if (point.name == "ennemi2") { 
              var nouvel_ennemi2 = new Terrestre(this,"petit_squelette",point.x, point.y,calque_nature,calque_rochers);
              nouvel_ennemi2.sprite.ennemiObject = nouvel_ennemi2;
              this.groupe_ennemis.add(nouvel_ennemi2.sprite);
              }
          });   
 
         
      /*****************************************************
       *  ajout du modele de mobilite des ennemis *
       ******************************************************/
      // par défaut, on va a gauche en utilisant la meme animation que le personnage
      this.groupe_ennemis.children.iterate(function iterateur(un_ennemi) {
        un_ennemi.setVelocityX(-50); // L'ennemi va vers la gauche
        un_ennemi.direction = "left";
        un_ennemi.anims.play("hache_rouge_walk", true); // Joue l'animation de marche
        // Inverse l'échelle horizontale pour retourner l'animation
    });
    
    
      
  }
  handlePlayerEnnemiCollision(ennemiSp, player) {
    if (ennemiSp.ennemiObject instanceof Character) {
        console.log("check")
    }
    const dx = this.player.sprite.x - ennemiSp.x;
    const dy = this.player.sprite.y - ennemiSp.y;
    const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
    this.player.sprite.setVelocity(dir.x, dir.y)
    this.hit = 1
    this.player.getHit(ennemiSp.ennemiObject.equippedWeapon.damage)

    this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    this.physics.add.collider(this.groupe_ennemis, calque_nature);
    this.physics.add.collider(this.groupe_ennemis, calque_rochers);

}
  update() {
    this.player.update()

    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) == true  && this.physics.overlap(this.player.sprite, this.porte_ouvrante) == true) {
   // le personnage est sur la porte et vient d'appuyer sur espace
   if (this.porte_ouvrante.ouverte == false) {
    this.porte_ouvrante.anims.play("anim_ouvreporte");
    this.porte_ouvrante.ouverte = true;
    this.time.delayedCall(1000,this.openDoor,[],this)
  } else {
  this.porte_ouvrante.anims.play("anim_fermeporte");
  this.porte_ouvrante.ouverte = false;

  }
  } 

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
  openDoor(){
    this.scene.start("menu2");
  }

  restartScene() {
    this.scene.stop('tutomap');
    this.scene.start('menu');
  }
}

