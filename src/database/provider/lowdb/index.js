'use strict';
const DatabaseProvider = require('../');
const low = require('lowdb');
const path = require('path');
const lowDB = new DatabaseProvider();
lowDB.extend({
    init: function () {
        this.db = low(path.join(__dirname, '../../../../' + this.config.storage.database.lowdb))
        this.db.defaults({
            logs: [],
            break: [],
            date: {
                current_date: new Date()
            },
            tracker: {
                harvest: []
            }, issue: {
                jira: []
            }
        }).value();
        let dbDate = new Date(this.db.get('date.current_date').value());
        dbDate = this.moment(dbDate).format('Y-M-D');
        let curDate = this.moment(new Date()).format('Y-M-D');
        if (curDate != dbDate) {
            this.db.set('date.current_date', new Date())
                .value();
            this.db.set('issue.jira', []).value();
            this.db.set('logs', []).value();
            this.db.set('break', []).value();
        }
    },

    get: function () {
        return this.db;
    }
});
module.exports = lowDB;