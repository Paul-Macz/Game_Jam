
export default class Items {
    constructor(scene, image, givenAttackSpeed, givenDamage, givenPV) {
        this.scene=scene
        this.image = image;
        this.givenAttackSpeed = givenAttackSpeed;
        this.givenDamage = givenDamage;
        this.givenPV = givenPV;
        //this.item = this.scene.add.rectangle(x, y, this.width * 1.75, this.height * 2, 0xffffff, 0);

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
        this.sprite = this.scene.physics.add.sprite(x, y, this.image);
        this.sprite.anims.play("bonus_anim", true);
    }

    removeItem() {
        // Supprime l'objet du monde du jeu
        this.destroy();
    }

    checkCollisionWithPlayer(player,item) {
        // Vérifie si l'objet entre en collision avec le joueur
        return this.scene.physics.overlap(player, this);
    }

    update() {
        // applique un effet de rebond à l'item
        this.sprite.setBounceY(10)
    }
}

