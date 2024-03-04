import Weapon from "/src/js/weapon.js"

export default class Melee extends Weapon{
    constructor(scene, name, damage, range, atSpeed, speed, image){
        super(scene, name,damage);
        this.range=range;
        this.atSpeed=atSpeed;
        this.speed=speed;
        this.image=image;
        this.sprite.scene.physics.add.sprite(x,y,this.image)
    }
    
    attack(player){

    }
}