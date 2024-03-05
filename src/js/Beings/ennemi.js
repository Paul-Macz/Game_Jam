import Character from "/src/js/Beings/character.js";
import Weapon from "/src/js/Items/weapon.js";

export default class Ennemi extends Character{
    constructor(scene, image,x, y, calque, velocity) {
        super(scene,image,x,y,calque);
        this.speedx = 200;
        if (velocity != undefined) {
            this.speedx = this.speedx*velocity;
        } 
        this.direction='left';
        
        this.pickWeapon(new Weapon(this.scene,"Hands",2,2,1,"",false));

    }
    getHit(damage){
        super.getHit(damage);
        if(this.PV==0){
            this.validforDeletion=true;
            this.sprite.destroy();
        }
    }
  }