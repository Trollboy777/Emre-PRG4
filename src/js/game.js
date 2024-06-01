
import '../css/style.css';
import { Engine, Vector, SolverStrategy, Label, Color, FontUnit, Font } from 'excalibur';
import { Resources, ResourceLoader } from './resources.js';
import { IntroScreen } from './introscreen.js';
import { level1 } from './level1.js';
import { EndScreen } from './endscreen.js';

const options = { 
    width: 1280, 
    height: 720, 
    physics: {
        solver: SolverStrategy.Arcade,
        gravity: new Vector(0, 800),
    }
}

export class Game extends Engine {
    constructor() {
        super(options);
        this.score = 0; // Initialize score
        this.mylabel = new Label({
            text: `Score: ${this.score}`,
            pos: new Vector(100, 50),
            font: new Font({
                family: 'impact',
                size: 40,
                unit: FontUnit.Px,
                color: Color.White
            })
            
        });
        
        this.start(ResourceLoader).then(() => this.startGame());
        
    }
    onInitialize() {
        // Voeg het label toe aan de game
        this.add('intro', new IntroScreen());
        this.add('level1', new level1());
        

    }

    startGame() {
         this.add(this.mylabel);
        console.log('start de game!');
        this.goToScene('intro');
        this.add('EndScreen', new EndScreen());
    }
    // updateScore(points) {
    //     this.score += points; // Voeg de punten toe aan de score
    //     this.mylabel.text = `Score : ${this.score}`;
    // }
}

new Game();

