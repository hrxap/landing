module.exports.controllers = () => {
  const { Endpoint } = require("./_util");
  let controllers = new Endpoint("controllers", __dirname);
  controllers.importControllers();
  return controllers;
};
