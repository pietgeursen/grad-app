const { pull } = require('inu')
const { Domain, navigate } = require('inux')
const pullAsync = require('pull-async')
const { Map } = require('immutable')

const { SET, set, SET_ERROR, setError } = require('./actions')
const { LOGIN } = require('./effects')

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
      [LOGIN]: ({email, password}) => {
        const credentials = Object.assign({email, password}, {type: 'local'})
        return pull(
          pullAsync(cb => {
            api.authenticate(credentials)
              .then((res) => {
                cb(null, [set(res.data), navigate(`/grads/${res.data.grad.id}/edit`)])
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
