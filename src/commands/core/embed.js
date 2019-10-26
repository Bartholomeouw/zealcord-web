const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, prefix) => {
  if (!args[0]) {
    message.channel.send(` \`\`\`md
 Embed Command | by DwiiUnknown
 ${prefix}embed [option] #channel [Content]

 Options: basic, image, title

 Examples:
 basic - ${prefix}embed basic #chat-mod Hello
 image - ${prefix}embed image #chat-mod https://someimagelinkhere.com
 title - ${prefix}embed title #chat-mod Hello

 Note:
 - [] Hanya Penunjuk, jangan dimasukkan kedalam command.
 - Jika ada masalah segera hubungi DwiiUnknown#3704.
\`\`\` `);
  }

  if (args[0] === "basic") {
    args.shift();
    let chenel = message.mentions.channels.first();
    args.shift();
    let des2 = args.join(" ");

    if (!chenel)
      return message.reply(
        `Correct Usage: ${prefix}embed basic #channel [text]`
      );
    if (!des2)
      return message.reply(
        `Correct Usage: ${prefix}embed basic #channel [text]`
      );

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    let embed = new MessageEmbed()
      .setDescription(des2)
      .setColor(message.guild.me.displayHexColor);

    chenel.send(embed);
  }
  
  if (args[0] === "title") {
    args.shift();
    let chenel = message.mentions.channels.first();
    args.shift();
    let des2 = args.join(" ");

    if (!chenel)
      return message.reply(
        `Correct Usage: ${prefix}embed basic #channel [text]`
      );
    if (!des2)
      return message.reply(
        `Correct Usage: ${prefix}embed basic #channel [text]`
      );

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    let embed = new MessageEmbed()
      .setTitle(des2)
      .setColor(message.guild.me.displayHexColor);

    chenel.send(embed);
  }

  if (args[0] === "image") {
    args.shift();
    let chenel = message.mentions.channels.first();
    args.shift();
    let des = args.slice(0).join(" ");

    if (!chenel)
      return message.reply(
        `Correct Usage: ${prefix}embed image #channel [URL]`
      );
    if (!des)
      return message.reply(
        `Correct Usage: ${prefix}embed image #channel [URL]`
      );

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return;

    let embed = new MessageEmbed()
      .setImage(des)
      .setURL(des)
      .setColor(message.guild.me.displayHexColor);

    chenel.send(embed);
  }
};

exports.help = {
  name: "embed",
  description: "buat liat anu wkwkwkkw",
  usage: "embed <type> <#channel> <content>"
};

exports.conf = {
  aliases: ["emb"],
  cooldown: 1
};
