import { Actor, CollisionType, Vector, Shape} from 'excalibur';
import { Resources } from './resources.js';

export class Mushroom extends Actor {
    constructor(x,y){
        super({
            pos: new Vector(x,y),
            width: Resources.Mushroom.width,
            height: Resources.Mushroom.height,
            collisionType: CollisionType.Fixed
        });

        this.graphics.use(Resources.Mushroom.toSprite());
        this.scale = new Vector(1.5, 1.5)

        
    }
    onInitialize(engine) {
        const customHitbox = Shape.Box(this.width / 2, this.height / 4, Vector.Zero, new Vector(-this.width / 4, -this.height / 2.8));
        this.collider.set(customHitbox)

    }
}