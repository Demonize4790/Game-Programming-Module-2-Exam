export default class winningScene extends Phaser.Scene {
    constructor() {
        super("winningScene");
    }

    init(data){
        this.hearts = data.hearts;
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {
        //IMAGES
        this.load.image('nextButton', './Assets/Buttons/nextBtn.png');
        this.load.image('mainMenuButton', './Assets/Buttons/menuBtn.png');
        this.load.image('GameBG2', './Assets/Background/winingScene1.png');
    }
    
    create() {

        this.backgroundw = this.add.image(0, 0, 'GameBG2').setOrigin(0, 0);
        this.backgroundw.setDisplaySize(this.cameras.main.width, this.cameras.main.height);
        

        //SCORE
        const scoreText = this.add.bitmapText(this.sys.game.config.width / 2, 290, 'font', 'Score: ' + this.score, 25)
            .setOrigin(0.5, 0.5)
            .setTint(0x000000); 

        const coinText = this.add.bitmapText(this.sys.game.config.width / 2, 340, 'font', 'Coin Collected: ' + this.coin, 25)
            .setOrigin(0.5, 0.5)
            .setTint(0x000000); 



       // Next
        const nextButton = this.add.image(1050, 450, 'nextButton');
        nextButton.setOrigin(0.5);
        nextButton.setScale(0.7);
        nextButton.setInteractive();

        nextButton.on('pointerdown', () => {
            this.scene.start('levelTwoScene', { hearts: this.hearts, score: this.score, coin: this.coin });
        });

        // MAIN MENU
        const mainMenuButton = this.add.image(800, 450, 'mainMenuButton');
        mainMenuButton.setOrigin(0.5);
        mainMenuButton.setScale(0.7);
        mainMenuButton.setInteractive();

        mainMenuButton.on('pointerdown', () => {
            this.scene.start('MainMenuScene');
        });
    }
}