const { html } = require('inu')
const { navigate } = require('inux')
const { skilledGradsSelector } = require('../selectors')

module.exports = summary

function summary (model, dispatch) {
  const grads = skilledGradsSelector(model.grads).toJS()
  return grads.map(function(grad) {
    return html`
      <div class="grad row callout secondary">
        <div class="columns">
          <div class="row">
            <div class="grad-image small-4 columns">
              <img class="thumbnail" src=${grad.image_link} alt="image of ${grad.name}">
            </div>
            <div class="columns">
              <h3>${grad.name}</h3>
              <div>${grad.phone}</div>
              <div>${grad.github_link}</div>
              <div>${grad.linkedin_link}</div>
              <div>${grad.email}</div>
            </div>
          </div>
          <p>${grad.short_description}</p>
          <button class="view-grad" onclick=${() => dispatch(navigate(`grads/${grad.id}`))}>More...</button>
        </div> 
        <div class="small-2 columns">
          <h3>Skills</h3>
          <ul>
            ${grad.skills.map((skill) => (
              html`<li>${skill}</li>`
            ))}
          </ul>
        </div> 
      </div>
    `
  })
}
