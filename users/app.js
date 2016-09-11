const { html, pull } = require('inu')
const { Domain, run } = require('inux')
const pullAsync = require('pull-async')

const { SET, set } = require('./actions')
const { GET, get} = require('./effects')

module.exports = User

function User ({ api }) {
  return Domain({
    name: 'user',
    init: () => ({
      model: [],
      effect: get()
    }),
    update: {
      [SET]: (model, users) => ({ model: users })
    },
    run: {
      [GET]: () => {
        return pullAsync(cb => {
          api.user.find({}, (err, users) => {
            console.log(err, users)
            if (err) return console.error(err)
            cb(null, set(users))
          })
        })
      }
    }
  })
}
