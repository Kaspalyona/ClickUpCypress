Feature: getSpacesPositiveCases

  Scenario: User able to get list of spaces for an existing team_id.
    Given team_id exists and auth token is valid
    When User sends a GET request to get spaces
    Then Status code is equal 200
    And User get 'id' from body
    And User get 'name' from body
    And User get 'private' from body
    And User get 'statuses' from body
    And User get 'multiple_assignees' from body

  Scenario: User recieved an error when team id have invalid data type
    Given team_id exists and auth token is valid
    When User sends a GET request to with team_id as a string
    Then Status code is equal 500
