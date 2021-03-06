var express = require("express");
var fs = require("fs");

var router = express.Router();
var content = fs.readFileSync(".glitch-assets", "utf8");
var rows = content.split("\n");
var assets = rows.map((row) => {
    try {
        return JSON.parse(row);
    } catch (e) {}
});
assets = assets.filter((asset) => asset);
router.use((request, response) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    var path = request.path.substring(1);

    var [matching] = assets.filter((asset) => {
        if (asset.name)
            return asset.name.replace(/ /g, "_") === path;
    });

    if (!matching || !matching.url) {
        // console.log(bot);
        return response.status(404).end("404 | Not Found");
    }

    return response.redirect(matching.url);
});

module.exports = router;