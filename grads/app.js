const {pull} = require('inu')
const Push = require('pull-pushable')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const Immutable = require('immutable')
const { List, Set, Map } = require('immutable')

const { SET, set, TOGGLE_FILTER, RESET_FILTER, HIDE_FILTER, UPDATED, updated, CREATED, created} = require('./actions')
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
      [UPDATED]: (model, updatedGrad) => {
        const gradIndex = model.get('grads').findKey((grad) => grad.get('id') === updatedGrad.get('id'))
        return {model: model.setIn(['grads', gradIndex], updatedGrad)} 
      },
      [CREATED]: (model, createdGrad)=> {
        return {model: model.updateIn(['grads'], (grads) => grads.push(createdGrad))} 
      }

    },
    run: {
      [INIT]: () => {
        const p = Push()
        api.service('grads').on('updated', pushUpdatedGrad) 
        api.service('grads').on('patched', pushUpdatedGrad ) 
        api.service('grads').on('created', (grad) => {
          const newGrad = immutableGrad(grad) 
          p.push(created(newGrad))
        }) 
        p.push(run(get()))
        return p

        function immutableGrad(grad) {
          grad = Immutable.fromJS(grad)
          return splitGradSkills(grad)
        }
        function pushUpdatedGrad(grad){
          const newGrad = immutableGrad(grad) 
          p.push(updated(newGrad))
        }
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
