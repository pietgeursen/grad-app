import { createSelector } from 'reselect'
import Immutable from 'immutable'

export const gradsSelector = model =>{
  return model.get('grads')
}

export const skillsSelector = createSelector(
  gradsSelector,
  grads => {
    return grads.reduce((skills, grad) => {
      return skills.union(grad.get('skills'))
    }, Immutable.Set())
  }
)

const filters = model => model.getIn(['skillFilters', 'filters'])
export const selectedSkills = createSelector(
  skillsSelector,
  filters,
  (skills, filters) => {
    return skills.toMap().map((value, key) => {
      return filters.includes(key)
    })
  }
)
export const skilledGrads = createSelector(
  filters,
  gradsSelector,
  (requiredSkills, grads) => {
    return grads.filter((grad) => {
      const gradSkillSet = grad.get('skills').toSet()
      const requiredSkillSet = requiredSkills.toSet()
      return requiredSkillSet.isSubset(gradSkillSet)
    })
  }
)


