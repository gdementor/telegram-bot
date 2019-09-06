const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const moment = require("moment");

const { getAllUsers, updateUserById } = require("../../../storage.js");
const { bot, queueAdd } = require("../../../bot");

const texts = require("./timer-texts");

const STARTING_TIMER = [2, "hours"];
const EXTENDING_TIMER = [1, "hour"];
const EXTEND_AVAILABILITY_AFTER = [1, "hour"];

// const STARTING_TIMER = [20, "seconds"];
// const EXTENDING_TIMER = [10, "seconds"];
// const EXTEND_AVAILABILITY_AFTER = [10, "seconds"];

const sceneName = "PADAWAN_TIMER";
exports.createTimerScene = (scenes, back) => {
  function updateTimer(startTime) {
    const last = moment
      .duration(
        moment(startTime)
          .add(...STARTING_TIMER)
          .toDate() - Date.now()
      )
      .asMilliseconds();

    if (last <= 0) {
      return false;
    }

    return moment.utc(last).format("H:mm");
  }

  setInterval(async () => {
    const users = await getAllUsers();

    users
      .filter(userData => userData.timerId)
      .map(async userData => {
        const time = updateTimer(userData.startTime);
        if (!time) {
          await bot.telegram.deleteMessage(userData.user.id, userData.timerId);

          await updateUserById(userData.user.id, {
            timerId: null,
            startTime: null
          });

          await bot.telegram.sendMessage(
            userData.user.id,
            texts.messages.timeIsUp,
            Markup.inlineKeyboard([
              Markup.callbackButton(texts.buttons.back, `back`)
            ]).extra({ parse_mode: "HTML" })
          );

          return;
        }
        const isExtensionAvailable =
          moment
            .duration(
              moment(userData.startTime)
                .add(...EXTEND_AVAILABILITY_AFTER)
                .toDate() - Date.now()
            )
            .asSeconds() < 0;

        queueAdd(async () => {
          try {
            await bot.telegram.editMessageText(
              userData.user.id,
              userData.timerId,
              null,
              texts.messages.tick(time),
              Markup.inlineKeyboard(
                [
                  isExtensionAvailable &&
                    Markup.callbackButton(texts.buttons.extend, `extend`),
                  Markup.callbackButton(texts.buttons.cancel, `cancel`)
                ]
                  .filter(x => x)
                  .map(x => [x])
              ).extra({ parse_mode: "HTML" })
            );
          } catch (e) {}
        });
      });
  }, 1000);

  const scene = new Scene(sceneName);

  scene.enter(async ctx => {
    return ctx.addToQueue(async () => {
      if (!ctx.session.timerId) {
        ctx.session.startTime = Date.now();

        const message = await ctx.replyWithHTML(
          texts.messages.tick(updateTimer(ctx.session.startTime)),
          Markup.inlineKeyboard([
            Markup.callbackButton(texts.buttons.cancel, `cancel`)
          ]).extra()
        );
        ctx.session.timerId = message.message_id;
      }
    });
  });

  scene.action("cancel", async ctx => {
    await ctx.answerCbQuery("");
    ctx.session.timerId = null;
    ctx.session.startTime = null;
    back(ctx);
  });

  scene.action("back", async ctx => {
    await ctx.answerCbQuery();
    back(ctx);
  });

  scene.action("extend", async ctx => {
    await ctx.answerCbQuery(texts.messages.extended);
    ctx.session.startTime = moment(ctx.session.startTime)
      .add(...EXTENDING_TIMER)
      .toDate()
      .getTime();
  });

  scenes.push(scene);
  return scene;
};
