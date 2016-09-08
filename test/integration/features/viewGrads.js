module.exports = `
Feature: View grads on home page
  Scenario: Visiting home page to view grads
    Given I am a potential employer 
    When I am on the home page
    Then I should see a list of graduates
`
