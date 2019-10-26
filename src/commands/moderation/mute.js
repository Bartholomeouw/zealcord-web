const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args, prefix) => {
if (!message.member.hasPermission("MUTE_MEMBERS") && !message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")) {
message.reply(`You don't have any permission for use this command. You need MUTE_MEMBERS permission.`)} else {

let user = message.mentions.users.first();
args.shift()
let reason = args.join(" ");
if (!user) return message.reply("Please mention a user.")
if (!reason) return message.reply("Please include a reason.")

let modlogsChannel = message.guild.channels.find(x => x.name === "codmidbot-logs")
if (!modlogsChannel) return message.reply(`I can't found any channel named **mod-logs**. Please create one or type ${prefix}settings setup.`)

let mutedRole = message.guild.roles.find(x => x.name === "Muted");

if (!message.guild.member(user.id).bannable) return message.reply(`I cannot mute that user.`);

if (message.guild.member(user.id).roles.has(mutedRole.id)) return message.reply("That user already Muted.")

if (!message.guild.member(user.id).roles.has(mutedRole.id)) {
  
    message.guild.member(user.id).roles.add(mutedRole.id).catch(console.error);

message.delete();

message.channel.send(`**${user.tag}** has been Muted for **${reason}**.`);

user.send(`You has been Muted for **${reason}**, please ask ${message.author.tag} for unmute.`)

let embed1 = new MessageEmbed()
.setColor("YELLOW")
.setThumbnail(user.displayAvatarURL())
.setAuthor("MUTED", message.author.displayAvatarURL())
.addField("User:", `${user.tag} (${user.id})`)
.addField("Moderator:", `${message.author.tag} (${message.author.id})`)
.addField("Reason:", reason)
.setTimestamp();

modlogsChannel.send(embed1);
}
}
}

exports.help = {
  name: 'mute',
  description: 'buat liat anu wkwkwkkw',
  usage: 'mute [user] [reason]'
}

exports.conf = {
  aliases: [''],
  cooldown: 1
}