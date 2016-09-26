const { pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')
const { List, Set, Map } = require('immutable')
const fromPromise = require('pull-promise/source')

const { SET, set, SET_ERROR, setError } = require('./actions')
const { LOGIN } = require('./effects')

module.exports = User

function User ({ api }) {
  return Domain({
    name: 'user',
    init: () => ({
      model: Map({
        loggedIn: false,
        user: Map()
      }),
    }),
    update: {
      [SET]: (model, user) => {
        console.log(user)
        return {model: 
          model
            .set('user', Map(user))
            .set('loggedIn', true)
            .set('error', null)
        }
      },
      [SET_ERROR]: (model, error) => {
        return {model: model.set('error', error)} 
      }
    },
    run: {
      [LOGIN]: ({email, password}) => {
        const credentials = Object.assign({email, password}, {type: 'local'})
        return pull(
          pullAsync(cb => {
            api.authenticate(credentials)
            .then((res) => {
              cb(null, set(res.data))
            })
            .catch((err) => {
              cb(null, setError(err))// need an error action here. 
            })
          }),
            
        ) 
      }
    }
  })
}
