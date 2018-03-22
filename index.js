/**
 * Created by fx on 16-11-23.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');

var httpServers = require('./config').httpServers;

httpServers.forEach(function (item) {
    var app = express();
    app.set('views', path.join(process.cwd(), item.path || ''));
    app.engine('html', require('swig').renderFile);
    app.set('view engine', 'html');
    app.use(express.static(path.join(process.cwd(), item.path || '')));
    app.use(logger('dev'));
    app.use(function (req, res, next) {
        res.render('index.html');
    });

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
    app.listen(item.port || 8080, item.ip || '0.0.0.0')
});