'use strict';
const Provider = require('./');

const breakTimer = new Provider();

breakTimer.extend({
    init: function () {
        this.model = 'break';
    },
});
module.exports = breakTimer;
