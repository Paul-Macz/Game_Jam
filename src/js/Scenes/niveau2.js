import Player from "/src/js/Beings/player.js";
var Calque_background; 
var calque_plateformes;
var calque_grotte;
export default class niveau2 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau2" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    }); 
    this.load.image("Phaser_tuilesdejeu1", "src/assets/tiles.png");
  this.load.image("Phaser_tuilesdejeu2", "src/assets/miscellaneous.png");
  this.load.tilemapTiledJSON("carte", "src/assets/Niveau2.json"); 
  
}
  

  create() {
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
  const calque_grotte = carteDuNiveau.createLayer(
    "calque_grotte",
    tileset1
  )
  const pics = carteDuNiveau.createLayer(
    "pics",
    tileset1
  )
  const calque_plateformes = carteDuNiveau.createLayer(
    "calque_plateformes",
    tileset2
  )
  const Calque_background = carteDuNiveau.createLayer(
    "Calque_background",
    tileset1,
    
  );

  Calque_background.setCollisionByProperty({ estSolide: true });
  calque_plateformes.setCollisionByProperty({ estSolide: true });
  calque_grotte.setCollisionByProperty({ estSolide: true });  
  this.cursors = this.input.keyboard.createCursorKeys();

   

  this.player = new Player(this,"img_perso",100,450, Calque_background);
      this.physics.add.collider(this.player.sprite, calque_plateformes);
      this.physics.add.collider(this.player.sprite, calque_grotte); 
      this.physics.add.collider(this.player.sprite, Calque_background);  
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);
    this.physics.world.setBounds(0, 0, 4800, 3200);
    this.cameras.main.setBounds(0, 0, 4800, 3200);
    this.cameras.main.startFollow(this.player.sprite); 
  }

  update() {
    this.player.update()
  }
}
