/**
 * 校验是否在微信浏览器中
 *
 * @returns
 */
export const isWeChatBrowser = (): boolean => {
  const userAgent = window.navigator.userAgent;
  return Boolean(userAgent.match(/MicroMessenger/gi));
};

/**
 * 获取 url 中的某个参数
 *
 * @param key 参数 key
 * @param url 被解析 url，默认为当前 url 的 search
 * @returns
 */
export const getQueryParam = (key: string, url: string = window.location.search): string => {
  if (!key) return '';

  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i');
  const result = url.substr(url.indexOf('?') + 1).match(reg);
  if (result !== null) {
    return decodeURI(result[2]);
  } else {
    return null;
  }
};
