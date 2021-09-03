/**
 * 验证手机号
 *
 * @param mobileNo
 * @returns
 */
export const isValidMobile = (mobileNo: string) =>
  mobileNo && new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/gi);
