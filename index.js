'use strict';
const Boot = require('./Boot');
const boot = new Boot();

var args = process.argv.splice(2);

if (!boot.isConfigExist()) {
    console.log('Please Visit Web Interface for configuration');
    boot.start();
    boot.goForDaemon(args);
}
boot.start();
boot.goForDaemon(args);
