const { Client } = require("discord.js");
const modules = require("./loadCMD");
const db = require("quick.db");
const Zeal = require("zealcord.js");
// const zealcord = new Zeal(
//  process.env.ZTOKEN,
//  "560832588470812673",
//  "513765406662459398"
// );

module.exports = class Zealcord extends Client {
  // eslint-disable-line
  constructor(...args) {
    super(...args);

    this.commands = modules.commands;
    this.aliases = modules.aliases;
    this.helps = modules.helps;
    this.maintenance = new db.table("maintenance"); // eslint-disable-line
    this.owners = ["569874192733044747", "304377187057008645"];
    // this.zealcord = zealcord;
  }

  timeString(ms, msg, forceHours = false) {
    const seconds = parseInt((msg / 1000) % 60);
    const hours = parseInt(((ms / 1000) % 86400) / 3600);
    const minutes = parseInt(((ms / 1000) % 3600) / 60);
    if (isNaN(seconds) === false) {
      return `${
        forceHours || hours >= 1 ? `${hours > 9 ? hours : `0${hours}`}:` : ""
      }${
        hours >= 1
          ? `0${minutes}`.slice(-2)
          : `${minutes > 9 ? minutes : `0${minutes}`}`
      }:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
    } else {
      return `LIVE`;
    }
  }

  parseDur(ms) {
    let seconds = ms / 1000;
    const days = parseInt(seconds / 86400);
    seconds = seconds % 86400; // eslint-disable-line
    let hours = parseInt(seconds / 3600); // eslint-disable-line
    seconds = seconds % 3600; // eslint-disable-line
    const minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60);
    if (days) {
      return `${days}D ${hours}H ${minutes}M ${seconds}S`;
    } else if (hours) {
      return `${hours}H ${minutes}M ${seconds}S`;
    } else if (minutes) {
      return `${minutes}M ${seconds}S`;
    }
    return `${seconds}S`;
  }

  shuffle(array) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  chunk(array, chunkSize) {
    const temp = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      temp.push(array.slice(i, i + chunkSize));
    }
    return temp;
  }
};
