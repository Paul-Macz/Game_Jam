
 export default class menu extends Phaser.Scene {
    constructor() {
      super({key : "menu"});
      this.planet;
    }
    
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
     // on place les éléments de fond
      this.add.image(0, 0, "menu_fond").setOrigin(0).setDepth(0).setScale(5,3);
    
      this.planet = this.add.sprite(100,450, "planetes");
      this.planet.setScale(3.5,3.5);
      this.planet.setX(300);
      this.planet.setY(300);

      //on ajoute un bouton de clic, nommé bouton_play
    
    var bouton_play = this.add.image(650, 400, "imageBoutonPlay").setDepth(1);
    bouton_play.setScale(0.2,0.3);
    bouton_play.setInteractive();
    
    var bouton_option = this.add.image(650,470,"imageBoutonOption").setDepth(1);
    bouton_option.setScale(0.2,0.3);
    bouton_option.setInteractive();

    var bouton_quit = this.add.image(650,540,"imageBoutonQuit").setDepth(1);
    bouton_quit.setScale(0.2,0.3);
    bouton_quit.setInteractive();

    //Cas ou la souris passe sur les boutons 
    
    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });

    bouton_option.on("pointerover", () => {
      bouton_option.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });
    bouton_quit.on("pointerover", () => {
      bouton_quit.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });

    //Cas ou la souris ne passe plus sur les boutons 
    
    bouton_play.on("pointerout", () => {
      bouton_play.clearTint(); // Réinitialise la teinte du bouton
    });
    bouton_option.on("pointerout", () => {
      bouton_option.clearTint(); // Réinitialise la teinte du bouton
    });
    bouton_quit.on("pointerout", () => {
      bouton_quit.clearTint(); // Réinitialise la teinte du bouton
    });

    //Cas ou la sourris clique sur le bouton play :
    // on lance la selection
    
    bouton_play.on("pointerup", () => {
     this.scene.start("selection");
    });

    bouton_quit.on("pointerup", () => {
      this.scene.stop("menu");
      window.close();
    });

    //Cas ou la souris clique sur le bouton option : 
    // on lance un menu de commande
    
    
    }
        
    update() {
 
    this.planet.anims.play("anim_planet", true);

    } 
}