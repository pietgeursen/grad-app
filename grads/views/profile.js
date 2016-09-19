const { html } = require('inu')
const { navigate } = require('inux')

module.exports = grad

function grad ({id}, model, dispatch) {
  const grad = model.grads.find(function (grad) {
    return grad.id == id
  })
  return html`
  <main>
      ${ grad ? 
        html`
        <div class='grad'>
          <div class="grad-image">
            <img src=${grad.image_link} alt="image of ${grad.name}">
          </div>
          <div>${grad.name}</div>
          <div>${grad.long_description}</div>
          <div>${grad.phone}</div>
          <div>${grad.cv_link}</div>
          <div>${grad.github_link}</div>
          <div>${grad.linkedin_link}</div>
          <div>${grad.email}</div>
          <button id="home" onclick=${() => dispatch(navigate(`/`))}>Back</button>
        </div>
        `
       : html`<h2>We got no grads</h2>` }
  </main>
  `
}
