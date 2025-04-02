let time;
let interval;

self.onmessage = function (e) {
  time = e.data;
  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (time > 0) {
      time--;
      postMessage(time);
    } else {
      clearInterval(interval);
    }
  }, 1000);
};
