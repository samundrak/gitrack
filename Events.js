const notifier = require('./src/notify');

module.exports = function (event) {
    'use strict';

    event.on('notification', function (data) {
        notifier.notify({
            title: data.title,
            message: data.message
        });
    });
}