require("dotenv").config();

const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const session = require("telegraf/session");
const config = require("./config/defaults");
const i18n = require("./constants/locale");
const router = require("./router/router");
const { START_AS_MENTOR, START_AS_PADAVAN } = require("./actions/actions");
const { getLocale, createKeyboard } = require("./utils");

const LANGUAGE = "ru";

const bot = new Telegraf(config.token);

bot.use(
  session({
    ttl: 500,
    getSessionKey: ctx => {
      if (ctx.from && ctx.chat) {
        return `${ctx.from.id}:${ctx.chat.id}`;
      }

      if (ctx.from && ctx.inlineQuery) {
        return `${ctx.from.id}:${ctx.from.id}`;
      }

      return null;
    }
  })
);

bot.start(context => {
  const locale = getLocale(LANGUAGE);
  const { scenarios, actions } = locale;
  const showWelcomeKeyboard = createKeyboard(
    [
      Markup.callbackButton(actions.rolePadavan, START_AS_PADAVAN),
      Markup.callbackButton(actions.roleMentor, START_AS_MENTOR)
    ],
    { columns: 2 }
  );
  // eslint-disable-next-line
  context.session.i18n = i18n;

  return context.reply(scenarios.welcomeText, showWelcomeKeyboard);
});

bot.on("text", router);
bot.launch();
