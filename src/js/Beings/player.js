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
        this.owidth=10;
        this.oheight=16;
        this.scale=1.3;
        this.width=this.owidth*this.scale;
        this.height=this.oheight*this.scale;
        this.timeLastAttack=0;
        this.attackState=false;
        this.deathState=false
        this.jumpState=0;
        this.jumpForward=false;
        this.jumpNeutral=false;
        this.animState=false;
        
        this.sprite.setScale(this.scale);
        this.sprite.setSize(this.width*(2.9-this.scale),this.height*(2.9-this.scale),true);
        this.sprite.setOffset((this.width-1)*(this.scale+0.1),this.oheight/(this.scale-0.1));
        this.gameOver=false;
        this.sprite.setCollideWorldBounds(true);
        this.swordHitbox =this.scene.add.rectangle(x,y,this.width*1.75,this.height*2,"0xffffff",0)
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
        this.zKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        this.qKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
        this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        if(this.calque!=undefined){
            this.scene.cameras.main.setBounds(this.scene.boundx, this.scene.boundy, this.scene.boundWidth, this.scene.boundHeight);
            this.scene.cameras.main.setZoom(1.5);
            this.scene.cameras.main.startFollow(this.sprite); 
        }
        this.death=0;
        this.sprite.anims.play("battlemage_idle", true);
    }
    freeze() {
        this.sprite.body.moves = false;

    }
    update(velocity) {
        let velocityX = this.sprite.body.velocity.x; // Get the velocity along the x-axis
        let velocityY = this.sprite.body.velocity.y; // Get the velocity along the y-axis
        
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
        if (this.qKey.isDown) {
            
            this.sprite.setVelocityX(-speedx);
            this.direction = 'left';
            if(velocityY==0){
                this.sprite.anims.play("battlemage_run", true);
            }
            else{
                // this.jumpState=1;
                if(!this.jumpForward){
                    this.sprite.anims.play("battlemage_jumpForwardUp", true);
                }
                this.jumpForward=true;
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardUp",()=>{
                    this.sprite.anims.play("battlemage_jumpForwardDown", true);
                })
            }
        } 
        else if (this.dKey.isDown) {
            this.sprite.setVelocityX(speedx);
            this.direction = 'right';
            if(velocityY==0){
                this.sprite.anims.play("battlemage_run", true);
            }
            else{
                // this.jumpState=1;
                if(!this.jumpForward){
                    this.sprite.anims.play("battlemage_jumpForwardUp", true);
                }
                this.jumpForward=true;
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardUp",()=>{
                    this.sprite.anims.play("battlemage_jumpForwardDown", true);
                })
                
            }
        }
        else {
            this.sprite.setVelocityX(0);
            // console.log("check")
            if (!this.attackState && !this.deathState && (this.sprite.body.touching.down || this.sprite.body.blocked.down)) {
                // console.log("check")
                if(velocityX==0 && velocityY==0){
                    // console.log(this.jumpStated)
                    if(this.jumpState==0 && !this.animState){
                        this.sprite.anims.play("battlemage_idle", true);
                    }
                    else{
                        if(this.jumpNeutral){
                            // console.log("hi")
                            this.sprite.anims.play("battlemage_jumpNeutralGround", true);
                            this.jumpNeutral=false
                            this.animState=true
                            this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpNeutralGround",()=>{
                                // this.sprite.anims.play("battlemage_jumpNeutralDown", true);
                                // console.log("hey")
                                this.animState=false
                            })
                        }
                        else{
                            // console.log("hi")
                            this.sprite.anims.play("battlemage_jumpForwardGround", true);
                            this.jumpForward=false
                            this.animState=true
                            this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardGround",()=>{
                                // this.sprite.anims.play("battlemage_jumpForwardDown", true);
                                // console.log("hey")
                                this.animState=false
                            })
                        }
                        this.jumpState=0;
                    }
                }
            }
        }
        var coords = this.sprite.getBottomLeft();
        // if(Phaser.Input.Keyboard.JustDown(this.zKey)){
        //     console.log("hi")
        // }
        
        // Vérifie si la touche de saut est enfoncée et si le joueur peut sauter
// Vérifie si la touche de saut est enfoncée et si le joueur peut sauter
// Vérifie si la touche de saut est enfoncée et si le joueur peut sauter


// Logique de saut
if (this.zKey.isDown && this.jumpState < 2) {
    if ((this.sprite.body.touching.down || this.sprite.body.blocked.down) && this.jumpState==1) {
        // Le joueur est au sol ou bloqué vers le bas, il peut sauter
        this.sprite.setVelocityY(-speedy);
        this.jumpState++;
        console.log(this.jumpState)
    } else if (this.jumpState === 0) {
        // Le joueur est déjà dans les airs après le premier saut, il peut effectuer un deuxième saut
        this.sprite.setVelocityY(-speedy);
        console.log(this.jumpState)
        this.jumpState++ ;// Mise à jour de jumpState pour indiquer que le deuxième saut a été effectué
    }
    // else if(this.jumpState){
    //     this.sprite.setVelocityY(0);
    //     this.jumpState = 0;
    //     console.log(3)
    // }
   
    
            if(velocityX==0){
                this.jumpNeutral=true;
                this.sprite.anims.play("battlemage_jumpNeutralUp", true);
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpNeutralUp",()=>{
                    this.sprite.anims.play("battlemage_jumpNeutralDown", true);
                    // console.log("hey")
                })
            }
            else{
                this.jumpForward=true;
                this.sprite.anims.play("battlemage_jumpForwardUp", true);
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardUp",()=>{
                    this.sprite.anims.play("battlemage_jumpForwardDown", true);
                })
            }
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
        
            //attack
            if(this.scene.input.mousePointer.isDown){
                //Range attack
                if(this.equippedWeapon instanceof Range){
                    if(this.calque!=undefined){
                        const adjustedMouseX = this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX;
                        const adjustedMouseY = this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY;
                    }
                    const adjustedMouseX = this.scene.input.mousePointer.x
                    const adjustedMouseY = this.scene.input.mousePointer.y
                    this.attack(adjustedMouseX,adjustedMouseY);
                }
                else{
                    //Melee attack
                    var currentTime = this.scene.time.now;
                    // this.sprite.anims.play("battlemage_jumpFowardUP", true);
                    this.sprite.anims.play("battlemage_crouchAttack", true);
                    if ((currentTime - this.timeLastAttack)*this.equippedWeapon.atSpeed >= 1000 || this.timeLastAttack==0) {
                        this.scene.physics.world.add(this.swordHitbox.body)
                        this.attackState=true;
                        if(this.direction == 'left'){
                            this.swordHitbox.x=this.sprite.x-1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height
                        }
                        else{
                            this.swordHitbox.x=this.sprite.x+1.8*this.width
                            this.swordHitbox.y=this.sprite.y+0.5*this.height 
                        }
                        this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_crouchAttack",()=>{
                            // this.sprite.anims.play("battlemage_idle", true);
                            this.attackState=false;
                            this.swordHitbox.x=0;
                            this.swordHitbox.y=0
                        })
                        this.timeLastAttack=currentTime;
                    }
                    
                    
                }
            }

    } 
    startJumpFoward(){

    }
    endJumpFoward(){

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