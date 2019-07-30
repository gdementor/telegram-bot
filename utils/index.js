const Markup = require('telegraf/markup');

const createKeyboard = (buttonsList, options = { columns: 2 }) => {
  return Markup
    .keyboard(buttonsList, options)
    .oneTime()
    .resize()
    .extra();
};

module.exports = {
  createKeyboard,
};
