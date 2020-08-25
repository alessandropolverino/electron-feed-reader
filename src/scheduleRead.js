const { handleRead } = require("./feedReader");
const { saveOutFeed, hourIn } = require("./repeatConfig");

let repeatInterval = null;

async function readRepeatHour() {
  alert("Starting hourly reading");
  await handleRead();
  saveOutFeed();
  clearRepeat();
  repeatInterval = setInterval(async function () {
    // console.log("check time");
    var date = new Date();
    console.log(date.getMinutes());
    if (date.getMinutes() == 0) {
      // console.log("Reading Feed...");
      await handleRead;
      saveOutFeed();
    }
  }, 60000);
}

async function readRepeatDay() {
  alert("Starting daily reading");
  await handleRead();
  saveOutFeed();
  clearRepeat();
  let now = new Date();
  let hour = now.getHours();
  if (hourIn.value != "") {
    hour = hourIn.value < 0 ? 0 : hourIn.value > 23 ? 0 : hourIn.value;
  }
  repeatInterval = setInterval(async function () {
    // console.log("check time");
    var date = new Date();
    if (date.getHours == hour && date.getMinutes == 0) {
      // console.log("Reading Feed...");
      await handleRead;
      saveOutFeed;
    }
  }, 86400000);
}

function clearRepeat() {
  if (repeatInterval != null) {
    alert("Stop repeating");
    clearInterval(repeatInterval);
    repeatInterval = null;
  }
}

module.exports = {
  readRepeatHour: readRepeatHour,
  readRepeatDay: readRepeatDay,
  clearRepeat: clearRepeat,
};
