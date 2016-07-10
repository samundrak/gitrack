const _ = require('underscore');
const onNotification = require('./listeners/Notification');
const onStartTimer = require('./listeners/StartTimer');
const onStopApp = require('./listeners/StopApp');
const onRestartApp = require('./listeners/RestartApp');
module.exports = function (app, gitRack, io, server) {
    'use strict';

    io.on('connection', function (client) {
        gitRack.event.on('notification', onNotification(app, gitRack, client));
        client.on('startTimer', onStartTimer(app, gitRack));
        client.on('stopApp',onStopApp);
        client.on('restartApp',onRestartApp(app, server));
    });
}
