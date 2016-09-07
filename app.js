import { start, html, pull } from 'inu'
import { App, Domain, Action, navigate } from 'inux'
import Account from './accounts/app'
import Users from './users/app'
import login from './users/views/login'

const view = ({home}, dispatch) => html` 
<main>
	<h1>Hello world</h1>	
	<ul>
		${home.grads.map(function(grad) {
			return html`<div class="grad">${grad.name}</div>`	
		})}
	</ul>
	<button onclick=${() => dispatch(navigate('login'))}>Sign in</button>
</main>
`

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
    ['/login', (_, model, dispatch) => login(model, dispatch)],
    ['/', (params, model, dispatch) => view(model, dispatch)]
  ]
})

module.exports = function startApp (elem, api) {
  const app = App([
    home,
    Account({ api}),
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
