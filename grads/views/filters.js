const { html } = require('inu')
const { filtersSelector, allSkillsSelector } = require('../selectors')
const { toggleFilter, resetFilter, hideFilter } = require('../actions')

module.exports = filters

function filters (params, model, dispatch) {
  const allSkills = allSkillsSelector(model.grads)
  const requiredSkills = filtersSelector(model.grads)
  return html`
  <div>
    <div onclick=${() => dispatch(hideFilter())} > Skills </div>
    <ul class="menu vertical" >
      <li onclick=${() => dispatch(resetFilter())}>
        All
        <input type='checkbox' ${requiredSkills.size === 0 ? 'checked' : null} >
      </li>
      ${allSkills.map((skill) => (
        html`<li onclick=${() => dispatch(toggleFilter(skill))}>
          ${skill}
          <input type='checkbox' ${requiredSkills.has(skill) ? 'checked' : null} >
        </li>`
      )).toArray()}
    </ul>
  </div>
  `
}
