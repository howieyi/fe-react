import XHR from 'xhr';
/**
 * 公共请求函数
 *
 * @param options
 */
export const request = options => {
  return new Promise((resolve, reject) => {
    options.responseType = 'json';
    // 前置处理参数
    request.before && request.before(options);
    XHR(options, (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        // 增加跳转逻辑
        request.after ? request.after(body, resolve, reject) : resolve(body);
      } else {
        reject(err);
      }
    });
  });
};
