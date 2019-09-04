const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const texts = require("./mentor-texts");

const sceneName = "MENTOR";
exports.createMentorScene = (scenes, back) => {
  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    return ctx.addToQueue(async () => {
      ctx.replyWithHTML(
        texts.messages.enter(),
        Markup.keyboard([texts.buttons.back])
          .oneTime()
          .resize()
          .extra()
      );
    });
  });

  scene.hears(texts.buttons.back, async ctx => {
    back(ctx);
  });

  scenes.push(scene);
  return scene;
};
