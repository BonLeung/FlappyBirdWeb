// 精灵的基类，负责初始化精灵家在的资源和大小以及位置
export default class Sprite {

   /**
    *
    * @param {*} ctx
    * @param {Image} img     - 传入的 Image 对象
    * @param {number} srcX   - 剪裁的 X 坐标
    * @param {number} srcY   - 剪裁的 Y 坐标
    * @param {number} srcW   - 剪裁的宽度
    * @param {number} srcH   - 剪裁的高度
    * @param {number} x      - 图片资源放置的 X 坐标
    * @param {number} y      - 图片资源放置的 Y 坐标
    * @param {number} width  - 使用的宽度
    * @param {number} height - 使用的高度
    */
  constructor(ctx = null, img = null, srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) {
    this.ctx = ctx
    this.img = img
    this.srcX = srcX
    this.srcY = srcY
    this.srcW = srcW
    this.srcH = srcH
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.srcX,
      this.srcY,
      this.srcW,
      this.srcH,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
}
