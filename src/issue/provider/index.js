'use strict';

const config = require('../../../config.json');
const notifier = require('../../notify');
const moment = require('moment');

class Issue {
    constructor() {
        this.config = config;
        this.notifier = notifier;
        this.prepare = ['init', 'get', 'fetch', 'transition', 'addWorkLog'];
        this.moment = moment;
        this.event = global.app.event;
    }

    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' method is not available');
            this[item] = options[item];
        });
    }
}

module.exports = Issue;