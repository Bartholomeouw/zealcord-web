const RoutesHandler = require("./RoutesHandler");

const HTTP = async (client, Express, App) => {
  const Router = Express.Router(); // eslint-disable-line
  App.use("/assets", Express.static(process.cwd() + "/src/assets")); // eslint-disable-line
  App.use("/", Router);
  RoutesHandler(client, Router); // eslint-disable-line
};

module.exports = HTTP;
