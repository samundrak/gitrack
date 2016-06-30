'use strict';

const config = require('../../../config.json');
const notifier = require('../../notify');
const moment = require('moment');

class Tracker {

    constructor() {
        this.config = config;
        this.notifier = notifier;
        this.prepare = ['init', 'get', 'create', 'toggleTimer'];
        this.moment = moment;
    }

    /**
     * Provide and interface to be part
     * of common Tacker for third party
     * @param options
     */
    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' method is not available');
            this[item] = options[item];
        });
    }
}

module.exports = Tracker;