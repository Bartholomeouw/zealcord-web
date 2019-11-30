const NewClient = require("./handler/Client.js");
const client = new NewClient({
  fetchAllMember: false,
  disableEveryone: true
});
let request = require("request");
require("./handler/events")(client);
var express = require("express");
var http = require("http");
var app = express();

app.use(express.static("views"));
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

app.get("/", (req, res) => {
  res.status(200);
  res.render("index.ejs", {
    bot: client,
    path: req.path
  });
});
app.get("/staff", (req, res) => {
  res.render("staff.ejs", {
    bot: client,
    path: req.path
  });
});
app.get("/dwii", (req, res) => {
  res.render("dwii.ejs", {
    bot: client,
    path: req.path
  });
});
request("https://app.zealcord.xyz/api/bots", function(err, response, body) {
  if (err) {
    console.log(err);
  }
  body = JSON.parse(body);

  app.get("/bots/:page", async (req, res) => {
    if (client.maintenance.get("botlist") === true) res.render("404.ejs");
    if (!req.params.page) {
      res.redirect("/bots/1");
    } else {
      res.render("botlist.ejs", {
        bot: client,
        path: req.path,
        req: req,
        res: res,
        zealcord: await client.zealcord,
       body: body
      });
    }
  });

  app.get("/bots", async (req, res) => {
    if (client.maintenance.get("botlist") === true) res.render("404.ejs");
    res.redirect("/bots/1");
  });

  app.get("/bot", async (req, res) => {
    if (client.maintenance.get("botlist") === true) res.render("404.ejs");
    res.redirect("/bots/1");
  });

  app.get("/bot/:botID/", async (req, res) => {
    if (client.maintenance.get("botlist") === true) res.render("404.ejs");
    if (
      !client.users.get(req.params.botID).bot ||
      !client.users.get(req.params.botID)
    )
      res.redirect("/bots/1");
    res.render("bots.ejs", {
      bot: client,
      path: req.path,
      req: req,
      zealcord: await client.zealcord,
      body: body
    });
  });
});
app.get("/discord", (req, res) => {
  res.status(200);
  res.redirect("https://discordapp.com/invite/nEFuEvA");
});
app.get("/mee6", (req, res) => {
  res.status(200);
  res.redirect("https://bit.ly/zcRanks");
});
app.get("/leaderboard", (req, res) => {
  res.status(200);
  res.redirect("https://bit.ly/zcRanks");
});
var listener = app.listen(process.env.PORT, function() {
  console.log("Listening to the Port: " + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.login(process.env.SECRET); //astagfirullah
