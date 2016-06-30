'use strict';

const Tracker = require('../');
const Promise = require('bluebird');

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
    create: function (data) {


        let date = new Date();
        let createDetails = {
            project_id: this.config.harvest.project_id,
            task_id: this.config.harvest.task_id,
            notes: data.event.notes,
            'spent_at': date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        }
        let self = this;
        return new Promise((resolve, reject)=> {
            self.tracker.create(createDetails, (err, tasks) => {
                if (err) {
                    self.notifier.notify({
                        title: 'Error',
                        message: err
                    });
                    return reject(err);
                }

                self.notifier.notify({
                    title: 'Timer Created',
                    message: 'Timer has been created for branch ' + data.event.branch
                });
                return resolve(tasks);
            });
        });
    },
    toggleTimer(data){
        let self = this;
        let updateDetails = {
            project_id: this.config.harvest.project_id,
            task_id: this.config.harvest.task_id,
            id: data.id
        };
        return new Promise((resolve, reject)=> {
            self.tracker.toggleTimer(updateDetails, (err, tasks) => {
                if (err) {
                    self.notifier.notify({
                        title: 'Error',
                        message: "Error while updating branch " + data.issue
                    });
                    return reject(err);
                }

                self.notifier.notify({
                    title: 'Timer  Updated',
                    message: 'Timer has been updated for branch ' + data.issue
                });
                return resolve(tasks);
            });
        });
    }
});

module.exports = harvest;