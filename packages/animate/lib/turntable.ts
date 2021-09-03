/**
 * 缓动算法
 *
 * @param t 当前时间
 * @param b 初始值
 * @param c 变化量
 * @param d 持续时间
 * @returns
 */
export const easeInOut = (
  t: number,
  b: number,
  c: number,
  d: number,
): number => {
  const buf = t / d / 2;
  if (buf < 1) return (c / 2) * t * t + b;

  return (-c / 2) * (--t * (t - 2) - 1) + b;
};

/**
 * 转盘游戏
 */
export class Turntable {
  private result: number = 0;

  private usedTime: number = 0; // 已经旋转的时间

  private duration: number; // 旋转完成总耗时

  private step: number; // 旋转幅度

  constructor(step: number, duration: number) {
    this.setOptions(step, duration);
  }

  /**
   * 设置初始参数
   *
   * @param usedTime
   * @param step
   * @param duration
   */
  setOptions = (step: number = 0, duration: number = 0) => {
    this.duration = duration || Math.random() * 3 * 4000;
    this.step = step || Math.random() * 10 + 10;
  };

  /**
   * 旋转
   *
   * @param isContinue
   * @returns
   */
  rotate = (isContinue: (angel: number, usedTime: number) => boolean) => {
    this.usedTime += this.step;

    const { step, usedTime, duration } = this;

    if (usedTime >= duration) {
      isContinue && isContinue(this.result, this.usedTime);
      this.usedTime = 0;
      this.result = 0;
      return;
    }

    const change = easeInOut(usedTime, 0, step, duration) * (Math.PI / 180);
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
  getRotateResult = (angel: number, split: number = 9) => {
    const idx = (angel % 360) / (360 / split);
    return idx;
  };
}
