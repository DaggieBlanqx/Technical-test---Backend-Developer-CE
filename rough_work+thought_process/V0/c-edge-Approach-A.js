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

// My solution A starts here
var processedData = [];

entries.map((entry, index) => {
    var handleCallback = (a) => {
        processedData.push({
            ...entry,
            success: a
        });
    }
    api(handleCallback);
});

console.log({
    entries,
    processedData
});