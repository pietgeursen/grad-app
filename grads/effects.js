const { Effect } = require('inux')

const GET = Symbol('get')
const UPDATE = Symbol('update')
const INIT = Symbol('init')

const get = Effect(GET)
const update = Effect(UPDATE)
const init = Effect(INIT)

module.exports = {
  GET,
  get,
  UPDATE,
  update,
  INIT,
  init}
