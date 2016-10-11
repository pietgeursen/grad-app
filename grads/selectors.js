const { createSelector } = require('reselect')
const Immutable = require('immutable')

const gradsSelector = model => model.get('grads')

const filtersSelector = model => model.getIn(['skillFilters', 'filters'])

const allSkillsSelector = createSelector(
  gradsSelector,
  grads => {
    return grads.reduce((skills, grad) => {
      return skills.union(grad.get('skills'))
    }, Immutable.Set())
  }
)

const skilledGradsSelector = createSelector(
  filtersSelector,
  gradsSelector,
  (requiredSkills, grads) => {
    return grads.filter((grad) => {
      const gradSkillSet = grad.get('skills').toSet()
      const requiredSkillSet = requiredSkills.toSet()
      return requiredSkillSet.isSubset(gradSkillSet)
    })
  }
)

module.exports = {
  gradsSelector,
  filtersSelector,
  allSkillsSelector,
  skilledGradsSelector
}
