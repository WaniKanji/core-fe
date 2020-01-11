'use strict';
const path = require('path');
const razzleHeroku = require('razzle-heroku');

module.exports = {
  modify(config, { target, dev }, webpack) {
    // Since RN web takes care of CSS, we should remove it for a #perf boost
    config.module.rules = config.module.rules
      .filter(
        rule =>
          !(rule.test && rule.test.exec && rule.test.exec('./something.css'))
      )
      .filter(
        rule =>
          !(
            rule.test &&
            rule.test.exec &&
            rule.test.exec('./something.module.css')
          )
      );
    config.resolve.modules.unshift(path.resolve(__dirname, './src'));
    delete config.externals;

    /* HEROKU compability */
    config = razzleHeroku(config, { target, dev }, webpack);

    return config;
  },
};