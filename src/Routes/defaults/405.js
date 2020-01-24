const run = (client, request, response) => {
  response.status(405).render("405.ejs");
};

const meta = {
  path: "none",
  name: "405 Handler",
  method: "ANY"
};
module.exports = {
  run,
  meta
};
