// import { Actor, Vector, Input, Color, CollisionType, clamp } from 'excalibur';
// import { Resources } from './resources.js';
// import { Goomba } from './goomba.js';


// export class Gerrit extends Actor {
//     constructor() {
//         super({
//             pos: new Vector(420, 250),
//             width: Resources.Fish.width,
//             height: Resources.Fish.height,
//             collisionType: CollisionType.Active,
//             // mass: 1, // mass for physics
//             // friction: 0.99, // friction to reduce sliding
//             // bounciness: 0.2 // bounciness for collision response
            
//         });

//         this.graphics.use(Resources.Fish.toSprite());
//         this.scale = new Vector(0.6, 0.6)
//         this.isJumping = false;
         
//     }

//     onInitialize(engine) {
//         this.on('collisionstart', (event) => this.hitSomething(event));
//     }

//     hitSomething(event) {
//         if (event.other instanceof Goomba) {
//             console.log('Gerrit is geraakt door een Goomba!');
//             this.kill();
            
//         }
//         // else if (event.other.collisionType === CollisionType.Fixed) {
//         //     this.isJumping = false;

//         // }
//     }

//     onPreUpdate(engine, delta) {
        
//         let xspeed = 0;
//         let yspeed = this.vel.y;

//         if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
//             xspeed = -100;
//         }
//         if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
//             xspeed = 100;
//         }
//         if (!this.isJumping && (engine.input.keyboard.wasPressed(Input.Keys.Up))) {
//             yspeed = -500; // Verander dit naar de gewenste springkracht
//             this.isJumping = true;
//             console.log("I am jumping!")
//         }
//         if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
//             yspeed = 100;
//         }

//         this.vel = new Vector(xspeed, yspeed);
//         this.isJumping = false;

        
//         if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
//             this.shootFireball(engine);
//         }
//         this.pos.x = clamp(this.pos.x, -300, 1600 - this.width);
//         this.pos.y = clamp(this.pos.y, -50, 975 - this.height);
        
        
//     }
    

//     shootFireball(engine) {
//         const fireball = new Fireball(this.pos.clone().add(new Vector(50, 0)));
//         engine.add(fireball);
//     }
// }

// export class Fireball extends Actor {
//     constructor(position) {
//         super({
//             pos: position,
//             width: 20,
//             height: 20,
//             color: Color.Red,
//             collisionType: CollisionType.Passive
//         });

//         this.vel = new Vector(300, 0);
//     }

//     onInitialize(engine) {
//         this.on('collisionstart', (event) => this.hitSomething(event));
//     }

//     hitSomething(event) {
//         if (event.other instanceof Goomba) {
//             console.log('Goomba is geraakt door een vuurbal!');
//             event.other.kill(); 
//             this.kill(); 
//         }
//     }
//     onPreUpdate(engine) {
//         if (this.pos.x < -290 || this.pos.x > 1510 ||this.pos.y < -50 || this.pos.y > 975) {
//             this.kill();

//         }
//     }
// }
import { Actor, Vector, Input, Color, CollisionType, clamp } from 'excalibur';
import { Resources } from './resources.js';
import { Goomba } from './goomba.js';
import { Key } from './key.js';

export class Gerrit extends Actor {
    constructor() {
        super({
            pos: new Vector(420, 250),
            width: Resources.Fish.width,
            height: Resources.Fish.height,
            collisionType: CollisionType.Active,
        });

        this.graphics.use(Resources.Fish.toSprite());
        this.scale = new Vector(0.6, 0.6);
        this.isJumping = false;
        this.hasKey = false;
        this.key = null; 
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Goomba) {
            console.log('Gerrit got hit by a Goomba!');
            this.kill();
            
        }
        if (event.other instanceof Key) {
            console.log('Gerrit picked up a key!');
            this.hasKey = true;
            this.key = event.other;
            this.addChild(this.key); 
            this.key.pos = new Vector(0, -this.height / 2); 
        }
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = this.vel.y;

        if (engine.input.keyboard.isHeld(Input.Keys.Left)) {
            xspeed = -100;
        }
        if (engine.input.keyboard.isHeld(Input.Keys.Right)) {
            xspeed = 100;
        }
        if (!this.isJumping && (engine.input.keyboard.wasPressed(Input.Keys.Up))) {
            yspeed = -500; 
            this.isJumping = true;
            console.log("I am jumping!");
        }
        if (engine.input.keyboard.isHeld(Input.Keys.Down)) {
            yspeed = 100;
        }

        this.vel = new Vector(xspeed, yspeed);
        this.isJumping = false;

        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            this.shootFireball(engine);
        }
        this.pos.x = clamp(this.pos.x, -300, 1600 - this.width);
        this.pos.y = clamp(this.pos.y, -50, 975 - this.height);
    }

    shootFireball(engine) {
        const fireball = new Fireball(this.pos.clone().add(new Vector(50, 0)), engine.currentScene.score);
        engine.add(fireball);
    }
}

export class Fireball extends Actor {
    constructor(position, score) {
        super({
            pos: position,
            width: 20,
            height: 20,
            color: Color.Red,
            collisionType: CollisionType.Passive
        });

        this.vel = new Vector(300, 0);
        this.score = score
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        if (event.other instanceof Goomba) {
            console.log('Goomba got hit by a fireball!');
            event.other.kill();
            this.kill();
            this.score.updateScoreGoomba();
        }
    }

    onPreUpdate(engine) {
        if (this.pos.x < -290 || this.pos.x > 1510 || this.pos.y < -50 || this.pos.y > 975) {
            this.kill();
        }
    }
}


