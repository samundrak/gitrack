module.exports = function (app, gitRack) {
    'use strict';
    return function () {
        var branch = gitRack.breakTimerModel.getAll();
        if (branch.length) {
            branch = branch[branch.length - 1].branch;
            gitRack.breakTimerModel.update({
                find: {branch, status: 0},
                update: {status: 1}
            });
        }
        gitRack.project.pingFile();
    };
};