var pull = require('pull-stream')
var {once, asyncMap, drain} = require('pull-stream')
var domMutant = require('pull-dom-mutants')
var many = require('pull-many')

var startApp = require('../../app')

const grad = {
  id: 1,
  user_id: 2,
  name: 'Piet Geursen',
  image_link: 'http://26.media.tumblr.com/tumblr_lh3j390T241qfyzelo1_1280.jpg',
  github_link: 'https://github.com/pietgeursen',
  phone: '+6427424333',
  skills: 'Node Rails',
  short_description: 'Learning fiend, teacher, coder',
  long_description: `Kia ora.. Left my scooter outside the dairy, this bloody scarfie is as chronic as a rough as guts bloke. Mean while, in West Auckland, Sir Edmond Hillary and Jim Hickey were up to no good with a bunch of thermo-nuclear marmite shortages. Fully, spit the dummy. The chocka full force of his playing rugby was on par with Bazza's fully sick chilly bin. I was just at home having some dots...., rack off.`
}

const user = {
  id: 2,
  email: 'piet@derp.com',
  grad
}

function mockClient (services) {
  return {
    service: (serviceName) => (
      services[serviceName]
    )
  }
}
function mockService (resource) {
  var emitter
  return {
    find: (o, cb) => (
      cb(null, resource)
    ),
    on: (ev, cb) => (
      emitter = cb 
    )
  }
}

module.exports = [
  [/^I am a potential employer$/, function (t, world) {
    const gradsService = mockService([grad])
    world.client = mockClient({grads: gradsService})
    t.ok(true)
    t.end()
  }],
  [/^I am an admin$/, function (t, world) {
    t.end()
  }],
  [/^I am a grad$/, function (t, world) {
    t.end()
  }],
  [/^I am a registered user$/, function (t, world) {
    world.email = 'pietgeursen@gmail.com'
    const gradsService = mockService([grad])
    const usersService = mockService([user])
    const authenticate =  () => (
      Promise.resolve({data: user}) 
    )
    world.client = mockClient({
      grads: gradsService, 
      users: usersService, 
    })
    world.client.authenticate = authenticate
    t.ok(true)
    t.end()
  }],
  [/^I click on login$/, function (t, world) {
    const loginSelector = '#login'
    pull(
      world.mainMutations,
      find(loginSelector),
      pull.drain((button) => {
        t.ok(button) 
        button.click()
        t.end()
        return false
      }) 
    )
  }],
  [/^I click on a grad's profile$/, function (t, world) {
    pull(
      world.mainMutations,
      find('.view-grad'),
      pull.drain(function (button) {
        t.ok(button.click)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I fill out valid credentials$/, function (t, world) {
    pull(
      world.mainMutations,
      find('input[type="submit"]'),
      pull.drain(function (button) {
        t.ok(button.click)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I am on the home page$/, function (t, world) {
    const window = require('global/window')
    world.window = window
    const main = window.document.createElement('main')
    window.history.pushState({}, null, '/')
    window.document.body.appendChild(main)
    world.main = main
    world.mainMutations = domMutant(main, {window})
    startApp(main, world.client)
    t.ok(true)
    t.end()
  }],
  [/^I should see a grad's profile page$/, function (t, world) {
    const homeButton = world.main.querySelector('#home')
    t.ok(homeButton)
    t.end()
  }],
  [/^I should see a list of graduates$/, function (t, world, params) {
    pull(
      world.mainMutations,
      find('.grad'),
      pull.drain(function (elem) {
        t.ok(elem)
        t.end()
        return false
      })
    )
  }],
  [/^I should see a form to edit my profile$/, function(t, world, params) {
    const form = world.main.querySelector('#edit-grad')
    pull(
      domMutant(world.main, {window: world.window}),
      find('#edit-grad'),
      pull.drain(function (form) {
        t.ok(form)
        t.end()
        return false
      })
    )
  }]
    
]

function find (selector) {
  return pull(
    pull.filter(function (mutation) {
      return mutation.target.querySelector(selector)
    }),
    pull.map(function (mutation) {
      return mutation.target.querySelector(selector)
    })
  )
}
function findAll(selector) {
  
}
