const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const texts = require("./select-request-texts");

const { createCreatedScene } = require("./created/created");

const sceneName = "PADAWAN_SELECT_REQUEST";
exports.createSelectRequestScene = scenes => {
  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    return ctx.addToQueue(async () => {
      await ctx.replyWithHTML(
        texts.messages.enter(),
        Markup.keyboard([
          texts.buttons.codeReview,
          texts.buttons.ask,
          texts.buttons.technology,
          texts.buttons.growth,
          texts.buttons.cancel
        ])
          .oneTime()
          .resize()
          .extra()
      );
    });
  });

  const createdScene = createCreatedScene(scenes, ctx =>
    ctx.scene.enter(sceneName)
  );
  scene.hears(
    [
      texts.buttons.codeReview,
      texts.buttons.ask,
      texts.buttons.technology,
      texts.buttons.growth
    ],
    async ctx => {
      // TODO
      ctx.session.requests = ctx.session.requests || [];
      ctx.scene.enter(createdScene.id);
    }
  );

  scene.hears(texts.buttons.cancel, async ctx => {
    ctx.scene.enter("MAIN");
  });

  scenes.push(scene);
  return scene;
};
