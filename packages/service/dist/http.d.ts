import { XhrUriConfig, XhrUrlConfig } from 'xhr';
declare type IRequestOption = XhrUrlConfig | XhrUriConfig;
declare type IRequest = {
  <T>(options: IRequestOption): Promise<T>;
  /** 全局前置钩子 */
  before?: (options: IRequestOption) => void;
  /** 全局后置钩子 */
  after?: <T>(
    data: T,
    resolve: (value: T | PromiseLike<T>) => void,
    reject: (value: T | PromiseLike<T>) => void,
  ) => void;
};
/**
 * 公共请求函数
 *
 * @param options
 */
export declare const request: IRequest;
export {};
