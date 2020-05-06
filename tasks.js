const path = require('path');
const AttestReporter = require('@deque/attest-reporter').default;

module.exports = {
	logResults: ({
		reportName='AccessibilityReport',
		reportDirectory,
		pageName='',
		results
	}) => {
		return new Promise(resolve => {
			let reporter = new AttestReporter(reportName, reportDirectory);
			let specificName = `${pageName}-${Date.now()}`;
			let outputPath = path.resolve(
				`${__dirname}`,
				`../../`,
				reportDirectory,
				`${reportName}-${specificName}`
			);

			reporter.logTestResult(specificName, results);

			reporter.buildHTML(reportDirectory).then(() => {
				return resolve(encodeURI(`${outputPath}.html`));
			});
		});
	},
}