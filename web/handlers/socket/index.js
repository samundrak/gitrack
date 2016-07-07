const _ = require('underscore');
const onNotification = require('./listeners/Notification');
const onStartTimer = require('./listeners/StartTimer');
const onStopApp = require('./listeners/StopApp');
module.exports = function (app, gitRack, io) {
    'use strict';

    io.on('connection', function (client) {
        gitRack.event.on('notification', onNotification(app, gitRack));
        client.on('startTimer', onStartTimer(app, gitRack));
        client.on('stopApp',onStopApp);
    });
}
