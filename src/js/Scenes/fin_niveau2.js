export default class fin_niveau2 extends Phaser.Scene {
    constructor() {
      super({key : "fin_niveau2"});
     
    }

    preload() {

    }


    create() {
        // on place les éléments de fond
         this.add.image(0, 0, "menu_fond").setOrigin(0).setDepth(0).setScale(5,3);
       
         
   
         //on ajoute un bouton de clic, nommé bouton_play
       
       var bouton_continuer = this.add.image(400, 250, "imageBoutonContinuer").setDepth(1);
       bouton_continuer.setScale(0.2,0.3);
       bouton_continuer.setInteractive();
       
       var bouton_menu = this.add.image(400,320,"imageBoutonMenu").setDepth(1);
       bouton_menu.setScale(0.2,0.3);
       bouton_menu.setInteractive();
   
       var bouton_newgame = this.add.image(400,390,"imageBoutonNewGame").setDepth(1);
       bouton_newgame.setScale(0.2,0.3);
       bouton_newgame.setInteractive();

       var bouton_quit = this.add.image(400,460,"imageBoutonQuit").setDepth(1);
        bouton_quit.setScale(0.2,0.3);
        bouton_quit.setInteractive();

        var bouton_back = this.add.image(400, 180, "imageBoutonBack").setDepth(1);
       bouton_back.setScale(0.2,0.3);
       bouton_back.setInteractive();
   
       //Cas ou la souris passe sur les boutons 
       
       bouton_continuer.on("pointerover", () => {
         bouton_continuer.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
       });
   
       bouton_menu.on("pointerover", () => {
         bouton_menu.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
       });
       bouton_newgame.on("pointerover", () => {
         bouton_newgame.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
       });
       bouton_quit.on("pointerover", () => {
        bouton_quit.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
      });
      bouton_back.on("pointerover", () => {
        bouton_back.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
      });
   
       //Cas ou la souris ne passe plus sur les boutons 
       
       bouton_continuer.on("pointerout", () => {
         bouton_continuer.clearTint(); // Réinitialise la teinte du bouton
       });
       bouton_menu.on("pointerout", () => {
         bouton_menu.clearTint(); // Réinitialise la teinte du bouton
       });
       bouton_newgame.on("pointerout", () => {
         bouton_newgame.clearTint(); // Réinitialise la teinte du bouton
       });
       bouton_quit.on("pointerout", () => {
        bouton_quit.clearTint(); // Réinitialise la teinte du bouton
      });
      bouton_back.on("pointerout", () => {
        bouton_back.clearTint(); // Réinitialise la teinte du bouton
      });
       
  
   
       //Cas ou la sourris clique sur le bouton play :
       // on lance la selection
       
       bouton_continuer.on("pointerup", () => {
        this.scene.start("niveau3");
       });
       bouton_menu.on("pointerup", () => {
        this.scene.start("menu2");
       });
       bouton_newgame.on("pointerup", () => {
        this.scene.start("niveau2");
       });
       bouton_quit.on("pointerup", () => {
         this.scene.stop("fin_niveau2");
         window.close();
       });
       bouton_back.on("pointerup", () => {
        
       });
   
       //Cas ou la souris clique sur le bouton option : 
       // on lance un menu de commande
       
       
       }
           
       update() {
    
       
   
       } 
}