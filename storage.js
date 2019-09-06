const _ = require("lodash");
const LocalSession = require("telegraf-session-local");

const localSession = new LocalSession({ storage: LocalSession.storageMemory });

exports.localSession = localSession;
exports.getAllUsers = async () => {
  const sessions = localSession.DB.get("sessions");

  const result = [];

  for (const session of sessions.value()) {
    result.push({ ...session.data });
  }

  return result;
};

exports.getUserById = async userId => {
  const userSession = localSession.DB.get("sessions")
    .getById(`${userId}:${userId}`)
    .value();
  return userSession ? userSession.data : null;
};

const debouncedSave = _.debounce(() => {
  localSession.DB.write();
}, 100);
exports.updateUserById = async (userId, data) => {
  Object.assign(await exports.getUserById(userId), data);
  debouncedSave();
};
