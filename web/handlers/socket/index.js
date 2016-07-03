const _ = require('underscore');

module.exports = function (app, gitRack, io) {
    'use strict';

    io.on('connection', function (client) {
        gitRack.event.on('notification', function (data) {
            client.emit('notification', _.extendOwn(data, {
                on: new Date()
            }));
        });

        client.on('stopApp', function () {
            process.exit(0);
        });

        client.on('startTimer', function () {
            var branch = gitRack.breakTimerModel.getAll();
            if (branch.length) {
                branch = branch[branch.length - 1].branch;
                gitRack.breakTimerModel.update({
                    find: {branch, status: 0},
                    update: {status: 1}
                });
            }
            gitRack.project.pingFile();
        });
    });
}
