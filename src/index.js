const express = require("express");
const { text, json } = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const http = require("http");
const ZealCord = require("./handler/Client");
const client = new ZealCord({
  fetchAllMember: false,
  disableEveryone: true
});

app.set("trust proxy", true);
app.engine("html", (path, data, cb) => {
  require("ejs").renderFile(
    path,
    data,
    {
      async: true
    },
    cb
  );
});
app.set("view engine", "html");
app.use(text({ limit: "50mb" }));
app.use(json({ limit: "50mb" }));

app.listen(PORT, () => {
  console.log(
    `[DEBUG] [${new Date()
      .toString()
      .split(" ", 5)
      .join(" ")}] Server is now listening on: ${PORT}`
  ); // eslint-disable-line
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 270000);

require("./handler/Website")(client, express, app);
require("dotenv").config(); // eslint-disable-line
require("./handler/events")(client);

client.login(process.env.SECRET);
