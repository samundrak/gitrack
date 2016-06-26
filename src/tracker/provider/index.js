'use strict';

const config = require('../../../config.json');
const notifier = require('node-notifier');
const moment = require('moment');

class Tracker {

    constructor() {
        this.config = config;
        this.notifier = notifier;
        this.prepare = ['init', 'get', 'create'];
        this.moment = moment;
    }

    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' method is not available');
            this[item] = options[item];
        });
    }
}

module.exports = Tracker;