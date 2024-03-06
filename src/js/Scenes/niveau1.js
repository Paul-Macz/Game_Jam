// import * as fct from "/src/js/fonctions.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";
import Range from "/src/js/Items/range.js";
import Character from "/src/js/Beings/character.js";

// création et lancement du jeu
var ice;
var porte_ouvrante1;

export default class niveau1 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
        super({ key: "niveau1" }); //  ici on précise le nom de la classe en tant qu'identifiant
    }

    preload() {
        this.load.spritesheet("img_ennemi", "src/assets/ennemi.png", {
            frameWidth: 32,
            frameHeight: 48
        });
        this.load.image("Phaser_tuilesdejeu", "src/assets/snow.png");
        this.load.image("Phaser_tuilesdejeu1", "src/assets/ice.png");
        this.load.image("Phaser_tuilesdejeu2", "src/assets/neige.png");


        this.load.tilemapTiledJSON("Iced", "src/assets/niveauIced.json");
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

        this.weap = new Range(this, "bull", 2, 10, 1, "bullet", true, 1, 1000, false);
        this.player.pickWeapon(this.weap);

        const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");

        this.groupe_ennemis = this.physics.add.group();

        this.physics.add.collider(this.groupe_ennemis, ice);
        this.physics.world.setBounds(this.boundx,this.boundy,this.boundWidth,this.boundHeight)
        tab_points.objects.forEach(point => {
            if (point.name == "ennemi_sol") {
                var nouvel_ennemi = new Terrestre(this, "img_perso", point.x, point.y, ice);
                nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
               this.groupe_ennemis.add(nouvel_ennemi.sprite);
           }
        });
        tab_points.objects.forEach(point => {
            if (point.name == "ennemi_air") {
                var nouvel_ennemi = new Flying(this, "img_perso", point.x, point.y, ice);
                nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
               this.groupe_ennemis.add(nouvel_ennemi.sprite);
           }
        });

        this.player.inventory.forEach(element => {
            this.physics.add.collider(element.Bullets, ice, element.erase, null, element);
            this.physics.add.overlap(element.Bullets, this.groupe_ennemis, element.hit, null, element);
        });

        this.physics.add.collider(this.player.sprite, this.groupe_ennemis, this.handlePlayerEnnemiCollision, null, this);

        this.groupe_ennemis.children.iterate(function (un_ennemi, iterateur) {
            un_ennemi.setVelocityX(-90);
           un_ennemi.direction = "left";
            un_ennemi.anims.play("turn_left", true);
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
            this.physics.pause();
            this.player.sprite.setTint(0x444444);
            this.player.sprite.anims.play("stand");
            this.time.delayedCall(3000, this.restartScene, [], this);
        }

        if ( Phaser.Input.Keyboard.JustDown(this.cursors.space) == true &&
        this.physics.overlap(this.player.sprite, this.porte_ouvrante) == true) {
       // le personnage est sur la porte et vient d'appuyer sur espace
       if (this.porte_ouvrante.ouverte == false) {
        this.porte_ouvrante.anims.play("anim_ouvreporte");
        this.porte_ouvrante.ouverte = true;
        this.scene.start("niveau2");
      } else {
        this.porte_ouvrante.anims.play("anim_fermeporte");
        this.porte_ouvrante.ouverte = false;
      }
      } 

        this.groupe_ennemis.children.iterate(function (un_ennemi, iterateur) {
            un_ennemi.ennemiObject.update();
        });
    }

    restartScene() {
        this.scene.stop('niveau1');
        this.scene.start('niveau1');
    }
}
