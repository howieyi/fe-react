/**
 * 缓动算法
 *
 * @param t 当前时间
 * @param b 初始值
 * @param c 变化量
 * @param d 持续时间
 * @returns
 */
export declare const easeInOut: (
  t: number,
  b: number,
  c: number,
  d: number,
) => number;
/**
 * 转盘游戏
 */
export declare class Turntable {
  private result;
  private usedTime;
  private duration;
  private step;
  constructor(step: number, duration: number);
  /**
   * 设置初始参数
   *
   * @param usedTime
   * @param step
   * @param duration
   */
  setOptions: (step?: number, duration?: number) => void;
  /**
   * 旋转
   *
   * @param isContinue
   * @returns
   */
  rotate: (isContinue: (angel: number, usedTime: number) => boolean) => void;
  /**
   * 获取旋转到第几块
   *
   * @param angel
   * @param split
   * @returns
   */
  getRotateResult: (angel: number, split?: number) => number;
}
