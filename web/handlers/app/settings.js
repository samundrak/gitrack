const fs = require('fs');
module.exports = function (gitTrack) {
    return {
        index: function (req, res, next) {
            'use strict';
            res.send(gitTrack.config);
        },
        update: function (req, res, next) {
            'use strict';


            fs.writeFile('./config.json', JSON.stringify(req.body), (error, result)=> {
                if (error) {
                    return res.send({
                        success: 0,
                        message: 'Unable to update file'
                    });
                }

                return res.send({
                    success: 1,
                    message: 'Configuration has been saved'
                });
            });
        }
    };
};