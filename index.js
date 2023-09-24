// settings

// player

// platforms
const openPause = () => {
    console.log('pause')
    return
}

let interval = null
let score = 0

window.addEventListener( 'load', ()=>{
    cvs.height = height = window.innerHeight
    cvs.width = width = Math.min(window.innerWidth, 500)

    for(let i=0; i<platformsCnt; i++)
        updPlatforms( 0, false, height - platformsStep*(i+1) - 15)

    interval = setInterval(main, 10)
} )
window.addEventListener( 'resize', ()=>{
    cvs.height = height = window.innerHeight
    cvs.width = width = Math.min(window.innerWidth, 400)
} )

window.addEventListener( 'keydown', (e)=>{
    if(e.key === 'Escape'){
        openPause()
        return
    }
} )



const main = () => {
    if( movePlayer() ){
        ctx.drawImage( bg, 0, 0, width, height )

        platforms.forEach( el => renderPlatform(el) )

        renderPlayer()

        movePlatforms()

        ctx.font = "48px serif"; ctx.fillText(`Score: ${Math.floor(score)}`, 10, 20+48/2)
        
        if(!score) renderStartPlatform(startPlatform)
    }
}