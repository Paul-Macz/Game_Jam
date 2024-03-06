
export default class Items {
    constructor(scene, image, givenAttackSpeed, givenDamage, givenPV) {
        this.scene = scene;
        this.image = image;
        this.givenAttackSpeed = givenAttackSpeed;
        this.givenDamage = givenDamage;
        this.givenPV = givenPV;
    }

    applyDamageBoost(player) {
        player.damage += this.givenDamage;
    }

    applyAttackSpeedBoost(player) {
        player.attackSpeed += this.givenAttackSpeed;
    }

    applyHealthBoost(player) {
        player.health += this.givenPV;
    }

    spawnItem(x, y) {
        // Fait apparaître l'objet à la position (x, y) sur la carte
    }

    removeItem() {
        // Supprime l'objet du monde du jeu
    }

    checkCollisionWithPlayer(player) {
        // Vérifie si l'objet entre en collision avec le joueur
    }

    update() {
        // Met à jour l'état de l'objet
    }
}
