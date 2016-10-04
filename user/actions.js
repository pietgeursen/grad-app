const { Action } = require('inux')

const SET = Symbol('set')
const SET_ERROR = Symbol('set_error')

const set = Action(SET)
const setError = Action(SET_ERROR)

module.exports = {
  SET,
  set,
  SET_ERROR,
  setError}
