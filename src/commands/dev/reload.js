const { MessageEmbed } = require("discord.js");
const { post } = require("snekfetch");

module.exports.run = async (client, message, args, prefix) => {
  if (!client.owners.includes(message.author.id)) return;
  if (!args.length) return message.channel.send("reload <category> <command>");
  const msgs = await message.channel.send("Please wait...");

  try {
    let command;
    if (client.commands.has(args[1])) {
      command = client.commands.get(args[1]);
    } else if (client.aliases.has(args[1])) {
      command = client.commands.get(client.aliases.get(args[1]));
    }
    if (!command)
      return message.channel.send(
        `The command \`${
          args[1]
        }\` doesn't seem to exist, nor is it an alias. Try again!`
      );
    if (command.db) await command.db.close();

    delete require.cache[
      require.resolve(`../../commands/${args[0]}/${command}.js`)
    ]; // eslint-disable-line
    const cmd = require(`../../commands/${args[0]}/${command}`);
    client.commands.delete(command);
    if (cmd.init) cmd.init(client);
    client.aliases.forEach((cmds, alias) => {
      if (cmds === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmd); // eslint-disable-line
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name);
    });

    return msgs.edit(`**The command \`${command}\` has been reloaded**`);
  } catch (e) {
    const embed = new MessageEmbed()
      .setTitle("Error")
      .setDescription(`\`\`\`js\n${e.stack}\`\`\``);
    msgs
      .edit(`Oh no an error occured :( try again later`, embed)
      .catch(console.error);
    console.log(e);
  }
};

module.exports.help = {
  name: "reload",
  description: "Reload the Bot",
  usage: "reload"
};

module.exports.conf = {
  aliases: ["rl", "reboot"],
  cooldown: 1
};
