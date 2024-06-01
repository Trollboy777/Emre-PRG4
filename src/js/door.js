// import { Actor, Vector, CollisionType } from 'excalibur';
// import { Resources } from './resources.js';
// import { Gerrit } from './gerrit.js';
// import { EndScreen } from './endscreen.js';

// export class Door extends Actor {
//     constructor(position) {
//         super({
//             pos: position,
//             width: Resources.Door.width / 2,
//             height: Resources.Door.height,
//             collisionType: CollisionType.Fixed
//         });

//         this.graphics.use(Resources.Door.toSprite());
//     }

//     onInitialize(engine) {
//         this.on('collisionstart', (event) => this.hitSomething(event));
//     }

//     hitSomething(event, engine) {
//         const other = event.other;
//         if (other instanceof Gerrit && other.hasKey) {
//             console.log("Level completed!");
//             // Add logic to move to next level or end game
//             engine.goToScene('endscreen');
//         }
//     }
// }
// In door.js

import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources.js';
import { Gerrit } from './gerrit.js';
import { EndScreen } from './endscreen.js';

export class Door extends Actor {
    constructor(position) {
        super({
            pos: position,
            width: Resources.Door.width / 2,
            height: Resources.Door.height,
            collisionType: CollisionType.Fixed
        });

        this.graphics.use(Resources.Door.toSprite());
        
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event, engine)); // Pass 'engine' reference
    }

    hitSomething(event, engine) { // Accept 'engine' reference as parameter
        const other = event.other;
        if (other instanceof Gerrit && other.hasKey) {
            console.log("Level completed!");
            // Add logic to move to next level or end game
            engine.goToScene('EndScreen');
            
        }
    }
}


