import Character from "/src/js/Beings/character.js";

export default class Ennemi extends Character{
    constructor(scene, image,x, y, calque, velocity) {
        super(scene,image,x,y,calque);
        this.speedx = 200;
        if (velocity != undefined) {
            this.speedx = this.speedx*velocity;
        } 
        
    }

  }