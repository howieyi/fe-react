declare type SourceType =
  | HTMLImageElement
  | HTMLVideoElement
  | HTMLSourceElement;
/**
 * 资源懒加载
 *  检测资源是否出现在视野范围，是则进行加载，否则不处理
 *
 * @param entries 资源集合
 * @returns
 */
export declare const observerSource: (
  entries: HTMLCollectionOf<SourceType> | NodeListOf<SourceType>,
) => void;
export {};
