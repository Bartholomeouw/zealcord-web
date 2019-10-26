const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {

          let trufal = {
            "true": "Beep Boop, Boop Beep?",
            "false": "Im Human."
        }

        let status = { 
            "online": "<:online:533490885879660544",
            "idle": "<:idle:533490897208344586>",
            "dnd": "<:dnd:533490908964847646>",
            "offline": "<:invisible:533490919585087499>",
            "invisible": "<:invisible:533490919585087499>"
        }
        
        let user;
    if (message.mentions.users.first() || message.guild.members.get(args[0])) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user)
    const embed = new MessageEmbed()
        .setAuthor("User Info.")
        .addField("Name", `• **${user.tag}**`, true)
        .addField("ID", `**• ${user.id}**`, true)
        .addField("Type", `• **${trufal[user.bot]}**`, true)
        .addField("Status", `• **${user.presence.game ? user.presence.game.name : "Nothing."}**`, true)
        .addField("Roles", member.roles.map(roles => `**${roles}**`).join(', '), true)
        .addField("Created At", `• ${user.createdAt}`, true)
        .setTimestamp()
        .setThumbnail(user.avatarURL())
        .setColor(message.guild.me.displayHexColor)
         message.channel.send({embed});
  
}

exports.help = {
  name: 'userinfo',
  description: 'buat liat anu wkwkwkkw',
  usage: 'userinfo'
}

exports.conf = {
  aliases: ['user'],
  cooldown: 1
}