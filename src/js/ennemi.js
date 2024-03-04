export default class Ennemi {

    constructor(calque_plateformes,scene, x, y) {
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
      if (ennemi.direction == "gauche" && ennemi.body.blocked.down) {
        var coords = ennemi.getBottomLeft();
        var tuileSuivante = calque_plateformes.getTileAtWorldXY(
            coords.x,
            coords.y + 10
        );
        if (tuileSuivante == null) {
            // on risque de marcher dans le vide, on tourne
            ennemi.direction = "droite";
            ennemi.setVelocityX(90);
            ennemi.play("anim_tourne_droite", true);
        } else if (ennemi.body.blocked.left) {
            ennemi.setVelocityY(-300);    
            // Déclencher le déplacement vers la gauche après quelques millisecondes
            setTimeout(function() {
                ennemi.setVelocityX(-90);
            }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
        }    

    } else if (ennemi.direction == "droite" && ennemi.body.blocked.down) {
        var coords = ennemi.getBottomRight();
        var tuileSuivante = calque_plateformes.getTileAtWorldXY(
            coords.x,
            coords.y + 10
        );
        if (tuileSuivante == null) {
            // on risque de marcher dans le vide, on tourne
            ennemi.direction = "gauche";
            ennemi.setVelocityX(-90);
            ennemi.play("anim_tourne_gauche", true);
        } else if (ennemi.body.blocked.right) {
            un_ennemi.setVelocityY(-300);    
            // Déclencher le déplacement vers la gauche après quelques millisecondes
            setTimeout(function() {
                ennemi.setVelocityX(90);
            }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
        }  
    }   
    } 

    getHit(ennemi, damage){
        ennemi.PV -= damage;
        this.update_txt_PV();
        if (ennemi.PV == 0) {
            ennemi.disableBody(true, true);
        }
    }

    resetPV() {
        setInterval(() => {
            if (this.damage === 0) {
                if (this.PV < this.maxPV) {
                    this.PV++;
                }
            }
        }, 10000);
    }

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