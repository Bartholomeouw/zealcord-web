var express = require('express');
var router = express.Router();

router.get('/staff', async function (req, res, next) {

  res.render('stafflist', {
    title: 'Zealcord Nation',
    req: req,
    res: res,
  });
});

module.exports = router;