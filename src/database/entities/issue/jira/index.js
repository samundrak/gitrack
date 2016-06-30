'use strict';
const Provider = require('../');

const jira = new Provider();

jira.extend({
    init: function () {
        this.model = 'issue.jira';
    },
    find: function (data) {
        return this.database.get(this.model)
            .find(data)
            .value();
    },
    create: function (data) {
        return this.database.get(this.model)
            .push(data)
            .value();
    }
});
//
module.exports = jira;
