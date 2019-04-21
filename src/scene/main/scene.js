import Paddle from './paddle'
import Ball from './Ball'
import Scene_End from '../scene_end'
import * as util from '../../game/util'

class Scene {
    constructor(game) {
        //使用game里面的图片来初始化场景
        //场景作为game的具体插件，负责所有具体内容
        this.g = game
        this.enableDrag = false
        this.score = 0
        this.paddle = new Paddle(this.g.images)
        this.ball = new Ball(this.g.images)
        this.blocks = util.loadLevel(1, this.g.images)

        this.g.registerAction('a', () => {
            this.paddle.moveLeft()
        })
        this.g.registerAction('d', () => {
            this.paddle.moveRight()
        })
        this.g.registerAction('f', () => {
            this.ball.fire()
        })

        this.g.canvas.addEventListener('mousedown', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            if(this.ball.hasPoint(x, y)) {
                this.enableDrag = true
            }
        })
        this.g.canvas.addEventListener('mousemove', (event) => {
            let x = event.offsetX
            let y = event.offsetY
            if(this.enableDrag) {
                this.ball.x = x
                this.ball.y = y
            }
        })
        this.g.canvas.addEventListener('mouseup', () => {
            this.enableDrag = false
        })
    }
    draw() {
        this.g.ctx.fillStyle = '#554'
        this.g.ctx.fillRect(0, 0, 400, 300)
        this.g.ctx.globalCompositeOperation="source-over";
        this.g.ctx.font = '20px Vendana #000'
        this.g.fillStyle = '#FFF'
        this.g.ctx.fillText('score: ' + this.score, 340, 290)
        this.g.drawImage(this.paddle)
        this.g.drawImage(this.ball)
        for(let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i]
            if (block.alive) {
                this.g.drawImage(block)
            }
        }

    }
    update() {
        if(this.paused){
            return
        } else {
            this.ball.move()
            if(this.ball.y >= this.g.canvas.height - 5) {
                let scene_end = new Scene_End(this.g)
            }
            if(collide(this.ball, this.paddle)){
                this.ball.speedChange(this.paddle)
            }
            for(let i = 0; i < this.blocks.length; i++) {
                let block = this.blocks[i]
                if(block.alive) {
                    if(collide(this.ball, block)) {
                        this.ball.speedChange(block)
                        block.kill()
                        this.score += 100
                    }
                }
            }
        }
    }
}

export default Scene