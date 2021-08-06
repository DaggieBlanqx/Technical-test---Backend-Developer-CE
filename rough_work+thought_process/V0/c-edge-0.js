Assuming that:
    -you have a dataset with 6 entries to process in the following format.

const entries = [
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567890', message: 'Hello World!' },
    { phone: '1234567890', message: 'Hello World!' },
];

-
for each entry you need to call the "api"

function which will execute a callback

function returning true or
false at random in order to mimic success / failure statuses of an API call.

function api(callback) {
    setTimeout(() => {
        callback(Math.random() < 0.5);
    }, 3000);
};

-
the API calls are limited to 500 per second.

function x(callback) {
    setTimeout(function() {
        callback("done");
    }, 1000);
}

x(console.log.bind(console)); //this is special case of console.log
x(alert)

Write a script in JS which can process all entries in an efficient manner and output a data report at the end of the process
and create SQL file of the data to store.

What the report contains and how it is stored in the database is up to you.You can create any tables you need, please provide
the SQL to also create the table(s), and keep in mind that queries to get the report should be efficient.