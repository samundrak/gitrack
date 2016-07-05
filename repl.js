'use strict';
const inquirer = require('inquirer');
const fs = require('fs');
const events = require('events');
const event = new events.EventEmitter();
const _ = require('underscore');

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
        type: 'input',
        name: 'user_name',
        validate,
        message: 'Hello! What is your name? : '
    },
    {
        type: 'input',
        name: 'project_location',
        message: 'Enter project location or leave blank to set current path: '
    },
    {
        type: 'input',
        name: 'web_port',
        validate,
        message: 'Port on web interface will run: '
    }
];

inquirer.prompt(questions).then(function (answers) {
    var config = {};
    config['project'] = {
        'location': answers['project_location']
    }
    config['user'] = {
        'name': answers['user_name']
    }

    config['app'] = {
        'name': 'GitRack',
        'web': {
            'port': answers['web_port'] || 9090
        }
    }

    config['break'] = {
        start: {
            hour: 0,
            minute: 0
        }
    }
    if (!config.project.location || config.project.location.trim().length < 1) {
        console.error('You didn\'t provided path, using current path');
        config.project.location = __dirname;
    }

    let Boot = new require('./Boot');
    let boot = new Boot();
    if (boot.isConfigExist()) {
        let oldConfig = require('./config.json');
        config = _.extendOwn(oldConfig, config);
    } else {
        config['storage'] = {
            'database': {
                'lowdb': 'storage/database/lowdb/data.json'
            }
        };
    }
    config = JSON.stringify(config);
    fs.writeFile('config.json', config, function (err) {
        if (err) throw  new Error('Is permission provided to write file');

        event.emit('replFinished', config);
    });
});
module.exports = event;