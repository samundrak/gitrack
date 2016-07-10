const _ = require('underscore');
module.exports = function (app, gitRack, client) {
    return function () {
        gitRack.event.on('notification', function (data) {
            client.emit('notification', _.extendOwn(data, {
                on: new Date()
            }));
        });
    };
};
