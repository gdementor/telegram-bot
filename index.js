const Telegraf = require('telegraf');
const config = require('./config/defaults');
const locale = require('./constants/locale');

const bot = new Telegraf(config.token);

bot.start((context) => {
  return context.reply(locale.scenarios.welcome.text);
});

bot.launch();
