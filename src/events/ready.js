const logger = require("../util/logger.js");
const config = require("../config");
const moment = require("moment");

module.exports = async client => {
  logger.info("Events", process.pid, "The Bot is ready! " + client.user.id);

  function randomStatus() {
    // let status = ["Maintenance", "Mohon bersabar..."]
    // let status = [`Pukul ${moment().utcOffset("+0700").format("HH:mm")} WIB`, `Pukul ${moment().utcOffset("+0800").format("HH:mm")} WITA`, `Pukul ${moment().utcOffset("+0900").format("HH:mm")} WIT`]
    let status = ["zealcord.xyz", "api.zealcord.xyz", "bin.zealcord.xyz", "mc.zealcord.xyz"];
    let rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], {
      type: "WATCHING"
    });
  }
  setInterval(randomStatus, 10000);
  client.user.setStatus("idle");
};