Feature: View grads feature
As a potential employer
I want to view all students currently seeking work
So that I can begin searching for someone to employ

  Scenario: Visiting home page to view grads
    Given I am on the home page
    Then I should see a list of graduates
