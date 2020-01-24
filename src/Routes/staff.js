const run = (client, request, response) => {
  response.status(200).render("staff.ejs", {
    bot: client,
    path: request.path
  });
};

const meta = {
  path: "/staff",
  name: "Staff List",
  method: "GET"
};
module.exports = {
  run,
  meta
};
