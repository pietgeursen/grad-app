import { createSelector } from 'reselect'
import Immutable from 'immutable'

export const gradsSelector = model => model.get('grads')

export const filtersSelector = model => model.getIn(['skillFilters', 'filters'])

export const allSkillsSelector = createSelector(
  gradsSelector,
  grads => {
    return grads.reduce((skills, grad) => {
      return skills.union(grad.get('skills'))
    }, Immutable.Set())
  }
)

export const skilledGradsSelector = createSelector(
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

