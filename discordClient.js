let { Client, Collection } = require('discord.js');

module.exports = class WebClient extends Client {
  constructor(...args) {
    super(...args);
  
    this.owners = ['304377187057008645'];
    this.version = "WebClient v0.0.1 by DwiiUnknown#3704";
  }
}