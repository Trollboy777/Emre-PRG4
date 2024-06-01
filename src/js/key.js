import { Actor, Vector, CollisionType, Color } from 'excalibur';
import { Resources } from './resources.js';
import { Gerrit } from './gerrit.js';

export class Key extends Actor {
    constructor(position) {
        super({
            pos: position,
            width: Resources.Key.width,
            height: Resources.Key.height,
            collisionType: CollisionType.Passive
        });

        this.graphics.use(Resources.Key.toSprite());
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        const other = event.other;
        if (other instanceof Gerrit) {
            other.hasKey = true;
            // this.kill();
        }
    }
}
