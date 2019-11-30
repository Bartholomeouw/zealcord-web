const logger = require("../util/logger.js");
const config = require("../config");
const moment = require("moment");

module.exports = async client => {
  logger.info("Events", process.pid, "The Bot is ready! " + client.user.id); // eslint-disable-line

  function randomStatus() {
    const status = ["zealcord.xyz", "app.zealcord.xyz", "bin.zealcord.xyz"];
    const rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], {
      type: "WATCHING"
    });
  }
  setInterval(randomStatus, 10000);
  client.user.setStatus("idle");
};
