const fs = require("fs");
const path = require("path");

function getRandomFileFromFolder(dir) {
  const files = fs.readdirSync(dir);
  const index = Math.floor(Math.random() * files.length);
  return path.join(dir, files[index]);
}

module.exports = getRandomFileFromFolder;
