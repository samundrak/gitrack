'use strict';

const Issue = require('../');
const Promise = require('bluebird');
const JiraClient = require('jira-connector');
const _ = require('underscore');
require('moment-duration-format');

const jira = new Issue();
jira.extend({
    init: function () {
        this.issue = new JiraClient({
            host: this.config.jira.host,
            basic_auth: this.config.jira.basic_auth
        }).issue;
    },
    get: function () {
        return this.issue;
    },
    fetch(data){
        var self = this;
        return new Promise(function (resolve, reject) {
            self.issue.getIssue({
                issueKey: data.issueKey
            }, function (error, issue) {
                if (error) {
                    self.event.emit('notification', {
                        type: 'error',
                        title: 'Error fetching Issue',
                        message: data.issueKey + ' is not JIRA Issue'
                    });
                    return reject(error);
                }

                return resolve(issue);
            });
        });
    },
    transition: function (data) {
        var self = this;
        return new Promise(function (resolve, reject) {

            self.issue.getTransitions({
                issueKey: data.issueKey
            }, function (error, transition) {
                if (error) {
                    self.event.emit('notification', {
                        type: 'error',
                        title: 'Error',
                        message: 'Error on transition of issue ' + data.issueKey
                    });
                    return reject(error);
                }

                if (!transition.transitions && !Array.isArray(transition.transitions))
                    return;

                let inProgressTransition = _.find(transition.transitions, function (item) {
                    return item.name === self.config.jira.status.progress;
                });
                let transitionDetails = {
                    issueKey: data.issueKey,
                    transition: {
                        id: inProgressTransition.id
                    }
                }
                self.issue.transitionIssue(transitionDetails, function (err, issue) {
                    if (err) {
                        self.event.emit('notification', {
                            type: 'error',
                            title: 'Error',
                            message: 'Error on transition of issue ' + data.issueKey
                        });
                        return reject(err);
                    }

                    self.event.emit('notification', {
                        type: 'success',
                        title: 'Issue Transition done',
                        message: 'Status has been Changed to ' + inProgressTransition.name + ' of issue ' + data.issueKey
                    });
                    return resolve(issue);
                });
            });

        });
    },
    addWorkLog: function (data) {
        var self = this;
        let momentDuration = this.moment.duration(data.timer.lastTimeOnProject, 'milliseconds');
        let newEstimate = momentDuration.format('y[y] M[M] d[d] h[h] m[m] s[s]');
        let timeSpent = momentDuration.format('s');
        if (timeSpent < this.config.jira.minWorkLogTime) {
            return;
        }
        let jiraFields = {
            issueKey: data.event.oldBranch,
            worklog: {
                'comment': 'Updated work on this issue',
                'started': this.moment(data.timer.updated).format('Y-M-DTH:m:s.SSSZZ'),
                'timeSpentSeconds': timeSpent
            }
        };
        return new Promise(function (resolve, reject) {
            self.issue.addWorkLog(jiraFields, function (err, issue) {
                if (err) {
                    console.log(err);

                    self.event.emit('notification', {
                        type: 'error',
                        title: 'Error',
                        message: 'Error adding worklog of issue ' + data.event.oldBranch
                    });
                    return reject(err);
                }

                self.event.emit('notification', {
                    type: 'success',
                    title: 'Worklog added',
                    message: newEstimate + ' Worklog has been added for ' + data.event.oldBranch
                });
                return resolve(issue);
            });
        });
    }

})
;
module.exports = jira;