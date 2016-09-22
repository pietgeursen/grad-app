const { Action } = require('inux')

const SET = Symbol('set')
const TOGGLE_FILTER = Symbol('toggle_filter')
const RESET_FILTER = Symbol('reset_filter')
const HIDE_FILTER = Symbol('hide_filter')

const set = Action(SET)
const toggleFilter = Action(TOGGLE_FILTER)
const resetFilter = Action(RESET_FILTER)
const hideFilter = Action(HIDE_FILTER)

module.exports = {
  SET,
  set,
  TOGGLE_FILTER,
  toggleFilter,
  RESET_FILTER,
  resetFilter,
  HIDE_FILTER,
  hideFilter
}
