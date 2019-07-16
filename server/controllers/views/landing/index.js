module.exports.landing = () => {
  const { join } = require("path");
  const { View } = require("./../../_util");
  let landing = new View(
    "views",
    __dirname,
    join(__dirname + "./../../../../app/dist/index.html")
  );
  landing.get();
  return landing;
};
