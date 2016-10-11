const pull = require('pull-stream')
const { drain } = require('pull-stream')
const createDomStream = require('pull-dom-driver')

const startApp = require('../../app')

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
// const adminUser = {
//  id: 3,
//  email: 'admin@derp.com',
//  roles: 'admin'
// }

const mockClient = (services) => {
  return {
    service: (serviceName) => (
    services[serviceName]
    )
  }
}
const mockService = (resource) => {
  const emitters = {}
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
  [/^I am a potential employer$/, (t, world) => {
    const gradsService = mockService([grad])
    world.client = mockClient({grads: gradsService})
    t.ok(true)
    t.end()
  }],
  [/^I am an admin$/, (t, world) => {
    t.end()
  }],
  [/^I am a registered grad/, (t, world) => {
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
  [/^I click on login$/, (t, world) => {
    const loginSelector = '#login'
    pull(
      world.dom.find(loginSelector),
      drain((button) => {
        t.ok(button)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I click on a grad's profile$/, (t, world) => {
    pull(
      world.dom.find('.view-grad'),
      drain((button) => {
        t.ok(button.click)
        button.click()
        t.end()
        return false
      })
    )
  }],
  [/^I fill out valid credentials$/, (t, world) => {
    pull(
      world.dom.click('input[type="submit"]'),
      drain((button) => {
        t.ok(button)
        t.end()
        return false
      })
    )
  }],
  [/^I am on the home page$/, (t, world) => {
    const window = require('global/window')
    const main = window.document.createElement('main')
    world.dom = createDomStream(main)

    window.history.pushState({}, null, '/')

    window.document.body.appendChild(main)
    startApp(main, world.client)

    t.ok(true)
    t.end()
  }],
  [/^I should see a grad's profile page$/, (t, world) => {
    pull(
      world.dom.find('#home'),
      drain(homeButton => {
        t.ok(homeButton)
        t.end()
      })
    )
  }],
  [/^I should see a list of graduates$/, (t, world, params) => {
    pull(
      world.dom.find('.grad'),
      drain((elem) => {
        t.ok(elem)
        t.end()
        return false
      })
    )
  }],
  [/^I should see a form to edit my profile$/, (t, world, params) => {
    pull(
      world.dom.find('#edit-grad'),
      drain((form) => {
        t.ok(form)
        t.end()
        return false
      })
    )
  }]

]

