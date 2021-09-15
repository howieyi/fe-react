import React, { useEffect, useMemo } from 'react';
import { observerSource } from '../service/observer';
require('./index.css');
/**
 * 图片懒加载组件
 *
 * @param param
 * @returns
 */
export default function MLazyLoad({ images, imageRender }) {
  useEffect(() => {
    const entries = document.getElementsByTagName('img');
    observerSource(entries);
  }, [images]);
  const Images = useMemo(() => {
    return images.map((it, idx) =>
      imageRender
        ? imageRender(it, idx)
        : React.createElement(
            'div',
            { className: 'lazy-area', key: `lazy-${it.url}-${Date.now()}` },
            it.title &&
              React.createElement('div', { className: 'lazy-title' }, it.title),
            React.createElement(
              'div',
              { className: 'lazy-item' },
              React.createElement('img', { 'data-src': it.url, alt: it.title }),
            ),
          ),
    );
  }, [images]);
  return React.createElement('div', { className: 'mui-lazyload' }, Images);
}
