const { Collection, MessageEmbed } = require('discord.js');
const cooldowns = new Collection();

module.exports = async (client, message, prefix) => {
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let cmdFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (!cmdFile) return
  if (!cooldowns.has(cmdFile.help.name)) {
    cooldowns.set(cmdFile.help.name, new Collection())
  }
  let member = message.member
  let now = Date.now()
  let timestamps = cooldowns.get(cmdFile.help.name)
  let cooldownAmount = (cmdFile.conf.cooldown || 2) * 1000
  if (!timestamps.has(member.id)) {
    timestamps.set(member.id, now)
  } else {
    let expirationTime = timestamps.get(member.id) + cooldownAmount
    if (now < expirationTime) {
      let timeLeft = (expirationTime - now) / 1000
      return message.channel.send(`⏱ **|** Sorry **${member.user.username}**, Please wait **${timeLeft.toFixed(1)}** seconds to try again!`).then(msg => msg.delete(expirationTime - now + 3000)).catch(() => {})
    }
    timestamps.set(member.id, now)
    setTimeout(() => timestamps.delete(member.id), cooldownAmount)
  }
  
  try {
    var commands = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
    commands.run(client, message, args, prefix)
    if (!commands) return
  } catch (e) {
    console.error(e)
  } finally {
    console.info(`[${message.guild.name}](${message.guild.id}/#${message.channel.name}) ${message.author.tag}(${message.author.id}): ${commands.help.name}`)
  }
}