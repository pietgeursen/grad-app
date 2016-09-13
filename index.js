var start = require('./app')

var config = require('./config')
var Api = require('./api')

var api = Api(config.host)
start(document.querySelector('main'), api)
