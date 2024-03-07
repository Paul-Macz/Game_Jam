

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
          this.load.spritesheet("planete_bleu","src/assets/planete_bleu.png" ,{
            frameWidth: 325,
            frameHeight: 325
          });

        this.load.image("bouton_niv1", "src/assets/bouton_niv1.png");
        this.load.image("bouton_niv2", "src/assets/bouton_niv2.png");
        this.load.image("bouton_niv3", "src/assets/bouton_niv3.png");
        this.load.image("img_ciel", "src/assets/sky.png");
        this.load.spritesheet("porte_ouvrante" , "src/assets/porte_ouvrante.png", {
        frameWidth: 96,
        frameHeight: 120
            }); 
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
        this.load.atlas('battlemage', "src/assets/battlemage.png" ,"src/assets/battlemage.json");
        this.load.atlas('viking',"src/assets/ennemis/viking/viking.png","src/assets/ennemis/viking/viking.json");
        this.load.atlas('archer',"src/assets/ennemis/archer/archer.png","src/assets/ennemis/archer/archer.json");
        this.load.atlas('hache_rouge',"src/assets/ennemis/hache_rouge/hache_rouge.png","src/assets/ennemis/hache_rouge/hache_rouge.json");
        this.load.atlas('petit_squelette',"src/assets/ennemis/petit_squelette/petit_squelette.png","src/assets/ennemis/petit_squelette/petit_squelette.json");
        this.load.atlas('slime',"src/assets/ennemis/slime/slime.png","src/assets/ennemis/slime/slime.json");
        this.load.atlas('squelette_epee',"src/assets/ennemis/squelette_epee/squelette_epee.png","src/assets/ennemis/squelette_epee/squelette_epee.json");
        this.load.atlas('squelette_hache',"src/assets/ennemis/squelette_hache/squelette_hache.png","src/assets/ennemis/squelette_hache/squelette_hache.json");
        this.load.atlas('squelette_lance',"src/assets/ennemis/squelette_lance/squelette_lance.png","src/assets/ennemis/squelette_lance/squelette_lance.json");
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
          
          this.anims.create({
            key: "anim_planet3",
             frames: this.anims.generateFrameNumbers("planete_bleu",{  start: 0 , end: 49  }),
             frameRate : 12,
             repeat : -1
           });
          this.anims.create({
            key:'battlemage_death',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:12,prefix:"Battlemage (Separeted Frames)/Death/Battlemage Death", suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_fastMagic',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:10,prefix:'Battlemage (Separeted Frames)/Fast Magic/Battlemage Fast Magic', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_crouchAttack',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:7,prefix:'Battlemage (Separeted Frames)/Crouch Attack/Battlemage Crouch Attack', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_crouch',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:8,prefix:'Battlemage (Separeted Frames)/Crouch/Battlemage Crouch', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_sustainMagic',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:11,prefix:'Battlemage (Separeted Frames)/Sustain Magic/Battlemage Magic Sustain', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_jumpAttack',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:5,prefix:'Battlemage (Separeted Frames)/Jump Attack/Battlemage Jump attack', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_spinAttack',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:11,prefix:'Battlemage (Separeted Frames)/Spin Attack/Battlemage SpinAttack', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_attack3',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:9,prefix:'Battlemage (Separeted Frames)/Attack 3/Battlemage Attack C', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_attack2',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:8,prefix:'Battlemage (Separeted Frames)/Attack 2/Battlemage Attack B', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_attack1',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:8,prefix:'Battlemage (Separeted Frames)/Attack 1/Battlemage Attack ', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_dash',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:7,prefix:'Battlemage (Separeted Frames)/Dash/Battlemage Dash', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_stop',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:5,prefix:'Battlemage (Separeted Frames)/Stop/Battlemage Stop', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_jumpForwardUp',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:2,prefix:'Battlemage (Separeted Frames)/Jump Foward/Going Up/Battlemage Foward up', suffix:'.png'}),
            repeat:0,
            frameRate:10
          });
          this.anims.create({
            key:'battlemage_jumpForwardDown',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:5,prefix:'Battlemage (Separeted Frames)/Jump Foward/Going Down/Battlemage Foward down', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_jumpForwardGround',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:4,prefix:'Battlemage (Separeted Frames)/Jump Foward/Grounded/Battlemage Foward Grounded', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_jumpNeutralUp',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:3,prefix:'Battlemage (Separeted Frames)/Jump Neutral/Going Up/Battlemage Neutral up', suffix:'.png'}),
            repeat:0,
            frameRate:10
          });
          this.anims.create({
            key:'battlemage_jumpNeutralDown',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:3,prefix:'Battlemage (Separeted Frames)/Jump Neutral/Going Down/Battlemage Neutral Down', suffix:'.png'}),
            repeat:0,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_jumpNeutralGround',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:4,prefix:'Battlemage (Separeted Frames)/Jump Neutral/Grounded/Battlemage Neutra Grounded', suffix:'.png'}),
            repeat:0,
            frameRate:10
          });
          this.anims.create({
            key:'battlemage_idle',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:8,prefix:'Battlemage (Separeted Frames)/Idle/Battlemage Idle', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'battlemage_run',
            frames: this.anims.generateFrameNames('battlemage', {start:1, end:10,prefix:'Battlemage (Separeted Frames)/Running/Battlemage Running', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key: "anim_ouvreporte",
            frames: this.anims.generateFrameNumbers("porte_ouvrante", { start: 0, end: 5 }),
            frameRate: 50,
            repeat: 0
          }); 
          this.anims.create({
            key: "anim_fermeporte",
            frames: this.anims.generateFrameNumbers("porte_ouvrante", { start: 5, end: 0 }),
            frameRate: 50,
            repeat: 0
          }); 
          this.anims.create({
            key:'slime_idle',
            frames: this.anims.generateFrameNames('slime', {start:1, end:4,prefix:'slime/idle-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_attackA',
            frames: this.anims.generateFrameNames('slime', {start:1, end:10,prefix:'slime/attack-A', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_attackB',
            frames: this.anims.generateFrameNames('slime', {start:1, end:11,prefix:'slime/attack-B', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_attackC',
            frames: this.anims.generateFrameNames('slime', {start:1, end:8,prefix:'slime/attack-C', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_walk',
            frames: this.anims.generateFrameNames('slime', {start:1, end:4,prefix:'slime/walk-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_death',
            frames: this.anims.generateFrameNames('slime', {start:1, end:4,prefix:'slime/dead-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'slime_hit',
            frames: this.anims.generateFrameNames('slime', {start:1, end:3,prefix:'slime/hit-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_attack1',
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/attack2_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_attack2',
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/attack2_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
         }


    
    update(){
        this.scene.start("niveau1");
    }
}