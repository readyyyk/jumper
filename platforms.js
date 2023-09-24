
let difficulty = -30
let platformsStep = playerSizes[1] + difficulty
let platformsCnt = height/platformsStep

const platformW = 100
const platformsStayState = 6

let platforms = [
    // pos: [x, y],
    // type: Number 0 - 2
    // checked: bool,
                    // for breakable
    // state: Number,
    // stay: Number,
    // triggered: bool,
                    // for movable
    // dir: 0||1,
    // speed: [x, y],
]
const startPlatform = {
    height: 50,
    img: new Image(),
}
startPlatform.img.src = './src/grass.png'

const platformImgs = [
    new Image(),
    new Image(),
    new Image(),
]
platformImgs[0].src = './src/platform-0.png'; // static
platformImgs[1].src = './src/platform-1.png'; // movable
platformImgs[2].src = './src/platform-2.png'; // breakable

const platformFrames = [
    [0],
    [0],
    [0, 32, 79, 143],
]

const updPlatforms = (currentSpeed=0, shift=true, py) => {
    if(py == undefined) py = -platformsStep-15
    if(shift) platforms.shift();
    platforms.push ({
        pos: [Math.random()*(width-platformW), py],
        type: Math.random()>.8
                ? 1
                : Math.random()>.7
                    ? 2
                    : 0,
        checked: false,
                                // for breakable
        state: 0,
        stay: platformsStayState,
        triggered: false,
                                // for movable
        dir: Math.round(Math.random()),
        speed: [100 * gameSpeedCoef, currentSpeed],
    })
}
const renderStartPlatform = () => {
    ctx.drawImage( startPlatform.img,
        0, height - startPlatform.height,
        width, startPlatform.height)
}
const renderPlatform = (platform) => {
    if( platform.type === 1 ) {
        platform.pos[0] += platform.dir
                                ? platform.speed[0]
                                : -platform.speed[0]
        if(platform.pos[0]<=0 || platform.pos[0]>=width-platformW)
            platform.dir = !platform.dir

    } else if (platform.type === 2){
        if(platform.state>=platformFrames[platform.type].length)
            return

        const sy = -platformFrames[platform.type][platform.state] + (platformFrames[platform.type][platform.state+1]??platformImgs[platform.type].height)

        ctx.globalAlpha = 1 - 0.9*platform.state/platformFrames[platform.type].length

        ctx.drawImage( platformImgs[platform.type],
            0, platformFrames[platform.type][platform.state],
            platformImgs[platform.type].width, sy,
            platform.pos[0], platform.pos[1],
            platformW, platformW/platformImgs[platform.type].width*sy)
        ctx.globalAlpha = 1

        if(!platform.triggered)
            return

        if(!platform.stay--){
            platform.state++;
            platform.stay = platformsStayState
        }

        return
    }

    ctx.drawImage( platformImgs[platform.type],
        platform.pos[0], platform.pos[1],
        platformW, platformW/platformImgs[platform.type].width*platformImgs[platform.type].height)
}

const movePlatforms = () => {

    platforms.forEach( platform => {
        platform.pos[1] += platform.speed[1]
        platform.speed[1] = Math.max( platform.speed[1]-(0.4 * 9.82)*gameSpeedCoef, 0 )

        if(platform.pos[1] >= height){
            updPlatforms( platform.speed[1] )
            // difficulty+=.3
            // platformsStep = playerSizes[1] + difficulty
            // platformsCnt = height/platformsStep
        }
    } )
}