var childProcess = require('child_process');
module.exports = function (gitTrack) {
    return {
        index: function (req, res, next) {
            'use strict';
            let dashboard = {
                git: {
                    current: {
                        branch: gitTrack.project.getBranch()
                    }
                },
                timer: gitTrack.timer,
                config: gitTrack.config,
                issues: gitTrack.issueModel.getAll(),
                logs: gitTrack.logsModel.getAll()
            };
            var breakTimer = gitTrack.breakTimerModel.getAll();
            if (breakTimer.length) {
                breakTimer = breakTimer[breakTimer.length - 1];
                if (!breakTimer.status) {
                    dashboard.break = breakTimer;
                }
            }

            childProcess.exec('cd ' + gitTrack.config.project.location + ' && git remote get-url origin', function (error, result) {

                dashboard.git.remote = result || 'Not Available';
                return res.send(dashboard);
            });
        },

    };
};