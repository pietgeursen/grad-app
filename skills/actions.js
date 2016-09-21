const { Action } = require('inux')

const SET = Symbol('set')
const TOGGLE = Symbol('toggle')

const set = Action(SET)
const toggle = Action(TOGGLE)

module.exports = {
  SET,
  set,
  TOGGLE,
  toggle
}
