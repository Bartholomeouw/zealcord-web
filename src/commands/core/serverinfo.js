const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args, prefix) => {

const emojis = ["⏪", "◀", "▶", "⏩"];

    const verificationLevels = ['**None** (Unrestricted)', '**Low** (Must have a verified email on their Discord account.)', '**Medium** (Must also be registered on Discord for longer than 5 Minutes.)', '**Hard** (Must also be a member of this server for longer than 10 Minutes.)', '**Very Hard** (Must have a verified phone on their Discord accounts.)'];
    const moment = require("moment");
    require("moment-duration-format");

         let region = {
            "brazil": ":flag_br: Brazil",
            "hongkong": ":flag_hk: Hongkong",
            "japan": ":flag_jp: Japan",
            "london": ":flag_gb:London",
            "russia": ":flag_ru: Russian",
            "sydney": ":flag_au: Sydney",
            "singapore": ":flag_sg: Singapore",
            "eu-central": ":flag_eu: Central Europe",
            "eu-west": ":flag_eu: Western Europe",
            "us-central": ":flag_us: U.S. Central",
            "us-south": ":flag_us: U.S. South",
            "us-east": ":flag_us: U.S. East",
            "us-west": ":flag_us: U.S. West"
         }
  
         let TextChannels = message.guild.channels.filter(e => e.type !== 'voice').size;
         let VoiceChannels = message.guild.channels.filter(e => e.type === 'voice').size;
         let CategoryChannels = message.guild.channels.filter(e => e.type === 'category').size;
         let onlinem = message.guild.members.filter(m => m.presence.status === 'online').size.toLocaleString();
         let offlinem = message.guild.members.filter(m => m.presence.status === 'offline').size.toLocaleString();
         let unique = message.guild.members.filter(m => m.presence.status !== 'offline' && m.presence.status !== 'online').size.toLocaleString();
         let idlem = message.guild.members.filter(m => m.presence.status === 'idle').size;
         let disturbm = message.guild.members.filter(m => m.presence.status === 'dnd').size;
  
         let emon = "<:online:533490885879660544>"
         let emid = "<:idle:533490897208344586>"
         let emdnd = "<:dnd:533490908964847646>"
         let emoff = "<:invisible:533490919585087499>"
  
         let sicon = message.guild.iconURL;
         if (!args[0]) {
         let serverembed = new MessageEmbed()
         .setAuthor("Server Information.")
         .setDescription(`Name: **${message.guild.name}**\nID: **${message.guild.id}**`)
         .addField("Verification Levels",`${verificationLevels[message.guild.verificationLevel]}`)
         .addBlankField()
         .addField("Region", `• **${region[message.guild.region]}**`, true)
         .addField("Roles Count", `• **${message.guild.roles.size} Roles**`, true)
         .addField(`Channel Count [${message.guild.channels.size}]`, `• **${CategoryChannels}** Category\n• **${TextChannels}** Text\n• **${VoiceChannels}** Voice`, true)
         .addField(`Member Count  [${message.guild.memberCount}]`, `• ${emon} **${unique}** ${emid} **${idlem}**\n• ${emdnd} **${disturbm}** ${emoff} **${offlinem}**`, true)
         .addField("Server Owner", `• **<@${message.guild.owner.user.id}> | ${message.guild.owner.user.tag}**`, true)
         .addField("Created At", `• **${moment.utc(message.guild.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}**`, true)
         .addBlankField()
         .addField("More...", "You can type `/server avatar` to show the **Server Icon** with high resolution.")
         .setTimestamp()
         .setThumbnail(`${message.guild.iconURL()}`)
         .setColor(message.guild.me.displayHexColor)
         return message.channel.send(serverembed);
         }
  
  
         if (args[0] == "avatar") {
         let avaServer = new MessageEmbed()
         .setAuthor(`${message.guild.name} Server Icon.`)
         .setDescription(`**[Picture Link](${message.guild.iconURL()})**`)
         .setImage(`${message.guild.iconURL()}?size=2048`)
         .setColor(message.guild.me.displayHexColor)
         return message.channel.send(avaServer);
         }
}
exports.help = {
  name: 'serverinfo',
  description: 'buat liat anu wkwkwkkw',
  usage: 'serverinfo'
}

exports.conf = {
  aliases: ['server'],
  cooldown: 1
}