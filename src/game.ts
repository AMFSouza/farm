// Phaser version 3.60.0
import * as Phaser from 'phaser';
import AnimalSelector from './animal';

export default class Farm extends Phaser.Scene
{
    private rightArrow: Phaser.GameObjects.Sprite;
    private leftArrow: Phaser.GameObjects.Sprite;
    private currentAnimal: Phaser.GameObjects.Sprite;
    private animals: Phaser.GameObjects.Group;
    constructor ()
    {
        super('farm');
    }

    preload ()
    {
        this.load.image('background', 'assets/images/background.png');
        // this.load.image('chicken', 'assets/images/chicken.png');
        // this.load.image('horse', 'assets/images/horse.png');
        // this.load.image('pig', 'assets/images/pig.png');
        // this.load.image('sheep', 'assets/images/sheep.png');
        this.load.image('rightArrow', 'assets/images/arrow.png');
        this.load.image('leftArrow', 'assets/images/arrow.png');
        this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', {frameWidth:131, frameHeight:200});
        this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', {frameWidth:212, frameHeight:200});
        this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', {frameWidth:297, frameHeight:200});
        this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', {frameWidth:244, frameHeight:200});

    }

    create ()
    {

        let animalData = [
            {key: 'chicken', text:'CHICKEN'},
            {key: 'horse', text: 'HORSE'},
            {key: 'pig', text: 'PIG'},
            {key: 'sheep', text: 'SHEEP'},

        ];

        this.scale.scaleMode = Phaser.Scale.FIT;
        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

        this.animals = this.add.group();
        animalData.forEach((animal) => {
            let sprite = this.animals.create(-1000, 200, animal.key);
            sprite.getData(animal.text);
            sprite.setOrigin(0.5);
            sprite.setInteractive();
            sprite.setScale(0.6);
            sprite.input.customHitArea = true;

            // create animal animal animation
            sprite.anims.create({
                key: 'animate',
                frames: this.anims.generateFrameNumbers(animal.key, {start: 0, end: 2}),
                frameRate: 10,
                repeat: -1
            });

            sprite.on('pointerdown', this.onAnimateAnimal.bind(this));
            this.animals.add(sprite);
        });
        
        this.currentAnimal = this.getAnimal(0);
        this.rightArrow = this.add.sprite(580, 200, 'rightArrow');
        this.rightArrow.name = 'rightArrow';
        this.rightArrow.setInteractive();
        this.rightArrow.input.customHitArea = true;
//        this.rightArrow.setData('direction', 'right')
        this.rightArrow.on('pointerdown', this.onSwitchAnimal.bind(this));

        // this.rightArrow.on('pointerdown', 
        // () => {
        //     this.animalIndexSelected++;
        //     endX = 640 + this.currentAnimal.width/2;
        //     });
        this.leftArrow = this.add.sprite(60, 200, 'leftArrow');
        this.leftArrow.setScale(-1, 1);
        this.leftArrow.name = 'leftArrow';
        this.leftArrow.setInteractive();
        this.leftArrow.input.customHitArea = true;
//        this.leftArrow.setData('direction', 'left');
        this.leftArrow.on('pointerdown', this.onSwitchAnimal.bind(this));
        // this.leftArrow.on('pointerdown',
        // () => {
        //     this.animalIndexSelected--;
        //     endX = -this.currentAnimal.width/2;
        //     });
        // this.currentAnimal.setX(endX);
    }

    onSwitchAnimal(sprite: Phaser.GameObjects.Sprite, event: Event) {

        this.currentAnimal.visible = false;
        let isRightDirection = sprite.x > 500;
        let index = AnimalSelector.getNextAnimal(AnimalSelector.animalSelected, isRightDirection); 
        this.currentAnimal = this.getAnimal(index) as Phaser.GameObjects.Sprite;
        this.currentAnimal.x = (this.rightArrow.x - this.leftArrow.x)/2;

        const animalMovement = this.tweens.add({
            targets: this.currentAnimal,
            x: 400,
            duration: 1000
        });

        this.currentAnimal.visible = true;
    }

    onAnimateAnimal(sprite: Phaser.GameObjects.Sprite, event: Event) {
        const newAnimal = this.getAnimal(AnimalSelector.animalSelected);
        newAnimal.anims.play('animate');
    }

    getAnimal(index: number): Phaser.GameObjects.Sprite {
        return this.animals.children.getArray()[index] as Phaser.GameObjects.Sprite;

    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Farm
};

const game = new Phaser.Game(config);
