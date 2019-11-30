const Discord = require("discord.js");

module.exports = async (client, message) => {
    let member = message;
    // Channel Stats
    let guild = member.guild;
    if (guild.id == "332877090003091456") {
        let count = guild.memberCount;
        let total = guild.channels.get("615582522599800833");
        // let uCount = guild.channels.get("432245534380785675");
        // let bCount = guild.channels.get("597065387422777356");

        total.setName(`Members Count: ${count}`);
        // uCount.setName(`User Count: ${guild.members.filter(m => !m.user.bot).size}`);
        // bCount.setName(`Bot Count: ${guild.members.filter(m => m.user.bot).size}`);
    };

    if (guild.id == "591574551339728902") {
        let count = guild.memberCount;
        // let total = guild.channels.get("615582522599800833");
        // let uCount = guild.channels.get("432245534380785675");
        let bCount = guild.channels.get("597065387422777356");

        // total.setName(`Members Count: ${count}`);
        // uCount.setName(`User Count: ${guild.members.filter(m => !m.user.bot).size}`);
        bCount.setName(`Bot Count: ${guild.members.filter(m => m.user.bot).size}`);
    }
    console.log("[EVENT] guildMemberRemove events has been launched");
};