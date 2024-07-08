export default class GameBootScene extends Phaser.Scene {
    constructor() {
        super('GameBootScene');
    }

    preload() {
    }

    create() {

        
        this.cameras.main.setBackgroundColor('#a2d2ff');

        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        
        // Loading text
        this.loadingText = this.add.bitmapText(centerX, centerY + 100, 'font', 'Getting some bread....', 40).setOrigin(0.5, 0.5);

        //Fun fact
        const funFactText = this.add.bitmapText(centerX, centerY + 220, 'font', '', 20).setOrigin(0.5, 0.5);

        //Next scene
        this.time.delayedCall(4000, () => {
            this.scene.start('gameScene');
        });
    }
}