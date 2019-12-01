const RequestHandler = (client, route, request, response) => {
  request.route.path = route.meta.path;
  log(request);
  route.run(client, request, response);
};

module.exports = RequestHandler;

function getIP(request) {
  return request.headers["x-real-ip"] || request.headers["x-forwarded-for"].split(",")[0]
}

function getUserAgent(request) {
  return request.headers["user-agent"];
}

function log(request) {
  if (
    getUserAgent(request) ===
    "Mozilla/5.0+(compatible; UptimeRobot/2.0; http://www.uptimerobot.com/)"
  ) {
    return undefined;
  }
  console.log(
    `[DEBUG] [${new Date()
      .toString()
      .split(" ", 5)
      .join(" ")}] [${getIP(request)}] [${getUserAgent(request)}] ${getIP(
      request
    )} is requesting ${request.method} to ${request.route.path}`
  );
}
