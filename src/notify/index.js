'use strict';
const path = require('path');
const notifier = require('node-notifier');
const _ = require('underscore');

class Notifier {

    constructor() {
        this.provider = notifier;
    }

    notify() {
        let args = _.map(arguments, item => {
            return _.extendOwn(item, {
                icon: path.join(__dirname, '../../assets/git_repository.png')
            });
        });
        this.provider['notify'].apply(this.provider, args);
    }
}

module.exports = new Notifier();