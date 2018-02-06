// 导演类，控制游戏的逻辑
export default class Director {

  static getInstance() {
    if (!Director.instance) {
      Director.instance = new Director()
    }
    return Director.instance
  }
}
