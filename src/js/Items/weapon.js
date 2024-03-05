
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
    getDam(){
        console.log(this.damage);
    }
    attack(){

    }
    hit(target){
        //console.log("this",this);
        target.getHit(this.damage);
    }
}