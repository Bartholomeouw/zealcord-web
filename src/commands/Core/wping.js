const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  try {
    const msg = await message.channel.send(
      `**${message.member.displayName}**...`
    );

    const pingEmbed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor)
      .setDescription(`${msg.createdTimestamp - message.createdTimestamp}`)
      .addField(`💓 API Latency`, `**${client.ws.ping.toFixed(2)}ms**`);
    return msg.edit(pingEmbed);
  } catch (e) {
    return;
  }
};

module.exports.help = {
  name: "wping",
  description: "Shows you how long the Bot needs to send a message",
  usage: "wping"
};

module.exports.conf = {
  aliases: ["wpong"],
  cooldown: 5
};
