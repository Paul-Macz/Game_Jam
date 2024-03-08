
var deep_ost;
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
     let isSoundPlaying = false;
     deep_ost=this.sound.add('menu_ost')
    deep_ost.play();
      this.add.image(0, 0, "menu_fond1").setOrigin(0).setDepth(0).setScale(1,1);
    
       this.planet = this.add.sprite(100,450, "planete");
       this.planet.setScale(2,2);
       this.planet.setX(170);
       this.planet.setY(250);

      //on ajoute un bouton de clic, nommé bouton_play
    var bouton_son = this.add.image(740,65,"imageBoutonSon").setDepth(1);
    bouton_son.setScale(0.3,0.3);
    bouton_son.setInteractive();

    var bouton_play = this.add.image(650, 300, "imageBoutonFond").setDepth(1);
    bouton_play.setScale(0.6,0.5);
    bouton_play.setInteractive();
    
    var bouton_tutorial = this.add.image(650,400,"imageBoutonFond").setDepth(1);
    bouton_tutorial.setScale(0.6,0.5);
    bouton_tutorial.setInteractive();

    var bouton_quit = this.add.image(650,500,"imageBoutonFond").setDepth(1);
    bouton_quit.setScale(0.6,0.5);
    bouton_quit.setInteractive();
    var bouton_titre = this.add.image(400,70,"imageBoutonFond2").setDepth(1);
    bouton_titre.setScale(1.5,0.7);

    this.add.text(240,50,"EKHO EXPANSE",{
      fontFamily: 'ROG Fonts',
      fontSize: "25pt"
    }).setTint(0x000000).setDepth(2);
    this.add.text(565,280,"TUTORIAL",{
      fontFamily: 'ROG Fonts',
      fontSize: "25pt"
    }).setTint(0x000000).setDepth(2).setScale(0.8);
    
    this.add.text(610,380,"PLAY",{
      fontFamily: 'ROG Fonts',
      fontSize: "25pt"
    }).setTint(0x000000).setDepth(2).setScale(0.8);
    
    this.add.text(610,480,"QUIT",{
      fontFamily: 'ROG Fonts',
      fontSize: "25pt"
    }).setTint(0x000000).setDepth(2).setScale(0.8);
    
    

    //Cas ou la souris passe sur les boutons 
    
    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });

    bouton_tutorial.on("pointerover", () => {
      bouton_tutorial.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });
    bouton_quit.on("pointerover", () => {
      bouton_quit.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });
    bouton_son.on("pointerover", () => {
      bouton_son.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
    });

    //Cas ou la souris ne passe plus sur les boutons 
    
    bouton_play.on("pointerout", () => {
      bouton_play.clearTint(); // Réinitialise la teinte du bouton
    });
    bouton_tutorial.on("pointerout", () => {
      bouton_tutorial.clearTint(); // Réinitialise la teinte du bouton
    });
    bouton_quit.on("pointerout", () => {
      bouton_quit.clearTint(); // Réinitialise la teinte du bouton
    });
    bouton_son.on("pointerout", () => {
      bouton_son.clearTint(); // Réinitialise la teinte du bouton
    });

    //Cas ou la sourris clique sur le bouton play :
    // on lance la selection
    
    bouton_play.on("pointerup", () => {
     this.scene.start("tutomap");
    });
    
    bouton_tutorial.on("pointerup", () => {
      this.scene.start("menu2")
    });
  
    bouton_son.on("pointerup", () => {
      if (isSoundPlaying) {
        deep_ost.pause();
        deep_ost.currentTime = 0;
      } else {
        deep_ost.play();
      }
      isSoundPlaying = !isSoundPlaying;
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