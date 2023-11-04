const sleep = (ms = 1000) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const secondsToDuration = (seconds) => {
  const secondsInNum = parseInt(seconds, 10);
  let hours = Math.floor(secondsInNum / 3600);
  let minutes = Math.floor((secondsInNum - hours * 3600) / 60);
  let _seconds = secondsInNum - hours * 3600 - minutes * 60;

  if (hours && hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (_seconds < 10) {
    _seconds = "0" + _seconds;
  }
  if (hours) {
    return `${hours}:${minutes}:${_seconds}`;
  } else {
    return `${minutes}:${_seconds}`;
  }
};

function* generator(ends) {
  for (let i = 0; i <= ends; i++) {
    yield i;
  }
}
module.exports = { sleep, secondsToDuration, generator };
