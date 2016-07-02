const _ = require('underscore');

/**
 *
 * @param timer
 * @param issueModel
 * @param tracker
 * @param event
 * @param issue
 * @param config
 */
module.exports = function (timer, issueModel, tracker, event, issue) {
    'use strict';
    timer.lastTimeOnProject = event.on - timer.updated;
    timer.updated = event.on;

  

    let branch = issueModel.find({issue: event.branch});
    if (!branch) {
        //This is new ticket so update this ticket
        issue.fetch({issueKey: event.branch})
            .then(function (data) {
                event.notes = event.branch + ' ' + data.fields.summary;
                event.issueId = data.id;
                event.issueKey = event.branch;
                issue.transition({
                    issueKey: event.branch,
                    issueId: parseInt(data.id)
                });
                issue.addWorkLog({timer, event});
            })
            .finally(function () {
                tracker.create({timer, event})
                    .then(data => {
                        issueModel.create(_.extendOwn(data, {
                            issue: event.branch,
                            issueId: event.issueId,
                            issueKey: event.issueKey
                        }));
                    });
            });
    } else {
        //This is old ticket update it
        tracker.toggleTimer(branch); // returns Promise

        if (branch.issueId) {
            //This is an issue

            event = _.extendOwn(event, {
                issueId: parseInt(branch.issueId),
                issueKey: branch.issueKey
            });
            issue.transition(event);
            issue.addWorkLog({timer, event});
        }
    }


};