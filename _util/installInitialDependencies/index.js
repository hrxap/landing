const { execSync } = require("child_process");
let devDependencies = [
  "babel-core",
  "babel-loader",
  "babel-preset-es2015",
  "babel-preset-react",
  "body-parser",
  "cors",
  "express",
  "helmet",
  "jest",
  "knex",
  "nodemon",
  "pg",
  "webpack"
].forEach(dependency => {
  execSync(
    `npm install ${dependency} --save-dev`,
    { stdio: [0, 1, 2] },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`Install error:`, err);
        console.log(stdout);
        console.log(stderr);
      }
    }
  );
});
let dependencies = [
  "axios",
  "jquery",
  "react",
  "react-dom",
  "semantic-ui-react"
].forEach(dependency => {
  execSync(
    `npm install ${dependency}`,
    { stdio: [0, 1, 2] },
    (error, stdout, stderr) => {
      if (error) {
        console.log(`Install error:`, err);
        console.log(stdout);
        console.log(stderr);
      }
    }
  );
});
