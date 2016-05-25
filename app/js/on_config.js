'use strict';

var angular = require('angular');

/**
 * @desc The 'Config' Phase of the AngularJS Application Lifecycle.
 *
 * @ngInject
 * @author Craig McMurray
 * @constructor
 * @param {Function} $compileProvider - The AngularJS {@link $compileProvider} Compile Provider which is used to configure the $compile (Compile) Service
 * @param {Function} $locationProvider - The AngularJS {@link $locationProvider} Location Provider which is used to configure the $location (Location) Service
 * @param {Function} $logProvider - The AngularJS {@link $logProvider} Log Provider which is used to configure the $log (Log) Service
 * @param {Function} $provide - The AngularJS {@link $provide} Provide Service
 * @param {Function} $stateProvider - The UI-Router {@link $stateProvider} State Provider which is used to configure the $state (State) Service
 * @param {Function} $uiViewScrollProvider - The UI-Router {@link $uiViewScrollProvider} View Scroll Provider which is used to configure anchor scrolling
 * @param {Function} $urlMatcherFactoryProvider - The UI-Router {@link $urlMatcherFactoryProvider} URL Matcher Factory Provider which is used to configure State Routing
 * @param {Function} $urlRouterProvider - The UI-Router {@link $urlRouterProvider} URL Router Provider which is used to configure State Routing
 * @type {Function}
 */
function OnConfig($compileProvider, $locationProvider, $logProvider, $provide, $stateProvider, $uiViewScrollProvider, $urlMatcherFactoryProvider, $urlRouterProvider, AppSettings) {
	//Set HTML5 Mode for Browser History and clean URLs without the Hashbang (#).  NOTE:  requireBase = false causes IE9 compatibility issues
	$locationProvider.html5Mode({
		'enabled': true,
		'requireBase': false
	});

	//Set the UI-View Scroll Provider to use Anchor Scroll (scroll anchor into view)
	$uiViewScrollProvider.useAnchorScroll();

	//Set Debugging
	$compileProvider.debugInfoEnabled(AppSettings.developmentMode);

	//Set Debugging
	$logProvider.debugEnabled(AppSettings.developmentMode);

	//Rule for allowing Case Insensitive URLs
	$urlMatcherFactoryProvider.caseInsensitive(true);

	//Otherwise go to Home Page when a matching State isn't found
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		'url': '/',
		'templateUrl': 'home.html',
		'data': {
			'title': 'Home',
			'description': '',
			'keywords': ['']
		}
	});

	//Decorate the $q Service
	$provide.decorator('$q', ['$delegate', function($delegate) {
		//Get the $q Service
		var $q = $delegate;

		//Add the new function to $q
		$q.allSettled = $q.allSettled || allSettled;

		//Return the decorated $q
		return $q;

		/**
		 * @desc Implementation of allSettled function from Kris Kowal's Q:
		 * https://github.com/kriskowal/q/wiki/API-Reference#promiseallsettled
		 *
		 * @param {Object} promises - The Promises to wrap
		 * @returns {Promise}
		 */
		function allSettled(promises) {
			var wrapped = angular.isArray(promises) ? [] : {};

			angular.forEach(promises, function(promise, key) {
				if (!wrapped.hasOwnProperty(key)) {
					wrapped[key] = wrap(promise);
				}
			});

			return $q.all(wrapped);

			function wrap(promise) {
				return $q.when(promise)
					.then(function(value) {
						return {
							'state': 'fulfilled',
							'value': value
						};
					}, function(reason) {
						return {
							'state': 'rejected',
							'reason': reason
						};
					});
			}
		}
	}]);
}

module.exports = OnConfig;
