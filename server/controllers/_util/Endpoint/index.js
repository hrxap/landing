module.exports.Endpoint = class Endpoint {
  constructor(name, path, model) {
    this.express = require("express");
    this.name = name;
    this.path = path;
    this.router = this.express.Router();
    this.model = model;
  }

  activateCRUD() {
    console.log(`    > Activate CRUD on ${this.name}`);
    this.post();
    this.get();
    this.patch();
    this.delete();
  }

  config() {
    console.log(`    > Initialize CONFIG ${this.name}`);
    if (this.model) {
      this.router.get("/config", (req, response) => {
        this.model
          .config()
          .then(config => {
            console.log("  -> Request success.");
            response.status(200).json(config);
          })
          .catch(err => {
            console.log(
              "ERROR: An error when attempting to retrieve config.",
              err
            );
            response.status(500).end();
          });
      });
    }
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

  test() {
    this.router.get("/", (req, res) => {
      res.send(`Test: ${this.name}`);
    });
  }

  use(endpointPath, router) {
    this.router.use(endpointPath, router);
  }

  post() {
    console.log(`    > Initialize POST ${this.name}`);
    if (this.model) {
      this.router.post("/", (request, response) => {
        console.log(`POST ${this.name}`);
        if (!request.body) {
          response.status(400).end();
        }
        console.log("  -> Request Body: ", JSON.stringify(request.body));
        this.model
          .create(request.body)
          .then(() => {
            console.log("  -> Request success.");
            response.status(200).end();
          })
          .catch(err => {
            console.log(
              "ERROR: An error when attempting to insert carts.",
              err
            );
            response.status(500).end();
          });
      });
    } else {
      console.log(`WARNING: POST /${this.name} > NO MODEL EXISTS`);
      this.router.post("/", (request, response) => {
        response.send(200);
      });
    }
  }

  get() {
    console.log(`    > Initialize GET ${this.name}`);
    if (this.model) {
      this.router.get("/", (request, response) => {
        console.log(`GET ${this.name}`);
        console.log("  -> query: ", request.query);
        let query = request.query;
        this.model
          .read(query)
          .then(data => {
            console.log("  -> Request success.");
            response.status(200).json(data);
          })
          .catch(err => {
            console.log(
              "ERROR: An error when attempting to retrieve carts.",
              err
            );
            response.status(500).end();
          });
      });
    } else {
      console.log(`WARNING: GET /${this.name} > NO MODEL EXISTS`);
    }
  }

  patch() {
    console.log(`    > Initialize PATCH ${this.name}`);
    if (this.model) {
      this.router.patch("/", (request, response) => {
        console.log(`PATCH ${this.name}`);
        if (!request.body) {
          response.status(400).end();
        }
        console.log("  -> Request Body: ", JSON.stringify(request.body));
        // let query = request.body.query;
        // let change = request.body.change;
        this.model
          .update(request.body)
          .then(() => {
            console.log("  -> Request success.");
            response.status(200).end();
          })
          .catch(err => {
            console.log(
              "ERROR: An error when attempting to update carts.",
              err
            );
            response.status(500).end();
          });
      });
    } else {
      console.log(`WARNING: PATCH /${this.name} > NO MODEL EXISTS`);
    }
  }

  delete() {
    console.log(`    > Initialize DELETE ${this.name}`);
    if (this.model) {
      this.router.delete("/", (request, response) => {
        console.log(`DELETE ${this.name}`);
        if (!request.body) {
          response.status(400).end();
        }
        console.log("  -> Request Body: ", JSON.stringify(request.body));
        let query = request.body;
        this.model
          .delete(query)
          .then(() => {
            console.log("  -> Request success.");
            response.status(200).end();
          })
          .catch(err => {
            console.log(
              "ERROR: An error when attempting to delete carts.",
              err
            );
            response.status(500).end();
          });
      });
    } else {
      console.log(`WARNING: DELETE /${this.name} > NO MODEL EXISTS`);
    }
  }
};
