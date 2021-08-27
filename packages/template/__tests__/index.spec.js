const { join } = require('path');
const { generateTemplate, getTemplateList } = require('../dist/index');

const testRoot = join(process.cwd(), '__test__');

// generateTemplate(testRoot, {
//   name: 'test1',
//   version: '1.0.1',
//   description: 'test',
//   template: 'react',
//   port: '9901',
// });

console.log(getTemplateList());
