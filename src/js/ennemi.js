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
          console.log("hi")
      if (this.direction == "gauche" && this.body.blocked.down) {
        var coords = this.getBottomLeft();
        var tuileSuivante = calque_plateformes.getTileAtWorldXY(
            coords.x,
            coords.y + 10
        );
        console.log("hey",tuileSuivante)
        if (tuileSuivante == null) {
            // on risque de marcher dans le vide, on tourne
            this.direction = "droite";
            this.setVelocityX(velocity);
            this.play("turn_right", true);
        } else if (this.body.blocked.left) {
            this.setVelocityY(-300);    
            // Déclencher le déplacement vers la gauche après quelques millisecondes
            setTimeout(function() {
                this.setVelocityX(-velocity);
            }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
        }    

    } else if (this.direction == "droite" && this.body.blocked.down) {
        var coords = this.getBottomRight();
        var tuileSuivante = calque_plateformes.getTileAtWorldXY(
            coords.x,
            coords.y + 10
        );
        if (tuileSuivante == null) {
            // on risque de marcher dans le vide, on tourne
            this.direction = "gauche";
            this.setVelocityX(-velocity);
            this.play("turn_left", true);
        } else if (this.body.blocked.right) {
            this.setVelocityY(-300);    
            // Déclencher le déplacement vers la gauche après quelques millisecondes
            setTimeout(function() {
                this.setVelocityX(velocity);
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