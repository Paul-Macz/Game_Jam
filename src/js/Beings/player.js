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
        
        if (this.qKey.isDown) {
            this.sprite.setVelocityX(-speedx);
            this.direction = 'left';
            this.sprite.anims.play("battlemage_run", true);

        } else if (this.dKey.isDown) {
            this.sprite.setVelocityX(speedx);
            this.direction = 'right';
            this.sprite.anims.play("battlemage_run", true);
        }
        else {
            this.sprite.setVelocityX(0);
            if (!this.attackState && !this.deathState) {
                this.sprite.anims.play("battlemage_idle", true);
            }
        }
        var coords = this.sprite.getBottomLeft();
        if ((this.zKey.isDown && this.sprite.body.touching.down)|| (this.zKey.isDown && this.sprite.body.blocked.down)) {
            this.sprite.setVelocityY(-speedy);
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