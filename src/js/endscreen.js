// In endscreen.js

import { Scene, Actor, Vector, Input, Color } from 'excalibur';
import { Resources } from './resources.js';

export class EndScreen extends Scene {
    onInitialize(engine) {
        const endActor = new Actor({
            pos: new Vector(640, 360),
            width: 1280,
            height: 720
        });
        endActor.graphics.add(Resources.endScreen.toSprite());
        this.add(endActor);

        this.on('press', (evt) => {
            if (evt.button === Input.PointerButton.Left || evt.button === Input.PointerButton.Right) {
                engine.goToScene('intro');
            }
        });
    }
}
