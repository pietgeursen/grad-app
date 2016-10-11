const domready = require('domready')
const start = require('./app')

const config = require('./config')
const Api = require('./api')

const api = Api(config.host)

domready(() => {
  start(document.querySelector('main'), api)
})
