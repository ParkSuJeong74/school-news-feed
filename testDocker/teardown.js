const { default: globalTeardown } = require('./global-teardown');
module.exports = async () => {
  await globalTeardown();
};
