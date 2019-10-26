const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  if (args[0] === "server") {
    const avaServer = new MessageEmbed()
      .setAuthor(`${message.guild.name} Server Icon.`)
      .setDescription(`**[Picture Link](${message.guild.iconURL()})**`)
      .setColor(message.guild.me.displayHexColor)
      .setImage(`${message.guild.iconURL()}?size=2048`);
    message.channel.send(avaServer);
  } else {
    const member =
      message.mentions.members.first() ||
      message.guild.members.get(args[0]) ||
      message.member;
    if (!member) return message.reply("Please **@mention** someone.");
    let ava = member.user.displayAvatarURL();
    const embed = new MessageEmbed()
      .setAuthor(`${member.user.username}'s Avatar.`)
      .setDescription(`**[Picture Link](${ava})**`)
      .setColor(message.guild.me.displayHexColor)
      .setImage(ava + "?size=2048");
    if (ava.split(".").pop() === "gif") {
      embed.setDescription(`**[Picture Link](${ava}?size=2048)**`);
      embed.setImage(`${ava}?size=2048`);
      return message.channel.send(embed);
    }
    return message.channel.send(embed);
  }
};
exports.help = {
  name: "avatar",
  description: "buat liat anu wkwkwkkw",
  usage: "avatar"
};

exports.conf = {
  aliases: ["ava"],
  cooldown: 3
};
