import { Actor, CollisionType, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Block extends Actor {
    constructor(x,y){
        super({
            pos: new Vector(x,y),
            width: Resources.Block.width,
            height: Resources.Block.height,
            collisionType: CollisionType.Fixed
        });

        this.graphics.use(Resources.Block.toSprite());
        this.scale = new Vector(0.09, 0.09);
    }
}