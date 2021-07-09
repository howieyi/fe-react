/**
 * 微信网页授权登录
 *
 * @param appId 服务号 appId
 * @param isSilent 是否静默登录，默认非静默登录
 * @param redirectUrl 授权回调地址
 * @returns
 */
export declare const webpageLogin: (appId: string, isSilent?: boolean, redirectUrl?: string) => string;
