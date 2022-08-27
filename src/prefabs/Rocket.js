//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y,texture,frame){
        super(scene,x,y,texture,frame);
        this.sfxRocket = scene.sound.add('sfx_rocket');
    //add object to existing scene
    scene.add.existing(this);
    this.isFiring = true;
    this.moveSpeed = game.settings.playerSpeed;
    }
    update(){
            if(keyUP.isDown && this.y >= borderUISize +this.width/10){
                this.y -= this.moveSpeed;
            }
            else if (keyDOWN.isDown &&this.y <= game.config.width - borderUISize - this.width){
                this.y += this.moveSpeed;
            }
    
        }
    }