import { getQueryParam, isWeChatBrowser } from '../util';
/** 登录方式枚举 */
var ELoginScope;
(function (ELoginScope) {
  /** 静默登录 */
  ELoginScope['Silent'] = 'snsapi_base';
  /** 非静默登录 */
  ELoginScope['NoSilent'] = 'snsapi_userinfo';
})(ELoginScope || (ELoginScope = {}));
/**
 * 微信网页授权登录
 *
 * @param appId 服务号 appId
 * @param isSilent 是否静默登录，默认非静默登录
 * @param redirectUrl 授权回调地址
 * @returns
 */
export const webpageLogin = (
  appId,
  isSilent = false,
  redirectUrl = window.location.href,
) => {
  if (!isWeChatBrowser()) return '';
  if (!appId) throw new Error('缺少 appId');
  // 获取授权返回的 code 参数
  const code = getQueryParam('code', redirectUrl);
  // 返回 code 则说明授权成功
  if (code) return code;
  // 授权登录 scope
  const scope = isSilent ? ELoginScope.Silent : ELoginScope.NoSilent;
  window.location.replace(
    `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(
      redirectUrl,
    )}&response_type=code&scope=${scope}&state=ST-${Date.now()}#wechat_redirect`,
  );
  return '';
};
