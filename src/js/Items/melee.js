import Weapon from "/src/js/Items/weapon.js"
import Character from "/src/js/Beings/character.js";

export default class Melee extends Weapon{
    constructor(scene, name, damage, atSpeed, weight, image, byPlayer, range){
        super(scene, name, damage, atSpeed, weight, image, byPlayer);
        this.range=range;
        //this.sprite=this.scene.physics.add.sprite(x,y,this.image)
        this.lastAttack=0;
        //this.attackHitbox;

        
    }
    
    attack(user, userx, usery,userh){
        var currentTime = this.scene.time.now;
        if ((currentTime - this.lastAttack)*this.atSpeed >= 1000 || this.lastAttack==0) {
            //user.sprite.anims.play("attack");
            this.attackHitbox = this.scene.add.rectangle(100, 100, 100, 100, 0x000000, 0);
            this.scene.physics.world.enable(this.attackHitbox);
            this.scene.attackHitbox.body.setCollideWorldBounds(true);
        }
    }

    disablehitbox(){
        this.attackHitbox.setVisible(true);
    }
    disableHitbox() {
        this.attackHitbox.setVisible(false);
    }

}