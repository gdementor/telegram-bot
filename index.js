require('dotenv').config();

const Telegraf = require('telegraf');
const Markup = require('telegraf/markup');
const config = require('./config/defaults');
const locale = require('./constants/locale');
const { getWelcomeLocale, createKeyboard } = require('./utils');

const bot = new Telegraf(config.token);

const welcomeLocale = getWelcomeLocale(locale);

bot.start((context) => {
  const showWelcomeKeyboard = createKeyboard([
    Markup.callbackButton(welcomeLocale.buttons.rolePadavan, 'test'),
    Markup.callbackButton(welcomeLocale.buttons.roleMentor, 'test'),
  ]);

  return context.reply(welcomeLocale.text, showWelcomeKeyboard);
});

bot.launch();
