const { pull } = require('inu')
const { Domain, navigate } = require('inux')
const pullAsync = require('pull-async')
const { Map } = require('immutable')

const { SET, set, SET_ERROR, setError } = require('./actions')
const { LOGIN, CREATE_GRAD } = require('./effects')

const User = ({ api }) => {
  return Domain({
    name: 'user',
    init: () => ({
      model: Map({
        loggedIn: false,
        user: Map()
      })
    }),
    update: {
      [SET]: (model, user) => {
        return {model: model
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
      [CREATE_GRAD]: (user) => {
        const grad = Object.assign(user, {roles: "grad"})
        return pull(
          pullAsync(cb => {
            api.service('users').create(user) 
            .then(console.log)
            .catch(console.log)
          }), 
        ) 
      },
      [LOGIN]: ({email, password}) => {
        const credentials = Object.assign({email, password}, {type: 'local'})
        return pull(
          pullAsync(cb => {
            api.authenticate(credentials)
              .then((res) => {
                const user = res.data
                const role = user.roles
                var route;
                if(role === 'admin'){
                  route = '/dashboard' 
                }else if(role === 'grad')
                {
                  route = `/grads/${user.grad.id}/edit` 
                }  
                cb(null, [set(user), navigate(route)])
              })
              .catch((err) => {
                cb(null, [setError(err)])
              })
          }),
          pull.flatten()

        )
      }
    }
  })
}

module.exports = User
