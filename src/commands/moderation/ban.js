const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, prefix) => {
if (!message.member.hasPermission("BAN_MEMBERS") && !message.member.hasPermission("ADMINISTRATOR")) {
 message.reply(`You don't have any permission for use this command. You need BAN_MEMBERS permission.`) } else {

let user = message.mentions.users.first()
args.shift()
let reason = args.join(" ");
if (!user) return message.reply("Please mention a user.")
if (!reason) return message.reply("Please include a reason.")

let modlogsChannel = message.guild.channels.find(x => x.name === "codmidbot-logs")
if (!modlogsChannel) return message.reply(`I can't found any channel named **mod-logs**. Please create one or type ${prefix}settings setup.`)

message.delete();

if (!message.guild.member(user.id).bannable) return message.reply(`I cannot ban that user.`);

message.channel.send(`**${user.tag}** has been Banned for **${reason}**.`);

user.send(`You has been Banned for **${reason}**`)

let embed1 = new MessageEmbed()
.setColor("RED")
.setThumbnail(user.displayAvatarURL())
.setAuthor("BANNED", message.author.displayAvatarURL())
.addField("User:", `${user.tag} (${user.id})`)
.addField("Moderator:", `${message.author.tag} (${message.author.id})`)
.addField("Reason:", reason)
.setTimestamp();

modlogsChannel.send(embed1);

message.guild.member(user.id).ban(7).catch(console.error);
}
}

exports.help = {
  name: 'ban',
  description: 'buat liat anu wkwkwkkw',
  usage: 'ban [user] [reason]'
}

exports.conf = {
  aliases: ['block'],
  cooldown: 1
}