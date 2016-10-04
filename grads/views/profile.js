const { html } = require('inu')
const { navigate } = require('inux')

module.exports = grad

function grad ({id}, model, dispatch) {
  const grad = model.grads.get('grads').find(function (grad) {
    return grad.get('id') === Number(id)
  })
  return html`
  <main>
      ${grad
        ? html`
        <div class='grad'>
          <div class="grad-image">
            <img src=${grad.get('image_link')} alt="image of ${grad.get('name')}">
          </div>
          <h2>${grad.get('name')}</h2>
          <p>${grad.get('long_description')}</p>
          <div>${grad.get('phone')}</div>
          <div>${grad.get('cv_link')}</div>
          <div>${grad.get('github_link')}</div>
          <div>${grad.get('linkedin_link')}</div>
          <div>${grad.get('email')}</div>
          <button id="home" onclick=${() => dispatch(navigate(`/`))}>Back</button>
        </div>
        `
       : html`<h2>We got no grads</h2>`}
  </main>
  `
}
