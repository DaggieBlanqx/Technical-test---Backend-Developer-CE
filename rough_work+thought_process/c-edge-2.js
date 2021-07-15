var entries = [
  { phone: '1234567890', message: 'Hello World!' },
  { phone: '1234567891', message: 'Hello Worl!' },
  { phone: '1234567892', message: 'Hello Wor!' },
  { phone: '1234567893', message: 'Hello Wo!' },
];

var getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var api = (callback) => {
  setTimeout(() => {
    callback(Math.random() < 0.5);
  }, getRandomInt(10, 250));
};

var processedData = [];
var x = 0;

var loopArray = function (arr) {
  var _entry = arr[x];
  var _callback = (a) => {
    processedData.push({
      ..._entry,
      success: a,
    });
  };
  api(_callback);
  x++;
  if (x < arr.length) {
    console.log(`Currently ${x - 1} >>> going to ${x}`);
    loopArray(arr);
  } else {
    console.log({
      entries,
      processedData,
    });
  }
};

// start 'loop'
loopArray(entries);
