'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Turntable = exports.easeInOut = void 0;
/**
 * 缓动算法
 *
 * @param t 当前时间
 * @param b 初始值
 * @param c 变化量
 * @param d 持续时间
 * @returns
 */
const easeInOut = (t, b, c, d) => {
  const buf = t / d / 2;
  if (buf < 1) return (c / 2) * t * t + b;
  return (-c / 2) * (--t * (t - 2) - 1) + b;
};
exports.easeInOut = easeInOut;
/**
 * 转盘游戏
 */
class Turntable {
  constructor(step, duration) {
    this.result = 0;
    this.usedTime = 0; // 已经旋转的时间
    /**
     * 设置初始参数
     *
     * @param usedTime
     * @param step
     * @param duration
     */
    this.setOptions = (step = 0, duration = 0) => {
      this.duration = duration || Math.random() * 3 * 4000;
      this.step = step || Math.random() * 10 + 10;
    };
    /**
     * 旋转
     *
     * @param isContinue
     * @returns
     */
    this.rotate = isContinue => {
      this.usedTime += 20;
      const { step, usedTime, duration } = this;
      if (usedTime >= duration) {
        isContinue && isContinue(this.result, this.usedTime);
        this.usedTime = 0;
        this.result = 0;
        return;
      }
      const change =
        (step - (0, exports.easeInOut)(usedTime, 0, step, duration)) *
        (Math.PI / 180);
      this.result += (change * 180) / Math.PI;
      // 继续条件
      (!isContinue || (isContinue && isContinue(this.result, this.usedTime))) &&
        window.requestAnimationFrame(() => this.rotate(isContinue));
    };
    /**
     * 获取旋转到第几块
     *
     * @param angel
     * @param split
     * @returns
     */
    this.getRotateResult = (angel, split = 9) => {
      const idx = (angel % 360) / (360 / split);
      return idx;
    };
    this.setOptions(step, duration);
  }
}
exports.Turntable = Turntable;
