const outFileNameIn = document.getElementById("repeat-output-name-in");
const pathDisplay = document.getElementById("path-display");
const selectPathBtn = document.getElementById("select-path-btn");
selectPathBtn.onclick = setRepeatOutPath;
const getPath = remote.app.getPath;
const hourIn = document.getElementById("hour-in");

if (pathDisplay.innerText == "") {
  pathDisplay.innerText = getPath("documents");
}
let outFileName = "feed-out.txt";

async function setRepeatOutPath() {
  const { dialog } = remote;
  const { filePaths } = await dialog.showOpenDialog({
    buttonLabel: "Select path",
    properties: ["openDirectory"],
  });
  let filePath = filePaths[0];
  pathDisplay.innerText = filePath;
}

async function saveOutFeed() {
  console.log("saving");
  if (outFileNameIn.value != "") {
    if (outFileNameIn.value.endsWith(".txt")) {
      outFileName = outFileNameIn.value;
    } else {
      outFileName = `${outFileNameIn.value}.txt`;
    }
  }
  const { writeFile } = require("fs");
  const path = require("path");
  let feed = document.getElementById("feed-area").value;
  writeFile(path.join(pathDisplay.innerText, outFileName), feed, function (
    err
  ) {
    if (err) throw err;
  });
}

module.exports = {
  saveOutFeed: saveOutFeed,
  outFileNameIn: outFileNameIn,
  pathDisplay: pathDisplay,
  hourIn: hourIn,
};
