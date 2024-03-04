import Character from "/src/js/character.js";

export default class Player extends Character{
    constructor(scene,image, x, y,calque) {
        super(scene, image,x,y,calque)
        this.txt_PV = this.scene.add.text(20, 15, "PV: "+this.PV+"/"+this.maxPV, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "14pt"
        });
        this.gameOver=false;

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.iKey = scene.input.keyboard.addKey("I");
        this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.fKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
    freeze() {
        this.sprite.body.moves = false;
    }
    update(velocity) {
        if (velocity === undefined) {
            var speedx = 250;
            var speedy = 300;
        } else {
            var speedx = velocity;
            var speedy = velocity;
        }
        
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-speedx);
            this.direction = 'left';
            this.sprite.anims.play("turn_left",true);
            //sprite.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(speedx);
            this.direction = 'right';
            this.sprite.anims.play("turn_right",true);
            //sprite.setFlipX(false);
        }
        else {
            this.sprite.setVelocityX(0);
            this.sprite.anims.play("stand", true);
        }
        var coords = this.sprite.getBottomLeft();
        if ((this.cursors.up.isDown && this.sprite.body.touching.down)|| this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(-speedy);
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(speedy);
        }
        

        if (this.aKey.isDown){
            this.getHit(1);
        }
        if(this.eKey.isDown){
            this.resetPV();
        }
        if(this.fKey.isDown){
            this.attack();
        }
    } 
    getHit(damage){
        super.getHit(damage);
        this.update_txt_PV();
        if(this.PV == 0){
            this.gameOver=true;
        }
    }
    resetPV(){
        super.resetPV();
        this.update_txt_PV();
    }
    update_txt_PV(){
        
        this.txt_PV.setText("PV: " + this.PV+'/'+this.maxPV);
    }
    
  }