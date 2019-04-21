export default class Scene_End {
    constructor(game, images) {
        this.update = () => {

        }
        this.draw = () => {
           game.ctx.fillText('gameOver', 200, 200)
        }

        game.draw = () => {
            this.draw()
        }
        game.update = () => {
            this.update()
        }
    }

}