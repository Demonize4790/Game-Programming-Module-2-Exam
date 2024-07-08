import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameBootScene from './scenes/GameBootScene.js';
import GameScene from './scenes/gameScene.js';
import GameScene2 from './scenes/levelTwoScene.js';
import GameScene3 from './scenes/levelThreeScene.js';
import winningScene from './scenes/winningScene.js';
import winningTwoScene from './scenes/winningTwoScene.js';
import winningThreeScene from './scenes/winningThreeScene.js';
import GameOverScene from './scenes/GameOverScene.js';
import GameOverSceneTwo from './scenes/GameOverSceneTwo.js';
import GameOverSceneThree from './scenes/GameOverSceneThree.js';
import CreditsScene from './scenes/CreditsScene.js';



var config = {
    type: Phaser.AUTO,
    width: 1840,
    height: 820,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            debug: false
        }
    },
    pixelArt: true,

    scene: [BootScene, MainMenuScene, 
        GameBootScene, GameScene, 
        GameScene2, GameScene3,
        winningScene, winningTwoScene, 
        winningThreeScene, GameOverScene, 
        GameOverSceneTwo, GameOverSceneThree, 
        CreditsScene] 
    
};

new Phaser.Game(config);