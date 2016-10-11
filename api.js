const feathers = require('feathers/client')
const hooks = require('feathers-hooks')
const auth = require('feathers-authentication/client')
const io = require('socket.io-client')
const socketio = require('feathers-socketio/client')

const Api = (host) => {
  return feathers()
    .configure(socketio(io(host)))
    .configure(hooks())
    .configure(auth())
}

module.exports = Api
