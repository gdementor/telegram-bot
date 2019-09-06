const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const texts = require("./padawan-texts");

const { createSelectRequestScene } = require("./select-request/select-request");
const { createTimerScene } = require("./timer/timer");

const sceneName = "PADAWAN";
exports.createPadawanScene = (scenes, back) => {
  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    return ctx.addToQueue(async () => {
      ctx.replyWithHTML(
        texts.messages.enter(),
        Markup.keyboard([
          texts.buttons.agree,
          texts.buttons.back
        ])
          .oneTime()
          .resize()
          .extra({ disable_web_page_preview: true })
      );
    });
  });

  const selectRequestScene = createSelectRequestScene(scenes, ctx =>
    ctx.scene.enter(sceneName)
  );
  scene.hears(texts.buttons.agree, async ctx => {
    ctx.scene.enter(selectRequestScene.id);
  });

  const timerScene = createTimerScene(scenes, ctx =>
    ctx.scene.enter(sceneName)
  );

  scene.hears(texts.buttons.back, async ctx => {
    back(ctx);
  });

  scenes.push(scene);
  return scene;
};
