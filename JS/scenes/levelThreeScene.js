export default class levelThreeScene extends Phaser.Scene {
    constructor() {
        super("levelThreeScene");
    }

    init(data){
        this.hearts = data.hearts;
        this.score = data.score;
        this.coin  = data.coin;
    }

    preload() {    
        //AUDIO, TILED AND IMAGE
        this.load.image('tiles3', './Assets/Levels/Level 3/Tileset Dungeon 2.png');
        this.load.tilemapTiledJSON('map3', './Assets/Levels/Level 3/LevelThree.json');  
        this.load.spritesheet('player', './Assets/Character/Walking.png', {  frameWidth: 29 , frameHeight: 44});
        this.load.spritesheet('idle', './Assets/Character/idle.png', {  frameWidth: 29 , frameHeight: 44});
        this.load.bitmapFont('font', './Assets/fonts/thick_8x8.png', './Assets/fonts/thick_8x8.xml');
        this.load.spritesheet('coins', './Assets/Character/coin.png', {  frameWidth: 16 , frameHeight: 16});
        this.load.audio('pick', './Assets/Audio/SFX/coinPickUp.mp3');
        this.load.audio('die', './Assets/Audio/Death.wav');
        this.load.audio('levelThreeBGM', './Assets/Audio/BGMusic/lvlThreeBG.mp3'); 
        this.load.image('background', './Assets/background/levelThreeBG.png');      
    }   

    create() {

        
        // Set the world bounds to match the size of the tile map
        this.physics.world.setBounds(0, 0, 1840, 850);
        this.cameras.main.setBounds(0, 0, 1840, 850);
        
        this.GameBG1 = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.GameBG1.setScale(6);
        this.GameBG1.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // Creating Tilemap
        const map = this.make.tilemap({ key: "map3" });
        const tileset = map.addTilesetImage("TilesetDungeon", 'tiles3');
        const background = map.createLayer('Background', tileset, 0, 0);
        const FBground = map.createLayer('FBground', tileset, 0, 0);
        this.Spike = map.createLayer('Traps', tileset, 0, 0);
        const end = map.createLayer('End', tileset, 0, 0);
        const foreground = map.createLayer('Foreground', tileset, 0, 0);

        // Create the player sprite and enable physics
            this.player = this.physics.add.sprite(1700, 100, 'player');
            this.player.setBounce(0.2);
            this.player.setCollideWorldBounds(true);
            this.player.setScale(0.6);

        // //Background Music
        // this.gameBG = this.sound.add('gameBG', { volume: 0.9, loop: true });
        // this.gameBG.play();


        //Audio
        this.BGM = this.sound.add('levelThreeBGM', { loop: true, volume: 0.6});
        this.BGM.play();

        this.pick = this.sound.add('pick', { volume: 3});
        this.die = this.sound.add('die', { volume: 3});
        

        //Coin
        this.creatingCoin(410, 690);
        this.creatingCoin(1080, 120);
        this.creatingCoin(1700, 395);
        this.creatingCoin(1300, 395);
        this.creatingCoin(420, 345);
        this.creatingCoin(670, 345);
        this.creatingCoin(775, 120);
        this.creatingCoin(1155, 690);
        this.creatingCoin(1575, 690);


        //Collision
        foreground.setCollisionByExclusion([-1]);
        this.Spike.setCollisionByExclusion([-1]);
        end.setCollisionByExclusion([-1]);


        // Enable collision between the player and the tilemap layer
        this.physics.add.collider(this.player, foreground);
        this.colliderSpikes = this.physics.add.collider(this.player, this.Spike, this.playerDied, null, this);
        this.physics.add.collider(this.player, end, this.Win, null, this);
    
        // Animations for the player
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 4 }),
            frameRate: 15,
            repeat: -1
        });
    
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'idle', frame: 0 }],
            frameRate: 5
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Make the camera follow the player
        this.cameras.main.startFollow(this.player);

        // Set initial zoom level (e.g., 2x zoom)
        this.cameras.main.setZoom(3);

        //Movement event trigger
        this.allowMovement = true;

        this.heartstext = this.add.bitmapText(1130, 290, 'font', 'Hearts: ' + this.hearts , 9).setScrollFactor(0).setOrigin(0, 0);

        this.scoreText = this.add.bitmapText(1130, 300, 'font', 'Score: ' + this.score, 9).setScrollFactor(0).setOrigin(0, 0);

        this.coinsText = this.add.bitmapText(1130, 310, 'font', 'Coins: ' + this.coin, 9).setScrollFactor(0).setOrigin(0, 0);

    }

    update() {
        if (this.allowMovement) {
            if (this.cursors.left.isDown) {
                this.player.setVelocityX(-200);
                this.player.anims.play('walk', true);
                this.player.flipX = true;
            } else if (this.cursors.right.isDown) {
                this.player.setVelocityX(200);
                this.player.anims.play('walk', true);
                this.player.flipX = false;
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play('idle');
            }
            if (this.cursors.up.isDown && this.player.body.blocked.down) {
                this.player.setVelocityY(-380);
            }
        }
    }


        playerDied(player, tile) {
            this.hearts--;
            this.heartstext.setText('Hearts: 0' + this.hearts);

            if(this.hearts <= 0){
                this.BGM.stop();
                this.scene.start('GameOverSceneThree', { score: this.score, coin: this.coin });

            }else{
                //Disable collision n movement
                this.allowMovement = false;
                this.physics.world.removeCollider(this.colliderWater);
                this.physics.world.removeCollider(this.colliderSpikes);

                this.die.play();

                this.tweens.add({
                    targets: this.player,
                    alpha: 0,
                    duration: 250,
                    onComplete: () => {
                        this.player.setPosition(1700, 100);
                        this.tweens.add({
                            targets: this.player,
                            alpha: 1,
                            duration: 250,
                            onComplete: () => {
                                //Enable collision n movement
                                this.time.delayedCall(250, () => {
                                    this.allowMovement = true;
                                    this.colliderSpikes = this.physics.add.collider(this.player, this.Spike, this.playerDied, null, this);
                                });
                            }
                        });
                    }
                });
            }
        }

    creatingCoin(x, y){
    const coin = this.physics.add.staticSprite(x, y, 'coins');

    this.anims.create({
        key: 'spin',
        frames: this.anims.generateFrameNumbers('coins', { start: 0, end: 6 }),
        frameRate: 8,
        repeat: -1
    });

    coin.anims.play('spin');

    this.physics.add.overlap(this.player, coin, this.collectingCoins, null, this);
    }

    collectingCoins(player, coin) {
        coin.disableBody(true, true);
        this.pick.play();
        //Scoring
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
        this.coin += 1;
        this.coinsText.setText('Coins: 0' + this.coin);       
    }

    Win(){
        this.BGM.stop();
        this.scene.start('winningThreeScene', {score: this.score, coin: this.coin });
    }
}