type SourceType = HTMLImageElement | HTMLVideoElement | HTMLSourceElement;

const getObserver = (): Promise<typeof IntersectionObserver> => {
  return new Promise(resolve => {
    if (window.IntersectionObserver) {
      resolve(IntersectionObserver);
    } else {
      // @ts-ignore
      import(/* webpackChunkName: "observer" */ 'intersection-observer').then(
        () => resolve(IntersectionObserver),
      );
    }
  });
};

/**
 * 资源懒加载
 *  检测资源是否出现在视野范围，是则进行加载，否则不处理
 *
 * @param entries 资源集合
 * @returns
 */
export const observerSource = (
  entries: HTMLCollectionOf<SourceType> | NodeListOf<SourceType>,
) => {
  if (!entries || !entries.length) return;

  getObserver().then(Observer => {
    // 利用 IntersectionObserver 监听元素是否出现在视口
    const io = new Observer(
      items => {
        // 观察者
        items.forEach(item => {
          // entries 是被监听的元素集合它是一个数组
          if (item.intersectionRatio <= 0) return; // intersectionRatio 是可见度 如果当前元素不可见就结束该函数。

          const { target } = item;
          // 将 h5 自定义属性赋值给 src (进入可见区则加载图片)
          target.setAttribute('src', target.getAttribute('data-src'));
          io.unobserve(target); // 填充后取消监听
        });
      },
      {
        threshold: [0.01], // 添加触发时机数组
      },
    );

    for (let i = 0; i < entries.length; i++) {
      io.observe(entries[i]);
    }
  });
};
