const cvs = document.querySelector('#cvs')
const ctx = cvs.getContext('2d')

let height = window.innerHeight
let width = Math.min(window.innerWidth, 400)

const bg = new Image()
bg.src = './src/bg.png'

const colors = {
    player: 'cornflowerblue',
    bg: 'cornsilk',
    platform: 'chocolate'
}


const keys = {
    'a': 0,
    'd': 1,
    'ArrowLeft': 0,
    'ArrowRight': 1,
}