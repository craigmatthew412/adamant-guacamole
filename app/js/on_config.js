'use strict';

/**
 * @ngInject
 */
function OnConfig($locationProvider, $logProvider, $stateProvider, $urlRouterProvider, AppSettings) {
	//Set HTML5 Mode for Browser History and clean URLs without the Hashbang (#).  NOTE:  requireBase = false causes IE9 compatibility issues.
	// Irrelevant for Mobile but could be a potential snag for Desktop in the future if we choose to support IE9
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	//Set Debugging
	$logProvider.debugEnabled(AppSettings.developmentMode);

	//Otherwise go to Home Page when a matching State isn't found
	$urlRouterProvider.otherwise('/');

	//Rule for allowing Case Insensitive URLs
	$urlRouterProvider.rule(function ($injector, $location) {
		//Get the current path
		var path = $location.path();
		//Normalized/lowercase path
		var normalized = path.toLowerCase();
		//Check if they are different
		if (path !== normalized) {
			//Return the normalized path
			return normalized;
		}
	});

	$stateProvider.state('home', {
		'url': '/',
		'templateUrl': 'home.html',
		'data': {
			'title': 'Home',
			'description': '',
			'keywords': ['']
		}
	});
}

module.exports = OnConfig;