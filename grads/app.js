const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set } = require('./actions')
const { GET, get} = require('./effects')

module.exports = Grads

function Grads ({ api }) {
  return Domain({
    name: 'grads',
    init: () => ({
      model: [],
      effect: get()
    }),
    update: {
      [SET]: (model, grads) => {
        return { model: grads.map((grad) => {
          grad.skills = grad.skills.split(' ') 
          return grad
        })}
      }
    },
    run: {
      [GET]: () => {
        return pullAsync(cb => {
          api.service('grads').find({}, (err, grads) => {
            if (err) return console.error(err)
            cb(null, set(grads))
          })
        })
      }
    }
  })
}
