module.exports.Model = class Model {
  constructor(name) {
    this.name = name;
    this.resolveCredentials();
  }

  resolveCredentials() {
    this.credentials = require("../../../../config.js");
  }

  config() {
    const query = `SELECT *
      FROM information_schema.columns
    WHERE table_name   = '${this.name}'`;
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    return client
      .query(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  test() {
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    return client
      .query("SELECT now();")
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  custom(path) {
    const { Client } = require("pg");
    const { readFileSync } = require("fs");
    const client = new Client(this.credentials);
    client.connect();

    let query = `${process.cwd()}/${path}`;
    let sql = readFileSync(query, { encoding: "utf8" });

    return client
      .query(sql)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  create(item) {
    console.log(`  -> Inserting ${this.name}...`);
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    let columns = Object.keys(item);
    let values = columns.map(column => {
      return item[column];
    });

    let columnQueryString = "";
    columns.forEach(column => {
      if (columnQueryString.length) {
        columnQueryString += `, ${column}`;
      } else {
        columnQueryString += column;
      }
    });

    let valueQueryString = "";
    for (let valueIndex = 1; valueIndex < values.length + 1; valueIndex++) {
      if (valueQueryString.length) {
        valueQueryString += `, $${valueIndex}`;
      } else {
        valueQueryString += `$${valueIndex}`;
      }
    }
    console.log(columnQueryString);
    console.log(JSON.stringify(columns));

    console.log(valueQueryString);
    console.log(JSON.stringify(values));

    const query = {
      // give the query a unique name
      name: "fetch-user",
      text: `INSERT INTO ${
        this.name
      } (${columnQueryString}) VALUES(${valueQueryString});`,
      values: values
    };

    return client
      .query(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  read(query, columns) {
    console.log(`  -> Retrieving ${this.name}...`);
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    return client
      .query(`SELECT * FROM ${this.name}`)
      .then(result => {
        console.log(`  -> Successfully retrieved ${this.name} data.`);
        return result;
      })
      .catch(err => {
        console.log(
          `ERROR: An error occurred when retrieving ${this.name}.`,
          err
        );
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  update({ id, column, value }) {
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    const query = {
      name: "fetch-user",
      text: `UPDATE ${this.name} SET ${column}=$2 WHERE id=$1`,
      values: [id, value]
    };

    return client
      .query(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }

  delete(change) {
    console.log(`  -> Deleting ${this.name}...`);
    const { Client } = require("pg");
    const client = new Client(this.credentials);
    client.connect();

    const query = {
      // give the query a unique name
      name: "fetch-user",
      text: `DELETE FROM ${this.name} WHERE id = $1`,
      values: [change.id]
    };

    return client
      .query(query)
      .then(result => {
        return result;
      })
      .catch(err => {
        return err;
      })
      .then(result => {
        client.end();
        return result;
      });
  }
};
