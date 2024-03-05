import Weapon from "/src/js/Items/weapon.js"

export default class Range extends Weapon{
    constructor(scene, name, damage, atSpeed, userSpeed, image, byPlayer, range, bulSpeed){
        super(scene, name, damage, atSpeed, userSpeed, image,byPlayer);
        this.range=range;
        this.lastShotTime=0;
        this.bulSpeed=bulSpeed;
        this.Bullets = scene.physics.add.group();  

        // Use an arrow function to retain the 'this' context
        scene.physics.world.on("worldbounds", (body) => {
            var objet = body.gameObject;
            if (this.Bullets.contains(objet)) {
                objet.destroy();
            }
        });
    }

    attack(user, userx, usery){
        var currentTime = this.scene.time.now;
        if (currentTime - this.lastShotTime >= this.atSpeed) {
        var coefDir;
        if (user.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
        // on crée la balle a coté du joueur
        var bullet = this.Bullets.create(userx + (25 * coefDir), usery - 4, 'bullet');
    
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;  
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y

        //Mise-a-jour temps
        this.lastShotTime = currentTime;
    }}
    hit (uneBalle) {
        uneBalle.destroy(); // destruction de la balle
        // uneCible.destroy();  // destruction de la cible.   
      }  
}