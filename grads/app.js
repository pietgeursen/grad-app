const {pull} = require('inu')
const Push = require('pull-pushable')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const Immutable = require('immutable')
const { List, Set, Map } = require('immutable')

const { SET, set, TOGGLE_FILTER, RESET_FILTER, HIDE_FILTER, PATCHED, patched} = require('./actions')
const { GET, get, UPDATE, INIT, init } = require('./effects')

module.exports = Grads

function Grads ({ api }) {
  return Domain({
    name: 'grads',
    init: () => ({
      model: Map({
        grads: List(),
        skillFilters: Map({
          filters: Set(),
          hidden: false
        })
      }),
      effect: init()
    }),
    update: {
      [SET]: (model, grads) => {
        return {model: model.set('grads', grads)}
      },
      [TOGGLE_FILTER]: (model, filter) => {
        return {model: model.updateIn(['skillFilters', 'filters'], (filters) => {
          return filters.has(filter) ? filters.delete(filter) : filters.add(filter)
        })}
      },
      [RESET_FILTER]: (model, filter) => {
        return {model: model.setIn(['skillFilters', 'filters'], Set())}
      },
      [HIDE_FILTER]: (model, filter) => {
        return {model: model.updateIn(['skillFilters', 'hidden'], (hidden) => !hidden)}
      },
      [PATCHED]: (model, patchedGrad) => {
        const gradIndex = model.get('grads').findKey((grad) => grad.get('id') === patchedGrad.get('id'))
        return {model: model.setIn(['grads', gradIndex], patchedGrad)} 
      }

    },
    run: {
      [INIT]: () => {
        const p = Push()
        api.service('grads').on('patched', (grad)=> {
          grad = Immutable.fromJS(grad)
          grad = splitGradSkills(grad)
          p.push(patched(grad))
        }) 
        p.push(run(get()))
        return p
      },
      [GET]: () => {
        return pullAsync(cb => {
          api.service('grads').find({}, (err, grads) => {
            if (err) return console.error(err)
            grads = Immutable.fromJS(grads)
            grads = grads.map(splitGradSkills)
            cb(null, set(grads))
          })
        })
      },
      [UPDATE]: (grad) => {
        api.service('grads').patch(grad.id, grad, console.log )
      }
    }
  })
}

function splitGradSkills(grad) {
  return grad.update('skills', (skills) => {
    return List(skills ? skills.split(' ') : [''])
  })
}
