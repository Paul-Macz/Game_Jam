
export default class menu2 extends Phaser.Scene {
    constructor() {
      super({key : "menu2"});
      this.planet1;
      this.planet2;
    }
    
    preload() {
       
    }



    create() {

        this.add.image(0, 0, "menu_fond").setOrigin(0).setDepth(0).setScale(5,3);

        this.planet1 = this.add.sprite(10,45, "planetes_rouge");
      this.planet1.setScale(0.5,0.5);
      this.planet1.setX(400);
      this.planet1.setY(250);

        this.planet2 = this.add.sprite(10,45, "planetes_verte");
        this.planet2.setScale(0.5,0.5);
        this.planet2.setX(600);
        this.planet2.setY(250);

        var bouton_nv1 = this.add.image(200, 400, "bouton_niv1").setDepth(1);
        bouton_nv1.setScale(0.3,0.3);
        bouton_nv1.setInteractive();
        this.add.text(160,390,"Niveau 1").setDepth(2)
        
        var bouton_nv2 = this.add.image(600,400,"bouton_niv2").setDepth(1);
        bouton_nv2.setScale(0.3,0.3);
        bouton_nv2.setInteractive();
        this.add.text(560,390,"Niveau 3").setDepth(2);
        
        var bouton_nv3 = this.add.image(400,400,"bouton_niv3").setDepth(1);
        bouton_nv3.setScale(0.3,0.3);
        bouton_nv3.setInteractive();
        this.add.text(360,390,"Niveau 2").setDepth(2);

        //Cas ou la souris passe sur les boutons 
    
    bouton_nv1.on("pointerover", () => {
        bouton_nv1.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
      });
  
      bouton_nv2.on("pointerover", () => {
        bouton_nv2.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
      });
      bouton_nv3.on("pointerover", () => {
        bouton_nv3.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
      });
  
      //Cas ou la souris ne passe plus sur les boutons 
      
      bouton_nv1.on("pointerout", () => {
        bouton_nv1.clearTint(); // Réinitialise la teinte du bouton
      });
      bouton_nv2.on("pointerout", () => {
        bouton_nv2.clearTint(); // Réinitialise la teinte du bouton
      });
      bouton_nv3.on("pointerout", () => {
        bouton_nv3.clearTint(); // Réinitialise la teinte du bouton
      });


      bouton_nv1.on("pointerup", () => {
        this.scene.start("niveau1");
       });
   
       bouton_nv2.on("pointerup", () => {
         this.scene.start("niveau3");
       });

       bouton_nv3.on("pointerup", () => {
        this.scene.start("niveau2");
       });
    
    }




    update() {
       
        this.planet1.anims.play("anim_planet1", true);
       this.planet2.anims.play("anim_planet2", true);
    }
}