module.exports = `
Feature: Edit grad feature
As a graduate
I want to update my details
So that they are correct through my lifetime as a developer

  Scenario: Grad edits their own profile 
    Given I am a logged in grad 
    When I am on the home page
    And I click on my profile
    And I click on the button to edit the profile 
    And I update the profile
    And I click the button to update the profile
    Then I should see that updated profile

  Scenario: Grad can't edit another profile that isn't theirs 
    Given I am a logged in grad 
    When I am on the home page
    And I click on someone else's profile 
    Then I do not have the option to edit their profile

As an admin
I want to update a graduates profile
So that I can keep the site up to date without needing the graduate to update it.

  Scenario: Admin edits any profile 
    Given I am a logged in admin 
    When I am on the home page
    And I click on a profile
    And I click on the button to edit the profile 
    And I update the profile
    And I click the button to update the profile
    Then I should see that updated profile
`
