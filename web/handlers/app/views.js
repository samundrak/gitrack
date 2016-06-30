module.exports =
{
    partials: function (req, res) {
        "use strict";
        let view = req.params.views + '/partials/' + req.params.partials;
        return res.render(view);
    }
}