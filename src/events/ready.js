const logger = require("../util/logger.js");
const config = require("../config");
const moment = require("moment");

module.exports = async client => {
  logger.info(
    "Events",
    process.pid,
    `${client.user.tag} is Online and Ready to use!`
  ); // eslint-disable-line

  function randomStatus() {
    const status = ["zealcord.xyz", "bin.zealcord.xyz", "api.zealcord.xyz"];
    const rstatus = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[rstatus], {
      type: "WATCHING"
    });
  }
  setInterval(randomStatus, 10000);
  client.user.setStatus("idle");
};
