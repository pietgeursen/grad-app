var start = require('./app')
var vas = require('vas')

var config = require('./config')

var api = vas.connect(require('./services'), config, {url: config.url})
start(document.querySelector('main'), api)
