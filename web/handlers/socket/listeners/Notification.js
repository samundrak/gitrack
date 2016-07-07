const _ = require('underscore');
module.exports = function (app, gitRack) {
    return function (client) {
        gitRack.event.on('notification', function (data) {
            client.emit('notification', _.extendOwn(data, {
                on: new Date()
            }));
        });
    };
};
