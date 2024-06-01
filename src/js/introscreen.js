import { Scene, Actor, Vector, Input, Color } from 'excalibur';
import { Resources } from './resources.js';

export class IntroScreen extends Scene {
    onInitialize(engine) {
        const introActor = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        introActor.graphics.add(Resources.introScreen.toSprite());
        this.add(introActor);

        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === Input.Keys.Enter || evt.key === Input.Keys.Space) {
                engine.goToScene('level1');
            }
        });
    }
}
