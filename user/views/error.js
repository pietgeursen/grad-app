const { html } = require('inu')


const error = (params, model, dispatch) => {
  return html `
    ${model.user.get('error') ? html `
      <div class="callout alert">
        <h5>Oops! Something went wrong</h5>
        <p>${model.user.get('error').message}</p>
      </div>
    ` : null}
  `
}

module.exports = error
