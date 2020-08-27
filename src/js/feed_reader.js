const { clear } = require("console");

/**
 * Gets a URL and returns an array which contains all the feed's titles
 * @param {String} url
 * @returns {Object[]} Array containing all the titles inside the url
 */
async function getFeed(url) {
  const axios = require("axios");
  let feedArr = [];
  await axios
    .get(url, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then((response) => response.data)
    .then((str) => new DOMParser().parseFromString(str, "text/xml"))
    .then((data) => {
      let items = data.querySelectorAll("item");
      for (let i = 0; i < 12; i++) {
        feedArr.push(items[i].querySelector("title").textContent);
      }
    });
  return feedArr;
}

/**
 * Handles the reading process
 * @param {String} feedUrl The URL to read
 * @param {String} separator The separator to use (default " ")
 * @param {Boolean} useProxy Use proxy (default false)
 * @param {String} proxyTypeVal "default" or "custom" (default null)
 * @param {String} custProxy The proxy to use (default "")
 * @param {Boolean} doSlice Returns only part of the items (default false)
 * @param {Number} sliceNum How many items do you want (default 1)
 */
async function handleRead(
  feedUrl,
  separator = " ",
  useProxy = false,
  proxyTypeVal = undefined,
  custProxy = "",
  doSlice = false,
  sliceNum = 1
) {
  if (feedUrl == "") throw new Error("Invalid feed url");
  custProxy =
    useProxy && proxyTypeVal == "default"
      ? "https://cors-anywhere.herokuapp.com/"
      : useProxy && proxyTypeVal == "custom"
        ? custProxy
        : "";
  let feed = await getFeed(`${custProxy}${feedUrl}`);
  feed = doSlice ? feed.slice(0, sliceNum) : feed;
  return feed.join(separator);
}

/**
 * Saves the feed
 * @param {String} feed What should be written in the output file
 */
async function saveFeed(feed) {
  const { dialog } = require("electron").remote;
  const { writeFile } = require("fs");
  if (feed != "") {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: "Save Feed",
      defaultPath: `feed-${Date.now()}.txt`,
    });
    writeFile(filePath, feed, function (err) {
      if (err) throw err;
    });
  }
}

// AUTOMATED READ

/**
 * Sets new out path for automated read feeds
 * @param {Element} $pathDisplayDiv Dom node
 */
async function setRepeatOutPath($pathDisplayDiv) {
  const { dialog } = require("electron").remote;
  const { filePaths } = await dialog.showOpenDialog({
    buttonLabel: "Select path",
    properties: ["openDirectory"]
  });
  $pathDisplayDiv.innerText = filePaths[0];
}

/**
 * 
 * @param {Element} $feedArea Dom node
 * @param {Element} $pathDisplayDiv Dom node
 * @param {String} outFilenameInVal Output file's name (default to "feed-out.txt")
 */
async function saveOutFeed(feed, $pathDisplayDiv, outFilenameInVal = "feed-out.txt") {
  console.log("saving");
  if (outFilenameInVal != "") {
    if (outFilenameInVal.endsWith(".txt")) {
      outFileName = outFilenameInVal;
    } else {
      outFileName = `${outFilenameInVal}.txt`;
    }
  }
  const { writeFile } = require("fs");
  const path = require("path");
  writeFile(path.join($pathDisplayDiv.innerText, outFileName), feed, function (
    err
  ) {
    if (err) throw err;
  });
}

let repeatInterval = null;

function clearRepeat() {
  if (repeatInterval != null) {
    alert("Stop repeating");
    clearInterval(repeatInterval);
    repeatInterval = null;
  }
}


/**
 * 
 * @param {Element} $feedArea Dom node
 * @param {Element} $pathDisplayDiv Dom node
 * @param {String} outFilenameInVal Output file name
 * @param {String} feedUrl The URL to read
 * @param {String} separator The separator to use (default " ")
 * @param {Boolean} useProxy Use proxy (default false)
 * @param {String} proxyTypeVal "default" or "custom" (default null)
 * @param {String} custProxy The proxy to use (default "")
 * @param {Boolean} doSlice Returns only part of the items (default false)
 * @param {Number} sliceNum How many items do you want (default 1)
 */
async function readRepeatHour(
  $feedArea,
  $pathDisplayDiv,
  outFilenameInVal,
  feedUrl,
  separator = " ",
  useProxy = false,
  proxyTypeVal = null,
  custProxy = "",
  doSlice = false,
  sliceNum = 1
) {
  clearRepeat();
  alert("Starting hourly reading");
  let feed = await handleRead(
    feedUrl,
    separator,
    useProxy,
    proxyTypeVal,
    custProxy,
    doSlice,
    sliceNum
  );
  saveOutFeed(feed, $pathDisplayDiv, outFilenameInVal);
  repeatInterval = setInterval(async function () {
    var date = new Date();
    console.log(date.getMinutes());
    if (date.getMinutes() == 0) {
      feed = await handleRead(
        feedUrl,
        separator,
        useProxy,
        proxyTypeVal,
        custProxy,
        doSlice,
        sliceNum
      );
      saveOutFeed(feed, $pathDisplayDiv, outFilenameInVal);
    }
  }, 60000);
}

async function readRepeatDay(
  $hourIn,
  $feedArea,
  $pathDisplayDiv,
  outFilenameInVal,
  feedUrl,
  separator = " ",
  useProxy = false,
  proxyTypeVal = null,
  custProxy = "",
  doSlice = false,
  sliceNum = 1) {
  clearRepeat();
  alert("Starting daily reading");
  let feed = await handleRead(
    feedUrl,
    separator,
    useProxy,
    proxyTypeVal,
    custProxy,
    doSlice,
    sliceNum
  );
  saveOutFeed(feed, $pathDisplayDiv, outFilenameInVal);
  let now = new Date();
  let hour = now.getHours();
  if ($hourIn.value != "") {
    hour = $hourIn.value < 0 ? 0 : $hourIn.value > 23 ? 0 : $hourIn.value;
  }
  repeatInterval = setInterval(async function () {
    var date = new Date();
    if (date.getHours == hour && date.getMinutes == 0) {
      feed = await handleRead(
        feedUrl,
        separator,
        useProxy,
        proxyTypeVal,
        custProxy,
        doSlice,
        sliceNum
      );
      saveOutFeed(feed, $pathDisplayDiv, outFilenameInVal);
    }
  }, 86400000);
}

module.exports = {
  handleRead: handleRead,
  saveFeed: saveFeed,
  setRepeatOutPath: setRepeatOutPath,
  readRepeatHour: readRepeatHour,
  readRepeatDay: readRepeatDay,
  clearRepeat: clearRepeat
};
