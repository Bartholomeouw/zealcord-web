const { Collection } = require("discord.js");
const cooldowns = new Collection();

module.exports = async (client, message, prefix) => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  const cmdFile =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!cmdFile) return;
  if (!cooldowns.has(cmdFile.help.name)) {
    cooldowns.set(cmdFile.help.name, new Collection());
  }
  const member = message.member; // eslint-disable-line
  const now = Date.now();
  const timestamps = cooldowns.get(cmdFile.help.name);
  const cooldownAmount = (cmdFile.conf.cooldown || 2) * 1000;
  if (!timestamps.has(member.id)) {
    timestamps.set(member.id, now);
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel
        .send(
          `Sorry **${member.user.username}**, please wait **${timeLeft.toFixed(
            1
          )}** Seconds to try again!`
        )
        .then(msg => msg.delete(expirationTime - now + 3000))
        .catch(() => {}); // eslint-disable-line
    }
    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  try {
    var commands = // eslint-disable-line
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    commands.run(client, message, args, prefix);
    if (!commands) return;
  } catch (e) {
    console.error(e);
  } finally {
    console.info(
      `[${message.guild.name}](${message.guild.id}/#${message.channel.name}) ${message.author.tag}(${message.author.id}): ${commands.help.name}`
    );
  }
};
