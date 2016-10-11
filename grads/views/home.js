const { html } = require('inu')
const filters = require('./filters')
const summary = require('./summary')

const home = (params, model, dispatch) => {
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

module.exports = home
