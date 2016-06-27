'use strict';

const Tracker = require('../');


const harvest = new Tracker();
harvest.extend({
    init: function () {
        let Harvest = require('harvest');
        let harvest = new Harvest({
            subdomain: this.config.harvest.subdomain,
            email: this.config.harvest.email,
            password: this.config.harvest.password
        });
        this.tracker = harvest.TimeTracking;
    },
    get: function () {
        return this.tracker;
    },
    create: function (data, callback) {


        var cb = callback ? callback : (err, tasks) => {
            if (err) {
                console.log(err)
                return this.notifier.notify({
                    title: 'Error',
                    message: err
                });
            }

            console.log(tasks);
            this.notifier.notify({
                title: 'Timer Created',
                message: 'Timer has been created for branch ' + data.event.branch
            });
        };
        let date = new Date();
        let createDetails = {
            project_id: this.config.harvest.project_id,
            task_id: this.config.harvest.task_id,
            notes: data.event.branch,
            'spent_at': date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
        this.tracker.create(createDetails, cb);
    }
});

module.exports = harvest;