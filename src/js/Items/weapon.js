
export default class Weapon{
    constructor(scene, name, damage, atSpeed, weight, image, byPlayer){
        this.scene=scene;
        this.name=name;
        this.damage=damage;
        this.atSpeed=atSpeed;
        this.weight=weight;
        this.image=image;
        this.byPlayer=byPlayer;
    }
    attack(){

    }
    hit(target){
        target.getHit(this.damage);
    }
}