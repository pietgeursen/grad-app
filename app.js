import { start, html, pull } from 'inu'
import { App, Domain, Action, navigate } from 'inux'
// import Account from './accounts/app'
import Users from './users/app'
import summary from './users/views/summary'
import profile from './users/views/profile'
// import login from './users/views/login'

const view = (model, dispatch) => {
  console.log(model)
  return html` 

<main>
	<h1>Hello world</h1>	
	<ul>
		${model.user.map(function(grad) {
			return summary(grad, dispatch) 
		})}
	</ul>
	<button id="login" onclick=${() => dispatch(navigate('login'))}>Sign in</button>
</main>
`}

const home = Domain({
  name: 'home',
  init: () => ({
    model: {grads: [
        {name: 'Piet'},
        {name: 'Katie'}
    ]}
  }),
  update: {},
  routes: [
    // ['/login', (_, model, dispatch) => login(model, dispatch)],
    ['/', (params, model, dispatch) => view(model, dispatch)],
    ['/users/:id', profile]
  ]
})

module.exports = function startApp (elem, api) {
  const app = App([
    home,
    // Account({ api}),
    Users({ api})
  ])
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain(function (view) {
      html.update(elem, view)
    })
  )
}
