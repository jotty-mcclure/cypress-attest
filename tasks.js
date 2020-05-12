const path = require('path');
const AttestReporter = require('@deque/attest-reporter').default;

module.exports = {
	logResults: ({
		reportName='AccessibilityReport',
		reportDirectory=`./cy-a11y-results`,
		pageName='',
		results
	}) => {
		return new Promise(resolve => {
			let reporter = new AttestReporter(reportName, reportDirectory);
			let specificName = `${pageName}-${Date.now()}`;
			let HtmlOutputPath = path.resolve(
				process.cwd(),
				reportDirectory,
				`${reportName}-${specificName}`
			);

			reporter.logTestResult(specificName, results);

			reporter.buildHTML(reportDirectory).then(() => {
				return resolve(encodeURI(`${HtmlOutputPath}.html`));
			});
		});
	},
}
