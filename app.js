import { start, html, pull } from 'inu'
import { App, Domain, Action, navigate } from 'inux'
import Grads from './grads/app'
import summary from './grads/views/summary'
import profile from './grads/views/profile'

const view = (model, dispatch) => {
  return html` 

<main>
  <div class="row">
    <div class="medium-8 columns">
		${model.grads.map(function(grad) {
			return summary(grad, dispatch) 
		})}
    </div>
  </div>
</main>
`}

const home = Domain({
  name: 'home',
  init: () => ({
    model: {
    }

  }),
  update: {},
  routes: [
    ['/grads/:id', profile],
    ['/', (params, model, dispatch) => view(model, dispatch)]
  ]
})

module.exports = function startApp (elem, api) {
  const app = App([
    home,
    // Account({ api}),
    Grads({ api })
  ])
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain(function (view) {
      html.update(elem, view)
    })
  )
}
