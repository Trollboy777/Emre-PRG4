
import { Actor, CollisionType, Vector, Color, Shape } from 'excalibur';
import { Resources } from './resources.js';
import { Gerrit } from './gerrit.js';
import { Goomba } from './goomba.js';
import { Fireball } from './gerrit.js';
import { Key } from './key.js';
import { Score } from './score.js';
import { Game } from './game.js';

export class Froakie extends Actor {
    constructor(score) {
        super({
            pos: new Vector(900, 200),
            width: Resources.Froakie.width / 4,
            height: Resources.Froakie.height / 4,
            collisionType: CollisionType.Active
        });
        this.graphics.use(Resources.Froakie.toSprite());
        this.scale = new Vector(2.8, 2.8);
        this.vel = new Vector(-150, 0);
        this.hitPoints = 3;
        this.timeSinceLastShot = 0; // Timer voor projectielen
        this.timeSinceLastJump = 0; // Timer voor springen
        this.score = score
    }

    onInitialize(engine) {
        // Verklein de collision box
        const customHitbox = Shape.Box(this.width * 0.5, this.height * 0.5); // Pas de schaal naar wens aan
        this.collider.set(customHitbox);

        this.on('collisionstart', (event) => this.hitSomething(event));
    }

    hitSomething(event) {
        const otherActor = event.other;
        const MIN_SPEED = 50; // Minimale snelheid

        if (otherActor instanceof Goomba) {
            console.log('Botsing gedetecteerd tussen Froakie en Goomba');

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

            // Duw Froakie en de Goomba iets uit elkaar om te voorkomen dat ze onmiddellijk weer botsen
            const overlap = 5; // Hoeveelheid verschuiving
            const pushVector = this.pos.sub(otherActor.pos).normalize().scale(overlap);
            this.pos = this.pos.add(pushVector);
            otherActor.pos = otherActor.pos.sub(pushVector);

            console.log(`Nieuwe snelheid van Froakie: (${this.vel.x}, ${this.vel.y})`);
            console.log(`Nieuwe snelheid van Goomba: (${otherActor.vel.x}, ${otherActor.vel.y})`);
        }

        if (otherActor instanceof Gerrit) {
            console.log('Gerrit is geraakt door Froakie!');
            otherActor.kill();
        }

        if (otherActor instanceof Fireball) {
            console.log('Froakie is geraakt door een vuurbal!');
            this.hitPoints -= 1;
            otherActor.kill();
            if (this.hitPoints <= 0) {
                this.kill();
                this.score.updateScoreFroakie();
                this.dropKey();
            }
        }
    }
    dropKey() {
        const key = new Key(this.pos.clone());
        this.scene.add(key);
    }

    onPreUpdate(engine, delta) {
        // Als Froakie buiten de grenzen komt, keer dan de snelheid om
        if (this.pos.x < -340 || this.pos.x > 1450 || this.pos.y < -50 || this.pos.y > 975) {
            this.vel.x *= -1;
            this.vel.y *= -1;  // Vergeet niet de y-snelheid om te keren zoals eerder gedaan
        }

        // Projectielen schieten elke seconde
        this.timeSinceLastShot += delta;
        if (this.timeSinceLastShot > 1000) { // 1000 ms = 1 seconde
            this.shootProjectile(engine);
            this.timeSinceLastShot = 0;
        }

        // Springen om de 5 seconden
        this.timeSinceLastJump += delta;
        if (this.timeSinceLastJump > 5000) { // 5000 ms = 5 seconden
            this.jump();
            this.timeSinceLastJump = 0;
        }
    }

    jump() {
        const JUMP_VELOCITY = -800; // Aanpassen naar wens
        this.vel.y = JUMP_VELOCITY;
        console.log('Froakie springt!');
    }

    shootProjectile(engine) {
        const projectile = new Projectile(this.pos.clone().add(new Vector(50, 0)));
        engine.add(projectile);
    }
}

class Projectile extends Actor {
    constructor(position) {
        super({
            pos: position,
            width: 20,
            height: 20,
            color: Color.Blue,
            collisionType: CollisionType.Passive
        });

        this.vel = new Vector(300, 0);
    }

    onInitialize(engine) {
        this.on('collisionstart', (event) => this.hitSomething(event));
    }
    

    hitSomething(event) {
        if (event.other instanceof Gerrit) {
            console.log('Gerrit is geraakt door een projectile!');
            event.other.kill();
            this.kill();
        } else if (event.other instanceof Goomba) {
            this.kill();
        }
    }

    onPreUpdate(engine) {
        if (this.pos.x < -290 || this.pos.x > 1510 || this.pos.y < -50 || this.pos.y > 975) {
            this.kill();
        }
    }
}

    
