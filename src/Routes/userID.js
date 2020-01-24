const run = async (client, request, response) => {
  // console.log(request.params);
  if (client.maintenance.get("botlist") === true)
    return require("./defaults/404");
  if (
    client.users.get(request.params.botID).bot ||
    !client.users.get(request.params.botID)
  )
    response.redirect("/users/1");
  response.status(200).render("users.ejs", {
    bot: client,
    path: request.path,
    req: request,
    zealcord: await client.zealcord
  });
};

const meta = {
  path: "/user/:userID",
  name: "Bot List",
  method: "GET"
};
module.exports = {
  run,
  meta
};
