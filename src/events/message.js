const { prefixes } = require('../config');

module.exports = async (client, message) => {
  if (message.author.bot || !message.guild) return;
  let msg = message.content.toLowerCase();
  
  let prefix = false;
for (const thisPrefix of prefixes) {
    if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
}
  
  if (message.content.startsWith(prefix) || msg.startsWith(`${client.user.toString()} `)) {
    try {
      require('../handler/cmdHandler')(client, message, prefix)
    } catch (e) {
      console.error(e)
    }
  }
}