import DataStore from "./base/DataStore.js";
import UpPencil from "./runtime/UpPencil.js";
import DownPencil from "./runtime/DownPencil.js";

// 导演类，控制游戏的逻辑
export default class Director {

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  constructor() {
    this.dataStore = DataStore.getInstance()
    this.moveSpeed = 2
  }

  /**
   * 创建铅笔
   */
  createPencil() {
    const minTop = window.innerHeight / 8
    const maxTop = window.innerHeight / 2
    const top = minTop + Math.random() * (maxTop - minTop)
    this.dataStore.get('pencils').push(new UpPencil(top))
    this.dataStore.get('pencils').push(new DownPencil(top))
  }

  birdsEvent() {
    for (let i = 0; i <= 2; i++) {
      this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i]
    }
    this.dataStore.get('birds').time = 0
  }

  /**
   * 绘制铅笔
   */
  drawPencil() {
    const pencils = this.dataStore.get('pencils')
      if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
        pencils.shift()
        pencils.shift()
        this.dataStore.get('score').addFlag = true
      }

      if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
        this.createPencil()
      }

      this.dataStore.get('pencils').forEach((pencil, index, arr) => {
        pencil.draw()
      })
  }

  /**
   * 判断小鸟是否与铅笔撞击
   */
  static isStrick(bird, pencil) {
    let s = false
    if (
      bird.top > pencil.bottom ||
      bird.bottom < pencil.top ||
      bird.right < pencil.left ||
      bird.left > pencil.right
    ) {
      s = true
    }
    return !s
  }

  /**
   * 判断小鸟是否撞击地板和铅笔
   */
  check() {
    const birds = this.dataStore.get('birds')
    const land = this.dataStore.get('land')
    const pencils = this.dataStore.get('pencils')
    const score = this.dataStore.get('score')

   // 小鸟撞击地板
    if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
      this.isGameOver = true
      return
    }

    // 小鸟得边框模型
    const birdsBorder = {
      top: birds.y[0],
      bottom: birds.birdsY[0] + birds.birdsHeight[0],
      left: birds.birdsX[0],
      right: birds.birdsX[0] + birds.birdsWidth[0]
    }

    const length = pencils.length
    for (let i = 0; i < length; i++) {
      const pencil = pencils[i]
      const pencilBorder = {
        top: pencil.y,
        bottom: pencil.y + pencil.height,
        left: pencil.x,
        right: pencil.x + pencil.width
      }

      if (Director.isStrick(birdsBorder, pencilBorder)) {
        this.isGameOver = true
      }
    }

    // 加分逻辑
    if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.addFlag) {
      score.scoreNumber++
      score.addFlag = false
    }

  }

  run() {
    this.check()
    if (!this.isGameOver) {
      const background = this.dataStore.get('background').draw()

      this.drawPencil()

      const score = this.dataStore.get('score').draw()
      const land = this.dataStore.get('land').draw()
      const birds = this.dataStore.get('birds').draw()

      let timer = requestAnimationFrame(() => this.run())
      this.dataStore.put('timer', timer)
    } else {
      this.dataStore.get('startButton').draw()
      console.log('游戏结束')
      cancelAnimationFrame(this.dataStore.get('timer'))
      this.dataStore.destroy()
    }
  }
}
