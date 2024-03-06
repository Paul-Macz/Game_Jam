// import * as fct from "/src/js/fonctions.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Player from "/src/js/Beings/player.js";
import Range from "/src/js/Items/range.js";

// création et lancement du jeu
var calque_plateformes;

export default class niveau1 extends Phaser.Scene {
    // constructeur de la classe
    constructor() {
        super({ key: "niveau1" }); //  ici on précise le nom de la classe en tant qu'identifiant
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
        this.load.image("Phaser_tuilesdejeu", "src/assets/tuilesJeu.png");
        this.load.tilemapTiledJSON("carte", "src/assets/map.json");
    }

    create() {
        this.boundx = 0;
        this.boundy = 0;
        this.boundWidth = 3200;
        this.boundHeight = 640;

        const carteDuNiveau = this.add.tilemap("carte");
        const tileset = carteDuNiveau.addTilesetImage("tuiles_de_jeu", "Phaser_tuilesdejeu");

        const calque_background = carteDuNiveau.createLayer("calque_background", tileset);
        const calque_background_2 = carteDuNiveau.createLayer("calque_background_2", tileset);
        calque_plateformes = carteDuNiveau.createLayer("calque_plateformes", tileset);
        calque_plateformes.setCollisionByProperty({ estSolide: true });

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = new Player(this, "img_perso", 100, 450, calque_plateformes);
        this.player.sprite.setCollideWorldBounds(true);
        this.player.sprite.setBounce(0.2);
        this.player.sprite.body.onWorldBounds = true;

        this.player.sprite.body.world.on("worldbounds", function(body, up, down, left, right) {
            if (body.gameObject === this.player.sprite && down == true) {
                this.player.gameOver = true;
            }
        }, this);

        this.weap = new Range(this, "bull", 2, 10, 1, "bullet", true, 1, 1000, false);
        this.player.pickWeapon(this.weap);

        const tab_points = carteDuNiveau.getObjectLayer("calque_ennemis");

        this.groupe_ennemis = this.physics.add.group();

        this.physics.add.collider(this.groupe_ennemis, calque_plateformes);

        tab_points.objects.forEach(point => {
            if (point.name == "ennemi") {
                var nouvel_ennemi = new Terrestre(this, "img_perso", point.x, point.y, calque_plateformes);
                nouvel_ennemi.sprite.ennemiObject = nouvel_ennemi;
                this.groupe_ennemis.add(nouvel_ennemi.sprite);
            }
        });

        this.player.inventory.forEach(element => {
            this.physics.add.collider(element.Bullets, calque_plateformes, element.erase, null, element);
            this.physics.add.overlap(element.Bullets, this.groupe_ennemis, element.hit, null, element);
        });

        this.physics.add.collider(this.groupe_ennemis, this.player.sprite, this.handlePlayerEnnemiCollision, null, this);

        this.groupe_ennemis.children.iterate(function(un_ennemi,iterateur) {
            un_ennemi.setVelocityX(-90);
            un_ennemi.direction = "left";
            un_ennemi.anims.play("turn_left", true);
        });

        this.hit = 0;
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
    }

    update() {
        if (this.hit > 0) {}
        this.player.update()

        if (this.player.gameOver) {
            this.physics.pause();
            this.player.sprite.setTint(0x444444);
            this.player.sprite.anims.play("stand");
            this.time.delayedCall(3000, this.restartScene, [], this);
        }

        this.groupe_ennemis.children.iterate(function(un_ennemi,iterateur) {
            un_ennemi.ennemiObject.update();
        });
    }

    restartScene() {
        this.scene.stop('niveau1');
        this.scene.start('niveau1');
    }
}
