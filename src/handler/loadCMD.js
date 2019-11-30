const { Collection } = require("discord.js");
const { join, resolve } = require("path");
const { readdirSync, statSync } = require("fs");
const logger = require("../util/logger.js");

const Commands = new Collection();
const Aliases = new Collection();
const Helps = new Collection();

let modules = readdirSync("./src/commands/").filter(x =>
  statSync(join("./src/commands", x)).isDirectory()
);

for (let module of modules) {
  logger.info("Load Modules", process.pid, `Loading ${module} modules...`);
  let moduleConf = require(`../commands/${module}/module.json`);
  moduleConf.path = `./src/commands/${module}`;
  moduleConf.cmds = [];
  Helps.set(module.toLowerCase(), moduleConf);

  let commandFiles = readdirSync(resolve(`./src/commands/${module}`))
    .filter(x => !statSync(resolve("./src/commands/", module, x)).isDirectory())
    .filter(x => x.endsWith(".js"));

  for (let file of commandFiles) {
    file = file.substr(0, file.length - 3);

    file = require(`../commands/${module}/${file}`);
    file.conf.module = moduleConf;
    file.conf.path = `./src/commands/${module}/${file}`;
    Commands.set(file.help.name.toLowerCase(), file);
    Helps.get(module.toLowerCase()).cmds.push(file.help.name);

    for (let alias of file.conf.aliases) {
      Aliases.set(alias.toLowerCase(), file.help.name);
    }
  }
}

exports.commands = Commands;
exports.aliases = Aliases;
exports.helps = Helps;
