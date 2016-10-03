const { html } = require('inu')

module.exports = error

function error(model, dispatch) {
  return html `
    ${model.user.get('error') ? html `
      <div class="callout alert">
        <h5>Oops! Something went wrong</h5>
        <p>${model.user.get('error').message}</p>
      </div>
    ` : null}
  `
}
