import { ReactElement } from 'react';
interface ILazyLoadProps<T = any> {
  /** 外部图片渲染，注意 img 标签设置为 data-src */
  imageRender?: (item: T, idx?: number) => ReactElement;
  /** 图片数据集合 */
  images: ({
    title?: string;
    url: string;
    [prop: string]: any;
  } & T)[];
}
/**
 * 图片懒加载组件
 *
 * @param param
 * @returns
 */
export default function MLazyLoad({
  images,
  imageRender,
}: ILazyLoadProps): JSX.Element;
export {};
