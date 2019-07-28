const get = require('lodash/get');
const Extra = require('telegraf/extra');

const getWelcomeLocale = (locale) => {
  return get(locale, 'scenarios.welcome', {});
};

const createKeyboard = (buttons, options = {}) => {
  return Extra.markdown().markup((m) => {
    return m.keyboard(buttons, options)
      .oneTime()
      .resize();
  });
};

module.exports = {
  getWelcomeLocale,
  createKeyboard,
};
