const { START_AS_MENTOR, START_AS_PADAVAN } = require("../actions/actions");
const { getLocale } = require("../constants/locale");

module.exports = (locale, action) =>
  ({
    [getLocale(locale, "actions.rolePadavan")]: START_AS_PADAVAN,
    [getLocale(locale, "actions.roleMentor")]: START_AS_MENTOR
  }[action]);
