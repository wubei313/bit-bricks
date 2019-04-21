import * as util from './game/util'
import Game from './game/game'
import Scene from './scene/main/scene'
import ball_pic from '../images/ball.png'
import paddle_pic from '../images/paddle.png'
import brick_pic from '../images/brick.png'

const enableDebugMode = (scene) => {
    window.addEventListener('keydown',function(event) {
        let key = event.key
        if(key === 'p'){
            scene.paused = !scene.paused
        }
        if('123'.includes(key)){
            scene.blocks = util.loadLevel(key, scene.g.images)
        }
    })
    window.addEventListener('input', function(event) {
        scene.g.fps = document.getElementById('input-speed').value
        log(scene.g.fps)
    })
}

const main = function() {
    let images = {
        ball: ball_pic,
        paddle: paddle_pic,
        block: brick_pic,
    }
    let game = new Game(30, images, () => {
        console.log('Scene是什么', Scene)
        scene = new Scene(game)
        console.log('scene', scene)
        game.start(scene)
        enableDebugMode(scene)
    })
}
main()


