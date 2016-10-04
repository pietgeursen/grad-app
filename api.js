var feathers = require('feathers/client')
var hooks = require('feathers-hooks')
var auth = require('feathers-authentication/client')
var io = require('socket.io-client')
var socketio = require('feathers-socketio/client');

module.exports = function Api (host) {
  return feathers()
    .configure(socketio(io(host)))
    .configure(hooks())
    .configure(auth())
}
