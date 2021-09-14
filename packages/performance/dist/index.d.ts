declare type TimingEntry = {
  name: string;
  loadTime: number;
};
declare type TimingTrace = {
  page: TimingEntry;
  resource: TimingEntry[];
  fp: number;
  fcp: number;
};
declare type TraceFunc = (timing: TimingTrace) => void;
/**
 * 性能检测与上报
 *  FP与FCP这两个指标之间的主要区别是：
 *      FP是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP。
 *      相比之下，FCP指的是浏览器首次绘制来自DOM的内容。例如：文本，图片，SVG，canvas元素等，这个时间点叫FCP。
 *
 *  FP和FCP可能是相同的时间，也可能是先FP后FCP。
 *
 *  FMP，全称 First Meaningful Paint，翻译为首次有意义的绘制，是页面主要内容出现在屏幕上的时间, 这是用户感知加载体验的主要指标。目前尚无标准化的定义, 因为很难以通用的方式去确定各种类型页面的关键内容。
 */
export default class Performance {
  #private;
  constructor(timeoutStamp: number);
  /**
   * 事件上报监听
   *
   * @param trace
   */
  onTrace: (trace: TraceFunc) => void;
  /**
   * 页面加载数据
   *
   * @returns
   */
  getPageLoadTime: () => TimingEntry;
  /**
   * 资源加载超时列表
   *
   * @param isTimeout 超时校验函数
   * @returns
   */
  getResourceTime: () => TimingEntry[];
  /**
   * 获取首次绘制时间
   *
   *    FP和FCP可能是相同的时间，也可能是先FP后FCP。
   *    FP是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP
   *
   * @returns
   */
  getFPTime: () => number;
  /**
   * 获取首次内容绘制的时间
   *
   *    FCP指的是浏览器首次绘制来自DOM的内容。例如：文本，图片，SVG，canvas元素等，这个时间点叫FCP
   */
  getFCPTime: () => number;
}
export {};
