

import Player from "/src/js/Beings/player.js";

var calque_tuto;
export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

/** La fonction preload est appelée une et une seule fois,
 * lors du chargement de la scene dans le jeu.
 * On y trouve surtout le chargement des assets (images, son ..)
 */
 preload() {
  
  this.load.spritesheet("img_perso", "src/assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48
  });  
  this.load.spritesheet("img_ennemi", "src/assets/ennemi.png", {
    frameWidth: 32,
    frameHeight: 48
  });  
  this.load.image("fond","src/assets/fond_essai.png");
  this.load.image("Phaser_tuilesdejeu", "src/assets/depart.png");
  this.load.tilemapTiledJSON("carte", "src/assets/Tutorielmap.json"); 
}


/***********************************************************************/
/** FONCTION CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */
create() {
  
  const carteDuNiveau = this.add.tilemap("carte");
      const tileset = carteDuNiveau.addTilesetImage(
        "depart",
        "Phaser_tuilesdejeu"
      );  
      
      const fond = this.add.image(0, 0, "fond").setOrigin(0, 0);

      // Obtenir les dimensions de la carte
      const largeurCarte = carteDuNiveau.widthInPixels;
      const hauteurCarte = carteDuNiveau.heightInPixels;
    
      // Ajuster la taille de l'image de fond
      fond.setDisplaySize(largeurCarte, hauteurCarte);
      const calque_tuto = carteDuNiveau.createLayer(
        "calque_tuto",
        tileset
      );
      calque_tuto.setCollisionByProperty({ estSolide: true }); 

      this.cursors = this.input.keyboard.createCursorKeys();

      this.player = new Player(this,"img_perso",100,450, calque_tuto);
      this.physics.add.collider(this.player.sprite, calque_tuto); 
      this.player.sprite.setCollideWorldBounds(true);
      this.player.sprite.setBounce(0.2);

     // this.weap = new Range(this, "bull", 1, 50, 1, "bullet",true,20,100);
     // this.player.pickWeapon(this.weap);

      
      this.physics.add.collider(this.player, calque_tuto); 
      this.physics.world.setBounds(0, 0, 4800, 1600);
      this.cameras.main.setBounds(0, 0, 4800, 1600);
      this.cameras.main.startFollow(this.player.sprite); 
    
  
}


 update() {
  this.player.update()

}
}
