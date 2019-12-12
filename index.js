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
            cy.task('logResults', {
                reportName: reporter.reportName || '',
                reportDirectory: reporter.directory || './cy-a11y-results',
                pageName: reporter.scopeName || '',
                results: results
            }).then(reportPath => {
                const violations = results.violations;

                assert.equal(
                    violations.length,
                    0,
                    `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${violations.length === 1 ? 'was' : 'were'} detected.\n\nReport: file://${reportPath}`
                );
            });
        });
})

function isEmptyObjectorNull(value) {
    if (value == null) return true
    return Object.entries(value).length === 0 && value.constructor === Object
}