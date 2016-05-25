'use strict';

//Immediately Invoked Function Expression to restrict scope bleeding (IIFE)
(function() {
	//AngularJS
	var angular = require('angular');

	//Required AngularJS Modules
	require('angular-ui-router');
	require('angular-animate');
	require('angular-aria');
	require('angular-chartjs');
	require('angular-material');
	require('angular-messages');
	require('angular-sanitize');
	require('angular-scroll');
	require('./templates');
	require('./controllers/_index');
	require('./factories/_index');
	require('./directives/_index');

	//AngularJS Modules for Dependency Injection into our application
	var modules = [
		'chartjs',
		'ui.router',
		'duScroll',
		'ngAnimate',
		'ngAria',
		'ngMaterial',
		'ngMessages',
		'ngSanitize',
		'templates',
		'app.controllers',
		'app.factories',
		'app.directives'
	];

	//Create the AngularJS application with dependencies; Mount on window for e2e/testing purposes
	window.app = angular.module('app', modules);

	//Set application constant using the AngularJS Constants Recipe
	angular.module('app').constant('AppSettings', require('./constants'));

	//Set default value for duScrollDuration
	angular.module('app').value('duScrollDuration', 800);

	//AngularJS Configuration Phase
	angular.module('app').config(require('./on_config'));

	//AngularJS Runtime Phase
	angular.module('app').run(require('./on_run'));

	//Manually bootstrap Angular to the root HTML Element
	angular.bootstrap(document, ['app'], {
		'strictDi': true
	});
}());
