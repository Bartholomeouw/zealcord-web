const { MessageEmbed } = require("discord.js");

exports.run = (client, message, args, prefix) => {
if (!message.member.hasPermission("MUTE_MEMBERS") && !message.member.hasPermission("MANAGE_GUILD") && !message.member.hasPermission("ADMINISTRATOR")) { 
message.reply(`You don't have any permission for use this command. You need MUTE_MEMBERS permission.`)} else {

let user = message.mentions.users.first();
args.shift()
if (!user) return message.reply("Please mention a user.")

let modlogsChannel = message.guild.channels.find(x => x.name === "codmidbot-logs")
if (!modlogsChannel) return message.reply(`I can't found any channel named **mod-logs**. Please create one or type ${prefix}settings setup.`)

let mutedRole = message.guild.roles.find(x => x.name === "Muted");
if (!message.guild.member(user.id).roles.has(mutedRole.id)) return message.reply("That user doesn't Muted.")

if (message.guild.member(user.id).roles.has(mutedRole.id)) {
  
    message.guild.member(user.id).roles.remove(mutedRole.id).catch(console.error);

message.delete();

message.channel.send(`**${user.tag}** has been Unmuted`);

user.send(`You has been Unmuted.`)

let embed1 = new MessageEmbed()
.setColor("YELLOW")
.setThumbnail(user.displayAvatarURL())
.setAuthor("UNMUTED", message.author.displayAvatarURL())
.addField("User:", `${user.tag} (${user.id})`)
.addField("Moderator:", `${message.author.tag} (${message.author.id})`)
.setTimestamp();

modlogsChannel.send(embed1);
}
}
}

exports.help = {
  name: 'unmute',
  description: 'buat liat anu wkwkwkkw',
  usage: 'unmute [user]'
}

exports.conf = {
  aliases: [''],
  cooldown: 1
}