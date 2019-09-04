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
  const sessions = localSession.DB.get("sessions");

  for (const session of sessions.value()) {
    const [id] = session.id.split(":");

    if (id === userId) {
      return session.data;
    }
  }
  return null;
};

const debouncedSave = _.debounce(() => {
  localSession.DB.write();
}, 250);
exports.updateUserById = async (userId, data) => {
  Object.assign(exports.getUserById(userId), data);
  debouncedSave();
};
