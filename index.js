require('dotenv').config();

const Telegraf = require('telegraf');
const config = require('./config/defaults');
const locale = require('./constants/locale');
const CONSTANTS = require('./constants/const');
const { createKeyboard } = require('./utils');

const bot = new Telegraf(config.token);

bot.start((ctx) => {
  return ctx.reply(
    locale.welcome.text,
    createKeyboard([...Object.values(locale.welcome.buttons)]),
  );
});

bot.hears(locale.welcome.buttons.rolePadavan, (ctx) => {
  return ctx.reply(locale.createQuestion.rules)
    .then(() => {
      return ctx.reply(
        locale.createQuestion.chooseTechnology,
        createKeyboard(CONSTANTS.technologies),
      );
    });
});

bot.launch();
