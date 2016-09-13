var feathers = require('feathers/client')
var hooks = require('feathers-hooks')
var auth = require('feathers-authentication/client')
var rest = require('feathers-rest/client')
var superagent = require('superagent')

// var server = app.listen(port)
module.exports = function Api (host) {
  return feathers()
    .configure(rest(host).superagent(superagent))
    .configure(hooks())
    .configure(auth())
}
