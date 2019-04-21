export default class Block {
    constructor(attribute,images) {
        let a = attribute
        this.image = images['block']
        this.x = a[0]
        this.y = a[1]
        this.lifes = a[2]
        this.w = this.image.width
        this.h = this.image.height
        this.alive = true
    }
    kill() {
        if(this.lifes > 1) {
            this.lifes -= 1
        } else {
            this.lifes = 0
            this.alive = false
        }
    }
}
