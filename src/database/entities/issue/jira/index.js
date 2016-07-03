'use strict';
const Provider = require('../');

const jira = new Provider();

jira.extend({
    init: function () {
        this.model = 'issue.jira';
    },
});
module.exports = jira;
