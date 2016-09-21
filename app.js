import { start, html, pull } from 'inu'
import { App, Domain, Action, navigate } from 'inux'
import Immutable, { set } from 'immutable'

import Grads from './grads/app'
import Skills from './skills/app'
import summary from './grads/views/summary'
import skillSelector from './skills/views/selector'
import profile from './grads/views/profile'

const view = (model, dispatch) => {
  const iModel = Immutable.fromJS(model)
  const skilledGrads = iModel.get('grads').filter((grad) => {
    const gradSkills = grad.get('skills')
    const requiredSkills = iModel.get('skills').filter((val)=> val).keySeq()
    return (requiredSkills.size == 0) || requiredSkills.every((requiredSkill) => (
      gradSkills.includes(requiredSkill) 
    ))
  }).toJS()

  return html`
<main>
  <div class="row">
    ${skillSelector(model.skills, dispatch)} 
  </div>
  <div class="row">
    <div class="medium-8 columns">
		${skilledGrads.map(function(grad) {
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
    Grads({ api }),
    Skills({ api })
  ])
  const sources = start(app)

  pull(
    sources.views(),
    pull.drain(function (view) {
      html.update(elem, view)
    })
  )
}
