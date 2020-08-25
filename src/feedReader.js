const { remote } = require("electron");

const feedIn = document.getElementById("url-input");
const readBtn = document.getElementById("read-btn");
readBtn.onclick = handleRead;
const proxyCheck = document.getElementById("use-proxy");
const proxyType = document.getElementById("proxy-type");
const customProxyIn = document.getElementById("custom-proxy-in");
proxyCheck.onclick = () => {
  proxyType.classList.toggle("is-hidden");
  if (!proxyCheck.checked && !customProxyIn.classList.contains("is-hidden")) {
    customProxyIn.classList.add("is-hidden");
  } else if (
    proxyCheck.checked &&
    proxyType.value == "custom" &&
    customProxyIn.classList.contains("is-hidden")
  ) {
    customProxyIn.classList.remove("is-hidden");
  }
};
proxyType.onchange = () => {
  if (
    proxyType.value == "default" &&
    !customProxyIn.classList.contains("is-hidden")
  ) {
    customProxyIn.classList.add("is-hidden");
  } else {
    customProxyIn.classList.remove("is-hidden");
  }
};
const feedArea = document.getElementById("feed-area");
const saveFeedBtn = document.getElementById("save-feed-btn");
saveFeedBtn.onclick = saveFeed;
const separatorCheck = document.getElementById("separator-check");
const separatorIn = document.getElementById("separator-in");
separatorCheck.onclick = () => {
  separatorIn.classList.toggle("is-hidden");
};
const itemsLimitCheck = document.getElementById("items-limit");
const itemsNumberIn = document.getElementById("items-number-in");
itemsLimitCheck.onchange = () => {
  itemsNumberIn.classList.toggle("is-hidden");
};

let defaultProxy = "https://cors-anywhere.herokuapp.com/";
let feed;
//" • "

async function handleRead() {
  let urlToRead = feedIn.value;
  let separator = " ";
  if (separatorCheck.checked) {
    separator = separatorIn.value;
  }
  if (urlToRead != "") {
    if (proxyCheck.checked) {
      let proxy =
        proxyType.value == "custom" ? customProxyIn.value : defaultProxy;
      urlToRead = `${proxy}${urlToRead}`;
    }
    feed = await getFeed(urlToRead);
    if (itemsLimitCheck.checked && itemsNumberIn.value != "") {
      feed = feed.slice(0, itemsNumberIn.value);
    }
    feed = feed.join(separator);
    feedArea.value = feed;
  }
}

// https://www.salernonotizie.it/feed/
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

async function saveFeed() {
  const { dialog } = remote;
  const { writeFile } = require("fs");
  if (feedArea.value != "") {
    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: "Save Feed",
      defaultPath: `feed-${Date.now()}.txt`,
    });
    writeFile(filePath, feed, function (err) {
      if (err) throw err;
    });
  }
}

module.exports = {
  customProxyIn: customProxyIn,
  proxyCheck: proxyCheck,
  proxyType: proxyType,
  separatorIn: separatorIn,
  separatorCheck: separatorCheck,
  feedIn: feedIn,
  handleRead: handleRead,
  itemsLimitCheck: itemsLimitCheck,
  itemsNumberIn: itemsNumberIn,
};
