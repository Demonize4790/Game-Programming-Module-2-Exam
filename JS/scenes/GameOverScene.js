export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("GameOverScene");
    }

    init(data){
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {
        // Load assets like background image, buttons, and audio
        this.load.image('gameoverbackground', './assets/background/losingScene.png');
        this.load.image('restartButton', './Assets/Buttons/retryBtn.png');
        this.load.image('mainMenuButton', './Assets/Buttons/menuBtn.png');
        
        //Load Audio
        this.load.audio('gameoverSound', './assets/audio/BGMusic/Game Over.ogg');
        this.load.audio('sound', './assets/audio/sound-effect/menu.wav');
    }
    
    create() {

        this.background = this.add.image(0, 0, 'gameoverbackground').setOrigin(0, 0);
        this.background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        
    
        // Display score
        this.add.bitmapText(350, 200, 'font', 'Total Score: ' + this.score, 25).setOrigin(0.5, 0.5);
        this.add.bitmapText(300, 230, 'font', 'Coins: ' + this.coin, 25).setOrigin(0.5, 0.5);

    // RESTART
        const restartButton = this.add.image(400, 300, 'restartButton');
        restartButton.setOrigin(0.5);
        restartButton.setScale(0.5);
        restartButton.setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.start('gameScene');
            this.sound.stopAll();
        });

        restartButton.on('pointerover', () => {
            this.tweens.add({
                targets: restartButton,
                scale: 0.6,
                duration: 200,
                ease: 'Power2'
            });
            this.sound.play('sound');
            document.body.style.cursor = 'pointer';
        });

        restartButton.on('pointerout', () => {
            this.tweens.add({
                targets: restartButton,
                scale: 0.5,
                duration: 200,
                ease: 'Power2'
            });
            document.body.style.cursor = 'default';
        });

    // MAIN MENU
        const mainMenuButton = this.add.image(200, 300, 'mainMenuButton');
        mainMenuButton.setOrigin(0.5);
        mainMenuButton.setScale(0.5);
        mainMenuButton.setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
            this.sound.stopAll();
        });

        mainMenuButton.on('pointerover', () => {
            this.tweens.add({
                targets: mainMenuButton,
                scale: 0.6,
                duration: 200,
                ease: 'Power2'
            });
            this.sound.play('sound');
            document.body.style.cursor = 'pointer';
        });

        mainMenuButton.on('pointerout', () => {
            this.tweens.add({
                targets: mainMenuButton,
                scale: 0.5,
                duration: 200,
                ease: 'Power2'
            });
            document.body.style.cursor = 'default';
        });


        // Play game over sound
        const gameoverSound = this.sound.add('gameoverSound', { volume: 1});
        gameoverSound.play();
    }
}