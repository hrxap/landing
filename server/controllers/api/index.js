module.exports.api = () => {
  const { Endpoint } = require("./../_util");
  let api = new Endpoint("api", __dirname);
  api.importControllers();
  return api;
};
