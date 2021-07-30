const figlet = require('figlet');
const lolcat = require('@darkobits/lolcatjs');

// 渐变输出
const textToLolcat = text => {
  const code = figlet.textSync(text);
  return lolcat.default.fromString(code);
};

module.exports = {
  textToLolcat,
};
