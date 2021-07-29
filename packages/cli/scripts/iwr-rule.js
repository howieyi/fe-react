const iwrRule = program => {
  program
    .command('rule')
    .description('🌰 规则生成（eslint、commitlint)')
    .action(() => {});
};

module.exports = iwrRule;
