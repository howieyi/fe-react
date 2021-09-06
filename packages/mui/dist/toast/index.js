require('./index.css');
const ToastClassName = 'mui-toast';
let timer;
/**
 * 文字提示
 *
 * @param message
 * @returns
 */
export const showToast = message => {
  if (!message) return;
  timer && clearTimeout(timer);
  let toastRoot = document.getElementById(ToastClassName);
  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.id = ToastClassName;
    toastRoot.className = ToastClassName;
    toastRoot.textContent =
      message === null || message === void 0 ? void 0 : message.trim();
    document.body.appendChild(toastRoot);
  } else {
    toastRoot.textContent =
      message === null || message === void 0 ? void 0 : message.trim();
  }
  timer = setTimeout(() => {
    toastRoot === null || toastRoot === void 0 ? void 0 : toastRoot.remove();
  }, 3000);
};
