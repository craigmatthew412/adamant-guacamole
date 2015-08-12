/*global Modernizr*/
'use strict';

/**
 * @ngInject
 */
function OnRun($rootScope, AppSettings) {
	//Set default value for Booleans
	$rootScope.fab = {
		class: 'md-fab-bottom-left',
		direction: 'up'
	};
	//Check viewport size
	if (Modernizr.mq('only all and (min-width: 1025px)')) {
		//We are on desktop, change the properties
		$rootScope.fab = {
			class: 'md-fab-top-left',
			direction: 'down',
			open: false
		};
	}
	//Set the Page Title
	$rootScope.pageTitle = AppSettings.appTitle;
}

module.exports = OnRun;