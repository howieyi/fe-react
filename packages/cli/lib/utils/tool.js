const figlet = require('figlet');
const Lolcat = require('@darkobits/lolcatjs');

// 渐变输出
const textToLolcat = text => {
  const code = figlet.textSync(text);
  const lol = Lolcat.default || Lolcat;
  return lol?.fromString(code) || code;
};

module.exports = {
  textToLolcat,
};
