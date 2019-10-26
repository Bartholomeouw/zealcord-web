let { Client, Collection } = require('discord.js');
const modules = require('./loadCMD');
//const Enmap = require("enmap");
const db = require("quick.db");

module.exports = class CODMIndonesia extends Client {
  constructor(...args) {
    super(...args);
    
    this.commands = modules.commands;
    this.aliases = modules.aliases;
    this.helps = modules.helps;
    this.owners = ['304377187057008645'];
  }
  
 

timeString(ms, msg, forceHours = false) {
  let seconds = parseInt(msg/1000 % 60);
  let hours = parseInt(ms/1000 % 86400 / 3600);
  let minutes = parseInt(ms/1000  % 3600 / 60);
  if (isNaN(seconds) === false) {
    return `${forceHours || hours >= 1 ? `${hours > 9 ? hours : `0${hours}`}:` : ''}${hours >= 1 ? `0${minutes}`.slice(-2) : `${minutes > 9 ? minutes : `0${minutes}`}`}:${`0${Math.floor(seconds % 60)}`.slice(-2)}`;
  } else {
    return `LIVE`
  }
}


parseDur(ms){
  let seconds = ms / 1000;
  let days    = parseInt(seconds / 86400);
      seconds = seconds % 86400;
  let hours   = parseInt(seconds / 3600);
      seconds = seconds % 3600;
  let minutes = parseInt(seconds / 60);
      seconds = parseInt(seconds % 60);
  if (days) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  else if (hours) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  else if (minutes) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
  
shuffle(array){
	const arr = array.slice(0);
	for(let i = arr.length -1; i >= 0; i--){
		const j = Math.floor(Math.random() * (i + 1));
		const temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
	return arr;
}

chunk (array, chunkSize){
    const temp = [];
    for(let i = 0; i < array.length; i+= chunkSize){
      temp.push(array.slice(i, i+chunkSize));
    }
    return temp;
  }
}