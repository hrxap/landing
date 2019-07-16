module.exports.Server = class {
  constructor(serverPort, pathToStaticFiles) {
    this.serverPort = serverPort;
    this.pathToStaticFiles = pathToStaticFiles;
    this.express = require("express");
    this.cors = require("cors");
    this.bodyParser = require("body-parser");
    this.helmet = require("helmet");

    this.server = this.express();
  }

  initializeMiddleware() {
    this.server.use(this.cors());
    this.server.use(this.bodyParser.json());
  }

  serveStaticFiles() {
    console.log(this.pathToStaticFiles);
    this.server.use(this.express.static(this.pathToStaticFiles));
  }

  initializeControllers() {
    console.log("    -> Initializing Controllers...");
    const { existsSync } = require("fs");
    let pathToControllers = `${__dirname}/controllers`;
    if (existsSync(pathToControllers)) {
      this.controllers = require(pathToControllers).controllers().router;
      this.server.use("/", this.controllers);
    }
  }

  listen() {
    this.server.listen(this.serverPort, () => {
      console.log(`SERVER LISTEN: Port ${this.serverPort}`);
    });
  }

  exposeConfig() {
    this.server.get("/config", (req, res) => {
      res.send(this);
    });
  }

  exposeEndpoints() {
    this.server.get("/endpoints", (req, res) => {
      res.send(this.server._router.stack);
    });
  }
};
/*
Constructor Arguments:
  - serverPort: process.env.PORT || 8080;
  - pathToStaticFiles: __dirname + "/../app/dist"
*/
