class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.image('rocket', './assets/player.png');
        this.load.image('spaceship', './assets/enemy.png');
        this.load.image('newship', './assets/pickup.png');
        this.load.image('starfield', './assets/backgrnd.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create(){
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);        
        //green bar
        
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x262626).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width -game.config.width, game.config.height/2, 'rocket').setOrigin(0, 0);
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*5, 'spaceship', 0, -1, 2).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'spaceship', 0, -1, 1).setOrigin(0,0);
        this.ship05 = new Spaceship(this, game.config.width + borderUISize*5, borderUISize*9 + borderPadding*5, 'spaceship', 0, -1, 3).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*2 + borderPadding*2, 'spaceship', 0, -1 ,4).setOrigin(0,0);
        this.ship04 = new Newship(this, game.config.width + borderUISize*2, borderUISize*2 + borderPadding*2, 'newship', 0, 1).setOrigin(0,0);
        this.ship06 = new Newship(this, game.config.width + borderUISize*2, borderUISize*6  + borderPadding*6, 'newship', 0, 1).setOrigin(0,0);
        this.add.rectangle(0,400, game.config.width, borderUISize * 2, 0x6b6868).setOrigin(0,0);
        
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);0
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30
        });
        this.p1time = game.settings.gameTimer;
        this.p1Score = 5;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, 410, this.p1Score, scoreConfig);
          scoreConfig.fixedWidth = 0;
        }
    update(){
      if (this.p1Score <= 0){
        // this.scene.stop("playScene");
        this.scene.start('lossScene');
      }
        this.starfield.tilePositionX += 4;
        if (!this.gameOver) {
        this.p1Rocket.update();
        this.ship01.update();               // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
        this.ship05.update();
        this.ship06.update();
        }
        
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
    
            this.shipExplode(this.ship03);

          }
          if (this.checkCollision(this.p1Rocket, this.ship02)) {
    
            this.shipExplode(this.ship02);

          }
          if (this.checkCollision(this.p1Rocket, this.ship01)) {
    
            this.shipExplode(this.ship01);

          }
        if (this.checkCollision(this.p1Rocket, this.ship04)) {
    
            this.shipExplode(this.ship04);
        }
        if (this.checkCollision(this.p1Rocket, this.ship05)) {
  
          this.shipExplode(this.ship05);
      }
      if (this.checkCollision(this.p1Rocket, this.ship06)) {

        this.shipExplode(this.ship06);
    }

       
    }
    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        ship.reset();
        ship.alpha = 1;            // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes                         
          boom.destroy();                       // remove explosion sprite
        });   
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;       
        this.sound.play('sfx_explosion');       
        

    }
  }
