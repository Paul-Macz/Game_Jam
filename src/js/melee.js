import Weapon from "/src/js/weapon.js"

export default class Melee extends Weapon{
    constructor(scene, name, damage, atSpeed, userSpeed, image, byPlayer, range){
        super(scene, name,damage,atSpeed,userSpeed,image);
        this.range=range;
        this.image=image;
        this.sprite.scene.physics.add.sprite(x,y,this.image)
    }
    
    attack(player){

    }
}