import Ennemi from "/src/js/Beings/ennemi.js";

export default class Terrestre extends Ennemi{
    constructor(scene, image,x, y, calque){
        super(scene, image,x, y, calque);
        // this.sprite.setVelocityX(-this.speedx);
        this.walkAnim();
        switch(image){
            case "viking":
                this.owidth=10;
                this.oheight=15;
                this.scale=2;
                this.width=this.owidth*this.scale;
                this.height=this.oheight*this.scale;

                this.sprite.setScale(this.scale);
                this.sprite.setSize(this.owidth*(this.scale-0.8),this.height,true);
                this.sprite.setOffset(this.owidth*1.7,this.oheight/(this.scale-0.6));
                break;
            case "hache_rouge":
                this.owidth=10;
                this.oheight=15;
                this.scale=2;
                this.width=this.owidth*this.scale;
                this.height=this.oheight*this.scale;

                this.sprite.setScale(this.scale);
                this.sprite.setSize(this.owidth*(this.scale-0.7),this.height,true);
                this.sprite.setOffset(this.width*(this.scale+0.15),this.oheight*(this.scale+0.5));
                break;
            case"slime":
                this.owidth=10;
                this.oheight=15;
                this.scale=1.5;
                this.width=this.owidth*this.scale;
                this.height=this.oheight*this.scale;

                this.sprite.setScale(this.scale);
                this.sprite.setSize(this.owidth*(this.scale+2),this.oheight*(this.scale-0.4),true);
                this.sprite.setOffset(this.owidth*5,this.oheight*(this.scale+3.8));
                break;
        }
        
    }
    update(){
        //ennemi touching the floor
        if(this.direction == 'left'){
            this.sprite.flipX=true;
        }
       else{
            this.sprite.flipX=false;
        }
     
       

        if(this.sprite.body.blocked.down){
            if (this.direction == "left") {
                var coords = this.sprite.getBottomLeft();
                var tuileSuivante = this.calque.getTileAtWorldXY(
                    coords.x,
                    coords.y + 10
                );
                if (tuileSuivante == null || this.sprite.body.blocked.left) {
                    
                    // on risque de marcher dans le vide, on tourne
                    this.direction = "right";
                    this.sprite.setVelocityX(this.speedx);
                    this.walkAnim();
                }
                else{
                    this.sprite.setVelocityX(-this.speedx)
                    const directionX = this.scene.player.sprite.x - this.sprite.x;
                    const directionY = this.scene.player.sprite.y - this.sprite.y;
                    // Normalisation de la direction
                    const norm = Math.sqrt(directionX * directionX + directionY * directionY);
                    // Vérification si le boss doit suivre le joueur
                    const distanceMinimale = 600; // Distance minimale pour que le boss commence à suivre le joueur
                    if (norm < distanceMinimale) {
                    // Ajustement de la vélocité du boss pour qu'il se déplace vers le joueur
                    const vitesse = 100; // Vitesse de déplacement du boss
                    const velocityX = directionX / norm * vitesse;
                    const velocityY = directionY / norm * vitesse;
                    this.sprite.setVelocityX(velocityX);
                    } 
                } 
            } 
            else if (this.direction == "right") {
                var coords = this.sprite.getBottomRight();
                var tuileSuivante = this.calque.getTileAtWorldXY(
                    coords.x,
                    coords.y + 10
                );
                if (tuileSuivante == null || this.sprite.body.blocked.right) {
                    // on risque de marcher dans le vide, on tourne
                    this.direction = "left";
                    this.sprite.setVelocityX(-this.speedx);
                }
                else{
                    this.sprite.setVelocityX(this.speedx)
                    const directionX = this.scene.player.sprite.x - this.sprite.x;
                    const directionY = this.scene.player.sprite.y - this.sprite.y;
                    // Normalisation de la direction
                    const norm = Math.sqrt(directionX * directionX + directionY * directionY);
                    // Vérification si le boss doit suivre le joueur
                    const distanceMinimale = 600; // Distance minimale pour que le boss commence à suivre le joueur
                    if (norm < distanceMinimale) {
                        // Ajustement de la vélocité du boss pour qu'il se déplace vers le joueur
                        const vitesse = 100; // Vitesse de déplacement du boss
                        const velocityX = directionX / norm * vitesse;
                        const velocityY = directionY / norm * vitesse;
                        this.sprite.setVelocityX(velocityX);
                        // if (norm < 60) {
                        //     this.attackAnim();
                        // }
                    } 
                } 
            }   
        }
    }
    walkAnim(){
        if(this.image=="battlemage"){
            this.sprite.anims.play("battlemage_run", true);
        }
        if(this.image=="walk_squelette_1"){
            this.sprite.anims.play("squelet_walk1", true);
        }
        if(this.image=="slime"){
            this.sprite.anims.play("slime_walk", true);
        }
        if(this.image=="viking"){
            this.sprite.anims.play("viking_walk", true);
        }
        if(this.image=="hache_rouge"){
            this.sprite.anims.play("hache_rouge_walk", true);
        }
        if(this.image=="archer"){
            this.sprite.anims.play("archer_run", true);
        }
        if(this.image=="squelette_lance"){
            this.sprite.anims.play("squelette_lance_walk", true);
        }
        if(this.image=="squelette_hache"){
            this.sprite.anims.play("squelette_hache_walk",true);
        }
        if(this.image=="petit_squelette"){
            this.sprite.anims.play("petit_squelette/walk", true);
        }
        if(this.image=="squelette_épée"){
            this.sprite.anims.play("squelette_epee_/walk", true);
        }
    }
    attackAnim(){
        console.log("pitie")
        var rand = Math.random()
        if(this.image=="battlemage"){
            this.sprite.anims.play("battlemage_run", true);
        }
        if(this.image=="slime"){
            if(rand<0.33){
                this.sprite.anims.play("slime_attackA", true);
            }
            else if(rand>0.33 && rand<0.66){
                this.sprite.anims.play("slime_attackB", true);
            }
            if(rand>0.66){
                this.sprite.anims.play("slime_attackC", true);
            }
        }
        if(this.image=="viking"){
            if(rand<0.5){
                this.sprite.anims.play("viking_attack1", true);
            }
            else{
                this.sprite.anims.play("viking_attack2", true);
            }
        }
        if(this.image=="hache_rouge"){
            if(rand<0.5){
                this.sprite.anims.play("hache_rouge_attack1", true);
            }
            else{
                this.sprite.anims.play("hache_rouge_attack2", true);
            }
        }
        if(this.image=="archer"){
            if(rand<0.5){
                this.sprite.anims.play("archer_attackA", true);
            }
            else{
                this.sprite.anims.play("archer_attackB", true);
            }
        }
        if(this.image=="squelette_lance"){
            this.sprite.anims.play("squelette_lance_walk", true);
        }
        if(this.image=="squelette_hache"){
            this.sprite.anims.play("squelette_hache_walk",true);
        }
        if(this.image=="petit_squelette"){
            this.sprite.anims.play("petit_squelette/walk", true);
        }
        if(this.image=="squelette_épée"){
            this.sprite.anims.play("squelette_epee_/walk", true);
        }
    }
    deathAnim(){
        if(this.image=="battlemage"){
            this.sprite.anims.play("battlemage_death", true);
        }
        if(this.image=="slime"){
            this.sprite.anims.play("slime_death", true);
        }
        if(this.image=="viking"){
            this.sprite.anims.play("viking_dead", true);
        }
        if(this.image=="hache_rouge"){
            this.sprite.anims.play("hache_rouge_dead", true);
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
}