// import { Actor, CollisionType } from 'excalibur';
// import { Resources } from './resources.js';

// export class Goomba extends Actor {
//     constructor() {
//         super({
//             width: Resources.Mario.width,
//             height: Resources.Mario.height,
//             collisionType: CollisionType.Active
//         });

//         this.graphics.use(Resources.Mario.toSprite());
        
//     }
//     onPreUpdate(engine, delta) {
//         if (this.pos.x < -340 || this.pos.x > 1450 ||this.pos.y < -50 || this.pos.y > 975) {
//             this.vel.x = -this.vel.x;
//             this.vel.y = -this.vel.y;

//         }

//     }
// }
import { Actor, CollisionType, Vector } from 'excalibur';
import { Resources } from './resources.js';

export class Goomba extends Actor {
    constructor() {
        super({
            pos: new Vector(0, 0),
            width: Resources.Mario.width,
            height: Resources.Mario.height,
            collisionType: CollisionType.Active
        });

        this.graphics.use(Resources.Mario.toSprite());
        this.vel = new Vector(-100, 0); // Start snelheid naar links
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        const otherActor = event.other;
        const MIN_SPEED = 50; // Minimale snelheid

        if (otherActor instanceof Goomba) {
            console.log('Botsing gedetecteerd tussen Goomba\'s');

            // Omkeren van de snelheid, maar zorg ervoor dat deze niet nul wordt
            if (this.vel.x === 0) {
                this.vel.x = MIN_SPEED * (Math.random() < 0.5 ? 1 : -1);
            } else {
                this.vel.x = -this.vel.x;
            }
            if (this.vel.y === 0) {
                this.vel.y = MIN_SPEED * (Math.random() < 0.5 ? 1 : -1);
            } else {
                this.vel.y = -this.vel.y;
            }

            if (otherActor.vel.x === 0) {
                otherActor.vel.x = MIN_SPEED * (Math.random() < 0.5 ? 1 : -1);
            } else {
                otherActor.vel.x = -otherActor.vel.x;
            }
            if (otherActor.vel.y === 0) {
                otherActor.vel.y = MIN_SPEED * (Math.random() < 0.5 ? 1 : -1);
            } else {
                otherActor.vel.y = -otherActor.vel.y;
            }

            // Voeg een willekeurig element toe aan de snelheid om constante botsingen te voorkomen
            this.vel.x += (Math.random() - 0.5) * 10;
            this.vel.y += (Math.random() - 0.5) * 10;
            otherActor.vel.x += (Math.random() - 0.5) * 10;
            otherActor.vel.y += (Math.random() - 0.5) * 10;

            // Duw de Goomba's iets uit elkaar om te voorkomen dat ze onmiddellijk weer botsen
            const overlap = 5; // Hoeveelheid verschuiving
            const pushVector = this.pos.sub(otherActor.pos).normalize().scale(overlap);
            this.pos = this.pos.add(pushVector);
            otherActor.pos = otherActor.pos.sub(pushVector);

            console.log(`Nieuwe snelheid van Goomba 1: (${this.vel.x}, ${this.vel.y})`);
            console.log(`Nieuwe snelheid van Goomba 2: (${otherActor.vel.x}, ${otherActor.vel.y})`);
        }
    }

    onPreUpdate(engine, delta) {
        if (this.pos.x < -340 || this.pos.x > 1450 || this.pos.y < -50 || this.pos.y > 975) {
            this.vel.x = -this.vel.x;
            this.vel.y = -this.vel.y;
        }
    }
}





