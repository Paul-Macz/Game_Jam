
export default class Items {
    constructor(scene, image, givenAttackSpeed, givenDamage, givenPV,x,y) {
        this.scene = scene;
        this.image = image;
        this.givenAttackSpeed = givenAttackSpeed;
        this.givenDamage = givenDamage;
        this.givenPV = givenPV;
        this.x = x;
        this.y = y;
        this.used=false
        // this.item = this.scene.add.rectangle(this.x, this.y, this.width * 1.75, this.height * 2, 0xffffff, 0);
        // this.scene.physics.add.overlap(this.scene.player.sprite, this.sprite, this.handlePlayerItemCollision, null, this.scene);
    }
    // handlePlayerItemCollision(playerSp, drop){
    //     console.log(this.scene.player.PV)
    //     drop.item.applyHealthBoost(this.scene.player)
    //     if(this.scene.player.PV>this.scene.player.maxPV){
    //       this.scene.player.PV=this.scene.player.maxPV
    //     }
    //     console.log(this.scene.player.PV)
    //     drop.item.applyAttackSpeedBoost(this.scene.player.equippedWeapon)
    //     drop.item.applyDamageBoost(this.scene.player.equippedWeapon)
    //   }
    applyDamageBoost(player) {
        if(!this.used){
        player.damage += this.givenDamage;
        this.used=true
        }
        this.removeItem()
        
    }

    applyAttackSpeedBoost(weapon) {
        if(!this.used){
        weapon.atSpeed += this.givenAttackSpeed;
        this.used=true
        }
        this.removeItem()
        
    }

    applyHealthBoost(player) {
        if(!this.used){
        player.PV += this.givenPV;
        this.used=true
        }
        this.removeItem()
    }

    spawnItem(x, y) {
        this.sprite = this.scene.physics.add.sprite(x, y, this.image);
        this.sprite.body.setAllowGravity(false);
        this.sprite.body.onWorldBounds = true;  
        this.sprite.body.allowGravity = false;
        this.sprite.anims.play("item_anim",true)
    }

    removeItem() {
        // Supprime l'objet du monde du jeu
        this.sprite.destroy();
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

