module.exports.views = () => {
  const { View } = require("./../_util");
  let views = new View("views", __dirname);
  views.importControllers();
  return views;
};
