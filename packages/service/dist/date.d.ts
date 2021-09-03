/**
 * 格式化时间
 *
 * @param time
 * @param format
 * @returns
 */
export declare const formatDate: (
  time?: string | number,
  format?: string,
) => string;
/**
 * 格式化起止时间
 *  2021.08.16 21:05 - 22:00
 *
 * @param start
 * @param end
 * @param format
 * @returns
 */
export declare const formatStartEndTime: (
  start?: string | number,
  end?: string | number,
  format?: string,
) => string;
/**
 * 计算距今间隔时间
 *
 * @param start
 * @returns
 */
export declare const formatRemainStartTime: (
  start?: string | number,
  end?: string | number,
) => string;
