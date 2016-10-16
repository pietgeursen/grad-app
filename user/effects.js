const { Effect } = require('inux')

const LOGIN = Symbol('login')
const CREATE_GRAD = Symbol('create')
const login = Effect(LOGIN)
const create = Effect(CREATE_GRAD)

module.exports = {
  LOGIN,
  login,
  CREATE_GRAD,
  create
}
