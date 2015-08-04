/*global Modernizr*/
'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {
	//Set default value for Booleans
	$rootScope.isMobile = true;
	$rootScope.fabDirection = 'up';
	//Check viewport size
	if (Modernizr.mq('only all and (min-width: 1025px)')) {
		//We are on desktop, flip the Booleans
		$rootScope.isMobile = false;
		$rootScope.fabDirection = 'down';
	}
	//Set the Page Title
	$rootScope.pageTitle = AppSettings.appTitle;
}

module.exports = OnRun;