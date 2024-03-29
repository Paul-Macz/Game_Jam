var deep_ost;
export default class menu2 extends Phaser.Scene {
    constructor() {
      super({key : "menu2"});
      this.planet1;
      this.planet2;
      this.planet3;
    }
    
    preload() {
       
    }



    create() {
      let isSoundPlaying = true;
    deep_ost=this.sound.add('menu_ost')
    deep_ost.play();
        this.add.image(0, 0, "menu_fond1").setOrigin(0).setDepth(0).setScale(2,2);

       this.planet1 = this.add.sprite(100,450, "planetes_rouge");
     this.planet1.setScale(0.5,0.5);
     this.planet1.setX(400);
      this.planet1.setY(250);

        this.planet2 = this.add.sprite(100,450, "planete_verte");
        this.planet2.setScale(0.5,0.5);
        this.planet2.setX(600);
       this.planet2.setY(250);

        this.planet3 = this.add.sprite(100,450, "planete_bleu");
        this.planet3.setScale(0.5,0.5);
        this.planet3.setX(200);
        this.planet3.setY(250);

        var bouton_son = this.add.image(740,65,"imageBoutonSon").setDepth(1);
    bouton_son.setScale(0.3,0.3);
    bouton_son.setInteractive();


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
      bouton_son.on("pointerover", () => {
        bouton_son.setTint(0xff0000); // Change la teinte du bouton (rouge dans cet exemple)
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
      bouton_son.on("pointerout", () => {
        bouton_son.clearTint(); // Réinitialise la teinte du bouton
      });


      bouton_nv1.on("pointerup", () => {
        deep_ost.stop()

        this.scene.start("niveau1");
       });
   
       bouton_nv2.on("pointerup", () => {
        deep_ost.stop()

         this.scene.start("niveau3");
       });

       bouton_nv3.on("pointerup", () => {
        deep_ost.stop()

        this.scene.start("niveau2");
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
    
    }




    update() {
       
        this.planet1.anims.play("anim_planet1", true);
       this.planet2.anims.play("anim_planet2", true);
       this.planet3.anims.play("anim_planet3", true);
    }
}