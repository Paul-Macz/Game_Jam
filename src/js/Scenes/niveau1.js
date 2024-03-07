import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js"
import Character from "/src/js/Beings/character.js";
import Flying from "/src/js/Beings/flying.js"
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";

// création et lancement du jeu
var ice;
var porte_ouvrante1;
var niv1;

export default class niveau1 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
        super({ key: "niveau1" }); //  ici on précise le nom de la classe en tant qu'identifiant
    }

    preload() {
        niv1=this.sound.add('niv1');
        niv1.play();
        this.load.spritesheet("img_ennemi", "src/assets/ennemi.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image("Phaser_tuilesdejeu", "src/assets/snow.png");
        this.load.image("Phaser_tuilesdejeu1", "src/assets/ice.png");
        this.load.image("Phaser_tuilesdejeu2", "src/assets/neige.png");


        this.load.tilemapTiledJSON("Iced", "src/assets/niveauIce.json");
    }

    create() {

       

        this.boundx = 0;
        this.boundy = 0;
        this.boundWidth = 3200;
        this.boundHeight = 3200;
        
        const carteDuNiveau = this.add.tilemap("Iced");
        const tileset = carteDuNiveau.addTilesetImage("snow", "Phaser_tuilesdejeu");
        const tileset1 = carteDuNiveau.addTilesetImage("ice", "Phaser_tuilesdejeu1");
        const tileset2 = carteDuNiveau.addTilesetImage("neige", "Phaser_tuilesdejeu2");



        const fond = carteDuNiveau.createLayer("fond",[tileset1, tileset2]);
       fond.setTint(0x6b6b6b)
        const fond_blanc = carteDuNiveau.createLayer("fond_blanc",[ tileset,tileset1,tileset2]);
        const object = carteDuNiveau.createLayer("object", [tileset,tileset1,tileset2]);
        const ice = carteDuNiveau.createLayer("ice", [tileset,tileset1,tileset2]);
        ice.setCollisionByProperty({ estSolide: true });


        this.porte_ouvrante1 = this.physics.add.staticSprite(560, 580, "porte_ouvrante"); 
        this.porte_ouvrante1.ouverte = false; 


        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new Player(this,"battlemage", 80, 2500, ice);
        this.player.sprite.setCollideWorldBounds(true);
        // this.player.sprite.setBounce(0.2);
        this.player.sprite.body.onWorldBounds = true;

        this.player.sprite.body.world.on("worldbounds", function(body, up, down, left, right) {
            if (body.gameObject === this.player.sprite && down == true) {
                this.player.gameOver = false;
            }
        }, this);

        this.weap = new Melee(this, "bull", 20, 20, 1, "fire-ball",true,10);
      this.magic = new Range(this, "magic", 2, 10, 1, "fire-ball", true, 1, 500, false);
      this.player.pickWeapon(this.weap);
      this.player.pickWeapon(this.magic);
      this.magic2 = new Range(this, "magic2", 5,50, 1, "holy-ball", true, 1, 700, false);
      this.player.pickWeapon(this.magic2);

        const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");

        this.groupe_ennemis = this.physics.add.group();
        this.groupe_ennemis = this.physics.add.group();

        this.physics.add.collider(this.groupe_ennemis, ice);
        this.physics.world.setBounds(this.boundx,this.boundy,this.boundWidth,this.boundHeight)
        tab_points.objects.forEach(point => {
            const randomNumber = Math.random();
            // console.log(randomNumber)
            var image;
            // Distribution aléatoire de l'item
            if (randomNumber < 0.33 && point.name == "ennemi_sol") {
                image="slime"
                
            } else if (randomNumber > 0.33 && randomNumber < 0.66 && point.name == "ennemi_sol") {
                image="viking"
            } else if (randomNumber > 0.66 && randomNumber < 1 &&  point.name == "ennemi_sol") {
                image="hache_rouge"
            }
            console.log(image)
            var nouvel_ennemi = new Terrestre(this,image,point.x, point.y,ice);
            // console.log(nouvel_ennemi)
            nouvel_ennemi.sprite.setCollideWorldBounds(true);
            console.log(nouvel_ennemi.image)
            nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
            this.groupe_ennemis.add(nouvel_ennemi.sprite);
      });
      this.cameras.main.setZoom(1)
       this.player.inventory.forEach(element => {
        if(element instanceof Range){
        this.physics.add.collider(element.Bullets,ice,element.erase, null, element);
        this.physics.add.overlap(element.Bullets,this.groupe_ennemis,element.hit,null,element);
        }
      });
      this.physics.add.overlap(this.player.sprite, this.groupe_ennemis, this.handlePlayerEnnemiCollision, null, this);
      this.physics.add.overlap(this.player.swordHitbox,this.groupe_ennemis,this.handleSwordEnnemiCollision,null,this);
    
      this.groupe_ennemis.children.iterate(function (un_ennemi, iterateur) {
          un_ennemi.setVelocityX(-90);
          un_ennemi.direction = "left";
        //    un_ennemi.anims.play("turn_left", true);
       });

    }

    handlePlayerEnnemiCollision(player, ennemiSp) {
        if (ennemiSp.ennemiObject instanceof Character) {
            console.log("check")
        }
        console.log(ennemiSp)
        const dx = this.player.sprite.x - ennemiSp.x;
        const dy = this.player.sprite.y - ennemiSp.y;
        const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(200)
        this.player.sprite.setVelocity(dir.x, dir.y)
        this.player.getHit(ennemiSp.ennemiObject.equipWeapon.damage)
    }

    update() {
        this.player.update()

        if (this.player.gameOver) {
            this.player.death++;
            niv1.stop()
            if(this.player.death==1){
            this.physics.pause();
            this.player.deathState=true
            this.player.sprite.anims.play("battlemage_death",true);
            // this.player.sprite.setTint(0x444444);
            this.time.delayedCall(3000,this.restartScene,[],this);
          }
        }
        if ( Phaser.Input.Keyboard.JustDown(this.cursors.space) == true &&
        this.physics.overlap(this.player.sprite, this.porte_ouvrante1) == true) {
       // le personnage est sur la porte et vient d'appuyer sur espace
       if (this.porte_ouvrante1.ouverte == false) {
        this.porte_ouvrante1.anims.play("anim_ouvreporte");
        this.porte_ouvrante1.ouverte = true;
        this.time.delayedCall(1000,this.openDoor,[],this)
        
      } else {
        this.porte_ouvrante1.anims.play("anim_fermeporte");
        this.porte_ouvrante1.ouverte = false;
      }
      } 

        this.groupe_ennemis.children.iterate(function (un_ennemi, iterateur) {
            un_ennemi.ennemiObject.update();
        });
    }openDoor(){
        niv1.stop()
    this.scene.start("fin_niveau1");
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
        this.scene.stop('niveau1');
        this.scene.start('niveau1');
    }
}
