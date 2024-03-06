

export default class Animations extends Phaser.Scene{
    constructor(){
        super({ key: "animations" });
    }
    preload(){
        this.load.image("menu_fond", "src/assets/fond_galaxy.png");
        this.load.image("imageBoutonPlay", "src/assets/boutonplay.png");
        this.load.image("imageBoutonOption", "src/assets/OptionButton.png");
        this.load.image("imageBoutonQuit", "src/assets/QuitButton.png");
        this.load.spritesheet("planetes","src/assets/planetes.png" ,{
          frameWidth: 88,
          frameHeight: 88
        });
        this.load.spritesheet("planetes_rouge","src/assets/planetes_rouge.png" ,{
            frameWidth: 325,
            frameHeight: 325
          });
          this.load.spritesheet("planete_verte","src/assets/planete_verte.png" ,{
            frameWidth: 325,
            frameHeight: 325
          });

        this.load.image("bouton_niv1", "src/assets/bouton_niv1.png");
        this.load.image("bouton_niv2", "src/assets/bouton_niv2.png");
        this.load.image("bouton_niv3", "src/assets/bouton_niv3.png");
        this.load.image("img_ciel", "src/assets/sky.png");
        this.load.image("img_plateforme", "src/assets/platform.png");
        this.load.spritesheet("img_perso", "src/assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48
        });
        this.load.image("img_porte1", "src/assets/door1.png");
        this.load.image("img_porte2", "src/assets/door2.png");
        this.load.image("img_porte3", "src/assets/door3.png");
        this.load.image("bullet", "src/assets/balle.png");
        this.load.spritesheet("test", "src/assets/walk.png",{
            frameWidth:440,
            frameHeight:330
          });
    }
    create(){
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('test', { start:0, end: 5}), // Frames for walk animation
            frameRate: 10,
            repeat: -1
          });
          this.anims.create({
            key: "turn_left",
            frames: this.anims.generateFrameNumbers("img_perso", {
                start: 0,
                end: 3
            }),
            frameRate: 10, // vitesse de défilement des frames
            repeat: -1 
        });
  
        this.anims.create({
            key: "turn_right",
            frames: this.anims.generateFrameNumbers("img_perso", {
                start: 5,
                end: 8
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "stand",
            frames: [{ key: "img_perso", frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: "anim_planet",
            frames: this.anims.generateFrameNumbers("planetes",{  start: 0 , end: 49  }),
            frameRate : 12,
            repeat : -1
          });
          this.anims.create({
            key: "anim_planet1",
            frames: this.anims.generateFrameNumbers("planetes_rouge",{  start: 0 , end: 49 }),
            frameRate : 12,
            repeat : -1
          });
          this.anims.create({
           key: "anim_planet2",
            frames: this.anims.generateFrameNumbers("planete_verte",{  start: 0 , end: 49  }),
            frameRate : 12,
            repeat : -1
          });
    }
    update(){
        this.scene.start("menu");
    }
}