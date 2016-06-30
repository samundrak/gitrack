'use strict';

const jira = require('./provider/jira');

class Issue {

    constructor(service) {
        this.issue = service;
        this.issue.init();
    }

    get() {
        return this.issue.get();
    }

    create() {
        return this.proxyPass('create', arguments);
    }

    fetch() {
        return this.proxyPass('fetch', arguments);
    }

    transition() {
        return this.proxyPass('transition', arguments);
    }

    addWorkLog() {
        return this.proxyPass('addWorkLog', arguments);
    }

    proxyPass(method, params) {
        return this.issue[method].apply(this.issue, params);
    }

}
module.exports = {
    interface: Issue,
    service: {
        jira
    }
}
