const local = window.localStorage;
const session = window.sessionStorage;

/**
 * 移除缓存
 *
 * @param local localStorage/sessionStorage
 * @param key 缓存 key
 * @returns
 */
const removeStorage = function (local: Storage, key: string) {
  if (!key) return;
  local.removeItem(key);
};

/**
 * 获取缓存
 *
 * @param local localStorage/sessionStorage
 * @param key 缓存 key
 * @returns
 */
const getStorage = function (local: Storage, key: string) {
  let value = key ? local.getItem(key) : null;
  try {
    value = value && /^\{.+\}$/.test(value) ? JSON.parse(value) : value;
  } catch (error) {
    throw error;
  }
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
const setStorage = function (local: Storage, key: string, value: any) {
  if (!key) return;

  try {
    const _value = typeof value === 'object' ? JSON.stringify(value) : value;
    local.setItem(key, _value);
  } catch (error) {
    throw error;
  }
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
export const setLocal = (key: string, value: any) => setStorage(local, key, value);

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
export const setSession = (key: string, value: any) => setStorage(session, key, value);

/**
 * 获取本地 sessionStorage 缓存
 *
 * @param key 缓存 key
 * @returns
 */
export const getSession = (key: string) => getStorage(session, key);
