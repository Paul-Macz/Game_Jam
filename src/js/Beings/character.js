
export default class Character{
    constructor(scene, image,x, y, calque){
        this.scene=scene;
        this.PV = 20;
        this.maxPV = 20;
        this.inventory=[];
        this.equippedWeapon = null;
        this.damage = 10;
        this.defense = 0.1;
        this.inventory=[];
        this.direction = 'right';
        this.image=image;
        this.calque=calque;
        this.sprite = scene.physics.add.sprite(x, y, this.image);
        this.sprite.setCollideWorldBounds(true);
        this.scene.physics.add.collider(this.sprite, this.calque); 
        this.slash=this.scene.sound.add('slash');
        this.jump=this.scene.sound.add('jump');
    }

    getHit(damage){
this.slash.play()
        this.PV -= damage;
        this.sprite.setTint(0xff0000);
        this.scene.time.delayedCall(500,() => this.resetColor());
        
    }
    resetColor(){
        this.sprite.clearTint();
    }
    resetPV(){
        this.PV=this.maxPV;
    }
    setPV(newPV){
        this.PV=newPV;
    }
    setMaxPV(newMax){
        this.maxPV=newMax;
    }
    setInv(inv){
        this.inventory=inv;
    }
    setDef(def){
        this.defense=def;
    }
    setDam(dam){
        this.damage=dam;
    }
    pickWeapon(weapon){

        this.inventory.push(weapon);
        if(this.equippedWeapon==null){
            this.equipWeapon(this.inventory.length-1);
        }
        
    }
    equipWeapon(index){

        if (index >= 0 && index < this.inventory.length) {
            this.equippedWeapon = this.inventory[index];
            
            // console.log(`Equipped ${this.equippedWeapon.name}.`);
        } 
        // else {
        // console.log("Invalid weapon index.");
        // }
    }
    attack(){
        if(this.equippedWeapon!=null){
            //this.sprite.anims.play("attack");
            this.equippedWeapon.attack(this, this.sprite.x,this.sprite.y,this.sprite.height);
        }
    }
    attack(targetx,targety){
        if(this.equippedWeapon!=null){
            // console.log(this.inventory)
            this.equippedWeapon.attack(this, this.sprite.x,this.sprite.y,targetx,targety);
        }
    }
}