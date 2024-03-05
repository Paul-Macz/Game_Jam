
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

        scene.anims.create({
            key: "turn_left",
            frames: scene.anims.generateFrameNumbers(this.image, {
                start: 0,
                end: 3
            }),
            frameRate: 10, // vitesse de défilement des frames
            repeat: -1 
        });
  
        scene.anims.create({
            key: "turn_right",
            frames: scene.anims.generateFrameNumbers(this.image, {
                start: 5,
                end: 8
            }),
            frameRate: 8,
            repeat: -1
        });
        scene.anims.create({
            key: "stand",
            frames: [{ key: this.image, frame: 4 }],
            frameRate: 20
        });

        this.sprite = scene.physics.add.sprite(x, y, this.image);
        scene.physics.add.collider(this.sprite, this.calque); 
    }
    getHit(damage){
        this.PV -= damage;
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
            console.log(`Equipped ${this.equippedWeapon.name}.`);
        } else {
            console.log("Invalid weapon index.");
        }
    }
    attack(){
        this.equippedWeapon.attack(this, this.sprite.x,this.sprite.y);
    }
}