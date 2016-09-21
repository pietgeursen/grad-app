const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set, TOGGLE, toggle } = require('./actions')
const { GET, get} = require('./effects')

const Immutable = require('seamless-immutable')

module.exports = Skills

function Skills ({ api }) {
  return Domain({
    name: 'skills',
    init: () => ({
      model: {
        availableSkills: ['Rails', 'Node', 'Express', 'Python', 'Scala'],
        selectedSkills: {}
      }
    }),
    update: {
      [SET]: (model, skills) => ({ model: skills }),
      [TOGGLE]: (model, skill) => {
        return {
          model: Immutable(model).updateIn(['selectedSkills', skill], (selected) => !selected).asMutable({deep: true})
        }
      }
    },
    run: {
      [GET]: () => {
      }
    }
  })
}
