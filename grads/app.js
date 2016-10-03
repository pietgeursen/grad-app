const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const Immutable = require('immutable')
const { List, Set, Map } = require('immutable')

const { SET, set, TOGGLE_FILTER, RESET_FILTER, HIDE_FILTER } = require('./actions')
const { GET, get, UPDATE } = require('./effects')

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
      effect: get()
    }),
    update: {
      [SET]: (model, grads) => {
        return {model: model.set('grads', grads)}
      },
      [TOGGLE_FILTER]: (model, filter) => {
        return {model: model.updateIn(['skillFilters','filters'], (filters) => {
          return filters.has(filter) ? filters.delete(filter) : filters.add(filter) 
        })}
      },
      [RESET_FILTER]: (model, filter) => {
        return {model: model.setIn(['skillFilters','filters'], Set())}
      },
      [HIDE_FILTER]: (model, filter) => {
        return {model: model.updateIn(['skillFilters', 'hidden'], (hidden) => !hidden)} 
      }

    },
    run: {
      [GET]: () => {
        return pullAsync(cb => {
          api.service('grads').find({}, (err, grads) => {
            if (err) return console.error(err)
            grads = Immutable.fromJS(grads)
            grads = grads.map((grad) => {
              return grad.update('skills', (skills) => {
                return List(skills ? skills.split(' ') : [''] )
              })
            })
            cb(null, set(grads))
          })
        })
      },
      [UPDATE]: (grad) => {
        return pullAsync(cb => {
          api.service('grads').patch(grad.id, grad, cb) 
        }) 
      }
    }
  })
}
