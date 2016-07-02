'use strict';

const fs = require('fs');
const Project = require('./src/project');
const config = require('./config.json');
const events = new require('events');
const event = new events.EventEmitter();
global.app = {event};
require('./Events')(event);
const Tracker = require('./src/tracker');
const tracker = new Tracker.interface(Tracker.service.harvest);
const Entities = require('./src/database/entities');
const issueModel = new Entities.interface(Entities.model.issueModel).model;
const Issue = require('./src/issue');
const issue = new Issue.interface(Issue.service.jira);
const schedule = require('node-schedule');
const rule = new schedule.RecurrenceRule();
const _ = require('underscore');

class Boot {

    isConfigExist() {
        try {
            fs.accessSync('config.json', fs.F_OK);
        }
        catch (e) {
            return false;
        }
        return true;
    }

    start() {

        var timer = {
            started: Date.now(),
            updated: Date.now()
        };
        console.log('GitRack is Running');

        /**
         * Initilization and setup of project
         *
         * @type {Project}
         */
        const project = new Project(config.project.location);
        project.setGlobalEvent(event)
        project.readHead();
        project.getBranch();
        project.watchProject()
        rule.dayOfWeek = [0, new schedule.Range(1, 6)];
        rule.hour = config.break.start.hour;
        rule.minute = config.break.start.minute;
        // project.pingFile();

        /**
         * Listen on the event whenever
         * current branch got changed
         */
        event.on('branchChanged', event => {
                require('./GitRack')(
                    timer,
                    issueModel,
                    tracker,
                    event,
                    issue,
                    config
                );
            }
        );
        schedule.scheduleJob(rule, function () {
            event.emit('notification', {
                type: 'ínfo',
                title: 'Break Time!',
                message: 'Time for Break.. Have some meal!'
            });
            let branch = issueModel.find({issue: project.getBranch()});
            if (!branch) return;
            tracker.toggleTimer(branch);
            if (branch.issueId) {
                let newEvent = _.extendOwn(event, {
                    issueId: parseInt(branch.issueId),
                    issueKey: branch.issueKey
                });
                issue.addWorkLog({timer, newEvent});
            }
        });
        require('./web/app')({
            timer,
            issueModel,
            tracker,
            event,
            issue,
            config,
            project
        });
    }

    goForDaemon(args) {
        if (args[0] === '-d') {
            console.log('GitRack is going under process, Dont run many \n' +
                'process of same project, to stop process you can xkill it from \n ' +
                'linux on windows press [ctrl + shift + esc] and go on process \n' +
                'and kill the nodejs process');
            require('daemon')();
        }
    }
}

module.exports = Boot;