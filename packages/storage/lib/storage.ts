const local = window.localStorage;
const session = window.sessionStorage;

/**
 * 移除缓存
 *
 * @param storage localStorage/sessionStorage
 * @param key 缓存 key
 * @returns
 */
const removeStorage = (storage: Storage, key: string) => {
  if (!key) return;
  storage.removeItem(key);
};

/**
 * 获取缓存
 *
 * @param storage localStorage/sessionStorage
 * @param key 缓存 key
 * @returns
 */
const getStorage = (storage: Storage, key: string) => {
  let value = key ? storage.getItem(key) : null;
  value = value && /^\{.+\}$/.test(value) ? JSON.parse(value) : value;
  return value;
};

/**
 * 设置缓存
 *
 * @param local localStorage/sessionStorage
 * @param key 缓存 key
 * @param value 缓存值
 * @returns
 */
const setStorage = (storage: Storage, key: string, value: any) => {
  if (!key) return;

  const newValue = typeof value === 'object' ? JSON.stringify(value) : value;
  storage.setItem(key, newValue);
};

/**
 * 移除本地 localStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export const removeLocal = (key: string) => removeStorage(local, key);

/**
 * 设置本地 localStorage 缓存
 * @param key 缓存 key
 * @param value 缓存值
 * @returns
 */
export const setLocal = (key: string, value: any) =>
  setStorage(local, key, value);

/**
 * 获取本地 localStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export const getLocal = (key: string) => getStorage(local, key);

/**
 * 移除本地 sessionStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export const removeSession = (key: string) => removeStorage(session, key);

/**
 * 设置本地 sessionStorage 缓存
 * @param key 缓存 key
 * @param value 缓存值
 * @returns
 */
export const setSession = (key: string, value: any) =>
  setStorage(session, key, value);

/**
 * 获取本地 sessionStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export const getSession = (key: string) => getStorage(session, key);
