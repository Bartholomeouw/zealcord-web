const chalk = require("chalk");

class Logger {
  static info(name, pid, message) {
    return console.info(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(name)}||${chalk.red(pid)}] ${chalk.green(
        " INFO : "
      )} ${message}`
    );
  }

  static debug(name, pid, message) {
    return console.debug(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} [${chalk.magenta(name)}||${chalk.red(pid)}] ${chalk.blue(
        " DEBUG : "
      )} ${message}`
    );
  }

  static error(reason) {
    return console.error(
      `${chalk.red(
        `[${new Date()
          .toString()
          .split(" ", 5)
          .join(" ")}]`
      )} ${chalk.red(" ERROR : ")} ${reason}`
    );
  }
}

module.exports = Logger;
