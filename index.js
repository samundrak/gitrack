'use strict';

const request = require('request');
const path = require('path');
const Project = require('./src/project');
const config = require('./config.json');
const events = new require('events');
const event = new events.EventEmitter();
const moment = require('moment');
const Tracker = require('./src/tracker');
const tracker = new Tracker.interface(Tracker.service.harvest);

var timer = {
    started: Date.now(),
    updated: Date.now()
};

const project = new Project(config.project.location);
project.setGlobalEvent(event)
project.readHead();
project.getBranch();
project.watchProject()

event.on('branchChanged', event => {
        timer.lastTimeOnProject = event.on - timer.updated;
        timer.updated = event.on;
        // tracker.create({timer, event});
        console.log(event)
    }
)
 