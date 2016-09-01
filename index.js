import { start, html, pull } from 'inu'
import { App, Domain, Action } from 'inux'

const view = (model, dispatch) => html` 
<main>
	<h1>Hello world</h1>	
</main>
`

const home = Domain({
  name: 'home',
  init: () => ({
    model: {}
  }),
  update: {},
  routes: [
    ['/', (params, model, dispatch) => view(model, dispatch)]
  ]
})

const app = App([home])
const sources = start(app)

const main = document.querySelector('main')

pull(
  sources.views(),
  pull.drain(function (view) {
    html.update(main, view)
    if (window.inuRendered) window.inuRenedered(view)
  })
)
