const get = require('lodash/get');
const Extra = require('telegraf/extra');

const getWelcomeLocale = (locale) => {
  return get(locale, 'scenarios.welcome', {});
};

const createKeyboard = (buttons) => {
  return Extra.markdown().markup((m) => {
    return m.keyboard(buttons).resize();
  });
};

module.exports = {
  getWelcomeLocale,
  createKeyboard,
};
