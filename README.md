# Cypress-attest
Cypress-attest is an integration of Worldspace Attest for the Cypress testing tool.

This project would not be possible without the crew that made [cypress-axe](https://www.npmjs.com/package/cypress-axe). Huge thanks to them for guiding the way. Cypress-attest is a clone/fork, but replaces the axe-core tool with Worldspace Attest.

## Requirements
* Worldspace Attest (attest-node & attest-reporter)
* Cypress

## Installation
`npm install -D https://github.com/joshuamcclure/cypress-attest`

`yarn add -D https://github.com/joshuamcclure/cypress-attest`

### Include the tasks
Update `Cypress/plugins/index.js` file to include the cypress-attest tasks by adding:

```
const {logResults} = require('cypress-attest/tasks');

module.exports = (on, config) => {
    on('task', {logResults})
}
```

### Include the commands
Update `Cypress/support/index.js` file to include the cypress-attest commands by adding:

```
import 'cypress-attest'
```

## Usage

### cy.injectAttest
Inject the Attest package into the page under test.
```
before( function () {
    cy.injectAttest();
});
```

### cy.checkA11y
Run the Attest tool and build a report with the results

```
it('Does a thing', function () {
    cy.checkA11y();
});
```

This function accepts arguments for the reporter, scope/context, and run options.

```
cy.checkA11y(
    {
        reportName: 'Login Page', //name of the report
        scopeName: 'Form', //name of the scope
        directory: 'cyAccessibilityReports', //folder to save reports to, default: cy-a11y-results
    },
    'form#login-form' //the selector for the scope you want to test.    
)
```

## Report Output
The report output is stored on the root of your project directory. The default directory name is cy-a11y-results, but this can be changed using the reporter options outlined above.