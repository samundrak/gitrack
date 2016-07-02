const express = require('express');
const router = express.Router();
const views = require('../handlers/app/views');
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: req.config.app.name});
});

router.get('/views/:views/partials/:partials', views.partials);
module.exports = router;
