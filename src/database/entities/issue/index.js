'use strict';
const Database = require('../../index');


class Provider {

    constructor() {
        this.database = new Database.interface(Database.service.lowDB).database;
        this.database = this.database.get();
        this.prepare = ['init', 'find', 'create'];
    }

    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' method is provided');
            this[item] = options[item];
        });
    }
}

module.exports = Provider;