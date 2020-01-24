const run = async (client, request, response) => {
  response.status(301).redirect("/1");
};

const meta = {
  path: "/bots",
  name: "Bot List",
  method: "GET"
};
module.exports = {
  run,
  meta
};
