Cypress.Commands.add('injectAttest', () => {
    cy.window({ log: false }).then(async window => {
        return await cy.exec(`node ./${__dirname}/attest.js`).then(({stdout}) => {
            window.eval(stdout);
        });
    });
})

Cypress.Commands.add('configureAttest', (configurationOptions = {}) => {
    cy.window({ log: false }).then(win => {
        return win.axe.configure(configurationOptions)
    })
})

Cypress.Commands.add('checkA11y', (reporter={}, context, options) => {
    cy.window({ log: false })
        .then(win => {
            if (isEmptyObjectorNull(context)) context = undefined
            if (isEmptyObjectorNull(options)) options = undefined
            return win.axe.run(
                context ? (context = context) : (context = win.document),
                options
            );
        })
        .then((results) => {
            if ( !reporter ) return cy.wrap(results.violations, { log: false });

            return cy.task('logResults', {
                reportName: reporter.reportName || '',
                reportDirectory: reporter.directory || './cy-a11y-results',
                pageName: reporter.scopeName || '',
                results: results
            }, { log: false }).then(reportPath => {
                Cypress.log({
                    name: 'A11y Report',
                    message: `A report with the accessibility findings has been created! View console for the location.`,
                    consoleProps: () => {
                        return {
                            message: `A report of the accessibility findings is available here: file://${reportPath}`
                        }
                    },
                });
                return cy.wrap(results.violations, { log: false });
            });
        })
        .then((violations) => {
            if (violations.length) {
                cy.wrap(violations, { log: false }).each(v => {
                    Cypress.log({
                        name: 'a11y error!',
                        consoleProps: () => v,
                        message: `${v.id} on ${v.nodes.length} Node${v.nodes.length === 1 ? '' : 's'}`
                    });
                })
            }
            return cy.wrap(violations, { log: false });
        })
        .then(violations => {
           assert.equal(
               violations.length,
               0,
               `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${violations.length === 1 ? 'was' : 'were'} detected.`
           );
        });
})

function isEmptyObjectorNull(value) {
    if (value == null) return true
    return Object.entries(value).length === 0 && value.constructor === Object
}