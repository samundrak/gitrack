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
                timer: gitTrack.timer
            }
            return res.send(dashboard);
        },

    };
};