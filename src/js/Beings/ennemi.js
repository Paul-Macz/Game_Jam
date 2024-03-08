import Character from "/src/js/Beings/character.js";
import Weapon from "/src/js/Items/weapon.js";
import Items from "/src/js/Items/item.js";

export default class Ennemi extends Character{
     constructor(scene, image,x, y, calque, velocity) {
        super(scene,image,x,y,calque);
        this.speedx = 100;
        if (velocity != undefined) {
            this.speedx = this.speedx*velocity;
        } 
        this.direction='left';
        
        this.pickWeapon(new Weapon(this.scene,"Hands",2,2,1,"",false));
        this.givenPV=5;
        this.givenAttackSpeed=3;
        this.givenDamage=2;
        this.ennemi_dead=this.scene.sound.add('ennemi_death')
        // this.createdamage_speed=this.sound.add('damage_speed')
    }
    preload(){
        
    }

    getHit(damage) {
        super.getHit(damage);
        if (this.PV == 0) {
            this.validforDeletion = true;
            this.sprite.destroy();
            this.ennemi_dead.play();
            // Faire apparaître l'objet bonus à la position de l'ennemi
            this.dropItem(this.x, this.y);
        }
    }

    dropItem(x, y) {
        // Générer un nombre aléatoire pour déterminer le type d'item
        const randomNumber = Math.random();
        // Distribution aléatoire de l'item
        if (randomNumber < 0.1) {
            // Donner un boost de PV
            this.drop = new Items(this.scene, "bonus", 0, 0, this.givenPV);
            this.drop.spawnItem(this.sprite.x, this.sprite.y);
        } else if (randomNumber > 0.1 && randomNumber < 0.2) {
            // Donner un boost de vitesse d'attaque
            this.drop = new Items(this.scene, "bonus", this.givenAttackSpeed, 0, 0);
            this.drop.spawnItem(this.sprite.x, this.sprite.y);        
        } else if (randomNumber > 0.2 && randomNumber < 0.3) {
            // Donner un boost de dégâts
            this.drop = new Items(this.scene, "bonus", 0, this.givenDamage, 0);
            this.drop.spawnItem(this.sprite.x, this.sprite.y);        
        } 
        //this.drop = new Items(this.scene, "bonus", 0, 0, this.givenPV);
        //this.drop.spawnItem(this.sprite.x, this.sprite.y);
    }
}
    