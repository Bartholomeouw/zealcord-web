const { get } = require("node-superfetch");

const run = async (client, request, response) => {
  const res = await get(
    `https://api.zealcord.xyz/getCookie?code=${response.query.code}`
  );
  console.log(response.query.code);
  const body = await res.body;
  response.sendStatus(200);
};

const meta = {
  path: "/finalizeLogin",
  name: "Finalize Login",
  method: "GET"
};
module.exports = {
  run,
  meta
};
