const run = async (client, request, response) => {
  console.log(request.params);
  if (client.maintenance.get("botlist") === true)
    return require("./defaults/404");
  if (!request.params.page) {
    response.redirect("/users/1");
  } else {
    response.status(200).render("userlist.ejs", {
      bot: client,
      path: request.path,
      req: request,
      res: response,
      zealcord: await client.zealcord
    });
  }
};

const meta = {
  path: "/users/:page",
  name: "Bot List",
  method: "GET"
};
module.exports = {
  run,
  meta
};
