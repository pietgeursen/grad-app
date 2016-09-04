import { start, html, pull } from 'inu'
import { App, Domain, Action } from 'inux'

import mutants from 'pull-dom-mutants'

const view = ({home}, dispatch) => html` 
<main>
	<h1>Hello world</h1>	
	<ul>
		${home.grads.map(function(grad) {
			return html`<div class="grad">${grad.name}</div>`	
		})}
	</ul>
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
    ['/', (params, model, dispatch) => view(model, dispatch)]
  ]
})

const app = App([home])

module.exports = function startApp (elem) {
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain(function (view) {
      html.update(elem, view)
    })
  )
}
