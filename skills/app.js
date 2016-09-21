const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set, TOGGLE, toggle } = require('./actions')
const { GET, get} = require('./effects')

const Immutable = require('immutable')

module.exports = Skills

function Skills ({ api }) {
  return Domain({
    name: 'skills',
    init: () => ({
      model: {Rails: false, Node: false, Express: false, Python: false, Scala: false}
    }),
    update: {
      [SET]: (model, skills) => ({ model: skills }),
      [TOGGLE]: (model, skill) => {
        return {
          model: Immutable.fromJS(model).update(skill, (selected) => !selected).toJS({deep: true})
        }
      }
    },
    run: {
      [GET]: () => {
      }
    }
  })
}
