'use strict';

/**
 * Tracker works as proxy
 * It handles the request sanitize and filter
 * if needed and then pass it to appropriate handler
 */
const harvest = require('./provider/harvest');
class Tracker {

    constructor(service) {

        this.tracker = service;
        this.tracker.init();
    }
    
    get() {
        this.tracker.get();
    }

    create() {
        return this.proxyPass('create', arguments);
    }

    toggleTimer() {
        return this.proxyPass('toggleTimer', arguments);
    }

    proxyPass(method, params) {
        return this.tracker[method].apply(this.tracker, params);
    }

}
module.exports = {
    interface: Tracker,
    service: {
        harvest
    }
}
