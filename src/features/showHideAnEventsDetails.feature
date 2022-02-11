Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given the event element is collapsed by default
When the list of events is displayed
Then the user should see event element in its collapsed form by default

Scenario: User can expand an event to see its details
Given the user is on the main page with a selected list of events at disposal
When user clicks on the event button to show details
Then the element will see expand and show its details

Scenario: User can collapse an event to hide its details
Given the event had its element expanded previously to have its details seen
When user can click on the event element button to hide details
Then the user should see event go back to its collapsed form