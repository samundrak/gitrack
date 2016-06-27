'use strict';

const fs = require('fs');
const Project = require('./src/project');
const events = new require('events');
const event = new events.EventEmitter();


class Boot {

    isConfigExist() {
        try {
            fs.accessSync('config.json', fs.F_OK);
        }
        catch (e) {
            console.warn('You seems new, Lets start');
            return false;
        }
        return true;
    }

    start() {
        const config = require('./config.json');
        const Tracker = require('./src/tracker');
        const tracker = new Tracker.interface(Tracker.service.harvest);
        console.log('GitRack is Running');
        var timer = {
            started: Date.now(),
            updated: Date.now()
        };

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

        /**
         * Listen on the event whenever
         * current branch got changed
         */
        event.on('branchChanged', event => {
                timer.lastTimeOnProject = event.on - timer.updated;
                timer.updated = event.on;
                tracker.create({timer, event});
                console.log(event)
            }
        )

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