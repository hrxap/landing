module.exports.tables = () => {
  const { Endpoint, Model } = require("./../../_util");
  let model = new Model("tables");
  let tables = new Endpoint("tables", __dirname, model);

  function exposeTablesAsEndpoints() {
    console.log(`    -> ASYNC: Exposing tables as endpoints:`);
    tables.model
      .custom("models/main/information/tables_by_name.sql")
      .then(response => {
        let allTables = response.rows;
        allTables.forEach(table => {
          let { table_name } = table;
          console.log(`      > Table as endpoint: ${table_name}`);
          let newTableEndpoint = new Endpoint(
            table_name,
            __dirname,
            new Model(table_name)
          );
          tables.use(`/${table_name}`, newTableEndpoint.router);
          newTableEndpoint.activateCRUD();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  exposeTablesAsEndpoints();

  tables.get = () => {
    tables.router.get("/", (req, res) => {
      tables.model
        .custom("models/main/information/tables_by_name.sql")
        .then(response => {
          res.json(response.rows);
        })
        .catch(err => {
          console.log(err);
          res.send(500);
        });
    });
  };
  tables.get();

  return tables;
};
