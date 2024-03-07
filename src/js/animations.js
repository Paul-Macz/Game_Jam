

export default class Animations extends Phaser.Scene{
    constructor(){
        super({ key: "animations" });
    }
    preload(){
        this.load.image("menu_fond", "src/assets/fond_galaxy.png");
        this.load.image("imageBoutonPlay", "src/assets/boutonplay.png");
        this.load.image("imageBoutonOption", "src/assets/OptionButton.png");
        this.load.image("imageBoutonQuit", "src/assets/QuitButton.png");
        this.load.image("imageBoutonContinuer", "src/assets/ContinueButton.png");
        this.load.image("imageBoutonMenu", "src/assets/MenuButton.png");
        this.load.image("imageBoutonNewGame", "src/assets/NewGameButton.png");
        this.load.image("imageBoutonBack", "src/assets/BackButton.png");
        this.load.image("imageBoutonPause", "src/assets/PauseSquareButton.png");
        this.load.image("imageBoutonSon", "src/assets/AudioSquareButton.png");

        this.load.image("bouton_niv1", "src/assets/bouton_niv1.png");
        this.load.image("bouton_niv2", "src/assets/bouton_niv2.png");
        this.load.image("bouton_niv3", "src/assets/bouton_niv3.png");

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
            frames: this.anims.generateFrameNumbers("battlemage", {
                start: 5,
                end: 8
            }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "stand",
            frames: [{ key: "battlemage", frame: 4 }],
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
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/attack1_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_attack2',
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/attack2_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_fall',
            frames: this.anims.generateFrameNames('viking', {start:1, end:5,prefix:'viking/fall_back_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_standUp',
            frames: this.anims.generateFrameNames('viking', {start:1, end:5,prefix:'viking/viking/stand_up_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_hit',
            frames: this.anims.generateFrameNames('viking', {start:1, end:3,prefix:'viking/hit_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_jump',
            frames: this.anims.generateFrameNames('viking', {start:1, end:5,prefix:'viking/jump_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_ready',
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/ready_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'viking_walk',
            frames: this.anims.generateFrameNames('viking', {start:1, end:6,prefix:'viking/walk_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_attack1',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:6,prefix:'hache_rouge/attack1_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_attack2',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:6,prefix:'hache_rouge/attack2_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_dead',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:4,prefix:'hache_rouge/dead_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_fall',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:4,prefix:'hache_rouge/fall_back_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_hit',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:3,prefix:'hache_rouge/hit_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_jump',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:5,prefix:'hache_rouge/jump_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_ready',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:6,prefix:'hache_rouge/ready_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_run',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:6,prefix:'hache_rouge/run_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'hache_rouge_walk',
            frames: this.anims.generateFrameNames('hache_rouge', {start:1, end:6,prefix:'hache_rouge/walk_', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_attackA',
            frames: this.anims.generateFrameNames('archer', {start:1, end:6,prefix:'archer/attack-A', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_attackB',
            frames: this.anims.generateFrameNames('archer', {start:1, end:6,prefix:'archer/attack-B', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_hit',
            frames: this.anims.generateFrameNames('archer', {start:1, end:4,prefix:'archer/hit-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_dead',
            frames: this.anims.generateFrameNames('archer', {start:1, end:4,prefix:'archer/dead-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_idle',
            frames: this.anims.generateFrameNames('archer', {start:1, end:2,prefix:'archer/idle-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_jump',
            frames: this.anims.generateFrameNames('archer', {start:1, end:6,prefix:'archer/jump-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'archer_run',
            frames: this.anims.generateFrameNames('archer', {start:1, end:12,prefix:'archer/run-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_attackA',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:6,prefix:'squelette_lance/attack-A', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_attackB',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:10,prefix:'squelette_lance/attack-B', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_dead',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:4,prefix:'squelette_lance/dead-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_hit',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:3,prefix:'squelette_lance/hit-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_idle',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:2,prefix:'squelette_lance/idle-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_jump',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:5,prefix:'squelette_lance/jump-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_lance_walk',
            frames: this.anims.generateFrameNames('squelette_lance', {start:1, end:6,prefix:'squelette_lance/walk-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_walk',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:6,prefix:'squelette_hache/walk-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_attackA',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:6,prefix:'squelette_hache/attack-A', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_attackA',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:12,prefix:'squelette_hache/attack-A', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_attackB',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:7,prefix:'squelette_hache/attack-B', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_jump',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:5,prefix:'squelette_hache/jump-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_idle',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:4,prefix:'squelette_hache/idle-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_shieldBlock',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:4,prefix:'squelette_hache/shield-block-', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
          this.anims.create({
            key:'squelette_hache_dead',
            frames: this.anims.generateFrameNames('squelette_hache', {start:1, end:4,prefix:'squelette_hache/dead-2', suffix:'.png'}),
            repeat:-1,
            frameRate:15
          });
         
        
       this.anims.create({
        key:'petit_squelette/attack2',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/attack2_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/dead_far',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/dead_far_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/attack1',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/attack1_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/dead_near',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/dead_near_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/run',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/run_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/corpse',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:2,prefix:'petit_squelette/corpse_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/jump',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:5,prefix:'petit_squelette/jump_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/hit',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:3,prefix:'petit_squelette/hit_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/walk',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:6,prefix:'petit_squelette/walk_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'petit_squelette/ready',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:3,prefix:'petit_squelette/ready_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
      this.anims.create({
        key:'squelette_épée/attack-A',
        frames: this.anims.generateFrameNames('petit_squelette', {start:1, end:8,prefix:'squelette_épée/attack-A/_', suffix:'.png'}),
        repeat:-1,
        frameRate:15
      });
    }
    update(){
        this.scene.start("menu");
    }
}