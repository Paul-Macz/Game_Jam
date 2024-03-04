import Weapon from "/src/js/weapon.js"

export default class Range extends Weapon{
    constructor(scene, name, damage, range, atSpeed, speed, image){
        super(scene, name, damage);
        this.range=range;
        this.atSpeed=atSpeed;
        this.speed=speed;
        this.image=image;
        // this.sprite.scene.physics.add.sprite(x,y,this.image)
        //var Bullets;  
        
        this.Bullets = scene.physics.add.group();  
        //scene.physics.add.collider(this.Bullets,platforms, hit, null, scene);
        //scene.physics.add.overlap(this.Bullets, cibles, hit, null,scene);

        // instructions pour les objets surveillés en bord de monde
        scene.physics.world.on("worldbounds", function(body) {
        // on récupère l'objet surveillé
        var objet = body.gameObject;
        // s'il s'agit d'une balle
        if (this.Bullets.contains(objet)) {
        // on le détruit
        objet.destroy();
    }
  });
    }

    attack(player){
        var coefDir;
        if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
        // on crée la balle a coté du joueur
        var bullet = this.Bullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.onWorldBounds = true;  
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
    }
    hit (uneBalle, uneCible) {
        uneBalle.destroy(); // destruction de la balle
        // uneCible.destroy();  // destruction de la cible.   
      }  
    // hit (bullet, cible) {
    //     cible.pointsVie--;
    //     if (cible.pointsVie==0) {
    //       cible.destroy(); 
    //     } 
    //      bullet.destroy();
    //   }  
}