/* eslint-disable prefer-destructuring */
const { readdirSync } = require("fs");
const RequestHandler = require("./RequestHandler");
const { join } = require("path");
const { Collection } = require("discord.js");
const Routes = new Collection();

const RoutesHandler = (client, Router) => {
  readdirSync(join(__dirname.replace("handler", "Routes"))).forEach(file => {
    if (file === "defaults") {
      return undefined;
    }
    const Route = require(`../Routes/${file}`);
    Routes.set(Route.meta.path, Route);
  });

  Router.all("/*", (request, response) => {
    if (!Routes.has(request.path)) {
      const realPaths = [];
      for (const path of Routes.keys()) {
        const paths = path.split("/");
        paths.shift();
        realPaths.push(paths);
      }
      const currentPath = request.path.split("/");
      currentPath.shift();
      const filteredOne = realPaths.filter(
        p => p.length === currentPath.length
      );
      filteredOne.forEach(path => {
        //eslint-disable-line
        const pathBackup = path.join(".");
        const currentPathNext = request.path.split("/");
        currentPathNext.shift();
        currentPathNext.pop();
        path.pop();
        if (path.join(".") === currentPathNext.join(".")) {
          const currentPath2 = request.path.split("/");
          currentPath2.shift();
          const path = pathBackup.split("."); //eslint-disable-line
          const verifiedPath = `/${path.join("/")}`;
          const route = Routes.get(verifiedPath);
          if (
            route.meta.method !== "ANY" &&
            request.method !== route.meta.method
          ) {
            return require("../Routes/defaults/405").run(
              client,
              request,
              response
            );
          }
          const backup = request.params;
          try {
            request.params = {};
            request.params[path[path.length - 1].replace(":", "")] = backup["0"]
              .toString()
              .split("/")[1]; //eslint-disable-line
          } catch (e) {
            return; // do nothing
          }
          RequestHandler(client, route, request, response); // eslint-disable-line
        }
      });
      return require("../Routes/defaults/404").run(client, request, response);
    }
    const route = Routes.get(request.path);
    if (route.meta.method !== "ANY" && request.method !== route.meta.method) {
      return require("../Routes/defaults/405").run(client, request, response);
    }
    RequestHandler(client, route, request, response); // eslint-disable-line
  });
};

module.exports = RoutesHandler;
