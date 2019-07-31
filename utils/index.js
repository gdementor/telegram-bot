const get = require("lodash/get");
const Extra = require("telegraf/extra");
const locale = require("../constants/locale");

const getLocale = (language, key = "") => {
  if (!language) {
    return null;
  }

  let localeKey = "";
  if (key) {
    localeKey = `${localeKey}.${key}`;
  } else {
    localeKey = language;
  }

  return get(locale, localeKey, null);
};

const createKeyboard = (buttons, options = {}) => {
  return Extra.markdown().markup(m => {
    return m
      .keyboard(buttons, options)
      .oneTime()
      .resize();
  });
};

module.exports = {
  getLocale,
  createKeyboard
};
