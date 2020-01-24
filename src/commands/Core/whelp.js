const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  const help = client.helps;

  if (!args[0]) {
    const embed = new MessageEmbed()
      .setAuthor(
        `${client.user.username} Commands`,
        client.user.displayAvatarURL()
      )
      .setColor(message.guild.me.displayHexColor)
      .setDescription(
        "My Prefix is **`$`**. This Bot is still under development!\n If you found any issue with this Bot, please tell DwiiUnknown#3704"
      )
      .addField(
        `**${help.get("core").name}**`,
        help
          .get("core")
          .cmds.map(item => `\`${item}\``)
          .join(", ")
      )
      .addField(
        `**${help.get("dev").name}**`,
        help
          .get("dev")
          .cmds.map(item => `\`${item}\``)
          .join(", ")
      )
      .setTimestamp();

    message.channel.send({
      embed: embed
    });
  }
};

module.exports.help = {
  name: "whelp",
  description: "Show the Commands",
  usage: "whelp"
};

module.exports.conf = {
  aliases: ["wh", "wcmd", "wcmds"],
  cooldown: 3
};
