var express = require('express');
var router = express.Router();
let request = require("request");

const NewClient = require('../discordClient.js');
const client = new NewClient({
  fetchAllMember: true,
  disableEveryone: false
});

client.on("ready", () => {
  console.log(`Client Loaded.. ${client.user.id}`);
})

client.login(process.env.SECRET);

request("https://app.zealcord.xyz/api/bots", function (err, response, body) {
  if (err) {
    console.log(err);
  }
  //  body = JSON.parse(body);

  /* GET home page. */
  router.get('/bots/:page', function (req, res, next) {
    res.render('botlist', {
      title: 'Zealcord Nation',
      bot: client,
      req: req,
      res: res,
      // body: body
    });
  });

  router.get('/bots', function (req, res, next) {
    res.redirect("/bots/1")
  });

  router.get('/bot/:botID', function (req, res, next) {
    res.render('bot', {
      title: 'Zealcord Nation',
      bot: client,
      req: req,
      res: res,
      // body: body
    });
  });

  router.get('/bot', function (req, res, next) {
    res.redirect("/bots/1")
  });

});

module.exports = router;