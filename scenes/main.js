const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");

const { createPadawanScene } = require("./padawan/padawan");
const { createMentorScene } = require("./mentor/mentor");
const texts = require("./main-texts");

const sceneName = "MAIN";
exports.createMainScene = scenes => {
  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    if (ctx.session.timerId) {
      return ctx.scene.enter("PADAWAN_TIMER");
    }

    return ctx.addToQueue(async () => {
      ctx.replyWithHTML(
        texts.messages.enter(),
        Markup.keyboard([[texts.buttons.rolePadawan, texts.buttons.roleMentor]])
          .oneTime()
          .resize()
          .extra()
      );
    });
  });

  const padawanScene = createPadawanScene(scenes, ctx =>
    ctx.scene.enter(sceneName)
  );
  scene.hears(texts.buttons.rolePadawan, async ctx => {
    ctx.scene.enter(padawanScene.id);
  });

  const mentorScene = createMentorScene(scenes, ctx =>
    ctx.scene.enter(sceneName)
  );
  scene.hears(texts.buttons.roleMentor, async ctx => {
    ctx.scene.enter(mentorScene.id);
  });

  scenes.push(scene);
  return scene;
};
