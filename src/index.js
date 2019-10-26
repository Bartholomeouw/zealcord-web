const NewClient = require("./handler/Client.js");
const client = new NewClient({
  fetchAllMember: false,
  disableEveryone: true
});

require("./handler/events")(client);
var express = require("express");
var http = require("http");
var app = express();

app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.get("/", (req, res) => {
  res.status(200);
  res.render("index.ejs", { bot: client, path: req.path });
});
app.get("/staff", (req, res) => {
  res.render("test.ejs", { bot: client, path: req.path });
});
app.get("/dwii", (req, res) => {
  res.render("test.ejs", { bot: client, path: req.path });
});
var listener = app.listen(process.env.PORT, function() {
  console.log("Listening to the Port: " + listener.address().port);
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.login(process.env.SECRET);
