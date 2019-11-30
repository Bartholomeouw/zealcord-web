const run = async (client, request, response) => {
  console.log(request.params);
  if (client.maintenance.get("botlist") === true)
    return require("./defaults/404");
  if (!request.params.page) {
    response.redirect("/bots/1");
  } else {
    response.status(200).render("botlist.ejs", {
      bot: client,
      path: request.path,
      req: request,
      res: response,
      zealcord: await client.zealcord
    });
  }
};

const meta = { path: "/bots/:page", name: "Bot List", method: "GET" };
module.exports = { run, meta };
