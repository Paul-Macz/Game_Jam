import Player from "/src/js/Beings/player.js";
import Terrestre from "/src/js/Beings/terrestre.js";
import Range from "/src/js/Items/range.js";
var calque_nature;
var calque_rochers;

export default class niveau3 extends Phaser.Scene {
    constructor(){
        super({key: "niveau3" })
    }

    preload(){
        this.load.spritesheet("img_perso", "src/assets/dude.png", {
            frameWidth: 32,
            frameHeight: 48
          });  
      
          this.load.image("Phaser_tuiles1", "src/assets/castle.png");
          this.load.image("Phaser_tuiles2", "src/assets/greencastle.png");

          this.load.tilemapTiledJSON("carte", "src/assets/sidemoon_level.json");
         
    }
    create() {
        const carteDuNiveau = this.make.tilemap({ key: "carte" });

        const tileset = carteDuNiveau.addTilesetImage("castle", "Phaser_tuiles1");
        const tileset1 = carteDuNiveau.addTilesetImage("greencastle", "Phaser_tuiles2");
        
        
        const sidemoon_background = carteDuNiveau.createLayer("background1", tileset);
        
        const moon_background = carteDuNiveau.createLayer("background", tileset);
       
        const ground = carteDuNiveau.createLayer("ground", [tileset, tileset1]);

        const playground = carteDuNiveau.createLayer("playground", [tileset, tileset1]);

        playground.setCollisionByProperty({ estSolide: true });
    
        this.cursors = this.input.keyboard.createCursorKeys();
        this.boundx=0;
        this.boundy=0;
        this.boundWidth=carteDuNiveau.widthInPixels;
        this.boundsHeight=carteDuNiveau.heightInPixels;

        this.player = new Player(this, "img_perso", 100, 80, playground);
        this.physics.add.collider(this.player.sprite, playground);
        this.player.sprite.setCollideWorldBounds(true);
        this.player.sprite.setBounce(0.2);
        

        this.physics.world.setBounds(this.boundx, this.boundy, this.boundWidth, this.boundsHeight);

      }
    
      update() {
        this.player.update();
      }
    }















