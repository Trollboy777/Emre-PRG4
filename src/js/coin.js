import { Actor, Animation, SpriteSheet, CollisionType, Vector } from 'excalibur';
import { Resources } from './resources.js';
import { Gerrit } from './gerrit.js';

export class Coin extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 200,  // Breedte van één sprite
            height: 200, // Hoogte van één sprite
            collisionType: CollisionType.Passive,
        });

        const coinSheet = SpriteSheet.fromImageSource({
            image: Resources.coins,
            grid: {
                rows: 3,       // Aantal rijen
                columns: 6,    // Aantal kolommen
                spriteWidth: 200,  // Breedte van één sprite
                spriteHeight: 200, // Hoogte van één sprite
            },
        });

        const coinAnimation = Animation.fromSpriteSheet(coinSheet, [0, 1, 2, 3, 4, 5], 100);

        this.graphics.add('rotate', coinAnimation);
        this.graphics.use('rotate');

        this.scale = new Vector(0.5, 0.5);
    }

    onInitialize(engine) {
        this.engine = engine; // Sla de engine instantie op als een eigenschap
        this.on('collisionstart', (event) => this.collect(event));
    }

    collect(event) {
        const otherActor = event.other;
        if (otherActor instanceof Gerrit) {
            console.log('Gerrit collected a coin!');
            this.kill();
            this.engine.currentScene.score.updateScoreCoin();
        }
    }
}
