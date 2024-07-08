export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super('CreditsScene');
    }

    preload() {
        //IMAGES
        this.load.image('backButton', './Assets/Buttons/backBtn.png');
        this.load.image('GameBG3', './Assets/Background/credits.png');
        
        //AUDIO
        this.load.audio('gameoverSound', './assets/audio/BGMusic/Game Over.ogg');
        this.load.audio('sound', './assets/audio/sound-effect/menu.wav');
    }
    
    create() {

        this.backgroundw = this.add.image(0, 0, 'GameBG3').setOrigin(0, 0);
        this.backgroundw.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
        // MAIN MENU
        const mainMenuButton = this.add.image(210, 150, 'backButton');
        mainMenuButton.setOrigin(0.5);
        mainMenuButton.setScale(0.7);
        mainMenuButton.setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
            this.sound.stopAll();
        });
    }
}