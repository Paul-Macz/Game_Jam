import Ennemi from "/src/js/Beings/ennemi.js";

export default class Flying extends Ennemi{
    constructor(scene, image,x, y, calque){
        super(scene, image,x, y, calque);
        this.sprite.body.allowGravity = false; // n'autorisez pas la gravité à affecter le sprite
    }

    update(velocity){
        super.update(velocity);
        function generateRandomNumber() { // Fonction pour générer et traiter un nombre aléatoire
        const randomNumber = Math.floor(Math.random() * 101) // Tirage d'un nombre aléatoire entre 0 et 100
        // Actions en fonction de l'intervalle dans lequel se situe le nombre aléatoire
        if (randomNumber >= 0 && randomNumber <= 20) { // le mob volant monte en diagonale (gauche, droite ou aucun des deux)
            const randomDirection = Math.random(); // Générer un nombre aléatoire entre 0 et 1
            if (randomDirection < 0.33) { // Définir la vitesse de déplacement en diagonale (haut-gauche)
                this.sprite.setVelocityX(-velocity / 2);
                this.sprite.setVelocityY(-velocity / 2);
                this.sprite.anims.play("turn_left", true);
            } else if (randomDirection < 0.66) { // Définir la vitesse de déplacement en diagonale (haut-droite)
                this.sprite.setVelocityX(velocity / 2);
                this.sprite.setVelocityY(-velocity / 2);
                this.sprite.anims.play("turn_turn right", true);
            } else {
                this.sprite.setVelocityY(-velocity / 2);
                this.sprite.anims.play("stand", true);
            }
        } else if (randomNumber > 20 && randomNumber <= 40) { // le mob volant va à gauche
        if(this.sprite.body.blocked.left){
            if (this.direction == "left") {
                    this.direction = "right";
                    this.sprite.setVelocityX(velocity);
                    this.sprite.anims.play("turn_right", true);
                }     
            } else {
                this.sprite.setVelocityX(-velocity);
                this.sprite.anims.play("turn_left", true);
            }
        
        } else if (randomNumber > 40 && randomNumber <= 60) { // le mob volant va à droite
        if (this.sprite.body.blocked.right) {
            if (this.direction == "right"){
                this.direction = "left";
                this.sprite.setVelocityX(-velocity);
                this.sprite.anims.play("turn_left", true);
            } else {
                this.sprite.setVelocityX(velocity);
                this.sprite.anims.play("turn_right", true);
            }
        }
        
        } else if (randomNumber > 60 && randomNumber <= 80) { // le mob volant descend en diagonale (gauche, droite ou aucun des deux)
            const randomDirection = Math.random(); // Générer un nombre aléatoire entre 0 et 1
            if (randomDirection < 0.33) { // Définir la vitesse de déplacement en diagonale (haut-gauche)
                this.sprite.setVelocityX(-velocity / 2);
                this.sprite.setVelocityY(velocity / 2);
                this.sprite.anims.play("turn_left", true);
            } else if (randomDirection < 0.66) { // Définir la vitesse de déplacement en diagonale (haut-droite)
                this.sprite.setVelocityX(velocity / 2);
                this.sprite.setVelocityY(velocity / 2);
                this.sprite.anims.play("turn_right", true);
            } else {
                this.sprite.setVelocityY(velocity / 2);
                this.sprite.anims.play("turn_stand", true);
            }
    
        } else { // le mob volant reste sur place
            this.sprite.anims.play("stand", true);

    }
}
// Définir le délai de 7 secondes en millisecondes
const delay = 5000;
// Lancer le timer
setTimeout(generateRandomNumber, delay);
    }
}
