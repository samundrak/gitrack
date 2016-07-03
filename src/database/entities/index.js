'use strict';

const issueModel = require('./issue/jira/index');
const logsModel = require('./issue/logs');
const breakTimer = require('./issue/break');
class Model {

    constructor(model) {
        this.model = model;
        this.model.init();
    }
}

module.exports = {
    interface: Model,
    model: {
        issueModel,
        logsModel,
        breakTimer
    }
};