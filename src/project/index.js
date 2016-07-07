'use strict';
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');
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
        this.fileExists();
        this.headContent = fs.readFileSync(this.head, 'UTF-8');
        return this;
    }

    fileExists() {
        try {
            fs.accessSync(this.head, fs.F_OK);
        }
        catch (e) {
            throw new Error('Head File is not available');
        }
        return true;
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
        let watcher = chokidar.watch(this.head);
        watcher.on('change', (eventType, filename) => {
            this.runProjectProcess('change', filename);
        });
    }

    runProjectProcess(eventType, filename) {
        let oldBranch = this.getBranch();
        let newBranch = this.readHead().getBranch();
        this.event.emit('branchChanged', {
            on: Date.now(),
            branch: newBranch,
            oldBranch,
            eventType,
            filename
        });
    }

    /**
     * Ping the file so it starts tracking
     * current branch
     * 
     */
    pingFile() {
        if (!this.isGitProject() && !this.fileExists()) {
            return;
        }

        fs.utimes(this.head, new Date(), new Date());
    }

    setGlobalEvent(event) {
        this.event = event;
    }

}

module.exports = Project;