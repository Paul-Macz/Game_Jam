import Weapon from "/src/js/Items/weapon.js"

export default class Melee extends Weapon{
    constructor(scene, name, damage, atSpeed, weight, image, byPlayer, range){
        super(scene, name,damage,atSpeed,weight,image);
        this.range=range;
        this.image=image;
        this.sprite.scene.physics.add.sprite(x,y,this.image)
    }
    
    attack(player){

    }
}