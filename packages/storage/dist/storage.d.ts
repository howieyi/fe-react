/**
 * 移除本地 localStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export declare const removeLocal: (key: string) => void;
/**
 * 设置本地 localStorage 缓存
 * @param key 缓存 key
 * @param value 缓存值
 * @returns
 */
export declare const setLocal: (key: string, value: any) => void;
/**
 * 获取本地 localStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export declare const getLocal: (key: string) => string;
/**
 * 移除本地 sessionStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export declare const removeSession: (key: string) => void;
/**
 * 设置本地 sessionStorage 缓存
 * @param key 缓存 key
 * @param value 缓存值
 * @returns
 */
export declare const setSession: (key: string, value: any) => void;
/**
 * 获取本地 sessionStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export declare const getSession: (key: string) => string;
