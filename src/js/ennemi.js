import Character from "/src/js/character.js";

export default class Ennemi extends Character{
    constructor(calque,scene, image, x, y) {
        super(scene,image,x,y,calque);

        this.scene.groupe_ennemis = this.scene.physics.add.group();
    }
    update(velocity) {
        if (velocity === undefined) {
            var speedx = 90;
            var speedy = 300;
        } else {
            var speedx = velocity;
            var speedy = velocity;
        }
        if (this.direction == "left" && this.sprite.body.blocked.down) {
            var coords = this.getBottomLeft();
            var tuileSuivante = this.calque.getTileAtWorldXY(
                coords.x,
                coords.y + 10
            );
            if (tuileSuivante == null) {
                // on risque de marcher dans le vide, on tourne
                this.direction = "right";
                this.sprite.setVelocityX(90);
                this.sprite.anims.play("turn_right", true);
            } else if (this.sprite.body.blocked.left) {
                this.sprite.setVelocityY(-300);    
                // Déclencher le déplacement vers la gauche après quelques millisecondes
                setTimeout(function() {
                    this.sprite.setVelocityX(-90);
                }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
            }    
        } 
        else if (this.direction == "right" && this.sprite.body.blocked.down) {
            var coords = this.getBottomRight();
            var tuileSuivante = this.calque.getTileAtWorldXY(
                coords.x,
                coords.y + 10
            );
            if (tuileSuivante == null) {
                // on risque de marcher dans le vide, on tourne
                this.direction = "left";
                this.sprite.setVelocityX(-90);
                this.sprite.anims.play("turn_left", true);
            } else if (this.body.blocked.right) {
                this.sprite.setVelocityY(-300);    
                // Déclencher le déplacement vers la gauche après quelques millisecondes
                setTimeout(function() {
                    this.sprite.setVelocityX(90);
                }, 100); // 100 millisecondes de délai (ajustez selon vos besoins)
            }  
        }   
    } 

  }