'use strict';

const issueModel = require('./issue/jira/index');
class Model {

    constructor(model) {
        this.model = model;
        this.model.init();
    }
}

module.exports = {
    interface: Model,
    model: {
        issueModel
    }
};