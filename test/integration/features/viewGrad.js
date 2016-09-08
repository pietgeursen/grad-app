module.exports = `
Feature: View grad feature
As a Potential Employer
I want to view all the details of a specific graduate
So that I can decide if they are a good candidate for my role

  Scenario: Visiting home page to view grads and clicking on a grad to view
    Given I am a potential employer 
    When I am on the home page
    And I click on a grad's profile
    Then I should see that grad's profile page 
`
