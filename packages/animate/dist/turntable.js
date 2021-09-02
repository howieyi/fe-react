'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.easeInOut = void 0;
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
