import { Scene, Vector, Actor, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Froakie } from './froakie.js';
import { Gerrit } from './gerrit.js';
import { Goomba } from './goomba.js';
import { MrFish } from './mrfish.js';
import { Mushroom } from './mushroom.js';
import { Block } from './block.js';
import { Door } from './door.js';
import { Coin } from './coin.js';
import { Score } from './score.js';

const startX = -360;
const endX = 1454;
const yPosition = 780;

export class level1 extends Scene {
    constructor(engine) {
        super(engine);
        this.score = new Score(); // Initialiseer the score
    }

    onInitialize(engine) {
        this.startGame(engine);

        
        this.add(this.score);
    }

    startGame(engine) {
        console.log('start het game!');

        const background = new Actor({
            pos: new Vector(540, 360),
            width: Resources.Background.width,
            height: Resources.Background.height,
            collisionType: CollisionType.PreventCollision
        });
        background.graphics.use(Resources.Background.toSprite());
        this.add(background);
        this.scale = new Vector(0.2, 0.2);

        const gerrit = new Gerrit();
        this.add(gerrit);
        const mrFish = new MrFish();
        console.log('Mr. Fish instance:', mrFish);
        this.add(mrFish);
        
       
        const froggie = new Froakie(this.score);
        this.add(froggie);

        const blockWidth = Resources.Block.width * 0.08;

        for (let x = startX; x <= endX; x += blockWidth) {
            const block = new Block(x, yPosition);
            this.add(block);
        }

        this.spawnMushrooms();
        this.spawnGoombas();
        this.spawnCoins();

        const door = new Door(new Vector(1385, 634)); // Position door at the right side of the screen
        this.add(door);

        engine.currentScene.camera.strategy.lockToActor(gerrit);
    }

    spawnMushrooms() {
        const mushWidth = Resources.Mushroom.width * 5;
        for (let i = (startX + 470); i <= (endX - 295); i += mushWidth) {
            const platty = new Mushroom(i, yPosition - 170);
            this.add(platty);
            console.log("Mushroom added");
        }
    }

    spawnGoombas() {
        const horizontalGap = 1650; 
        for (let i = 0; i < 2; i++) {
            const goomba = new Goomba(this.score);
            goomba.pos = new Vector(startX + i * horizontalGap + Math.random() * 100, yPosition - 160); 
            goomba.vel = new Vector(-100, 0);
            this.add(goomba);
        }
    }
    spawnCoins() {
        // Voeg munten toe op willekeurige posities
        for (let i = 0; i < 5; i++) {
            const coinPos = new Vector(Math.random() * (endX - startX) + startX, Math.random() * (yPosition - 200));
            const coin = new Coin(coinPos);
            this.add(coin);
        }
    }
}





