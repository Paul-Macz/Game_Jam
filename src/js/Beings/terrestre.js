import Ennemi from "/src/js/Beings/ennemi.js";

export default class Terrestre extends Ennemi{
    constructor(scene, image,x, y, calque){
        super(scene, image,x, y, calque);
        this.sprite.setVelocityX(this.speedx);
    }
    update(){
        //ennemi touching the floor
        if(this.sprite.body.blocked.down){
            if (this.direction == "left") {
                var coords = this.sprite.getBottomLeft();
                var tuileSuivante = this.calque.getTileAtWorldXY(
                    coords.x,
                    coords.y + 10
                );
                //console.log(tuileSuivante);
                if (tuileSuivante == null || this.sprite.body.blocked.left) {
                    // on risque de marcher dans le vide, on tourne
                    this.direction = "right";
                    this.sprite.setVelocityX(this.speedx);
                    this.sprite.anims.play("turn_right", true);
                }     
            } 
            else if (this.direction == "right") {
                var coords = this.sprite.getBottomRight();
                var tuileSuivante = this.calque.getTileAtWorldXY(
                    coords.x,
                    coords.y + 10
                );
                if (tuileSuivante == null || this.sprite.body.blocked.right) {
                    // on risque de marcher dans le vide, on tourne
                    this.direction = "left";
                    this.sprite.setVelocityX(-this.speedx);
                    this.sprite.anims.play("turn_left", true);
                }
            }
        }
    }
}