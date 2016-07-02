'use strict';

const lowDB = require('./provider/lowdb/index');
class Database {

    constructor(database) {
        this.database = database;
        this.database.init();
    }
}

module.exports = {
    interface: Database,
    service: {
        lowDB
    }
}