const { MessageEmbed } = require("discord.js");
const { post } = require("snekfetch");

module.exports.run = async (client, message, args, prefix) => {
  client.owners.forEach(async owner => {
    if (message.author.id !== owner) return;

    const embed = new MessageEmbed()
      .setColor(message.guild.member(client.user.id).displayHexColor)
      .addField("Input", `\`\`\`js\n${args.join}\n\`\`\``);

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

      const output = clean(evaled);
      if (output.length > 1024) {
        const { body } = await post("https://bin.zealcord.xyz/documents").send(
          output
        );
        embed.addField("Output", `**https://bin.zealcord.xyz/${body.key}.js**`);
      } else {
        embed.addField("Output", `\`\`\`\n${output}\`\`\``);
      }
      message.channel.send(embed);
    } catch (e) {
      const error = clean(e);
      if (error.length > 1024) {
        const { body } = await post("https://bin.zealcord.xyz/documents").send(
          error
        );
        embed.addField("Error", `**https://bin.zealcord.xyz/${body.key}.js**`);
      } else {
        embed.addField("Error", `\`\`\`js\n${error}\`\`\``);
      }
      message.channel.send(embed);
    }
  });
};

function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, `\`${String.fromCharCode(8203)}`)
      .replace(/@/g, `@${String.fromCharCode(8203)}`);
  // eslint-disable-line
  else return text;
}

module.exports.help = {
  name: "weval",
  description: "Evaluate to the Bot",
  usage: "weval"
};

module.exports.conf = {
  aliases: ["website-eval", "wev"],
  cooldown: 1
};
