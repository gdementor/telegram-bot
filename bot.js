const Telegraf = require("telegraf");
const { default: PQueue } = require("p-queue");

const queue = new PQueue({ concurrency: 1, timeout: 35 });

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.context.addToQueue = queue.add.bind(queue);

exports.bot = bot;
exports.queueAdd = queue.add.bind(queue);
