const { html } = require('inu')
const { selectedSkills } = require('../selectors')
const { toggleFilter, resetFilter, hideFilter } = require('../actions')

module.exports = filters

function filters (model, dispatch) {
  console.log(model.grads.get('grads'))
  const skills = selectedSkills(model.grads)
  return html`
  <div>
    <div onclick=${() => dispatch(hideFilter())} > Skills </div>
    <ul class="menu vertical" >
      <li onclick=${() => dispatch(resetFilter())}>
        All
        <input type='checkbox' ${skills.every((value) => !value) ? 'checked' : null} >
      </li>
      ${skills.map((selected, skill) => (
        html`<li onclick=${() => dispatch(toggleFilter(skill))}>
          ${skill}
          <input type='checkbox' ${selected ? 'checked' : null} >
        </li>`
      )).toList().toJS()}
    </ul>
  </div>
  `
}

