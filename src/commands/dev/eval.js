const { MessageEmbed } = require("discord.js");
const { post } = require("snekfetch");

module.exports.run = async (client, message, args, prefix) => {

  client.owners.forEach(async function (owner) {
    if (message.author.id !== owner) return;

    const embed = new MessageEmbed()
      .setColor(message.guild.member(client.user.id).displayHexColor)
      .addField("Input", "```js\n" + args.join(" ") + "```")

    try {
      const code = args.join(" ");
      if (!code) return;
      let evaled;
      if (code.includes(`token`)) {
        evaled = "My Token";
      } else {
        evaled = eval(code);
      }

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled, {
          depth: 0
        });

      let output = clean(evaled);
      if (output.length > 1024) {
        const {
          body
        } = await post("https://bin.zealcord.xyz/documents").send(output);
        embed.addField("Output", `**https://bin.zealcord.xyz/${body.key}.js**`);
      } else {
        embed.addField("Output", "```js\n" + output + "```");
      }
      message.channel.send(embed);
    } catch (e) {
      let error = clean(e);
      if (error.length > 1024) {
        const {
          body
        } = await post("https://bin.zealcord.xyz/documents").send(error);
        embed.addField("Error", `**https://bin.zealcord.xyz/${body.key}.js**`);
      } else {
        embed.addField("Error", "```js\n" + error + "```");
      }
      message.channel.send(embed);
    }
  });
}

function clean(text) {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
};

exports.help = {
  name: "eval",
  description: "Evaluate the Bot",
  usage: "eval"
};

exports.conf = {
  aliases: ["ev", "e"],
  cooldown: 1
};