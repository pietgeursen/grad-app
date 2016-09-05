Feature: Login
As a registered user
I want to login 
So that I can change some part of the site 

  Scenario: A registered user can login 
    Given I am a registered user 
    When I am on the home page
    And I click on login 
    And I fill out valid credentials 
    And I click the button to login 
    Then I should be redirected to the home page and see logout 

  Scenario: An unregistered user can't login 
