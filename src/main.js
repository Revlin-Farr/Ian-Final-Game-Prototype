//Ian Rhoads 
//Completed 26 Agust 2022
//An infinite runner based off of the rocket patrol code. changes to the movement of the player and enemies,
//as well as changes to the way you end the game have been made to provide a runner style of gameplay.
//Playable game based off the playtests ran



let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu,Play,Loss]
  }
let game = new Phaser.Game(config);
let keyF, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;
// set UI size
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
 