import React, { ReactElement, useEffect, useMemo } from 'react';
import { observerSource } from '../service/observer';

require('./index.css');

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

    observerSource(entries);
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
