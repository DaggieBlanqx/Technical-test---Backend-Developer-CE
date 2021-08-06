var entries = [
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567891', message: 'Hello Worl!' },
    { phone: '1234567892', message: 'Hello Wor!' },
    { phone: '1234567893', message: 'Hello Wo!' },
];

var entries_alreadyProcessed = [];
var entries_failedToProcess = [];

const timeFnPromise = (fn) => (...args) => {
    const start = Date.now()
    const promise = fn(...args)
    if (!promise.then) {
        throw 'Expected function to return a Promise!'
    }
    const calcElapsedTime = (ret) => {
        return { ret, elapsedTime: Date.now() - start }
    }
    return promise.then(calcElapsedTime, calcElapsedTime)
};



var getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()(max - min + 1)) + min;
};

var api = (callback) => {
    var randomTime = getRandomInt(5000, 10000);
    console.log({ randomTime })
    setTimeout(() => {
            callback(Math.random() < 0.5);
        },
        // getRandomInt(10, 250)
        // 15000
        randomTime
    );
};

var processedData = [];

var prom = (entry) => {
    //     const wrappedFn = timeFnPromise(aFunctionThatReturnsAPromise)

    // wrappedFn()
    //     .then((values) => {
    //         const { ret, elapsedTime } = values
    //         console.log(`ret:[${ret}] elapsedTime:[${elapsedTime}]`)
    //     })

    return new Promise((resolve, reject) => {
        var handleCallback = (a) => {
            var _processedEntry = {
                ...entry,
                success: a
            };
            // processedData.push();


            resolve(_processedEntry);

        }
        api(handleCallback)
    });
};

var promises = entries.map((entry, index) => prom(entry));




Promise.allSettled(promises)
    .then((results) => {
        // console.log(processedData);
        // console.log('processed data')
        console.log(results)
    })
    .catch((err) => console.warn(err));


// console.log(promises);