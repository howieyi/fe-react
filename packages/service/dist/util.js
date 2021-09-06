/**
 * 解析 url 中的某个参数
 *
 * @param search
 * @param name
 * @returns
 */
export const getSearchParam = (search, name) => {
  const pattern = new RegExp(`[?&]${name}=([^&]+)`, 'gi');
  const matcher = pattern.exec(search);
  return matcher && matcher.length === 2 ? matcher[1] : '';
};
