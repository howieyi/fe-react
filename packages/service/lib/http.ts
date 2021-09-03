import XHR, { XhrUriConfig, XhrUrlConfig } from 'xhr';

type IRequestOption = XhrUrlConfig | XhrUriConfig;
type IRequest = {
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
export const request: IRequest = <T>(options: IRequestOption): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    options.responseType = 'json';

    // 前置处理参数
    request.before && request.before(options);

    XHR(options, (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        // 增加跳转逻辑
        request.after
          ? request.after<T>(body as T, resolve, reject)
          : resolve(body);
      } else {
        reject(err);
      }
    });
  });
};
