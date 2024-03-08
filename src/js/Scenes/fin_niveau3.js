export default class fin_niveau3 extends Phaser.Scene {
    constructor() {
      super({key : "fin_niveau3"});
     
    }

    preload() {

    }


    create() {
      // on place les éléments de fond
       this.add.image(0, 0, "menu_fond1").setOrigin(0).setDepth(0).setScale(2,2);
     
       
 
       //on ajoute un bouton de clic, nommé bouton_play
       var bouton_titre = this.add.image(400,70,"imageBoutonFond2").setDepth(1);
       bouton_titre.setScale(1.5,0.7);
     var bouton_continuer = this.add.image(400, 250, "imageBoutonFond").setDepth(1);
     bouton_continuer.setScale(0.6,0.5);
     bouton_continuer.setInteractive();
     
     var bouton_menu = this.add.image(400,340,"imageBoutonFond").setDepth(1);
     bouton_menu.setScale(0.6,0.5);
     bouton_menu.setInteractive();
 
     var bouton_newgame = this.add.image(400,430,"imageBoutonFond").setDepth(1);
     bouton_newgame.setScale(0.6,0.5);
     bouton_newgame.setInteractive();

     var bouton_quit = this.add.image(400,520,"imageBoutonFond").setDepth(1);
      bouton_quit.setScale(0.6,0.5);
      bouton_quit.setInteractive();

      this.add.text(200,50,"CONGRATULATIONS",{
        fontFamily: 'ROG Fonts',
        fontSize: "25pt"
      }).setTint(0x000000).setDepth(2);

      this.add.text(315,240,"CONTINUE",{
        fontFamily: 'ROG Fonts',
        fontSize: "25pt"
      }).setTint(0x000000).setDepth(2).setScale(0.8);
      this.add.text(354,325,"MENU",{
        fontFamily: 'ROG Fonts',
        fontSize: "25pt"
      }).setTint(0x000000).setDepth(2).setScale(0.8);
      
      this.add.text(315,415,"NEW GAME",{
        fontFamily: 'ROG Fonts',
        fontSize: "25pt"
      }).setTint(0x000000).setDepth(2).setScale(0.8);
      
      this.add.text(358,505,"QUIT",{
        fontFamily: 'ROG Fonts',
        fontSize: "25pt"
      }).setTint(0x000000).setDepth(2).setScale(0.8);

     
 
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
      
       
  
   
       //Cas ou la sourris clique sur le bouton play :
       // on lance la selection
       
       bouton_continuer.on("pointerup", () => {
        this.scene.start("menu");
       });
       bouton_menu.on("pointerup", () => {
        this.scene.start("menu2");
       });
       bouton_newgame.on("pointerup", () => {
        this.scene.start("niveau3");
       });
       bouton_quit.on("pointerup", () => {
         this.scene.stop("fin_niveau3");
         window.close();
       });
      
   
       //Cas ou la souris clique sur le bouton option : 
       // on lance un menu de commande
       
       
       }
           
       update() {
    
       
   
       } 
}