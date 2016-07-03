const notifier = require('./src/notify');
const Entities = require('./src/database/entities');
const logsModel = new Entities.interface(Entities.model.logsModel).model;

module.exports = function (event) {
    'use strict';

    event.on('notification', function (data) {
        notifier.notify({
            title: data.title,
            message: data.message
        });

        logsModel.create(data);
    });
}