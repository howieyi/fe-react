const { join } = require('path');
const { generateTemplate, getTemplateQuestionList } = require('../dist/index');

const testRoot = join(process.cwd(), '__test__');

generateTemplate(testRoot, {
  name: 'lerna',
  version: '1.0.1',
  description: 'test',
  template: 'lerna 模板',
  port: '9901',
});
generateTemplate(testRoot, {
  name: 'react',
  version: '1.0.1',
  description: 'test',
  template: 'react js 模板',
  port: '9901',
});
generateTemplate(testRoot, {
  name: 'react-ts',
  version: '1.0.1',
  description: 'test',
  template: 'react ts 模板',
  port: '9901',
});
generateTemplate(testRoot, {
  name: 'react-rule',
  version: '1.0.1',
  description: 'test',
  template: 'react js 模板（带lint规则）',
  port: '9901',
});
generateTemplate(testRoot, {
  name: 'react-ts-rule',
  version: '1.0.1',
  description: 'test',
  template: 'react ts 模板（带lint规则）',
  port: '9901',
});

console.log(`模板列表@`, getTemplateQuestionList());
