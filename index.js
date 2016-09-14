var domready = require('domready')
var start = require('./app')

var config = require('./config')
var Api = require('./api')

var api = Api(config.host)

domready(function () {
  start(document.querySelector('main'), api)
})
