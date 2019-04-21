import Block from '../scene/main/block'
import levels from '../scene/main/level'

export const e = sel => document.querySelector(sel)

export const log = function(item) {
    // console.log.bind(console)
    e('#id-text-log').value += '\n' + item

}
export const imageFromPath = function(path){
    let img = new Image()
    img.src = path
    return img
}

export const collide = function(a, b) {
    return (Math.max(a.x, b.x) < Math.min(a.x + a.image.width, b.x + b.image.width)) &&
        (Math.max(a.y, b.y) < Math.min(a.y + a.image.height, b.y + b.image.height))
}

export const loadLevel = (num, images) => {
    let blocks = []
    let level = levels[num - 1]
    for(let i = 0; i < level.length; i++) {
        let b = new Block(level[i], images)
        blocks.push(b)
    }
    return blocks
}