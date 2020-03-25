let { Client, Collection } = require("discord.js");

module.exports = class WebClient extends Client {
  constructor(...args) {
    super(...args);

    this.owners = ["304377187057008645", "390045370240991234"];
    this.version = "WebClient v0.0.1 by Zealcord";
  }
}