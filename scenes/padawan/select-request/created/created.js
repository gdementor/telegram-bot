const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const texts = require("./created-texts");

const sceneName = "PADAWAN_CREATED_REQUEST";
exports.createCreatedScene = scenes => {
  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    ctx.addToQueue(async () => {
      await ctx.replyWithHTML(
        texts.messages.enter(),
        Markup.removeKeyboard().extra()
      );

      ctx.scene.enter("PADAWAN_TIMER");
    });
  });

  scenes.push(scene);
  return scene;
};
