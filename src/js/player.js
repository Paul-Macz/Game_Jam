
export default class Player {
    constructor(scene, x, y) {
      this.scene = scene;
      this.PV = 20;
      this.maxPV = 20;
      this.inventory;
      this.degats = 200;
      this.defense = 0.1;
      this.txt_PV = scene.add.text(20, 15, "PV: "+this.PV+"/"+this.maxPV, {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
        fontSize: "14pt"
      });
      this.gameOver=false
      
  
      scene.anims.create({
        key: "turn_left",
        frames: scene.anims.generateFrameNumbers("img_perso", {
            start: 0,
            end: 3
        }),
        frameRate: 10, // vitesse de défilement des frames
        repeat: -1 
      });
  
      scene.anims.create({
        key: "turn_right",
        frames: scene.anims.generateFrameNumbers("img_perso", {
            start: 5,
            end: 8
        }),
        frameRate: 8,
        repeat: -1
      });
      scene.anims.create({
        key: "stand",
        frames: [{ key: "img_perso", frame: 4 }],
        frameRate: 20
      });
  
      this.sprite = scene.physics.add.sprite(x, y, "img_perso");
  
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.iKey = scene.input.keyboard.addKey("I");
      this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      this.eKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
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
      const cursors = this.cursors;
      const sprite = this.sprite;
      sprite.setVelocityX(0);
      if (cursors.left.isDown) {
        sprite.setVelocityX(-speedx);
  
        //sprite.setFlipX(true);
      } else if (cursors.right.isDown) {
        sprite.setVelocityX(speedx);
  
        //sprite.setFlipX(false);
      }
      if (cursors.up.isDown && this.sprite.body.touching.down) {
        sprite.setVelocityY(-speedy);
      } else if (cursors.down.isDown) {
        sprite.setVelocityY(speedy);
      }
      if(cursors.left.isDown){
        sprite.anims.play("turn_left",true);
      }
      else if(cursors.right.isDown){
        sprite.anims.play("turn_right",true);
      }
      else {
        sprite.anims.play("stand", true);
      }

      if (this.aKey.isDown){
        this.getHit(this, 1);
      }
      if(this.eKey.isDown){
        this.resetPV();
      }
    } 

    getHit(player, damage){
        player.PV -= damage;
        this.update_txt_PV();
        if(player.PV == 0){
            this.gameOver=true;
        }
    }

    resetPV(){
        this.PV=this.maxPV;
        this.update_txt_PV();
    }

    update_txt_PV(){
        this.txt_PV.setText("PV: " + this.PV+'/'+this.maxPV);
    }
  }