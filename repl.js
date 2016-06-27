/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

'use strict';
var inquirer = require('inquirer');
var fs = require('fs');
var events = require('events');
var event = new events.EventEmitter();

console.log('Hi, Welcome To Gitrack');
var validate = data => {
    if (!data || data.trim().length < 1) {
        console.error("Provided field is empty");
        return false;
    }

    return true;
}
var questions = [
    {
        type: 'rawlist',
        name: 'timer_tracker',
        message: 'Which time tracking tool you are using?',
        choices: [
            'Harvest'
        ],
        validate: function (value) {
            if (value != 1) {
                console.log('Sorry other services is not available now');
                return;
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'tracker_domain',
        message: 'Enter your Tracker\'s subdomain : ',
        validate
    }, {
        type: 'input',
        name: 'tracker_email',
        message: 'What\'s your email of Timer Tracker (ex: Harvest): ',
        validate
    },
    {
        type: 'input',
        name: 'tracker_password',
        message: 'What\'s your password of Timer Tracker (ex: Harvest): ',
        validate
    },
    {
        type: 'input',
        name: 'tracker_project_id',
        message: 'Enter your Project id: ',
        validate
    },
    {
        type: 'input',
        name: 'tracker_task_id',
        message: 'Enter your Task id: ',
        validate
    }, {
        type: 'input',
        name: 'project_location',
        message: 'Enter project location or leave blank to set current path: '
    }
];

inquirer.prompt(questions).then(function (answers) {
    var config = {};
    config[answers['timer_tracker'].toLowerCase()] = {
        project_id: answers['tracker_project_id'],
        email: answers['tracker_email'],
        password: answers['tracker_password'],
        subdomain: answers['tracker_domain'],
        task_id: answers['tracker_task_id']
    };
    config['project'] = {
        'location': answers['project_location']
    }

    if (!config.project.location || config.project.location.trim().length < 1) {
        console.error('You have provided incorrect path, using current path');
        config.project.location = __dirname;
    }
    config = JSON.stringify(config);
    fs.writeFile('config.json', config, function (e) {
        if (e) throw new Error(e);

        event.emit('replFinished', config);
    });
});
module.exports = event;