const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {
  let help = client.helps

  if (!args[0]){
  let embed = new MessageEmbed()
  .setAuthor(`${client.user.username} Commands`, client.user.displayAvatarURL())
  .setColor(message.guild.me.displayHexColor)
  .setDescription("My Prefix is **/**. This bot is still under development! \n If you found any issue with this bot, please tell DwiiUnknown#3704")
  .addField(`**${help.get('core').name}**`, help.get("core").cmds.map((item) => `\`${item}\``).join(", "))
  .addField(`**${help.get('leveling').name}**`, help.get("leveling").cmds.map((item) => `\`${item}\``).join(", "))
  .addField(`**${help.get('moderation').name}**`, help.get("moderation").cmds.map((item) => `\`${item}\``).join(", "))
  .addField(`**${help.get('music').name}**`, help.get("music").cmds.map((item) => `\`${item}\``).join(", "))
  .setTimestamp()
  
  message.channel.send({ embed: embed })
 }

if (args[0]) {
  
  
  
}
}
exports.help = {
  name: 'help',
  description: 'buat liat anu wkwkwkkw',
  usage: 'help'
}

exports.conf = {
  aliases: ['h', 'cmds', 'cmd'],
  cooldown: 1
}