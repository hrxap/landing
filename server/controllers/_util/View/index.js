module.exports.View = class View {
  constructor(name, path, viewFilePath) {
    this.express = require("express");
    this.name = name;
    this.path = path;
    this.viewFilePath = viewFilePath;
    this.router = this.express.Router();
    this.get();
  }

  test() {
    this.router.get("/", (req, res) => {
      res.send(`Test: ${this.name}`);
    });
  }

  importControllers() {
    const { readdirSync, existsSync } = require("fs");
    console.log(`    -> Importing child controllers of ${this.name}:`);
    readdirSync(this.path).forEach(item => {
      if (item !== "index.js" && item != "_util") {
        let path = `${this.path}/${item}`;
        let hasContents = existsSync(`${path}/index.js`);
        if (hasContents) {
          console.log(`     > path: /${item}`);
          let controller = require(path)[item]().router;
          this.use(`/${item}`, controller);
        }
      }
    });
  }

  use(endpointPath, router) {
    this.router.use(endpointPath, router);
  }

  get() {
    console.log(`    > Initialize GET ${this.name}`);
    if (this.viewFilePath) {
      this.router.get("/", (request, response) => {
        console.log(`GET ${this.name}`);
        response.sendFile(this.viewFilePath);
      });
    } else {
      console.log(`WARNING: GET /${this.name} > NO VIEW EXISTS`);
    }
  }
};
