'use strict';
const Provider = require('./');

const logs = new Provider();

logs.extend({
    init: function () {
        this.model = 'logs';
    }
});
module.exports = logs;
