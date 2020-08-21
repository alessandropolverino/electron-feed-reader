const { handleRead } = require("./feedReader");
const { saveOutFeed, hourIn } = require("./repeatConfig");

let repeatInterval = null;

async function readRepeatHour() {
  alert("Starting hourly reading");
  await handleRead();
  saveOutFeed();
  clearRepeat();
  repeatInterval = setInterval(async function () {
    var date = new Date(); // Create a Date object to find out what time it is
    if (date.getMinutes == 0) {
      console.log("Reading Feed...");
      // Check the time
      await handleRead;
      saveOutFeed();
    }
  }, 10000);
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
    var date = new Date(); // Create a Date object to find out what time it is
    if (date.getHours == hour && date.getMinutes == 0) {
      console.log("Reading Feed...");
      // Check the time
      await handleRead;
      saveOutFeed;
    }
  }, 60000);
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
