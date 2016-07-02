'use strict';

const config = require('../../../config.json');
const moment = require('moment');
class Provider {

    constructor() {
        this.config = config;
        this.moment = moment;
        this.prepare = ['init', 'get'];
    }

    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' is not available');
            this[item] = options[item];
        });
    }
}
module.exports = Provider;