'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {

	/*
	// change page title based on state
	$rootScope.$on('$stateChangeSuccess', function(event, toState) {
		$rootScope.pageTitle = '';

		if ( toState.data.title ) {
			$rootScope.pageTitle += toState.data.title;
			$rootScope.pageTitle += ' \u2014 ';
		}

		$rootScope.pageTitle += AppSettings.appTitle;
	});
	*/

	$rootScope.pageTitle = AppSettings.appTitle;
}

module.exports = OnRun;