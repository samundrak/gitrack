'use strict';
const fs = require('fs');
const path = require('path');

class Project {

    constructor(path) {
        this.path = path;
        this.git = '.git';
        this.head = undefined;
    }

    /**
     * Checks if current folder is associated with
     * git or not
     *
     * @returns {boolean}
     */
    isGitProject() {
        let gitPath = path.join(this.path, this.git);
        try {
            fs.accessSync(gitPath, fs.F_OK);
        } catch (e) {
            return false;
        }
        this.head = path.join(gitPath, 'HEAD');
        return true;
    }

    /**
     * Reads the content of head file
     * @returns {*}
     */
    readHead() {
        if (!this.isGitProject()) throw new Error('This is not  git project');
        try {
            fs.accessSync(this.head, fs.F_OK);
        }
        catch (e) {
            throw new Error('Head File is not available');
        }

        this.headContent = fs.readFileSync(this.head, 'UTF-8');
        return this;
    }

    /**
     * Will provide the current branch
     * but before it readHEAD must be called
     *
     * @returns {string}
     */
    getBranch() {
        if (!this.headContent) throw new Error('No head content found');

        let head = this.headContent.split('/');
        head = head[head.length - 1];
        return this.branch = head.trim();
    }

    /**
     * Keeps watching git's HEAD file
     * whenever its changed an event 'branchChanged' is triggered
     */
    watchProject() {
        fs.watch(this.head, (eventType, filename) => {
            if (eventType != 'change') return;
            let oldBranch = this.getBranch();
            let newBranch = this.readHead().getBranch();
            if (oldBranch === newBranch) return;
            this.event.emit('branchChanged', {
                on: Date.now(),
                branch: this.readHead().getBranch(),
                oldBranch,
                eventType,
                filename
            });
        });
    }

    setGlobalEvent(event) {
        this.event = event;
    }

    getGlobalEvent() {
        return this.event;
    }
}

module.exports = Project;