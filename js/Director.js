import DataStore from "./base/DataStore.js";

// 导演类，控制游戏的逻辑
export default class Director {

  constructor() {
    this.dataStore = DataStore.getInstance()
  }

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }

  run() {
    const background = this.dataStore.get('background').draw()
    const land = this.dataStore.get('land').draw()
    let timer = requestAnimationFrame(() => this.run())
    this.dataStore.put('timer', timer)
    // cancelAnimationFrame(this.dataStore.get('timer'))
  }
}
