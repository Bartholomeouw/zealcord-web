let { Client, Collection } = require("discord.js");

module.exports = class WebClient extends Client {
  constructor(...args) {
    super(...args);

    this.owners = ["319872685897416725", "390045370240991234", "304377187057008645", "290159952784392202"];
    this.version = "WebClient v0.0.1 by Zealcord Development Team";
  }
}