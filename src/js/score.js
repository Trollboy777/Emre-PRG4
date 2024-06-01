import { Actor, ScreenElement, Vector, Color, Label, Font } from "excalibur";

export class Score extends ScreenElement {
    score = 0;
    scoreText

    onInitialize(engine) {
        this.scoreText = new Label({
            z: 999,
            text: 'Score: 0',
            font: new Font({
                size: 77, 
                family: 'Anton'
            }),
        })
        this.addChild(this.scoreText)
    }

    updateScoreGoomba() {
        this.score+=2
        this.scoreText.text = 'Score:' + this.score
        console.log("Update Score Goomba")
        console.log(this.scoreText.text)
    }

    updateScoreCoin() {
        this.score++
        this.scoreText.text = 'Score:' + this.score
        console.log("Update Score Coin")
        console.log(this.scoreText.text)
    }

    updateScoreFroakie() {
        this.score+=3
        this.scoreText.text = 'Score:' + this.score
        console.log("Update Score Froakie")
        console.log(this.scoreText.text)
    }
    

}