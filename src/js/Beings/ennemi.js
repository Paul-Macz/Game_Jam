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
        
        this.health=this.scene.add.rectangle(this.sprite.x,this.sprite.y,50,6,"0xffffff")
        this.health2=this.scene.add.rectangle(this.sprite.x,this.sprite.y,50,6,"0x00ff00")

        
    }


    getHit(damage) {
        super.getHit(damage);
        this.health2.width=this.health.width*(this.PV/this.maxPV)
        if(this.PV<this.maxPV*0.5 && this.PV>this.maxPV*0.25){
            this.health2.setFillStyle(0xffff00); // Set fill color to red
        }
        else if(this.PV<this.maxPV*0.25){
            this.health2.setFillStyle(0xff0000); // Set fill color to red
        }
        if(this.PV==0){
            
            this.validforDeletion=true;
            this.ennemi_dead.play();
            this.deathAnim();
            var anim=this.sprite.anims.currentAnim;
            this.scene.time.delayedCall(800,this.kill,[],this);
            
            
        
        }
    }
    kill(){
        this.sprite.destroy();
        this.health.setAlpha(0);
        this.health2.setAlpha(0);
    }
  deathAnim(){
    if(this.image=="battlemage"){
        this.sprite.anims.play("battlemage_death", true);
    }
    if(this.image=="slime"){
        this.sprite.anims.play("slime_death", true);
    }
    if(this.image=="viking"){
        this.sprite.anims.play("viking_fall", true);
    }
    if(this.image=="hache_rouge"){
        this.sprite.anims.play("hache_rouge_fall", true);
    }
    if(this.image=="archer"){
        this.sprite.anims.play("archer_dead", true);
    }
    if(this.image=="squelette_lance"){
        this.sprite.anims.play("squelette_lance_dead", true);
    }
    if(this.image=="squelette_hache"){
        this.sprite.anims.play("squelette_hache_dead",true);
    }
    if(this.image=="petit_squelette"){
        this.sprite.anims.play("petit_squelette/dead_near", true);
    }
    if(this.image=="squelette_epee"){
       this.sprite.anims.play("squelette_epee_/dead", true);
    }  
}
    dropItem() {
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
    