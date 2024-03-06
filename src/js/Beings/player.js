import Character from "/src/js/Beings/character.js";
import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js";

export default class Player extends Character{
    constructor(scene,image, x, y,calque) {
        super(scene, image,x,y,calque)
        this.txt_PV = this.scene.add.text(20, 15, "PV: "+this.PV+"/"+this.maxPV, {
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            fontSize: "14pt"
        });
        this.width=20;
        this.height=32;

        this.timeLastAttack=0;
        this.attackState=false;

        this.sprite.setScale(2);
        this.sprite.setSize(this.width,this.height,true);
        this.sprite.setOffset(18,16);
        this.gameOver=false;
        this.sprite.setCollideWorldBounds(true);
        this.swordHitbox =this.scene.add.rectangle(x,y,35,64,"0xffffff",0.5)
        this.scene.physics.add.existing(this.swordHitbox)
        // this.swordHitbox.body.setBounce(0);
        // console.log(this.swordHitbox)
        this.scene.physics.world.enable(this.swordHitbox);
        this.swordHitbox.body.setAllowGravity(false);

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
        if(this.direction == 'left'){
            this.sprite.flipX=true;
        }
        else{
            this.sprite.flipX=false;
        }
        if (velocity === undefined) {
            if(this.equippedWeapon==null){          
                var speedx = 250;
                var speedy = 300;
            }
            else{
                var speedx = 250*this.equippedWeapon.weight;
                var speedy = 300;

            }
        } else {
            var speedx = velocity;
            var speedy = velocity;
        }
        
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-speedx);
            this.direction = 'left';

        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(speedx);
            this.direction = 'right';
        }
        else {
            this.sprite.setVelocityX(0);
            if (!this.attackState) {
                this.sprite.anims.play("battlemage_idle", true);
            }
        }
        var coords = this.sprite.getBottomLeft();
        if ((this.cursors.up.isDown && this.sprite.body.touching.down)|| this.cursors.up.isDown && this.sprite.body.blocked.down) {
            this.sprite.setVelocityY(-speedy);
        } else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(speedy);
        }

        if (this.aKey.isDown){
            //this.getHit(1);
        }
        if(this.eKey.isDown){
            //this.resetPV();
        }
        // if(this.fKey.isDown){
        //     this.attack();
        // }
        if(this.calque!=undefined){
            const adjustedMouseX = this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX;
            const adjustedMouseY = this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY;
            //attack
            if(this.scene.input.mousePointer.isDown){
                //Range attack
                if(this.equippedWeapon instanceof Range){
                    this.attack(adjustedMouseX,adjustedMouseY);
                }
                else{
                    //Melee attack
                    var currentTime = this.scene.time.now;
                    this.sprite.anims.play("battlemage_crouchAttack", true);

                    if ((currentTime - this.timeLastAttack)*this.equippedWeapon.atSpeed >= 1000 || this.timeLastAttack==0) {
                        this.swordHitbox.setActive(true)
                        this.attackState=true;
                        // this.sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame)=>{
                        //     frame.index
                        // })
                        if(this.direction == 'left'){
                            this.swordHitbox.x=this.sprite.x-1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height
                        }
                        else{
                            this.swordHitbox.x=this.sprite.x+1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height 
                        }
                        this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_crouchAttack",()=>{
                            this.sprite.anims.play("battlemage_idle", true);
                        })
                        this.timeLastAttack=currentTime;
                        this.sprite.on('animationcomplete', this.animationComplete, this);
                    }
                    
                    
                }
            }
        }
        else{
            if(this.scene.input.mousePointer.isDown){
                if(this.equippedWeapon instanceof Range){
                    this.attack(this.scene.input.mousePointer.x,this.scene.input.mousePointer.y);
                }
                else{
                    var currentTime = this.scene.time.now;
                    this.sprite.anims.play("battlemage_crouchAttack", true);
                    if ((currentTime - this.timeLastAttack)*this.equippedWeapon.atSpeed >= 1000 || this.timeLastAttack==0) {
                        this.swordHitbox.setActive(true)
                        this.attackState=true;
                        // this.sprite.on(Phaser.Animations.Events.ANIMATION_UPDATE, (anim, frame)=>{
                        //     frame.index
                        // })
                        if(this.direction == 'left'){
                            this.swordHitbox.x=this.sprite.x-1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height
                        }
                        else{
                            this.swordHitbox.x=this.sprite.x+1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height 
                        }
                        this.attack();
                        this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_crouchAttack",()=>{
                            this.sprite.anims.play("battlemage_idle", true);
                        })
                        this.timeLastAttack=currentTime;
                        this.sprite.on('animationcomplete', this.animationComplete, this);
                    }
                    
                }
            }
        }

    } 
    animationComplete(animation, frame) {
        if (animation.key === 'battlemage_crouch    ') {
            this.attackState=false;
            this.swordHitbox.setActive(false)
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