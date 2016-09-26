const { html } = require('inu')

module.exports = error

function error(model, dispatch) {
  console.log(model.user.get('error'))
  return html `
    ${model.user.get('error') ? html `
      <div class="callout secondary">
        <h5>Oops! Something went wrong</h5>
        <p>${model.user.get('error').message}</p>
      </div>
    ` : null}
  `
}
