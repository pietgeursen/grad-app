const { html } = require('inu')
const { navigate } = require('inux')

module.exports = grads

function grads (model, dispatch) {
  return html`
    <div class="grad row callout secondary">
      <div class="columns">
        <div class="row">
          <div class="grad-image small-4 columns">
            <img class="thumbnail" src=${model.image_link} alt="image of ${model.name}">
          </div>
          <div class="columns">
            <h3>${model.name}</h3>
            <div>${model.phone}</div>
            <div>${model.github_link}</div>
            <div>${model.linkedin_link}</div>
            <div>${model.email}</div>
          </div>
        </div>
        <p>${model.short_description}</p>
        <button class="view-grad" onclick=${() => dispatch(navigate(`grads/${model.id}`))}>More...</button>
      </div> 
      <div class="small-2 columns">
        <h3>Skills</h3>
        <ul>
          ${model.skills.map((skill) => (
            html`<li>${skill}</li>`
          ))}
        </ul>
      </div> 
    </div>
  `
}
