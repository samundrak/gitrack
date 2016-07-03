'use strict';
const Database = require('../../index');


class Provider {

    constructor() {
        this.database = new Database.interface(Database.service.lowDB).database;
        this.database = this.database.get();
        this.prepare = ['init'];
    }

    extend(options) {
        this.prepare.forEach(item => {
            if (!options[item]) throw new Error(item + ' method is provided');
            this[item] = options[item];
        });
    }

    find(data) {
        return this.database.get(this.model)
            .find(data)
            .value();
    }

    create(data) {
        return this.database.get(this.model)
            .push(data)
            .value();
    }

    getAll() {
        return this.database.get(this.model)
            .value();
    }

    update(options) {
        this.database.get(this.model)
            .find(options.find)
            .assign(options.update)
            .value();
    }
}

module.exports = Provider;