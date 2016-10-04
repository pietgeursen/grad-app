const { Action } = require('inux')

const SET = Symbol('set')
const TOGGLE_FILTER = Symbol('toggle_filter')
const RESET_FILTER = Symbol('reset_filter')
const HIDE_FILTER = Symbol('hide_filter')
const UPDATED = Symbol('updated')
const CREATED = Symbol('created')

const set = Action(SET)
const toggleFilter = Action(TOGGLE_FILTER)
const resetFilter = Action(RESET_FILTER)
const hideFilter = Action(HIDE_FILTER)
const updated = Action(UPDATED)
const created = Action(CREATED)

module.exports = {
  SET,
  set,
  TOGGLE_FILTER,
  toggleFilter,
  RESET_FILTER,
  resetFilter,
  HIDE_FILTER,
  hideFilter,
  UPDATED,
  updated,
  CREATED,
  created
}
