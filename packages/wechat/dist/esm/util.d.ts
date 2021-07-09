/**
 * 校验是否在微信浏览器中
 *
 * @returns
 */
export declare const isWeChatBrowser: () => boolean;
/**
 * 获取 url 中的某个参数
 *
 * @param key 参数 key
 * @param url 被解析 url，默认为当前 url 的 search
 * @returns
 */
export declare const getQueryParam: (key: string, url?: string) => string;
