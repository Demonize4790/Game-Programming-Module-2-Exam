export default class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        //load all assets
        this.load.bitmapFont('font', './assets/fonts/thick_8x8.png', '../assets/fonts/thick_8x8.xml');
    }

    create() {
        this.cameras.main.setBackgroundColor('#54aeff');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        // Loading text
        this.loadingText = this.add.bitmapText(centerX, centerY +0, 'font', 'LOADING..........', 40).setOrigin(0.5, 0.5);


    // Removing progress bar after load
        this.load.on('complete', () => {
        this.loadingText.destroy();
        });

    // Click start for bypassing audio bug
        this.time.delayedCall(1000, () => {
        // Destroy loading elements when "Click to Start" appears
        this.loadingText.destroy();

        const startText = this.add.bitmapText(centerX, centerY + 0, 'font', 'Preparing Food for Grandma', 35).setOrigin(0.5, 0.5);

        this.input.once('pointerdown', () => {
        this.scene.start('MainMenuScene');
        });
    });
    }
}