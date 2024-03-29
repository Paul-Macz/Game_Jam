import Character from "/src/js/Beings/character.js";
import Weapon from "/src/js/Items/weapon.js"

export default class Range extends Weapon{
    constructor(scene, name, damage, atSpeed, weight, image, byPlayer, range, bulSpeed,pierce){
        super(scene, name, damage, atSpeed, weight, image, byPlayer);
        this.range=range;
        this.lastShotTime=0;
        this.bulSpeed=bulSpeed;
        this.Bullets = this.scene.physics.add.group(); 
        this.pierce=pierce; 

        // Use an arrow function to retain the 'this' context
        this.scene.physics.world.on("worldbounds", (body) => {
            var objet = body.gameObject;
            if (this.Bullets.contains(objet)) {
                objet.destroy();
            }
        });
        
    }

    attack(user, userx, usery,targetx,targety){
        var currentTime = this.scene.time.now;
        if ((currentTime - this.lastShotTime)*this.atSpeed >= 1000 || this.lastShotTime==0) {
        var angle = Phaser.Math.Angle.Between(userx, usery,targetx, targety);
        // on crée la balle a coté du joueur
        var bullet = this.Bullets.create(userx, usery-4, this.image);
        bullet.setScale(2)
        bullet.setSize(10,10)
        if(this.image=="fire-ball"){
            bullet.anims.play("fireball",true)
        }
        else{bullet.anims.play("holyball",true)}
        // parametres physiques de la balle.
        bullet.timer=this.scene.time.delayedCall(this.range*1000-0.5*this.bulSpeed,this.erase,[bullet],this.scene);
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;  
        bullet.body.allowGravity = false;
        bullet.setVelocity(Math.cos(angle) * this.bulSpeed, Math.sin(angle) * this.bulSpeed);
        
        //Mise-a-jour temps
        this.lastShotTime = currentTime;
        
    }}
    hit (uneBalle, target){
        if(target!=undefined){
            if(target.ennemiObject instanceof Character){
                super.hit(target.ennemiObject);
                if(!this.pierce){
                    uneBalle.destroy();
                }
                var animBox =this.scene.physics.add.sprite(uneBalle.x, uneBalle.y, this.image);
                animBox.body.onWorldBounds = true;  
                animBox.body.allowGravity = false;
                if(this.image=="fire-ball"){
                    animBox.anims.play("fire_impact")
                }
                else{
                    animBox.anims.play("lightning_impact")
                }
            }
            else{
                uneBalle.destroy();
            }
        }
    }
    erase(uneBalle){
        uneBalle.destroy();
    }
}