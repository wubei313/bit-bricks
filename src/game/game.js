export default class Game {
    constructor(fps, images, callback){
        this.fps = fps
        this.images = images
        this.callback = callback
        this.paused = false
        this.keydowns = {}
        this.actions = {}
        this.scene = {}
        this.canvas = document.getElementById('id-canvas')
        this.ctx = this.canvas.getContext('2d')

        //实例化的时候调用初始化函数，用来载入图片和一些其他监听
        this.initial()
    }
    //初始化
    initial() {
        //绑定监听
        //这里会出现this变更的问题，所以使用箭头函数绑定this
        window.addEventListener('keydown', (event) => {
            let key = event.key
            this.keydowns[key] = true
        })
        window.addEventListener("keyup", (event) => {
            let key = event.key
            this.keydowns[key] = false
        })

        let time = 0
        for (let key in this.images) {
            let img = new Image()
            img.src = this.images[key]
            img.onload = () => {
                this.images[key] = img
                time ++
                //这里可以把字典转化成数组，然后取.length
                if(time == 3) {
                    //图片载入完成后开始执行回调函数
                    this.callback()
                }
            }
        }
    }
    //注册按键功能
    registerAction = (key, callback) => {
        this.actions[key] = callback
    }
    //画图
    drawImage(item) {
        this.ctx.drawImage(item.image, item.x, item.y)
    }

    //玩家操作
    playActions(){
        let keys = Object.keys(this.actions)
        for(let i = 0; i < keys.length; i++) {
            let key = keys[i]
            if (this.keydowns[key]) {
                this.actions[key]()
            }
        }
    }
    draw() {
        this.scene.draw()
    }
    update() {
        this.scene.update()
    }
    //某一帧的逻辑
    runLoop() {
        //这是玩家操作的部分
        this.playActions()
        //这里是清屏
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        //这是系统自动运行的部分
        this.update()
        //画出所有
        this.draw()
        setTimeout(() => this.runLoop(), 1000/this.fps)
    }
    //开始运行
    start(scene) {
        this.scene = scene
        this.runLoop()
    }
}


