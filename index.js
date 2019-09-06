require("dotenv").config();
const Stage = require("telegraf/stage");

const { bot } = require("./bot");
const { localSession } = require("./storage");

const { createMainScene } = require("./scenes/main");

const scenes = [];
const mainScene = createMainScene(scenes);

bot.use(localSession.middleware());

const stage = new Stage(scenes);
bot.use(stage.middleware());

bot.start(async ctx => {
  const { id, username } = await ctx.getChat();
  ctx.session.user = {
    id,
    username,
    active: true
  };

  const defaultSettings = {
    timezone: 3
  };

  if (ctx.session.settings) {
    ctx.session.settings = {
      ...defaultSettings,
      ...ctx.session.settings
    };
  } else {
    ctx.session.settings = defaultSettings;
  }

  Stage.enter(mainScene.id)(ctx);
});

bot.launch();
