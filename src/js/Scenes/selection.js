// import * as fct from "/src/js/fonction.js";
import Player from "/src/js/Beings/player.js";
import Melee from "/src/js/Items/melee.js";
import Range from "/src/js/Items/range.js"
/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var groupe_plateformes;

// définition de la classe "selection"
export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
/***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {

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

    this.cursors = this.input.keyboard.createCursorKeys();
    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/
    this.add.image(400, 300, "img_ciel");

    groupe_plateformes = this.physics.add.staticGroup();
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");

    /****************************
     *  Ajout des portes   *
     ****************************/
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/
    this.player = new Player(this,"img_perso",100,542);
    //this.player.sprite.setCollideWorldBounds(true);
    this.player.sprite.setSize(32,48);

    // this.weap = new Range(this, "bull", 1, 10, 1, "bullet",true,1,1000,false);
    // this.player.pickWeapon(this.weap);
    this.weap = new Melee(this,'test', 1, 10, 1, "bullet", true, 10);
    this.player.pickWeapon(this.weap);
    
    
    /*****************************************************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/

    //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(this.player.sprite, groupe_plateformes);
    this.player.inventory.forEach(element => {
      if(element instanceof Range){
        this.physics.add.collider(element.Bullets,groupe_plateformes,element.erase, null, this);
      }
    });
    
  }

  /***********************************************************************/
  /** FONCTION UPDATE 
/***********************************************************************/

  update() {
    this.player.update()
    
    if (Phaser.Input.Keyboard.JustDown(this.cursors.space) == true) {
      if (this.physics.overlap(this.player.sprite, this.porte1)){
        this.scene.switch("niveau1");
      }
      if (this.physics.overlap(this.player.sprite, this.porte2))
        this.scene.switch("niveau2");
      if (this.physics.overlap(this.player.sprite, this.porte3))
        this.scene.switch("niveau3");
    }
    
    if (this.player.gameOver) {
      this.physics.pause();
      this.player.sprite.setTint(0x444444);
      this.player.sprite.anims.play("stand");
      this.time.delayedCall(3000,this.resetMap,[],this);
    } 

  }
  resetMap(){
    this.scene.restart();
  }
}
