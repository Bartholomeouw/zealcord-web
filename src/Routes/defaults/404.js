const run = (client, request, response) => {
  response.status(404).render("404.ejs");
};

const meta = {
  path: "none",
  name: "404 Handler",
  method: "ANY"
};
module.exports = {
  run,
  meta
};
