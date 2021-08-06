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
        },
        getRandomInt(10, 250)
    );
};

// My solution B starts here
var entries_alreadyProcessed = [];
var entries_thatFailedToProcess = [];

var promiseMaker = (entry) => {
    return new Promise((resolve, reject) => {
        try {
            var handleCallback = (a) => {
                var _processedEntry = {
                    ...entry,
                    success: a,
                };
                resolve(_processedEntry);
            }
            api(handleCallback);
        } catch {
            reject({
                ...entry,
                success: null,
                error: 'An error happened here! Climate-Edge could not complete the API request'
            });
        }
    });
};

var batchedPromises = entries.map((entry, index) => promiseMaker(entry));

Promise.allSettled(batchedPromises)
    .then((results) => {
        results.map(result => {
            if (result.status === 'fulfilled') {
                entries_alreadyProcessed.push(result.value);
            } else {
                //for APIs that failed
                entries_thatFailedToProcess.push(result.reason);
            }
        });
    })
    .catch((err) => {

    });

/*
    * The entries that were processed are pushed into an array called entries_alreadyProcessed
    
    * The entries that failed are pushed into an array called entries_thatFailedToProcess
    
    * The biggest advantage to using Promises.allSettled is that API requests are 
        batched together and processed in a parallel. i.e, we do not have to wait for one 
        request to finish so as to proceed to the next one.

    * The next step is now to save this processed emtries into a database, and save the failed entries into a error log/database.
*/