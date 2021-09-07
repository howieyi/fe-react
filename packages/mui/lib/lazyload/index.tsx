import React, { ReactElement, useEffect, useMemo } from 'react';

require('index.css');

interface ILazyLoadProps<T = any> {
  /** 外部图片渲染，注意 img 标签设置为 data-src */
  imageRender?: (item: T, idx?: number) => ReactElement;

  /** 图片数据集合 */
  images: ({ title?: string; url: string; [prop: string]: any } & T)[];
}

/**
 * 图片懒加载组件
 *
 * @param param
 * @returns
 */
export default function MLazyLoad({ images, imageRender }: ILazyLoadProps) {
  useEffect(() => {
    const entries: HTMLCollectionOf<HTMLImageElement> =
      document.getElementsByTagName('img');

    if (!entries.length) return;

    const initEvent = () => {
      // 利用 IntersectionObserver 监听元素是否出现在视口
      const io = new IntersectionObserver(
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
    };

    if (window.IntersectionObserver) {
      initEvent();
    } else {
      // @ts-ignore
      import(/* webpackChunkName: "observer" */ 'intersection-observer').then(
        initEvent,
      );
    }
  }, [images]);

  const Images = useMemo(() => {
    return images.map((it, idx) =>
      imageRender ? (
        imageRender(it, idx)
      ) : (
        <div className="lazy-area" key={`lazy-${it.url}-${Date.now()}`}>
          {it.title && <div className="lazy-title">{it.title}</div>}
          <div className="lazy-item">
            <img data-src={it.url} alt={it.title} />
          </div>
        </div>
      ),
    );
  }, [images]);

  return <div className="mui-lazyload">{Images}</div>;
}
