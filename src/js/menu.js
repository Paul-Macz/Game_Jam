
 

 export default class menu extends Phaser.Scene {

 

    constructor() {
    
      super({key : "menu"});
    
    }
    
    
    
    
     preload() {
    
     this.load.image("menu_fond", "src/assets/fond_galaxy.png");
    
     this.load.image("imageBoutonPlay", "src/assets/boutonplay.png");
    
     this.load.image("imageBoutonOption", "src/assets/OptionButton.png");
    
     this.load.image("imageBoutonQuit", "src/assets/QuitButton.png");
    
    this.load.image("planètes","src/assets/planètes.png");
    
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
    
     
    
    this.anims.create({
    
      key:
    
    });
    
     // on place les éléments de fond
    
     
    
     this.add
    
     .image(0, 0, "menu_fond")
    
     .setOrigin(0)
    
     .setDepth(0)
    
     .setScale(5,3);
    
    this.add
    
    .image(0,0,"planètes")
    
     
    
    .setScale(5,2);
    
    //on ajoute un bouton de clic, nommé bouton_play
    
    var bouton_play = this.add.image(650, 400, "imageBoutonPlay").setDepth(1);
    
    bouton_play.setScale(0.2,0.3)
    
    var bouton_option = this.add.image(650,470,"imageBoutonOption").setDepth(1);
    
    bouton_option.setScale(0.2,0.3)
    
    var bouton_quit = this.add.image(650,540,"imageBoutonQuit").setDepth(1);
    
    bouton_quit.setScale(0.2,0.3)
    
    //=========================================================
    
    //on rend le bouton interratif
    
    bouton_play.setInteractive();
    
     
    
    //Cas ou la souris passe sur le bouton play
    
    bouton_play.on("pointerover", () => {
    
      bouton_play.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    
    });
    
     
    
    //Cas ou la souris ne passe plus sur le bouton play
    
    bouton_play.on("pointerout", () => {
    
      bouton_play.clearTint(); // Réinitialise la teinte du bouton
    
    });
    
    
    
    
    //Cas ou la sourris clique sur le bouton play :
    
    // on lance la selection
    
    bouton_play.on("pointerup", () => {
    
     
    
     this.scene.start("selection");
    
    });
    
    }
    
     
    
    }