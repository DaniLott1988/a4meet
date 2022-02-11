Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 is the default number
Given the user is on the home page
When there is no value input by the user
Then a default value of 32 is specified to be displayed

Scenario: User can change the number of events they want to see.
Given the user is on the home page
When there is a value input by the user
Then the desired number of events will be displayed