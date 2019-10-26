const { MessageEmbed } = require('discord.js');
const { post } = require('snekfetch');

exports.run = async (client, message, args, prefix) => {
  if (!client.owners.includes(message.author.id)) return;
  if(!args.length) return message.channel.send("reload <category> <command>");
  let msgs = await message.channel.send('Please wait...');

  try {
    let command;
    if (client.commands.has(args[1])) {
      command = client.commands.get(args[1]);
    } else if (client.aliases.has(args[1])) {
      command = client.commands.get(client.aliases.get(args[1]));
    }
    if(!command) return message.channel.send(`The command \`${args[1]}\` doesn't seem to exist, nor is it an alias. Try again!`);

    if(command.db) await command.db.close();

    command = command.help.name;

    delete require.cache[require.resolve(`../../commands/${args[0]}/${command}.js`)];
    let cmd = require(`../../commands/${args[0]}/${command}`);
    client.commands.delete(command);
    if(cmd.init) cmd.init(client);
    client.aliases.forEach((cmd, alias) => {
      if (cmd === command) client.aliases.delete(alias);
    });
    client.commands.set(command, cmd);
    cmd.conf.aliases.forEach(alias => {
      client.aliases.set(alias, cmd.help.name);
    });

    return msgs.edit(`**The command \`${command}\` has been reloaded**`);
  } catch(e) {
    let embed = new MessageEmbed()
    .setTitle('Error')
    .setDescription(`\`\`\`js\n${e.stack}\`\`\``)
    msgs.edit(`Oh no an error occured :( try again later`, embed).catch(console.error);
    console.log(e);
  }
}

exports.help = {
  name: 'reload',
  description: 'Evaluate!!!',
  usage: 'eval'
}

exports.conf = {
  aliases: ['rl'],
  cooldown: 1
}