import Sprite from "../base/Sprite.js";

export default class Background extends Sprite {
  constructor() {
    const image = Background.getImage('background')
    super(image, 0, 0, image.width, image.height, 0, 0, window.innerWidth, window.innerHeight)
  }
}
