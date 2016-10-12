const { html } = require('inu')
const filters = require('./filters')
const summary = require('./summary')

const home = (params, model, dispatch) => {
  return html`
  <div>
    <div class="row column">
      ${filters(params, model, dispatch)}
      ${summary(params, model, dispatch)}
    </div>
  </div>
  `
}

module.exports = home
