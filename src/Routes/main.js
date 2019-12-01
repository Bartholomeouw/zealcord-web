const run = (client, request, response) => {
  response.status(200).render("index.ejs", {
    bot: client,
    path: request.path
  });
};

const meta = { path: "/", name: "Main Website", method: "GET" };
module.exports = { run, meta };
