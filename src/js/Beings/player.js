import Character from "/src/js/Beings/character.js";
import Range from "/src/js/Items/range.js";

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

        if(this.calque!=undefined){
            this.scene.cameras.main.setBounds(this.scene.boundx, this.scene.boundy, this.scene.boundWidth, this.scene.boundHeight);
            this.scene.cameras.main.startFollow(this.sprite); 
        }
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
        // if(this.fKey.isDown){
        //     this.attack();
        // }
        if(this.calque!=undefined){
            const adjustedMouseX = this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX;
            const adjustedMouseY = this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY;
            if(this.scene.input.mousePointer.isDown){
                if(this.equippedWeapon instanceof Range){
                    this.attack(adjustedMouseX,adjustedMouseY);
                }
                else{
                    this.attack();
                }
            }
        }
        else{
            if(this.scene.input.mousePointer.isDown){
                if(this.equippedWeapon instanceof Range){
                    this.attack(this.scene.input.mousePointer.x,this.scene.input.mousePointer.y);
                }
                else{
                    this.attack();
                }
            }
        }
        
    } 
    getHit(damage){
        if(!this.gameOver){
            super.getHit(damage);
            this.update_txt_PV();
            if(this.PV == 0){
                this.gameOver=true;
            }
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