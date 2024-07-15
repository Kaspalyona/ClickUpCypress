Feature: createSpace
#  Scenario: User able to create space in registered team_id
#  Given team_id exists and auth token is valid
#  When User sends a POST request to create a space with "create_space"
#  Then Status code is equal 200
#  And Value name in request is equal to name in responce


  Scenario Outline:  Create space with <name>
    When User sends a POST request with the body from file <file>
    Then Status code is equal <status_code>
    Examples:
    |file                      |  status_code| name|
    |/create_space.json|   200 | valid data        |
    |/create_space_invalid_datatype.json|   400 | invalid name datatype|
    |/create_space_without_name.json|   400 |without name              |


  Scenario: User can't create space with the same name
    Given team_id exists and auth token is valid
    When User sends a POST request with the body containing the already created name from file "create_space"
    Then Status code is equal 400
