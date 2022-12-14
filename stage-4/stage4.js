const data = require("../py-stage-3/data.json");

newData = data.map((obj) => ({
  ...obj,
  cause: [],
}));

console.log(newData);

var fs = require("fs");
fs.writeFile("data.json", JSON.stringify(newData), function (err) {
  if (err) {
    console.log(err);
  }
});
