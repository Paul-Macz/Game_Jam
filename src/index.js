// chargement des librairies
import animations from "/src/js/animations.js";
import menu from "/src/js/Scenes/menu.js";
import tutomap from "/src/js/Scenes/tutomap.js";
import menu2 from "/src/js/Scenes/menu2.js";
import niveau1 from "/src/js/Scenes/niveau1.js";
import niveau2 from "/src/js/Scenes/niveau2.js";
import niveau3 from "/src/js/Scenes/niveau3.js";

// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
   scale: {
        // Or set parent divId here
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
   },
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 500 // gravité verticale : acceleration des corps en pixels par seconde
      },
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [animations, menu, tutomap, menu2, niveau1, niveau2, niveau3]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("animations");
