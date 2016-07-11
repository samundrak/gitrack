const child_process = require('child_process');

module.exports = function (app, server) {
    'use strict';
    return function () {
        server.kill();
        process.on('exit', function () {
            child_process.exec('node index.js -d', function (d) {
                console.log(d);
            });
        });
        process.exit(0);
    };
};