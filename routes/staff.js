var express = require('express');
var router = express.Router();

const NewClient = require('../discordClient.js');
const client = new NewClient({
  fetchAllMember: true,
  disableEveryone: false
});

client.on("ready", () => {
  console.log(`Client Loaded.. ${client.user.id}`);
})

client.login(process.env.SECRET);

router.get('/staff', async function (req, res, next) {

  res.render('stafflist', {
    title: 'Zealcord Nation',
    bot: client,
    req: req,
    res: res,
  });
});

module.exports = router;
