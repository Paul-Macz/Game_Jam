import Character from "/src/js/Beings/character.js";
import Range from "/src/js/Items/range.js";
import Melee from "/src/js/Items/melee.js";
// var ekho_death;
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
        this.hurtState=false;

        this.sprite.setScale(this.scale);
        this.sprite.setSize(this.width*(2.9-this.scale),this.height*(2.9-this.scale),true);
        this.sprite.setOffset((this.width-1)*(this.scale+0.1),this.oheight/(this.scale-0.1));
        this.gameOver=false;
        this.sprite.setCollideWorldBounds(true);
        this.swordHitbox =this.scene.add.rectangle(0,0,this.width*1.75,this.height*2,"0xffffff",0)
        this.scene.physics.add.existing(this.swordHitbox)
        // this.swordHitbox.body.setBounce(0);
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
        this.ONEKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.TWOKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);

        if(this.calque!=undefined){
            this.scene.cameras.main.setBounds(this.scene.boundx, this.scene.boundy, this.scene.boundWidth, this.scene.boundHeight);
            this.scene.cameras.main.setZoom(1);
            this.scene.cameras.main.startFollow(this.sprite); 
        }
        this.death=0;
        this.sprite.anims.play("battlemage_idle", true);

        this.ekho_death=this.scene.sound.add('ekho_death')
    }
    freeze() {
        this.sprite.body.moves = false;
    }
    deaths(){
        this.gameOver=true;
        this.ekho_death.play();
        
    }
    update(velocity) {

        if(!this.deathState){
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
                if(!this.attackState){
                    this.sprite.anims.play("battlemage_run", true);
                }
            }
            else{
                // this.jumpState=1;
                if(!this.jumpForward){
                    if(!this.attackState){
                    this.sprite.anims.play("battlemage_jumpForwardUp", true);
                    }
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
                if(!this.attackState){
                    this.sprite.anims.play("battlemage_run", true);
                }
            }
            else{
                // this.jumpState=1;
                if(!this.jumpForward){
                    if(!this.attackState){
                        this.sprite.anims.play("battlemage_jumpForwardUp", true);
                    }
                }
                this.jumpForward=true;
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardUp",()=>{
                    this.sprite.anims.play("battlemage_jumpForwardDown", true);
                })
                
            }
        }
        else {
            this.sprite.setVelocityX(0);
            if (!this.attackState && (this.sprite.body.touching.down || this.sprite.body.blocked.down)) {
                if(velocityX==0 && velocityY==0){
                    if(this.jumpState==0 && !this.animState){
                        if(!this.attackState){
                            this.sprite.anims.play("battlemage_idle", true);
                        }
                    }
                    else{
                        if(this.jumpNeutral){
                            if(!this.attackState){
                                this.sprite.anims.play("battlemage_jumpNeutralGround", true);
                            }
                            this.jumpNeutral=false
                            this.animState=true
                            this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpNeutralGround",()=>{

                                this.animState=false
                            })
                        }
                        else{
                            if(!this.attackState){
                                this.sprite.anims.play("battlemage_jumpForwardGround", true);
                            }
                            this.jumpForward=false
                            this.animState=true
                                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardGround",()=>{

                                    this.animState=false
                                })
                           
                        }
                        
                    }
                }
            }
        }
        var coords = this.sprite.getBottomLeft();
        if(this.sprite.body.touching.down || this.sprite.body.blocked.down){
            this.jumpState=0
        }

// Logique de saut
if (Phaser.Input.Keyboard.JustDown(this.zKey) && this.jumpState < 2) {

    if ((this.sprite.body.touching.down || this.sprite.body.blocked.down) || this.jumpState==1) {
        // Le joueur est au sol ou bloqué vers le bas, il peut sauter
        this.sprite.setVelocityY(-speedy);
        this.jumpState++;
    }
    this.jumpForward.play();
    
            if(velocityX==0){
                this.jumpNeutral=true;
                if(!this.attackState){
                this.sprite.anims.play("battlemage_jumpNeutralUp", true);
                }
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpNeutralUp",()=>{
                    this.sprite.anims.play("battlemage_jumpNeutralDown", true);
                })
            }
            else{
                this.jumpForward=true;
                if(!this.attackState){
                    this.sprite.anims.play("battlemage_jumpForwardUp", true);
                }
                this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +"battlemage_jumpForwardUp",()=>{
                    this.sprite.anims.play("battlemage_jumpForwardDown", true);
                })
            }
        }
 

        if (Phaser.Input.Keyboard.JustDown(this.ONEKey)){
            this.equipWeapon(0)
        }
        if(Phaser.Input.Keyboard.JustDown(this.TWOKey)){
            this.equipWeapon(1)
        }

        
            //attack
            if(this.scene.input.mousePointer.isDown){
                //Range attack
                if(this.equippedWeapon instanceof Range){
                    
                    if(this.calque!=undefined){
                        this.adjustedMouseX = this.scene.input.mousePointer.x + this.scene.cameras.main.scrollX;
                        this.adjustedMouseY = this.scene.input.mousePointer.y + this.scene.cameras.main.scrollY;
                    }
                    else{
                        this.adjustedMouseX = this.scene.input.mousePointer.x
                        this.adjustedMouseY = this.scene.input.mousePointer.y
                    }
                    this.attack(this.adjustedMouseX,this.adjustedMouseY);
                }
                else{
                    this.slash.play();

                    //Melee attack
                    var currentTime = this.scene.time.now;

                    var rand = Math.random();
                    var anim;
                    if(rand<0.33){
                        anim="battlemage_attack1"
                    }
                    else if (rand>0.33 && rand<0.66){
                        anim="battlemage_attack2"
                    }
                    else{
                        anim="battlemage_attack3"
                    }
                    if(!this.attackState){
                        this.sprite.anims.play(anim, true);
                    }
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
                        if(!this.hurtState){
                            this.sprite.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY +anim,()=>{
                                this.attackState=false;
                                this.swordHitbox.x=0;
                                this.swordHitbox.y=0
                            })
                        }
                        else{
                            this.attackState=false
                            this.swordHitbox.x=0;
                            this.swordHitbox.y=0
                        }
                        this.timeLastAttack=currentTime;
                    }
                    
                    
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
            this.attackState=false
            this.hurtState=true
            this.sprite.anims.play("battlemage_hit", true);
            this.sprite.anims.stop()
            super.getHit(damage);
            this.update_txt_PV();
            this.hurtState=false;

            if(this.PV == 0){
                this.deaths();
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