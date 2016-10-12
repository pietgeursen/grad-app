const { html } = require('inu')
const { filtersSelector, allSkillsSelector } = require('../selectors')
const { toggleFilter, resetFilter } = require('../actions')
const classnames = require('classnames')

const filters = (params, model, dispatch) => {
  const allSkills = allSkillsSelector(model.grads)
  const requiredSkills = filtersSelector(model.grads)
  return html`
  <div>
    <div class="button-group row expanded" >
      <button 
        onclick=${() => dispatch(resetFilter())} 
        class=${classnames('button', requiredSkills.size === 0 ? 'success' : 'secondary')}>
        All
      </button>
      ${allSkills.map((skill) => (
        html`
        <button onclick=${() => dispatch(toggleFilter(skill))} class=${classnames('button', requiredSkills.has(skill) ? 'success' : 'secondary')}>
          ${skill}
        </button>`
      )).toArray()}
    </div>
  </div>
  `
}

module.exports = filters
