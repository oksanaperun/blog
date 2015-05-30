exports.config = {
	directConnect: true,
	chromeDriver: '../node_modules/chromedriver/lib/chromedriver/chromedriver',
	framework: 'mocha',
	mochaOpts: {
  		reporter: "spec",
  		slow: 3000,
  		timeout: 60000
	},
	capabilities: {
		'browserName': 'chrome'
	},
	specs: ['*.spec.js']
};