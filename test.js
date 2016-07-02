var JiraClient = require('jira-connector');
var _ = require('underscore');
var moment = require('moment');


var jira = new JiraClient({
    host: 'samundrak.atlassian.net',
    basic_auth: {
        username: 'samundrak@yahoo.com',
        password: 'br0adlink'
    }
});

jira.status.getAllStatuses({
}, function(e, i){
    "use strict";
    console.log(e)
    console.log(i)
});
// return;
// var timer = {
//     started: 1467388560578,
//     updated: 1467388563772,
//     lastTimeOnProject: 3194
// }
//
// var d = moment(Date.now()).format("Y-M-DTH:m:s.SSSZZ");
// var worklog = {
//     issueKey: 'TEST-12',
//     // newEstimate: '16s',
//     worklog: {
//         "comment": "new Testing" +  Date.now(),
//         "started": d,//'2016-06-20T15:37:17.211+0000',
//         "timeSpentSeconds": 60
//     }
// }
// console.log(d)
// console.log(worklog.worklog.started)
// // return;
// jira.issue.addWorkLog(worklog
//     , function (error, issue) {
//         console.log(error);
//         console.log(issue);
//     });
//
jira.issue.getTransitions({
    issueKey: 'TEST-14'
}, function (error, transition) {
    "use strict";
    transition.transitions.forEach( item =>{

        console.log(item.to)
    })
    // console.log(transition)
});
// //
// // jira.issue.transitionIssue({
// //     issueKey: 'TEST-14',
// //     transition: {
// //         id: 21
// //     }
// // }, function (error, transition) {
// //     "use strict";
// //     console.log(error);
// //     console.log(transition);
// // });

// var schedule = require('node-schedule');
// var rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 0;
// rule.minute = 43;
//
// var j = schedule.scheduleJob(rule, function(){
//     console.log('Today is recognized by Rebecca Black!');
// });


