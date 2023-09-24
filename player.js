
const playerSizes = [93, 91]
const noseSize = 31;
const gameSpeedCoef = 0.013
const playerMaxSpeed = [-200*gameSpeedCoef, -920*gameSpeedCoef]

const player = {
    w: playerSizes[0],
    h: playerSizes[1],
    speed: [0, playerMaxSpeed[1]],
    dir: [1, 0],
    pos: [(width-playerSizes[0])/2, height- playerSizes[1] - 10 ],

    imgL: new Image(),
    imgR: new Image(),
}
player.imgL.src = './src/playerL.png';
player.imgR.src = './src/playerR.png';

const renderPlayer = () => {
    const px1 = player.pos[0] + noseSize,
        px2 = player.pos[0]+player.w;
    // ctx.beginPath(); ctx.strokeStyle = 'red'; ctx.rect(px1, player.pos[1], px2-px1, player.h); ctx.stroke(); ctx.closePath(); 
    player.dir[0]
        ? ctx.drawImage(player.imgR, player.pos[0], player.pos[1], player.w + noseSize, player.h, )
        : ctx.drawImage(player.imgL, player.pos[0], player.pos[1], player.w + noseSize, player.h, );
}


const collision = () => {
    if(!score && player.pos[1]+player.h >= height)
        return {
            value: 10,
            addScore: false,
        };
    
    for( let platform of platforms ){
        const px1 = player.pos[0] + noseSize,
            px2 = player.pos[0] + player.w;
        if( Math.abs( platform.pos[1] - (player.pos[1]+player.h) ) <= 2+player.speed[1] &&
            platform.pos[0] <= px2 && platform.pos[0]+platformW >= px1) {
            

            if( platform.type === 2 ){
                platform.triggered = true;
                return false
            }

            if( platform.checked ){
                return {
                    value: Number(height-platform.pos[1]),
                    addScore: false,
                };
            }

            platforms.forEach(el => {
                if(el.pos[1] >= platform.pos[1])
                    el.checked = true;
            })
            return {
                value: Number(height-platform.pos[1]),
                addScore: true,
            }
        }
    }

    return false;
}

const movePlayer = () => {

    if(player.pos[1] >= height)
        return false

    player.pos[0] += player.speed[0]
    player.pos[1] += player.speed[1]

    player.speed[1] += (1.2 * 9.82)*gameSpeedCoef // speed ~ 0-15

    if( player.speed[1]>=0 ){
        const collisionResult = collision()
        if( collisionResult ) {

            if(collisionResult.addScore)
                score += Math.max(collisionResult.value - platformsStep*2, 0)

            player.speed[1] = playerMaxSpeed[1] + collisionResult.value*gameSpeedCoef

            platforms.forEach( platform => {
                platform.speed[1] = Math.max((collisionResult.value-platformsStep*2)*gameSpeedCoef, 0)
            } )
        }
    }

    return true
}


window.addEventListener( 'keyup', (e)=>{
    player.speed[0] = 0
} )

window.addEventListener( 'keydown', (e)=>{
    if(keys[e.key] == undefined)
        return

    player.dir[0] = keys[e.key]
    player.speed[0] = keys[e.key]
                        ? -playerMaxSpeed[0]
                        : playerMaxSpeed[0]

} )