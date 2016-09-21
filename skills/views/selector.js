const { html } = require('inu')
const { toggle } = require('../actions')

module.exports = selector

function selector (model, dispatch) {
  return html`
    <div>
      <ul class="dropdown menu vertical">
        ${Object.keys(model).map((skill) => (
          html`
          <li onclick=${() => dispatch(toggle(skill))}>
            ${skill}
            <input type="checkbox" ${(model[skill]) ? 'checked' : null}>
          </li>`
        ))}
      </ul>
    </div>
  `
}
