const feedIn = document.getElementById("url-input");
const readBtn = document.getElementById("read-btn");
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
const outFileNameIn = document.getElementById("repeat-output-name-in");
const pathDisplayDiv = document.getElementById("path-display");
const selectOutPathBtn = document.getElementById("select-path-btn");
const hourIn = document.getElementById("hour-in");

// Handles menu
const { buildMenu } = require("./js/menu.js");
buildMenu({
  $proxyCheck: proxyCheck,
  $customProxyIn: customProxyIn,
  $proxyType: proxyType,
  $feedIn: feedIn,
  $feedArea: feedArea,
  $separatorCheck: separatorCheck,
  $separatorIn: separatorIn,
  $itemsLimitCheck: itemsLimitCheck,
  $itemsNumberIn: itemsNumberIn,
  $outFileNameIn: outFileNameIn,
  $pathDisplayDiv: pathDisplayDiv,
  $selectPathBtn: selectOutPathBtn,
  $hourIn: hourIn,
});

// Reading
readBtn.onclick = async function () {
  const { handleRead } = require("./js/feed_reader.js");
  let separator = separatorCheck.checked ? separatorIn.value : " ";
  let useProxy = proxyCheck.checked ? true : false;
  let proxyTypeVal = proxyType.value;
  let proxy = proxyCheck.checked ? customProxyIn.value : "";
  let doSlice = itemsLimitCheck.checked ? true : false;
  let sliceNum = itemsNumberIn.value;
  let feed = await handleRead(
    feedIn.value,
    separator,
    useProxy,
    proxyTypeVal,
    proxy,
    doSlice,
    sliceNum
  );
  feedArea.value = feed;
};
saveFeedBtn.onclick = () => {
  const { saveFeed } = require("./js/feed_reader.js");
  saveFeed(feedArea.value);
};

// Automated Reading

if (pathDisplayDiv.innerText == "") {
  const getPath = require("electron").remote.app.getPath;
  pathDisplayDiv.innerText = getPath("documents");
}
selectOutPathBtn.onclick = async function () {
  const { setRepeatOutPath } = require("./js/feed_reader.js");
  setRepeatOutPath(pathDisplayDiv);
};
