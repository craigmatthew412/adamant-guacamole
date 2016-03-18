'use strict';

var angular = require('angular');

// angular modules
require('angular-ui-router');
require('angular-animate');
require('angular-aria');
require('angular-chartjs');
require('angular-material');
require('angular-messages');
require('angular-sanitize');
require('angular-scroll');
require('angular-touch');
require('./templates');
require('./controllers/_index');
require('./services/_index');
require('./directives/_index');

// create and bootstrap application
angular.element(document).ready(function() {
	var modules = [
		'chartjs',
		'ui.router',
		'duScroll',
		'ngAnimate',
		'ngAria',
		'ngMaterial',
		'ngMessages',
		'ngSanitize',
		'ngTouch',
		'templates',
		'app.controllers',
		'app.services',
		'app.directives'
	];

	// mount on window for testing
	window.app = angular.module('app', modules);

	angular.module('app').constant('AppSettings', require('./constants'));

	angular.module('app').config(require('./on_config'));

	angular.module('app').value('duScrollDuration', 800);

	angular.module('app').run(require('./on_run'));

	angular.bootstrap(document, ['app']);
});