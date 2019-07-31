const Router = require("telegraf/router");
const {
  START_AS_MENTOR,
  START_AS_PADAVAN,
  SESSION_EXPIRED
} = require("../actions/actions");
const reducer = require("../reducer/reducer");

const router = new Router(ctx => {
  const { i18n } = ctx.session;
  const action = ctx.message.text;

  if (!i18n || !reducer(i18n, action)) {
    return {
      route: SESSION_EXPIRED
    };
  }

  return {
    route: reducer(i18n, action),
    state: {}
  };
});

router.on(START_AS_MENTOR, ctx => {
  return ctx.reply("Okay, hi mentor!");
});

router.on(START_AS_PADAVAN, ctx => {
  return ctx.reply("Okay, hi padavan!");
});

router.on(SESSION_EXPIRED, ctx => {
  return ctx.reply("Извините, ваша сессия истекла или неправильный запрос.");
});

module.exports = router;
