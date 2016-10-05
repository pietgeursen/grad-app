var pull = require('pull-stream')
var { drain } = require('pull-stream')
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

const gradUser = {
  id: 2,
  email: 'piet@derp.com',
  roles: 'grad',
  grad
}
const adminUser = {
  id: 3,
  email: 'admin@derp.com',
  roles: 'admin'
}

function mockClient (services) {
  return {
    service: (serviceName) => (
    services[serviceName]
    )
  }
}
function mockService (resource) {
  var emitters = {}
  return {
    find: (o, cb) => (
      cb(null, resource)
    ),
    on: (ev, cb) => (
      emitters[ev] = cb
    ),
    emitters
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
  [/^I am a registered grad/, function (t, world) {
    world.email = 'pietgeursen@gmail.com'
    const gradsService = mockService([grad])
    const usersService = mockService([gradUser])
    const authenticate = () => (
      Promise.resolve({data: gradUser})
    )
    world.client = mockClient({
      grads: gradsService,
      users: usersService
    })
    world.client.authenticate = authenticate
    t.ok(true)
    t.end()
  }],
  [/^I click on login$/, function (t, world) {
    const loginSelector = '#login'
    pull(
      world.mutants.find(loginSelector),
      drain((button) => {
        t.ok(button)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I click on a grad's profile$/, function (t, world) {
    pull(
      world.mutants.find('.view-grad'),
      drain(function (button) {
        t.ok(button.click)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I fill out valid credentials$/, function (t, world) {
    pull(
      world.mutants.click('input[type="submit"]'),
      drain(function (button) {
        t.ok(button)
        t.end()
        return false
      })
    )
  }],
  [/^I am on the home page$/, function (t, world) {
    const window = require('global/window')
    const main = window.document.createElement('main')
    world.mutants = createMutants(main, window)

    window.history.pushState({}, null, '/')

    window.document.body.appendChild(main)
    startApp(main, world.client)

    t.ok(true)
    t.end()
  }],
  [/^I should see a grad's profile page$/, function (t, world) {
    pull(
      world.mutants.find('#home'),
      drain(homeButton => {
        t.ok(homeButton)
        t.end()
      })
    )
  }],
  [/^I should see a list of graduates$/, function (t, world, params) {
    pull(
      world.mutants.find('.grad'),
      drain(function (elem) {
        t.ok(elem)
        t.end()
        return false
      })
    )
  }],
  [/^I should see a form to edit my profile$/, function (t, world, params) {
    pull(
      world.mutants.find('#edit-grad'),
      drain(function (form) {
        t.ok(form)
        t.end()
        return false
      })
    )
  }]

]

function createMutants(el, window) {
  return {
    find,
    click,
    mutants
  } 
  function mutants() {
    return domMutant(el, window)  
  }
  function find(selector, opts) {
    const newElements = pull(
      mutants(),
      selectTargetEl(selector)
    ) 
    const currentElements = pull.once(el.querySelector(selector)) 
    return many([
      newElements,
      currentElements 
    ])
  }
  function click(selector, opts) {
    return pull(
      find(selector, opts),
      pull.map(el => {
        el.click() 
        return el
      })
    ) 
  }
  function selectTargetEl (selector) {
    return pull(
      pull.filter(function (mutation) {
        return mutation.target.querySelector(selector)
      }),
      pull.map(function (mutation) {
        return mutation.target.querySelector(selector)
      })
    )
  }
}
