import XHR from 'xhr';

const formatOptions = ({
  method,
  url,
  json = {},
  headers = {},
  form = null,
  responseType = 'json',
  body = null,
}) => {
  const options = {
    url,
    method,
    responseType,
  };

  if (!form) {
    headers['Content-Type'] = 'application/json';
    options['headers'] = headers;

    if (!body) {
      const params = {};
      for (const prop in json) {
        if (json[prop] === '' || json[prop] === null) continue;

        params[prop] = json[prop];
      }

      options['json'] = params;
    } else {
      options['data'] = JSON.stringify(body);
    }
  } else {
    // form 表单传输
    const formData = new FormData();
    for (const prop in form) {
      formData.append(prop, form[prop]);
    }
    options['data'] = formData;
  }

  return options;
};

/**
 * 公共请求
 *
 * @param options
 */
export const request = options => {
  if (!options.url) throw new Error('缺少请求 url');

  return new Promise((resolve, reject) => {
    XHR(formatOptions(options), (err, resp, body) => {
      if (!err && resp.statusCode === 200) {
        // 增加跳转逻辑
        resolve(body);
      } else {
        reject(err);
      }
    });
  });
};
