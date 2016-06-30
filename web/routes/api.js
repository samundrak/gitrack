var express = require('express');
var route = express.Router();

module.exports = function (app, gitTrack) {
    'use strict';
    var dashboard = require('../handlers/app/dashboard')(gitTrack);
    var settings = require('../handlers/app/settings')(gitTrack);
    route.get('/dashboard', dashboard.index);
    route.get('/settings', settings.index);
    route.post('/settings', settings.update);

    app.use('/api', route);
};