Feature: Hello world feature
  As a user of Grad app 
  I want to see hello world on the home page 
  So that I know that the app is working 

  Scenario: Visiting home page 
    Given I am on the home page
    Then I should see "Hello world" as the page title
