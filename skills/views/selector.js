const { html } = require('inu')
const { toggle } = require('../actions')

module.exports = selector

function selector (model, dispatch) {
  return html`
    <div>
      <ul class="dropdown menu">
        ${model.availableSkills.map((skill) => (
          html`
          <li onclick=${() => dispatch(toggle(skill))}>
            ${skill}
            <input type="checkbox" ${(model.selectedSkills[skill]) ? 'checked' : null}>
          </li>`
        ))}
      </ul>
    </div>
  `
}
