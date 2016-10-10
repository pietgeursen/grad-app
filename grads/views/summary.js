const { html } = require('inu')
const { navigate } = require('inux')
const { skilledGradsSelector } = require('../selectors')

module.exports = summary

function summary (_, model, dispatch) {
  const grads = skilledGradsSelector(model.grads)
  return grads.map(function (grad) {
    return html`
      <div class="grad row callout secondary">
        <div class="columns">
          <div class="row">
            <div class="grad-image small-4 columns">
              <img class="thumbnail" src=${grad.get('image_link')} alt="image of ${grad.get('name')}">
            </div>
            <div class="columns">
              <h3>${grad.get('name')}</h3>
              <div>${grad.get('phone')}</div>
              <div>${grad.get('github_link')}</div>
              <div>${grad.get('linkedin_link')}</div>
              <div>${grad.get('email')}</div>
            </div>
          </div>
          <p>${grad.get('short_description')}</p>
          <button class="view-grad" onclick=${() => dispatch(navigate(`grads/${grad.get('id')}`))}>More...</button>
        </div> 
        <div class="small-2 columns">
          <h3>Skills</h3>
          <ul>
            ${grad.get('skills').map((skill) => (
              html`<li>${skill}</li>`
            )).toArray()}
          </ul>
        </div> 
      </div>
    `
  }).toArray()
}
