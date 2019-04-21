export default class Ball {
    constructor(images) {
        this.image = images['ball']
        this.x = 130
        this.y = 190
        this.w = this.image.width
        this.h = this.image.height
        this.speedX = 5
        this.speedY = 5
        this.fired = false
    }

    fire() {
        this.fired = true
    }

    move() {
        if(this.fired) {
            if(this.x < 0 || this.x > 400 - this.w) {
                this.speedX *= -1
            }
            if(this.y < 0 || this.y > 300 - this.h) {
                this.speedY *= -1
            }
            this.x += this.speedX
            this.y += this.speedY
        }
    }

    hasPoint(x, y) {
        let xIn = Math.abs(x - this.x - this.w / 2 ) <= this.w / 2
        let yIn = Math.abs(y - this.y - this.h / 2 ) <= this.y / 2
        return xIn && yIn
    }

    speedChange(block) {
        //正常撞击就无需考虑了，需要考虑的是特殊撞击
        //左侧撞击，所有speedX变向
        if(
            (this.speedX >= 0)
            &&
            (this.x <= block.x)
        ) {
            this.speedX *= -1
            //左侧撞击特例，从左侧擦边而过，Y保持不变
            if((Math.abs(this.y - block.y) <= 2) ||
                (Math.abs((this.y + this.h) - (block.y + block.h)) <= 2)) {
                this.speedY *= -1
            }
        }
        //右侧撞击，所有X变向
        if(
            (this.speedX <= 0)
            &&
            (this.x + this.w >= block.x + block.w)
        ) {
            this.speedX *= -1
            //右侧撞击特例，从右侧擦边而过，Y保持不变
            if((Math.abs(this.y - block.y) <= 2) ||
                (Math.abs((this.y + this.h) - (block.y + block.h)) <= 2)){
                this.speedY *= -1
            }
        }

        this.speedY *= -1
    }
}

