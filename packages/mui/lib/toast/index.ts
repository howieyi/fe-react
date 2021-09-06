require('./index.css');

const ToastClassName = 'mui-toast';
let timer: NodeJS.Timeout;

/**
 * 文字提示
 *
 * @param message
 * @returns
 */
export const showToast = (message: string) => {
  if (!message) return;

  timer && clearTimeout(timer);

  let toastRoot = document.getElementById(ToastClassName);

  if (!toastRoot) {
    toastRoot = document.createElement('div');
    toastRoot.id = ToastClassName;
    toastRoot.className = ToastClassName;
    toastRoot.textContent = message?.trim();
    document.body.appendChild(toastRoot);
  } else {
    toastRoot.textContent = message?.trim();
  }

  timer = setTimeout(() => {
    toastRoot?.remove();
  }, 3000);
};
