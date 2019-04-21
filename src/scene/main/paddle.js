export default class Paddle {
    constructor(images) {
        this.image = images['paddle']
        // this.image = imageFromPath('./images/paddle.png')
        this.x = 100
        this.y = 200
        this.w = this.image.width
        this.h = this.image.height
        this.speed = 5
    }
    // static image =
    move(x) {
        if(x < 0 ) {
            x = 0
        }
        if( x > 400 - this.w) {
            x = 400 - this.w
        }
        this.x = x
    }
    moveLeft() {
        this.move(this.x - this.speed)
    }
    moveRight() {
        this.move(this.x + this.speed)
    }
}

