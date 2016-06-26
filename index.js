'use strict';

const Boot = require('./Boot');
const boot = new Boot();

var args = process.argv.splice(2);

if (!boot.isConfigExist()) {
    let event = require('./repl');
    event.on('replFinished', function () {
        boot.start();
        boot.goForDaemon(args);
    });
    return;
}
boot.start();
boot.goForDaemon(args);
