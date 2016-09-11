const { html } = require('inu')

module.exports = user

function user (model, dispatch) {
  return html`
    <div class='grad'>
			<div>${model.email}</div>
    </div>
  `
}
