import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';

export class MrFish extends Actor {
    constructor() {
        super({
            pos: new Vector(600, 360), 
            width: Resources.MrFish.width,
            height: Resources.MrFish.height,
            collisionType: CollisionType.PreventCollision
        });

        this.graphics.use(Resources.MrFish.toSprite());
        this.scale = new Vector(0.7, 0.7)
        console.log('Mr. Fish actor gecreëerd:', this);
    }
    onInitialize(engine) {
        console.log('Mr. Fish is toegevoegd aan de game op positie:', MrFish.pos);
    }
}