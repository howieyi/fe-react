var _Performance_performance, _Performance_timeout, _Performance_isTimeout;
import { __classPrivateFieldGet, __classPrivateFieldSet } from 'tslib';
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
  constructor(timeoutStamp) {
    /** 劫持 */
    _Performance_performance.set(this, window.performance);
    /** 超时时间，毫秒数 */
    _Performance_timeout.set(this, 2000);
    /**
     * 事件上报监听
     *
     * @param trace
     */
    this.onTrace = trace => {
      if (!trace || typeof trace !== 'function')
        throw new Error('Performance is not function of trace');
      const oldOnload = window.onload;
      window.onload = e => {
        // @ts-ignore
        oldOnload && typeof oldOnload === 'function' && oldOnload(e);
        const page = this.getPageLoadTime();
        const resource = this.getResourceTime();
        const fp = this.getFPTime();
        const fcp = this.getFCPTime();
        const data = { page, resource, fp, fcp };
        window.requestIdleCallback
          ? window.requestIdleCallback(() => trace(data))
          : setTimeout(() => trace(data));
      };
    };
    /** 资源加载是否超时 */
    _Performance_isTimeout.set(
      this,
      stamp => stamp > __classPrivateFieldGet(this, _Performance_timeout, 'f'),
    );
    /**
     * 页面加载数据
     *
     * @returns
     */
    this.getPageLoadTime = () => {
      const [timing] = __classPrivateFieldGet(
        this,
        _Performance_performance,
        'f',
      ).getEntriesByType('navigation');
      const { name, domComplete } = timing;
      return { name, loadTime: domComplete };
    };
    /**
     * 资源加载超时列表
     *
     * @param isTimeout 超时校验函数
     * @returns
     */
    this.getResourceTime = () => {
      const resources = __classPrivateFieldGet(
        this,
        _Performance_performance,
        'f',
      ).getEntriesByType('resource');
      const buffer = [];
      resources.forEach(({ name, startTime, responseEnd }) => {
        const loadTime = responseEnd - startTime;
        __classPrivateFieldGet(this, _Performance_isTimeout, 'f').call(
          this,
          loadTime,
        ) && buffer.push({ name, loadTime });
      });
      return buffer;
    };
    /**
     * 获取首次绘制时间
     *
     *    FP和FCP可能是相同的时间，也可能是先FP后FCP。
     *    FP是当浏览器开始绘制内容到屏幕上的时候，只要在视觉上开始发生变化，无论是什么内容触发的视觉变化，在这一刻，这个时间点，叫做FP
     *
     * @returns
     */
    this.getFPTime = () => {
      const [timing] = __classPrivateFieldGet(
        this,
        _Performance_performance,
        'f',
      ).getEntriesByType('paint');
      return (
        (timing === null || timing === void 0 ? void 0 : timing.startTime) || 0
      );
    };
    /**
     * 获取首次内容绘制的时间
     *
     *    FCP指的是浏览器首次绘制来自DOM的内容。例如：文本，图片，SVG，canvas元素等，这个时间点叫FCP
     */
    this.getFCPTime = () => {
      const timings = __classPrivateFieldGet(
        this,
        _Performance_performance,
        'f',
      ).getEntriesByType('paint');
      return timings.length > 1 ? timings[1].startTime : 0;
    };
    // 设置资源超时时间
    __classPrivateFieldSet(this, _Performance_timeout, timeoutStamp, 'f');
  }
}
(_Performance_performance = new WeakMap()),
  (_Performance_timeout = new WeakMap()),
  (_Performance_isTimeout = new WeakMap());
