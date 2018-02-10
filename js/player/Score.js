import DataStore from '../base/DataStore.js'

// 计分器类
export default class Score {
  constructor() {
    this.ctx = DataStore.getInstance().ctx
    this.scoreNumber = 0
    // 控制加分的标志
    this.addFlag = true
  }

  draw() {
    this.ctx.font = '25px Arial'
    this.ctx.fillStyle = '#ff6c10'
    this.ctx.fillText(
      this.scoreNumber,
      window.innerWidth / 2,
      window.innerHeight / 18,
      1000
    )
  }
}
