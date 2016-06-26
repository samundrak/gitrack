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
                return this.notifier.notify({
                    title: 'Error',
                    message: err
                });
            }

            console.log(tasks);
            this.notifier.notify('Task has been created for branch ' + data.event.oldBranch);
        };

        let createDetails = {
            project_id: this.config.harvest.project_id,
            task_id: this.config.harvest.task_id,
            'hours_without_timer': data.timer.lastTimeOnProject,
            notes: data.event.oldBranch,
            'spent_at': this.moment().format('Y-m-d'),
            started_at: data.timer.updated,
            ended_at: Date.now(),
        }
        this.tracker.create(createDetails, cb);
    }
});

module.exports = harvest;