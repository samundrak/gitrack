'use strict';

class Tracker {

    constructor(service) {
        this.tracker = service;
        this.tracker.init();
    }

    get() {
        this.tracker.get();
    }

    create() {
        this.proxyPass('create', arguments);
    }

    update() {
        this.proxyPass('update', arguments);
    }

    delete() {
        this.proxyPass('delete', arguments);
    }

    proxyPass(method, params) {
        this.tracker[method].apply(this.tracker, params);
    }

}

module.exports = {
    interface: Tracker,
    service: {
        'harvest': require('./provider/harvest')
    }
}
