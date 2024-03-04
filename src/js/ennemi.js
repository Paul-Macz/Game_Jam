export default class Ennemi {

    constructor(scene, x, y) {
      this.scene = scene;
      this.PV = 20;
      this.maxPV = 20;
      this.inventory={};
      this.damage = 200;
      this.defense = 0.1;

      scene.anims.create({
        key: "turn_left",
        frames: scene.anims.generateFrameNumbers("img_perso", {
            start: 0,
            end: 3
        }),
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 
      });
  
      scene.anims.create({
        key: "turn_right",
        frames: scene.anims.generateFrameNumbers("img_perso", {
            start: 5,
            end: 8
        }),
        frameRate: 8,
        repeat: -1
      });
      scene.anims.create({
        key: "stand",
        frames: [{ key: "img_perso", frame: 4 }],
        frameRate: 20
      });
  
      this.sprite = scene.physics.add.sprite(x, y, "img_perso");
    }

    update(velocity) {
      if (velocity === undefined) {
        var speedx = 90;
        var speedy = 300;
      } else {
        var speedx = velocity;
        var speedy = velocity;
      }
      sprite.setVelocityX(0);
    } 

    getHit(ennemi, damage){
        ennemi.PV -= damage;
        this.update_txt_PV();
        if (ennemi.PV == 0) {
            ennemi.disableBody(true, true);
        }
    }

    resetPV(){
        setTimeout(function() {
            if ()
        un_ennemi.setVelocityX(90);
    }, 10000); //
    }
        this.PV=this.maxPV;
        this.update_txt_PV();
    

    setPV(newPV){
        this.PV=newPV;
    }
    setMaxPV(newMax){
        this.maxPV=newMax;
    }
    setInv(inv){
        this.inventory=inv;
    }
    setDef(def){
        this.defense=def;
    }
    setDam(dam){
        this.damage=dam;
    }
  }