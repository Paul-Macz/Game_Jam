

import Player from "/src/js/Beings/player.js";
var calque_rochers;
export default class niveau3 extends Phaser.Scene {
  constructor() {
    super({ key: "niveau3" });
  }

  preload() {
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });  

    this.load.image("Phaser_tuiles1", "src/assets/tileset2.png");
    this.load.image("Phaser_tuiles2", "src/assets/clouds2.png");
    this.load.image("Phaser_tuiles3", "src/assets/sky2.png");
    this.load.image("Phaser_tuiles4", "src/assets/sea2.png");
    this.load.image("Phaser_tuiles5", "src/assets/far-grounds2.png");

    this.load.tilemapTiledJSON("carte", "src/assets/Tutorielmap.json"); 
  }

  create() {
    const carteDuNiveau = this.make.tilemap({ key: "carte" });

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

    this.cursors = this.input.keyboard.createCursorKeys();

    this.player = new Player(this, "img_perso", 100, 450, calque_nature);
    this.physics.add.collider(this.player.sprite, calque_nature);
    this.physics.add.collider(this.player.sprite, calque_rochers);  
    this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setBounce(0.2);

    this.physics.world.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.setBounds(0, 0, carteDuNiveau.widthInPixels, carteDuNiveau.heightInPixels);
    this.cameras.main.startFollow(this.player.sprite); 
  }

  update() {
    this.player.update();
  }
}

