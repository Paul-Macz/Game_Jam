import Ennemi from "src/js/Beings/ennemi.js";

export default class Flying extends Ennemi{
    constructor(scene, image,x, y, calque){
        super(scene, image,x, y, calque);
    }
    update(velocity){
        super.update(velocity);
        
    }
}