const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, prefix) => {
if (!message.member.hasPermission("MANAGE_MESSAGE") && !message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")) {
 message.reply(`You don't have any permission for use this command. You need MANAGE_MESSAGE permission`)} else {

let user = message.mentions.users.first();
args.shift()
let reason = args.join(" ");
if (!user) return message.reply("Please mention a user.")
if (!reason) return message.reply("Please include a reason.")

let modlogsChannel = message.guild.channels.find(x => x.name === "codmidbot-logs")
if (!modlogsChannel) return message.reply(`I can't found any channel named **mod-logs**. Please create one or type ${prefix}settings setup.`)

message.delete();

message.channel.send(`**${user.tag}** has been Warned for **${reason}**.`);

user.send(`You has been Warned for **${reason}**`)

let embed1 = new MessageEmbed()
.setColor("ORANGE")
.setThumbnail(user.displayAvatarURL())
.setAuthor("WARNED", message.author.displayAvatarURL())
.addField("User:", `${user.tag} (${user.id})`)
.addField("Moderator:", `${message.author.tag} (${message.author.id})`)
.addField("Reason:", reason)
.setTimestamp();

modlogsChannel.send(embed1);
}
}

exports.help = {
  name: 'warn',
  description: 'buat liat anu wkwkwkkw',
  usage: 'warn [user] [reason]'
}

exports.conf = {
  aliases: [''],
  cooldown: 1
}