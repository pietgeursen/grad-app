const { Effect } = require('inux')

const LOGIN = Symbol('login')
const login = Effect(LOGIN)

module.exports = {
  LOGIN,
  login
}
