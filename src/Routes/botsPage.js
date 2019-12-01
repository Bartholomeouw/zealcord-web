const run = async (client, request, response) => {
  console.log(request.params);
    response.status(200).render("botlist.ejs", {
      bot: client,
      path: request.path,
      req: request,
      res: response,
      zealcord: await client.zealcord
    });
};

const meta = { path: "/bots/:page", name: "Bot List", method: "GET" };
module.exports = { run, meta };
