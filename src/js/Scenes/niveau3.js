


var calque_tuto;

export default class niveau3 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveau3" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

/** La fonction preload est appelée une et une seule fois,
 * lors du chargement de la scene dans le jeu.
 * On y trouve surtout le chargement des assets (images, son ..)
 */
 preload() {
  this.load.spritesheet("img_perso", "src/assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });

  // chargement de la carte
  this.load.image("Phaser_tuilesdejeu", "src/assets/depart.png");
  this.load.tilemapTiledJSON("carte", "src/assets/Tutorielmap.json");
  
    

  


}

/***********************************************************************/
/** FONCTION CREATE 
/***********************************************************************/

/* La fonction create est appelée lors du lancement de la scene
 * si on relance la scene, elle sera appelée a nouveau
 * on y trouve toutes les instructions permettant de créer la scene
 * placement des peronnages, des sprites, des platesformes, création des animations
 * ainsi que toutes les instructions permettant de planifier des evenements
 */
create() {
  
  // chargement de la carte
const carteDuNiveau = this.add.tilemap("carte");

// chargement du jeu de tuiles
const tileset = carteDuNiveau.addTilesetImage(
          "depart",
          "Phaser_tuilesdejeu"
        ); 
// chargement tuiles de jeu
// chargement du calque calque_background
const calque_tuto = carteDuNiveau.createLayer(
  "calque_tuto",
  tileset
);

// définition des tuiles de plateformes qui sont solides
// utilisation de la propriété estSolide
 calque_tuto.setCollisionByProperty({ estSolide: true }); 

this.player = new Player(100, 450);
this.player.sprite.setCollideWorldBounds(true);
this.player.sprite.setBounce(0.2);
// ajout d'une collision entre le joueur et le calque plateformes
this.physics.add.collider(player, calque_tuto);
// redimentionnement du monde avec les dimensions calculées via tiled
this.physics.world.setBounds(0, 0, 4800, 1600);
//  ajout du champs de la caméra de taille identique à celle du monde
this.cameras.main.setBounds(0, 0, 4800, 1600);
// ancrage de la caméra sur le joueur
this.cameras.main.startFollow(player); 




  clavier = this.input.keyboard.createCursorKeys();

  // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
  this.anims.create({
    key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1, // nombre de répétitions de l'animation. -1 = infini
  });

   // dans cette partie, on crée les animations, à partir des spritesheet
  // chaque animation est une succession de frame à vitesse de défilement défini
  // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
  // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
  this.anims.create({
    key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
  this.anims.create({
    key: "anim_tourne_droite", // key est le nom de l'animation : doit etre unique poru la scene.
    frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }), // on prend toutes les frames de img perso numerotées de 0 à 3
    frameRate: 10, // vitesse de défilement des frames
    repeat: -1 // nombre de répétitions de l'animation. -1 = infini
  }); 
  this.anims.create({
    key: "anim_face",
    frames: [{ key: "img_perso", frame: 4 }],
    frameRate: 20
  }); 


  
}


 update() {
  if (clavier.right.isDown == true) {
    player.setVelocityX(160);
    player.anims.play("anim_tourne_droite", true);
  } else if (clavier.left.isDown == true) {
    player.setVelocityX(-160);
    player.anims.play("anim_tourne_gauche", true);
  } else {
    player.setVelocityX(0);
    player.anims.play('anim_face'); 
  }

  if (clavier.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-400);
  } 
  
  if (gameOver) {
    return;
  } 
}
}
