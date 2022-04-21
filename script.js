let playerState = 'idle'
const dropdown = document.getElementById('animate')
dropdown.addEventListener('change', function (e) {
  playerState = e.target.value
  console.log(e.target.value)
})
console.log(dropdown)

const canvas = document.getElementById('canvas1')
console.log(canvas)
const ctx = canvas.getContext('2d') //2d作圖
console.log('ctx')
const CANVAS_WIDTH = (canvas.width = 600)
const CANVAS_HEIGHT = (canvas.height = 600)
const spriteWidth = 575
const spriteHeight = 523
const playerImage = new Image()
playerImage.src = 'shadow_dog.png'
// frameX 每個動作不同貞數
// frameY 不同動作

let gameFrame = 0
const staggerFrame = 5
const spriteAnimations = []
const animationState = [
  { name: 'idle', frames: 7 },
  { name: 'jump', frames: 7 },
  { name: 'fall', frames: 7 },
  { name: 'run', frames: 8 },
  { name: 'dizzy', frames: 11 },
  { name: 'sit', frames: 5 },
  { name: 'roll', frames: 7 },
  { name: 'bite', frames: 7 },
  { name: 'ko', frames: 12 },
  { name: 'getHit', frames: 4 },
]
animationState.forEach((state, index) => {
  let frames = {
    loc: [],
  }
  for (let i = 0; i < state.frames; i++) {
    let positionX = spriteWidth * i
    let positionY = spriteHeight * index
    frames.loc.push({ x: positionX, y: positionY })
  }
  spriteAnimations[state.name] = frames
})
console.log(spriteAnimations)
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT) //界定範圍前兩數字是起點座標
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimations[playerState].loc.length
  let frameX = spriteWidth * position
  let frameY = spriteAnimations[playerState].loc[position].y
  // ctx.fillRect(100, 50, 100, 100)
  // ctx.drawImage(image,圖片裁切(x)位置,圖片裁切(y)位置,圖片大小(x),圖片大小(y),畫布(x)位置,畫布(y)位置,畫布大小(x),畫布大小(y)),
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    spriteWidth,
    spriteHeight
  ) //設定動畫大小為一格動畫
  //   if (gameFrame % staggerFrame === 0) {
  //     if (frameX < 6) frameX++
  //     else frameX = 0
  //   }
  gameFrame++

  requestAnimationFrame(animate)
}
animate()
