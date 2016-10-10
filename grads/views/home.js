import { html } from 'inu'
import filters from './filters'
import summary from './summary'

module.exports = (params, model, dispatch) => {
  return html`
  <div>
    <div class="row">
      ${filters(params, model, dispatch)}
    </div>
    <div class="row">
      <div class="medium-8 columns">
        ${summary(params, model, dispatch)}
      </div>
    </div>
  </div>
  `
}
