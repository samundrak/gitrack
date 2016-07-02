module.exports = function (app, gitRack, io) {
    'use strict';

    io.on('connection', function (client) {
        client.on('stopApp', function () {
            process.exit(0);
        });
    });
}
