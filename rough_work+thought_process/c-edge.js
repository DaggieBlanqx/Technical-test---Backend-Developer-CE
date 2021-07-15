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

entries.map((entry, index) => {
  var _callback = (a) => {
    processedData.push({
      ...entry,
      success: a,
    });
  };
  api(_callback);
});

console.log({
  entries,
  processedData,
});

console.log('-----------------');
var list = ['one', 'two', 'three'];
var x = 0;
var loopArray = function (arr) {
  customAlert(arr[x], function () {
    // set x to next item
    x++;

    // any more items in array? continue loop
    if (x < arr.length) {
      loopArray(arr);
    }
  });
};

function customAlert(msg, callback) {
  // setTimeout(() => console.log(msg), 5000);

  setTimeout(() => {
    // code to show your custom alert
    // in this case its just a console log
    console.log(msg);
    // do callback when ready
    callback();
  }, 5000);
}

// start 'loop'
loopArray(list);
